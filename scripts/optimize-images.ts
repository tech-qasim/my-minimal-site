#!/usr/bin/env node
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url' // 导入 fileURLToPath
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import chalk from 'chalk'
import ora from 'ora'
import { t } from './utils.ts'

// 在 ES Modules 中获取目录名
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 定义支持的图片格式
const SUPPORTED_FORMATS = ['jpg', 'jpeg', 'png', 'webp', 'avif'] as const
type ImageFormat = (typeof SUPPORTED_FORMATS)[number]

// 配置接口定义
interface ImageConfig {
  quality: number
  width: number
  format: ImageFormat
  keepOriginal: boolean
  recursive: boolean
  outputDir?: string
}

// 文件大小格式化
const formatBytes = (bytes: number): string => {
  const sizes = ['B', 'KB', 'MB', 'GB']
  if (bytes === 0) return '0 B'
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`
}

// 图片处理类
class ImageProcessor {
  private config: ImageConfig
  private stats = {
    processed: 0,
    skipped: 0,
    errors: 0,
    originalSize: 0,
    optimizedSize: 0,
  }

  constructor(config: ImageConfig) {
    this.config = config
  }

  private async processImage(inputPath: string, outputPath: string): Promise<boolean> {
    const isOverwriting = inputPath === outputPath;
    const tempOutputPath = isOverwriting ? `${outputPath}.${Date.now()}.tmp` : outputPath; // Use timestamp for uniqueness

    try {
      const originalStats = fs.statSync(inputPath);
      // Only add original size if it's the first time processing this file path in this run
      // This check might need refinement if multiple inputs could lead to the same output path
      if (!isOverwriting || this.stats.originalSize === 0) { // Simplified check
          this.stats.originalSize += originalStats.size;
      }

      let sharpInstance = sharp(inputPath);
      const metadata = await sharpInstance.metadata();

      // Resize logic (no changes needed here)
      if (this.config.width > 0 && metadata.width && metadata.width > this.config.width) {
        sharpInstance = sharpInstance.resize({
          width: this.config.width,
          withoutEnlargement: true,
          fit: 'inside',
        });
      }

      // Format conversion logic (write to tempOutputPath)
      switch (this.config.format) {
        case 'webp':
          await sharpInstance.webp({ quality: this.config.quality }).toFile(tempOutputPath);
          break;
        case 'avif':
          await sharpInstance.avif({ quality: this.config.quality }).toFile(tempOutputPath);
          break;
        case 'png':
          // Add PNG specific options if needed, e.g., compressionLevel
          await sharpInstance.png({ quality: this.config.quality /*, compressionLevel: 9 */ }).toFile(tempOutputPath);
          break;
        default: // jpeg
          await sharpInstance.jpeg({ quality: this.config.quality }).toFile(tempOutputPath);
      }

      // Wait briefly for file handle release before stat or rename
      await new Promise((resolve) => setTimeout(resolve, 100));

      // If overwriting, replace original file with temp file
      if (isOverwriting) {
        try {
          // Verify temp file exists before proceeding
          if (!fs.existsSync(tempOutputPath)) {
             throw new Error('Temporary file creation failed.');
          }
          // On Windows, renaming over an existing file might require deleting first.
          // However, fs.rename should handle this. Let's try rename directly first.
           fs.renameSync(tempOutputPath, outputPath);
        } catch (renameError: any) {
           // If direct rename fails (e.g., EPERM on Windows), try delete then rename
           if (renameError.code === 'EPERM' || renameError.code === 'EACCES') {
               console.warn(chalk.yellow(`Direct rename failed (${renameError.code}), attempting delete then rename for: ${path.basename(inputPath)}`));
               try {
                   fs.unlinkSync(inputPath); // Delete original
                   fs.renameSync(tempOutputPath, outputPath); // Rename temp to final
               } catch (retryError) {
                   // If retry also fails, cleanup temp and throw
                   if (fs.existsSync(tempOutputPath)) fs.unlinkSync(tempOutputPath);
                   throw retryError; // Re-throw the error after cleanup attempt
               }
           } else {
               // If it's another error, cleanup temp and throw
               if (fs.existsSync(tempOutputPath)) fs.unlinkSync(tempOutputPath);
               throw renameError;
           }
        }
      }

      // Get stats from the final output path
      const optimizedStats = fs.statSync(outputPath);
      this.stats.optimizedSize += optimizedStats.size;
      this.stats.processed++;

      console.log(chalk.green(`\n✓ ${t.messages.success}: ${path.basename(inputPath)}`));
      return true; // 处理成功

    } catch (error) {
      this.stats.errors++;
      console.log(chalk.red(`\n✗ ${t.messages.error}: ${path.basename(inputPath)} - ${error}`));
      // Clean up temporary file if it exists on error
      if (isOverwriting && fs.existsSync(tempOutputPath)) {
        try {
          fs.unlinkSync(tempOutputPath);
        } catch (cleanupError) {
          console.error(chalk.red(`Failed to clean up temporary file ${tempOutputPath}: ${cleanupError}`));
        }
      }
      return false; // 处理失败
    }
  }

  private getOutputPath(inputPath: string): string {
    const originalExt = path.extname(inputPath); // Keep original extension info if needed
    const filename = path.basename(inputPath, originalExt);
    const outputFilename = `${filename}.${this.config.format}`; // Output uses the target format extension

    // Determine the base directory for the output
    const baseOutputDir = this.config.outputDir ? this.config.outputDir : path.dirname(inputPath);

    // If an output directory is specified, ensure it exists (should be created in `process` method)
    // If not outputDir is specified, the output path will be in the same directory as the input.

    return path.join(baseOutputDir, outputFilename);
  }

  private isImageFile(filepath: string): boolean {
    const ext = path.extname(filepath).toLowerCase().slice(1)
    return SUPPORTED_FORMATS.includes(ext as ImageFormat)
  }

  private async processDirectory(dirPath: string): Promise<string[]> {
    const files: string[] = []
    const items = fs.readdirSync(dirPath)

    for (const item of items) {
      const fullPath = path.join(dirPath, item)
      const stats = fs.statSync(fullPath)

      if (stats.isDirectory() && this.config.recursive) {
        files.push(...(await this.processDirectory(fullPath)))
      } else if (stats.isFile() && this.isImageFile(fullPath)) {
        files.push(fullPath)
      }
    }

    return files
  }

  async process(inputPath: string): Promise<string[]> {
    // 返回需要删除的文件列表
    const filesToDelete: string[] = []
    if (!fs.existsSync(inputPath)) {
      console.error(chalk.red(t.messages.invalidPath))
      return filesToDelete // 返回空列表
    }

    // 创建输出目录
    if (this.config.outputDir && !fs.existsSync(this.config.outputDir)) {
      console.log(chalk.cyan(`${t.messages.createOutputDir}: ${this.config.outputDir}`))
      console.log(chalk.cyan('======================='))
      fs.mkdirSync(this.config.outputDir, { recursive: true })
    }

    const stats = fs.statSync(inputPath)
    const files = stats.isDirectory() ? await this.processDirectory(inputPath) : [inputPath]

    const spinner = ora({
      text: `${t.messages.processing} 1/${files.length}`,
      spinner: 'dots',
    }).start()

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const outputPath = this.getOutputPath(file)
      const success = await this.processImage(file, outputPath) // 等待处理完成

      // 只有处理成功且不保留原文件时才加入删除列表
      if (success && !this.config.keepOriginal && file !== outputPath) {
        filesToDelete.push(file)
      }
      spinner.text = `${t.messages.processing} ${i + 1}/${files.length}` // 修正进度显示
    }

    spinner.stop()
    this.printStats()
    return filesToDelete // 返回列表
  }

  private printStats(): void {
    const saved = this.stats.originalSize - this.stats.optimizedSize
    const savedPercentage = ((saved / this.stats.originalSize) * 100).toFixed(2)

    console.log(chalk.cyan('\n=== ' + t.messages.stats + ' ==='))
    console.log(chalk.green(`✓ ${t.messages.success}: ${this.stats.processed}`))
    console.log(chalk.yellow(`⚠ ${t.messages.skipped}: ${this.stats.skipped}`))
    console.log(chalk.red(`✗ ${t.messages.error}: ${this.stats.errors}`))
    console.log(chalk.blue(`${t.messages.saved}: ${formatBytes(saved)} (${savedPercentage}%)`))
  }
}

// 主函数
async function main() {
  const argv = await yargs(hideBin(process.argv))
    .option('input', {
      alias: 'i',
      type: 'string',
      description: t.cli.input,
      demandOption: true,
    })
    .option('quality', {
      alias: 'q',
      type: 'number',
      description: t.cli.quality,
      default: 40,
    })
    .option('width', {
      alias: 'w',
      type: 'number',
      description: t.cli.width,
      default: 0,
    })
    .option('format', {
      alias: 'f',
      type: 'string',
      choices: SUPPORTED_FORMATS,
      description: t.cli.format,
      default: 'webp',
    })
    .option('keepOriginal', {
      alias: 'k',
      type: 'boolean',
      description: t.cli.keepOriginal,
      default: false,
    })
    .option('recursive', {
      alias: 'r',
      type: 'boolean',
      description: t.cli.recursive,
      default: true,
    })
    .option('outputDir', {
      alias: 'o',
      type: 'string',
      description: t.cli.outputDir,
    })
    .parse()

  const processor = new ImageProcessor({
    quality: argv.quality,
    width: argv.width,
    format: argv.format as ImageFormat,
    keepOriginal: argv.keepOriginal,
    recursive: argv.recursive,
    outputDir: argv.outputDir,
  })

  // 执行处理并获取待删除列表
  const filesToDelete = await processor.process(argv.input)

  // --- 将待删除列表写入文件 ---
  if (!argv.keepOriginal && filesToDelete.length > 0) {
    const deleteListPath = path.join(__dirname, 'delete-list.json') // 确保 __dirname 已正确定义
    try {
      fs.writeFileSync(deleteListPath, JSON.stringify(filesToDelete, null, 2)) // 写入 JSON 格式，带缩进
      console.log(chalk.yellow(`\n📝 ${filesToDelete.length} 个待删除文件列表已写入: ${deleteListPath}`))
      console.log(chalk.yellow(`👉 请在完成后运行清理脚本来删除这些文件:`))
      console.log(chalk.cyan(`   pnpm cleanup`)) // Updated command based on package.json
    } catch (error) {
      console.error(chalk.red(`\n❌ 写入删除列表文件失败: ${error}`))
    }
  } else if (argv.keepOriginal) {
    console.log(chalk.blue('\n配置为保留原始文件，跳过生成删除列表。'))
  } else {
    console.log(chalk.blue('\n没有需要删除的文件。'))
  }
}

main().catch((error) => {
  console.error(chalk.red('\n发生未处理的错误:'), error)
  process.exit(1) // 确保在错误时退出
})

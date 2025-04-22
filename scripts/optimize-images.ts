#!/usr/bin/env node
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import chalk from 'chalk';
import ora from 'ora';
import cliProgress from 'cli-progress';

// 定义支持的图片格式
const SUPPORTED_FORMATS = ['jpg', 'jpeg', 'png', 'webp', 'avif'] as const;
type ImageFormat = typeof SUPPORTED_FORMATS[number];

// 配置接口定义
interface ImageConfig {
  quality: number;
  width: number;
  format: ImageFormat;
  keepOriginal: boolean;
  recursive: boolean;
  outputDir?: string;
}

// 多语言支持
const i18n = {
  zh: {
    cli: {
      input: '输入文件或目录路径',
      quality: '图片质量 (1-100)',
      width: '最大宽度',
      format: '输出格式',
      keepOriginal: '保留原始文件',
      recursive: '递归处理子目录',
      outputDir: '输出目录'
    },
    messages: {
      processing: '正在处理',
      success: '处理成功',
      error: '处理失败',
      complete: '处理完成',
      skipped: '已跳过',
      invalidPath: '无效的路径',
      createOutputDir: '创建输出目录',
      stats: '统计信息',
      saved: '节省空间'
    }
  },
  en: {
    cli: {
      input: 'Input file or directory path',
      quality: 'Image quality (1-100)',
      width: 'Maximum width',
      format: 'Output format',
      keepOriginal: 'Keep original files',
      recursive: 'Process subdirectories recursively',
      outputDir: 'Output directory'
    },
    messages: {
      processing: 'Processing',
      success: 'Success',
      error: 'Error',
      complete: 'Complete',
      skipped: 'Skipped',
      invalidPath: 'Invalid path',
      createOutputDir: 'Creating output directory',
      stats: 'Statistics',
      saved: 'Space saved'
    }
  }
};

// 检测系统语言
const lang = (process.env.LANG || process.env.LANGUAGE || '').toLowerCase().includes('zh') ? 'zh' : 'en';
const t = i18n[lang];

// 进度条配置
const progressBar = new cliProgress.SingleBar({
  format: `${chalk.blue('{bar}')} {percentage}% | {value}/{total}`,
  barCompleteChar: '█',
  barIncompleteChar: '░',
  hideCursor: true
}, cliProgress.Presets.shades_grey);

// 文件大小格式化
const formatBytes = (bytes: number): string => {
  const sizes = ['B', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 B';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
};

// 图片处理类
class ImageProcessor {
  private config: ImageConfig;
  private stats = {
    processed: 0,
    skipped: 0,
    errors: 0,
    originalSize: 0,
    optimizedSize: 0
  };

  constructor(config: ImageConfig) {
    this.config = config;
  }

  private async processImage(inputPath: string, outputPath: string): Promise<void> {
    try {
      const originalStats = fs.statSync(inputPath);
      this.stats.originalSize += originalStats.size;

      let sharpInstance = sharp(inputPath);
      const metadata = await sharpInstance.metadata();

      // 只在需要时调整大小
      if (this.config.width > 0 && metadata.width && metadata.width > this.config.width) {
        sharpInstance = sharpInstance.resize({
          width: this.config.width,
          withoutEnlargement: true,
          fit: 'inside'
        });
      }

      // 根据选择的格式进行转换
      switch (this.config.format) {
        case 'webp':
          await sharpInstance.webp({ quality: this.config.quality }).toFile(outputPath);
          break;
        case 'avif':
          await sharpInstance.avif({ quality: this.config.quality }).toFile(outputPath);
          break;
        case 'png':
          await sharpInstance.png({ quality: this.config.quality }).toFile(outputPath);
          break;
        default:
          await sharpInstance.jpeg({ quality: this.config.quality }).toFile(outputPath);
      }

      const optimizedStats = fs.statSync(outputPath);
      this.stats.optimizedSize += optimizedStats.size;
      this.stats.processed++;
      
      console.log(chalk.green(`\n✓ ${t.messages.success}: ${path.basename(inputPath)}`));
    } catch (error) {
      this.stats.errors++;
      console.log(chalk.red(`\n✗ ${t.messages.error}: ${path.basename(inputPath)} - ${error}`));
    }
}

  private getOutputPath(inputPath: string): string {
    const filename = path.basename(inputPath, path.extname(inputPath));
    const outputFilename = `${filename}.${this.config.format}`;
    return this.config.outputDir
      ? path.join(this.config.outputDir, outputFilename)
      : path.join(path.dirname(inputPath), outputFilename);
  }

  private isImageFile(filepath: string): boolean {
    const ext = path.extname(filepath).toLowerCase().slice(1);
    return SUPPORTED_FORMATS.includes(ext as ImageFormat);
  }

  private async processDirectory(dirPath: string): Promise<string[]> {
    const files: string[] = [];
    const items = fs.readdirSync(dirPath);

    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stats = fs.statSync(fullPath);

      if (stats.isDirectory() && this.config.recursive) {
        files.push(...await this.processDirectory(fullPath));
      } else if (stats.isFile() && this.isImageFile(fullPath)) {
        files.push(fullPath);
      }
    }

    return files;
  }

  async process(inputPath: string): Promise<void> {
    if (!fs.existsSync(inputPath)) {
      console.error(chalk.red(t.messages.invalidPath));
      return;
    }

    // 创建输出目录
    if (this.config.outputDir && !fs.existsSync(this.config.outputDir)) {
      console.log(chalk.cyan(`${t.messages.createOutputDir}: ${this.config.outputDir}`));
      console.log(chalk.cyan('======================='));
      fs.mkdirSync(this.config.outputDir, { recursive: true });
    }

    const stats = fs.statSync(inputPath);
    const files = stats.isDirectory() ? await this.processDirectory(inputPath) : [inputPath];

    const spinner = ora({
      text: `${t.messages.processing} 0/${files.length}`,
      spinner: 'dots'
    }).start();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const outputPath = this.getOutputPath(file);
      await this.processImage(file, outputPath);
      spinner.text = `${t.messages.processing} ${i + 1}/${files.length}`;
    }

    spinner.stop();
    this.printStats();
  }

  private printStats(): void {
    const saved = this.stats.originalSize - this.stats.optimizedSize;
    const savedPercentage = ((saved / this.stats.originalSize) * 100).toFixed(2);

    console.log(chalk.cyan('\n=== ' + t.messages.stats + ' ==='));
    console.log(chalk.green(`✓ ${t.messages.success}: ${this.stats.processed}`));
    console.log(chalk.yellow(`⚠ ${t.messages.skipped}: ${this.stats.skipped}`));
    console.log(chalk.red(`✗ ${t.messages.error}: ${this.stats.errors}`));
    console.log(chalk.blue(`${t.messages.saved}: ${formatBytes(saved)} (${savedPercentage}%)`));
  }
}

// 主函数
async function main() {
  const argv = await yargs(hideBin(process.argv))
    .option('input', {
      alias: 'i',
      type: 'string',
      description: t.cli.input,
      demandOption: true
    })
    .option('quality', {
      alias: 'q',
      type: 'number',
      description: t.cli.quality,
      default: 80
    })
    .option('width', {
      alias: 'w',
      type: 'number',
      description: t.cli.width,
      default: 0
    })
    .option('format', {
      alias: 'f',
      type: 'string',
      choices: SUPPORTED_FORMATS,
      description: t.cli.format,
      default: 'webp'
    })
    .option('keepOriginal', {
      alias: 'k',
      type: 'boolean',
      description: t.cli.keepOriginal,
      default: false
    })
    .option('recursive', {
      alias: 'r',
      type: 'boolean',
      description: t.cli.recursive,
      default: true
    })
    .option('outputDir', {
      alias: 'o',
      type: 'string',
      description: t.cli.outputDir
    })
    .parse();

  const processor = new ImageProcessor({
    quality: argv.quality,
    width: argv.width,
    format: argv.format as ImageFormat,
    keepOriginal: argv.keepOriginal,
    recursive: argv.recursive,
    outputDir: argv.outputDir
  });

  await processor.process(argv.input);
}

main().catch(console.error);
#!/usr/bin/env node
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import readline from 'readline'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import chalk from 'chalk'
import ora from 'ora'
import cliProgress from 'cli-progress'

// 初始化装饰工具
const progressBar = new cliProgress.SingleBar(
  {
    format: `${chalk.blue('{bar}')} {percentage}% | {value}/{total} 文件`,
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true,
  },
  cliProgress.Presets.shades_grey
)

// 检测系统语言
const isChinese = (process.env.LANG || process.env.LANGUAGE || '').toLowerCase().includes('zh')

// 多语言文本
const messages = {
  inputPrompt: isChinese ? '请输入要优化的图片或目录路径: ' : 'Enter image or directory path to optimize: ',
  qualityPrompt: isChinese ? '设置图片质量 (1-100, 默认80): ' : 'Set image quality (1-100, default 80): ',
  widthPrompt: isChinese ? '设置最大宽度 (默认1200): ' : 'Set max width (default 1200): ',
  pathNotExist: isChinese ? '错误: 路径不存在' : 'Error: Path does not exist',
  invalidPath: isChinese
    ? '错误: 输入路径必须是图片文件或包含图片的目录'
    : 'Error: Input must be an image file or directory containing images',
  skipOptimized: (filename: string) => (isChinese ? `跳过已优化文件: ${filename}` : `Skipping already optimized file: ${filename}`),
  completeOptimize: (filename: string) => (isChinese ? `优化完成: ${filename}` : `Optimization complete: ${filename}`),
  processError: (filename: string, err: unknown) =>
    isChinese
      ? `处理 ${filename} 时出错: ${err instanceof Error ? err.message : String(err)}`
      : `Error processing ${filename}: ${err instanceof Error ? err.message : String(err)}`,
}

// 创建交互式命令行接口
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// 改进的优化判定方法
async function isOptimized(filePath: string): Promise<boolean> {
  try {
    const metadata = await sharp(filePath).metadata()
    return metadata.format === 'webp' && (metadata.size ? metadata.size < 1024 * 100 : false)
  } catch {
    return false
  }
}

// 修改后的消息对象，添加颜色装饰
const decoratedMessages = {
  ...messages,
  inputPrompt: chalk.hex('#FFA500')(messages.inputPrompt),
  qualityPrompt: chalk.hex('#FFA500')(messages.qualityPrompt),
  widthPrompt: chalk.hex('#FFA500')(messages.widthPrompt),
  skipOptimized: (filename: string) => chalk.gray(messages.skipOptimized(filename)),
  completeOptimize: (filename: string) => chalk.green(messages.completeOptimize(filename)),
  processError: (filename: string, err: unknown) => chalk.red(messages.processError(filename, err)),
  pathNotExist: chalk.red.bold(messages.pathNotExist),
  invalidPath: chalk.red.bold(messages.invalidPath),
}

async function main() {
  // 解析命令行参数
  const argv = await yargs(hideBin(process.argv))
    .option('input', {
      alias: 'i',
      type: 'string',
      description: isChinese ? '输入文件或目录路径' : 'Input file or directory path',
    })
    .option('quality', {
      alias: 'q',
      type: 'number',
      default: 80,
      description: isChinese ? '图片质量 (1-100)' : 'Image quality (1-100)',
    })
    .option('width', {
      alias: 'w',
      type: 'number',
      default: 1200,
      description: isChinese ? '最大宽度' : 'Max width',
    })
    .parse()

  let inputPath = argv.input
  let quality = argv.quality
  let width = argv.width

  // 如果没有提供input参数，进入交互模式
  if (!inputPath) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    inputPath = await new Promise<string>((resolve) => {
      rl.question(messages.inputPrompt, resolve)
    })

    quality = await new Promise<number>((resolve) => {
      rl.question(messages.qualityPrompt, (answer) => {
        resolve(answer ? parseInt(answer) : 80)
      })
    })

    width = await new Promise<number>((resolve) => {
      rl.question(messages.widthPrompt, (answer) => {
        resolve(answer ? parseInt(answer) : 1200)
      })
    })

    rl.close()
  }

  // 处理输入路径
  const fullPath = path.resolve(inputPath)

  if (!fs.existsSync(fullPath)) {
    console.error(messages.pathNotExist)
    return
  }

  const processFile = async (filePath: string) => {
    const spinner = ora(`正在处理 ${path.basename(filePath)}`).start()

    if (await isOptimized(filePath)) {
      spinner.info(decoratedMessages.skipOptimized(path.basename(filePath)))
      return
    }

    try {
      const tempPath = filePath + '.tmp'
      await sharp(filePath).resize({ width, withoutEnlargement: true }).webp({ quality }).toFile(tempPath)

      fs.unlinkSync(filePath)
      fs.renameSync(tempPath, filePath)
      spinner.succeed(decoratedMessages.completeOptimize(path.basename(filePath)))
    } catch (err) {
      spinner.fail(decoratedMessages.processError(path.basename(filePath), err))
    }
  }

  const stat = fs.statSync(fullPath)
  if (stat.isDirectory()) {
    fs.readdirSync(fullPath).forEach(async (item) => {
      const itemPath = path.join(fullPath, item)
      if (/\.(jpg|jpeg|png|webp)$/i.test(item)) {
        await processFile(itemPath)
      }
    })
  } else if (/\.(jpg|jpeg|png|webp)$/i.test(fullPath)) {
    await processFile(fullPath)
  } else {
    console.error(messages.invalidPath)
  }
}

main()

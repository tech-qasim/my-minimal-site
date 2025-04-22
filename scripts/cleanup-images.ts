#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import { fileURLToPath } from 'url' // 导入 fileURLToPath
import { deleteFileWithRetry, t } from './utils.ts' // 导入 t

// 在 ES Modules 中获取目录名
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 清理脚本主逻辑
async function cleanup() {
  const deleteListPath = path.join(__dirname, 'delete-list.json')
  console.log(chalk.cyan(t.messages.startCleanup))
  console.log(chalk.blue(`${t.messages.readingDeleteList}: ${deleteListPath}`))

  if (!fs.existsSync(deleteListPath)) {
    console.log(chalk.yellow(t.messages.listNotFound))
    return
  }

  let filesToDelete: string[] = []
  try {
    const fileContent = fs.readFileSync(deleteListPath, 'utf-8')
    filesToDelete = JSON.parse(fileContent)
    if (!Array.isArray(filesToDelete)) {
      // 使用 Error 对象，但消息来自 t
      throw new Error(t.messages.listFormatError)
    }
    console.log(chalk.blue(t.messages.foundFilesToDelete.replace('{count}', filesToDelete.length.toString())))
  } catch (error: any) {
    // 检查 error 是否有 message 属性
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error(chalk.red(`❌ ${t.messages.listReadError}: ${errorMessage}`))
    // 如果是自定义的 Error，其 message 就是国际化文本
    if (errorMessage === t.messages.listFormatError) {
      // 如果是格式错误，不再重复打印检查提示，因为错误信息已包含
    } else {
      console.log(chalk.yellow(t.messages.checkListFormat))
    }
    return
  }

  if (filesToDelete.length === 0) {
    console.log(chalk.blue(t.messages.listEmpty))
  } else {
    // 增加一个初始延迟，以防万一
    const initialWait = 1000 // 等待1秒
    console.log(chalk.blue(t.messages.waiting.replace('{seconds}', (initialWait / 1000).toString())))
    await new Promise((resolve) => setTimeout(resolve, initialWait))

    for (const file of filesToDelete) {
      await deleteFileWithRetry(file)
    }
  }

  // 清理完成后删除列表文件
  try {
    fs.unlinkSync(deleteListPath)
    console.log(chalk.green(`✓ ${t.messages.deletedListFile}: ${path.basename(deleteListPath)}`))
  } catch (error) {
    console.error(chalk.red(`❌ ${t.messages.deleteListFileError}: ${error}`))
  }

  console.log(chalk.cyan(t.messages.cleanupComplete))
}

cleanup().catch((error) => {
  console.error(chalk.red(t.messages.unhandledError), error)
  process.exit(1)
})

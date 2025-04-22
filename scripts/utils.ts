import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

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
      outputDir: '输出目录',
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
      saved: '节省空间',
      // cleanup-images specific messages
      startCleanup: '=== 开始执行图片清理 ===',
      readingDeleteList: '读取待删除列表',
      listNotFound: '未找到待删除列表文件 (delete-list.json)，无需清理。',
      listFormatError: '删除列表文件格式错误，不是一个有效的数组。',
      foundFilesToDelete: '找到 {count} 个待删除文件。',
      listReadError: '读取或解析删除列表文件失败',
      checkListFormat: '请检查 delete-list.json 文件是否存在且格式正确。',
      listEmpty: '待删除列表为空，无需清理。',
      waiting: '等待 {seconds} 秒...',
      deleted: '已删除',
      fileBusyRetry: '文件被占用，将在 {seconds} 秒后重试 ({retries}/{maxRetries})',
      fileNotFoundMaybeDeleted: '文件不存在 (可能已被删除)',
      deleteFailed: '删除失败',
      deletedListFile: '已删除列表文件',
      deleteListFileError: '删除列表文件失败',
      cleanupComplete: '=== 清理完成 ===',
      unhandledError: '\n清理过程中发生未处理的错误:',
    },
  },
  en: {
    cli: {
      input: 'Input file or directory path',
      quality: 'Image quality (1-100)',
      width: 'Maximum width',
      format: 'Output format',
      keepOriginal: 'Keep original files',
      recursive: 'Process subdirectories recursively',
      outputDir: 'Output directory',
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
      saved: 'Space saved',
      // cleanup-images specific messages
      startCleanup: '=== Starting image cleanup ===',
      readingDeleteList: 'Reading delete list',
      listNotFound: 'Delete list file (delete-list.json) not found, no cleanup needed.',
      listFormatError: 'Delete list file format error, not a valid array.',
      foundFilesToDelete: 'Found {count} files to delete.',
      listReadError: 'Failed to read or parse delete list file',
      checkListFormat: 'Please check if delete-list.json exists and has the correct format.',
      listEmpty: 'Delete list is empty, no cleanup needed.',
      waiting: 'Waiting {seconds} seconds...',
      deleted: 'Deleted',
      fileBusyRetry: 'File is busy, retrying in {seconds} seconds ({retries}/{maxRetries})',
      fileNotFoundMaybeDeleted: 'File not found (may have been deleted)',
      deleteFailed: 'Delete failed',
      deletedListFile: 'Deleted list file',
      deleteListFileError: 'Failed to delete list file',
      cleanupComplete: '=== Cleanup complete ===',
      unhandledError: '\nUnhandled error during cleanup:',
    },
  },
};

// 检测系统语言
const lang = (process.env.LANG || process.env.LANGUAGE || '').toLowerCase().includes('zh') ? 'zh' : 'en';
export const t = i18n[lang];

// 健壮的文件删除函数（带延迟和重试）
export async function deleteFileWithRetry(filepath: string, maxRetries = 5, initialDelay = 1000): Promise<void> {
  let retries = 0;
  let delay = initialDelay;

  while (retries < maxRetries) {
    try {
      // 检查文件是否存在
      if (!fs.existsSync(filepath)) {
        console.log(chalk.gray(`- ${t.messages.fileNotFoundMaybeDeleted}: ${path.basename(filepath)}`));
        return; // 文件不存在，视为完成
      }
      fs.unlinkSync(filepath);
      console.log(chalk.green(`✓ ${t.messages.deleted}: ${path.basename(filepath)}`));
      return; // 删除成功，退出函数
    } catch (error: any) {
      if (error.code === 'EBUSY' && retries < maxRetries - 1) {
        retries++;
        const retryMsg = t.messages.fileBusyRetry
          .replace('{seconds}', (delay / 1000).toString())
          .replace('{retries}', retries.toString())
          .replace('{maxRetries}', (maxRetries - 1).toString());
        console.log(chalk.yellow(`! ${retryMsg}: ${path.basename(filepath)}`));
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2; // 增加等待时间
      } else if (error.code === 'ENOENT') {
        // 即使上面检查过，unlink时仍可能不存在
        console.log(chalk.gray(`- ${t.messages.fileNotFoundMaybeDeleted}: ${path.basename(filepath)}`));
        return; // 文件不存在，视为完成
      } else {
        console.log(chalk.red(`✗ ${t.messages.deleteFailed}: ${path.basename(filepath)} - ${error}`));
        return; // 其他错误或达到最大重试次数，退出
      }
    }
  }
}
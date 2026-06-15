import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_DIR = path.join(__dirname, 'public');
const OUTPUT_DIR = path.join(__dirname, 'public-compressed');

const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.mov'];

async function getFfmpegPath() {
  try {
    const ffmpegStatic = await import('ffmpeg-static');
    return ffmpegStatic.default || 'ffmpeg';
  } catch {
    return 'ffmpeg';
  }
}

async function compressVideo(inputPath, outputPath) {
  try {
    const { execa } = await import('execa');
    const stats = await fs.stat(inputPath);
    const originalSize = stats.size;
    
    const ffmpeg = await getFfmpegPath();
    if (!ffmpeg) {
      throw new Error('FFmpeg not found');
    }
    
    await execa(ffmpeg, [
      '-i', inputPath,
      '-c:v', 'libx264',
      '-crf', '28',
      '-preset', 'medium',
      '-c:a', 'aac',
      '-b:a', '128k',
      '-movflags', '+faststart',
      '-y',
      outputPath
    ]);
    
    const outputStats = await fs.stat(outputPath);
    const compressedSize = outputStats.size;
    
    return { originalSize, compressedSize };
  } catch (error) {
    console.error(`❌ 压缩视频失败: ${inputPath}`);
    console.error(error.message);
    return null;
  }
}

async function main() {
  console.log('🚀 开始压缩 public 文件夹中的视频...');
  console.log(`📁 输入目录: ${INPUT_DIR}`);
  console.log(`📁 输出目录: ${OUTPUT_DIR}`);
  console.log('');
  
  await fs.ensureDir(OUTPUT_DIR);
  
  const files = await fs.readdir(INPUT_DIR, { withFileTypes: true });
  let totalOriginalSize = 0;
  let totalCompressedSize = 0;
  let processedFiles = 0;
  let failedFiles = [];
  
  for (const file of files) {
    const inputPath = path.join(INPUT_DIR, file.name);
    
    if (file.isDirectory()) {
      const outputSubDir = path.join(OUTPUT_DIR, file.name);
      await fs.ensureDir(outputSubDir);
      continue;
    }
    
    const ext = path.extname(file.name).toLowerCase();
    
    if (!VIDEO_EXTENSIONS.includes(ext)) {
      const outputPath = path.join(OUTPUT_DIR, file.name);
      await fs.copyFile(inputPath, outputPath);
      continue;
    }
    
    const outputPath = path.join(OUTPUT_DIR, file.name);
    const result = await compressVideo(inputPath, outputPath);
    
    if (result) {
      totalOriginalSize += result.originalSize;
      totalCompressedSize += result.compressedSize;
      processedFiles++;
      
      const savedPercent = ((result.originalSize - result.compressedSize) / result.originalSize * 100).toFixed(1);
      console.log(`✅ ${file.name}: ${(result.originalSize / 1024 / 1024).toFixed(2)} MB -> ${(result.compressedSize / 1024 / 1024).toFixed(2)} MB (-${savedPercent}%)`);
    } else {
      failedFiles.push(inputPath);
      await fs.copyFile(inputPath, outputPath);
    }
  }
  
  console.log('');
  console.log('==========================================');
  console.log('📊 压缩完成!');
  console.log(`📝 处理视频: ${processedFiles}`);
  console.log(`❌ 失败文件: ${failedFiles.length}`);
  console.log('');
  console.log(`📦 原始大小: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`📦 压缩后大小: ${(totalCompressedSize / 1024 / 1024).toFixed(2)} MB`);
  const totalSaved = ((totalOriginalSize - totalCompressedSize) / totalOriginalSize * 100).toFixed(1);
  console.log(`💰 节省空间: ${((totalOriginalSize - totalCompressedSize) / 1024 / 1024).toFixed(2)} MB (-${totalSaved}%)`);
}

main().catch(err => {
  console.error('❌ 压缩过程出错:', err);
  process.exit(1);
});
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_DIR = path.join(__dirname, 'uploads');
const OUTPUT_DIR = path.join(__dirname, 'uploads-compressed');

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];
const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.mov'];

let ffmpegPath = '';
async function getFfmpegPath() {
  if (ffmpegPath) return ffmpegPath;
  try {
    const ffmpegStatic = await import('ffmpeg-static');
    ffmpegPath = ffmpegStatic.default || '';
  } catch {
    ffmpegPath = 'ffmpeg';
  }
  return ffmpegPath;
}

let totalOriginalSize = 0;
let totalCompressedSize = 0;
let processedFiles = 0;
let skippedFiles = 0;
let failedFiles = [];

async function compressImage(inputPath, outputPath) {
  try {
    const { default: sharp } = await import('sharp');
    const stats = await fs.stat(inputPath);
    const originalSize = stats.size;
    
    const ext = path.extname(inputPath).toLowerCase();
    
    let outputBuffer;
    if (ext === '.png') {
      outputBuffer = await sharp(inputPath)
        .png({ quality: 80, compressionLevel: 6 })
        .toBuffer();
    } else {
      outputBuffer = await sharp(inputPath)
        .jpeg({ quality: 85 })
        .toBuffer();
    }
    
    await fs.writeFile(outputPath, outputBuffer);
    const compressedSize = outputBuffer.length;
    
    return { originalSize, compressedSize };
  } catch (error) {
    console.error(`❌ 压缩图片失败: ${inputPath}`);
    console.error(error.message);
    return null;
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

async function processDirectory(dir) {
  const files = await fs.readdir(dir, { withFileTypes: true });
  
  for (const file of files) {
    const inputPath = path.join(dir, file.name);
    const relativePath = path.relative(INPUT_DIR, dir);
    const outputDir = path.join(OUTPUT_DIR, relativePath);
    
    if (file.isDirectory()) {
      await fs.ensureDir(outputDir);
      await processDirectory(inputPath);
    } else {
      const ext = path.extname(file.name).toLowerCase();
      
      if (!IMAGE_EXTENSIONS.includes(ext) && !VIDEO_EXTENSIONS.includes(ext)) {
        skippedFiles++;
        const outputPath = path.join(outputDir, file.name);
        await fs.copyFile(inputPath, outputPath);
        continue;
      }
      
      await fs.ensureDir(outputDir);
      const outputPath = path.join(outputDir, file.name);
      
      let result;
      if (IMAGE_EXTENSIONS.includes(ext)) {
        result = await compressImage(inputPath, outputPath);
      } else {
        result = await compressVideo(inputPath, outputPath);
      }
      
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
  }
}

async function main() {
  console.log('🚀 开始压缩媒体文件...');
  console.log(`📁 输入目录: ${INPUT_DIR}`);
  console.log(`📁 输出目录: ${OUTPUT_DIR}`);
  console.log('');
  
  await fs.ensureDir(OUTPUT_DIR);
  await processDirectory(INPUT_DIR);
  
  console.log('');
  console.log('==========================================');
  console.log('📊 压缩完成!');
  console.log(`📝 处理文件: ${processedFiles}`);
  console.log(`⏭️ 跳过文件: ${skippedFiles}`);
  console.log(`❌ 失败文件: ${failedFiles.length}`);
  console.log('');
  console.log(`📦 原始大小: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`📦 压缩后大小: ${(totalCompressedSize / 1024 / 1024).toFixed(2)} MB`);
  const totalSaved = ((totalOriginalSize - totalCompressedSize) / totalOriginalSize * 100).toFixed(1);
  console.log(`💰 节省空间: ${((totalOriginalSize - totalCompressedSize) / 1024 / 1024).toFixed(2)} MB (-${totalSaved}%)`);
  
  if (failedFiles.length > 0) {
    console.log('');
    console.log('❌ 失败文件列表:');
    failedFiles.forEach(file => console.log(`  - ${file}`));
  }
}

main().catch(err => {
  console.error('❌ 压缩过程出错:', err);
  process.exit(1);
});

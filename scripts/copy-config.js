import fs from 'fs';
import path from 'path';

const srcPath = path.join(process.cwd(), 'src', 'data', 'config.json');
const destDir = path.join(process.cwd(), 'dist', 'src', 'data');
const destPath = path.join(destDir, 'config.json');

try {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log('Config file copied successfully');
  } else {
    console.log('Config file not found:', srcPath);
  }
} catch (error) {
  console.error('Error copying config file:', error);
  process.exit(1);
}

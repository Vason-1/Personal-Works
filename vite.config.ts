import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import {copyFileSync, existsSync, mkdirSync, readdirSync} from 'fs';
import {join} from 'path';

const copyStaticAssets = () => {
  return {
    name: 'copy-static-assets',
    writeBundle() {
      const copyDir = (srcDir: string, destDir: string, dirName: string) => {
        if (!existsSync(srcDir)) {
          console.log(`${dirName} folder not found`);
          return;
        }
        
        if (!existsSync(destDir)) {
          mkdirSync(destDir, {recursive: true});
        }
        
        const copyRecursive = (source: string, destination: string) => {
          const files = readdirSync(source, {withFileTypes: true});
          
          for (const file of files) {
            const srcPath = join(source, file.name);
            const destPath = join(destination, file.name);
            
            if (file.isDirectory()) {
              if (!existsSync(destPath)) {
                mkdirSync(destPath, {recursive: true});
              }
              copyRecursive(srcPath, destPath);
            } else {
              try {
                copyFileSync(srcPath, destPath);
              } catch (e) {
                console.log(`Warning: Could not copy ${srcPath}`);
              }
            }
          }
        };
        
        copyRecursive(srcDir, destDir);
        console.log(`${dirName} folder copied to dist`);
      };
      
      copyDir(join(__dirname, 'uploads'), join(__dirname, 'dist', 'uploads'), 'Uploads');
      copyDir(join(__dirname, 'public'), join(__dirname, 'dist'), 'Public');
    },
  };
};

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss(), copyStaticAssets()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: false,
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
        },
      },
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
    },
  };
});

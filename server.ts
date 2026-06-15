import express from "express";
import path from "path";
import fs from "fs-extra";
import multer from "multer";
import cors from "cors";

const isProduction = process.env.NODE_ENV === "production";

let __dirname: string;
if (isProduction) {
  __dirname = path.resolve();
} else {
  try {
    __dirname = path.dirname(new URL(import.meta.url).pathname);
  } catch {
    __dirname = path.resolve();
  }
}

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || "3001", 10);
  
  const ROOT_DIR = isProduction ? path.dirname(__dirname) : process.cwd();

  app.use(cors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin'],
    credentials: true
  }));
  
  app.options('*', cors());
  app.use(express.json({ limit: '100mb' }));
  app.use(express.urlencoded({ extended: true, limit: '100mb' }));

  const UPLOADS_DIR = path.join(ROOT_DIR, "uploads");
  const DATA_DIR = path.join(ROOT_DIR, "src", "data");
  const PUBLIC_DIR = path.join(ROOT_DIR, "public");

  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      time: new Date().toISOString(),
      env: process.env.NODE_ENV,
      root: ROOT_DIR
    });
  });

  app.get("/api/config", async (req, res) => {
    const configPath = path.join(DATA_DIR, "config.json");
    try {
      if (await fs.pathExists(configPath)) {
        const config = await fs.readJson(configPath);
        res.json(config || {});
      } else {
        res.json({});
      }
    } catch (error) {
      console.error("Error reading config.json:", error);
      res.json({});
    }
  });

  app.post("/api/config", async (req, res) => {
    if (isProduction) {
      return res.status(503).json({ 
        error: "Config modification is not available in production",
        message: "Please modify config locally and redeploy"
      });
    }
    const configPath = path.join(DATA_DIR, "config.json");
    await fs.writeJson(configPath, req.body, { spaces: 2 });
    res.json({ success: true });
  });

  const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
      const fileIndex = (req as any).fileIndex || 0;
      const paths = (req as any).paths || [];
      const relativePath = paths[fileIndex] || file.originalname;
      
      const pathParts = relativePath.split('/');
      if (pathParts.length > 1) {
        const folderPath = path.join(UPLOADS_DIR, ...pathParts.slice(0, -1));
        try {
          await fs.ensureDir(folderPath);
          cb(null, folderPath);
          return;
        } catch (err) {
          console.error("Failed to create folder:", err);
        }
      }
      cb(null, UPLOADS_DIR);
    },
    filename: (req, file, cb) => {
      const safeName = file.originalname.replace(/[^a-z0-9.\-_]/gi, '_');
      cb(null, safeName);
    },
  });

  const upload = multer({ 
    storage,
    limits: { fileSize: 500 * 1024 * 1024 }
  });

  app.post("/api/upload", upload.array("files"), async (req, res) => {
    if (isProduction) {
      return res.status(503).json({ 
        error: "File upload is not available in production environment",
        message: "Please upload files locally and redeploy"
      });
    }
    
    try {
      const files = req.files as Express.Multer.File[];
      const paths = req.body?.paths || [];
      
      if (!files || files.length === 0) {
        return res.status(400).json({ error: "No files uploaded" });
      }
      
      const materialData = await Promise.all(files.map(async (file, index) => {
        const relativePath = Array.isArray(paths) ? (paths[index] || file.originalname) : file.originalname;
        const pathParts = relativePath.split('/');
        const hasFolder = pathParts.length > 1;
        const folderName = hasFolder ? pathParts[0] : null;
        
        let url = `/uploads/${file.filename}`;
        
        if (hasFolder) {
          const folderPath = path.join(UPLOADS_DIR, ...pathParts.slice(0, -1));
          await fs.ensureDir(folderPath);
          
          const sourcePath = path.join(UPLOADS_DIR, file.filename);
          const newFilePath = path.join(folderPath, file.filename);
          
          if (await fs.pathExists(sourcePath)) {
            await fs.move(sourcePath, newFilePath, { overwrite: true });
          }
          
          const relativeUrlPath = path.join(...pathParts.slice(0, -1), file.filename);
          url = `/uploads/${relativeUrlPath}`;
        }
        
        return {
          name: file.originalname,
          url: url,
          size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
          type: file.mimetype.startsWith("video/") ? "video" : "image",
          date: new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
          folder: folderName
        };
      }));

      res.json(materialData);
    } catch (error: any) {
      res.status(500).json({ 
        error: "Processing failed after upload",
        details: error.message 
      });
    }
  });

  app.delete("/api/delete-file", async (req, res) => {
    if (isProduction) {
      return res.status(503).json({ 
        error: "File deletion is not available in production",
        message: "Please delete files locally and redeploy"
      });
    }
    
    const filename = req.body?.filename || req.query.filename;
    const folder = req.body?.folder || req.query.folder;
    
    if (!filename) {
      return res.status(400).json({ error: "Filename is required" });
    }

    try {
      let filePath;
      if (folder) {
        filePath = path.join(UPLOADS_DIR, folder, filename);
      } else {
        filePath = path.join(UPLOADS_DIR, filename);
      }
      
      if (await fs.pathExists(filePath)) {
        await fs.remove(filePath);
        res.json({ success: true, message: "File deleted successfully" });
      } else {
        res.status(404).json({ error: "File not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete file" });
    }
  });

  app.delete("/api/delete-folder", async (req, res) => {
    if (isProduction) {
      return res.status(503).json({ 
        error: "Folder deletion is not available in production",
        message: "Please delete folders locally and redeploy"
      });
    }
    
    const folder = req.body?.folder || req.query.folder;
    
    if (!folder) {
      return res.status(400).json({ error: "Folder name is required" });
    }

    try {
      const folderPath = path.join(UPLOADS_DIR, folder);
      
      if (await fs.pathExists(folderPath)) {
        await fs.remove(folderPath);
        res.json({ success: true, message: "Folder deleted successfully" });
      } else {
        res.status(404).json({ error: "Folder not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete folder" });
    }
  });

  app.get('/hero-video.mp4', async (req, res) => {
    const videoPath = path.join(PUBLIC_DIR, 'hero-video.mp4');
    
    try {
      const stats = await fs.stat(videoPath);
      
      res.setHeader('Content-Type', 'video/mp4');
      res.setHeader('Accept-Ranges', 'bytes');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Range');
      
      const range = req.headers.range;
      if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : stats.size - 1;
        const chunksize = (end - start) + 1;
        
        res.setHeader('Content-Range', `bytes ${start}-${end}/${stats.size}`);
        res.setHeader('Content-Length', chunksize);
        res.status(206);
        
        fs.createReadStream(videoPath, { start, end }).pipe(res);
      } else {
        res.setHeader('Content-Length', stats.size);
        fs.createReadStream(videoPath).pipe(res);
      }
    } catch (err) {
      res.status(404).send('Video not found');
    }
  });

  app.use(express.static(PUBLIC_DIR, {
    setHeaders: (res, path) => {
      if (path.endsWith('.mp4')) {
        res.setHeader('Content-Type', 'video/mp4');
        res.setHeader('Accept-Ranges', 'bytes');
        res.setHeader('Access-Control-Allow-Origin', '*');
      }
    }
  }));

  const distUploadsDir = path.join(__dirname, "dist", "uploads");
  app.use("/uploads", express.static(isProduction ? distUploadsDir : UPLOADS_DIR, {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.mp4')) {
        res.setHeader('Content-Type', 'video/mp4');
        res.setHeader('Accept-Ranges', 'bytes');
      }
    }
  }));

  if (!isProduction) {
    try {
      const { createServer: createViteServer } = await import('vite');
      const vite = await createViteServer({
        server: { 
          middlewareMode: true,
          hmr: false,
          proxy: {
            '/api': {
              target: 'http://localhost:3001',
              changeOrigin: true,
            },
          }
        },
        appType: "spa",
      });
      app.use(vite.middlewares);
    } catch (err) {
      console.warn("Vite not available, running without dev server");
    }
  } else {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
  
  server.on('listening', () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log(`CORS enabled with credentials support`);
  });
}

startServer().catch(err => {
  console.error("FATAL: Server failed to start:", err);
  process.exit(1);
});

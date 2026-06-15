import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs-extra';
import path from 'path';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const configPath = path.join(process.cwd(), 'src', 'data', 'config.json');
  
  if (req.method === 'GET') {
    try {
      if (await fs.pathExists(configPath)) {
        const config = await fs.readJson(configPath);
        return res.status(200).json(config || {});
      }
      return res.status(200).json({});
    } catch (error) {
      console.error('Error reading config.json:', error);
      return res.status(200).json({});
    }
  }
  
  if (req.method === 'POST') {
    return res.status(503).json({
      error: "Config modification is not available in production",
      message: "Please modify config locally and redeploy"
    });
  }
  
  res.status(405).json({ error: 'Method not allowed' });
}

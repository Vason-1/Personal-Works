import { createServer } from 'http';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serverPath = path.join(__dirname, '../dist/server.cjs');

async function main() {
  const { default: server } = await import(serverPath);
  return server;
}

export async function handleRequest(request) {
  const server = await main();
  return server.handle(request);
}

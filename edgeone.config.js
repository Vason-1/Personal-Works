module.exports = {
  build: {
    command: 'npm install && npm run build',
    outputDir: 'dist',
    nodeVersion: '24.x'
  },
  server: {
    port: 3001,
    script: 'dist/server.cjs',
    env: {
      NODE_ENV: 'production'
    }
  }
};

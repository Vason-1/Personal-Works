#!/bin/bash
set -e

echo "Current directory: $(pwd)"
echo "Listing files:"
ls -la

if [ -f "package.json" ]; then
  echo "package.json found"
  npm install
  npm run build
else
  echo "ERROR: package.json not found!"
  exit 1
fi

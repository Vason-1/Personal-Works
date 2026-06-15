const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'src', 'data', 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// SVG placeholder template
const createPlaceholderSvg = (index) => {
  const colors = [
    ['#667eea', '#764ba2'],
    ['#f093fb', '#f5576c'],
    ['#4facfe', '#00f2fe'],
    ['#43e97b', '#38f9d7'],
    ['#fa709a', '#fee140'],
    ['#a18cd1', '#fbc2eb'],
    ['#ff9a9e', '#fecfef'],
    ['#ffecd2', '#fcb69f'],
  ];
  const [c1, c2] = colors[index % colors.length];
  
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
    <defs>
      <linearGradient id="g${index}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${c1}"/>
        <stop offset="100%" style="stop-color:${c2}"/>
      </linearGradient>
    </defs>
    <rect fill="url(#g${index})" width="800" height="600"/>
    <rect x="50" y="50" width="700" height="500" fill="none" stroke="white" stroke-width="1" opacity="0.1" rx="20"/>
    <rect x="100" y="100" width="600" height="400" fill="none" stroke="white" stroke-width="1" opacity="0.05" rx="10"/>
    <circle cx="400" cy="300" r="60" fill="white" opacity="0.1"/>
    <circle cx="400" cy="300" r="30" fill="white" opacity="0.15"/>
  </svg>`;
  
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
};

let placeholderIndex = 0;

// Function to recursively replace upload paths
const replaceUploadPaths = (obj) => {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      if (obj[key].startsWith('/uploads/')) {
        obj[key] = createPlaceholderSvg(placeholderIndex++);
      }
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      replaceUploadPaths(obj[key]);
    }
  }
};

replaceUploadPaths(config);

fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
console.log('Successfully replaced all upload paths with SVG placeholders!');
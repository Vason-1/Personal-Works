const fs = require('fs');
const path = require('path');

const uploadsDir = path.join(__dirname, 'uploads');

// Ensure uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// List of missing files from config.json
const missingFiles = [
  '1778752899894-899317971-1.mp4',
  '1778748799755-732383630-4.jpg',
  '1778745080644-48016977-1.jpg',
  '1778745080664-811540202-10.jpg',
  '1778745080729-22867176-2.jpg',
  '1778745080767-835037962-3.jpg',
  '1778745080783-121408917-4.jpg',
  '1778745080833-950288442-5.jpg',
  '1778745080867-951576129-6.jpg',
  '1778745080916-609486415-7.jpg',
  '1778745080968-309197083-8.jpg',
  '1778745081030-647060807-9.jpg',
  '1778745112172-731919684-_____________________________________________________________1_________________yaya_________________________.jpg',
  '1778745119394-889377474-_____________________________________________________________2_________________yaya_________________________.jpg'
];

// Generate colorful SVG placeholder images
const colors = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
  'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)'
];

missingFiles.forEach((filename, index) => {
  const filePath = path.join(uploadsDir, filename);
  
  if (!fs.existsSync(filePath)) {
    const color = colors[index % colors.length];
    const isVideo = filename.endsWith('.mp4');
    
    if (isVideo) {
      // Create a placeholder for video (we'll use an image)
      const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="g${index}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1a2e"/>
      <stop offset="100%" style="stop-color:#16213e"/>
    </linearGradient>
  </defs>
  <rect fill="url(#g${index})" width="800" height="600"/>
  <circle cx="400" cy="300" r="60" fill="rgba(255,255,255,0.1)"/>
  <polygon points="375,280 375,320 430,300" fill="white" opacity="0.8"/>
  <text x="400" y="370" text-anchor="middle" fill="white" opacity="0.5" font-size="14">Video Placeholder</text>
</svg>
      `.trim();
      fs.writeFileSync(filePath.replace('.mp4', '.jpg'), svgContent);
    } else {
      const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="g${index}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1a2e"/>
      <stop offset="100%" style="stop-color:#16213e"/>
    </linearGradient>
  </defs>
  <rect fill="url(#g${index})" width="800" height="600"/>
  <rect x="100" y="100" width="600" height="400" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="2" rx="20"/>
  <rect x="200" y="200" width="400" height="200" fill="rgba(255,255,255,0.05)"/>
  <circle cx="400" cy="300" r="40" fill="rgba(255,255,255,0.1)"/>
  <text x="400" y="450" text-anchor="middle" fill="white" opacity="0.4" font-size="12">Image Placeholder</text>
</svg>
      `.trim();
      fs.writeFileSync(filePath, svgContent);
    }
    
    console.log(`Created: ${filename}`);
  }
});

console.log('All placeholder images generated!');
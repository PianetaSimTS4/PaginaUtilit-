import fs from 'fs';
import path from 'path';

const distDir = path.join(process.cwd(), 'dist');

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy file helper
function copyFile(src, dest) {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${src} -> ${dest}`);
  }
}

// Copy directory helper recursively
function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
  console.log(`Copied directory ${src} -> ${dest}`);
}

// 1. Copy index.html
copyFile(path.join(process.cwd(), 'index.html'), path.join(distDir, 'index.html'));

// 1b. Copy guides.json
copyFile(path.join(process.cwd(), 'guides.json'), path.join(distDir, 'guides.json'));

// 2. Copy logo.png at root
copyFile(path.join(process.cwd(), 'logo.png'), path.join(distDir, 'logo.png'));

// 3. Copy images folder
const imagesSrc = path.join(process.cwd(), 'images');
const imagesDest = path.join(distDir, 'images');
if (fs.existsSync(imagesSrc)) {
  copyDir(imagesSrc, imagesDest);
}

// 4. Copy public folder contents to dist
const publicSrc = path.join(process.cwd(), 'public');
if (fs.existsSync(publicSrc)) {
  // We want to copy contents of public to dist
  const entries = fs.readdirSync(publicSrc, { withFileTypes: true });
  for (let entry of entries) {
    const srcPath = path.join(publicSrc, entry.name);
    const destPath = path.join(distDir, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
  console.log(`Copied public folder contents to dist`);
}

console.log('Build completed successfully!');

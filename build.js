import fs from 'fs';
import path from 'path';

const distDir = path.join(process.cwd(), 'dist');


if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}


fs.writeFileSync(path.join(distDir, '.nojekyll'), '');


function copyFile(src, dest) {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${src} -> ${dest}`);
  }
}


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


copyFile(path.join(process.cwd(), 'index.html'), path.join(distDir, 'index.html'));


copyFile(path.join(process.cwd(), 'guides.json'), path.join(distDir, 'guides.json'));


copyFile(path.join(process.cwd(), 'logo.png'), path.join(distDir, 'logo.png'));


const imagesSrc = path.join(process.cwd(), 'images');
const imagesDest = path.join(distDir, 'images');
if (fs.existsSync(imagesSrc)) {
  copyDir(imagesSrc, imagesDest);
}


const publicSrc = path.join(process.cwd(), 'public');
if (fs.existsSync(publicSrc)) {
  
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

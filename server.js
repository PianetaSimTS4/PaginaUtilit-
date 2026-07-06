import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


app.get('/api/list-images', (req, res) => {
  try {
    const imagesDir = path.join(process.cwd(), 'images');
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }
    const files = fs.readdirSync(imagesDir);
    const validExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'];
    const imageFiles = files.filter(f => validExtensions.includes(path.extname(f).toLowerCase()));
    res.json({ status: 'success', images: imageFiles });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
});


app.post('/api/save-guides', (req, res) => {
  try {
    const guidesData = req.body;
    
    
    fs.writeFileSync(
      path.join(process.cwd(), 'guides.json'), 
      JSON.stringify(guidesData, null, 2), 
      'utf-8'
    );
    
    
    const distGuidesPath = path.join(process.cwd(), 'dist', 'guides.json');
    if (fs.existsSync(path.join(process.cwd(), 'dist'))) {
      fs.writeFileSync(distGuidesPath, JSON.stringify(guidesData, null, 2), 'utf-8');
    }
    
    res.json({ status: 'success', message: 'Guides saved successfully' });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
});


app.post('/api/upload-image', (req, res) => {
  try {
    const { filename, base64Data } = req.body;
    if (!filename || !base64Data) {
      throw new Error('Missing filename or base64Data');
    }
    
    const safeFilename = path.basename(filename);
    
    
    const imagesDir = path.join(process.cwd(), 'images');
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }
    
    
    let cleanBase64 = base64Data;
    if (base64Data.includes(',')) {
      cleanBase64 = base64Data.split(',')[1];
    }
    const fileBytes = Buffer.from(cleanBase64, 'base64');
    
    
    fs.writeFileSync(path.join(imagesDir, safeFilename), fileBytes);
    
    
    const distImagesDir = path.join(process.cwd(), 'dist', 'images');
    if (fs.existsSync(path.join(process.cwd(), 'dist'))) {
      if (!fs.existsSync(distImagesDir)) {
        fs.mkdirSync(distImagesDir, { recursive: true });
      }
      fs.writeFileSync(path.join(distImagesDir, safeFilename), fileBytes);
    }
    
    
    const publicImagesDir = path.join(process.cwd(), 'public', 'images');
    if (fs.existsSync(publicImagesDir)) {
      fs.writeFileSync(path.join(publicImagesDir, safeFilename), fileBytes);
    }
    
    res.json({
      status: 'success',
      message: 'Image uploaded successfully',
      url: 'images/' + safeFilename
    });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
});


app.post('/api/delete-image', (req, res) => {
  try {
    const { filename } = req.body;
    if (!filename) {
      throw new Error('Missing filename');
    }
    
    const safeFilename = path.basename(filename);
    
    const pathsToDelete = [
      path.join(process.cwd(), 'images', safeFilename),
      path.join(process.cwd(), 'dist', 'images', safeFilename),
      path.join(process.cwd(), 'public', 'images', safeFilename)
    ];
    
    let deletedAny = false;
    for (const p of pathsToDelete) {
      if (fs.existsSync(p) && fs.statSync(p).isFile()) {
        fs.unlinkSync(p);
        deletedAny = true;
      }
    }
    
    res.json({ status: 'success', message: `Deleted ${safeFilename}` });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
});


const isProd = process.env.NODE_ENV === 'production';
const baseDir = isProd && fs.existsSync(path.join(process.cwd(), 'dist')) 
  ? path.join(process.cwd(), 'dist') 
  : process.cwd();

console.log(`[Server] Serving static content from: ${baseDir}`);


app.use('/images', express.static(path.join(baseDir, 'images')));
app.use('/public', express.static(path.join(baseDir, 'public')));
app.use(express.static(baseDir));


app.get('*', (req, res) => {
  res.sendFile(path.join(baseDir, 'index.html'));
});


app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Server] Running on port ${PORT} (host: 0.0.0.0)`);
});

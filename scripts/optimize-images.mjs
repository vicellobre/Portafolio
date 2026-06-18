import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imgDir = path.resolve(__dirname, '../assets/img');
const skipLazy = new Set(['foto.png', 'hero-bg.jpg', 'favicon.png', 'apple-touch-icon.png']);
const exts = new Set(['.jpg', '.jpeg', '.png']);

const files = (await fs.readdir(imgDir)).filter((name) => exts.has(path.extname(name).toLowerCase()));

let savedBytes = 0;

for (const name of files) {
  const inputPath = path.join(imgDir, name);
  const ext = path.extname(name).toLowerCase();
  const base = path.basename(name, ext);
  const webpPath = path.join(imgDir, `${base}.webp`);
  const buffer = await fs.readFile(inputPath);
  const originalSize = buffer.length;

  const pipeline = sharp(buffer);
  await pipeline.metadata();

  if (ext === '.png') {
    await sharp(buffer)
      .png({ quality: 80, compressionLevel: 9 })
      .toFile(inputPath + '.tmp');
  } else {
    await sharp(buffer)
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(inputPath + '.tmp');
  }

  const optimized = await fs.readFile(inputPath + '.tmp');
  if (optimized.length < originalSize) {
    await fs.rename(inputPath + '.tmp', inputPath);
    savedBytes += originalSize - optimized.length;
  } else {
    await fs.unlink(inputPath + '.tmp');
  }

  await sharp(await fs.readFile(inputPath))
    .webp({ quality: 80 })
    .toFile(webpPath);
}

const htmlFiles = [
  path.resolve(__dirname, '../index.html'),
  path.resolve(__dirname, '../index-en.html'),
];

for (const htmlPath of htmlFiles) {
  let html = await fs.readFile(htmlPath, 'utf8');

  for (const name of files) {
    const ext = path.extname(name).toLowerCase();
    const base = path.basename(name, ext);
    const webpName = `${base}.webp`;
    const src = `assets/img/${name}`;
    const webpSrc = `assets/img/${webpName}`;
    const imgTagRegex = new RegExp(
      `<img([^>]*?)src="${src.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"([^>]*?)>`,
      'g'
    );

    html = html.replace(imgTagRegex, (match, before, after) => {
      if (match.includes('<picture')) return match;
      const lazy = skipLazy.has(name) ? '' : ' loading="lazy"';
      const attrs = `${before}src="${src}"${after}`.replace(/\s*loading="lazy"/, '');
      return `<picture><source srcset="${webpSrc}" type="image/webp"><img${attrs}${lazy}></picture>`;
    });
  }

  await fs.writeFile(htmlPath, html);
}

console.log(`Optimized ${files.length} images. Saved ~${Math.round(savedBytes / 1024)} KB on disk.`);

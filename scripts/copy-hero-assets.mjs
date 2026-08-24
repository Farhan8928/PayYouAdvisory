import fs from 'node:fs'
import path from 'node:path'

const SRC_DIR = 'C:/Users/Rapid Solutions/.gemini/antigravity/brain/be239cab-cecc-4eac-8582-542a6307c7c7'
const DEST_DIR = path.resolve('public/images')

const files = [
  { src: 'hero_loans_3d_1787587217844.jpg', dest: 'hero-slide-1.jpg' },
  { src: 'hero_homeloan_3d_1787587244479.jpg', dest: 'hero-slide-2.jpg' },
  { src: 'hero_business_3d_1787587274793.jpg', dest: 'hero-slide-3.jpg' },
  { src: 'hero_calculators_3d_1787587295010.jpg', dest: 'hero-slide-4.jpg' },
]

for (const f of files) {
  const srcPath = path.join(SRC_DIR, f.src)
  const destPath = path.join(DEST_DIR, f.dest)
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath)
    console.log(`Copied ${f.src} -> ${destPath}`)
  } else {
    console.log(`Not found: ${srcPath}`)
  }
}

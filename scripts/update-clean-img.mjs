import fs from 'node:fs'
import path from 'node:path'

const src = 'C:/Users/Rapid Solutions/.gemini/antigravity/brain/be239cab-cecc-4eac-8582-542a6307c7c7/clean_advisory_desk_1787587829087.jpg'
const dests = [
  'public/images/consult-desk-1600.webp',
  'public/images/consult-desk-960.webp',
  'public/images/consult-desk-480.webp',
  'public/images/consult-desk.jpg',
]

for (const d of dests) {
  fs.copyFileSync(src, path.resolve(d))
  console.log(`Updated ${d}`)
}

import fs from 'node:fs'

const content = fs.readFileSync('C:/Users/Rapid Solutions/.gemini/antigravity/brain/be239cab-cecc-4eac-8582-542a6307c7c7/.system_generated/steps/4/content.md', 'utf-8')

// Look for h1, h2, h3, section titles, and key classes
const h2Matches = [...content.matchAll(/<h2[^>]*>(.*?)<\/h2>/gis)].map(m => m[1].replace(/<[^>]+>/g, '').trim())
const h3Matches = [...content.matchAll(/<h3[^>]*>(.*?)<\/h3>/gis)].map(m => m[1].replace(/<[^>]+>/g, '').trim())
const sectionClasses = [...content.matchAll(/class="([^"]*?(?:banner|carousel|calc|product|grid|tab|feature|special|award|app|footer)[^"]*?)"/gi)].map(m => m[1])

console.log('=== H2 Headings ===')
console.log([...new Set(h2Matches.filter(Boolean))])

console.log('=== H3 Headings ===')
console.log([...new Set(h3Matches.filter(Boolean))].slice(0, 30))

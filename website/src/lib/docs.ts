import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const docsDirectory = path.join(process.cwd(), '../docs')

export interface Doc {
  slug: string
  title: string
  content: string
  excerpt?: string
  order?: number
}

export function getAllDocs(): Doc[] {
  if (!fs.existsSync(docsDirectory)) {
    return []
  }

  const filenames = fs.readdirSync(docsDirectory)
  const markdownFiles = filenames.filter(name => name.endsWith('.md'))

  const docs = markdownFiles.map((filename) => {
    const fullPath = path.join(docsDirectory, filename)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // Extract title from filename or frontmatter
    const title = data.title || filename.replace(/\.md$/, '').replace(/^\d+\s*-\s*/, '')
    
    // Extract order from filename (e.g., "01 - Project Overview" -> 1)
    const orderMatch = filename.match(/^(\d+)/)
    const order = orderMatch ? parseInt(orderMatch[1]) : 999

    return {
      slug: filename.replace(/\.md$/, ''),
      title,
      content,
      excerpt: content.substring(0, 200) + '...',
      order
    }
  })

  return docs.sort((a, b) => a.order - b.order)
}

export function getDocBySlug(slug: string): Doc | null {
  try {
    const fullPath = path.join(docsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const title = data.title || slug.replace(/^\d+\s*-\s*/, '')
    const orderMatch = slug.match(/^(\d+)/)
    const order = orderMatch ? parseInt(orderMatch[1]) : 999

    return {
      slug,
      title,
      content,
      order
    }
  } catch {
    return null
  }
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}

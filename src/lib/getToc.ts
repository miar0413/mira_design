interface TocItem {
  id: string
  title: string
  level: number
}

export function getToc(content: string): TocItem[] {
  // 移除 frontmatter
  const contentWithoutFrontmatter = content.replace(/---[\s\S]*?---/, '')
  
  const headingLines = contentWithoutFrontmatter
    .split('\n')
    .filter(line => line.match(/^#{1,3}\s/))

  return headingLines.map(line => {
    const match = line.match(/^(#{1,3})\s+(.+)$/)
    if (!match) return null

    const level = match[1].length
    const title = match[2]
    
    // 生成唯一 ID
    const id = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') // 替换所有非字母数字字符为连字符
      .replace(/^-+|-+$/g, '') // 移除首尾连字符

    return {
      id,
      title,
      level,
    }
  }).filter(Boolean) as TocItem[]
} 
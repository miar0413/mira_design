// 每分钟阅读的字数（中文）
const WORDS_PER_MINUTE = 275
// 每分钟阅读的英文单词数
const EN_WORDS_PER_MINUTE = 200

export function getReadingTime(content: string) {
    // 移除 frontmatter
    const trimmedContent = content.replace(/---[\s\S]*?---/, '')
    
    // 计算中文字数
    const cnCharacters = (trimmedContent.match(/[\u4e00-\u9fa5]/g) || []).length
    
    // 计算英文单词数
    const enWords = (trimmedContent.match(/[a-zA-Z]+/g) || []).length
    
    // 计算总阅读时间（分钟）
    const cnTime = cnCharacters / WORDS_PER_MINUTE
    const enTime = enWords / EN_WORDS_PER_MINUTE
    const totalTime = Math.ceil(cnTime + enTime)
    
    return {
        minutes: totalTime,
        words: cnCharacters + enWords
    }
} 
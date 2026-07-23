import { ParsedProjectSource } from './types'
import { humanizeSlug } from './validation'

const GENERIC_TOPICS = new Set([
  'portfolio',
  'project',
  'repository',
  'study',
  'learning',
  'github',
  'demo',
  'website',
])

export interface GitHubRepoDetails {
  title: string
  description: string | null
  topics: string[]
  mainLanguage: string | null
  languages: string[]
}

export async function fetchGitHubRepoDetails(
  parsed: ParsedProjectSource,
  locale: string
): Promise<GitHubRepoDetails> {
  const fallbackTitle = humanizeSlug(parsed.slug)
  const isPt = locale === 'pt'
  const fallbackDescription = isPt
    ? 'Projeto disponível para visualização e consulta do código-fonte.'
    : 'Project available for live preview and source-code review.'

  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'Paulo-Olympio-Portfolio',
  }

  const token = process.env.GITHUB_TOKEN
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    const repoRes = await fetch(`https://api.github.com/repos/${parsed.owner}/${parsed.repo}`, {
      headers,
      signal: controller.signal,
      next: { revalidate: 86400 } // Revalidate daily
    }).catch(() => null)

    clearTimeout(timeoutId)

    if (!repoRes || !repoRes.ok) {
      return {
        title: fallbackTitle,
        description: fallbackDescription,
        topics: [],
        mainLanguage: null,
        languages: [],
      }
    }

    const repoData = await repoRes.json()

    // Title: 1. Repo name from API, 2. Humanized slug
    const title = repoData.name ? repoData.name.replace(/[-_]+/g, ' ') : fallbackTitle

    // Description: 1. Public description, 2. Neutral fallback
    let description = repoData.description ? repoData.description.trim() : null
    if (description && description.length > 220) {
      description = description.slice(0, 217).trim() + '...'
    }

    if (!description) {
      description = fallbackDescription
    }

    const topics: string[] = Array.isArray(repoData.topics) ? repoData.topics : []
    const mainLanguage: string | null = repoData.language || null

    // Fetch languages endpoint
    let languagesList: string[] = []
    try {
      const langRes = await fetch(`https://api.github.com/repos/${parsed.owner}/${parsed.repo}/languages`, {
        headers,
        next: { revalidate: 86400 }
      })
      if (langRes.ok) {
        const langData = await langRes.json()
        languagesList = Object.keys(langData)
      }
    } catch {
      // Ignore languages endpoint failure
    }

    return {
      title,
      description,
      topics,
      mainLanguage,
      languages: languagesList,
    }
  } catch {
    return {
      title: fallbackTitle,
      description: fallbackDescription,
      topics: [],
      mainLanguage: null,
      languages: [],
    }
  }
}

export function compileTechnologies(details: GitHubRepoDetails): string[] {
  const techSet = new Set<string>()
  const lowerSeen = new Set<string>()

  const addTech = (tech: string) => {
    if (!tech) return
    const clean = tech.trim()
    const lower = clean.toLowerCase()
    if (!GENERIC_TOPICS.has(lower) && !lowerSeen.has(lower)) {
      lowerSeen.add(lower)
      techSet.add(clean)
    }
  }

  // 1. Main language
  if (details.mainLanguage) {
    addTech(details.mainLanguage)
  }

  // 2. Languages list
  details.languages.forEach(addTech)

  // 3. Topics
  details.topics.forEach(addTech)

  // Limit to max 6 technologies
  return Array.from(techSet).slice(0, 6)
}

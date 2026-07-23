import { projectSources } from '@/data/project-sources'
import { Project } from './types'
import { parseProjectSource } from './validation'
import { fetchGitHubRepoDetails, compileTechnologies } from './github'

export async function getProjects(locale: string): Promise<Project[]> {
  if (!projectSources || projectSources.length === 0) {
    return []
  }

  const projects: Project[] = []

  for (const source of projectSources) {
    if (!source || !source.githubUrl || !source.demoUrl) {
      continue
    }

    try {
      const parsed = parseProjectSource(source)
      const details = await fetchGitHubRepoDetails(parsed, locale)
      const technologies = compileTechnologies(details)

      const isPt = locale === 'pt'
      const previewAlt = isPt
        ? `Prévia da aplicação ${details.title}`
        : `Preview of the ${details.title} application`

      projects.push({
        slug: parsed.slug,
        title: details.title,
        description: details.description || '',
        technologies,
        githubUrl: parsed.githubUrl,
        demoUrl: parsed.demoUrl,
        previewUrl: `/api/project-preview/${parsed.slug}`,
        previewAlt,
      })
    } catch (err) {
      console.error('Error resolving project source:', err)
    }
  }

  return projects
}

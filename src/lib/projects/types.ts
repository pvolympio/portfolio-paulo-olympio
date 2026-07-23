export interface ProjectSource {
  githubUrl: string
  demoUrl: string
}

export interface ParsedProjectSource {
  owner: string
  repo: string
  slug: string
  githubUrl: string
  demoUrl: string
}

export interface Project {
  slug: string
  title: string
  description: string
  technologies: string[]
  githubUrl: string
  demoUrl: string
  previewUrl: string
  previewAlt: string
}

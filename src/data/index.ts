export interface Person {
  name: string
  role: string
  tagline: string
  email: string
  github: string
  linkedin: string
  specialty: string
  about: string[]
}

export interface Skill {
  name: string
  icon: string
  level: number
  category: 'backend' | 'devops' | 'frontend'
}

export interface Project {
  id: number
  label: string
  title: string
  description: string
  tags: string[]
  github: string
  demo: string | null
  featured: boolean
  codeSnippet?: string
  language?: string
}

export const person: Person = {
  name: 'Paulo Victor Olympio',
  role: 'Desenvolvedor Backend & Fullstack',
  tagline: 'Programação não é sobre linguagem, é sobre lógica, arquitetura e impacto.',
  email: 'pvolympio@gmail.com',
  github: 'https://github.com/pvolympio',
  linkedin: 'https://www.linkedin.com/in/pauloolympio-desenvolvedor/',
  specialty: 'Backend',
  about: [
    'Desenvolvedor com especialidade em backend e sólido conhecimento em outras camadas da stack. Trabalho com diferentes linguagens e ecossistemas, transitando entre contextos com facilidade.',
    'Acredito que boas soluções nascem da combinação de lógica clara, arquitetura bem pensada e código limpo. Escrevo sistemas que escalam e que outros desenvolvedores conseguem entender e evoluir.',
  ],
}

export const skills: Skill[] = [
  { name: 'Java',       icon: '☕', level: 90, category: 'backend' },
  { name: 'Node.js',    icon: '🟢', level: 85, category: 'backend' },
  { name: 'Express',    icon: '🚂', level: 85, category: 'backend' },
  { name: 'Python',     icon: '🐍', level: 80, category: 'backend' },
  { name: 'C / C++',    icon: '⚙️', level: 75, category: 'backend' },
  { name: 'SQL',        icon: '🗄️', level: 85, category: 'backend' },
  { name: 'Docker',     icon: '🐳', level: 80, category: 'devops'  },
  { name: 'React',      icon: '⚛️', level: 75, category: 'frontend'},
  { name: 'JavaScript', icon: '🟡', level: 85, category: 'frontend'},
  { name: 'APIs REST',  icon: '🔗', level: 90, category: 'backend' },
]

export const projects: Project[] = []


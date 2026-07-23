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
  category: 'backend' | 'devops' | 'frontend' | 'database'
}

export interface Project {
  id: number
  label: string
  title: string
  description: string
  tags: string[]
  github: string
  demo: string | null
  image?: string
  featured?: boolean
  highlights?: string[]
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
  specialty: 'Engenharia Backend & APIs',
  about: [
    'Desenvolvedor com foco em backend, arquitetura de APIs RESTful e construção de sistemas web robustos. Trabalho com linguagens como Java, Node.js e Python, sempre prezando pela manutenibilidade e boas práticas.',
    'Acredito que boas soluções nascem da combinação de lógica clara, estrutura bem pensada e código limpo. Busco continuamente evoluir a qualidade das minhas entregas e encarar novos desafios técnicos.'
  ]
}

export const skills: Skill[] = [
  { name: 'Java',       icon: '☕', category: 'backend' },
  { name: 'Node.js',    icon: '🟢', category: 'backend' },
  { name: 'Express',    icon: '🚂', category: 'backend' },
  { name: 'Python',     icon: '🐍', category: 'backend' },
  { name: 'C / C++',    icon: '⚙️', category: 'backend' },
  { name: 'APIs REST',  icon: '🔗', category: 'backend' },
  { name: 'SQL',        icon: '🗄️', category: 'database' },
  { name: 'PostgreSQL', icon: '🐘', category: 'database' },
  { name: 'Docker',     icon: '🐳', category: 'devops'  },
  { name: 'JavaScript', icon: '🟡', category: 'frontend'},
  { name: 'TypeScript', icon: '🟦', category: 'frontend'},
  { name: 'React',      icon: '⚛️', category: 'frontend'}
]

// Strict restriction: project array must remain empty until real projects are added.
export const projects: Project[] = []

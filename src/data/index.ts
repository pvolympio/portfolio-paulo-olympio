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

import { javaPixCode, nodeAuthCode, reactDashboardCode } from './snippets'

export const projects: Project[] = [
  {
    id: 1,
    label: 'Sistema de Pagamentos',
    title: 'Gateway de Pagamentos Pix',
    description: 'Sistema robusto para processamento de pagamentos via Pix com integração a múltiplos bancos, gerenciamento de webhooks e conciliação automática. Construído com arquitetura de microserviços e foco em alta disponibilidade.',
    tags: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'Kafka'],
    github: 'https://github.com/pvolympio/payment-gateway',
    demo: null,
    featured: true,
    codeSnippet: javaPixCode,
    language: 'java'
  },
  {
    id: 2,
    label: 'API de Usuários',
    title: 'Serviço de Autenticação e Autorização',
    description: 'API completa para gestão de usuários com JWT, refresh tokens, controle de acesso baseado em papéis (RBAC) e integração com provedores sociais (Google, GitHub). Implementa melhores práticas de segurança OWASP.',
    tags: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'JWT'],
    github: 'https://github.com/pvolympio/auth-service',
    demo: null,
    featured: false,
    codeSnippet: nodeAuthCode,
    language: 'javascript'
  },
  {
    id: 3,
    label: 'Dashboard Administrativo',
    title: 'Painel de Métricas em Tempo Real',
    description: 'Dashboard interativo para visualização de métricas de negócio e sistema em tempo real utilizando WebSockets. Integra com múltiplas fontes de dados e oferece exportação de relatórios personalizáveis.',
    tags: ['React', 'Node.js', 'Socket.io', 'PostgreSQL', 'Chart.js'],
    github: 'https://github.com/pvolympio/admin-dashboard',
    demo: null,
    featured: false,
    codeSnippet: reactDashboardCode,
    language: 'javascript'
  },
]

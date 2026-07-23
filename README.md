# Portfólio Pessoal — Paulo Victor Olympio

Portfólio profissional desenvolvido com **Next.js (App Router)**, **TypeScript**, **Framer Motion** e **next-intl**. Projetado para apresentar perfil técnico, habilidades e contatos com foco em performance, acessibilidade (WCAG 2.2 AA), responsividade e internacionalização (Português e Inglês).

---

## 🚀 Tecnologias Utilizadas

- **Core**: Next.js 14 (App Router), React 18, TypeScript 5
- **Internacionalização**: `next-intl` (rotas `/pt` e `/en`)
- **Estilização & Temas**: CSS Variables, `next-themes` (Dark/Light mode)
- **Animações & UI**: Framer Motion, Lucide React
- **Formulários & Validação**: React Hook Form, Zod
- **Envio de E-mail**: API Route do Next.js + Resend SDK
- **SEO & Metadados**: Next.js Dynamic Metadata, OpenGraph image generator (`next/og`), Robots.txt, Sitemap.xml, JSON-LD (Person)

---

## 🎨 Funcionalidades e Destaques

### 1. Internacionalização Verdadeira (i18n)
- Suporte completo a **Português (`/pt`)** e **Inglês (`/en`)**.
- Redirecionamento automático da raiz `/` para o locale padrão (`/pt`).
- Troca de idioma dinâmica preservando a seção ativa e ancoragem de página.

### 2. Formulário de Contato Confiável
- Validação dupla (cliente com React Hook Form + Zod e servidor na API Route).
- Proteção anti-spam via campo honeypot.
- **Tratamento de Indisponibilidade**: Quando a chave `RESEND_API_KEY` não está presente no ambiente, a API retorna HTTP `503 Service Unavailable`. O frontend exibe uma mensagem informativa amigável oferecendo links diretos para e-mail e LinkedIn.
- Indicador visual e acessível dos estados do envio (`aria-live="polite"`).

### 3. Seção de Projetos Dinâmica (Futuro-Ready)
- A seção de projetos e o link da barra de navegação são **exibidos exclusivamente quando houver projetos cadastrados** no array `projects` de `src/data/index.ts`.
- Enquanto a lista estiver vazia, o elemento da interface é ocultado completamente, sem placeholders ou mensagens genéricas de desenvolvimento.
- Possui visualizador de código leve baseado em `<pre><code>` nativo para garantir um bundle inicial enxuto.

### 4. Acessibilidade & Performance
- Compatibilidade com leitores de tela e navegação por teclado (`:focus-visible`, `skip-link`, atalho `Escape` no menu mobile).
- Fundo interativo de partículas com contagem adaptativa por dispositivo, pausa quando a aba está inativa e respeito à preferência `prefers-reduced-motion`.

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com base no `.env.example`:

```env
# Chave da API do Resend (opcional para desenvolvimento local)
RESEND_API_KEY=

# Remetente e Destinatário do formulário de contato
RESEND_FROM_EMAIL="Portfolio Contact <onboarding@resend.dev>"
CONTACT_DEST_EMAIL="pvolympio@gmail.com"

# URL pública para geração de links canônicos e OpenGraph
NEXT_PUBLIC_SITE_URL="https://pauloolympio.dev"
```

---

## 🛠️ Executando Localmente

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

3. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## 📜 Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento Next.js.
- `npm run build`: Compila a aplicação para produção.
- `npm run start`: Inicia o servidor de produção compilado.
- `npm run lint`: Executa a verificação estática com ESLint.
- `npm run typecheck`: Executa a verificação de tipos com o compilador do TypeScript.
- `npm run check`: Executa a checagem de tipos e o linter sequencialmente.

---

## 📂 Estrutura do Projeto

```
src/
├── app/
│   ├── [locale]/            # Páginas e Layout com rotas /pt e /en
│   ├── api/
│   │   ├── contact/         # API Route para envio de e-mails de contato
│   │   └── og/              # API Route geradora de imagem OpenGraph
│   ├── globals.css          # Design system, CSS variables e animações
│   ├── robots.ts            # Configuração de SEO para rastreadores
│   └── sitemap.ts           # Geração dinâmica de sitemap.xml
├── components/              # Componentes de interface (Navbar, Hero, About, Skills, etc.)
├── data/                    # Perfil técnico e estrutura de dados de projetos
├── i18n/                    # Configuração de locales e carregamento de mensagens
└── messages/                # Dicionários de tradução (pt.json e en.json)
```

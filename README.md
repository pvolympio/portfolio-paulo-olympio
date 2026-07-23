# Portfólio Pessoal — Paulo Victor Olympio

![CI](https://github.com/pvolympio/Portf-lio_PauloOlympio/actions/workflows/ci.yml/badge.svg)

Portfólio profissional desenvolvido com **Next.js (App Router)**, **TypeScript**, **Framer Motion** e **next-intl**. Projetado para apresentar perfil técnico, habilidades e contatos com foco em performance, acessibilidade (WCAG 2.2 AA), responsividade e internacionalização (Português e Inglês).

---

## 🚀 Tecnologias Utilizadas

- **Core**: Next.js 14 (App Router), React 18, TypeScript 5
- **Internacionalização**: `next-intl` (rotas `/pt` e `/en`)
- **Estilização & Temas**: CSS Variables, `next-themes` (Dark/Light mode)
- **Animações & UI**: Framer Motion, Lucide React
- **Formulários & Validação**: React Hook Form, Zod (schema compartilhado)
- **Envio de E-mail**: API Route do Next.js + Resend SDK (com tratamento HTTP 503)
- **Testes & CI**: Vitest, React Testing Library, GitHub Actions CI
- **SEO & Metadados**: Next.js Dynamic Metadata, OpenGraph image generator (`next/og`), Robots.txt, Sitemap.xml, JSON-LD (Person)

---

## 🎨 Funcionalidades e Destaques

### 1. Internacionalização Verdadeira (i18n)
- Suporte completo a **Português (`/pt`)** e **Inglês (`/en`)**.
- Paridade de chaves garantida por testes automatizados entre `pt.json` e `en.json`.
- Redirecionamento da raiz `/` para o locale padrão (`/pt`). Locales inválidos retornam `notFound()`.
- Troca de idioma dinâmica preservando a seção ativa e ancoragem de página.

### 2. Formulário de Contato Confiável & Seguro
- Validação dupla (cliente com React Hook Form + Zod e servidor na API Route com `safeParse`).
- Proteção anti-spam via campo *honeypot* invisível.
- **Tratamento de Indisponibilidade**: Quando a chave `RESEND_API_KEY` ou os e-mails de remetente/destino não estão configurados no ambiente, a API retorna **HTTP 503 Service Unavailable**. O frontend exibe uma mensagem amigável oferecendo links diretos para e-mail e LinkedIn.
- Privado e seguro: NENHUM dado pessoal (nome, e-mail ou mensagem) é impresso nos logs do console.
- Preserva os dados preenchidos no formulário em caso de falha de envio. Limpa o formulário apenas após confirmação real de sucesso.

### 3. Seção de Projetos Dinâmica (Futuro-Ready)
- A seção de projetos e o link da barra de navegação são **exibidos exclusivamente quando houver projetos cadastrados** no array `projects` de `src/data/index.ts`.
- Enquanto a lista estiver vazia, o elemento da interface é ocultado completamente, sem placeholders ou mensagens genéricas de desenvolvimento.

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
NEXT_PUBLIC_SITE_URL="https://portf-lio-paulo-olympio.vercel.app"
```

---

## 🛠️ Executando Localmente

1. Instale as dependências:
   ```bash
   npm ci
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
- `npm run test`: Executa a suíte de testes automatizados com Vitest.
- `npm run check`: Executa o fluxo completo de CI local (`lint`, `typecheck`, `test` e `build`).

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
├── data/                    # Perfil técnico, schema Zod e lista de projetos
├── i18n/                    # Configuração de locales e carregamento de mensagens
└── messages/                # Dicionários de tradução com paridade estrita (pt.json e en.json)
tests/                       # Suíte de testes automatizados unitários e de integração
.github/workflows/ci.yml     # Pipeline de CI com GitHub Actions
```

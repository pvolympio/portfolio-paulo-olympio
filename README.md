# Portfolio — Paulo Victor Olympio

Portfólio pessoal desenvolvido com **Next.js 14**, **Framer Motion** e **TypeScript**.

## Stack

- **Next.js 14** (App Router)
- **Framer Motion** — animações
- **TypeScript**
- **Lucide React** — ícones
- Fontes: Syne + Bricolage Grotesque + DM Mono

## Como rodar

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build de produção
npm run build
npm start
```

Acesse em http://localhost:3000

## Personalizar

Edite `src/data/index.ts` para:
- Mudar seus dados pessoais (nome, bio, links)
- Adicionar seus projetos reais
- Ajustar suas skills e níveis

## Deploy (Vercel)

```bash
npm install -g vercel
vercel
```

Ou conecte o repositório direto no painel da Vercel — deploy automático em cada push.

## Estrutura

```
src/
  app/
    globals.css      # Estilos globais + variáveis CSS
    layout.tsx       # Layout raiz (metadata SEO)
    page.tsx         # Página principal (composição de componentes)
  components/
    ParticleBackground.tsx  # Canvas animado de partículas
    Navbar.tsx              # Navegação fixa com scroll detection
    Hero.tsx                # Seção hero com efeito typewriter
    About.tsx               # Sobre mim + terminal card
    Skills.tsx              # Grid de skills com barra de nível
    Projects.tsx            # Cards de projetos com animações
    Contact.tsx             # Seção de contato
    Footer.tsx              # Rodapé
  data/
    index.ts         # ← EDITE AQUI: seus dados, projetos e skills
```

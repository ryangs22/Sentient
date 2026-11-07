<div align="center">

<br/>

# 🧠 SENTIENT 🧠
### *Um espaço para tudo o que você está construindo*

<br/>

> **SENTIENT** é uma plataforma SaaS Full Stack que une inteligência artificial e colaboração em um único workspace. Em vez de alternar entre um editor de documentos, uma ferramenta de diagramas e um chat com IA, você trabalha em um só lugar, onde um agente inteligente escreve e desenha ao seu lado, ao vivo. Descreva o que precisa, como mapear a arquitetura de um produto e depois redigir a especificação, e o agente executa direto no espaço de trabalho: cria formas e conexões no canvas interativo, escreve e estrutura documentos e acompanha cada alteração em tempo real, junto com o resto da equipe. Construído com **Next.js, React e TypeScript**, o projeto usa **Supabase** para autenticação e sincronização em tempo real, **Prisma** para persistência de dados, **tldraw** para o canvas colaborativo e **Gemini com Vercel AI SDK** para agentes que não apenas conversam, mas agem sobre o workspace. Tudo isso com sistema de contas, planos e billing, como um produto SaaS completo.

<br/>

![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react)
![Next.js](https://img.shields.io/badge/Framework-Next.js-000000?style=for-the-badge&logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/Linguagem-TypeScript-3178C6?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Estilo-Tailwind_CSS-38BDF8?style=for-the-badge&logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Backend-Supabase-3ECF8E?style=for-the-badge&logo=supabase)
![Prisma](https://img.shields.io/badge/ORM-Prisma-2D3748?style=for-the-badge&logo=prisma)
![Gemini](https://img.shields.io/badge/IA-Gemini-8E75B2?style=for-the-badge&logo=googlegemini)

<br/>

</div>

---
<div align="center">

## 🛠️ Stack Tecnológica

| Camada | Tecnologia |
| :--- | :--- |
| **Linguagens** | TypeScript, JavaScript, SQL |
| **Frontend** | React + Next.js 16 + Tailwind CSS |
| **Componentes de UI** | Shadcn UI |
| **Canvas Interativo** | tldraw |
| **Backend / Realtime** | Supabase (Realtime, Auth, Storage) |
| **ORM** | Prisma |
| **Inteligência Artificial** | Google Gemini + Vercel AI SDK |
| **Autenticação** | Supabase Auth + Clerk |
| **Docs** | BlockNote e Yjs |
| **Billing** | Sistema de planos e assinaturas |

--- 
## 📦 Instalação e Execução

</div>

### Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão recomendada: `v26.13.0` ou superior)
- **Git**
- Uma conta no **[Supabase](https://supabase.com)** (banco de dados PostgreSQL, Realtime e Storage)
- Uma conta no **[Clerk](https://clerk.com)** (autenticação)

---

### 1. Clonar o repositório e instalar dependências

```bash
# Clone o repositório
git clone https://github.com/ryangs22/Sentient.git

# Entre na pasta do projeto
cd Sentient

# Instale as dependências
npm install
```

---

### 2. Configurar as variáveis de ambiente

O projeto se comunica com serviços externos (Clerk e Supabase). Crie o arquivo local a partir do template:

```bash
cp .env.example .env
```

Abra o `.env` e preencha com suas chaves. O conteúdo do `.env.example` é:

```env
# ─────────────────────────────────────────────
# CLERK (Autenticação do usuário)
# ─────────────────────────────────────────────
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
CLERK_SECRET_KEY="sk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"


# ─────────────────────────────────────────────
# SUPABASE - BANCO DE DADOS (PostgreSQL + Prisma)
# ─────────────────────────────────────────────
# Connect to Postgres via the shared transaction-mode pooler (IPv4-only)
DATABASE_URL="postgresql://postgres.[SEU_PROJETO]:[SUA_SENHA]@aws-0-us-east-2.pooler.supabase.com:6543/postgres?pgbouncer=true"
# Connect to Postgres via the shared session-mode pooler (used for migrations)
DIRECT_URL="postgresql://postgres.[SEU_PROJETO]:[SUA_SENHA]@aws-0-us-east-2.pooler.supabase.com:5432/postgres"


# ─────────────────────────────────────────────
# SUPABASE - REALTIME & STORAGE (API Keys)
# ─────────────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL="https://[SEU_PROJETO].supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="sua_chave_anon_publica_aqui"
```

---

## 🔑 Como conseguir cada chave

### 🔐 Clerk — `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` e `CLERK_SECRET_KEY`

1. Acesse o [Dashboard do Clerk](https://dashboard.clerk.com) e faça login.
2. Clique em **Create application**, dê um nome e escolha os métodos de login (e-mail, Google, GitHub etc.).
3. No menu lateral, abra **Configure → API Keys**.
4. Copie:
   - **Publishable key** (`pk_test_...`) → `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - **Secret key** (`sk_test_...`) → `CLERK_SECRET_KEY`

> ⚠️ A `CLERK_SECRET_KEY` é privada. Nunca a exponha no frontend.

---

### 🗄️ Supabase (banco de dados) — `DATABASE_URL` e `DIRECT_URL`

1. Acesse o [Dashboard do Supabase](https://supabase.com/dashboard) e crie um projeto (**New project**). Anote a **senha do banco** definida na criação.
2. Com o projeto aberto, clique no botão **Connect** (topo da página).
3. Na aba **ORMs** (ou **Connection String**), escolha **Prisma**. O Supabase exibe as duas URLs prontas:
   - **Transaction pooler** (porta `6543`) → `DATABASE_URL` (mantenha `?pgbouncer=true` no final)
   - **Session pooler** (porta `5432`) → `DIRECT_URL`
4. Substitua `[SUA_SENHA]` pela senha do banco e `[SEU_PROJETO]` pelo ID do projeto, se necessário.

> 💡 Esqueceu a senha? Vá em **Project Settings → Database → Reset database password**.
>
> 💡 Se a senha tiver caracteres especiais (`@`, `#`, `/`, `:`), codifique-os em URL (ex.: `@` → `%40`).

---

### ⚡ Supabase (Realtime & Storage) — `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

1. No Dashboard do Supabase, abra o seu projeto.
2. Vá em **Project Settings → API Keys** (a URL do projeto aparece em **Project Settings → Data API**).
3. Copie:
   - **Project URL** (`https://xxxx.supabase.co`) → `NEXT_PUBLIC_SUPABASE_URL`
   - **Publishable key** (`sb_publishable_...`) → `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

> Projetos mais antigos podem mostrar a chave `anon` (legacy) no lugar da publishable key; ela também funciona nessa variável.

---

### 3. Configurar o banco de dados (Prisma)

Com o `.env` configurado, crie as tabelas no Supabase e gere o cliente tipado do Prisma (para o TypeScript reconhecer os models, como `User`, `Workspace` etc.):

```bash
# Cria as tabelas no Supabase com base no schema.prisma
npx prisma migrate dev --name init

# (OPCIONAL) Apenas gerar/atualizar a tipagem do cliente Prisma
npx prisma generate
```

---

### 4. Executar a aplicação

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador para ver a aplicação rodando.

---

<p align="center">
  © 2026 SENTIENT — Um espaço para tudo o que você está construindo
</p>
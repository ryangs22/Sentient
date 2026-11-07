<div align="center">

<br/>

# 🧠 SENTIENT 🧠
### *Um espaço para tudo o que você está construindo*

<br/>

> **SENTIENT** é uma plataforma SaaS Full Stack que une inteligência artificial e colaboração em um único workspace. Em vez de alternar entre um editor de documentos, uma ferramenta de diagramas e um chat com IA, você trabalha em um só lugar, onde um agente inteligente escreve e desenha ao seu lado, ao vivo. Descreva o que precisa, como mapear a arquitetura de um produto e depois redigir a especificação, e o agente executa direto no espaço de trabalho: cria formas e conexões no canvas interativo, escreve e estrutura documentos e acompanha cada alteração em tempo real, junto com o resto da equipe. Construído com **Next.js, React e TypeScript**, o projeto usa **Supabase** para autenticação e sincronização em tempo real, **Prisma** para persistência de dados, **tldraw** para o canvas colaborativo e **Gemini com Vercel AI SDK** para agentes que não apenas conversam, mas agem sobre o workspace. Tudo isso com sistema de contas, planos e billing, como um produto SaaS completo.
>

<br/>

![Stack](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react)
![Stack](https://img.shields.io/badge/Framework-Next.js-000000?style=for-the-badge&logo=nextdotjs)
![Stack](https://img.shields.io/badge/Linguagem-TypeScript-3178C6?style=for-the-badge&logo=typescript)
![Stack](https://img.shields.io/badge/Estilo-Tailwind_CSS-38BDF8?style=for-the-badge&logo=tailwindcss)
![Stack](https://img.shields.io/badge/Backend-Supabase-3ECF8E?style=for-the-badge&logo=supabase)
![Stack](https://img.shields.io/badge/ORM-Prisma-2D3748?style=for-the-badge&logo=prisma)
![Stack](https://img.shields.io/badge/IA-Gemini-8E75B2?style=for-the-badge&logo=googlegemini)

<br/>

</div>

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

<br>
</div>

---

<div align="center"> 
  
## 📦 Instalação e Execução

</div>

### Pré-requisitos
Antes de começar, certifique-se de ter instalado em sua máquina:
* **Node.js** (versão recomendada: `v26.13.0` ou superior)
* **Git**
* Uma conta no **Supabase** (para o banco de dados PostgreSQL)
* Uma conta no **Clerk** (para o sistema de autenticação)

---

### 1. Clonar o Repositório e Instalar Dependências
Baixe o código-fonte para a sua máquina e instale os pacotes necessários definidos no `package.json`.

```bash
# Clone o repositório
git clone [https://github.com/ryangs22/Sentient.git](https://github.com/ryangs22/Sentient.git)

# Entre na pasta do projeto
cd Sentient

# Instale as dependências
npm install
```

### 2. Configurar Variáveis de Ambiente
O projeto precisa se comunicar com serviços externos (Clerk e Supabase). Crie o arquivo de configuração local copiando o template:

```bash
cp .env.example .env
```

Abra o arquivo `.env` gerado na raiz do projeto e preencha as variáveis com as chaves dos seus respectivos painéis:

```env
# SUPABASE (Banco de Dados PostgreSQL)
# Pegue essas URLs nas configurações de Database do Supabase
DATABASE_URL="postgresql://postgres.[SEU_PROJETO]:[SUA_SENHA]@[aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true](https://aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true)"
DIRECT_URL="postgresql://postgres.[SEU_PROJETO]:[SUA_SENHA]@[aws-0-sa-east-1.pooler.supabase.com:5432/postgres](https://aws-0-sa-east-1.pooler.supabase.com:5432/postgres)"

```

### 3. Configurar o Banco de Dados (Prisma)
Com o `.env` configurado, você precisa criar as tabelas no Supabase e gerar o cliente tipado do Prisma para o TypeScript reconhecer os models (como `User`, `Workspace`, etc.).

```bash
# Executa a migração criando as tabelas reais no Supabase com base no schema.prisma
npx prisma migrate dev --name init

# (Opcional) Caso precise apenas gerar/atualizar a tipagem do cliente Prisma
npx prisma generate
```

### 4. Executar a Aplicação
Com os pacotes instalados, chaves configuradas e banco de dados pronto, inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador para ver a aplicação rodando.

<br>

---

<p align="center">
  © 2026 SENTIENT — Um espaço para tudo o que você está construindo
</p>

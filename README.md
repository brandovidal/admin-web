# Panel web

This project contains a minimal starter for Next.js project with Typescript, ESLint, TS-Standard, ChakraUI, React Query and Zustand already configured

## 🌐 URL

```
https://panel-web.pages.dev/
```

## 🚀 Project Structure

Inside of your project, you'll see the following folders and files:

```css
├─ .env
├─ .env.example
├─ .eslintignore
├─ .eslintrc.json
├─ .next
├─ .nvmrc
├─ .prettierrc.json
├─ .vscode
├─ CHANGELOG.md
├─ LICENSE
├─ README.md
├─ global.d.ts
├─ next-env.d.ts
├─ next.config.js
├─ package.json
├─ pnpm-lock.yaml
├─ public
├─ src
│  ├─ api
│  ├─ common
│  ├─ components
│  ├─ config
│  ├─ contexts
│  ├─ img
│  ├─ interfaces
│  ├─ layouts
│  ├─ libs
│  ├─ pages
│  ├─ routes
│  │  └─ index.tsx
│  ├─ schemas
│  ├─ services
│  ├─ store
│  ├─ styles
│  ├─ theme
│  ├─ types
│  ├─ utils
│  ├─ variables
│  └─ views
└─ tsconfig.json
```

## 💻 Prerequisites

- Node.js 16+
- Yarn or pnpm

👾 Necesary environment variables:

Copy the `.env.example` file to `.env` and fill in the required environment variables.
Replicate the `.env.example` file to `.env.test` and fill in the required environment variables.
Replicate the `.env.example` file to `.env.development` and fill in the required environment variables.
Use pnpm to install the dependencies https://pnpm.io/es/installation.

## 📖 How to use

Run App

```bash
pnpm run dev
```

Build App

```bash
pnpm run build
```

- 🚀 Start App

```bash
pnpm run start
```

- 🔦 Run Lint

```bash
pnpm run lint
```

<!-- - 👾 Run test

```bash
pnpm run test
``` -->

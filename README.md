# PitchDraft

AI proposal writer for consultants and agencies. Fill out a short intake form, get a structured client-ready proposal, edit it, and export.

## Features (v1)

- User signup / login with saved proposals
- Intake form (client, scope, timeline, tone)
- AI-generated Markdown proposals (OpenAI)
- Edit, preview, regenerate, status tracking
- Download `.md` or print to PDF

## Prerequisites

- Node.js 20+
- npm
- Free [Neon](https://neon.tech) account (Postgres database)
- OpenAI API key (optional — demo mode works without it)

## Setup

### 1. Create a free Postgres database (Neon)

1. Go to [neon.tech](https://neon.tech) and sign up (parent can help)
2. Click **New Project** → name it `pitchdraft`
3. On the dashboard, copy the **connection string** (URI)
4. It looks like: `postgresql://user:pass@ep-xxx.neon.tech/neondb?sslmode=require`

### 2. Configure your app

```bash
cd ~/Projects/pitchdraft
cp .env.example .env
```

Open `.env` and paste your Neon URL into `DATABASE_URL`.

Generate a secret for `NEXTAUTH_SECRET`:

```bash
openssl rand -base64 32
```

### 3. Install and run

```bash
npm install
npm run db:push
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

1. Push code to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Add these **Environment Variables** in Vercel → Settings:

| Variable | Value |
|----------|--------|
| `DATABASE_URL` | Same Neon connection string |
| `NEXTAUTH_SECRET` | Same secret as local (or generate a new one) |
| `NEXTAUTH_URL` | `https://pitchdraft-five.vercel.app` |

4. **Redeploy** after adding variables (Deployments → ⋯ → Redeploy)

Accounts and proposals will now save online.

## Project structure

```
src/
  app/           # Pages & API routes
  components/    # UI components
  lib/           # Auth, DB, OpenAI
  types/         # Shared types
prisma/          # Database schema
```

## License

Private — all rights reserved.

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
- OpenAI API key

## Setup

```bash
cd ~/Projects/pitchdraft
cp .env.example .env
# Edit .env with your OPENAI_API_KEY and NEXTAUTH_SECRET

npm install
npm run db:push
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Monetization ideas (next steps)

1. **Free tier**: 2 proposals/month
2. **Pro ($29/mo)**: unlimited proposals + custom templates
3. **Team ($79/mo)**: shared library, brand kit, approval workflow
4. **Cold outreach**: target freelance strategists, boutique agencies on LinkedIn

## Deploy

- **Vercel** for Next.js
- Swap SQLite for **Postgres** (Neon/Supabase) in production:
  - Update `provider` in `prisma/schema.prisma` to `postgresql`
  - Set `DATABASE_URL` to your Postgres connection string

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

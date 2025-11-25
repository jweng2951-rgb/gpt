# Nexus Music — Full Project (Best-effort)
This archive contains a near-complete implementation of the Nexus Music system requested.
It is a best-effort build covering backend, frontend scaffolding, Prisma schema, and utilities.
You can deploy to Vercel or run locally.

## Quick start (local)
1. Install deps: `npm install`
2. Set environment variables in `.env`
   - DATABASE_URL
   - JWT_SECRET
3. Prisma migrate: `npx prisma migrate dev --name init`
4. Run dev: `npm run dev`

## Notes
- This is a generated codebase; some integration code (YouTube/TikTok APIs, streaming callbacks) are stubbed.
- CSV import and music upload flow are implemented; adapt storage paths and environment vars when deploying.

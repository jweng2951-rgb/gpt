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

## Vercel Deployment Notes (added by assistant)

1. Set these Environment Variables in Vercel dashboard (Project Settings -> Environment Variables):
   - DATABASE_URL  (e.g. mysql://user:pass@host:3306/dbname)
   - JWT_SECRET (a secure random string)
   - SINGLE_SONG_PRICE (e.g. 0.03)
   - PLATFORM_FEE (e.g. 0)
   - NEXT_PUBLIC_BASE_URL (your deployed URL)

2. Ensure "Install Command" is the default (npm install). The postinstall script runs `prisma generate` to create the client.

3. Build Command: `npm run build` (already in package.json)

4. If you use PlanetScale or other serverless MySQL, ensure `prisma` is configured for proper migrations (use deploy and shadow DB as needed).

5. For file uploads in serverless, replace local `public/uploads` usage with an external provider (S3, Cloudinary) and update upload endpoints.

6. If build fails due to native binaries, adjust or remove offending deps (we fixed multer version).


## Vercel Deployment Notes (added by assistant)

1. Set these Environment Variables in Vercel dashboard (Project Settings -> Environment Variables):
   - DATABASE_URL  (e.g. mysql://user:pass@host:3306/dbname)
   - JWT_SECRET (a secure random string)
   - SINGLE_SONG_PRICE (e.g. 0.03)
   - PLATFORM_FEE (e.g. 0)
   - NEXT_PUBLIC_BASE_URL (your deployed URL)

2. Ensure "Install Command" is the default (npm install). The postinstall script runs `prisma generate` to create the client.

3. Build Command: `npm run build` (already in package.json)

4. If you use PlanetScale or other serverless MySQL, ensure `prisma` is configured for proper migrations (use deploy and shadow DB as needed).

5. For file uploads in serverless, replace local `public/uploads` usage with an external provider (S3, Cloudinary) and update upload endpoints.

6. If build fails due to native binaries, adjust or remove offending deps (we fixed multer version).


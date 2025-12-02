# Deploying this project to Vercel

This file contains concise, copy-pastable steps to (re)deploy the project to Vercel using the Vercel CLI or the Vercel Dashboard.

Prerequisites:
- A Vercel account.
- `pnpm` installed (project uses pnpm by convention). If you use `npm` or `yarn`, adapt the commands.
- (Optional) A Vercel token if you prefer non-interactive CLI login.

Quick CLI deploy (interactive):

```bash
# 1) Install Vercel CLI (if not already):
pnpm add -g vercel

# 2) Login (interactive — opens browser):
vercel login

# 3) From project root, link the project (answers prompts):
vercel link

# 4) Deploy a preview (recommended first):
vercel --confirm

# 5) Deploy to production:
vercel --prod --confirm
```

Non-interactive (CI) deploy using a token:

```bash
# Use CI environment var VEREL_TOKEN. Example:
VERCEL_TOKEN="<your_token>" vercel --prod --confirm
```

Environment variables
---------------------
This project uses Supabase and likely needs the following environment variables set in Vercel (Project Settings → Environment Variables):

- `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon/public key
- `SUPABASE_SERVICE_ROLE_KEY` = service role (only for server-side use; set as a secret and only for Production/Preview where needed)
- `DATABASE_URL` (if using a DB directly)
- Any other secret used in `/lib/supabase/*` or `app` server code

Set them in the Vercel Dashboard for both Preview and Production environments as appropriate. For server-only keys, mark them as environment-level secrets and do not expose them as `NEXT_PUBLIC_`.

Build & Runtime notes
---------------------
- This project uses Next.js (app router). Vercel's platform auto-detects Next.js — no extra `vercel.json` is required in most cases.
- Build command: `pnpm build` (which runs `next build`).
- Install command: `pnpm install`.
- Output directory: Vercel uses `.next` automatically for Next.js apps.

Troubleshooting
---------------
- If the deploy fails with a Node engine or package manager error, ensure the Vercel project is configured to use `pnpm` and Node version compatible with `next@16` and `react@19`.
- If you see missing env errors during build, verify the variables are present under Project → Settings → Environment Variables.
- For Supabase auth or server actions, ensure `SUPABASE_SERVICE_ROLE_KEY` is set in the Vercel dashboard and referenced only on server-side code.

Helpful commands locally
------------------------
- Run dev locally: `pnpm dev` (or `pnpm run dev`)
- Run full production build locally: `pnpm build` then `pnpm start`

If you want, I can:
- Add a minimal `vercel.json` file (not required) that pins the build step.
- Create deployment GitHub Actions or a `vercel` script in `package.json` for CI.

---
If you'd like me to automatically run the `vercel` CLI to deploy from this machine, provide your Vercel token and confirm, and I'll run the deploy steps for you.

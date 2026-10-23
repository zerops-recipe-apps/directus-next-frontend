# Agent notes — directus-next-frontend (Zerops recipe app)

- **Recipe imports** live in [zeropsio/recipes/directus-next](https://github.com/zeropsio/recipes/tree/main/directus-next), not in this repo.
- **Runtime:** `ubuntu/nodejs@24`, Next.js **16** `output: 'standalone'`, port **3000**.
- **Setups:** `nextjs` (stage/prod frontend), `dev` (agent/local). No embedded `import.yaml` in this repository.
- **CMS connection:** `zerops.yaml` maps `DIRECTUS_URL` → `${API_URL}` / `${DEV_API_URL}` and `DIRECTUS_TOKEN` → `${ADMIN_TOKEN}` from the project vault (deploy **directus-next**, not this repo alone).
- **Rendering:** App Router pages use `dynamic = 'force-dynamic'` so Directus env vars resolve at request time on Zerops.
- **Build:** `npm ci` → `npm run build` → copy `.next/static` and `public` into `.next/standalone` (see `prepare-standalone` script).

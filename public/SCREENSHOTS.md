# Screenshot Guide

All images live in `public/guide/`. They are referenced in `Implementation.md` and `README.md`.

Prefix legend:
- No prefix — production environment, preferred for all docs
- `dev-` — development environment only
- `err-` — error / gotcha reference (troubleshooting docs)

---

## Production screenshots

### 01 — Zerops project dashboard (services installing)

**File:** `01-zerops-production-services-installing.png`

Shows the `directus-production` project immediately after import: `db` (PostgreSQL HA, 3 containers, active), `cache`, `directus`, and `storage` services installing in queue.

---

### 01 (existing) — Zerops project dashboard (all running)

**File:** `01-zerops-project-dashboard.png`

Full project view with all service cards showing green **Active** status.

**Steps to retake:**
1. Go to [app.zerops.io](https://app.zerops.io)
2. Open `directus-production`
3. Wait until all services show a green **Running** status
4. Screenshot the full project view

---

### 02 — Recipe import screen

**File:** `02-recipe-import-screen.png`

The YAML import editor with `import.yaml` content visible before clicking **Import**.

---

### 03 — CI/CD pipeline trigger — production

**File:** `03-cicd-pipeline-trigger-production.png`

Pipeline trigger modal configured for production: **Push to Branch → main (default)**, setup `production` selected, "Trigger once after the activation" checked.

---

### 03 — GitHub connected — production

**File:** `03-github-connected-production.png`

GitHub integration confirmation card showing repository URL, **Push to branch main**, and `setup: production`.

---

### 03 — Pipeline building in progress

**File:** `03-pipeline-building-in-progress.png`

Pipeline history page with an active build (9 seconds elapsed): "Initialized build container" ✓, "Running build commands from zerops.yml" ▶, waiting to create app version. Shows `directus-production / directus`.

---

### 03 — Pipeline history — production

**File:** `03-pipeline-history-production.png`

Pipeline history showing two completed production runs triggered by GitHub (both ~2 min, green status). The active version is `main@46bef889`.

---

### 04 — Directus service running

**File:** `04-directus-service-running.png`

Directus service detail: **ACTIVE**, Node.js v22.13.1, `main@46bef889`, port 8055. Shows action buttons (Start/Stop/Restart) and navigation tabs.

---

### 04 — Directus service running (full sidebar)

**File:** `04-directus-service-running-full.png`

Same as above but with the project sidebar visible on the left, showing `directus:8055` listed as **ACTIVE**.

---

### 04 — Directus subdomain public URL

**File:** `04-directus-subdomain-url.png`

"Public Access through zerops.app Subdomain" panel with subdomain toggle enabled and the full `https://directus-XXXX-8055.prg1.zerops.app` URL visible.

---

### 05 — Autoscaling config — production

**File:** `05-autoscaling-config-production.png`

Automatic Scaling settings for the production Directus service: Containers 2–3, CPU 1–3 cores (Shared), RAM 1–8 GB, Disk 1–100 GB.

---

### 05 (existing) — Directus Data Studio — collections and content

**File:** `05-directus-studio-collections-and-content.png`

Directus Data Studio with Collections sidebar showing Categories, Authors, Posts and the Posts list with all rows visible.

---

### 06 — Zerops notifications — pipeline complete

**File:** `06-zerops-notifications-pipeline-complete.png`

Zerops notification panel showing: pipeline OdeVrL...GPH0Yw finished in 2m 24s (production), subdomain access enabled in 23s, two earlier successful pipelines listed.

---

### 06 (existing) — Zerops storage credentials

**File:** `06-zerops-storage-credentials.png`

Object storage service detail showing Access Key ID, Secret Access Key, and Bucket name fields.

---

### 08 — Zerops environment variables list

**File:** `08-zerops-env-variables-list.png`

Environment Variables panel showing all auto-generated and custom variables (ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_TOKEN, CACHE_*, DB_*, PATH, PUBLIC_URL, STORAGE_S3_*, ZEROPS_DEBUG_*, appVersionId, hostname, projectId, serviceId, zeropsSubdomain) with the "Copy variable key / value" context menu open.

---

### 09 — Directus admin user — Generate Token

**File:** `09-directus-admin-generate-token.png`

Directus Data Studio → User Directory → Admin User profile page. Shows the **Token** field with the "Generate Token" button tooltip visible. Use this to create a static access token for `DIRECTUS_TOKEN`.

---

### 09 — Directus password reset screen

**File:** `09-directus-password-reset-screen.png`

Directus "Reset Password" screen with `admin@example.com` pre-filled. Use this to regain access to the admin account after first deploy.

---

### 10 (existing) — Directus posts list

**File:** `10-directus-posts-list.png` *(to be captured)*

Directus Data Studio → Content → Posts list showing all 4 demo posts with title and status badge.

---

## Development-only screenshots

> These screenshots were taken from the `directus-development` environment. They show the same UI flows as production but with development service names and branch settings.

### dev-01 — Development services installing in queue

**File:** `dev-01-services-installing-in-queue.png`

`directus-development` project: db (PostgreSQL), cache (Valkey), directus, mailpit, and storage all showing "in queue" during the initial import phase.

---

### dev-03 — Development pipeline history

**File:** `dev-03-pipeline-history.png`

Pipeline history for `directus-development / directus` with one completed run (2m 8s via GIT) and one in-progress run (5 secs, "Initializing build container").

---

### dev-CI/CD — Pipeline trigger — development

**File:** `dev-cicd-pipeline-trigger-development.png`

Pipeline trigger modal configured for development: **Push to Branch → development**, setup `development` selected.

---

### 07 — Mailpit email capture (development only)

**File:** `07-mailpit-password-reset-email.png`

Mailpit inbox showing a "Password Reset Request" email from Directus to `admin@example.com`. Captured immediately after triggering a password reset in Directus Data Studio.

---

## Error / gotcha reference

> These screenshots document known platform issues. Use them in troubleshooting sections.

### err — Invalid YAML file error in pipeline

**File:** `err-invalid-yaml-pipeline.png`

Pipeline failure screen showing `Invalid YAML file` with the raw YAML content visible. Caused by using unsupported `run:` block syntax in `zerops.yaml`.

---

### err — YAML schema error — failureTimeout type mismatch

**File:** `err-yaml-schema-failuretimeout.png`

VS Code / Cursor editor showing a schema validation error on `failureTimeout: "180s"`: *Incorrect type. Expected "integer"*. This is the `time.Duration` unmarshal bug — omit `failureTimeout` and `retryPeriod` entirely in `zerops.yaml`.

---

## Tips

- Use a **full-screen** browser window — no browser chrome cut off
- **1280×800** or wider resolution for the best result
- Keep light mode or dark mode consistent across all screenshots in the same guide
- Blur or crop sensitive values (passwords, tokens, keys) before committing

# External Integrations

**Analysis Date:** 2026-03-05

## APIs & External Services

**Email/Contact:**
- EmailJS - Contact form email delivery
  - Implementation: `src/components/Contact.tsx`
  - Uses: @emailjs/browser
  - Env vars: NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

**GitHub:**
- GitHub API - Project/repo data fetching
  - Data file: `public/repos.json` (static, pre-fetched)
  - Script: `scripts/fetch-repos.mjs` - Fetches and updates repo data

## Data Storage

**Static Data:**
- `public/repos.json` - Projects portfolio data (static JSON)

**No Database:**
- This is a static site with no backend database

## Authentication & Identity

**No Authentication:**
- Public portfolio website
- No login/user accounts

## Monitoring & Observability

**None:**
- No error tracking (Sentry, etc.)
- No analytics (Google Analytics, etc.)
- No logging service

## CI/CD & Deployment

**Hosting:**
- GitHub Pages - Static hosting
- Repository: https://github.com/rajeet-04/rash
- Production URL: https://rajeet-04.github.io/rash/

**CI Pipeline:**
- GitHub Actions (implied by gh-pages deployment)
- Deployment script in package.json: `npm run deploy`

## Environment Configuration

**Required env vars:**
- NEXT_PUBLIC_EMAILJS_SERVICE_ID
- NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
- NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
- NEXT_PUBLIC_SITE_URL (optional, defaults to GitHub Pages URL)

**Secrets location:**
- `.env.local` (not committed to git)

## Webhooks & Callbacks

**None:**
- No incoming webhooks
- No outgoing webhooks

---

*Integration audit: 2026-03-05*

# Codebase Structure

**Analysis Date:** 2026-03-05

## Directory Layout

```
R:\Code\rash\
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── page.tsx     # Main page (loading + portfolio)
│   │   ├── layout.tsx   # Root layout + metadata
│   │   └── globals.css  # Global styles + Tailwind
│   ├── components/       # React components (16 files)
│   └── styles/           # (not used - styles in globals.css)
├── public/              # Static assets
│   ├── repos.json       # Projects data
│   ├── r.png           # Logo
│   ├── header.png      # Header image
│   ├── git.png         # GitHub icon
│   └── .nojekyll       # GitHub Pages config
├── scripts/
│   └── fetch-repos.mjs # GitHub API fetch script
├── out/                # Static export output
├── .next/              # Next.js build output
├── package.json        # Dependencies
├── tsconfig.json       # TypeScript config
├── tailwind.config.js  # Tailwind config
├── postcss.config.js   # PostCSS config
├── next.config.js      # Next.js config
└── yarn.lock          # Lock file
```

## Directory Purposes

**`src/app/`:**
- Purpose: Next.js App Router pages and layouts
- Contains: page.tsx, layout.tsx, globals.css

**`src/components/`:**
- Purpose: All React UI components
- Contains: 16 component files (.tsx)

**`public/`:**
- Purpose: Static assets served as-is
- Contains: Images, JSON data, config files

**`scripts/`:**
- Purpose: Build/utility scripts
- Contains: fetch-repos.mjs for updating project data

**`out/`:**
- Purpose: Static export from Next.js build
- Generated: Yes (by `npm run build`)
- Committed: Yes (for GitHub Pages)

## Key File Locations

**Entry Points:**
- `src/app/page.tsx` - Main portfolio entry
- `src/app/layout.tsx` - Root layout with providers

**Configuration:**
- `tailwind.config.js` - Theme colors, fonts, animations
- `next.config.js` - Static export, basePath for GitHub Pages
- `tsconfig.json` - Path aliases (@/*)

**Core Logic:**
- `src/components/MainPortfolio.tsx` - Main portfolio orchestrator
- `src/components/Contact.tsx` - Form handling with EmailJS
- `src/components/Projects.tsx` - Project filtering and display

**Testing:**
- No test files detected (no .test.* or .spec.* files)

## Naming Conventions

**Files:**
- Components: PascalCase (e.g., `Hero.tsx`, `GlassCursor.tsx`)
- Pages: lowercase (e.g., `page.tsx`, `layout.tsx`)
- Config: camelCase with dots (e.g., `next.config.js`)

**Directories:**
- All lowercase: `src/components/`, `src/app/`

## Where to Add New Code

**New Section/Component:**
- Implementation: `src/components/NewComponent.tsx`
- Import in: `src/components/MainPortfolio.tsx`

**New Page:**
- Implementation: `src/app/new-page/page.tsx`

**New Style:**
- Add to: `src/app/globals.css` in @layer components

**New Data:**
- Static data: `public/new-data.json`
- Or add to existing: `public/repos.json`

## Special Directories

**`.next/`:**
- Purpose: Next.js build cache and output
- Generated: Yes
- Committed: No (in .gitignore)

**`out/`:**
- Purpose: Static export for deployment
- Generated: Yes (by `npm run build` or `npm run export`)
- Committed: Yes (required for GitHub Pages)

**`scripts/`:**
- Purpose: Utility scripts for data fetching
- Generated: No
- Committed: Yes

---

*Structure analysis: 2026-03-05*

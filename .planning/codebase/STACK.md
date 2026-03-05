# Technology Stack

**Analysis Date:** 2026-03-05

## Languages

**Primary:**
- TypeScript - Full implementation across all components and pages
- JavaScript - Build scripts and some dependencies

**Secondary:**
- CSS - Tailwind CSS with custom components in `src/app/globals.css`

## Runtime

**Environment:**
- Node.js v20.x.x (as shown in LoadingScreen)
- Next.js 16.1.5 (latest version)

**Package Manager:**
- Yarn (yarn.lock present)
- Version: modern Yarn (1.x or Berry)

## Frameworks

**Core:**
- Next.js 16.1.5 - React framework with App Router
- React 19.2.3 - UI library

**Styling:**
- Tailwind CSS 3.4.x - Utility-first CSS framework
- Custom CSS in `globals.css` - Glassmorphism system, animations, theme colors

**Animation:**
- Framer Motion 11.x - Complex animations and transitions
- GSAP 3.12.x - Additional animation capabilities
- AnimeJS 3.2.x - Entry screen animations
- Three.js 0.182.x - (imported but not actively used)

**State/Theming:**
- next-themes 0.2.1 - Dark/light theme management

## Key Dependencies

**UI/Animation:**
- @heroicons/react 2.0.0 - Icon library
- framer-motion 11.x - Motion library for React

**Forms/Email:**
- @emailjs/browser 4.4.1 - Email contact form

**Dev Tools:**
- TypeScript 5.x - Type safety
- ESLint 9.x - Code linting
- autoprefixer 10.x - CSS processing

## Configuration

**Environment:**
- Uses `.env.local` for environment variables
- NEXT_PUBLIC_EMAILJS_SERVICE_ID - EmailJS service
- NEXT_PUBLIC_EMAILJS_TEMPLATE_ID - EmailJS template
- NEXT_PUBLIC_EMAILJS_PUBLIC_KEY - EmailJS public key
- NEXT_PUBLIC_EMAILJS_SERVICE_ID - Site URL for metadata

**Build:**
- `next.config.js` - Static export to `/out` for GitHub Pages
- `tailwind.config.js` - Custom theme with colors, fonts, animations
- `postcss.config.js` - Tailwind + Autoprefixer
- `tsconfig.json` - TypeScript with path alias `@/*`

## Platform Requirements

**Development:**
- Node.js 18+
- Yarn/npm

**Production:**
- Static export (no server required)
- Deployed on GitHub Pages at: https://rajeet-04.github.io/rash/

---

*Stack analysis: 2026-03-05*

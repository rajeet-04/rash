# Coding Conventions

**Analysis Date:** 2026-03-05

## Naming Patterns

**Files:**
- Components: PascalCase (e.g., `Hero.tsx`, `GlassCursor.tsx`, `DynamicBackground.tsx`)
- Config files: camelCase with dots (e.g., `next.config.js`)
- JSON data: lowercase (e.g., `repos.json`)

**Functions:**
- camelCase (e.g., `handleSubmit`, `scrollToSection`)
- Event handlers: `handle` prefix (e.g., `handleInputChange`, `handleLoadingComplete`)

**Variables:**
- camelCase (e.g., `isVisible`, `currentRoleIndex`, `formData`)
- React state: descriptive names (e.g., `showLoading`, `isLoaded`, `selectedCategory`)

**Types:**
- PascalCase interfaces (e.g., `LoadingScreenProps`, `RepoData`, `Firefly`, `Ripple`)
- TypeScript throughout (explicit typing)

## Code Style

**Formatting:**
- Prettier (implied by Next.js defaults)
- 2-space indentation
- Single quotes for strings (mostly)

**Linting:**
- ESLint 9.x with eslint-config-next
- TypeScript strict mode enabled

## Import Organization

**Order:**
1. React/Next imports (`useState`, `useEffect`, etc.)
2. External libraries (framer-motion, heroicons, emailjs)
3. Internal components (relative paths with @ alias)
4. Type imports

**Path Aliases:**
- `@/*` maps to `./src/*` (defined in tsconfig.json)

**Example:**
```typescript
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDownIcon } from '@heroicons/react/24/outline'
import LoadingScreen from '@/components/LoadingScreen'
import MainPortfolio from '@/components/MainPortfolio'
```

## Error Handling

**Patterns:**
- Minimal error handling for portfolio site
- Contact form uses try/catch with status states ('idle', 'sending', 'success', 'error')
- No error boundaries

## Logging

**Framework:** None

**Patterns:** No logging in components

## Comments

**When to Comment:**
- Component props interface definitions
- CSS custom property sections in globals.css
- Design data extraction comments in DynamicBackground

**JSDoc/TSDoc:**
- Not extensively used
- Interface props have basic comments

## Function Design

**Size:** Varies - some complex functions (GlassCursor has extensive logic)

**Parameters:**
- Props interfaces defined at top of files
- Destructured in component signatures

**Return Values:**
- JSX in all components
- Early returns for loading states

## Module Design

**Exports:**
- Named exports for all components (default export)
- Single component per file

**Barrel Files:**
- Not used (direct imports)

---

*Convention analysis: 2026-03-05*

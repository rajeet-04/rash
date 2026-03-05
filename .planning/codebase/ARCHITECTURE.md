# Architecture

**Analysis Date:** 2026-03-05

## Pattern Overview

**Overall:** Next.js App Router with Component-Based Architecture

**Key Characteristics:**
- Single-page portfolio with scroll-based navigation
- Client-side rendering for animations (most components use 'use client')
- Static export for GitHub Pages deployment
- Theme-aware design system with CSS custom properties
- Glassmorphism visual style

## Layers

**Pages Layer:**
- Location: `src/app/`
- Contains: `page.tsx` (entry), `layout.tsx` (root layout)
- Entry: `page.tsx` - Shows loading screen then MainPortfolio

**Components Layer:**
- Location: `src/components/`
- Contains: 16 React components
- All UI elements and animations

**Styling Layer:**
- Location: `src/app/globals.css`
- Contains: Tailwind imports, CSS custom properties, glassmorphism classes, animations

**Public Assets:**
- Location: `public/`
- Contains: Static JSON data, images (logo, header)

## Data Flow

**Page Load Flow:**
1. User visits site → `page.tsx` loads
2. LoadingScreen displays (terminal-style animation)
3. Loading completes → AnimatePresence transitions to MainPortfolio
4. MainPortfolio renders all sections sequentially

**Section Rendering:**
```
MainPortfolio
├── DynamicBackground (parallax layer)
├── FireflyBackground (particle effects)
├── GlassCursor (custom cursor)
├── FloatingNav (bottom navigation)
├── Hero (intro + typing effect)
├── About (skills + stats)
├── Projects (filterable grid)
├── Experience (timeline)
├── Contact (form + info)
└── Footer (ASCII art + links)
```

**Theme Flow:**
1. ThemeProvider wraps app (from `layout.tsx`)
2. Uses next-themes for dark/light/high-contrast modes
3. CSS variables update based on theme class
4. FloatingNav contains theme toggle buttons

## Key Abstractions

**Theme System:**
- Purpose: Manage dark/light/high-contrast themes
- Examples: `src/components/ThemeProvider.tsx`, `src/app/globals.css`
- Pattern: CSS custom properties + next-themes provider

**Loading System:**
- Purpose: Animated entry sequence
- Examples: `src/components/LoadingScreen.tsx`, `src/components/EntryScreen.tsx`
- Pattern: State-based show/hide with AnimatePresence

**Background Effects:**
- Purpose: Visual atmosphere
- Examples: `src/components/DynamicBackground.tsx`, `src/components/FireflyBackground.tsx`
- Pattern: Fixed position layers with scroll-linked animations

**Custom Cursor:**
- Purpose: Interactive cursor with ripples
- Examples: `src/components/GlassCursor.tsx`
- Pattern: Framer Motion springs, click ripple effects

## Entry Points

**Main Entry:**
- Location: `src/app/page.tsx`
- Triggers: Initial page load
- Responsibilities: Loading state management, LoadingScreen/MainPortfolio switching

**Root Layout:**
- Location: `src/app/layout.tsx`
- Triggers: Every page render
- Responsibilities: ThemeProvider setup, metadata, fonts, SEO

## Error Handling

**Strategy:** Minimal - portfolio site

**Patterns:**
- Contact form: try/catch with status feedback (success/error)
- No error boundaries implemented
- No fallback UI for component errors

## Cross-Cutting Concerns

**Logging:** None - no logging framework

**Validation:** 
- HTML5 form validation (required, email type)
- Contact form validates all fields

**Authentication:** N/A - public site

**SEO:**
- Full metadata in `layout.tsx` (title, description, OpenGraph, Twitter cards)
- Semantic HTML sections with IDs

---

*Architecture analysis: 2026-03-05*

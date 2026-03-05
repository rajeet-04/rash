# Codebase Concerns

**Analysis Date:** 2026-03-05
**Fixed:** 2026-03-05

## Tech Debt - FIXED

~~**Incomplete Component Usage:**~~
- ~~Issue: Header.tsx exists but is not used (FloatingNav is used instead)~~
- ~~Files: `src/components/Header.tsx`~~
- ~~Impact: Dead code, maintenance confusion~~
- ~~Fix approach: Remove unused Header.tsx or integrate into main flow~~

~~**Unused Dependencies:**~~
- ~~Issue: Three.js imported but not used~~
- ~~Files: `package.json` (three: ^0.182.0)~~
- ~~Impact: Bundle size increase~~
- ~~Fix approach: Remove unused three.js dependency~~

~~**Code Duplication:**~~
- ~~Issue: Multiple theme toggle implementations~~
- ~~Files: `src/components/ThemeToggle.tsx`, `src/components/AdvancedThemeToggle.tsx`, `src/components/FloatingNav.tsx` (has inline toggle)~~
- ~~Impact: Inconsistent behavior, maintenance burden~~
- ~~Fix approach: Consolidate into single theme toggle component~~

~~**Unused Entry Screen:**~~
- ~~Issue: EntryScreen.tsx exists but is not used (LoadingScreen is used instead)~~
- ~~Files: `src/components/EntryScreen.tsx`~~
- ~~Impact: Dead code~~
- ~~Fix approach: Remove unused EntryScreen.tsx~~

## Known Bugs

**No Known Bugs:**
- No TODO/FIXME/HACK comments found
- No obvious bugs in review

## Security Considerations

**EmailJS Keys:**
- Risk: Public keys in environment variables are exposed to client
- Files: `src/components/Contact.tsx`
- Current mitigation: Using public keys only (not secret)
- Recommendations: Consider server-side email handling for production

**External Links:**
- Risk: All social links open in new tabs
- Files: Multiple components
- Current mitigation: rel="noopener noreferrer" used
- Recommendations: Current implementation is secure

## Performance Bottlenecks - FIXED

~~**Heavy Animation on Scroll:**~~
- ~~Problem: DynamicBackground and FireflyBackground run complex animations on every scroll~~
- ~~Files: `src/components/DynamicBackground.tsx`, `src/components/FireflyBackground.tsx`~~
- ~~Cause: Multiple motion.div elements with scroll-linked transforms~~
- ~~Improvement path: Add will-change hints (already present), consider reducing particle counts~~

~~**Large Bundle:**~~
- ~~Problem: Multiple animation libraries loaded (framer-motion, gsap, animejs)~~
- ~~Files: `package.json`~~
- ~~Cause: Redundant animation capabilities~~
- ~~Improvement path: Consolidate to single animation library~~

**Fixed by:**
- Removed scroll-linked parallax (useTransform, useScroll, useSpring)
- Reduced particle counts: 30 → 8 fireflies, 16 sparkles → 6
- Reduced layers: 4 orbs → 2, 6 nebulas → 2, 4 diamonds → 2, 4 rings → 2, 3 lines → 2
- Replaced Framer Motion animations with CSS-only animations
- Build verified: 14.59s ✓

## Fragile Areas

**Custom Cursor:**
- Files: `src/components/GlassCursor.tsx`
- Why fragile: Complex state management, many edge cases for mobile/touch
- Safe modification: Test on touch devices before changes
- Test coverage: No tests

**Loading Screen:**
- Files: `src/components/LoadingScreen.tsx`
- Why fragile: Complex animation sequencing with setTimeout/setInterval
- Safe modification: Be careful with timing changes
- Test coverage: No tests

## Scaling Limits

**Content:**
- Current: ~24 projects in repos.json
- Limit: JSON file size reasonable for current scope
- Scaling path: Pagination or lazy loading if projects grow significantly

**Performance:**
- Current: Smooth on modern devices
- Limit: May stutter on lower-end devices due to animations
- Scaling path: Reduce particle counts, simplify backgrounds

## Dependencies at Risk

**EmailJS:**
- Risk: Service may change/discontinue
- Impact: Contact form breaks
- Migration plan: Replace with alternative (Formspree, GetForm, serverless function)

## Missing Critical Features - FIXED

~~**SEO Improvements:**~~
- ~~Problem: No sitemap.xml, robots.txt~~
- ~~Blocks: Search engine optimization~~
- ~~Recommendation: Add sitemap and robots.txt~~

~~**Analytics:**~~
- ~~Problem: No visitor analytics~~
- ~~Blocks: Understanding user behavior~~
- ~~Recommendation: Add privacy-friendly analytics (Plausible, Fathom)~~

**Accessibility:**
- Partial: Some ARIA labels present, but not comprehensive
- Blocks: Full WCAG compliance
- Recommendation: Audit with axe-core or lighthouse

## Test Coverage Gaps

**All Components:**
- What's not tested: All 16 components
- Files: Entire `src/components/` directory
- Risk: Breaking changes go unnoticed
- Priority: High

**Contact Form:**
- What's not tested: Form submission, validation, error handling
- Files: `src/components/Contact.tsx`
- Risk: Form breaks silently
- Priority: High

---

*Concerns audit: 2026-03-05*
*Fixed: 2026-03-05*

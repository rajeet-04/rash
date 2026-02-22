'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type SectionId = 'hero' | 'about' | 'experience' | 'projects' | 'contact'

// ── Atmospheric orbs: positions in viewport % units ──────────────────────────
const SECTION_ORBS: Record<SectionId, Array<{
  x: number; y: number; w: number; h: number
  color: string; opacity: number; blur: number
}>> = {
  hero: [
    { x: -18, y: -22, w: 66,  h: 66,  color: '#00D9FF', opacity: 0.10, blur: 130 },
    { x: 62,  y:   4, w: 58,  h: 58,  color: '#7C3AED', opacity: 0.11, blur: 110 },
    { x: 28,  y:  52, w: 28,  h: 22,  color: '#0EA5B9', opacity: 0.07, blur: 80  },
  ],
  about: [
    { x: 74,  y:   5, w: 48,  h: 48,  color: '#A855F7', opacity: 0.11, blur: 110 },
    { x: -16, y:  34, w: 44,  h: 44,  color: '#00D9FF', opacity: 0.08, blur: 95  },
    { x: 38,  y:  62, w: 32,  h: 30,  color: '#6D28D9', opacity: 0.06, blur: 80  },
  ],
  experience: [
    { x: -14, y:   0, w: 52,  h: 52,  color: '#6D28D9', opacity: 0.10, blur: 120 },
    { x: 78,  y:  36, w: 38,  h: 38,  color: '#00D9FF', opacity: 0.09, blur: 85  },
    { x: 40,  y:  14, w: 26,  h: 24,  color: '#F472B6', opacity: 0.07, blur: 70  },
  ],
  projects: [
    { x: 56,  y:   4, w: 60,  h: 58,  color: '#00D9FF', opacity: 0.09, blur: 120 },
    { x:  2,  y:  30, w: 44,  h: 42,  color: '#EC4899', opacity: 0.08, blur: 95  },
    { x: 46,  y:  56, w: 32,  h: 30,  color: '#7C3AED', opacity: 0.10, blur: 85  },
  ],
  contact: [
    { x: 10,  y:   4, w: 54,  h: 52,  color: '#7C3AED', opacity: 0.11, blur: 120 },
    { x: 66,  y:  24, w: 46,  h: 46,  color: '#00D9FF', opacity: 0.10, blur: 100 },
    { x: 38,  y:  68, w: 32,  h: 30,  color: '#F472B6', opacity: 0.07, blur: 80  },
  ],
}

// ── Circuit paths: SVG path data in 1440×900 viewport coordinates ─────────────
const CIRCUIT_PATHS: Record<SectionId, Array<{ d: string; color: string }>> = {
  hero: [
    { d: 'M 60 220 H 300 V 100 H 520 V 180',                     color: '#00D9FF' },
    { d: 'M 1380 160 H 1160 V 290 H 960 V 230 H 780',           color: '#A855F7' },
    { d: 'M 140 820 H 450 V 870 H 760 V 820 H 1060 V 870 H 1340', color: '#00D9FF' },
  ],
  about: [
    { d: 'M 1310 130 H 1070 V 270 H 830 V 205',                  color: '#A855F7' },
    { d: 'M 80 570 H 370 V 650 H 600 V 580 H 840',               color: '#00D9FF' },
  ],
  experience: [
    { d: 'M 110 140 H 400 V 290 H 670 V 220 H 940',              color: '#00D9FF' },
    { d: 'M 1360 570 H 1100 V 670 H 860 V 610',                  color: '#A855F7' },
  ],
  projects: [
    { d: 'M 70 140 H 350 V 265 H 640 V 195 H 920 V 278 H 1190',  color: '#00D9FF' },
    { d: 'M 80 760 H 340 V 840',                                  color: '#4A9EFF' },
  ],
  contact: [
    { d: 'M 1360 340 H 1100 V 480 H 840 V 405 H 560 V 510 H 300', color: '#00D9FF' },
    { d: 'M 580 780 H 820 V 840 H 1100 V 780 H 1360',            color: '#A855F7' },
  ],
}

// ── Node dots at circuit bends ────────────────────────────────────────────────
const CIRCUIT_NODES: Record<SectionId, Array<{ cx: number; cy: number; color: string }>> = {
  hero:       [{ cx: 300, cy: 100, color: '#00D9FF' }, { cx: 520, cy: 180, color: '#00D9FF' }, { cx: 1160, cy: 290, color: '#A855F7' }],
  about:      [{ cx: 1070, cy: 270, color: '#A855F7' }, { cx: 370, cy: 650, color: '#00D9FF' }],
  experience: [{ cx: 400, cy: 290, color: '#00D9FF' }, { cx: 1100, cy: 670, color: '#A855F7' }],
  projects:   [{ cx: 350, cy: 265, color: '#00D9FF' }, { cx: 920, cy: 278, color: '#00D9FF' }],
  contact:    [{ cx: 1100, cy: 480, color: '#00D9FF' }, { cx: 560, cy: 510, color: '#00D9FF' }, { cx: 820, cy: 840, color: '#A855F7' }],
}

// ── Geometric accent shapes ───────────────────────────────────────────────────
const SHAPES: Record<SectionId, Array<{
  type: 'hex' | 'tri' | 'dia'
  cx: number; cy: number; r: number
  color: string; opacity: number
}>> = {
  hero: [
    { type: 'hex', cx: 1185, cy: 225, r: 70, color: '#00D9FF', opacity: 0.30 },
    { type: 'hex', cx: 130,  cy: 420, r: 45, color: '#A855F7', opacity: 0.28 },
    { type: 'hex', cx: 680,  cy: 376, r: 28, color: '#4A9EFF', opacity: 0.20 },
  ],
  about: [
    { type: 'tri', cx: 820,  cy:  85, r: 75, color: '#00D9FF', opacity: 0.25 },
    { type: 'hex', cx: 1180, cy: 720, r: 40, color: '#A855F7', opacity: 0.22 },
  ],
  experience: [
    { type: 'dia', cx: 1320, cy:  95, r: 55, color: '#A855F7', opacity: 0.30 },
    { type: 'hex', cx: 950,  cy: 250, r: 35, color: '#F472B6', opacity: 0.25 },
    { type: 'hex', cx: 200,  cy: 680, r: 30, color: '#00D9FF', opacity: 0.22 },
  ],
  projects: [
    { type: 'hex', cx: 305,  cy: 290, r: 80, color: '#F472B6', opacity: 0.28 },
    { type: 'hex', cx: 1100, cy: 750, r: 30, color: '#00D9FF', opacity: 0.22 },
  ],
  contact: [
    { type: 'tri', cx: 1155, cy: 405, r: 75, color: '#A855F7', opacity: 0.25 },
    { type: 'hex', cx: 220,  cy: 300, r: 45, color: '#00D9FF', opacity: 0.22 },
  ],
}

// ── Scan ring configs (concentric circles at orb focal points) ────────────────
const SCAN_RINGS: Record<SectionId, Array<{ cx: number; cy: number; r: number; color: string }>> = {
  hero:       [{ cx: 280,  cy: 230,  r: 240, color: '#00D9FF' }, { cx: 280,  cy: 230,  r: 380, color: '#00D9FF' }],
  about:      [{ cx: 1250, cy: 300,  r: 220, color: '#A855F7' }],
  experience: [{ cx: 160,  cy: 280,  r: 260, color: '#6D28D9' }],
  projects:   [{ cx: 1200, cy: 340,  r: 300, color: '#00D9FF' }],
  contact:    [{ cx: 400,  cy: 300,  r: 250, color: '#7C3AED' }, { cx: 400,  cy: 300,  r: 400, color: '#7C3AED' }],
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function hexPath(cx: number, cy: number, r: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`
  }).reduce((acc, p, i) => acc + (i === 0 ? `M ${p}` : ` L ${p}`), '') + ' Z'
}

function triPath(cx: number, cy: number, r: number): string {
  return `M ${cx.toFixed(1)},${(cy - r).toFixed(1)} L ${(cx + r * 0.866).toFixed(1)},${(cy + r * 0.5).toFixed(1)} L ${(cx - r * 0.866).toFixed(1)},${(cy + r * 0.5).toFixed(1)} Z`
}

function diaPath(cx: number, cy: number, r: number): string {
  const rx = r * 0.65
  return `M ${cx.toFixed(1)},${(cy - r).toFixed(1)} L ${(cx + rx).toFixed(1)},${cy.toFixed(1)} L ${cx.toFixed(1)},${(cy + r).toFixed(1)} L ${(cx - rx).toFixed(1)},${cy.toFixed(1)} Z`
}

function buildShapePath(s: { type: 'hex' | 'tri' | 'dia'; cx: number; cy: number; r: number }): string {
  if (s.type === 'hex') return hexPath(s.cx, s.cy, s.r)
  if (s.type === 'tri') return triPath(s.cx, s.cy, s.r)
  return diaPath(s.cx, s.cy, s.r)
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function DynamicBackground() {
  const [activeSection, setActiveSection] = useState<SectionId>('hero')

  // Detect which section is visible
  useEffect(() => {
    const sectionIds: SectionId[] = ['hero', 'about', 'experience', 'projects', 'contact']

    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveSection(id)
          })
        },
        { threshold: 0.25, rootMargin: '-5% 0px -5% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((obs) => obs.disconnect())
  }, [])

  const orbs = SECTION_ORBS[activeSection]
  const circuits = CIRCUIT_PATHS[activeSection]
  const nodes = CIRCUIT_NODES[activeSection]
  const shapes = SHAPES[activeSection]
  const rings = SCAN_RINGS[activeSection]

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* ── Atmospheric orbs ─────────────────────────────────────────────── */}
      <AnimatePresence mode="sync">
        {orbs.map((orb, i) => (
          <motion.div
            key={`${activeSection}-orb-${i}`}
            className="absolute rounded-full"
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: orb.opacity, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 1.4, ease: 'easeInOut', delay: i * 0.18 }}
            style={{
              left: `${orb.x}%`,
              top: `${orb.y}%`,
              width: `${orb.w}%`,
              height: `${orb.h}%`,
              background: orb.color,
              filter: `blur(${orb.blur}px)`,
              willChange: 'opacity, transform',
            }}
          />
        ))}
      </AnimatePresence>

      {/* ── SVG vector layer ─────────────────────────────────────────────── */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Persistent fine grid */}
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`vg-${i}`} x1={(i + 1) * 144} y1={0} x2={(i + 1) * 144} y2={900}
            stroke="#4A9EFF" strokeWidth={0.5} opacity={0.04} />
        ))}
        {Array.from({ length: 7 }, (_, i) => (
          <line key={`hg-${i}`} x1={0} y1={(i + 1) * 112.5} x2={1440} y2={(i + 1) * 112.5}
            stroke="#4A9EFF" strokeWidth={0.5} opacity={0.035} />
        ))}

        {/* Persistent diagonal atmosphere lines */}
        <line x1={0} y1={200} x2={500} y2={850} stroke="#A855F7" strokeWidth={0.5} opacity={0.09} />
        <line x1={940} y1={0} x2={1440} y2={700} stroke="#00D9FF" strokeWidth={0.5} opacity={0.09} />

        {/* Scan rings (concentric glow circles) */}
        <AnimatePresence mode="sync">
          {rings.map((ring, i) => (
            <motion.circle
              key={`${activeSection}-ring-${i}`}
              cx={ring.cx} cy={ring.cy} r={ring.r}
              stroke={ring.color} strokeWidth={0.8} fill="none"
              initial={{ opacity: 0, r: ring.r * 0.6 }}
              animate={{ opacity: 0.08, r: ring.r }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: 'easeOut', delay: i * 0.3 }}
            />
          ))}
        </AnimatePresence>

        {/* Section-reactive circuit traces — animate path drawing */}
        <AnimatePresence mode="sync">
          {circuits.map((c, i) => (
            <motion.path
              key={`${activeSection}-cir-${i}`}
              d={c.d}
              stroke={c.color}
              strokeWidth={1}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: 0.25, pathLength: 1 }}
              exit={{ opacity: 0, pathLength: 0 }}
              transition={{ duration: 1.6, ease: 'easeInOut', delay: i * 0.25 }}
            />
          ))}
        </AnimatePresence>

        {/* Circuit node glow dots */}
        <AnimatePresence mode="sync">
          {nodes.map((n, i) => (
            <motion.circle
              key={`${activeSection}-nd-${i}`}
              cx={n.cx} cy={n.cy} r={3.5}
              fill={n.color}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.75, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.5, ease: 'backOut', delay: 1.2 + i * 0.12 }}
              style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
            />
          ))}
        </AnimatePresence>

        {/* Geometric accent shapes */}
        <AnimatePresence mode="sync">
          {shapes.map((s, i) => (
            <motion.path
              key={`${activeSection}-shape-${i}`}
              d={buildShapePath(s)}
              stroke={s.color}
              strokeWidth={1.2}
              fill="none"
              strokeLinejoin="round"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: s.opacity, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.9, ease: 'easeOut', delay: 0.5 + i * 0.18 }}
              style={{ transformOrigin: `${s.cx}px ${s.cy}px` }}
            />
          ))}
        </AnimatePresence>
      </svg>
    </div>
  )
}

'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const RADIUS = 18;
const CIRC = 2 * Math.PI * RADIUS;

export default function ScrollExtras() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });
  // Cincin progres digerakkan langsung oleh motion value — tanpa re-render React per frame
  const dashOffset = useTransform(scrollYProgress, (v) => CIRC * (1 - v));
  const [show, setShow] = useState(false);

  useEffect(
    () =>
      scrollYProgress.on('change', (v) => {
        const next = v > 0.12;
        // setState hanya saat melewati ambang, bukan setiap frame
        setShow((prev) => (prev === next ? prev : next));
      }),
    [scrollYProgress],
  );

  return (
    <>
      {/* Garis progres scroll di atas header */}
      <motion.div
        aria-hidden
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-500"
      />

      {/* Tombol kembali ke atas + cincin progres */}
      <button
        onClick={() => {
          if (window.__lenis) window.__lenis.scrollTo(0);
          else window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        aria-label="Kembali ke atas"
        className={`fixed bottom-6 right-6 z-[70] flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-[#070812]/90 text-white/80 transition-all duration-300 hover:text-white ${
          show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
        }`}
      >
        <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 48 48" aria-hidden>
          <defs>
            <linearGradient id="scrollRing" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#22d3ee" />
              <stop offset="1" stopColor="#a855f7" />
            </linearGradient>
          </defs>
          <circle cx="24" cy="24" r={RADIUS} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2.5" />
          <motion.circle
            cx="24"
            cy="24"
            r={RADIUS}
            fill="none"
            stroke="url(#scrollRing)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            style={{ strokeDashoffset: dashOffset }}
          />
        </svg>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </>
  );
}

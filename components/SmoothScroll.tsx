'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function SmoothScroll() {
  useEffect(() => {
    // Hormati preferensi "kurangi gerakan"
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Di perangkat sentuh (HP/PID), scroll bawaan browser jauh lebih mulus —
    // Lenis justru membuat patah-patah, jadi lewati.
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      anchors: true, // tangani link #anchor dengan mulus
    });
    window.__lenis = lenis;

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  return null;
}

'use client';

import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const blob = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Nonaktifkan di perangkat sentuh / pengguna yang minta gerak minimal
    if (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let bx = mx,
      by = my;
    let raf = 0;
    let shown = false;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!shown) {
        shown = true;
        if (blob.current) blob.current.style.opacity = '1';
      }
    };

    window.addEventListener('mousemove', onMove);

    const tick = () => {
      // ikuti dengan responsif (lerp tinggi) agar tidak terasa berat
      bx += (mx - bx) * 0.2;
      by += (my - by) * 0.2;
      if (blob.current) {
        blob.current.style.transform = `translate3d(${bx - 180}px, ${by - 180}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={blob}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60] h-[360px] w-[360px] rounded-full opacity-0 transition-opacity duration-500"
      style={{
        background:
          'radial-gradient(circle, rgba(124,108,247,0.14), rgba(34,211,238,0.06) 42%, transparent 66%)',
        filter: 'blur(28px)',
        willChange: 'transform',
      }}
    />
  );
}

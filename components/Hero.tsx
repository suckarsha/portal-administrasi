'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { profile, adminItems } from '@/lib/data';

const Scene3D = dynamic(() => import('./Scene3D'), { ssr: false });

/* Pembungkus "magnetik": elemen sedikit tertarik ke arah kursor */
function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16 });
  const sy = useSpring(y, { stiffness: 220, damping: 16 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

/* Kata yang berganti-ganti dengan animasi */
const rotatingWords = ['tertata rapi', 'lengkap', 'mudah diakses', 'siap kapan saja'];

function RotatingWord() {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setI((v) => (v + 1) % rotatingWords.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative inline-grid overflow-hidden align-bottom">
      {/* penahan lebar agar layout tidak loncat */}
      <span className="invisible col-start-1 row-start-1 font-semibold">
        {rotatingWords.reduce((a, b) => (a.length >= b.length ? a : b))}
      </span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={i}
          initial={{ y: '105%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-105%', opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="col-start-1 row-start-1 bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-center font-semibold text-transparent"
        >
          {rotatingWords[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  // Parallax: saat hero di-scroll keluar, helix bergerak lebih lambat & memudar
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-14%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={sectionRef} className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Kanvas 3D (parallax) */}
      <motion.div style={{ y: bgY, opacity: bgOpacity }} className="absolute inset-0 z-0">
        <Scene3D />
      </motion.div>

      {/* Gradien penegas keterbacaan (lembut, agar kristal tetap terlihat) */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-ink/30 via-transparent to-ink" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_55%_40%_at_50%_50%,rgba(5,6,15,0.35),transparent_80%)]" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-20 mx-auto max-w-4xl px-6 text-center"
      >
        <motion.div
          variants={item}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-ink/40 px-4 py-1.5 text-xs font-medium text-white/70"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
          </span>
          {profile.role} · {profile.school}
        </motion.div>

        <motion.h1
          variants={item}
          className="font-display text-4xl font-bold leading-[0.98] tracking-[-0.03em] text-white [text-shadow:0_2px_40px_rgba(5,6,15,0.6)] sm:text-6xl lg:text-[5.25rem]"
        >
          Portal Administrasi
          <br />
          <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-400 bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-x">
            Pembelajaran IPA
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg"
        >
          Satu pintu untuk seluruh perangkat dan berkas administrasi
          pembelajaran — <RotatingWord />.
        </motion.p>

        <motion.div variants={item} className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Magnetic>
            <a
              href="#administrasi"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-7 py-3.5 text-sm font-semibold text-ink shadow-xl shadow-cyan-500/25"
            >
              <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-700 group-hover:translate-x-full" />
              Jelajahi Berkas
            </a>
          </Magnetic>
          <a
            href="#administrasi"
            className="rounded-full border border-white/15 bg-ink/40 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            {adminItems.length} Dokumen Tersedia
          </a>
        </motion.div>
      </motion.div>

      {/* Indikator scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1.5">
          <motion.span
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="h-1.5 w-1.5 rounded-full bg-white/70"
          />
        </div>
      </motion.div>
    </section>
  );
}

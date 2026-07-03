'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { profile } from '@/lib/data';
import PreloaderLogo from './PreloaderLogo';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setProgress(100);
      const t = setTimeout(() => setDone(true), 300);
      return () => clearTimeout(t);
    }

    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 9 + 4;
      if (p >= 100) {
        p = 100;
        clearInterval(id);
        setTimeout(() => setDone(true), 500);
      }
      setProgress(Math.floor(p));
    }, 95);
    return () => clearInterval(id);
  }, []);

  // Kunci scroll selama loading
  useEffect(() => {
    document.body.style.overflow = done ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
        >
          {/* monogram berdenyut */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative mb-8 flex items-center justify-center"
          >
            <span className="absolute inset-0 -m-4 rounded-full bg-violet-500/30 blur-2xl" />
            <span className="relative">
              <PreloaderLogo size={76} />
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display text-sm tracking-[0.3em] text-white/70"
          >
            {profile.name.toUpperCase()}
          </motion.p>

          {/* angka counter */}
          <div className="mt-10 font-display text-6xl font-bold tabular-nums text-white sm:text-7xl">
            {progress}
            <span className="text-cyan-300">%</span>
          </div>

          {/* progress bar */}
          <div className="mt-6 h-[3px] w-56 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="mt-5 text-xs tracking-widest text-white/40">MEMUAT PORTAL ADMINISTRASI</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

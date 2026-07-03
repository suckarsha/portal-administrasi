'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { profile, stats } from '@/lib/data';
import { useModalBehavior } from '@/lib/useModalBehavior';

function CountUp({ value, suffix, run }: { value: number; suffix: string; run: boolean }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!run) {
      setN(0);
      return;
    }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setN(value);
      return;
    }
    let raf = 0;
    const duration = 1200;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, value]);

  return (
    <span className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}

export default function ProfileModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const mounted = useModalBehavior(open, onClose);

  const waLink = `https://wa.me/${profile.whatsapp}`;

  if (!mounted) return null;

  // Portal ke <body> agar modal selalu di atas semua section halaman
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/70 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-[#0a0c1a]/90 p-6 backdrop-blur-2xl sm:p-8"
          >
            {/* tombol tutup */}
            <button
              onClick={onClose}
              aria-label="Tutup"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
              {/* foto profil */}
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/20 via-violet-500/10 to-transparent p-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/foto.jpg"
                  alt="Foto I Kadek Sukarsa, S.Pd"
                  className="h-full w-full rounded-[14px] object-cover object-top"
                />
              </div>

              <div className="text-center sm:text-left">
                <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-300/80">
                  Tentang Pengajar
                </span>
                <h3 className="mt-2 font-display text-2xl font-bold text-white">{profile.name}</h3>
                <p className="mt-1 text-sm text-white/50">
                  {profile.role} · {profile.school}
                </p>
              </div>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-white/65">{profile.bio}</p>

            {/* kontak */}
            <div className="mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500/90 px-5 py-2.5 text-sm font-semibold text-ink transition-transform hover:scale-105"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2Zm5.8 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5-4.5-.2-.2-1.2-1.6-1.2-3s.7-2.1 1-2.4c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.5-.3.3c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1l.7-.9c.2-.2.4-.2.6-.1l1.9.9c.2.1.4.2.5.3.1.3.1.8-.1 1.5Z" />
                </svg>
                WhatsApp
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
                Email
              </a>
            </div>

            {/* statistik */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center"
                >
                  <div className="font-display text-2xl font-bold">
                    <span className="bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">
                      <CountUp value={s.value} suffix={s.suffix} run={open} />
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] leading-tight text-white/55">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

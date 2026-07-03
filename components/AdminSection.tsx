'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { adminItems } from '@/lib/data';
import AdminCard from './AdminCard';
import RevealTitle from './RevealTitle';

export default function AdminSection() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q === '') return adminItems;
    return adminItems.filter(
      (it) =>
        it.title.toLowerCase().includes(q) || it.description.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <section id="administrasi" className="relative z-20 mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-2xl text-center"
      >
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300/80">
          Dokumen Administrasi
        </span>
        <RevealTitle
          text="Semua Berkas, Satu Tempat"
          className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl"
        />
        <p className="mt-4 text-base text-white/55">
          Klik kartu untuk membuka berkas langsung dari Google Drive.
        </p>
      </motion.div>

      {/* Pencarian */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mx-auto mt-10 w-full max-w-md"
      >
        <div className="relative">
          <svg
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari dokumen… (mis. nilai, ATP, kalender)"
            className="w-full rounded-full border border-white/10 bg-white/[0.04] py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-cyan-400/40"
          />
        </div>
      </motion.div>

      {/* Grid kartu */}
      <motion.div layout className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((it, i) => (
            <AdminCard key={it.id} item={it} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-12 text-center text-white/50"
        >
          <p className="text-lg">Tidak ada dokumen yang cocok.</p>
          <button
            onClick={() => setQuery('')}
            className="mt-3 text-sm font-medium text-cyan-300 hover:underline"
          >
            Reset pencarian
          </button>
        </motion.div>
      )}
    </section>
  );
}

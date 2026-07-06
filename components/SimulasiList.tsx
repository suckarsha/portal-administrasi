'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { BabSimulasi } from '@/lib/simulasi';

export default function SimulasiList({ babList }: { babList: BabSimulasi[] }) {
  // Hanya satu bab terbuka pada satu waktu; awalnya semua tertutup.
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="mt-14 flex flex-col gap-5">
      {babList.map((bab, bi) => {
        const open = openId === bab.id;
        const ada = bab.simulasi.length > 0;
        return (
          <motion.section
            key={bab.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.05 * bi }}
            className={`overflow-hidden rounded-2xl border bg-white/[0.03] transition-colors duration-300 ${
              open ? 'border-cyan-400/40' : 'border-white/10 hover:border-white/20'
            }`}
          >
            {/* Kepala bab (dropdown) */}
            <button
              type="button"
              onClick={() => setOpenId(open ? null : bab.id)}
              className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-7"
            >
              <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-sm font-bold text-cyan-300">
                {bab.bab}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-display text-base font-semibold text-white sm:text-xl">
                  {bab.judul}
                </span>
                <span className="mt-0.5 block text-xs uppercase tracking-[0.18em] text-white/40">
                  Semester {bab.semester} ·{' '}
                  {ada ? `${bab.simulasi.length} simulasi` : 'segera hadir'}
                </span>
              </span>
              <motion.span
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-cyan-300"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </motion.span>
            </button>

            {/* Isi bab */}
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  key="isi"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="border-t border-white/5 px-5 pb-6 pt-5 sm:px-7">
                    {!ada ? (
                      <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-8 text-center text-white/40">
                        Simulasi untuk bab ini sedang disiapkan — segera hadir. 🚧
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {bab.simulasi.map((sim, i) => (
                          <motion.a
                            key={sim.id}
                            href={sim.href}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, delay: i * 0.05 }}
                            whileHover={{ y: -6 }}
                            className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-cyan-400/40"
                          >
                            <span className="pointer-events-none absolute inset-0 -translate-x-[130%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[130%]" />

                            <div className="flex items-start justify-between gap-3">
                              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-400/10 text-2xl ring-1 ring-cyan-400/30 transition-transform duration-300 group-hover:scale-110">
                                {sim.emoji}
                              </span>
                              <span className="rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-white/45">
                                {sim.subbab}
                              </span>
                            </div>

                            <h3 className="mt-4 text-lg font-semibold text-white">
                              {sim.title}
                            </h3>
                            <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">
                              {sim.description}
                            </p>

                            <div className="mt-5 flex items-center justify-end border-t border-white/5 pt-4">
                              <span className="flex items-center gap-1.5 text-sm font-medium text-cyan-300 transition-all duration-300 group-hover:gap-2.5">
                                Mulai Simulasi
                                <svg
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.6"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-4 w-4"
                                >
                                  <path d="M7 17 17 7M9 7h8v8" />
                                </svg>
                              </span>
                            </div>
                          </motion.a>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>
        );
      })}
    </div>
  );
}

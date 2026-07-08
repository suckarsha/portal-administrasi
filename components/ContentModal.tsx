'use client';

import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import type { DocContent } from '@/lib/data';
import { useModalBehavior } from '@/lib/useModalBehavior';

export default function ContentModal({
  open,
  onClose,
  title,
  content,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  content: DocContent;
}) {
  const mounted = useModalBehavior(open, onClose);
  if (!mounted) return null;

  // Portal ke <body> agar modal selalu di atas semua section halaman
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[95] flex items-center justify-center bg-ink/80 p-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0a0c1a]"
          >
            {/* Header lengket */}
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-white/10 bg-[#0a0c1a] px-6 py-5 sm:px-8">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-300/80">
                  Capaian Pembelajaran
                </span>
                <h3 className="mt-1.5 font-display text-xl font-bold text-white sm:text-2xl">
                  {title}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                {content.badge && (
                  <span className="hidden shrink-0 rounded-full bg-gradient-to-r from-cyan-400/20 to-violet-400/20 px-3 py-1 text-xs font-semibold text-cyan-200 ring-1 ring-cyan-400/30 sm:inline">
                    {content.badge}
                  </span>
                )}
                <button
                  onClick={onClose}
                  aria-label="Tutup"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Isi yang bisa di-scroll */}
            <div className="overflow-y-auto px-6 py-7 sm:px-8">
              {content.sections.map((section, si) => (
                <section key={si} className={si > 0 ? 'mt-10' : ''}>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="h-5 w-1.5 rounded-full bg-gradient-to-b from-cyan-400 to-violet-500" />
                    <h4 className="font-display text-lg font-bold text-white">{section.title}</h4>
                  </div>

                  {section.paragraphs && (
                    <div className="space-y-3.5">
                      {section.paragraphs.map((p, pi) => (
                        <p key={pi} className="text-sm leading-relaxed text-white/70 sm:text-[15px]">
                          {p}
                        </p>
                      ))}
                    </div>
                  )}

                  {section.steps && (
                    <ol className="space-y-3">
                      {section.steps.map((step, sti) => (
                        <li
                          key={sti}
                          className="flex gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4"
                        >
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 text-sm font-bold text-ink">
                            {sti + 1}
                          </span>
                          <div>
                            <p className="font-semibold text-white">{step.title}</p>
                            <p className="mt-1 text-sm leading-relaxed text-white/65">{step.text}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  )}
                </section>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

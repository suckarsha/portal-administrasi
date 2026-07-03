'use client';

import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import type { AdminOption } from '@/lib/data';
import { useModalBehavior } from '@/lib/useModalBehavior';

export default function OptionPickerModal({
  open,
  onClose,
  title,
  options,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  options: AdminOption[];
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
          className="fixed inset-0 z-[95] flex items-center justify-center bg-ink/70 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#0a0c1a]/90 p-6 backdrop-blur-2xl sm:p-7"
          >
            <button
              onClick={onClose}
              aria-label="Tutup"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-300/80">
              Pilih Dokumen
            </span>
            <h3 className="mt-2 font-display text-xl font-bold text-white">{title}</h3>
            <p className="mt-1 text-sm text-white/50">Pilih semester untuk membuka berkasnya.</p>

            <div className="mt-5 flex flex-col gap-3">
              {options.map((opt) => (
                <a
                  key={opt.label}
                  href={opt.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-200 hover:border-cyan-400/40 hover:bg-white/[0.06]"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-400/10 text-cyan-300 ring-1 ring-cyan-400/30 transition-transform duration-200 group-hover:scale-110">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 7a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
                    </svg>
                  </span>
                  <span className="flex-1">
                    <span className="block font-semibold text-white">{opt.label}</span>
                    {opt.sublabel && (
                      <span className="block text-xs text-white/50">{opt.sublabel}</span>
                    )}
                  </span>
                  <svg
                    className="h-5 w-5 text-white/40 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-cyan-300"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17 17 7M9 7h8v8" />
                  </svg>
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

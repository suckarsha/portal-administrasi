'use client';

import { useEffect, useState } from 'react';

/* Perilaku standar modal: tutup dengan Esc, kunci scroll halaman
   (termasuk menghentikan Lenis), dan tanda "mounted" untuk portal. */
export function useModalBehavior(open: boolean, onClose: () => void) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    window.__lenis?.stop();
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      window.__lenis?.start();
    };
  }, [open, onClose]);

  return mounted;
}

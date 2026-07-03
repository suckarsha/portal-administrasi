'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProfileModal from './ProfileModal';
import Logo from './Logo';

export default function Navbar() {
  const [openProfile, setOpenProfile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTop = () => {
    if (window.__lenis) window.__lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-white/10 bg-[#070812]'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          {/* Logo kiri */}
          <button
            onClick={scrollTop}
            aria-label="Kembali ke atas"
            className="group relative flex items-center transition-transform hover:scale-105"
          >
            <span className="absolute -inset-2 rounded-full bg-violet-500/25 blur-lg transition-opacity group-hover:bg-violet-500/40" />
            <span className="relative drop-shadow-[0_4px_14px_rgba(124,108,247,0.4)]">
              <Logo size={42} />
            </span>
          </button>

          {/* Menu kanan: Berkas lalu Profil */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <a
              href="#administrasi"
              className="rounded-full px-3.5 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white sm:px-4"
            >
              Berkas
            </a>
            <button
              onClick={() => setOpenProfile(true)}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white sm:px-4"
            >
              Profil
            </button>
          </nav>
        </div>
      </motion.header>

      <ProfileModal open={openProfile} onClose={() => setOpenProfile(false)} />
    </>
  );
}

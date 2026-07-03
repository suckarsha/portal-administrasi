import { profile } from '@/lib/data';
import Logo from './Logo';

export default function Footer() {
  const year = new Date().getFullYear();
  const waLink = `https://wa.me/${profile.whatsapp}`;

  return (
    <footer className="relative z-20 mt-10 overflow-hidden border-t border-white/10">
      {/* aksen gradien atas + cahaya samar */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[36rem] -translate-x-1/2 rounded-full bg-violet-600/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <Logo size={40} />
              <div className="leading-tight">
                <p className="font-display text-base font-bold text-white">{profile.name}</p>
                <p className="text-xs text-white/50">
                  {profile.role} · {profile.school}
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/50">
              Portal terpusat untuk seluruh perangkat dan berkas administrasi pembelajaran —
              tertata rapi dan mudah diakses kapan saja.
            </p>
          </div>

          {/* Navigasi */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Navigasi
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href="#" className="text-white/65 transition-colors hover:text-cyan-300">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#administrasi" className="text-white/65 transition-colors hover:text-cyan-300">
                  Dokumen Administrasi
                </a>
              </li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Kontak
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/65 transition-colors hover:text-emerald-300"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2Zm5.8 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5-4.5-.2-.2-1.2-1.6-1.2-3s.7-2.1 1-2.4c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.5-.3.3c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1l.7-.9c.2-.2.4-.2.6-.1l1.9.9c.2.1.4.2.5.3.1.3.1.8-.1 1.5Z" />
                  </svg>
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 text-white/65 transition-colors hover:text-cyan-300"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bar bawah */}
        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="text-xs text-white/40">
            © {year} {profile.name}. {profile.tagline}.
          </p>
          <p className="text-xs text-white/35">
            Dibuat untuk memudahkan administrasi pembelajaran.
          </p>
        </div>
      </div>
    </footer>
  );
}

import Link from 'next/link';
import Logo from '@/components/Logo';

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ink px-6 text-center">
      {/* aurora halus */}
      <div className="pointer-events-none absolute inset-0 bg-aurora" />
      <div className="pointer-events-none absolute inset-0 bg-grid" />

      <div className="relative flex flex-col items-center">
        <Logo size={56} />

        <p className="mt-6 bg-gradient-to-r from-cyan-300 via-indigo-300 to-violet-400 bg-clip-text font-display text-[6rem] font-bold leading-none text-transparent sm:text-[9rem]">
          404
        </p>

        <h1 className="mt-2 font-display text-xl font-bold text-white sm:text-2xl">
          Halaman tidak ditemukan
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-white/55">
          Sepertinya alamat yang Anda tuju tidak ada atau sudah dipindahkan.
          Silakan kembali ke beranda untuk mengakses berkas administrasi.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-7 py-3 text-sm font-semibold text-ink shadow-xl shadow-cyan-500/25 transition-transform hover:scale-105"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </main>
  );
}

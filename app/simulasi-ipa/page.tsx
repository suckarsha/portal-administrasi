import type { Metadata } from 'next';
import Link from 'next/link';
import { babList } from '@/lib/simulasi';
import SimulasiList from '@/components/SimulasiList';

export const metadata: Metadata = {
  title: 'Simulasi IPA · Portal Administrasi IPA',
  description:
    'Kumpulan simulasi dan laboratorium virtual interaktif IPA kelas 7 untuk pembelajaran di papan interaktif digital (PID).',
};

export default function SimulasiIpaPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* latar dekoratif */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 right-[-10%] h-[480px] w-[640px] rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[420px] w-[560px] rounded-full bg-violet-400/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <Link
          href="/#administrasi"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white/70 transition-colors hover:border-cyan-400/40 hover:text-white"
        >
          ← Kembali ke Portal
        </Link>

        <div className="mx-auto mt-10 max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300/80">
            Media Interaktif · Kelas 7
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Simulasi IPA
          </h1>
          <p className="mt-4 text-base text-white/55">
            Simulasi interaktif untuk papan interaktif digital (PID). Sentuh bab untuk
            melihat daftar simulasinya, lalu sentuh kartu untuk memulai.
          </p>
        </div>

        <SimulasiList babList={babList} />
      </div>
    </main>
  );
}

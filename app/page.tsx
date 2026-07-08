import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AdminSection from '@/components/AdminSection';
import Marquee from '@/components/Marquee';
import Motto from '@/components/Motto';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-ink">
      <Preloader />

      {/* Latar dekoratif: fixed (seukuran layar) — bukan setinggi dokumen,
          agar GPU HP/PID tidak merasterisasi tekstur raksasa (sumber artefak) */}
      <div className="pointer-events-none fixed inset-0 bg-aurora" />
      <div className="pointer-events-none fixed inset-0 bg-grid" />

      <div className="relative">
        <Navbar />
        <Hero />
        <AdminSection />
        <Marquee />
        <Motto />
        <Footer />
      </div>
    </main>
  );
}

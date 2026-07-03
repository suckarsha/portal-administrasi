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

      {/* Latar dekoratif untuk bagian bawah lipatan */}
      <div className="pointer-events-none absolute inset-0 bg-aurora" />
      <div className="pointer-events-none absolute inset-0 bg-grid" />

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

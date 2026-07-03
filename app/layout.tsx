import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import CursorGlow from '@/components/CursorGlow';
import ScrollExtras from '@/components/ScrollExtras';
import SmoothScroll from '@/components/SmoothScroll';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Portal Administrasi IPA · I Kadek Sukarsa, S.Pd',
  description:
    'Portal administrasi pembelajaran IPA SMP Negeri 3 Singaraja oleh I Kadek Sukarsa, S.Pd. Akses kalender pendidikan, jadwal mengajar, program semester, CP, ATP, RPM, daftar nilai, dan daftar hadir siswa.',
  keywords: [
    'administrasi guru',
    'guru IPA',
    'SMP Negeri 3 Singaraja',
    'I Kadek Sukarsa',
    'perangkat pembelajaran',
  ],
  openGraph: {
    title: 'Portal Administrasi Pembelajaran IPA',
    description:
      'Satu pintu untuk seluruh perangkat dan berkas administrasi pembelajaran IPA — tertata rapi, lengkap, dan siap diakses kapan saja.',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portal Administrasi Pembelajaran IPA',
    description:
      'Satu pintu untuk seluruh perangkat dan berkas administrasi pembelajaran IPA.',
  },
};

export const viewport: Viewport = {
  themeColor: '#05060f',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${jakarta.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased">
        <SmoothScroll />
        <CursorGlow />
        <ScrollExtras />
        {children}
        <Analytics />
      </body>
    </html>
  );
}

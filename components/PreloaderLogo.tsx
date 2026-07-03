'use client';

import { motion } from 'framer-motion';

/* Versi logo DNA yang "menggambar dirinya" garis demi garis untuk preloader */
export default function PreloaderLogo({ size = 76 }: { size?: number }) {
  const strand = (delay: number) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: {
      pathLength: { duration: 1.0, delay, ease: 'easeInOut' as const },
      opacity: { duration: 0.15, delay },
    },
  });

  const rung = (delay: number) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: {
      pathLength: { duration: 0.35, delay, ease: 'easeOut' as const },
      opacity: { duration: 0.1, delay },
    },
  });

  const rungs: { d: string; color: string }[] = [
    { d: 'M18.5 13 L29.5 13', color: '#dcdafb' },
    { d: 'M15.5 16 L32.5 16', color: '#8a88e3' },
    { d: 'M18.5 19 L29.5 19', color: '#dcdafb' },
    { d: 'M18.5 29 L29.5 29', color: '#8a88e3' },
    { d: 'M15.5 32 L32.5 32', color: '#dcdafb' },
    { d: 'M18.5 35 L29.5 35', color: '#8a88e3' },
  ];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="pl-strand" x1="24" y1="6" x2="24" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#d6d4fb" />
          <stop offset="1" stopColor="#6361c6" />
        </linearGradient>
      </defs>

      <g transform="rotate(16 24 24)" strokeLinecap="round" fill="none">
        {/* untai belakang lalu depan */}
        <motion.path
          d="M24 8 C 14 13.5, 14 18.5, 24 24 C 34 29.5, 34 34.5, 24 40"
          stroke="#5957b0"
          strokeWidth="3.4"
          opacity="0.85"
          {...strand(0)}
        />
        <motion.path
          d="M24 8 C 34 13.5, 34 18.5, 24 24 C 14 29.5, 14 34.5, 24 40"
          stroke="url(#pl-strand)"
          strokeWidth="3.4"
          {...strand(0.2)}
        />

        {/* anak tangga menyusul satu per satu */}
        {rungs.map((r, i) => (
          <motion.path
            key={i}
            d={r.d}
            stroke={r.color}
            strokeWidth="2.8"
            {...rung(0.85 + i * 0.09)}
          />
        ))}

        {/* simpul ujung muncul terakhir */}
        <motion.circle
          cx="24" cy="8" r="2" fill="#d6d4fb"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 1.45 }}
        />
        <motion.circle
          cx="24" cy="40" r="2" fill="#6361c6"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 1.55 }}
        />
      </g>
    </svg>
  );
}

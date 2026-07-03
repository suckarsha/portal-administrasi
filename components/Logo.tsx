'use client';

import { useId } from 'react';

export default function Logo({ size = 40 }: { size?: number }) {
  const id = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Logo DNA — Portal Administrasi IPA"
    >
      <defs>
        <linearGradient id={`${id}-s`} x1="24" y1="6" x2="24" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#d6d4fb" />
          <stop offset="1" stopColor="#6361c6" />
        </linearGradient>
      </defs>

      <g transform="rotate(16 24 24)" strokeLinecap="round">
        {/* anak tangga (base pairs), bergantian terang & sedang */}
        <g strokeWidth="2.8">
          <path d="M18.5 13 L29.5 13" stroke="#dcdafb" />
          <path d="M15.5 16 L32.5 16" stroke="#8a88e3" />
          <path d="M18.5 19 L29.5 19" stroke="#dcdafb" />
          <path d="M18.5 29 L29.5 29" stroke="#8a88e3" />
          <path d="M15.5 32 L32.5 32" stroke="#dcdafb" />
          <path d="M18.5 35 L29.5 35" stroke="#8a88e3" />
        </g>

        {/* untai belakang */}
        <path
          d="M24 8 C 14 13.5, 14 18.5, 24 24 C 34 29.5, 34 34.5, 24 40"
          stroke="#5957b0"
          strokeWidth="3.4"
          opacity="0.85"
        />
        {/* untai depan */}
        <path
          d="M24 8 C 34 13.5, 34 18.5, 24 24 C 14 29.5, 14 34.5, 24 40"
          stroke={`url(#${id}-s)`}
          strokeWidth="3.4"
        />

        {/* simpul ujung */}
        <circle cx="24" cy="8" r="2" fill="#d6d4fb" />
        <circle cx="24" cy="40" r="2" fill="#6361c6" />
      </g>
    </svg>
  );
}

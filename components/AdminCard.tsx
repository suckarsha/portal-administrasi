'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import type { AdminItem } from '@/lib/data';
import { Icon, ArrowIcon } from './Icons';
import OptionPickerModal from './OptionPickerModal';
import ContentModal from './ContentModal';

export default function AdminCard({ item, index }: { item: AdminItem; index: number }) {
  const ref = useRef<HTMLElement | null>(null);
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [open, setOpen] = useState(false);
  const [tiltOn, setTiltOn] = useState(false);

  // Tilt 3D hanya untuk perangkat berkursor — di layar sentuh (HP/PID)
  // tidak ada hover, dan perspective per-kartu membebani GPU lemah
  useEffect(() => {
    setTiltOn(window.matchMedia('(pointer: fine)').matches);
  }, []);

  // Kemiringan 3D mengikuti kursor (dihaluskan dengan spring)
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const sRotX = useSpring(rotX, { stiffness: 220, damping: 18 });
  const sRotY = useSpring(rotY, { stiffness: 220, damping: 18 });

  const hasOptions = !!item.options?.length;
  const hasContent = !!item.content;
  const isButton = hasOptions || hasContent;

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setGlow({ x: px * 100, y: py * 100 });
    rotY.set((px - 0.5) * 9);
    rotX.set(-(py - 0.5) * 9);
  };

  const handleLeave = () => {
    rotX.set(0);
    rotY.set(0);
  };

  const className =
    'group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left transition-colors duration-300 hover:border-white/20';

  const motionProps = {
    onMouseMove: tiltOn ? handleMove : undefined,
    onMouseLeave: tiltOn ? handleLeave : undefined,
    layout: true as const,
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    exit: { opacity: 0, scale: 0.92 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.5, delay: (index % 4) * 0.06, ease: [0.22, 1, 0.36, 1] as const },
    whileHover: { y: -6 },
    style: tiltOn ? { rotateX: sRotX, rotateY: sRotY, transformPerspective: 900 } : undefined,
    className,
  };

  const inner = (
    <>
      {/* Sorotan mengikuti kursor */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(420px circle at ${glow.x}% ${glow.y}%, rgba(56,189,248,0.12), transparent 45%)`,
        }}
      />

      {/* Sapuan kilau saat hover */}
      <span className="pointer-events-none absolute inset-0 -translate-x-[130%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/[0.09] to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[130%]" />

      <div className="relative">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-400/10 text-cyan-300 ring-1 ring-cyan-400/30 transition-transform duration-300 group-hover:scale-110">
          <Icon
            name={item.icon}
            className="h-6 w-6 group-hover:animate-[wiggle_0.55s_ease-in-out]"
          />
        </div>
      </div>

      <h3 className="relative mt-5 text-lg font-semibold text-white">{item.title}</h3>
      <p className="relative mt-2 flex-1 text-sm leading-relaxed text-white/55">
        {item.description}
      </p>

      <div
        className={`relative mt-5 flex items-center border-t border-white/5 pt-4 ${
          hasOptions ? 'justify-between' : 'justify-end'
        }`}
      >
        {hasOptions && (
          <span className="flex items-center gap-2 text-xs font-medium text-white/45">
            <Icon name="layers" className="h-4 w-4" /> {item.options!.length} pilihan
          </span>
        )}
        <span className="flex items-center gap-1.5 text-sm font-medium text-cyan-300 transition-all duration-300 group-hover:gap-2.5">
          {hasContent ? 'Lihat' : hasOptions ? 'Pilih' : 'Buka'}
          <ArrowIcon className="h-4 w-4" />
        </span>
      </div>
    </>
  );

  if (isButton) {
    return (
      <>
        <motion.button
          type="button"
          ref={ref as React.Ref<HTMLButtonElement>}
          onClick={() => setOpen(true)}
          {...motionProps}
        >
          {inner}
        </motion.button>
        {hasOptions && (
          <OptionPickerModal
            open={open}
            onClose={() => setOpen(false)}
            title={item.title}
            options={item.options!}
          />
        )}
        {hasContent && (
          <ContentModal
            open={open}
            onClose={() => setOpen(false)}
            title={item.title}
            content={item.content!}
          />
        )}
      </>
    );
  }

  // Link internal (diawali "/") dibuka di tab yang sama; link eksternal di tab baru.
  const isInternal = item.href.startsWith('/');

  return (
    <motion.a
      ref={ref as React.Ref<HTMLAnchorElement>}
      href={item.href}
      target={item.href !== '#' && !isInternal ? '_blank' : undefined}
      rel="noopener noreferrer"
      {...motionProps}
    >
      {inner}
    </motion.a>
  );
}

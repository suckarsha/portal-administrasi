'use client';

import { motion } from 'framer-motion';
import type { ElementType } from 'react';

/* Judul yang ter-reveal kata demi kata dari balik masker saat masuk layar.
   Observer dipasang pada kontainer (bukan kata yang tergeser), karena elemen
   yang ter-clip oleh overflow-hidden tidak pernah dianggap "terlihat" oleh
   IntersectionObserver. */
export default function RevealTitle({
  text,
  className,
  as: Tag = 'h2',
  delay = 0,
}: {
  text: string;
  className?: string;
  as?: ElementType;
  delay?: number;
}) {
  const words = text.split(' ');

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: delay } },
  };
  const word = {
    hidden: { y: '115%' },
    show: { y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-70px' }}
        variants={container}
        className="inline"
      >
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            <motion.span variants={word} className="inline-block">
              {w}
              {i < words.length - 1 ? ' ' : ''}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

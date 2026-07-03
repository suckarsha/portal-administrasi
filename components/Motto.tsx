'use client';

import { motion } from 'framer-motion';
import { profile } from '@/lib/data';
import RevealTitle from './RevealTitle';

export default function Motto() {
  return (
    <section className="relative z-20 mx-auto max-w-4xl px-6 py-24 text-center sm:py-32">
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto mb-8 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] font-display text-2xl font-bold text-cyan-300"
      >
        &ldquo;
      </motion.span>

      <RevealTitle
        as="blockquote"
        text={profile.motto}
        className="font-display text-2xl font-semibold leading-snug tracking-tight text-white/90 sm:text-4xl"
      />

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-8 text-sm tracking-wide text-white/45"
      >
        — {profile.name}
      </motion.p>
    </section>
  );
}

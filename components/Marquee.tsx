const topics = [
  'Fisika',
  'Biologi',
  'Kimia',
  'Bumi & Antariksa',
  'Metode Ilmiah',
  'Energi',
  'Ekologi',
  'Zat & Materi',
];

export default function Marquee() {
  const items = [...topics, ...topics]; // duplikasi agar loop mulus

  return (
    <div
      aria-hidden
      className="relative z-20 overflow-hidden border-y border-white/[0.06] py-5 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
    >
      <div className="flex w-max animate-[marquee_36s_linear_infinite] motion-reduce:animate-none">
        {items.map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-10 pr-10 text-xs font-medium uppercase tracking-[0.35em] text-white/30"
          >
            {t}
            <span className="h-1 w-1 rounded-full bg-cyan-400/60" />
          </span>
        ))}
      </div>
    </div>
  );
}

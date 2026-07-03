import type { SVGProps } from 'react';

const base = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function Icon({ name, ...props }: { name: string } & SVGProps<SVGSVGElement>) {
  const paths: Record<string, JSX.Element> = {
    calendar: (
      <>
        <rect x="3" y="4.5" width="18" height="16" rx="2" />
        <path d="M3 9h18M8 2.5v4M16 2.5v4M7.5 13h2M14.5 13h2M7.5 17h2M14.5 17h2" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    layers: (
      <>
        <path d="M12 3l9 5-9 5-9-5 9-5Z" />
        <path d="M3 12l9 5 9-5M3 16l9 5 9-5" />
      </>
    ),
    target: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1" />
      </>
    ),
    route: (
      <>
        <circle cx="6" cy="19" r="2.5" />
        <circle cx="18" cy="5" r="2.5" />
        <path d="M8.5 19H15a3.5 3.5 0 0 0 0-7H9a3.5 3.5 0 0 1 0-7h6.5" />
      </>
    ),
    book: (
      <>
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5V5.5Z" />
        <path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20v3H6.5A2.5 2.5 0 0 1 4 20.5Z" />
      </>
    ),
    chart: (
      <>
        <path d="M4 20V4M4 20h16" />
        <path d="M8 16v-4M12 16V8M16 16v-6" />
      </>
    ),
    check: (
      <>
        <rect x="3" y="4.5" width="18" height="16" rx="2" />
        <path d="M3 9h18M8 14l2.5 2.5L16 11" />
      </>
    ),
    media: (
      <>
        <rect x="2.5" y="4" width="19" height="13.5" rx="2" />
        <path d="M10 8.2v5.1l4.5-2.55L10 8.2Z" />
        <path d="M8 21h8M12 17.5V21" />
      </>
    ),
    flask: (
      <>
        <path d="M9.5 3h5M10.5 3v5.2L5.4 17.5A2.2 2.2 0 0 0 7.4 21h9.2a2.2 2.2 0 0 0 2-3.5L13.5 8.2V3" />
        <path d="M7.5 14.5h9" />
        <circle cx="10.5" cy="17.5" r="0.6" />
        <circle cx="13.8" cy="18.3" r="0.6" />
      </>
    ),
    journal: (
      <>
        <path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v18H6.5A1.5 1.5 0 0 1 5 19.5v-15Z" />
        <path d="M9 3v18" />
        <path d="M12.5 8h3.5M12.5 11.5h3.5" />
      </>
    ),
  };

  return (
    <svg {...base} {...props}>
      {paths[name] ?? paths.book}
    </svg>
  );
}

export function ArrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

export function DriveIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="m8.4 2 7.2 12.5h-4.8L3.6 2h4.8Z" fill="#FBBC05" />
      <path d="M3.6 22 8.4 14.5h12L15.6 22H3.6Z" fill="#4285F4" />
      <path d="M20.4 14.5 15.6 22l-2.4-4.2 4.8-8.3 2.4 5Z" fill="#34A853" />
    </svg>
  );
}

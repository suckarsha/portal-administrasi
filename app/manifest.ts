import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Portal Administrasi Pembelajaran IPA',
    short_name: 'Portal IPA',
    description:
      'Portal administrasi pembelajaran IPA SMP Negeri 3 Singaraja oleh I Kadek Sukarsa, S.Pd.',
    start_url: '/',
    display: 'standalone',
    background_color: '#05060f',
    theme_color: '#05060f',
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}

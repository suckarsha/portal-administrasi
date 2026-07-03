# Portal Administrasi IPA — I Kadek Sukarsa, S.Pd

Landing page premium dengan animasi 3D (Next.js + Three.js) untuk mengakses
berkas administrasi pembelajaran yang tersimpan di Google Drive.

**Guru:** I Kadek Sukarsa, S.Pd · **Sekolah:** SMP Negeri 3 Singaraja

## Menjalankan di komputer

```bash
npm install      # sekali saja, mengunduh dependensi
npm run dev      # buka http://localhost:3000
```

Untuk versi produksi:

```bash
npm run build
npm run start
```

## Cara mengganti link Google Drive

1. Buka file [`lib/data.ts`](lib/data.ts).
2. Pada tiap item, ganti `href: '#'` dengan link share Google Drive berkas tersebut.
   Contoh:
   ```ts
   href: 'https://drive.google.com/drive/folders/XXXXXXXX',
   ```
3. Pastikan setiap berkas/folder di Drive di-set **"Siapa saja yang memiliki link"**
   agar dapat dibuka pengunjung.

## Cara menambah dokumen baru

Tambahkan objek baru ke array `adminItems` di [`lib/data.ts`](lib/data.ts):

```ts
{
  id: 'modul',
  title: 'Modul Ajar',
  description: 'Deskripsi singkat dokumen.',
  icon: 'book',          // calendar | clock | layers | target | route | book | chart | check
  category: 'Pelaksanaan', // Perencanaan | Pelaksanaan | Penilaian
  href: 'https://drive.google.com/...',
},
```

## Publikasi online (gratis)

Cara termudah agar bisa diakses siapa saja: deploy ke **Vercel**.

1. Buat akun di https://vercel.com (login dengan Google).
2. Upload project ini ke GitHub, lalu "Import" di Vercel — selesai, dapat URL publik.

## Teknologi

- Next.js 14 (App Router)
- Three.js + React Three Fiber + Drei + Postprocessing (Bloom)
- Framer Motion (animasi UI)
- Tailwind CSS

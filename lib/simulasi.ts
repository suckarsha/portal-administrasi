export type Simulasi = {
  id: string;
  title: string;
  subbab: string;
  description: string;
  emoji: string;
  href: string;
};

export type BabSimulasi = {
  id: string;
  bab: string;
  judul: string;
  semester: 'Ganjil' | 'Genap';
  simulasi: Simulasi[];
};

// Tambahkan bab/simulasi baru di sini. File HTML simulasi diletakkan di
// public/simulasi/kelas7/<bab>/ agar bisa dibuka langsung dari browser (termasuk PID).
export const babList: BabSimulasi[] = [
  {
    id: 'bab1',
    bab: 'Bab 1',
    judul: 'Hakikat Ilmu Sains dan Metode Ilmiah',
    semester: 'Ganjil',
    simulasi: [
      {
        id: 'cabang-sains',
        title: 'Siapakah Aku? Cabang Ilmu Sains',
        subbab: 'Apa itu Sains?',
        description:
          'Game sortir: tebak fenomena alam dipelajari cabang sains yang mana. Bisa dimainkan hingga 4 kelompok.',
        emoji: '🔬',
        href: '/simulasi/kelas7/bab1/cabang-sains.html',
      },
      {
        id: 'laboratorium-virtual',
        title: 'Tur Laboratorium Virtual',
        subbab: 'Laboratorium IPA',
        description:
          'Kenali alat-alat lab beserta fungsinya, lalu uji dengan tantangan "ambilkan alat yang tepat".',
        emoji: '⚗️',
        href: '/simulasi/kelas7/bab1/laboratorium-virtual.html',
      },
      {
        id: 'keselamatan-lab',
        title: 'Detektif Keselamatan Lab',
        subbab: 'Laboratorium IPA',
        description:
          'Temukan 8 pelanggaran keselamatan di gambar laboratorium, lalu taklukkan kuis simbol bahaya.',
        emoji: '🕵️',
        href: '/simulasi/kelas7/bab1/keselamatan-lab.html',
      },
      {
        id: 'metode-ilmiah',
        title: 'Rancang Percobaanmu!',
        subbab: 'Merancang Percobaan',
        description:
          'Susun hipotesis, tentukan variabel bebas–terikat–kontrol, dan jalankan percobaan gula larut yang adil.',
        emoji: '🧪',
        href: '/simulasi/kelas7/bab1/metode-ilmiah.html',
      },
      {
        id: 'pengukuran',
        title: 'Ahli Pengukuran',
        subbab: 'Pengukuran',
        description:
          'Latihan membaca penggaris, gelas ukur, termometer, stopwatch, konversi satuan, dan besaran. Soal selalu diacak.',
        emoji: '📏',
        href: '/simulasi/kelas7/bab1/pengukuran.html',
      },
      {
        id: 'grafik-data',
        title: 'Dari Data ke Grafik',
        subbab: 'Pelaporan Hasil Percobaan',
        description:
          'Ubah tabel hasil percobaan menjadi grafik garis: pilih sumbu, letakkan titik data, lalu baca polanya.',
        emoji: '📈',
        href: '/simulasi/kelas7/bab1/grafik-data.html',
      },
    ],
  },
  {
    id: 'bab2',
    bab: 'Bab 2',
    judul: 'Zat dan Perubahannya',
    semester: 'Ganjil',
    simulasi: [
      {
        id: 'partikel-zat',
        title: 'Dunia Partikel',
        subbab: 'Wujud Zat & Partikel',
        description:
          'Lihat gerak partikel padat–cair–gas dengan pemanas, amati percobaan difusi, lalu uji lewat kuis sifat zat.',
        emoji: '🔵',
        href: '/simulasi/kelas7/bab2/partikel-zat.html',
      },
      {
        id: 'perubahan-wujud',
        title: 'Peta Perubahan Wujud',
        subbab: 'Perubahan Wujud & Kalor',
        description:
          'Lengkapi peta 6 perubahan wujud: sebutkan namanya dan tentukan kalor diserap atau dilepas, lalu tebak peristiwa sehari-hari.',
        emoji: '🔄',
        href: '/simulasi/kelas7/bab2/perubahan-wujud.html',
      },
      {
        id: 'massa-jenis',
        title: 'Lab Massa Jenis',
        subbab: 'Massa Jenis',
        description:
          'Timbang benda, ukur volume benda beraturan & tak beraturan, hitung ρ, lalu buktikan prediksi terapung/tenggelam.',
        emoji: '⚖️',
        href: '/simulasi/kelas7/bab2/massa-jenis.html',
      },
      {
        id: 'fisika-kimia',
        title: 'Fisika atau Kimia?',
        subbab: 'Perubahan Fisika & Kimia',
        description:
          'Game kelompok 2 babak: pilah perubahan fisika vs kimia, lalu kenali ciri-ciri perubahan kimia dari peristiwanya.',
        emoji: '⚡',
        href: '/simulasi/kelas7/bab2/fisika-kimia.html',
      },
      {
        id: 'proses-hujan',
        title: 'Perjalanan Hujan',
        subbab: 'Siklus Air',
        description:
          'Jelajahi siklus air beranimasi, urutkan tahapannya, dan hubungkan dengan perubahan wujud lewat kuis.',
        emoji: '🌧️',
        href: '/simulasi/kelas7/bab2/proses-hujan.html',
      },
    ],
  },
  // Bab berikutnya menyusul — biarkan array simulasi kosong agar tampil sebagai "Segera Hadir".
  {
    id: 'bab3',
    bab: 'Bab 3',
    judul: 'Suhu, Kalor, dan Pemuaian',
    semester: 'Ganjil',
    simulasi: [
      {
        id: 'termometer-skala',
        title: 'Ahli Termometer',
        subbab: 'Suhu & Pengukurannya',
        description:
          'Buktikan indra peraba tidak andal, kenali jenis-jenis termometer, lalu kuasai konversi skala C–R–F–K.',
        emoji: '🌡️',
        href: '/simulasi/kelas7/bab3/termometer-skala.html',
      },
      {
        id: 'pemuaian-bimetal',
        title: 'Lab Pemuaian & Bimetal',
        subbab: 'Pemuaian',
        description:
          'Bandingkan muai panjang tiga logam, hitung ΔL = α·L₀·ΔT, tekuk bimetal, dan bahas penerapan sehari-hari.',
        emoji: '📏',
        href: '/simulasi/kelas7/bab3/pemuaian-bimetal.html',
      },
      {
        id: 'kalor-qmct',
        title: 'Lab Kalor',
        subbab: 'Kalor & Perubahan Suhu',
        description:
          'Eksperimen dua panci beda massa, latihan Q = m·c·ΔT, dan jelajahi kurva pemanasan es sampai jadi uap.',
        emoji: '🔥',
        href: '/simulasi/kelas7/bab3/kalor-qmct.html',
      },
      {
        id: 'asas-black',
        title: 'Campur Air — Asas Black',
        subbab: 'Asas Black',
        description:
          'Atur massa & suhu air panas dan dingin, prediksi suhu campurannya, lalu buktikan kalor lepas = kalor terima.',
        emoji: '🥣',
        href: '/simulasi/kelas7/bab3/asas-black.html',
      },
      {
        id: 'perpindahan-kalor',
        title: 'Jejak Panas',
        subbab: 'Perpindahan Kalor',
        description:
          'Animasi konduksi, konveksi, dan radiasi; sortir 12 peristiwa sehari-hari; pilah konduktor vs isolator.',
        emoji: '♨️',
        href: '/simulasi/kelas7/bab3/perpindahan-kalor.html',
      },
    ],
  },
  {
    id: 'bab4',
    bab: 'Bab 4',
    judul: 'Gerak dan Gaya',
    semester: 'Ganjil',
    simulasi: [
      {
        id: 'gerak-relatif',
        title: 'Siapa yang Bergerak?',
        subbab: 'Gerak & Titik Acuan',
        description:
          'Ganti-ganti titik acuan pada adegan bus melaju dan lihat siapa yang "bergerak" — termasuk gerak semu dan relatif.',
        emoji: '🚌',
        href: '/simulasi/kelas7/bab4/gerak-relatif.html',
      },
      {
        id: 'glb-glbb',
        title: 'Lab Gerak Lurus',
        subbab: 'GLB & GLBB',
        description:
          'Jalankan mobil GLB, GLBB dipercepat, atau diperlambat — amati pita ketik dan grafik v-t yang tergambar langsung.',
        emoji: '🚗',
        href: '/simulasi/kelas7/bab4/glb-glbb.html',
      },
      {
        id: 'hitung-gerak',
        title: 'Kalkulator Gerak',
        subbab: 'Besaran Gerak',
        description:
          'Latihan mencari v, s, t, percepatan, dan konversi km/jam ↔ m/s dengan soal cerita yang selalu diacak.',
        emoji: '🧮',
        href: '/simulasi/kelas7/bab4/hitung-gerak.html',
      },
      {
        id: 'gaya-resultan',
        title: 'Adu Gaya!',
        subbab: 'Gaya & Resultan',
        description:
          'Tarik tambang interaktif untuk resultan gaya, sortir gaya sentuh vs tak sentuh, plus kuis gaya gesek & berat.',
        emoji: '💪',
        href: '/simulasi/kelas7/bab4/gaya-resultan.html',
      },
      {
        id: 'hukum-newton',
        title: 'Tantangan Newton',
        subbab: 'Hukum Newton',
        description:
          'Demo kelembaman, F = m·a, dan aksi-reaksi; tebak "hukum berapa?" dari 12 peristiwa; latihan hitung F = m·a.',
        emoji: '🍎',
        href: '/simulasi/kelas7/bab4/hukum-newton.html',
      },
    ],
  },
];

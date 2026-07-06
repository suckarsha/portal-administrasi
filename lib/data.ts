export type AdminOption = {
  label: string;
  sublabel?: string;
  href: string;
};

export type ContentStep = { title: string; text: string };

export type ContentSection = {
  title: string;
  paragraphs?: string[];
  steps?: ContentStep[];
};

export type DocContent = {
  badge?: string;
  sections: ContentSection[];
};

export type AdminItem = {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  // Jika diisi, klik kartu memunculkan popup pilihan (bukan langsung membuka satu link)
  options?: AdminOption[];
  // Jika diisi, klik kartu memunculkan popup berisi konten (bukan link/PDF)
  content?: DocContent;
};

// Tempel link Google Drive pada `href`, atau pada tiap `options[].href` untuk yang berpopup.
export const adminItems: AdminItem[] = [
  {
    id: 'kaldik',
    title: 'Kalender Pendidikan',
    description: 'Acuan hari efektif, libur, dan agenda sekolah sepanjang tahun ajaran.',
    icon: 'calendar',
    href: '#',
    options: [
      {
        label: 'Semester Ganjil',
        href: 'https://drive.google.com/drive/folders/1G8x0Z4Y19ADbO5GCK5xbNrA0BxdKIu5w?usp=sharing',
      },
      {
        label: 'Semester Genap',
        href: 'https://drive.google.com/drive/folders/1MqzVu9ELV98SAInbLbAlZzV4qGo0Gwsa?usp=sharing',
      },
    ],
  },
  {
    id: 'jadwal',
    title: 'Jadwal Mengajar',
    description: 'Distribusi jam mengajar mata pelajaran IPA per kelas dan hari.',
    icon: 'clock',
    href: '#',
    options: [
      {
        label: 'Semester Ganjil',
        href: '#', // TODO: isi link Drive jadwal semester ganjil
      },
      {
        label: 'Semester Genap',
        href: '#', // TODO: isi link Drive jadwal semester genap
      },
    ],
  },
  {
    id: 'cp',
    title: 'CP',
    description: 'Kompetensi yang harus dicapai peserta didik pada setiap fase.',
    icon: 'target',
    href: '#',
    content: {
      badge: 'Fase D',
      sections: [
        {
          title: 'Pemahaman IPA',
          paragraphs: [
            'Pada akhir fase D, peserta didik mampu melakukan klasifikasi makhluk hidup dan benda berdasarkan karakteristik yang diamati, mengidentifikasi sifat dan karakteristik zat, membedakan perubahan fisik dan kimia serta memisahkan campuran sederhana.',
            'Peserta didik dapat mendeskripsikan atom dan senyawa sebagai unit terkecil penyusun materi serta sel sebagai unit terkecil penyusun makhluk hidup, mengidentifikasi sistem organisasi kehidupan serta melakukan analisis untuk menemukan keterkaitan sistem organ dengan fungsinya serta kelainan atau gangguan yang muncul pada sistem organ tertentu (sistem pencernaan, sistem peredaran darah, sistem pernafasan dan sistem reproduksi). Peserta didik mengidentifikasi interaksi antar makhluk hidup dan lingkungannya, serta dapat merancang upaya-upaya mencegah dan mengatasi pencemaran dan perubahan iklim. Peserta didik mengidentifikasi pewarisan sifat dan penerapan bioteknologi dalam kehidupan sehari-hari.',
            'Peserta didik mampu melakukan pengukuran terhadap aspek fisis yang mereka temui dan memanfaatkan ragam gerak dan gaya (force), memahami hubungan konsep usaha dan energi, mengukur besaran suhu yang diakibatkan oleh energi kalor yang diberikan, sekaligus dapat membedakan isolator dan konduktor kalor.',
            'Peserta didik memahami gerak, gaya dan tekanan, termasuk pesawat sederhana. Peserta didik memahami getaran dan gelombang, pemantulan dan pembiasan cahaya termasuk alat-alat optik sederhana yang sering dimanfaatkan dalam kehidupan sehari-hari.',
            'Peserta didik dapat membuat rangkaian listrik sederhana, memahami gejala kemagnetan dan kelistrikan untuk menyelesaikan tantangan atau masalah yang dihadapi dalam kehidupan sehari-hari.',
            'Peserta didik mengelaborasikan pemahamannya tentang posisi relatif bumi-bulan-matahari dalam sistem tata surya dan memahami struktur lapisan bumi untuk menjelaskan fenomena alam yang terjadi dalam rangka mitigasi bencana.',
            'Peserta didik mengenal pH sebagai ukuran sifat keasaman suatu zat serta menggunakannya untuk mengelompokkan materi (asam-basa berdasarkan pH-nya). Dengan pemahaman ini peserta didik mengenali sifat fisika dan kimia tanah serta hubungannya dengan organisme serta pelestarian lingkungan.',
            'Peserta didik memiliki keteguhan dalam mengambil keputusan yang benar untuk menghindari zat aditif dan adiktif yang membahayakan dirinya dan lingkungan.',
          ],
        },
        {
          title: 'Keterampilan Proses',
          steps: [
            {
              title: 'Mengamati',
              text: 'Menggunakan berbagai alat bantu dalam melakukan pengukuran dan pengamatan. Memperhatikan detail yang relevan dari objek yang diamati.',
            },
            {
              title: 'Mempertanyakan dan memprediksi',
              text: 'Secara mandiri, peserta didik dapat mengajukan pertanyaan lebih lanjut untuk memperjelas hasil pengamatan dan membuat prediksi tentang penyelidikan ilmiah.',
            },
            {
              title: 'Merencanakan dan melakukan penyelidikan',
              text: 'Peserta didik merencanakan dan melakukan langkah-langkah operasional berdasarkan referensi yang benar untuk menjawab pertanyaan. Dalam penyelidikan, peserta didik menggunakan berbagai jenis variabel untuk membuktikan prediksi.',
            },
            {
              title: 'Memproses, menganalisis data dan informasi',
              text: 'Menyajikan data dalam bentuk tabel, grafik, dan model serta menjelaskan hasil pengamatan dan pola atau hubungan pada data secara digital atau non digital. Mengumpulkan data dari penyelidikan yang dilakukannya, menggunakan data sekunder, serta menggunakan pemahaman sains untuk mengidentifikasi hubungan dan menarik kesimpulan berdasarkan bukti ilmiah.',
            },
            {
              title: 'Mengevaluasi dan refleksi',
              text: 'Mengevaluasi kesimpulan melalui perbandingan dengan teori yang ada. Menunjukkan kelebihan dan kekurangan proses penyelidikan dan efeknya pada data. Menunjukkan permasalahan pada metodologi.',
            },
            {
              title: 'Mengomunikasikan hasil',
              text: 'Mengomunikasikan hasil penyelidikan secara utuh yang ditunjang dengan argumen, bahasa serta konvensi sains yang sesuai konteks penyelidikan. Menunjukkan pola berpikir sistematis sesuai format yang ditentukan.',
            },
          ],
        },
      ],
    },
  },
  {
    id: 'atp',
    title: 'ATP',
    description: 'Urutan tujuan pembelajaran yang sistematis dan berkesinambungan.',
    icon: 'route',
    href: '#',
    options: [
      {
        label: 'Semester Ganjil',
        href: 'https://drive.google.com/drive/folders/19dzzunlWIz4v0MhCll_OdSpXsn9NLABT?usp=drive_link',
      },
      {
        label: 'Semester Genap',
        href: 'https://drive.google.com/drive/folders/1lo7Q3WvMCTAj3AEJ-b30Fl4T3TakKxl7?usp=drive_link',
      },
    ],
  },
  {
    id: 'prota-promes',
    title: 'Prota & Promes',
    description: 'Program Tahunan dan Program Semester: alokasi waktu dan materi pembelajaran.',
    icon: 'layers',
    href: 'https://drive.google.com/drive/folders/1_q1lbPZbLddS6kED5FxURcaZO4NDeSFT?usp=sharing',
  },
  {
    id: 'rpm',
    title: 'RPM',
    description: 'Skenario kegiatan belajar mengajar yang siap digunakan di kelas.',
    icon: 'book',
    href: '#',
    options: [
      {
        label: 'Semester Ganjil',
        href: 'https://drive.google.com/drive/folders/146EnltASPWg3KlFiRPOiEY9ZBJ-Y4kKE?usp=drive_link',
      },
      {
        label: 'Semester Genap',
        href: 'https://drive.google.com/drive/folders/1bN4_Snxh-dCrfEsSjMcY_Ho2spLIfkP0?usp=drive_link',
      },
    ],
  },
  {
    id: 'media',
    title: 'Media Pembelajaran',
    description: 'Kumpulan media, bahan tayang, dan sumber belajar penunjang pembelajaran IPA.',
    icon: 'media',
    href: '#',
    options: [
      {
        label: 'Semester Ganjil',
        href: 'https://drive.google.com/drive/folders/1yzUzlIL3BOWCWgeS4G77bXiLnj87mPIr?usp=drive_link',
      },
      {
        label: 'Semester Genap',
        href: 'https://drive.google.com/drive/folders/1NuV0Nv1t0A9VCFsFsGw-8dwCdMILxS4O?usp=drive_link',
      },
    ],
  },
  {
    id: 'simulasi',
    title: 'Simulasi IPA',
    description: 'Simulasi dan laboratorium virtual interaktif untuk memperkuat konsep IPA.',
    icon: 'flask',
    href: '/simulasi-ipa',
  },
  {
    id: 'jurnal',
    title: 'Jurnal Mengajar',
    description: 'Catatan harian pelaksanaan pembelajaran di setiap kelas dan pertemuan.',
    icon: 'journal',
    href: '#',
  },
  {
    id: 'nilai',
    title: 'Daftar Nilai Siswa',
    description: 'Rekap hasil asesmen formatif dan sumatif setiap peserta didik.',
    icon: 'chart',
    href: '#',
    options: [
      {
        label: 'Semester Ganjil',
        href: 'https://drive.google.com/drive/folders/1ntPU3riDCZIwE0-0xAsxGLlQ30eJ4rON?usp=drive_link',
      },
      {
        label: 'Semester Genap',
        href: 'https://drive.google.com/drive/folders/1v8ZImE7B8KKYMGGVE2OPDmOO8CPLH3kS?usp=drive_link',
      },
    ],
  },
  {
    id: 'hadir',
    title: 'Daftar Hadir Siswa',
    description: 'Catatan kehadiran peserta didik untuk monitoring keaktifan.',
    icon: 'check',
    href: '#',
    options: [
      {
        label: 'Semester Ganjil',
        href: 'https://drive.google.com/drive/folders/1bZQ6_fZ-W-d_IXcnr6OcVfA2382leirK?usp=drive_link',
      },
      {
        label: 'Semester Genap',
        href: 'https://drive.google.com/drive/folders/1D6hzzp3Drx4Xt7sFvS14XW5iL_cpxCrl?usp=drive_link',
      },
    ],
  },
];

export const profile = {
  name: 'I Kadek Sukarsa, S.Pd',
  role: 'Guru IPA',
  school: 'SMP Negeri 3 Singaraja',
  tagline: 'Pusat Administrasi Pembelajaran',
  bio: 'Guru IPA di SMP Negeri 3 Singaraja yang berkomitmen menghadirkan pembelajaran sains yang bermakna. Seluruh perangkat administrasi disusun rapi dan terdokumentasi agar mudah diakses, ditinjau, dan dikembangkan setiap tahun ajaran.',
  // WhatsApp pakai format internasional tanpa "+" atau "0" di depan.
  email: 'suckarsha@gmail.com',
  whatsapp: '6281936322609',
  motto:
    'Mengajar bukan sekadar menyampaikan materi, melainkan menyalakan rasa ingin tahu.',
};

// Angka statistik bersifat contoh — silakan sesuaikan.
export const stats: { value: number; suffix: string; label: string }[] = [
  { value: adminItems.length, suffix: '', label: 'Dokumen Administrasi' },
  { value: 6, suffix: '', label: 'Kelas Diampu' },
  { value: 4, suffix: '', label: 'Tahun Mengajar' },
  { value: 100, suffix: '%', label: 'Tersimpan di Drive' },
];

<template>
  <div class="min-h-screen bg-[#FFF9F0] dark:bg-[#0c0e14] pt-24 pb-16 transition-colors duration-300">
    <div class="max-w-4xl mx-auto px-6 sm:px-8 text-gray-800 dark:text-gray-300">
      <!-- Back Link -->
      <router-link
        to="/"
        class="inline-flex items-center gap-2 mb-8 text-sm font-semibold text-primary hover:underline"
      >
        <span>&larr; Kembali ke Beranda</span>
      </router-link>

      <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight uppercase">
        Kebijakan Privasi Penggunaan Platform E-Catalog UMKM
      </h1>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-8 border-b border-gray-200 dark:border-white/10 pb-4">
        Tanggal Berlaku: 2 Juni 2026 | Pembaruan Terakhir: 2 Juni 2026
      </p>

      <div class="space-y-8 text-sm sm:text-base leading-relaxed">
        <p>
          Kebijakan Privasi ini (selanjutnya disebut sebagai "Kebijakan") menjelaskan bagaimana pengelola platform E-Catalog UMKM Rukun Tetangga (selanjutnya disebut "Pengelola") mengumpulkan, menyimpan, menggunakan, dan melindungi data serta informasi milik Pengguna saat mengakses dan menggunakan layanan di website direktori ini. Pengelola berkomitmen untuk menghormati dan melindungi privasi warga serta seluruh pemilik usaha sesuai dengan ketentuan hukum yang berlaku di Republik Indonesia.
        </p>

        <div>
          <h2 class="text-lg font-bold text-gray-950 dark:text-white mb-3">PASAL 1 - PENGUMPULAN DATA DAN METODE PENYIMPANAN LOKAL</h2>
          <p class="mb-3">
            Platform E-Catalog UMKM ini dirancang untuk dapat diakses oleh publik tanpa mewajibkan pendaftaran akun bagi pengunjung umum (non-admin).
          </p>
          <ul class="list-disc pl-6 space-y-2">
            <li><strong>Data UMKM</strong>: Data profil usaha (mencakup nama pemilik, kontak komunikasi, alamat fisik, detail produk, foto, dan status fasilitas) dikumpulkan secara sukarela dari pemilik usaha dan dimasukkan secara manual oleh Pengelola berdasarkan persetujuan lisan maupun tertulis dari pemilik usaha yang bersangkutan.</li>
            <li><strong>Penyimpanan Browser Lokal (Local Storage)</strong>: Website ini memanfaatkan teknologi penyimpanan browser lokal (seperti <em>localStorage</em> dan <em>sessionStorage</em>) untuk menyimpan data teknis sesi login administrator, preferensi tema tampilan (mode gelap/terang), dan riwayat pengiriman laporan warga guna menghindari spam serta menjaga keandalan sistem.</li>
            <li>Pengelola tidak merekam atau mengumpulkan data pribadi sensitif milik pengunjung umum seperti Nomor Induk Kependudukan (NIK), informasi keuangan pribadi, atau dokumen kependudukan lainnya.</li>
          </ul>
        </div>

        <div>
          <h2 class="text-lg font-bold text-gray-950 dark:text-white mb-3">PASAL 2 - PENGGUNAAN ALAT ANALITIK PIHAK KETIGA (COOKIES)</h2>
          <p class="mb-3">
            Dalam rangka memantau keandalan sistem dan menganalisis statistik kunjungan warga secara berkala, platform ini menggunakan instrumen analitik pihak ketiga.
          </p>
          <ul class="list-disc pl-6 space-y-2">
            <li>Platform ini mengintegrasikan alat analitik pihak ketiga (seperti Google Analytics / tracking cookies) yang bekerja secara kolektif dan anonim untuk mencatat data log kunjungan, jenis perangkat yang digunakan, peramban (browser), serta durasi navigasi di halaman web.</li>
            <li>Informasi yang dikumpulkan melalui instrumen analitik ini tidak digunakan untuk mengidentifikasi identitas pribadi Pengguna secara spesifik, melainkan murni untuk evaluasi kinerja operasional dan pengembangan platform ke depan.</li>
            <li>Pengguna dapat mengatur preferensi browser masing-masing untuk menolak atau memblokir cookies pelacakan pihak ketiga tanpa membatasi akses navigasi utama pada direktori ini.</li>
          </ul>
        </div>

        <div>
          <h2 class="text-lg font-bold text-gray-950 dark:text-white mb-3">PASAL 3 - PENGGUNAAN DAN PENYEBARLUASAN DATA</h2>
          <p class="mb-3">
            Pengelola membatasi penggunaan data yang terkumpul hanya untuk kepentingan promosi ekonomi lokal warga.
          </p>
          <ul class="list-disc pl-6 space-y-2">
            <li>Data kontak usaha (telepon, WhatsApp, email, dan akun media sosial) dipublikasikan secara sadar demi mempermudah warga atau publik menghubungi pemilik UMKM secara langsung untuk keperluan transaksi jual beli.</li>
            <li>Data ulasan, saran, atau laporan kesalahan informasi yang dikirimkan oleh Pengguna melalui fitur pelaporan akan digunakan murni oleh Pengelola sebagai bahan validasi internal untuk memperbarui informasi direktori usaha.</li>
            <li>Pengelola menjamin tidak akan menyebarluaskan, memperjualbelikan, atau menyerahkan informasi kontak pemilik usaha maupun data laporan warga kepada pihak ketiga untuk kepentingan komersial di luar wilayah Rukun Tetangga (RT).</li>
          </ul>
        </div>

        <div>
          <h2 class="text-lg font-bold text-gray-950 dark:text-white mb-3">PASAL 4 - HAK PEMILIK DATA DAN PENGHAPUSAN INFORMASI</h2>
          <p class="mb-3">
            Setiap warga atau pemilik usaha yang terdaftar di dalam platform ini memiliki hak penuh atas data usaha mereka secara berdaulat (Right to be Forgotten).
          </p>
          <ul class="list-disc pl-6 space-y-2">
            <li>Pemilik usaha berhak mengajukan koreksi atas kesalahan penulisan data, mengajukan pembaruan harga produk, mengubah gambar promosi, maupun memperbarui status fasilitas yang tersedia.</li>
            <li>Pemilik usaha berhak untuk meminta penarikan publikasi data usaha mereka secara permanen dari sistem katalog online ini kapan saja.</li>
            <li>Segala bentuk permohonan koreksi, pembaruan, atau penghapusan data usaha dapat diajukan secara langsung dengan menghubungi <strong>WhatsApp Pengurus RT/RW</strong> setempat yang nomor resminya tertera pada bagian kontak pengelola platform ini.</li>
          </ul>
        </div>

        <div>
          <h2 class="text-lg font-bold text-gray-950 dark:text-white mb-3">PASAL 5 - PERUBAHAN KEBIJAKAN PRIVASI</h2>
          <p class="mb-3">
            Pengelola berhak melakukan penyesuaian atau pembaruan pada Kebijakan Privasi ini sewaktu-waktu seiring dengan perkembangan teknologi dan regulasi pelindungan data pribadi yang berlaku di Indonesia.
          </p>
          <ul class="list-disc pl-6 space-y-2">
            <li>Setiap perubahan yang terjadi akan dipublikasikan secara langsung pada halaman Kebijakan Privasi ini dengan memperbarui kolom "Pembaruan Terakhir".</li>
            <li>Pengguna disarankan untuk meninjau kebijakan ini secara berkala guna memahami bagaimana Pengelola menjaga privasi dan keamanan data warga di platform ini.</li>
          </ul>
        </div>

        <p class="pt-6 border-t border-gray-200 dark:border-white/10 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          Kebijakan Privasi ini diatur dan ditafsirkan berdasarkan hukum yang berlaku di Negara Kesatuan Republik Indonesia. Untuk pertanyaan, masukan, atau keluhan terkait dengan pelindungan data pribadi pada platform ini, silakan menghubungi langsung Pengurus Rukun Tetangga (RT) melalui saluran WhatsApp resmi pengurus.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Halaman Kebijakan Privasi formal untuk kepatuhan UU PDP
</script>

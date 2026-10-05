<template>
  <div class="min-h-screen bg-[#FFF9F0] dark:bg-[#0a0a0a] pt-24 pb-16 transition-colors duration-300">
    <div class="max-w-4xl mx-auto px-6 sm:px-8 text-gray-800 dark:text-gray-300">
      <!-- Back Link -->
      <router-link
        to="/"
        class="inline-flex items-center gap-2 mb-8 text-sm font-semibold text-primary hover:underline"
      >
        <span>&larr; Kembali ke Beranda</span>
      </router-link>

      <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight uppercase">
        Kebijakan Privasi Business Catalog Anggota BPC HIPMI Bantul
      </h1>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-8 border-b border-gray-200 dark:border-white/10 pb-4">
        Tanggal Berlaku: 5 Oktober 2026 | Pembaruan Terakhir: 5 Oktober 2026
      </p>

      <div class="space-y-8 text-sm sm:text-base leading-relaxed">
        <p>
          Kebijakan Privasi ini (selanjutnya disebut sebagai "Kebijakan") menjelaskan bagaimana Bidang Organisasi, Keanggotaan, dan Kaderisasi (OKK) Badan Pengurus Cabang Himpunan Pengusaha Muda Indonesia Kabupaten Bantul (selanjutnya disebut "BPC HIPMI Bantul" atau "Pengelola") mengumpulkan, menyimpan, menggunakan, dan melindungi data pada Business Catalog Anggota BPC HIPMI Bantul (selanjutnya disebut "Platform"). Pengelola berkomitmen menghormati privasi anggota dan pengunjung Platform sesuai dengan ketentuan hukum pelindungan data pribadi yang berlaku di Republik Indonesia, serta AD/ART dan Peraturan Organisasi HIPMI.
        </p>

        <div>
          <h2 class="text-lg font-bold text-gray-950 dark:text-white mb-3">PASAL 1 - PENGENDALI DATA DAN ARSITEKTUR SISTEM</h2>
          <p class="mb-3">
            Platform ini dibangun menggunakan kerangka kerja antarmuka Vue.js yang berjalan di sisi peramban (client-side), dihosting pada layanan Vercel, dan menyimpan data pada basis data Firebase Firestore milik Google. Pemahaman mengenai arsitektur ini relevan bagi Pengguna karena memengaruhi di mana dan bagaimana data diproses.
          </p>
          <ul class="list-disc pl-6 space-y-2">
            <li><strong>Pengendali Data</strong>: Bidang OKK BPC HIPMI Bantul bertindak sebagai pengendali data untuk seluruh data usaha dan akun pemilik yang dikelola melalui Platform ini.</li>
            <li><strong>Vercel (Hosting &amp; Edge Network)</strong>: Platform ditayangkan melalui infrastruktur Vercel, yang secara teknis mencatat metadata permintaan jaringan standar (seperti alamat IP, jenis peramban, dan waktu akses) untuk keperluan pengiriman konten, keamanan, dan pemantauan performa. Pencatatan ini dikelola di bawah kebijakan privasi Vercel sendiri sebagai penyedia infrastruktur.</li>
            <li><strong>Firebase Firestore (Basis Data)</strong>: Seluruh data usaha, data akun pemilik, dan data laporan pengguna disimpan secara real-time pada Firebase Firestore, layanan basis data berbasis cloud milik Google, yang tunduk pada ketentuan keamanan infrastruktur Google Cloud.</li>
          </ul>
        </div>

        <div>
          <h2 class="text-lg font-bold text-gray-950 dark:text-white mb-3">PASAL 2 - DATA YANG DIKUMPULKAN DAN DISIMPAN</h2>
          <p class="mb-3">
            Platform ini dapat diakses publik untuk menelusuri katalog tanpa perlu membuat akun. Data berikut dikumpulkan dan disimpan pada Firebase Firestore untuk keperluan operasional Sistem.
          </p>
          <ul class="list-disc pl-6 space-y-2">
            <li><strong>Data Usaha Anggota</strong>: nama usaha, kategori, deskripsi, kontak (WhatsApp/telepon, media sosial), lokasi, jam operasional, fasilitas, dan foto, yang diinput oleh anggota pemilik usaha atau oleh pengurus Bidang OKK berdasarkan data yang diberikan anggota.</li>
            <li><strong>Data Akun Pemilik Usaha</strong>: nama, alamat surel (email), dan kata sandi dalam bentuk hash terenkripsi, yang digunakan untuk otentikasi pada dasbor pemilik usaha (owner dashboard).</li>
            <li><strong>Data Laporan Pengguna</strong>: isi laporan atau koreksi informasi yang dikirimkan melalui fitur pelaporan pada halaman detail usaha, digunakan semata untuk validasi dan pembaruan data internal oleh pengurus.</li>
            <li><strong>Penyimpanan Lokal Peramban (Local Storage)</strong>: Platform memanfaatkan penyimpanan lokal peramban milik Pengguna untuk menyimpan preferensi tampilan (mode gelap/terang) dan status sesi login yang sedang berjalan; data ini tersimpan hanya pada perangkat Pengguna dan tidak dikirimkan ke pihak mana pun.</li>
            <li>Pengelola tidak mengumpulkan data pribadi sensitif pengunjung umum seperti Nomor Induk Kependudukan (NIK), data keuangan pribadi, atau dokumen kependudukan.</li>
          </ul>
        </div>

        <div>
          <h2 class="text-lg font-bold text-gray-950 dark:text-white mb-3">PASAL 3 - KEAMANAN KATA SANDI DAN BATASAN PERLINDUNGAN DATA</h2>
          <p class="mb-3">
            Pengelola menerapkan langkah teknis berikut untuk melindungi kredensial akun pada Platform.
          </p>
          <ul class="list-disc pl-6 space-y-2">
            <li>Kata sandi akun admin dan akun pemilik usaha tidak pernah disimpan dalam bentuk teks biasa (plaintext). Kata sandi diolah menjadi nilai hash satu arah (PBKDF2) sebelum disimpan pada basis data, sehingga tidak dapat dibalik menjadi kata sandi asli meskipun oleh Pengelola sendiri.</li>
            <li>Karena Platform ini belum mengimplementasikan Firebase Authentication dan otentikasi dilakukan secara mandiri di sisi aplikasi, Pengelola secara aktif meninjau dan memperketat aturan keamanan basis data (Firestore Security Rules) secara berkala sebagai bagian dari upaya perlindungan data yang berkelanjutan.</li>
            <li>Pengguna disarankan untuk tidak menggunakan kata sandi yang sama dengan akun penting lain, dan segera melaporkan kepada Bidang OKK apabila mencurigai adanya akses tidak sah.</li>
          </ul>
        </div>

        <div>
          <h2 class="text-lg font-bold text-gray-950 dark:text-white mb-3">PASAL 4 - PENGGUNAAN DAN PENYEBARLUASAN DATA</h2>
          <p class="mb-3">
            Pengelola membatasi penggunaan data yang terkumpul hanya untuk kepentingan keanggotaan dan sinergi ekonomi antaranggota BPC HIPMI Bantul.
          </p>
          <ul class="list-disc pl-6 space-y-2">
            <li>Data kontak usaha dipublikasikan secara sadar atas persetujuan anggota pemilik usaha, untuk mempermudah sesama anggota maupun publik menghubungi langsung guna keperluan bisnis dan kolaborasi.</li>
            <li>Data laporan atau masukan dari Pengguna digunakan murni sebagai bahan validasi internal oleh pengurus Bidang OKK untuk memperbarui informasi direktori.</li>
            <li>Pengelola tidak menyebarluaskan, memperjualbelikan, atau menyerahkan data kontak maupun data akun kepada pihak ketiga di luar keperluan operasional Platform, kecuali diwajibkan oleh ketentuan hukum yang berlaku atau atas permintaan resmi pengurus BPC/BPD/BPP HIPMI sehubungan dengan administrasi keanggotaan.</li>
          </ul>
        </div>

        <div>
          <h2 class="text-lg font-bold text-gray-950 dark:text-white mb-3">PASAL 5 - HAK PEMILIK DATA DAN PERMOHONAN PERUBAHAN</h2>
          <p class="mb-3">
            Setiap anggota yang unit usahanya tercantum pada Platform memiliki hak atas data usaha dan data akunnya sendiri.
          </p>
          <ul class="list-disc pl-6 space-y-2">
            <li>Anggota pemilik usaha dapat memperbarui sendiri data usaha, foto, dan status fasilitas melalui dasbor pemilik (owner dashboard), atau mengajukan koreksi kepada pengurus Bidang OKK.</li>
            <li>Anggota berhak mengajukan permintaan penghapusan data usaha maupun akunnya secara permanen dari Platform kapan saja.</li>
            <li>Permohonan koreksi, pembaruan, atau penghapusan data dapat diajukan dengan menghubungi Bidang OKK BPC HIPMI Bantul melalui kontak resmi yang tertera pada Platform.</li>
          </ul>
        </div>

        <div>
          <h2 class="text-lg font-bold text-gray-950 dark:text-white mb-3">PASAL 6 - PERUBAHAN KEBIJAKAN PRIVASI</h2>
          <p class="mb-3">
            Pengelola berhak menyesuaikan atau memperbarui Kebijakan Privasi ini sewaktu-waktu seiring perkembangan teknologi, perubahan layanan infrastruktur (Vercel, Firebase), maupun regulasi pelindungan data pribadi yang berlaku di Indonesia.
          </p>
          <ul class="list-disc pl-6 space-y-2">
            <li>Setiap perubahan dipublikasikan langsung pada halaman ini dengan memperbarui kolom "Pembaruan Terakhir".</li>
            <li>Pengguna disarankan meninjau Kebijakan ini secara berkala guna memahami bagaimana Pengelola menjaga privasi dan keamanan data pada Platform.</li>
          </ul>
        </div>

        <p class="pt-6 border-t border-gray-200 dark:border-white/10 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          Kebijakan Privasi ini diatur dan ditafsirkan berdasarkan hukum yang berlaku di Negara Kesatuan Republik Indonesia, selaras dengan AD/ART dan Peraturan Organisasi HIPMI. Untuk pertanyaan, masukan, atau keluhan terkait pelindungan data pribadi pada Platform ini, silakan menghubungi langsung Bidang Organisasi, Keanggotaan, dan Kaderisasi (OKK) BPC HIPMI Bantul melalui kontak resmi yang tertera.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Halaman Kebijakan Privasi - Business Catalog Anggota BPC HIPMI Bantul
</script>

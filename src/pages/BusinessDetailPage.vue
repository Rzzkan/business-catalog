<template>
  <div v-if="!business" class="min-h-screen flex items-center justify-center bg-[#FAE7CB]/30 dark:bg-[#0a0a0a] transition-colors duration-300">
    <div class="text-center px-6 py-16 animate-fade-in">
      <div class="w-24 h-24 mx-auto mb-6 rounded-full bg-white dark:bg-[#161a24] text-[#FFC94D] flex items-center justify-center shadow-sm border border-transparent dark:border-white/5">
        <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
        </svg>
      </div>
      <h1 class="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">UMKM Tidak Ditemukan</h1>
      <p class="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
        Maaf, usaha yang Anda cari tidak tersedia atau sudah dihapus.
      </p>
      <router-link
        to="/"
        class="inline-flex items-center gap-2 bg-[#FFC94D] hover:bg-[#e6b03a] text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l9-9 9 9M5 10v10h14V10" />
        </svg>
        Kembali ke Beranda
      </router-link>
    </div>
  </div>

  <div v-else class="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-300">
    <section class="relative h-[65vh] min-h-[420px] max-h-[600px] overflow-hidden">
      <img
        :src="business.foto.utama"
        :alt="business.namaUsaha"
        class="absolute inset-0 w-full h-full object-cover scale-105 transition-transform duration-[1200ms]"
        fetchpriority="high"
        decoding="async"
        @load="heroLoaded = true"
        :class="heroLoaded ? 'scale-100' : 'scale-110'"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"></div>

      <button
        @click="goBack"
        class="absolute top-24 left-6 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white hover:bg-white/25 transition-all duration-300 group"
      >
        <svg class="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <span class="text-sm font-medium">Kembali</span>
      </button>

      <button
        @click="openShareModal"
        class="absolute top-24 right-6 z-40 flex items-center justify-center w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white hover:bg-white/25 transition-all duration-300 group"
        aria-label="Bagikan usaha ini"
        title="Bagikan"
      >
        <svg class="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.684 10.742l5.263-2.632m0 7.78l-5.263-2.632M20 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-8-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm0 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      </button>

      <div class="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-10 lg:p-14">
        <div class="max-w-6xl mx-auto">
          <div class="flex flex-wrap gap-2.5 mb-4">
            <span
              class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg transition-all duration-300"
              :style="getCategoryStyle(business.kategori)"
            >
              <CategoryIcon :name="business.kategori" class="w-4 h-4" />
              {{ business.kategori }}
            </span>
            <span
              class="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg backdrop-blur-md text-white transition-all duration-300"
              :class="operationalStatus.status === 'closing_soon'
                ? 'bg-orange-500/90 dark:bg-orange-600/90'
                : (operationalStatus.isOpen ? 'bg-green-500/90 dark:bg-green-600/90' : 'bg-red-500/90 dark:bg-red-600/90')"
            >
              <span>{{ operationalStatus.status === 'closing_soon' ? 'Tutup Segera' : (operationalStatus.isOpen ? 'Buka' : 'Tutup') }}</span>
            </span>
          </div>
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-3 leading-tight drop-shadow-lg">
            {{ business.namaUsaha }}
          </h1>
          <p class="text-white/80 text-base md:text-lg max-w-3xl line-clamp-2">
            {{ business.deskripsi }}
          </p>
        </div>
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div class="lg:col-span-3 space-y-6">
          <article class="info-card bg-white dark:bg-[#161a24] p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 transition-all duration-300">
            <h2 class="section-heading flex items-center gap-2 text-xl font-bold text-gray-800 dark:text-white mb-6 transition-colors duration-300">
              <span class="heading-icon w-8 h-8 flex items-center justify-center rounded-lg bg-[#FFC94D]/10">
                <svg class="w-4 h-4 text-[#FFC94D]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </span>
              Tentang Usaha
            </h2>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">{{ business.deskripsi }}</p>
          </article>

          <article class="info-card bg-white dark:bg-[#161a24] border border-gray-100 dark:border-white/5 transition-all duration-300">
            <h2 class="section-heading text-gray-800 dark:text-white transition-colors duration-300">
              <span class="heading-icon bg-[#FA6781]/10">
                <svg class="w-4 h-4 text-[#FA6781]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7Z" />
                </svg>
              </span>
              Informasi Pemilik
            </h2>
            <div class="flex items-center gap-4">
              <div v-if="ownerAccount?.fotoProfil" class="w-14 h-14 rounded-full overflow-hidden shadow-md shrink-0">
                <img :src="ownerAccount.fotoProfil" :alt="`Foto profil ${displayedOwnerName}`" class="w-full h-full object-cover" />
              </div>
              <div v-else class="w-14 h-14 rounded-full bg-gradient-to-br from-[#FFC94D] to-[#18933C] flex items-center justify-center text-white text-xl font-bold shadow-md shrink-0">
                {{ displayedOwnerName.charAt(0) }}
              </div>
              <div>
                <p class="font-semibold text-gray-800 dark:text-white text-lg">{{ displayedOwnerName }}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">Pemilik Usaha</p>
              </div>
            </div>
          </article>

          <article class="info-card bg-white dark:bg-[#161a24] border border-gray-100 dark:border-white/5 transition-all duration-300">
            <h2 class="section-heading text-gray-800 dark:text-white transition-colors duration-300">
              <span class="heading-icon bg-[#FFC94D]/15">
                <svg class="w-4 h-4 text-[#FFC94D]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.7.6 2.5a2 2 0 0 1-.5 2.1L8 9.5a16 16 0 0 0 6.5 6.5l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.6.5 2.5.6a2 2 0 0 1 1.7 2Z" />
                </svg>
              </span>
              Kontak
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a href="#" @click.prevent="handleContact('tel', business.kontak.telepon)" class="contact-card bg-[#f9fafb] dark:bg-[#0d0f14] hover:bg-primary/5 dark:hover:bg-primary/10 border border-transparent dark:border-white/5 transition-colors duration-300 cursor-pointer">
                <span class="contact-icon bg-[#FFC94D]/10 text-[#FFC94D]">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.7.6 2.5a2 2 0 0 1-.5 2.1L8 9.5a16 16 0 0 0 6.5 6.5l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.6.5 2.5.6a2 2 0 0 1 1.7 2Z" />
                  </svg>
                </span>
                <span class="min-w-0">
                  <span class="contact-label text-gray-400 dark:text-gray-550 transition-colors duration-300">Telepon</span>
                  <span class="contact-value text-gray-800 dark:text-gray-100 transition-colors duration-300">{{ business.kontak.telepon }}</span>
                </span>
              </a>
              <a href="#" @click.prevent="handleContact('wa', business.kontak.whatsapp)" class="contact-card bg-[#f9fafb] dark:bg-[#0d0f14] hover:bg-green-500/10 border border-transparent dark:border-white/5 transition-colors duration-300 cursor-pointer">
                <span class="contact-icon bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5l1.5-3A7 7 0 1 1 9 16Z" />
                  </svg>
                </span>
                <span class="min-w-0">
                  <span class="contact-label text-gray-400 dark:text-gray-550 transition-colors duration-300">WhatsApp</span>
                  <span class="contact-value text-gray-800 dark:text-gray-100 transition-colors duration-300">{{ business.kontak.whatsapp }}</span>
                </span>
              </a>
              <a href="#" @click.prevent="handleContact('ig', business.kontak.instagram)" class="contact-card bg-[#f9fafb] dark:bg-[#0d0f14] hover:bg-pink-500/10 border border-transparent dark:border-white/5 transition-colors duration-300 cursor-pointer">
                <span class="contact-icon bg-pink-100 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="4" y="4" width="16" height="16" rx="4" />
                    <path d="M9 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0Z" />
                    <path d="M17.5 6.5h.01" />
                  </svg>
                </span>
                <span class="min-w-0">
                  <span class="contact-label text-gray-400 dark:text-gray-550 transition-colors duration-300">Instagram</span>
                  <span class="contact-value text-gray-800 dark:text-gray-100 transition-colors duration-300">{{ business.kontak.instagram }}</span>
                </span>
              </a>
              <a href="#" @click.prevent="handleContact('email', business.kontak.email)" class="contact-card bg-[#f9fafb] dark:bg-[#0d0f14] hover:bg-blue-500/10 border border-transparent dark:border-white/5 transition-colors duration-300 cursor-pointer">
                <span class="contact-icon bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 6 8 6 8-6" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16v12H4z" />
                  </svg>
                </span>
                <span class="min-w-0">
                  <span class="contact-label text-gray-400 dark:text-gray-550 transition-colors duration-300">Email</span>
                  <span class="contact-value text-gray-800 dark:text-gray-100 transition-colors duration-300">{{ business.kontak.email }}</span>
                </span>
              </a>
            </div>
          </article>

          <article class="info-card bg-white dark:bg-[#161a24] border border-gray-100 dark:border-white/5 transition-all duration-300">
            <h2 class="section-heading flex items-center justify-between gap-4 text-gray-800 dark:text-white transition-colors duration-300">
              <span class="flex items-center gap-2">
                <span class="heading-icon bg-[#FFC94D]/10">
                  <svg class="w-4 h-4 text-[#FFC94D]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </span>
                <span>Jam Operasional</span>
              </span>
              <span
                class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-sm"
                :class="operationalStatus.status === 'closing_soon'
                  ? 'bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400'
                  : (operationalStatus.isOpen
                      ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400'
                      : 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400')"
              >
                <span>{{ operationalStatus.status === 'closing_soon' ? 'Tutup Segera' : (operationalStatus.isOpen ? 'Buka Sekarang' : 'Tutup Sekarang') }}</span>
              </span>
            </h2>
            <div class="overflow-hidden rounded-xl border border-gray-100 dark:border-white/5">
              <table class="w-full">
                <tbody>
                  <tr
                    v-for="(jadwal, index) in business.jamOperasional"
                    :key="index"
                    class="border-b border-gray-50 dark:border-white/5 last:border-0 hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors"
                  >
                    <td class="px-4 py-3.5 text-sm font-medium text-gray-700 dark:text-gray-300">{{ jadwal.hari }}</td>
                    <td class="px-4 py-3.5 text-sm text-right">
                      <span
                        :class="jadwal.jam === 'Tutup'
                          ? 'text-[#FA6781] bg-[#FA6781]/10 px-3 py-1 rounded-full font-medium'
                          : 'text-[#FFC94D] bg-[#FFC94D]/10 px-3 py-1 rounded-full font-medium'"
                      >
                        {{ jadwal.jam }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>

          <article class="info-card bg-white dark:bg-[#161a24] border border-gray-100 dark:border-white/5 transition-all duration-300">
            <h2 class="section-heading text-gray-800 dark:text-white transition-colors duration-300">
              <span class="heading-icon bg-[#FFC94D]/15">
                <svg class="w-4 h-4 text-[#FFC94D]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.7.6 2.5a2 2 0 0 1-.5 2.1L8 9.5a16 16 0 0 0 6.5 6.5l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.6.5 2.5.6a2 2 0 0 1 1.7 2Z" />
                </svg>
              </span>
              Metode Pembayaran
            </h2>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="metode in business.metodePembayaran"
                :key="metode"
                class="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-[#FAE7CB]/50 dark:bg-[#FAE7CB]/10 text-gray-700 dark:text-gray-300 border border-[#FAE7CB] dark:border-white/5"
              >
                <svg class="w-3.5 h-3.5 text-[#FFC94D]" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0Z" clip-rule="evenodd" />
                </svg>
                {{ metode }}
              </span>
            </div>
          </article>

          <!-- Fasilitas (Status Fasilitas) -->
          <article v-if="business.fasilitas && business.fasilitas.length" class="info-card bg-white dark:bg-[#161a24] border border-gray-100 dark:border-white/5 transition-all duration-300">
            <h2 class="section-heading text-gray-800 dark:text-white transition-colors duration-300">
              <span class="heading-icon bg-[#FFC94D]/10">
                <svg class="w-4 h-4 text-[#FFC94D]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5m-4 0h4" />
                </svg>
              </span>
              Fasilitas Tersedia
            </h2>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div
                v-for="fasilitas in business.fasilitas"
                :key="typeof fasilitas === 'object' ? fasilitas.name : fasilitas"
                class="flex items-center gap-3 p-3.5 rounded-xl bg-gray-50/50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 text-gray-700 dark:text-gray-300 hover:bg-[#FFC94D]/[0.03] dark:hover:bg-[#FFC94D]/5 transition-all duration-300 group"
              >
                <div class="w-8 h-8 rounded-lg bg-[#FFC94D]/10 text-[#FFC94D] group-hover:bg-[#FFC94D] group-hover:text-white flex items-center justify-center transition-all duration-300 shrink-0">
                  <FacilityIcon
                    :name="typeof fasilitas === 'object' ? fasilitas.name : fasilitas"
                    :icon="typeof fasilitas === 'object' ? fasilitas.icon : ''"
                    class="w-4.5 h-4.5"
                  />
                </div>
                <span class="text-sm font-semibold leading-tight text-gray-800 dark:text-gray-200 group-hover:text-[#FFC94D] transition-colors">
                  {{ typeof fasilitas === 'object' ? fasilitas.name : fasilitas }}
                </span>
              </div>
            </div>
          </article>

          <!-- Produk / Menu (Hanya Tampil di Mobile) -->
          <article class="info-card lg:hidden bg-white dark:bg-[#161a24] border border-gray-100 dark:border-white/5 transition-all duration-300">
            <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
              <span class="heading-icon bg-[#FFC94D]/15">
                <svg class="w-4 h-4 text-[#FFC94D]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 0 0-8 0v4M5 9h14l1 12H4L5 9Z" />
                </svg>
              </span>
              Produk / Menu
              <span class="ml-auto text-xs font-medium text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-black/30 px-2.5 py-1 rounded-full">
                {{ business.produk.length }} item
              </span>
            </h2>

            <div class="space-y-3">
              <div
                v-for="(produk, index) in business.produk"
                :key="index"
                class="group p-4 rounded-xl border border-gray-100 dark:border-white/5 hover:border-[#FFC94D]/30 hover:bg-[#FFC94D]/[0.03] dark:hover:bg-[#FFC94D]/10 transition-all duration-300 cursor-default bg-white dark:bg-[#0d0f14]"
              >
                <div class="flex items-start justify-between gap-3 mb-1.5">
                  <h3 class="font-semibold text-gray-800 dark:text-white text-sm leading-snug group-hover:text-[#FFC94D] transition-colors">
                    {{ produk.nama }}
                  </h3>
                  <span class="shrink-0 text-sm font-bold text-[#FFC94D] bg-[#FFC94D]/10 dark:bg-[#FFC94D]/20 px-2.5 py-0.5 rounded-lg whitespace-nowrap">
                    Rp {{ formatPrice(produk.harga) }}
                  </span>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{{ produk.deskripsi }}</p>
              </div>
            </div>
          </article>

          <article class="info-card bg-white dark:bg-[#161a24] border border-gray-100 dark:border-white/5 transition-all duration-300">
            <h2 class="section-heading text-gray-800 dark:text-white transition-colors duration-300">
              <span class="heading-icon bg-[#FA6781]/10">
                <svg class="w-4 h-4 text-[#FA6781]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 10.5h.01" />
                </svg>
              </span>
              Alamat
            </h2>
            <div class="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-[#FAE7CB]/30 dark:from-[#FAE7CB]/10 to-transparent">
              <svg class="w-5 h-5 text-[#FA6781] mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 1 1 9.9 9.9L10 18.9l-4.95-4.95a7 7 0 0 1 0-9.9ZM10 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" clip-rule="evenodd" />
              </svg>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed">{{ business.alamat }}</p>
            </div>
            <a
              v-if="mapEmbedUrl"
              :href="mapRedirectUrl"
              target="_blank"
              rel="noopener noreferrer"
              :title="`Buka lokasi ${business.namaUsaha} di Google Maps`"
              class="group relative mt-4 block overflow-hidden rounded-2xl border border-gray-100 dark:border-white/5 bg-gray-100 dark:bg-[#161a24] cursor-pointer"
            >
              <iframe
                :src="mapEmbedUrl"
                :title="`Lokasi ${business.namaUsaha}`"
                class="w-full h-44 sm:h-52 border-0 pointer-events-none"
                style="pointer-events: none;"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                tabindex="-1"
                aria-hidden="true"
              ></iframe>
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200"></div>
              <span class="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-[#0a0a0a] text-[11px] sm:text-xs font-semibold text-gray-700 dark:text-white shadow-md group-hover:scale-105 transition-transform duration-200">
                <svg class="w-3.5 h-3.5 text-[#FA6781]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Buka di Google Maps
              </span>
            </a>
          </article>

          <!-- Laporkan Kesalahan / Tutup -->
          <article class="info-card bg-white dark:bg-[#161a24] border border-gray-100 dark:border-white/5 transition-all duration-300">
            <h2 class="section-heading text-gray-800 dark:text-white transition-colors duration-300">
              <span class="heading-icon bg-[#FA6781]/10">
                <svg class="w-4 h-4 text-[#FA6781]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3Z" />
                </svg>
              </span>
              Laporkan Informasi Usaha
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-5 leading-relaxed">
              Apakah Anda menemukan kesalahan penulisan data atau toko/usaha ini sudah tutup permanen? Silakan ajukan laporan ke Pengurus RT.
            </p>
            <div class="flex flex-wrap gap-3">
              <button
                @click="openReportModal('kesalahan_data')"
                :disabled="hasReported"
                class="px-4 py-2.5 rounded-xl text-sm font-semibold border border-[#FFC94D]/50 text-[#c28c00] dark:text-[#ffca4d] hover:bg-[#FFC94D]/10 dark:hover:bg-[#FFC94D]/5 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ hasReported ? 'Laporan Telah Dikirim' : 'Laporkan Kesalahan Data' }}
              </button>
              <button
                @click="openReportModal('toko_tutup')"
                :disabled="hasReported"
                class="px-4 py-2.5 rounded-xl text-sm font-semibold border border-[#FA6781]/50 text-[#FA6781] hover:bg-[#FA6781]/10 dark:hover:bg-[#FA6781]/5 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ hasReported ? 'Toko Dilaporkan Tutup' : 'Toko Sudah Tutup' }}
              </button>
            </div>
          </article>
        </div>

        <aside class="hidden lg:block lg:col-span-2">
          <div class="lg:sticky lg:top-24">
            <div class="bg-white dark:bg-[#161a24] rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-white/5 transition-colors duration-300">
              <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                <span class="heading-icon bg-[#FFC94D]/15">
                  <svg class="w-4 h-4 text-[#FFC94D]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 0 0-8 0v4M5 9h14l1 12H4L5 9Z" />
                  </svg>
                </span>
                Produk / Menu
                <span class="ml-auto text-xs font-medium text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-black/30 px-2.5 py-1 rounded-full">
                  {{ business.produk.length }} item
                </span>
              </h2>

              <div class="space-y-3">
                <div
                  v-for="(produk, index) in business.produk"
                  :key="index"
                  class="group p-4 rounded-xl border border-gray-100 dark:border-white/5 hover:border-[#FFC94D]/30 hover:bg-[#FFC94D]/[0.03] dark:hover:bg-[#FFC94D]/10 transition-all duration-300 cursor-default bg-white dark:bg-[#0d0f14]"
                >
                  <div class="flex items-start justify-between gap-3 mb-1.5">
                    <h3 class="font-semibold text-gray-800 dark:text-white text-sm leading-snug group-hover:text-[#FFC94D] transition-colors">
                      {{ produk.nama }}
                    </h3>
                    <span class="shrink-0 text-sm font-bold text-[#FFC94D] bg-[#FFC94D]/10 dark:bg-[#FFC94D]/20 px-2.5 py-0.5 rounded-lg whitespace-nowrap">
                      Rp {{ formatPrice(produk.harga) }}
                    </span>
                  </div>
                  <p class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{{ produk.deskripsi }}</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
      <div>
        <h2 class="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-3">
          <span class="w-10 h-10 rounded-xl bg-[#FA6781]/10 flex items-center justify-center">
            <svg class="w-5 h-5 text-[#FA6781]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.6-4.6a2 2 0 0 1 2.8 0L16 16m-2-2 1.6-1.6a2 2 0 0 1 2.8 0L20 14m-6-6h.01M6 20h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z" />
            </svg>
          </span>
          Galeri Foto
        </h2>
        <p class="text-gray-500 dark:text-gray-400 mb-8 ml-[52px]">Lihat suasana dan produk kami lebih dekat</p>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          <div
            v-for="(foto, index) in allPhotos"
            :key="index"
            :class="[
              'relative overflow-hidden rounded-2xl cursor-pointer group',
              index === 0 ? 'col-span-2 row-span-2' : '',
              index === 3 ? 'col-span-2 md:col-span-1' : ''
            ]"
            @click="openLightbox(index)"
          >
            <div :class="index === 0 ? 'aspect-square' : 'aspect-[4/3]'" class="w-full">
              <img
                :src="foto.url"
                :alt="foto.label"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
              <div class="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <div class="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                  <svg class="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0ZM10 7v6m3-3H7" />
                  </svg>
                </div>
              </div>
            </div>
            <span class="absolute bottom-2 left-2 text-xs font-medium text-white bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
              {{ foto.label }}
            </span>
          </div>
        </div>
      </div>

      <div v-if="recommendedBusiness.length" class="mt-16">
        <div class="flex items-center justify-between gap-4 mb-6">
          <div>
            <span class="inline-flex items-center gap-2 text-sm font-semibold text-[#FFC94D] bg-[#FFC94D]/10 rounded-full px-4 py-1.5 mb-3">
              <CategoryIcon :name="business.kategori" class="w-4 h-4" />
              Rekomendasi {{ business.kategori }}
            </span>
            <h2 class="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Tempat Serupa</h2>
          </div>
          <router-link
            :to="{ name: 'SearchResult', query: { q: business.kategori } }"
            class="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-[#FFC94D] hover:text-[#e6b03a] dark:text-[#FFC94D] dark:hover:text-[#e6b03a]"
          >
            Lihat kategori
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </router-link>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          <router-link
            v-for="item in recommendedBusiness"
            :key="item.id"
            :to="{ name: 'BusinessDetail', params: { id: item.id } }"
            class="group bg-white dark:bg-[#161a24] rounded-2xl overflow-hidden border border-gray-100 dark:border-white/5 shadow-sm dark:shadow-black/40 hover:shadow-xl hover:shadow-[#FFC94D]/10 hover:-translate-y-1 transition-all duration-300"
          >
            <div class="h-32 sm:h-40 overflow-hidden">
              <img
                :src="item.foto.utama"
                :alt="item.namaUsaha"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div class="p-3 sm:p-4">
              <p
                class="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold mb-1.5 sm:mb-2 transition-all duration-300"
                :style="getCategoryLightStyle(item.kategori)"
              >
                <CategoryIcon :name="item.kategori" class="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span class="hidden sm:inline">{{ item.kategori }}</span>
              </p>
              <h3 class="font-bold text-gray-800 dark:text-white text-sm sm:text-base group-hover:text-[#FFC94D] transition-colors line-clamp-1">
                {{ item.namaUsaha }}
              </h3>
              <p class="text-[10px] sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1 line-clamp-1">{{ getCity(item.alamat) }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <Teleport to="body">
      <Transition name="lightbox">
        <div
          v-if="lightboxOpen"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          @click.self="closeLightbox"
          @keydown.escape="closeLightbox"
          @keydown.left="prevPhoto"
          @keydown.right="nextPhoto"
          tabindex="0"
          ref="lightboxRef"
        >
          <button
            @click="closeLightbox"
            class="absolute top-5 right-5 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
            aria-label="Tutup galeri"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            @click="prevPhoto"
            class="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
            aria-label="Foto sebelumnya"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div class="max-w-5xl max-h-[85vh] px-4">
            <img
              :src="allPhotos[currentPhotoIndex]?.url"
              :alt="allPhotos[currentPhotoIndex]?.label"
              class="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              decoding="async"
            />
            <p class="text-center text-white/70 text-sm mt-3 font-medium">
              {{ allPhotos[currentPhotoIndex]?.label }}
              <span class="text-white/40 ml-2">{{ currentPhotoIndex + 1 }} / {{ allPhotos.length }}</span>
            </p>
          </div>

          <button
            @click="nextPhoto"
            class="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
            aria-label="Foto berikutnya"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </Transition>
    </Teleport>

    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-4"
    >
      <button
        v-if="showScrollTop"
        @click="scrollToTop"
        class="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[#FFC94D] text-white shadow-xl shadow-[#FFC94D]/25 flex items-center justify-center hover:bg-[#e6b03a] hover:-translate-y-1 active:scale-95 transition-all duration-300"
        aria-label="Kembali ke atas"
      >
        <svg class="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </transition>

    <!-- Report Modal -->
    <Teleport to="body">
      <Transition name="lightbox">
        <div
          v-if="reportModalOpen"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          @click.self="closeReportModal"
        >
          <div class="bg-white dark:bg-[#161a24] rounded-2xl w-full max-w-md p-6 shadow-2xl border border-gray-100 dark:border-white/5 animate-fade-in">
            <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-2">
              {{ reportType === 'toko_tutup' ? 'Laporkan Toko Sudah Tutup' : 'Laporkan Kesalahan Data' }}
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
              {{ reportType === 'toko_tutup'
                ? 'Apakah Anda yakin toko/usaha ini sudah tutup permanen atau tidak beroperasi lagi?'
                : 'Silakan jelaskan bagian data mana yang salah atau keliru agar dapat segera diperbaiki oleh Pengurus RT.' }}
            </p>
            
            <div v-if="reportType === 'kesalahan_data'" class="mb-4">
              <label class="block text-xs font-semibold text-gray-400 dark:text-gray-550 uppercase tracking-wider mb-2">Detail Kesalahan</label>
              <textarea
                v-model="reportDetail"
                rows="3"
                class="w-full px-3 py-2 border rounded-xl bg-transparent text-sm text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none resize-none transition-all duration-200"
                :class="wordCount > 200 ? 'border-[#FA6781] focus:border-[#FA6781]' : 'border-gray-200 dark:border-white/5 focus:border-[#FFC94D]'"
                placeholder="Contoh: Nomor WhatsApp sudah tidak aktif, alamat pindah ke..."
              ></textarea>
              <div class="flex justify-between items-center mt-1">
                <p v-if="wordCount > 200" class="text-xs text-[#FA6781]">Deskripsi tidak boleh melebihi 200 kata.</p>
                <p v-else class="text-xs text-gray-400 dark:text-gray-550"></p>
                <p class="text-xs font-semibold" :class="wordCount > 200 ? 'text-[#FA6781]' : 'text-gray-400 dark:text-gray-500'">
                  {{ wordCount }} / 200 kata
                </p>
              </div>
            </div>

            <div class="flex gap-3 justify-end mt-6">
              <button
                @click="closeReportModal"
                class="px-4 py-2 rounded-xl text-sm font-semibold border border-gray-200 dark:border-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-200 cursor-pointer"
              >
                Batal
              </button>
              <button
                @click="submitReport"
                :disabled="reportType === 'kesalahan_data' && (wordCount === 0 || wordCount > 200)"
                class="px-5 py-2.5 rounded-xl text-sm font-semibold bg-[#FA6781] hover:bg-[#e04d66] text-white shadow-lg shadow-[#FA6781]/25 active:scale-95 transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Kirim Laporan
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Share Modal -->
    <Teleport to="body">
      <Transition name="lightbox">
        <div
          v-if="shareModalOpen"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          @click.self="closeShareModal"
        >
          <div class="bg-white dark:bg-[#161a24] rounded-2xl w-full max-w-sm p-6 shadow-2xl border border-gray-100 dark:border-white/5 animate-fade-in relative">
            <button
              @click="closeShareModal"
              class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
              aria-label="Tutup modal"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-2">
              Bagikan Usaha Ini
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Bagikan detail usaha <strong>{{ business?.namaUsaha }}</strong> kepada teman atau keluarga Anda.
            </p>

            <!-- Share Buttons Grid -->
            <div class="grid grid-cols-3 gap-3 mb-6">
              <!-- WhatsApp -->
              <a
                :href="whatsappShareUrl"
                target="_blank"
                rel="noopener noreferrer"
                @click="closeShareModal"
                class="flex flex-col items-center justify-center p-3 rounded-xl border border-gray-100 dark:border-white/5 bg-[#25D366]/5 dark:bg-[#25D366]/10 hover:bg-[#25D366]/15 dark:hover:bg-[#25D366]/20 transition-all duration-200 group text-center"
              >
                <div class="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center mb-2 shadow-sm group-hover:scale-105 transition-transform">
                  <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <span class="text-xs font-semibold text-gray-700 dark:text-gray-300">WhatsApp</span>
              </a>

              <!-- Instagram -->
              <button
                @click="shareToInstagram"
                class="flex flex-col items-center justify-center p-3 rounded-xl border border-gray-100 dark:border-white/5 bg-[#E1306C]/5 dark:bg-[#E1306C]/10 hover:bg-[#E1306C]/15 dark:hover:bg-[#E1306C]/20 transition-all duration-200 group text-center cursor-pointer"
              >
                <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white flex items-center justify-center mb-2 shadow-sm group-hover:scale-105 transition-transform">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </div>
                <span class="text-xs font-semibold text-gray-700 dark:text-gray-300">Instagram</span>
              </button>

              <!-- Facebook -->
              <button
                @click="shareToFacebook"
                class="flex flex-col items-center justify-center p-3 rounded-xl border border-gray-100 dark:border-white/5 bg-[#1877F2]/5 dark:bg-[#1877F2]/10 hover:bg-[#1877F2]/15 dark:hover:bg-[#1877F2]/20 transition-all duration-200 group text-center cursor-pointer"
              >
                <div class="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center mb-2 shadow-sm group-hover:scale-105 transition-transform">
                  <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z" />
                  </svg>
                </div>
                <span class="text-xs font-semibold text-gray-700 dark:text-gray-300">Facebook</span>
              </button>

              <!-- X (Twitter) -->
              <a
                :href="xShareUrl"
                target="_blank"
                rel="noopener noreferrer"
                @click="closeShareModal"
                class="flex flex-col items-center justify-center p-3 rounded-xl border border-gray-100 dark:border-white/5 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 transition-all duration-200 group text-center"
              >
                <div class="w-10 h-10 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center mb-2 shadow-sm group-hover:scale-105 transition-transform">
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <span class="text-xs font-semibold text-gray-700 dark:text-gray-300">X (Twitter)</span>
              </a>

              <!-- Telegram -->
              <a
                :href="telegramShareUrl"
                target="_blank"
                rel="noopener noreferrer"
                @click="closeShareModal"
                class="flex flex-col items-center justify-center p-3 rounded-xl border border-gray-100 dark:border-white/5 bg-[#0088cc]/5 dark:bg-[#0088cc]/10 hover:bg-[#0088cc]/15 dark:hover:bg-[#0088cc]/20 transition-all duration-200 group text-center"
              >
                <div class="w-10 h-10 rounded-full bg-[#0088cc] text-white flex items-center justify-center mb-2 shadow-sm group-hover:scale-105 transition-transform">
                  <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-1-.65-.35-1 .22-1.6 1.5-1.55 2.75-2.92 2.75-2.92.05-.06.08-.28-.05-.39-.12-.1-.3-.07-.32-.07-.04.01-1.84 1.23-5.2 3.5-.49.34-.94.5-1.34.49-.44-.01-1.3-.25-1.93-.46-.78-.25-1.4-.39-1.35-.83.03-.23.35-.47.96-.71 3.76-1.63 6.27-2.7 7.54-3.21 3.59-1.47 4.33-1.72 4.82-1.73.1 0 .34.03.49.15.13.1.17.24.18.34z" />
                  </svg>
                </div>
                <span class="text-xs font-semibold text-gray-700 dark:text-gray-300">Telegram</span>
              </a>

              <!-- Copy Link -->
              <button
                @click="copyShareLink"
                class="flex flex-col items-center justify-center p-3 rounded-xl border border-gray-100 dark:border-white/5 bg-[#FFC94D]/5 dark:bg-[#FFC94D]/10 hover:bg-[#FFC94D]/15 dark:hover:bg-[#FFC94D]/20 transition-all duration-200 group text-center"
              >
                <div class="w-10 h-10 rounded-full bg-[#FFC94D] text-white flex items-center justify-center mb-2 shadow-sm group-hover:scale-105 transition-transform">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                  </svg>
                </div>
                <span class="text-xs font-semibold text-gray-700 dark:text-gray-300">Salin Link</span>
              </button>
            </div>

            <div class="text-center">
              <button
                @click="closeShareModal"
                class="w-full py-2.5 rounded-xl text-sm font-semibold border border-gray-200 dark:border-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-200 cursor-pointer"
              >
                Selesai
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Success Toast -->
    <Transition name="toast">
      <div
        v-if="toastOpen"
        class="fixed bottom-6 right-6 z-[60] bg-white dark:bg-[#161a24] border border-gray-100 dark:border-white/5 shadow-xl shadow-[#FFC94D]/10 dark:shadow-black/40 rounded-xl px-5 py-3.5 flex items-center gap-3"
      >
        <div class="w-8 h-8 rounded-full bg-[#FFC94D] text-white flex items-center justify-center">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="m5 13 4 4L19 7" />
          </svg>
        </div>
        <p class="text-sm font-semibold text-gray-800 dark:text-white">{{ toastMessage }}</p>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed, ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import CategoryIcon from '../components/CategoryIcon.vue'
import FacilityIcon from '../components/FacilityIcon.vue'
import { businessStore, getCategoryStyle, getCategoryLightStyle, checkOperationalStatus, sanitizeUrl } from '../data/businessData'
import { ownerStore } from '../data/ownerData'

const route = useRoute()
const router = useRouter()

const reportModalOpen = ref(false)
const reportType = ref('') // 'kesalahan_data' | 'toko_tutup'
const reportDetail = ref('')
const toastOpen = ref(false)
const hasReported = ref(false)

// Share Button & Modal State
const shareModalOpen = ref(false)
const toastMessage = ref('Laporan Anda telah terkirim ke Pengurus RT.')

const wordCount = computed(() => {
  if (!reportDetail.value) return 0
  return reportDetail.value.trim().split(/\s+/).filter(Boolean).length
})

const currentUrl = computed(() => window.location.href)

const whatsappShareUrl = computed(() => {
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(currentUrl.value)}`
})

const telegramShareUrl = computed(() => {
  return `https://t.me/share/url?url=${encodeURIComponent(currentUrl.value)}`
})

// facebookShareUrl removed in favor of direct message sharing

const xShareUrl = computed(() => {
  return `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl.value)}`
})

// LinkedIn removed as requested

function checkReportedStatus() {
  if (business.value) {
    hasReported.value = localStorage.getItem(`reported-${business.value.id}`) === 'true'
  } else {
    hasReported.value = false
  }
}

function openReportModal(type) {
  if (hasReported.value) return
  reportType.value = type
  reportDetail.value = ''
  reportModalOpen.value = true
}

function closeReportModal() {
  reportModalOpen.value = false
}

async function submitReport() {
  if (hasReported.value) return
  if (reportType.value === 'kesalahan_data' && (wordCount.value === 0 || wordCount.value > 200)) {
    return
  }
  
  const words = reportDetail.value.trim().split(/\s+/).filter(Boolean)
  const detailText = reportType.value === 'toko_tutup'
    ? 'Laporan toko tutup permanen.'
    : words.slice(0, 200).join(' ')

  await businessStore.addReport({
    businessId: business.value.id,
    namaUsaha: business.value.namaUsaha,
    tipe: reportType.value,
    detail: detailText
  })

  localStorage.setItem(`reported-${business.value.id}`, 'true')
  hasReported.value = true

  closeReportModal()
  showToast()
}

function showToast(msg) {
  if (msg) {
    toastMessage.value = msg
  } else {
    toastMessage.value = 'Laporan Anda telah terkirim ke Pengurus RT.'
  }
  toastOpen.value = true
  setTimeout(() => {
    toastOpen.value = false
  }, 3000)
}

function openShareModal() {
  shareModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

function closeShareModal() {
  shareModalOpen.value = false
  document.body.style.overflow = ''
}

function copyShareLink() {
  navigator.clipboard.writeText(currentUrl.value).then(() => {
    showToast('Tautan berhasil disalin!')
    closeShareModal()
  }).catch(err => {
    console.error('Gagal menyalin tautan: ', err)
  })
}

function shareToInstagram() {
  navigator.clipboard.writeText(currentUrl.value).then(() => {
    showToast('Tautan disalin! Membuka DM Instagram Anda...')
    closeShareModal()
    window.open('https://www.instagram.com/direct/inbox/', '_blank', 'noopener,noreferrer')
  }).catch(err => {
    console.error('Gagal menyalin tautan: ', err)
  })
}

function shareToFacebook() {
  const url = currentUrl.value
  const isLocalhost = url.includes('localhost') || url.includes('127.0.0.1')

  navigator.clipboard.writeText(url).then(() => {
    showToast('Tautan disalin! Membuka Messenger Anda...')
    closeShareModal()
    
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    if (isMobile) {
      window.open(`fb-messenger://share/?link=${encodeURIComponent(url)}`, '_blank', 'noopener,noreferrer')
    } else if (isLocalhost) {
      // Fallback for local development testing to avoid Facebook API verification error
      window.open('https://www.messenger.com/', '_blank', 'noopener,noreferrer')
    } else {
      // Official Facebook Messenger Send Dialog (works on live public whitelisted domains)
      window.open(`https://www.facebook.com/dialog/send?app_id=291494419162&link=${encodeURIComponent(url)}&redirect_uri=${encodeURIComponent(url)}`, '_blank', 'noopener,noreferrer')
    }
  }).catch(err => {
    console.error('Gagal menyalin tautan: ', err)
  })
}

const business = computed(() => businessStore.getById(route.params.id))

// The owner account linked to this business (if any) is the source of truth for the
// displayed name/photo, so editing it in one place (the owner dashboard or admin) stays
// in sync everywhere this business is shown.
const ownerAccount = computed(() => business.value ? ownerStore.getByBusinessId(business.value.id) : null)
const displayedOwnerName = computed(() => ownerAccount.value?.nama || business.value?.namaPemilik || '')
const operationalStatus = computed(() => {
  if (!business.value) return { isOpen: false, text: 'Tutup' }
  return checkOperationalStatus(business.value.jamOperasional)
})
const heroLoaded = ref(false)
const lightboxOpen = ref(false)
const currentPhotoIndex = ref(0)
const lightboxRef = ref(null)
const showScrollTop = ref(false)

const allPhotos = computed(() => {
  if (!business.value) return []

  const photos = []
  business.value.foto.tempat?.forEach((url, i) => {
    photos.push({ url, label: `Suasana Tempat ${i + 1}` })
  })
  business.value.foto.produk?.forEach((url, i) => {
    photos.push({ url, label: `Foto Produk ${i + 1}` })
  })
  if (business.value.foto.menu) {
    if (Array.isArray(business.value.foto.menu)) {
      business.value.foto.menu.forEach((url, i) => {
        if (url && url.trim()) {
          photos.push({ url, label: `Menu ${i + 1}` })
        }
      })
    } else if (typeof business.value.foto.menu === 'string' && business.value.foto.menu.trim()) {
      photos.push({ url: business.value.foto.menu, label: 'Menu' })
    }
  }

  return photos
})

const recommendedBusiness = computed(() => {
  if (!business.value) return []
  return businessStore
    .getByCategory(business.value.kategori)
    .filter(item => item.id !== business.value.id)
    .slice(0, 3)
})

const mapEmbedUrl = computed(() => {
  if (!business.value) return ''
  // Prefer an explicitly configured Google Maps link/embed/coordinates,
  // fall back to the plain text address so a mini map still shows.
  const source = (business.value.mapsEmbed || '').trim() || (business.value.alamat || '').trim()
  if (!source) return ''
  return normalizeMapEmbed(source)
})

const mapRedirectUrl = computed(() => {
  if (!business.value) return ''
  const source = (business.value.mapsEmbed || '').trim()

  // Exact coordinates (either typed directly or embedded in a Maps URL)
  const coordMatch = source.match(/(-?\d{1,2}\.\d+)\s*,\s*(-?\d{1,3}\.\d+)/)
  if (coordMatch) {
    return `https://www.google.com/maps/search/?api=1&query=${coordMatch[1]},${coordMatch[2]}`
  }

  // A query already resolved inside the normalized embed URL (?q=...)
  if (mapEmbedUrl.value) {
    try {
      const embedUrl = new URL(mapEmbedUrl.value)
      const q = embedUrl.searchParams.get('q')
      if (q) {
        return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`
      }
    } catch {
      // Not a parseable URL (e.g. a raw /maps/embed?pb=... iframe source) - fall through
    }
  }

  // Last resort: search Google Maps by business name + address
  const query = [business.value.namaUsaha, business.value.alamat].filter(Boolean).join(', ')
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
})

function formatPrice(price) {
  return new Intl.NumberFormat('id-ID').format(price)
}

function getCity(alamat) {
  const parts = alamat.split(',')
  return parts[parts.length - 1]?.trim() || alamat
}

function normalizeMapEmbed(value) {
  const input = (value || '').trim()
  if (!input) return ''

  const iframeSrc = input.match(/src=["']([^"']+)["']/i)?.[1]
  const raw = (iframeSrc || input).replace(/&amp;/g, '&')

  if (/^https:\/\/(www\.)?google\.[^/]+\/maps\/embed/i.test(raw) || /^https:\/\/maps\.google\.[^/]+\/maps/i.test(raw)) {
    return raw
  }

  // Extract coordinates from long URL path (e.g. /@latitude,longitude)
  const pathCoords = raw.match(/@(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)/)
  if (pathCoords) {
    return `https://www.google.com/maps?q=${pathCoords[1]},${pathCoords[2]}&output=embed`
  }

  const coords = raw.match(/(-?\d{1,2}\.\d+)\s*,\s*(-?\d{1,3}\.\d+)/)
  if (coords) {
    return `https://www.google.com/maps?q=${coords[1]},${coords[2]}&output=embed`
  }

  try {
    const url = new URL(raw)
    if (url.hostname.includes('google.')) {
      const query = url.searchParams.get('q') || url.searchParams.get('query')
      if (query) {
        return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`
      }
    }
  } catch {
    // Treat as query below
  }

  return `https://www.google.com/maps?q=${encodeURIComponent(raw)}&output=embed`
}

function handleScroll() {
  showScrollTop.value = window.scrollY > 500
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function goBack() {
  if (window.history.state && window.history.state.back) {
    router.back()
    return
  }

  router.push('/')
}

function handleContact(type, value) {
  if (!value) return
  let url = ''
  if (type === 'tel') {
    url = 'tel:' + value.replace(/\s+/g, '')
  } else if (type === 'wa') {
    url = 'https://wa.me/' + value.replace(/[^0-9]/g, '')
  } else if (type === 'ig') {
    url = 'https://instagram.com/' + value.replace('@', '').trim()
  } else if (type === 'email') {
    url = 'mailto:' + value.trim()
  }

  const sanitized = sanitizeUrl(url)
  if (!sanitized || sanitized === '#') return

  if (type === 'wa' || type === 'ig') {
    window.open(sanitized, '_blank', 'noopener,noreferrer')
  } else {
    window.location.href = sanitized
  }
}

function openLightbox(index) {
  currentPhotoIndex.value = index
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
  nextTick(() => {
    lightboxRef.value?.focus()
  })
}

function closeLightbox() {
  lightboxOpen.value = false
  document.body.style.overflow = ''
}

function nextPhoto() {
  if (!allPhotos.value.length) return
  currentPhotoIndex.value = (currentPhotoIndex.value + 1) % allPhotos.value.length
}

function prevPhoto() {
  if (!allPhotos.value.length) return
  currentPhotoIndex.value = (currentPhotoIndex.value - 1 + allPhotos.value.length) % allPhotos.value.length
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
})

watch(() => route.params.id, () => {
  checkReportedStatus()
  heroLoaded.value = false
  lightboxOpen.value = false
  document.body.style.overflow = ''
}, { immediate: true })
</script>

<style scoped>
.info-card {
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 1px 2px rgb(15 23 42 / 0.04);
}

@media (min-width: 768px) {
  .info-card {
    padding: 2rem;
  }
}

.section-heading {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1.25rem;
}

.heading-icon {
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.contact-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.75rem;
}

.contact-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.contact-label,
.contact-value {
  display: block;
}

.contact-label {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0;
  text-transform: uppercase;
}

.contact-value {
  font-size: 0.875rem;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.3s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

.lightbox-enter-active img {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.lightbox-enter-from img {
  transform: scale(0.9);
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.4s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>

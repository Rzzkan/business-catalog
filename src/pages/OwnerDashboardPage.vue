<template>
  <div class="min-h-screen bg-[#F7F5F0] dark:bg-[#0a0a0a] transition-colors duration-300">
    <header class="sticky top-0 z-30 bg-white dark:bg-[#11131a] border-b border-gray-100 dark:border-white/5">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        <router-link to="/" class="flex items-center gap-2.5 shrink-0">
          <div class="w-9 h-9 rounded-lg bg-[#FFC94D]/10 flex items-center justify-center p-1.5">
            <img src="/logo.svg" alt="Logo BPC HIPMI Bantul" class="w-full h-full object-contain" />
          </div>
          <div class="hidden sm:block leading-tight">
            <p class="font-extrabold text-gray-900 dark:text-white text-sm">BPC HIPMI<span class="text-[#FFC94D]">Bantul</span></p>
            <p class="text-[11px] text-gray-400 dark:text-gray-500">Dashboard Pemilik Usaha</p>
          </div>
        </router-link>

        <div class="flex items-center gap-3">
          <div class="hidden sm:block text-right leading-tight">
            <p class="text-sm font-semibold text-gray-800 dark:text-white truncate max-w-[12rem]">{{ owner?.nama || 'Pemilik Usaha' }}</p>
            <p class="text-[11px] text-gray-400 dark:text-gray-500 truncate max-w-[12rem]">{{ owner?.email }}</p>
          </div>
          <div v-if="owner?.fotoProfil" class="w-9 h-9 rounded-full overflow-hidden shrink-0 border border-gray-200 dark:border-white/10">
            <img :src="owner.fotoProfil" alt="Foto profil Anda" class="w-full h-full object-cover" />
          </div>
          <div v-else class="w-9 h-9 rounded-full bg-[#FFC94D]/10 text-[#FFC94D] flex items-center justify-center font-bold text-sm shrink-0">
            {{ (owner?.nama || '?').charAt(0).toUpperCase() }}
          </div>
          <button
            @click="logout"
            class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:text-[#FA6781] hover:border-[#FA6781]/40 hover:bg-[#FA6781]/5 text-sm font-semibold transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0-4-4m4 4H7m6 4v1a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1" />
            </svg>
            <span class="hidden sm:inline">Keluar</span>
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <!-- Profil Saya: the owner can update their own profile picture, shown everywhere
           this business is displayed. Name/email stay admin-managed. -->
      <div class="bg-white dark:bg-[#161a24] border border-gray-100 dark:border-white/5 rounded-3xl p-6 sm:p-7 mb-6">
        <p class="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">Profil Saya</p>
        <div class="flex flex-col sm:flex-row items-center gap-5">
          <div v-if="profileFotoInput.trim()" class="w-16 h-16 rounded-full overflow-hidden shrink-0 border border-gray-200 dark:border-white/10">
            <img :src="profileFotoInput.trim()" alt="Pratinjau foto profil" class="w-full h-full object-cover" />
          </div>
          <div v-else class="w-16 h-16 rounded-full bg-[#FFC94D]/10 text-[#FFC94D] flex items-center justify-center font-bold text-xl shrink-0">
            {{ (owner?.nama || '?').charAt(0).toUpperCase() }}
          </div>
          <div class="flex-1 w-full">
            <label class="form-label">URL Foto Profil</label>
            <div class="flex flex-col sm:flex-row gap-2">
              <input
                v-model="profileFotoInput"
                type="url"
                class="form-input flex-1"
                placeholder="https://example.com/foto-saya.jpg"
              />
              <button
                @click="saveProfilePhoto"
                type="button"
                class="px-5 py-2.5 rounded-xl bg-[#FFC94D] hover:bg-[#e6b03a] text-white font-semibold text-sm shadow-sm transition-all duration-200 active:scale-[0.97] whitespace-nowrap"
              >
                Simpan Foto
              </button>
            </div>
            <p class="text-xs text-gray-400 mt-1.5">Foto ini akan tampil di halaman detail bisnis Anda dan di dashboard ini.</p>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 pt-5 border-t border-gray-100 dark:border-white/5">
          <div>
            <label class="form-label">Nama Pemilik</label>
            <input :value="owner?.nama" type="text" class="form-input opacity-70 cursor-not-allowed" disabled />
          </div>
          <div>
            <label class="form-label">Nomor KTA</label>
            <input :value="owner?.nomorKTA || 'Belum diisi'" type="text" class="form-input opacity-70 cursor-not-allowed" disabled />
          </div>
        </div>
        <p class="text-xs text-gray-400 mt-2">Nama dan Nomor KTA dikelola oleh Bidang OKK. Hubungi pengurus apabila ada koreksi.</p>
      </div>

      <!-- Empty state: owner account not linked to any business yet -->
      <div v-if="!ownedBusinesses.length && !isCreatingNew" class="bg-white dark:bg-[#161a24] border border-gray-100 dark:border-white/5 rounded-3xl p-10 text-center">
        <div class="w-14 h-14 rounded-2xl bg-[#FFC94D]/10 flex items-center justify-center mx-auto mb-5">
          <svg class="w-7 h-7 text-[#FFC94D]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4m-5 6h.01M8 13h.01M8 17h.01" />
          </svg>
        </div>
        <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Belum Ada Bisnis yang Terhubung</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
          Akun Anda belum dikaitkan dengan bisnis mana pun di katalog. Hubungi admin OKK BPC HIPMI Bantul, atau daftarkan sendiri bisnis pertama Anda di bawah ini.
        </p>
        <button
          @click="startNewBusiness"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FFC94D] hover:bg-[#e6b03a] text-white font-semibold text-sm shadow-sm transition-all duration-200 active:scale-[0.97]"
        >
          <IconPlus />
          Tambah Bisnis Pertama Anda
        </button>
      </div>

      <template v-else>
        <!-- Business selector: existing businesses plus an always-available "add new" pill -->
        <div class="mb-6">
          <p class="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">Bisnis Anda</p>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="biz in ownedBusinesses"
              :key="biz.id"
              @click="selectBusiness(biz.id)"
              class="px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200"
              :class="!isCreatingNew && selectedBusinessId === biz.id
                ? 'border-[#FFC94D] bg-[#FFC94D]/10 text-[#b9860a] dark:text-[#FFC94D]'
                : 'border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:border-gray-300'"
            >
              {{ biz.namaUsaha }}
            </button>
            <button
              @click="startNewBusiness"
              class="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold border border-dashed transition-all duration-200"
              :class="isCreatingNew
                ? 'border-[#FFC94D] bg-[#FFC94D]/10 text-[#b9860a] dark:text-[#FFC94D]'
                : 'border-gray-300 dark:border-white/15 text-gray-500 dark:text-gray-400 hover:border-[#FFC94D]/50 hover:text-[#b9860a] dark:hover:text-[#FFC94D]'"
            >
              <IconPlus />
              Tambah Bisnis
            </button>
          </div>
        </div>

        <div class="bg-white dark:bg-[#161a24] border border-gray-100 dark:border-white/5 rounded-3xl overflow-hidden">
          <div class="px-6 sm:px-8 py-5 border-b border-gray-100 dark:border-white/5 flex items-center justify-between gap-3">
            <div>
              <h1 class="text-lg font-bold text-gray-900 dark:text-white">{{ isCreatingNew ? 'Tambah Bisnis Baru' : selectedBusiness?.namaUsaha }}</h1>
              <p class="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{{ isCreatingNew ? 'Lengkapi informasi bisnis baru Anda di bawah ini.' : 'Perbarui informasi bisnis Anda di bawah ini.' }}</p>
            </div>
            <router-link
              v-if="selectedBusinessId"
              :to="`/business/${selectedBusinessId}`"
              target="_blank"
              class="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:text-[#FFC94D] hover:border-[#FFC94D]/40 text-xs font-semibold transition-colors shrink-0"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Lihat Halaman
            </router-link>
          </div>

          <div class="px-6 sm:px-8 py-6 space-y-8">
            <fieldset>
              <legend class="form-legend">
                <IconInfo />
                Informasi Dasar
              </legend>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="form-label">Nama Usaha <span class="text-[#FA6781]">*</span></label>
                  <input v-model="form.namaUsaha" type="text" class="form-input" placeholder="Masukkan nama usaha" />
                </div>
                <div>
                  <label class="form-label">Nama Pemilik</label>
                  <input :value="owner?.nama" type="text" class="form-input opacity-70 cursor-not-allowed" disabled />
                  <p class="text-[11px] text-gray-400 mt-1">Nama pemilik diambil dari akun Anda. Ubah di kartu "Profil Saya" di atas.</p>
                </div>
                <div>
                  <label class="form-label">Kategori <span class="text-[#FA6781]">*</span></label>
                  <select v-model="form.kategori" class="form-input">
                    <option value="" disabled>Pilih kategori</option>
                    <option v-for="cat in categoryOptions" :key="cat" :value="cat">{{ cat }}</option>
                  </select>
                </div>
                <div class="md:col-span-2">
                  <label class="form-label">Deskripsi <span class="text-[#FA6781]">*</span></label>
                  <textarea v-model="form.deskripsi" rows="3" class="form-input resize-none" placeholder="Tuliskan deskripsi bisnis..."></textarea>
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend class="form-legend">
                <IconLocation />
                Cabang &amp; Lokasi
              </legend>
              <p class="text-xs text-gray-400 -mt-1 mb-4">Tambahkan satu baris untuk tiap cabang/alamat yang dimiliki bisnis ini. Minimal satu cabang wajib diisi.</p>
              <div class="space-y-4">
                <div
                  v-for="(cab, cIdx) in form.cabang"
                  :key="cIdx"
                  class="p-4 rounded-xl border border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-white/[0.02] space-y-3"
                >
                  <div class="flex items-center justify-between gap-2">
                    <span class="text-xs font-bold uppercase tracking-wide text-gray-400">Cabang {{ cIdx + 1 }}</span>
                    <button
                      v-if="form.cabang.length > 1"
                      type="button"
                      @click="removeCabangRow(cIdx)"
                      class="text-xs font-semibold text-[#FA6781] hover:underline cursor-pointer"
                    >
                      Hapus Cabang
                    </button>
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label class="form-label">Nama Cabang <span class="text-[#FA6781]">*</span></label>
                      <input v-model="cab.label" type="text" class="form-input" placeholder="Contoh: Cabang Utama, Cabang Bantul Kota" />
                    </div>
                    <div>
                      <label class="form-label">Alamat <span class="text-[#FA6781]">*</span></label>
                      <input v-model="cab.alamat" type="text" class="form-input" placeholder="Masukkan alamat lengkap cabang ini" />
                    </div>
                    <div class="md:col-span-2">
                      <label class="form-label">Google Maps Embed / Link</label>
                      <input
                        v-model="cab.mapsEmbed"
                        type="text"
                        class="form-input"
                        placeholder="Paste kode embed iframe atau link Google Maps (opsional)"
                      />
                      <p class="text-xs text-gray-400 mt-1.5">Atau isi koordinat Latitude &amp; Longitude di bawah ini. Salah satu cukup — kalau keduanya diisi, Latitude/Longitude yang dipakai.</p>
                    </div>
                    <div>
                      <label class="form-label">Latitude</label>
                      <input v-model="cab.latitude" type="text" inputmode="decimal" class="form-input" placeholder="Contoh: -7.8481" />
                    </div>
                    <div>
                      <label class="form-label">Longitude</label>
                      <input v-model="cab.longitude" type="text" inputmode="decimal" class="form-input" placeholder="Contoh: 110.3287" />
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  @click="addCabangRow"
                  class="w-full px-4 py-2.5 rounded-xl border-2 border-dashed border-gray-200 dark:border-white/10 text-gray-500 text-sm font-semibold hover:border-[#FFC94D] hover:text-[#FFC94D] transition-colors cursor-pointer"
                >
                  + Tambah Cabang
                </button>
              </div>
            </fieldset>

            <fieldset>
              <legend class="form-legend">
                <IconPhone />
                Kontak
              </legend>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="form-label">Telepon</label>
                  <input
                    v-model="form.kontak.telepon"
                    type="text"
                    class="form-input"
                    placeholder="0812-xxxx-xxxx"
                    @input="form.kontak.telepon = formatPhoneNumber($event.target.value)"
                  />
                </div>
                <div>
                  <label class="form-label">WhatsApp</label>
                  <input
                    v-model="form.kontak.whatsapp"
                    type="text"
                    class="form-input"
                    placeholder="0812-xxxx-xxxx"
                    @input="form.kontak.whatsapp = formatPhoneNumber($event.target.value)"
                  />
                </div>
                <div>
                  <label class="form-label">Instagram</label>
                  <input
                    v-model="form.kontak.instagram"
                    type="text"
                    class="form-input"
                    placeholder="@username"
                    @input="form.kontak.instagram = formatInstagram($event.target.value)"
                  />
                </div>
                <div>
                  <label class="form-label">Email</label>
                  <input
                    v-model="form.kontak.email"
                    type="email"
                    class="form-input"
                    placeholder="email@example.com"
                    @input="form.kontak.email = formatEmail($event.target.value)"
                  />
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend class="form-legend">
                <IconClock />
                Jam Operasional
              </legend>
              <div class="space-y-3">
                <div
                  v-for="(jam, index) in form.jamOperasional"
                  :key="index"
                  class="p-4 border border-gray-100 rounded-xl bg-gray-50/30 dark:bg-white/[0.02] dark:border-white/5 space-y-2"
                >
                  <div class="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-3">
                    <input
                      v-model="jam.hari"
                      type="text"
                      class="form-input"
                      placeholder="Senin - Jumat"
                      @keydown="handleHariKeydown(index, $event)"
                      @input="jam.hari = formatCapitalize($event.target.value)"
                    />
                    <input
                      :id="`owner-jam-input-${index}`"
                      v-model="jam.jam"
                      type="text"
                      class="form-input"
                      placeholder="00:00 - 00:00"
                      :disabled="jam.jam === 'Buka 24 Jam' || jam.jam === 'Tutup'"
                      :class="{ 'bg-gray-100/70 text-gray-500 cursor-not-allowed': jam.jam === 'Buka 24 Jam' || jam.jam === 'Tutup' }"
                      @keydown="handleTimeKeydown(index, $event)"
                    />
                    <button
                      @click="removeJamOperasional(index)"
                      class="icon-action text-[#FA6781] hover:bg-[#FA6781]/10"
                      :disabled="form.jamOperasional.length <= 1"
                      :class="{ 'opacity-30 cursor-not-allowed': form.jamOperasional.length <= 1 }"
                      type="button"
                    >
                      <IconTrash />
                    </button>
                  </div>
                  <div class="flex items-center gap-4 pl-1 text-xs">
                    <label class="flex items-center gap-1.5 cursor-pointer text-gray-500 hover:text-gray-700 select-none">
                      <input
                        type="checkbox"
                        :checked="jam.jam === 'Buka 24 Jam'"
                        @change="toggleSpecialTime(index, 'Buka 24 Jam')"
                        class="w-3.5 h-3.5 rounded border-gray-300 text-[#FFC94D] focus:ring-[#FFC94D]"
                      />
                      <span>Buka 24 Jam</span>
                    </label>
                    <label class="flex items-center gap-1.5 cursor-pointer text-gray-500 hover:text-gray-700 select-none">
                      <input
                        type="checkbox"
                        :checked="jam.jam === 'Tutup'"
                        @change="toggleSpecialTime(index, 'Tutup')"
                        class="w-3.5 h-3.5 rounded border-gray-300 text-[#FFC94D] focus:ring-[#FFC94D]"
                      />
                      <span>Tutup</span>
                    </label>
                  </div>
                </div>
                <button @click="addJamOperasional" class="add-inline-button" type="button">
                  <IconPlus />
                  Tambah Jam Operasional
                </button>
              </div>
            </fieldset>

            <fieldset>
              <legend class="form-legend">
                <IconBox />
                Produk
              </legend>
              <div class="space-y-4">
                <div
                  v-for="(produk, index) in form.produk"
                  :key="index"
                  class="p-4 border border-gray-200 dark:border-white/5 rounded-xl bg-gray-50/50 dark:bg-white/[0.02]"
                >
                  <div class="flex items-center justify-between mb-3">
                    <span class="text-sm font-semibold text-gray-500">Produk {{ index + 1 }}</span>
                    <button
                      @click="removeProduk(index)"
                      class="icon-action text-[#FA6781] hover:bg-[#FA6781]/10"
                      :disabled="form.produk.length <= 1"
                      :class="{ 'opacity-30 cursor-not-allowed': form.produk.length <= 1 }"
                      type="button"
                    >
                      <IconTrash />
                    </button>
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input v-model="produk.nama" type="text" class="form-input" placeholder="Nama produk" />
                    <input v-model.number="produk.harga" type="number" class="form-input" placeholder="Harga (Rp)" />
                    <div class="md:col-span-2">
                      <input v-model="produk.deskripsi" type="text" class="form-input" placeholder="Deskripsi singkat produk" />
                    </div>
                  </div>
                </div>
                <button @click="addProduk" class="add-inline-button" type="button">
                  <IconPlus />
                  Tambah Produk
                </button>
              </div>
            </fieldset>

            <fieldset>
              <legend class="form-legend">
                <IconCard />
                Metode Pembayaran
              </legend>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <label
                  v-for="metode in allPaymentMethods"
                  :key="metode"
                  class="flex items-center gap-2.5 p-3 border rounded-xl cursor-pointer transition-all duration-200"
                  :class="form.metodePembayaran.includes(metode)
                    ? 'border-[#FFC94D] bg-[#FFC94D]/5 text-[#FFC94D]'
                    : 'border-gray-200 dark:border-white/10 hover:border-gray-300 text-gray-600 dark:text-gray-400'"
                >
                  <input
                    type="checkbox"
                    :value="metode"
                    v-model="form.metodePembayaran"
                    class="w-4 h-4 rounded border-gray-300 text-[#FFC94D] focus:ring-[#FFC94D]"
                  />
                  <span class="text-sm font-medium">{{ metode }}</span>
                </label>
              </div>
            </fieldset>

            <fieldset>
              <legend class="form-legend">
                <IconFacility />
                Status Fasilitas Bisnis
              </legend>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                <label
                  v-for="facility in dynamicFacilities"
                  :key="facility"
                  class="relative flex items-center gap-2.5 p-3 border rounded-xl cursor-pointer transition-all duration-200 select-none group/fac"
                  :class="form.fasilitas.includes(facility)
                    ? 'border-[#FFC94D] bg-[#FFC94D]/5 text-[#FFC94D]'
                    : 'border-gray-200 dark:border-white/10 hover:border-gray-300 text-gray-600 dark:text-gray-400'"
                >
                  <input
                    type="checkbox"
                    :value="facility"
                    v-model="form.fasilitas"
                    class="w-4 h-4 rounded border-gray-300 text-[#FFC94D] focus:ring-[#FFC94D]"
                  />
                  <div class="w-5 h-5 flex items-center justify-center shrink-0">
                    <FacilityIcon :name="facility" :icon="facilityIconMap[facility] || ''" class="w-4 h-4" />
                  </div>
                  <span class="text-xs sm:text-sm font-medium text-left leading-tight pr-6 truncate" :title="facility">{{ facility }}</span>

                  <button
                    v-if="!allFacilities.includes(facility)"
                    type="button"
                    @click.stop.prevent="removeCustomFacility(facility)"
                    class="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-50 text-gray-500 hover:text-red-500 border border-gray-200 hover:border-red-300 dark:bg-gray-800 dark:hover:bg-red-950/30 dark:border-white/10 dark:hover:border-red-900 transition-all shadow-sm z-10"
                    title="Hapus fasilitas kustom ini"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                </label>
              </div>
              <div class="space-y-4">
                <div class="flex gap-2">
                  <input
                    v-model="customFacilityInput"
                    type="text"
                    class="form-input flex-1"
                    placeholder="Tambahkan fasilitas lainnya (misal: Live Music, Area Parkir Luas, dll)"
                    @keydown.enter.prevent="addCustomFacility"
                  />
                  <button
                    type="button"
                    @click="addCustomFacility"
                    class="px-5 py-2.5 bg-[#FFC94D] hover:bg-[#e6b03a] text-white font-semibold text-sm rounded-xl transition-all duration-200 whitespace-nowrap active:scale-[0.97]"
                  >
                    Tambah Fasilitas
                  </button>
                </div>

                <div class="p-4 border border-gray-100 dark:border-white/5 rounded-xl bg-gray-50/50 dark:bg-white/[0.02]">
                  <label class="block text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2.5">
                    Pilih Icon Template untuk Fasilitas Kustom:
                  </label>
                  <div class="flex flex-wrap gap-2">
                    <button
                      v-for="icon in templateIcons"
                      :key="icon.name"
                      type="button"
                      @click="selectedCustomIcon = icon.name"
                      class="flex items-center gap-1.5 px-3 py-1.5 border rounded-full text-xs font-semibold transition-all duration-200 select-none"
                      :class="selectedCustomIcon === icon.name
                        ? 'border-[#FFC94D] bg-[#FFC94D] text-white shadow-sm shadow-[#FFC94D]/20'
                        : 'border-gray-200 bg-white hover:border-gray-300 text-gray-600 dark:bg-[#161a24]'"
                      :title="icon.title"
                    >
                      <FacilityIcon :name="''" :icon="icon.name" class="w-3.5 h-3.5" />
                      <span>{{ icon.title }}</span>
                    </button>
                  </div>
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend class="form-legend">
                <IconImage />
                Foto (URL)
              </legend>
              <div class="space-y-4">
                <div>
                  <label class="form-label">Foto Utama <span class="text-[#FA6781]">*</span></label>
                  <ImageUrlInput v-model="form.foto.utama" placeholder="https://example.com/foto-utama.jpg" />
                </div>
                <UrlList v-model="form.foto.menu" label="Foto Menu" />
                <UrlList v-model="form.foto.tempat" label="Foto Tempat" />
                <UrlList v-model="form.foto.produk" label="Foto Produk" />
              </div>
            </fieldset>
          </div>

          <div class="sticky bottom-0 bg-white dark:bg-[#161a24] border-t border-gray-100 dark:border-white/5 px-6 sm:px-8 py-4 flex items-center justify-end gap-3">
            <button
              @click="cancelEdit"
              type="button"
              class="px-5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 font-medium text-sm transition-colors"
            >
              {{ isCreatingNew ? 'Batal' : 'Batalkan Perubahan' }}
            </button>
            <button
              @click="saveBusiness"
              class="px-6 py-2.5 rounded-xl bg-[#FFC94D] hover:bg-[#e6b03a] text-white font-semibold text-sm shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.97]"
            >
              {{ isCreatingNew ? 'Tambah Bisnis' : 'Simpan Perubahan' }}
            </button>
          </div>
        </div>
      </template>
    </main>

    <Transition name="toast">
      <div
        v-if="toast.show"
        class="fixed bottom-6 right-6 z-[70] px-5 py-3.5 rounded-xl shadow-xl flex items-center gap-2.5 text-sm font-semibold"
        :class="toast.type === 'success' ? 'bg-[#18933C] text-white' : 'bg-[#FA6781] text-white'"
      >
        <svg v-if="toast.type === 'success'" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="m5 13 4 4L19 7" />
        </svg>
        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
        </svg>
        {{ toast.message }}
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { computed, defineComponent, h, nextTick, onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import FacilityIcon from '../components/FacilityIcon.vue'
import ImageUrlInput from '../components/ImageUrlInput.vue'
import UrlList from '../components/UrlList.vue'
import { businessStore, sanitizeUrl } from '../data/businessData'
import { ownerStore } from '../data/ownerData'
import { extractLatLng, normalizeMapEmbed, isValidGoogleMapsUrl } from '../utils/maps'

const router = useRouter()

const ownerId = sessionStorage.getItem('business-owner-auth')
const owner = computed(() => (ownerId ? ownerStore.getById(ownerId) : null))

const ownedBusinesses = computed(() => {
  if (!owner.value) return []
  return (owner.value.businessIds || [])
    .map(id => businessStore.getById(id))
    .filter(Boolean)
})

const selectedBusinessId = ref(null)
const selectedBusiness = computed(() => businessStore.getById(selectedBusinessId.value))
const isCreatingNew = ref(false)

const profileFotoInput = ref(owner.value?.fotoProfil || '')

const toast = reactive({ show: false, message: '', type: 'success' })

const categoryOptions = computed(() => businessStore.getCategories())
const allPaymentMethods = [
  'Tunai', 'QRIS', 'GoPay', 'OVO',
  'Dana', 'Transfer Bank', 'Kartu Debit', 'Kartu Kredit'
]

const allFacilities = [
  'WiFi', 'Meja & Tempat Duduk', 'Toilet', 'Tempat Parkir',
  'AC', 'Mushola', 'Area Merokok', 'Pembayaran Non-Tunai'
]
const dynamicFacilities = ref([...allFacilities])
const customFacilityInput = ref('')
const selectedCustomIcon = ref('sparkles')
const facilityIconMap = ref({})

const templateIcons = [
  { name: 'wifi', title: 'WiFi' },
  { name: 'seats', title: 'Meja/Kursi' },
  { name: 'toilet', title: 'Toilet' },
  { name: 'parking', title: 'Parkir' },
  { name: 'ac', title: 'AC' },
  { name: 'mushola', title: 'Mushola' },
  { name: 'smoking', title: 'Smoking' },
  { name: 'cashless', title: 'Cashless' },
  { name: 'music', title: 'Musik' },
  { name: 'plug', title: 'Colokan' },
  { name: 'playground', title: 'Playground' },
  { name: 'garden', title: 'Taman' },
  { name: 'wheelchair', title: 'Akses Roda' },
  { name: 'pet', title: 'Pet Friendly' },
  { name: 'tv', title: 'TV/Layar' },
  { name: 'coffee', title: 'Kopi/Teh' },
  { name: 'book', title: 'Buku' },
  { name: 'security', title: 'Keamanan' },
  { name: 'bike', title: 'Sepeda' },
  { name: 'sparkles', title: 'Menarik' }
]

function addCustomFacility() {
  const value = customFacilityInput.value.trim()
  if (!value) return

  const formatted = value.replace(/\b\w/g, char => char.toUpperCase())
  if (!dynamicFacilities.value.includes(formatted)) {
    dynamicFacilities.value.push(formatted)
  }
  if (!form.fasilitas.includes(formatted)) {
    form.fasilitas.push(formatted)
  }
  facilityIconMap.value[formatted] = selectedCustomIcon.value
  customFacilityInput.value = ''
  selectedCustomIcon.value = 'sparkles'
}

function removeCustomFacility(facilityName) {
  const dfIndex = dynamicFacilities.value.indexOf(facilityName)
  if (dfIndex !== -1) {
    dynamicFacilities.value.splice(dfIndex, 1)
  }
  const ffIndex = form.fasilitas.indexOf(facilityName)
  if (ffIndex !== -1) {
    form.fasilitas.splice(ffIndex, 1)
  }
  delete facilityIconMap.value[facilityName]
}

function mapFacilityToIcon(name) {
  const norm = name.toLowerCase().trim()
  if (norm.includes('wifi')) return 'wifi'
  if (norm.includes('meja') || norm.includes('duduk') || norm.includes('kursi') || norm.includes('seat')) return 'seats'
  if (norm.includes('toilet') || norm.includes('restroom') || norm.includes('wc')) return 'toilet'
  if (norm.includes('parkir') || norm.includes('parking')) return 'parking'
  if (norm.includes('ac') || norm.includes('pendingin') || norm.includes('air conditioner')) return 'ac'
  if (norm.includes('mushola') || norm.includes('musholla') || norm.includes('sholat') || norm.includes('prayer')) return 'mushola'
  if (norm.includes('rokok') || norm.includes('smoking')) return 'smoking'
  if (norm.includes('non-tunai') || norm.includes('non tunai') || norm.includes('cashless') || norm.includes('qris') || norm.includes('debit') || norm.includes('kredit') || norm.includes('card')) return 'cashless'
  return 'sparkles'
}

const getEmptyForm = () => ({
  namaUsaha: '',
  namaPemilik: '',
  kategori: '',
  deskripsi: '',
  cabang: [{ label: 'Cabang Utama', alamat: '', mapsEmbed: '', latitude: '', longitude: '' }],
  kontak: { telepon: '', whatsapp: '', instagram: '', email: '' },
  jamOperasional: [{ hari: '', jam: '00:00 - 00:00' }],
  produk: [{ nama: '', harga: 0, deskripsi: '' }],
  metodePembayaran: [],
  fasilitas: [],
  foto: { utama: '', tempat: [''], produk: [''], menu: [''] }
})

const form = reactive(getEmptyForm())

function addCabangRow() {
  form.cabang.push({ label: `Cabang ${form.cabang.length + 1}`, alamat: '', mapsEmbed: '', latitude: '', longitude: '' })
}

function removeCabangRow(index) {
  if (form.cabang.length <= 1) return
  form.cabang.splice(index, 1)
}

function loadForm(item) {
  if (!item) {
    Object.assign(form, getEmptyForm())
    facilityIconMap.value = {}
    dynamicFacilities.value = [...allFacilities]
    return
  }

  facilityIconMap.value = {}
  dynamicFacilities.value = [...allFacilities]
  if (item.fasilitas) {
    item.fasilitas.forEach(f => {
      const name = typeof f === 'object' ? f.name : f
      const icon = typeof f === 'object' ? f.icon : ''
      if (!dynamicFacilities.value.includes(name)) {
        dynamicFacilities.value.push(name)
      }
      if (icon) {
        facilityIconMap.value[name] = icon
      }
    })
  }

  Object.assign(form, {
    namaUsaha: item.namaUsaha || '',
    namaPemilik: item.namaPemilik || '',
    kategori: item.kategori || '',
    deskripsi: item.deskripsi || '',
    cabang: item.cabang?.length
      ? item.cabang.map(cab => ({
          label: cab.label || '',
          alamat: cab.alamat || '',
          mapsEmbed: cab.mapsEmbed || '',
          latitude: extractLatLng(cab.mapsEmbed)?.lat || '',
          longitude: extractLatLng(cab.mapsEmbed)?.lng || ''
        }))
      : [{ label: 'Cabang Utama', alamat: item.alamat || '', mapsEmbed: item.mapsEmbed || '', latitude: extractLatLng(item.mapsEmbed)?.lat || '', longitude: extractLatLng(item.mapsEmbed)?.lng || '' }],
    kontak: {
      telepon: item.kontak?.telepon || '',
      whatsapp: item.kontak?.whatsapp || '',
      instagram: item.kontak?.instagram || '',
      email: item.kontak?.email || ''
    },
    jamOperasional: item.jamOperasional?.length
      ? item.jamOperasional.map(jam => ({ hari: jam.hari || '', jam: jam.jam || '00:00 - 00:00' }))
      : [{ hari: '', jam: '00:00 - 00:00' }],
    produk: item.produk?.length
      ? item.produk.map(produk => ({ ...produk }))
      : [{ nama: '', harga: 0, deskripsi: '' }],
    metodePembayaran: item.metodePembayaran ? [...item.metodePembayaran] : [],
    fasilitas: item.fasilitas
      ? item.fasilitas.map(f => typeof f === 'object' ? f.name : f)
      : [],
    foto: {
      utama: item.foto?.utama || '',
      tempat: item.foto?.tempat?.length ? [...item.foto.tempat] : [''],
      produk: item.foto?.produk?.length ? [...item.foto.produk] : [''],
      menu: Array.isArray(item.foto?.menu)
        ? [...item.foto.menu]
        : (item.foto?.menu ? [item.foto.menu] : [''])
    }
  })
}

watch(selectedBusinessId, () => {
  loadForm(selectedBusiness.value)
})

onMounted(() => {
  if (ownedBusinesses.value.length) {
    selectedBusinessId.value = ownedBusinesses.value[0].id
  }
  profileFotoInput.value = owner.value?.fotoProfil || ''
})

async function saveProfilePhoto() {
  if (!ownerId) return
  const url = profileFotoInput.value.trim()
  await ownerStore.update(ownerId, { fotoProfil: url })
  profileFotoInput.value = url
  showToast('Foto profil berhasil diperbarui.')
}

function startNewBusiness() {
  isCreatingNew.value = true
  selectedBusinessId.value = null
  loadForm(null)
}

function selectBusiness(id) {
  isCreatingNew.value = false
  selectedBusinessId.value = id
}

function cancelEdit() {
  if (isCreatingNew.value) {
    isCreatingNew.value = false
    if (ownedBusinesses.value.length) {
      selectedBusinessId.value = ownedBusinesses.value[0].id
    } else {
      loadForm(null)
    }
  } else {
    loadForm(selectedBusiness.value)
  }
}

function formatCapitalize(value) {
  if (!value) return ''
  return value.replace(/\b\w/g, char => char.toUpperCase())
}

function formatPhoneNumber(value) {
  const digits = value.replace(/\D/g, '')
  const truncated = digits.substring(0, 13)
  if (truncated.length <= 4) {
    return truncated
  } else if (truncated.length <= 8) {
    return `${truncated.slice(0, 4)}-${truncated.slice(4)}`
  } else {
    return `${truncated.slice(0, 4)}-${truncated.slice(4, 8)}-${truncated.slice(8)}`
  }
}

function formatInstagram(value) {
  let val = value.replace(/\s+/g, '')
  val = val.replace(/[^a-zA-Z0-9_.\-@]/g, '')
  return val.toLowerCase()
}

function formatEmail(value) {
  let val = value.replace(/\s+/g, '')
  val = val.replace(/[^a-zA-Z0-9@._\-+]/g, '')
  return val.toLowerCase()
}

function handleTimeKeydown(index, event) {
  const input = event.target
  const val = form.jamOperasional[index].jam || ''

  if (event.key === 'Backspace') {
    event.preventDefault()

    if (input.selectionStart !== input.selectionEnd) {
      form.jamOperasional[index].jam = '00:00 - 00:00'
      nextTick(() => {
        input.setSelectionRange(0, 0)
      })
      return
    }

    let start = input.selectionStart
    if (start === 0) return

    let prevIdx = start - 1
    while (prevIdx > 0 && (prevIdx === 2 || prevIdx === 5 || prevIdx === 6 || prevIdx === 7 || prevIdx === 10)) {
      prevIdx--
    }

    const isMask = /^\d\d:\d\d\s-\s\d\d:\d\d$/.test(val)
    let currentVal = isMask ? val : '00:00 - 00:00'
    const chars = currentVal.split('')
    if (prevIdx >= 0 && prevIdx < chars.length && /\d/.test(chars[prevIdx])) {
      chars[prevIdx] = '0'
    }
    form.jamOperasional[index].jam = chars.join('')

    nextTick(() => {
      input.setSelectionRange(prevIdx, prevIdx)
    })
    return
  }

  const navKeys = ['Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter']
  if (navKeys.includes(event.key) || event.ctrlKey || event.metaKey) {
    return
  }

  if (/^\d$/.test(event.key)) {
    event.preventDefault()

    if (input.selectionStart !== input.selectionEnd) {
      const chars = '00:00 - 00:00'.split('')
      chars[0] = event.key
      form.jamOperasional[index].jam = chars.join('')
      nextTick(() => {
        input.setSelectionRange(1, 1)
      })
      return
    }

    const isMask = /^\d\d:\d\d\s-\s\d\d:\d\d$/.test(val)
    let currentVal = isMask ? val : '00:00 - 00:00'
    let start = isMask ? input.selectionStart : 0

    if (start >= 13) return

    while (start < 13 && (start === 2 || start === 5 || start === 6 || start === 7 || start === 10)) {
      start++
    }

    const chars = currentVal.split('')
    chars[start] = event.key
    form.jamOperasional[index].jam = chars.join('')

    let nextPos = start + 1
    while (nextPos < 13 && (nextPos === 2 || nextPos === 5 || nextPos === 6 || nextPos === 7 || nextPos === 10)) {
      nextPos++
    }

    nextTick(() => {
      input.setSelectionRange(nextPos, nextPos)
    })
  } else {
    event.preventDefault()
  }
}

function handleHariKeydown(index, event) {
  if (/^\d$/.test(event.key)) {
    event.preventDefault()
    const nextInput = document.getElementById(`owner-jam-input-${index}`)
    if (nextInput) {
      nextInput.focus()
      const start = nextInput.selectionStart
      const end = nextInput.selectionEnd
      const val = form.jamOperasional[index].jam || ''
      form.jamOperasional[index].jam = val.slice(0, start) + event.key + val.slice(end)
      nextTick(() => {
        nextInput.setSelectionRange(start + 1, start + 1)
      })
    }
  }
}

function toggleSpecialTime(index, value) {
  const current = form.jamOperasional[index].jam
  if (current === value) {
    form.jamOperasional[index].jam = '00:00 - 00:00'
  } else {
    form.jamOperasional[index].jam = value
  }
}

function addJamOperasional() {
  form.jamOperasional.push({ hari: '', jam: '00:00 - 00:00' })
}

function removeJamOperasional(index) {
  if (form.jamOperasional.length > 1) {
    form.jamOperasional.splice(index, 1)
  }
}

function addProduk() {
  form.produk.push({ nama: '', harga: 0, deskripsi: '' })
}

function removeProduk(index) {
  if (form.produk.length > 1) {
    form.produk.splice(index, 1)
  }
}

async function saveBusiness() {
  // Defense in depth: never allow saving a business id outside this owner's assignments,
  // unless we're in the middle of creating a brand-new business (no id assigned yet).
  if (!isCreatingNew.value && (!selectedBusinessId.value || !ownedBusinesses.value.some(b => b.id === selectedBusinessId.value))) {
    showToast('Bisnis ini tidak terhubung ke akun Anda.', 'error')
    return
  }

  if (
    !form.namaUsaha.trim() ||
    !(owner.value?.nama || '').trim() ||
    !form.kategori ||
    !form.cabang.length ||
    form.cabang.some(cab => !cab.label.trim() || !cab.alamat.trim()) ||
    !form.deskripsi.trim() ||
    !form.foto.utama.trim()
  ) {
    showToast('Mohon lengkapi field yang wajib diisi (Nama Usaha, Kategori, Nama & Alamat tiap Cabang, Deskripsi, dan Foto Utama).', 'error')
    return
  }

  // Lokasi: Latitude/Longitude (jika diisi) menggantikan field link/embed, per cabang
  const cabangResult = []
  for (const cab of form.cabang) {
    const lat = cab.latitude.trim()
    const lng = cab.longitude.trim()
    let mapsInput = cab.mapsEmbed.trim()

    if (lat || lng) {
      const latNum = Number(lat)
      const lngNum = Number(lng)
      if (!lat || !lng) {
        showToast(`Cabang "${cab.label || '-'}": Latitude dan Longitude harus diisi berdua, atau kosongkan keduanya.`, 'error')
        return
      }
      if (Number.isNaN(latNum) || Number.isNaN(lngNum) || latNum < -90 || latNum > 90 || lngNum < -180 || lngNum > 180) {
        showToast(`Cabang "${cab.label || '-'}": Latitude/Longitude tidak valid. Latitude antara -90 s/d 90, Longitude antara -180 s/d 180.`, 'error')
        return
      }
      mapsInput = `${latNum},${lngNum}`
    } else if (mapsInput) {
      const mapsVal = mapsInput.toLowerCase()
      if (mapsVal.includes('maps.app.goo.gl') || mapsVal.includes('goo.gl/maps') || mapsVal.includes('goo.gl')) {
        showToast(`Cabang "${cab.label || '-'}": Tautan pendek Google Maps (maps.app.goo.gl) tidak bisa dimuat secara langsung karena pembatasan dari Google. Silakan klik "Bagikan" -> "Sematkan peta" di Google Maps lalu salin kode HTML-nya, atau isi Latitude/Longitude (contoh: -6.8893, 107.5962).`, 'error')
        return
      }
      if (!isValidGoogleMapsUrl(mapsInput)) {
        showToast(`Cabang "${cab.label || '-'}": Tautan Google Maps tidak valid. Harus berupa kode HTML iframe atau tautan Google Maps asli yang berisi koordinat.`, 'error')
        return
      }
    }

    cabangResult.push({
      label: cab.label.trim(),
      alamat: cab.alamat.trim(),
      mapsEmbed: normalizeMapEmbed(mapsInput)
    })
  }

  const data = {
    namaUsaha: form.namaUsaha.trim(),
    namaPemilik: (owner.value?.nama || '').trim(),
    kategori: form.kategori,
    deskripsi: form.deskripsi.trim(),
    cabang: cabangResult,
    alamat: cabangResult[0].alamat,
    mapsEmbed: cabangResult[0].mapsEmbed,
    kontak: { ...form.kontak },
    jamOperasional: form.jamOperasional.filter(jam => jam.hari.trim() || jam.jam.trim()),
    produk: form.produk.filter(produk => produk.nama.trim()),
    metodePembayaran: [...form.metodePembayaran],
    fasilitas: form.fasilitas.map(name => {
      const icon = facilityIconMap.value[name] || mapFacilityToIcon(name)
      return { name, icon }
    }),
    foto: {
      utama: sanitizeUrl(form.foto.utama.trim()),
      tempat: form.foto.tempat.filter(url => url.trim()).map(url => sanitizeUrl(url)),
      produk: form.foto.produk.filter(url => url.trim()).map(url => sanitizeUrl(url)),
      menu: form.foto.menu.filter(url => url.trim()).map(url => sanitizeUrl(url))
    }
  }

  if (!data.jamOperasional.length) data.jamOperasional = [{ hari: '', jam: '' }]

  if (isCreatingNew.value) {
    const newId = await businessStore.add(data)
    await ownerStore.update(ownerId, { businessIds: [...(owner.value?.businessIds || []), newId] })
    isCreatingNew.value = false
    selectedBusinessId.value = newId
    showToast('Bisnis baru berhasil ditambahkan.')
  } else {
    await businessStore.update(selectedBusinessId.value, data)
    showToast('Informasi bisnis berhasil diperbarui.')
  }
}

function showToast(message, type = 'success') {
  toast.show = true
  toast.message = message
  toast.type = type
  setTimeout(() => {
    toast.show = false
  }, 3500)
}

function logout() {
  sessionStorage.removeItem('business-owner-auth')
  sessionStorage.removeItem('business-owner-email')
  sessionStorage.removeItem('business-owner-nama')
  router.replace({ name: 'Home' })
}

function createSvgIcon(path, extra = {}) {
  return defineComponent({
    setup() {
      return () => h('span', { class: 'legend-icon' }, [
        h('svg', {
          class: 'w-4 h-4',
          fill: 'none',
          stroke: 'currentColor',
          viewBox: '0 0 24 24',
          ...extra
        }, [
          h('path', {
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            'stroke-width': '2',
            d: path
          })
        ])
      ])
    }
  })
}

const IconInfo = createSvgIcon('M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z')
const IconLocation = createSvgIcon('M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z')
const IconPhone = createSvgIcon('M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.7.6 2.5a2 2 0 0 1-.5 2.1L8 9.5a16 16 0 0 0 6.5 6.5l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.6.5 2.5.6a2 2 0 0 1 1.7 2Z')
const IconClock = createSvgIcon('M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z')
const IconBox = createSvgIcon('M21 8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7V8Z')
const IconCard = createSvgIcon('M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3Z')
const IconImage = createSvgIcon('M4 16l4.6-4.6a2 2 0 0 1 2.8 0L16 16m-2-2 1.6-1.6a2 2 0 0 1 2.8 0L20 14m-6-6h.01M6 20h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z')
const IconPlus = createSvgIcon('M12 4v16m8-8H4')
const IconTrash = createSvgIcon('m19 7-.9 12.1A2 2 0 0 1 16.1 21H7.9a2 2 0 0 1-2-1.9L5 7m5 4v6m4-6v6m1-10V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3M4 7h16')
const IconFacility = createSvgIcon('M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5m-4 0h4')

</script>

<style>
.form-input {
  width: 100%;
  padding: 0.625rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  background-color: white;
  color: #111827;
  transition: all 0.2s ease;
  outline: none;
}

.form-input::placeholder {
  color: #9ca3af;
}

.form-input:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(255, 201, 77, 0.4);
  border-color: #FFC94D;
}

.form-label {
  display: block;
  color: #4b5563;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.375rem;
}

.form-legend {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #374151;
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.legend-icon {
  width: 2rem;
  height: 2rem;
  border-radius: 0.75rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgb(255 201 77 / 0.1);
  color: #FFC94D;
}

.icon-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s ease;
  flex-shrink: 0;
}

.icon-action .legend-icon,
.add-inline-button .legend-icon {
  width: 1rem;
  height: 1rem;
  background: transparent;
  color: currentColor;
}

.add-inline-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #FFC94D;
  font-size: 0.875rem;
  font-weight: 600;
  transition: color 0.2s ease;
}

.add-inline-button:hover {
  color: #e6b03a;
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

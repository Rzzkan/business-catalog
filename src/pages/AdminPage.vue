<template>
  <div class="min-h-screen bg-gray-50 flex">
    <Transition name="fade">
      <div
        v-if="sidebarOpen"
        class="fixed inset-0 bg-black/40 z-40 lg:hidden"
        @click="sidebarOpen = false"
      />
    </Transition>

    <Transition name="slide">
      <aside
        v-show="sidebarOpen || !isMobile"
        :class="[
          'fixed lg:sticky inset-y-0 left-0 top-0 z-50 w-64 h-screen bg-[#FFC94D] text-white flex flex-col shadow-xl',
          'transform transition-transform duration-300 ease-in-out',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        ]"
      >
        <div class="p-6 border-b border-white/20">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center p-1.5 shrink-0">
              <img src="/logo.svg" alt="Logo BPC HIPMI Bantul" class="w-full h-full object-contain" />
            </div>
            <div>
              <h2 class="font-bold text-lg leading-tight">Admin Katalog Bisnis</h2>
              <p class="text-xs text-white/70">Panel Pengelolaan</p>
            </div>
          </div>
        </div>

        <nav class="flex-1 p-4 space-y-1">
          <button
            @click="setSection('dashboard')"
            :class="navButtonClass('dashboard')"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 13h6V4H4v9Zm10 7h6V4h-6v16ZM4 20h6v-3H4v3Z" />
            </svg>
            <span>Dashboard</span>
          </button>
          <button
            @click="setSection('manage')"
            :class="navButtonClass('manage')"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h10" />
            </svg>
            <span>Kelola Bisnis</span>
          </button>
          <button
            @click="setSection('categories')"
            :class="navButtonClass('categories')"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5h16v14H4zM4 10h16M9 5v14M15 5v14" />
            </svg>
            <span>Kategori</span>
          </button>
          <button
            @click="setSection('reports')"
            :class="navButtonClass('reports')"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3Z" />
            </svg>
            <span class="flex items-center justify-between w-full">
              <span>Laporan</span>
              <span v-if="pendingReportsCount > 0" class="bg-[#FA6781] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {{ pendingReportsCount }}
              </span>
            </span>
          </button>
          <button
            @click="setSection('owners')"
            :class="navButtonClass('owners')"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m14-11 2 2 4-4M11 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
            </svg>
            <span>Akun Pemilik</span>
          </button>
          <button
            @click="setSection('settings')"
            :class="navButtonClass('settings')"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065Z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            <span>Pengaturan</span>
          </button>
        </nav>

        <div class="p-4 border-t border-white/20 space-y-1">
          <router-link
            to="/"
            class="flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span>Kembali ke Beranda</span>
          </router-link>
          <button
            @click="logout"
            class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H3m12 0-4-4m4 4-4 4m5-13h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3" />
            </svg>
            <span>Keluar</span>
          </button>
        </div>
      </aside>
    </Transition>

    <div class="flex-1 flex flex-col min-w-0">
      <header class="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-30">
        <div class="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
          <div class="flex items-center gap-4 min-w-0">
            <button
              @click="sidebarOpen = !sidebarOpen"
              class="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
              aria-label="Buka menu admin"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="!sidebarOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
            <h1 class="text-lg sm:text-xl font-bold text-gray-800 truncate">
              {{ pageTitle }}
            </h1>
          </div>
          <div class="flex items-center gap-3 min-w-0">
            <span class="hidden sm:block text-sm text-gray-500 truncate max-w-52">{{ adminEmail }}</span>
            <div class="w-9 h-9 bg-[#FFC94D] rounded-full flex items-center justify-center text-white font-bold text-sm">
              A
            </div>
          </div>
        </div>
      </header>

      <main class="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
        <section v-if="activeSection === 'dashboard'">
          <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mb-8">
            <article class="stat-card">
              <div class="stat-icon bg-[#FFC94D]/10 text-[#FFC94D]">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9.5 12 4l9 5.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5Z" />
                </svg>
              </div>
              <p class="text-3xl font-bold text-gray-800 mt-4">{{ stats.totalBusiness }}</p>
              <p class="text-sm text-gray-500 mt-1">Total Bisnis Terdatar</p>
            </article>

            <article class="stat-card">
              <div class="stat-icon bg-[#FFC94D]/10 text-[#c28c00]">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5h16v14H4zM4 10h16M9 5v14M15 5v14" />
                </svg>
              </div>
              <p class="text-3xl font-bold text-gray-800 mt-4">{{ stats.totalKategori }}</p>
              <p class="text-sm text-gray-500 mt-1">Total Kategori</p>
            </article>

            <article class="stat-card">
              <div class="stat-icon bg-[#FA6781]/10 text-[#FA6781]">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7V8Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.3 7 12 12l8.7-5M12 22V12" />
                </svg>
              </div>
              <p class="text-3xl font-bold text-gray-800 mt-4">{{ stats.totalProduk }}</p>
              <p class="text-sm text-gray-500 mt-1">Total Produk</p>
            </article>
          </div>

          <article class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 class="text-lg font-bold text-gray-800 mb-4">Distribusi Kategori</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div
                v-for="cat in categoryDistribution"
                :key="cat.name"
                class="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-[#FAE7CB]/30 transition-colors duration-200"
              >
                <div class="w-10 h-10 rounded-lg flex items-center justify-center" :class="cat.bgClass">
                  <CategoryIcon :name="cat.name" class="w-5 h-5" />
                </div>
                <div>
                  <p class="font-semibold text-gray-800">{{ cat.name }}</p>
                  <p class="text-sm text-gray-500">{{ cat.count }} Bisnis Terdatar</p>
                </div>
              </div>
            </div>
          </article>
        </section>

        <section v-if="activeSection === 'manage'">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <button
              @click="openAddModal"
              class="flex items-center gap-2 bg-[#FFC94D] hover:bg-[#e6b03a] text-white px-5 py-2.5 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.97]"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Tambah Bisnis
            </button>

            <div class="relative w-full sm:w-80">
              <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
              </svg>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Cari Bisnis..."
                class="form-input admin-search-input"
              />
            </div>
          </div>

          <div class="flex flex-wrap gap-2 mb-6">
            <button
              @click="filterCategory = ''"
              :class="categoryFilterClass('')"
            >
              Semua
            </button>
            <button
              v-for="cat in businessStore.getCategories()"
              :key="cat"
              @click="filterCategory = cat"
              :class="categoryFilterClass(cat)"
            >
              {{ cat }}
            </button>
          </div>

          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                  <tr class="bg-gray-50 border-b border-gray-100">
                    <th class="text-left px-6 py-4 font-semibold text-gray-600 w-12">No</th>
                    <th class="text-left px-6 py-4 font-semibold text-gray-600">Nama Usaha</th>
                    <th class="text-left px-6 py-4 font-semibold text-gray-600 hidden md:table-cell">Pemilik</th>
                    <th class="text-left px-6 py-4 font-semibold text-gray-600 hidden sm:table-cell">Kategori</th>
                    <th class="text-center px-6 py-4 font-semibold text-gray-600">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in filteredBusiness"
                    :key="item.id"
                    class="border-b border-gray-50 hover:bg-[#FAE7CB]/20 transition-colors duration-150"
                  >
                    <td class="px-6 py-4 text-gray-500 font-medium">{{ index + 1 }}</td>
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-3">
                        <img
                          v-if="item.foto?.utama"
                          :src="resolveImageUrl(item.foto.utama)"
                          :alt="item.namaUsaha"
                          class="w-10 h-10 rounded-lg object-cover flex-shrink-0 hidden sm:block"
                          loading="lazy"
                          decoding="async"
                        />
                        <div>
                          <p class="font-semibold text-gray-800">{{ item.namaUsaha }}</p>
                          <p class="text-xs text-gray-400 sm:hidden">{{ item.kategori }}</p>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-gray-600 hidden md:table-cell">{{ item.namaPemilik }}</td>
                    <td class="px-6 py-4 hidden sm:table-cell">
                      <span
                        :style="getCategoryLightStyle(item.kategori)"
                        class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold shadow-sm"
                      >
                        <CategoryIcon :name="item.kategori" class="w-3.5 h-3.5" />
                        {{ item.kategori }}
                      </span>
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex items-center justify-center gap-2">
                        <button
                          @click="openEditModal(item)"
                          class="p-2 rounded-lg text-[#FFC94D] hover:bg-[#FFC94D]/10 transition-colors duration-200"
                          title="Edit"
                        >
                          <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-5m-1.4-9.4a2 2 0 1 1 2.8 2.8L11.8 15H9v-2.8l8.6-8.6Z" />
                          </svg>
                        </button>
                        <button
                          @click="openDeleteModal(item)"
                          class="p-2 rounded-lg text-[#FA6781] hover:bg-[#FA6781]/10 transition-colors duration-200"
                          title="Hapus"
                        >
                          <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 7-.9 12.1A2 2 0 0 1 16.1 21H7.9a2 2 0 0 1-2-1.9L5 7m5 4v6m4-6v6m1-10V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="filteredBusiness.length === 0">
                    <td colspan="5" class="px-6 py-16 text-center">
                      <div class="flex flex-col items-center gap-3">
                        <svg class="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                        </svg>
                        <p class="text-gray-500 font-medium">Tidak ada Bisnis ditemukan</p>
                        <p class="text-sm text-gray-400">Coba ubah kata kunci pencarian atau filter kategori</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="px-6 py-4 bg-gray-50 border-t border-gray-100 text-sm text-gray-500">
              Menampilkan {{ filteredBusiness.length }} dari {{ businessStore.getAll().length }} Bisnis Terdatar
            </div>
          </div>
        </section>

        <section v-if="activeSection === 'categories'">
          <div class="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_24rem] gap-6">
            <article class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between gap-4">
                <div>
                  <h2 class="text-lg font-bold text-gray-800">Kategori Bisnis</h2>
                  <p class="text-sm text-gray-500 mt-1">Kelola kategori usaha warga dengan warna dan icon pilihan.</p>
                </div>
                <span class="text-sm font-semibold text-[#FFC94D] bg-[#FFC94D]/10 rounded-full px-3 py-1">
                  {{ businessStore.getCategories().length }} kategori
                </span>
              </div>

              <div class="divide-y divide-gray-100">
                <div
                  v-for="cat in businessStore.categoriesList"
                  :key="cat.name"
                  class="px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                >
                  <div class="flex items-center gap-3">
                    <div
                      class="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                      :style="{ backgroundColor: cat.color + '15', color: cat.color }"
                    >
                      <CategoryIcon :name="cat.name" class="w-5 h-5" />
                    </div>
                    <div>
                      <p class="font-semibold text-gray-800">{{ cat.name }}</p>
                      <p class="text-sm text-gray-500">{{ categoryUsage(cat.name) }} Bisnis Terdaftar</p>
                    </div>
                  </div>

                  <div class="flex items-center gap-2">
                    <button
                      @click="startEditCategory(cat)"
                      class="px-3 py-2 rounded-lg text-sm font-semibold text-[#FFC94D] hover:bg-[#FFC94D]/10 transition-colors cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      @click="removeCategory(cat.name)"
                      class="px-3 py-2 rounded-lg text-sm font-semibold text-[#FA6781] hover:bg-[#FA6781]/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                      :disabled="categoryUsage(cat.name) > 0"
                      :title="categoryUsage(cat.name) > 0 ? 'Kategori masih dipakai Salah satu Unit Bisnis' : 'Hapus kategori'"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            </article>

            <aside class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-fit max-h-[85vh] overflow-y-auto">
              <h2 class="text-lg font-bold text-gray-800 mb-4">
                {{ editingCategory ? 'Edit Kategori' : 'Tambah Kategori' }}
              </h2>
              <div class="space-y-5">
                <div>
                  <label class="form-label">Nama Kategori</label>
                  <input
                    v-model.trim="categoryFormName"
                    type="text"
                    class="form-input"
                    placeholder="Contoh: Elektronik"
                    @keyup.enter="saveCategory"
                  />
                </div>

                <div>
                  <label class="form-label">Pilih Warna Kategori</label>
                  <div class="flex flex-wrap gap-2 mb-3">
                    <button
                      v-for="color in colorPresets"
                      :key="color"
                      @click="categoryFormColor = color"
                      class="w-7 h-7 rounded-full border-2 transition-all duration-200 cursor-pointer"
                      :style="{ backgroundColor: color }"
                      :class="categoryFormColor === color ? 'border-gray-800 scale-110 shadow-sm' : 'border-transparent hover:scale-105'"
                    />
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="relative w-10 h-10 rounded-xl overflow-hidden border border-gray-200 shrink-0">
                      <input
                        v-model="categoryFormColor"
                        type="color"
                        class="absolute inset-0 w-full h-full p-0 border-0 cursor-pointer scale-150"
                      />
                    </div>
                    <span class="text-xs font-semibold text-gray-500 font-mono uppercase">{{ categoryFormColor }}</span>
                  </div>
                </div>

                <div>
                  <label class="form-label">Pilih Icon Template</label>
                  <div class="grid grid-cols-6 gap-2 max-h-48 overflow-y-auto p-2 border border-gray-100 rounded-xl bg-gray-50/50">
                    <button
                      v-for="icon in availableIcons"
                      :key="icon"
                      @click="categoryFormIcon = icon"
                      class="p-2 rounded-lg border flex items-center justify-center transition-all duration-200 cursor-pointer"
                      :class="categoryFormIcon === icon
                        ? 'border-[#FFC94D] bg-[#FFC94D]/10 text-[#FFC94D] font-bold scale-105 shadow-sm'
                        : 'border-transparent bg-white hover:bg-gray-100 text-gray-500'"
                    >
                      <CategoryIcon :icon="icon" class="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <!-- Live Preview -->
                <div class="pt-4 border-t border-gray-100 flex flex-col items-center">
                  <span class="text-[10px] font-bold text-gray-400 mb-3 uppercase tracking-wider">Live Preview Badge</span>
                  <span
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm transition-all duration-300"
                    :style="{ backgroundColor: categoryFormColor + '15', color: categoryFormColor }"
                  >
                    <CategoryIcon :icon="categoryFormIcon" class="w-3.5 h-3.5" />
                    {{ categoryFormName || 'Nama Kategori' }}
                  </span>
                </div>

                <div class="flex items-center gap-2 pt-2">
                  <button
                    @click="saveCategory"
                    class="flex-1 px-4 py-2.5 rounded-xl bg-[#FFC94D] text-white text-sm font-semibold hover:bg-[#e6b03a] transition-colors cursor-pointer"
                  >
                    {{ editingCategory ? 'Simpan' : 'Tambah' }}
                  </button>
                  <button
                    v-if="editingCategory"
                    @click="cancelCategoryEdit"
                    class="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Batal
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <!-- Reports Section -->
        <section v-if="activeSection === 'reports'">
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between gap-4">
              <div>
                <h2 class="text-lg font-bold text-gray-800">Laporan Pengguna</h2>
                <p class="text-sm text-gray-500 mt-1">Daftar laporan kesalahan data atau toko tutup dari warga.</p>
              </div>
              <span class="text-sm font-semibold text-[#FA6781] bg-[#FA6781]/10 rounded-full px-3 py-1">
                {{ businessStore.reports?.length || 0 }} laporan
              </span>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                  <tr class="bg-gray-50 border-b border-gray-100">
                    <th class="text-left px-6 py-4 font-semibold text-gray-600">Tanggal</th>
                    <th class="text-left px-6 py-4 font-semibold text-gray-600">Nama Usaha</th>
                    <th class="text-left px-6 py-4 font-semibold text-gray-600">Tipe Laporan</th>
                    <th class="text-left px-6 py-4 font-semibold text-gray-600">Keterangan</th>
                    <th class="text-left px-6 py-4 font-semibold text-gray-600">Status</th>
                    <th class="text-center px-6 py-4 font-semibold text-gray-600">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="rep in businessStore.reports"
                    :key="rep.id"
                    class="border-b border-gray-50 hover:bg-[#FAE7CB]/20 transition-colors duration-150"
                  >
                    <td class="px-6 py-4 text-gray-500">
                      {{ new Date(rep.tanggal).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) }}
                    </td>
                    <td class="px-6 py-4 font-semibold text-gray-800">
                      {{ rep.namaUsaha }}
                    </td>
                    <td class="px-6 py-4">
                      <span
                        :class="rep.tipe === 'toko_tutup' ? 'bg-[#FA6781]/10 text-[#FA6781]' : 'bg-[#FFC94D]/20 text-[#c28c00]'"
                        class="px-2.5 py-1 rounded-full text-xs font-semibold"
                      >
                        {{ rep.tipe === 'toko_tutup' ? 'Toko Tutup' : 'Kesalahan Data' }}
                      </span>
                    </td>
                    <td class="px-6 py-4 text-gray-600 max-w-sm whitespace-normal break-words">
                      {{ rep.detail || '-' }}
                    </td>
                    <td class="px-6 py-4">
                      <span
                        :class="rep.status === 'resolved' ? 'bg-[#FFC94D]/10 text-[#FFC94D]' : 'bg-gray-100 text-gray-500'"
                        class="px-2.5 py-1 rounded-full text-xs font-semibold"
                      >
                        {{ rep.status === 'resolved' ? 'Selesai' : 'Baru' }}
                      </span>
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex items-center justify-center gap-2">
                        <button
                          v-if="rep.status === 'pending'"
                          @click="resolveReport(rep.id)"
                          class="px-3 py-1.5 rounded-lg bg-[#FFC94D]/10 text-[#FFC94D] hover:bg-[#FFC94D] hover:text-white transition-all text-xs font-bold"
                        >
                          Tandai Selesai
                        </button>
                        <button
                          @click="deleteReport(rep.id)"
                          class="p-1.5 rounded-lg text-[#FA6781] hover:bg-[#FA6781]/10 transition-colors"
                          title="Hapus Laporan"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 7-.9 12.1A2 2 0 0 1 16.1 21H7.9a2 2 0 0 1-2-1.9L5 7m5 4v6m4-6v6m1-10V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="!businessStore.reports || businessStore.reports.length === 0">
                    <td colspan="6" class="px-6 py-16 text-center">
                      <div class="flex flex-col items-center gap-3">
                        <svg class="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" />
                        </svg>
                        <p class="text-gray-500 font-medium">Tidak ada laporan masuk</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <!-- Owner Accounts Section -->
        <section v-if="activeSection === 'owners'">
          <div class="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_24rem] gap-6">
            <article class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between gap-4">
                <div>
                  <h2 class="text-lg font-bold text-gray-800">Akun Pemilik Usaha</h2>
                  <p class="text-sm text-gray-500 mt-1">Buatkan akses login untuk pemilik agar mereka bisa mengubah info bisnisnya sendiri.</p>
                </div>
                <span class="text-sm font-semibold text-[#FFC94D] bg-[#FFC94D]/10 rounded-full px-3 py-1">
                  {{ ownerStore.getAll().length }} akun
                </span>
              </div>

              <div class="divide-y divide-gray-100">
                <div
                  v-for="acc in ownerStore.getAll()"
                  :key="acc.id"
                  class="px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                >
                  <div class="flex items-center gap-3 min-w-0">
                    <div class="w-10 h-10 rounded-xl bg-[#FFC94D]/10 text-[#FFC94D] flex items-center justify-center font-bold shrink-0">
                      {{ (acc.nama || '?').charAt(0).toUpperCase() }}
                    </div>
                    <div class="min-w-0">
                      <p class="font-semibold text-gray-800 truncate">{{ acc.nama }}</p>
                      <p class="text-sm text-gray-500 truncate">{{ acc.email }}</p>
                      <p class="text-xs text-gray-400 mt-0.5">No. KTA: {{ acc.nomorKTA || '-' }}</p>
                      <p class="text-xs text-gray-400 mt-0.5">
                        {{ acc.businessIds.length }} bisnis terhubung{{ acc.businessIds.length ? ':' : '' }}
                        <span v-if="acc.businessIds.length" class="text-gray-500">{{ ownerBusinessNames(acc) }}</span>
                      </p>
                    </div>
                  </div>

                  <div class="flex items-center gap-2 shrink-0">
                    <button
                      @click="startEditOwner(acc)"
                      class="px-3 py-2 rounded-lg text-sm font-semibold text-[#FFC94D] hover:bg-[#FFC94D]/10 transition-colors cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      @click="removeOwner(acc)"
                      class="px-3 py-2 rounded-lg text-sm font-semibold text-[#FA6781] hover:bg-[#FA6781]/10 transition-colors cursor-pointer"
                    >
                      Hapus
                    </button>
                  </div>
                </div>

                <div v-if="!ownerStore.getAll().length" class="px-6 py-16 text-center">
                  <div class="flex flex-col items-center gap-3">
                    <svg class="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m14-11 2 2 4-4M11 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
                    </svg>
                    <p class="text-gray-500 font-medium">Belum ada akun pemilik usaha</p>
                  </div>
                </div>
              </div>
            </article>

            <aside class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-fit max-h-[85vh] overflow-y-auto">
              <h2 class="text-lg font-bold text-gray-800 mb-4">
                {{ editingOwnerId ? 'Edit Akun Pemilik' : 'Tambah Akun Pemilik' }}
              </h2>
              <div class="space-y-5">
                <div>
                  <label class="form-label">Nama Pemilik</label>
                  <input
                    v-model.trim="ownerForm.nama"
                    type="text"
                    class="form-input"
                    placeholder="Nama lengkap pemilik usaha"
                  />
                </div>

                <div>
                  <label class="form-label">Email</label>
                  <input
                    v-model.trim="ownerForm.email"
                    type="email"
                    class="form-input"
                    placeholder="email@contoh.com"
                  />
                </div>

                <div>
                  <label class="form-label">Nomor KTA</label>
                  <input
                    v-model.trim="ownerForm.nomorKTA"
                    type="text"
                    class="form-input"
                    placeholder="Nomor Kartu Tanda Anggota HIPMI (opsional)"
                  />
                </div>

                <div>
                  <label class="form-label">Password</label>
                  <PasswordInput
                    v-model="ownerForm.password"
                    input-class="form-input"
                    autocomplete="new-password"
                    :placeholder="editingOwnerId ? 'Kosongkan jika tidak diganti' : 'Buat password untuk akun ini'"
                  />
                  <p class="text-xs text-gray-400 mt-1.5">Bagikan email &amp; password ini langsung ke pemilik usaha. Password disimpan terenkripsi (hash), bukan teks asli.</p>
                </div>

                <div>
                  <label class="form-label">Bisnis yang Terhubung</label>
                  <div class="space-y-2 max-h-56 overflow-y-auto p-2 border border-gray-100 rounded-xl bg-gray-50/50">
                    <label
                      v-for="biz in businessStore.getAll()"
                      :key="biz.id"
                      class="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-white transition-colors"
                    >
                      <input
                        type="checkbox"
                        :value="biz.id"
                        v-model="ownerForm.businessIds"
                        class="w-4 h-4 rounded border-gray-300 text-[#FFC94D] focus:ring-[#FFC94D]"
                      />
                      <span class="text-sm text-gray-700 truncate">{{ biz.namaUsaha }}</span>
                    </label>
                    <p v-if="!businessStore.getAll().length" class="text-xs text-gray-400 px-3 py-2">Belum ada bisnis terdaftar.</p>
                  </div>
                </div>

                <div class="flex items-center gap-2 pt-2">
                  <button
                    @click="saveOwner"
                    class="flex-1 px-4 py-2.5 rounded-xl bg-[#FFC94D] text-white text-sm font-semibold hover:bg-[#e6b03a] transition-colors cursor-pointer"
                  >
                    {{ editingOwnerId ? 'Simpan' : 'Tambah Akun' }}
                  </button>
                  <button
                    v-if="editingOwnerId"
                    @click="cancelOwnerEdit"
                    class="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Batal
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section v-if="activeSection === 'settings'">
          <div class="max-w-2xl">
            <article class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div class="px-6 py-4 border-b border-gray-100">
                <h2 class="text-lg font-bold text-gray-800">Public Base URL Gambar</h2>
                <p class="text-sm text-gray-500 mt-1">
                  Domain yang dipakai untuk menampilkan foto yang diunggah lewat tombol upload. Mengubah nilai ini
                  langsung berlaku untuk SEMUA foto yang tersimpan sebagai path penyimpanan di seluruh aplikasi, tanpa
                  perlu mengedit data bisnis atau akun pemilik satu per satu kalau domain penyimpanan berganti lagi.
                </p>
              </div>
              <div class="p-6 space-y-4">
                <div v-if="!businessStore.publicBaseUrl" class="flex items-start gap-2 p-3 rounded-xl bg-[#FA6781]/10 text-[#FA6781] text-sm">
                  <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3Z" />
                  </svg>
                  <span>Belum diatur. Foto yang diunggah lewat tombol upload tidak akan tampil sampai nilai ini disimpan.</span>
                </div>

                <div>
                  <label class="form-label">Public Base URL</label>
                  <input
                    v-model.trim="publicBaseUrlInput"
                    type="url"
                    class="form-input"
                    placeholder="https://img.hipmibantul.site"
                    @keyup.enter="savePublicBaseUrl"
                  />
                  <p class="text-xs text-gray-400 mt-1.5">
                    Tanpa garis miring di akhir. Contoh hasil: <code class="text-gray-500">{{ (publicBaseUrlInput || 'https://img.hipmibantul.site') + '/uploads/2026-10-07/abc.webp' }}</code>
                  </p>
                </div>

                <div class="flex items-center gap-2 pt-2">
                  <button
                    @click="savePublicBaseUrl"
                    class="px-4 py-2.5 rounded-xl bg-[#FFC94D] text-white text-sm font-semibold hover:bg-[#e6b03a] transition-colors cursor-pointer"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </article>
          </div>
        </section>

      </main>
    </div>

    <Transition name="modal">
      <div
        v-if="showFormModal"
        class="fixed inset-0 z-[60] flex items-start justify-center p-4 overflow-y-auto"
      >
        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm" @click="closeFormModal" />

        <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 z-10">
          <div class="sticky top-0 bg-white rounded-t-2xl border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
            <h2 class="text-xl font-bold text-gray-800">
              {{ isEditing ? 'Edit Bisnis' : 'Tambah Bisnis Baru' }}
            </h2>
            <button
              @click="closeFormModal"
              class="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Tutup form"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="px-6 py-6 space-y-8 max-h-[calc(100vh-12rem)] overflow-y-auto">
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
                  <label class="form-label">Nama Pemilik <span class="text-[#FA6781]">*</span></label>
                  <OwnerNameSelect v-model="form.namaPemilik" placeholder="Masukkan nama pemilik" />
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
                  <textarea v-model="form.deskripsi" rows="3" class="form-input resize-none" placeholder="Tuliskan deskripsi Bisnis..."></textarea>
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
                  class="p-4 rounded-xl border border-gray-100 bg-gray-50/50 space-y-3"
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
                      <input
                        v-model="cab.latitude"
                        type="text"
                        inputmode="decimal"
                        class="form-input"
                        placeholder="Contoh: -7.8481"
                      />
                    </div>
                    <div>
                      <label class="form-label">Longitude</label>
                      <input
                        v-model="cab.longitude"
                        type="text"
                        inputmode="decimal"
                        class="form-input"
                        placeholder="Contoh: 110.3287"
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  @click="addCabangRow"
                  class="w-full px-4 py-2.5 rounded-xl border-2 border-dashed border-gray-200 text-gray-500 text-sm font-semibold hover:border-[#FFC94D] hover:text-[#FFC94D] transition-colors cursor-pointer"
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
                  class="p-4 border border-gray-100 rounded-xl bg-gray-50/30 space-y-2"
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
                      :id="`jam-input-${index}`"
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
                <button
                  @click="addJamOperasional"
                  class="add-inline-button"
                  type="button"
                >
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
                  class="p-4 border border-gray-200 rounded-xl bg-gray-50/50"
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
                <button
                  @click="addProduk"
                  class="add-inline-button"
                  type="button"
                >
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
                    : 'border-gray-200 hover:border-gray-300 text-gray-600'"
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
                    : 'border-gray-200 hover:border-gray-300 text-gray-600'"
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
                
                <!-- 20 Template Icon Selector Grid -->
                <div class="p-4 border border-gray-100 rounded-xl bg-gray-50/50">
                  <label class="block text-[11px] font-bold text-gray-400 dark:text-gray-550 uppercase tracking-wider mb-2.5">
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
                  <ImageUrlInput v-model="form.foto.utama" variant="hero" placeholder="https://example.com/foto-utama.jpg" />
                </div>
                <UrlList v-model="form.foto.menu" label="Foto Menu" />
                <UrlList v-model="form.foto.tempat" label="Foto Tempat" />
                <UrlList v-model="form.foto.produk" label="Foto Produk" />
              </div>
            </fieldset>
          </div>

          <div class="sticky bottom-0 bg-white rounded-b-2xl border-t border-gray-100 px-6 py-4 flex items-center justify-end gap-3">
            <button
              @click="closeFormModal"
              class="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium text-sm transition-colors"
            >
              Batal
            </button>
            <button
              @click="saveBusiness"
              class="px-6 py-2.5 rounded-xl bg-[#FFC94D] hover:bg-[#e6b03a] text-white font-semibold text-sm shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.97]"
            >
              {{ isEditing ? 'Simpan Perubahan' : 'Tambah Bisnis' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <Transition name="modal">
      <div
        v-if="showDeleteModal"
        class="fixed inset-0 z-[60] flex items-center justify-center p-4"
      >
        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm" @click="showDeleteModal = false" />

        <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-md z-10 p-6">
          <div class="flex flex-col items-center text-center">
            <div class="w-16 h-16 bg-[#FA6781]/10 rounded-full flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-[#FA6781]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M4.1 19h15.8L12 4 4.1 19Z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Hapus Bisnis?</h3>
            <p class="text-gray-500 mb-1">Apakah Anda yakin ingin menghapus</p>
            <p class="font-semibold text-gray-700 mb-6">"{{ deleteTarget?.namaUsaha }}"?</p>
            <p class="text-sm text-gray-400 mb-6">Tindakan ini tidak dapat dibatalkan.</p>
            <div class="flex gap-3 w-full">
              <button
                @click="showDeleteModal = false"
                class="flex-1 px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium text-sm transition-colors"
              >
                Batal
              </button>
              <button
                @click="confirmDelete"
                class="flex-1 px-5 py-2.5 rounded-xl bg-[#FA6781] hover:bg-[#e85a73] text-white font-semibold text-sm shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.97]"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <Transition name="toast">
      <div
        v-if="toast.show"
        class="fixed bottom-6 right-6 z-[70] flex items-center gap-3 bg-white border border-gray-100 shadow-lg rounded-xl px-5 py-3.5"
      >
        <div
          class="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
          :class="toast.type === 'success' ? 'bg-[#FFC94D]' : 'bg-[#FA6781]'"
        >
          <svg v-if="toast.type === 'success'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="m5 13 4 4L19 7" />
          </svg>
          <span v-else>!</span>
        </div>
        <p class="text-sm font-medium text-gray-700">{{ toast.message }}</p>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { computed, defineComponent, h, nextTick, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import CategoryIcon from '../components/CategoryIcon.vue'
import FacilityIcon from '../components/FacilityIcon.vue'
import PasswordInput from '../components/PasswordInput.vue'
import ImageUrlInput from '../components/ImageUrlInput.vue'
import UrlList from '../components/UrlList.vue'
import OwnerNameSelect from '../components/OwnerNameSelect.vue'
import { businessStore, getCategoryLightStyle, sanitizeUrl, resolveImageUrl } from '../data/businessData'
import { ownerStore } from '../data/ownerData'
import { extractLatLng, normalizeMapEmbed, isValidGoogleMapsUrl } from '../utils/maps'

const router = useRouter()
const sidebarOpen = ref(false)
const activeSection = ref('dashboard')
const publicBaseUrlInput = ref(businessStore.publicBaseUrl || '')

// businessStore.publicBaseUrl starts empty and is filled in asynchronously once
// the meta/config Firestore doc loads (or changes from another tab) - keep the
// input in sync with it.
watch(() => businessStore.publicBaseUrl, (value) => {
  publicBaseUrlInput.value = value || ''
})
const searchQuery = ref('')
const filterCategory = ref('')
const isMobile = ref(false)
const showFormModal = ref(false)
const showDeleteModal = ref(false)
const isEditing = ref(false)
const editingId = ref(null)
const deleteTarget = ref(null)
const categoryFormName = ref('')
const categoryFormIcon = ref('grid')
const categoryFormColor = ref('#FFC94D')
const editingCategory = ref('')
const editingOwnerId = ref(null)
const ownerForm = reactive({ nama: '', email: '', nomorKTA: '', password: '', businessIds: [] })
const toast = reactive({ show: false, message: '', type: 'success' })
const adminEmail = sessionStorage.getItem('business-admin-email') || 'Admin'

const availableIcons = [
  'utensils', 'coffee', 'shirt', 'palette', 'wrench', 'shopping-bag',
  'car', 'home', 'plug', 'scissors', 'heart', 'book',
  'dumbbell', 'gamepad', 'paw', 'leaf', 'truck', 'music',
  'camera', 'briefcase', 'grid'
]

const colorPresets = [
  '#FA6781', '#FFC94D', '#18933C', '#E0A96D', '#4A5568',
  '#4F46E5', '#0EA5E9', '#D946EF', '#F43F5E', '#14B8A6',
  '#3B82F6', '#10B981', '#F97316', '#8B5CF6', '#EC4899',
  '#EF4444', '#06B6D4', '#84CC16', '#172554', '#78350F',
  '#022C22', '#475569', '#A21CAF', '#65A30D'
]

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
  
  // Title case capitalization for custom facilities
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

const stats = computed(() => {
  const all = businessStore.getAll()
  const totalProduk = all.reduce((sum, item) => sum + (item.produk?.length || 0), 0)
  return {
    totalBusiness: all.length,
    totalKategori: businessStore.getCategories().length,
    totalProduk
  }
})

const pageTitle = computed(() => {
  const titles = {
    dashboard: 'Dashboard Overview',
    manage: 'Kelola Bisnis',
    categories: 'Kelola Kategori',
    reports: 'Laporan Pengguna',
    owners: 'Akun Pemilik Usaha',
    settings: 'Pengaturan'
  }
  return titles[activeSection.value] || 'Bisnis Admin'
})

const pendingReportsCount = computed(() => {
  return businessStore.reports?.filter(r => r.status === 'pending').length || 0
})

const categoryDistribution = computed(() => {
  const all = businessStore.getAll()
  const styles = {
    Makanan: 'bg-[#FA6781]/15 text-[#FA6781]',
    Minuman: 'bg-[#FFC94D]/15 text-[#FFC94D]',
    Fashion: 'bg-[#FFC94D]/20 text-[#9a7600]',
    Kerajinan: 'bg-[#FAE7CB] text-[#8a5f27]',
    Jasa: 'bg-slate-100 text-slate-700'
  }

  return businessStore.getCategories().map(cat => ({
    name: cat,
    count: all.filter(item => item.kategori === cat).length,
    bgClass: styles[cat] || 'bg-gray-100 text-gray-600'
  }))
})

const filteredBusiness = computed(() => {
  let list = businessStore.getAll()
  if (filterCategory.value) {
    list = list.filter(item => item.kategori === filterCategory.value)
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(item =>
      item.namaUsaha.toLowerCase().includes(q) ||
      item.namaPemilik.toLowerCase().includes(q) ||
      item.kategori.toLowerCase().includes(q)
    )
  }
  return list
})

function setSection(section) {
  activeSection.value = section
  sidebarOpen.value = false
}

function navButtonClass(section) {
  return [
    'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200',
    activeSection.value === section
      ? 'bg-white/25 text-white shadow-sm font-semibold'
      : 'text-white/80 hover:bg-white/10 hover:text-white'
  ]
}

function categoryFilterClass(category) {
  return [
    'px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
    filterCategory.value === category
      ? 'bg-[#FFC94D] text-white shadow-sm'
      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
  ]
}

function categoryBadgeClass(kategori) {
  const map = {
    Makanan: 'bg-orange-100 text-orange-700',
    Minuman: 'bg-blue-100 text-blue-700',
    Fashion: 'bg-yellow-100 text-yellow-800',
    Kerajinan: 'bg-purple-100 text-purple-700',
    Jasa: 'bg-slate-100 text-slate-700'
  }
  return map[kategori] || 'bg-gray-100 text-gray-700'
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
  
  // Handle Backspace
  if (event.key === 'Backspace') {
    event.preventDefault()
    
    // If text is selected, reset to default template
    if (input.selectionStart !== input.selectionEnd) {
      form.jamOperasional[index].jam = '00:00 - 00:00'
      nextTick(() => {
        input.setSelectionRange(0, 0)
      })
      return
    }
    
    let start = input.selectionStart
    if (start === 0) return
    
    // Move backward, skipping separators
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

  // Allow standard navigation keys
  const navKeys = ['Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter']
  if (navKeys.includes(event.key) || event.ctrlKey || event.metaKey) {
    return
  }

  // Handle Digits
  if (/^\d$/.test(event.key)) {
    event.preventDefault()
    
    // If text is selected, reset and replace first digit
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
    
    // Skip separators
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
    const nextInput = document.getElementById(`jam-input-${index}`)
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

function resetForm() {
  Object.assign(form, getEmptyForm())
}

function openAddModal() {
  isEditing.value = false
  editingId.value = null
  resetForm()
  facilityIconMap.value = {}
  selectedCustomIcon.value = 'sparkles'
  dynamicFacilities.value = [...allFacilities]
  showFormModal.value = true
}

function openEditModal(item) {
  isEditing.value = true
  editingId.value = item.id
  facilityIconMap.value = {}
  selectedCustomIcon.value = 'sparkles'
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
  showFormModal.value = true
}

function closeFormModal() {
  showFormModal.value = false
  setTimeout(resetForm, 300)
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
  if (
    !form.namaUsaha.trim() ||
    !form.namaPemilik.trim() ||
    !form.kategori ||
    !form.cabang.length ||
    form.cabang.some(cab => !cab.label.trim() || !cab.alamat.trim()) ||
    !form.deskripsi.trim() ||
    !form.foto.utama.trim()
  ) {
    showToast('Mohon lengkapi field yang wajib diisi (Nama Usaha, Pemilik, Kategori, Nama & Alamat tiap Cabang, Deskripsi, dan Foto Utama).', 'error')
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
      // Validate Google Maps URL/embed if that's what was provided instead
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
    namaPemilik: form.namaPemilik.trim(),
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

  if (isEditing.value) {
    await businessStore.update(editingId.value, data)
    showToast('Bisnis berhasil diperbarui.')
  } else {
    await businessStore.add(data)
    showToast('Bisnis baru berhasil ditambahkan.')
  }

  closeFormModal()
}

function openDeleteModal(item) {
  deleteTarget.value = item
  showDeleteModal.value = true
}

async function confirmDelete() {
  if (deleteTarget.value) {
    await businessStore.delete(deleteTarget.value.id)
    showToast('Bisnis berhasil dihapus.')
  }
  showDeleteModal.value = false
  deleteTarget.value = null
}

async function resolveReport(id) {
  const ok = await businessStore.resolveReport(id)
  if (ok) {
    showToast('Laporan berhasil ditandai selesai.')
  }
}

async function deleteReport(id) {
  const ok = await businessStore.deleteReport(id)
  if (ok) {
    showToast('Laporan berhasil dihapus.')
  }
}

function showToast(message, type = 'success') {
  toast.show = true
  toast.message = message
  toast.type = type
  setTimeout(() => { toast.show = false }, 3000)
}

async function savePublicBaseUrl() {
  await businessStore.setPublicBaseUrl(publicBaseUrlInput.value)
  showToast('Public Base URL berhasil disimpan.')
}

function categoryUsage(category) {
  return businessStore.getAll().filter(item => item.kategori === category).length
}

function startEditCategory(categoryObj) {
  editingCategory.value = categoryObj.name
  categoryFormName.value = categoryObj.name
  categoryFormIcon.value = categoryObj.icon || 'grid'
  categoryFormColor.value = categoryObj.color || '#FFC94D'
}

function cancelCategoryEdit() {
  editingCategory.value = ''
  categoryFormName.value = ''
  categoryFormIcon.value = 'grid'
  categoryFormColor.value = '#FFC94D'
}

async function saveCategory() {
  if (!categoryFormName.value.trim()) {
    showToast('Nama kategori wajib diisi.', 'error')
    return
  }

  const categoryData = {
    name: categoryFormName.value.trim(),
    icon: categoryFormIcon.value,
    color: categoryFormColor.value
  }

  let ok = false
  if (editingCategory.value) {
    ok = await businessStore.updateCategory(editingCategory.value, categoryData)
    showToast(ok ? 'Kategori berhasil diperbarui.' : 'Kategori sudah ada atau tidak valid.', ok ? 'success' : 'error')
  } else {
    ok = await businessStore.addCategory(categoryData)
    showToast(ok ? 'Kategori berhasil ditambahkan.' : 'Kategori sudah ada atau tidak valid.', ok ? 'success' : 'error')
  }

  if (ok) cancelCategoryEdit()
}

async function removeCategory(category) {
  const removed = await businessStore.deleteCategory(category)
  showToast(removed ? 'Kategori berhasil dihapus.' : 'Kategori masih dipakai Bisnis.', removed ? 'success' : 'error')
  if (editingCategory.value === category) cancelCategoryEdit()
}

function ownerBusinessNames(acc) {
  return acc.businessIds
    .map(id => businessStore.getById(id)?.namaUsaha)
    .filter(Boolean)
    .join(', ')
}

function resetOwnerForm() {
  ownerForm.nama = ''
  ownerForm.email = ''
  ownerForm.nomorKTA = ''
  ownerForm.password = ''
  ownerForm.businessIds = []
}

function startEditOwner(acc) {
  editingOwnerId.value = acc.id
  ownerForm.nama = acc.nama
  ownerForm.email = acc.email
  ownerForm.nomorKTA = acc.nomorKTA || ''
  ownerForm.password = ''
  ownerForm.businessIds = [...acc.businessIds]
}

function cancelOwnerEdit() {
  editingOwnerId.value = null
  resetOwnerForm()
}

async function saveOwner() {
  const nama = ownerForm.nama.trim()
  const email = ownerForm.email.trim()

  if (!nama || !email) {
    showToast('Nama dan email wajib diisi.', 'error')
    return
  }

  if (!editingOwnerId.value && !ownerForm.password.trim()) {
    showToast('Password wajib diisi untuk akun baru.', 'error')
    return
  }

  if (ownerStore.emailTaken(email, editingOwnerId.value)) {
    showToast('Email ini sudah dipakai akun pemilik lain.', 'error')
    return
  }

  if (editingOwnerId.value) {
    await ownerStore.update(editingOwnerId.value, {
      nama,
      email,
      nomorKTA: ownerForm.nomorKTA.trim(),
      password: ownerForm.password.trim(),
      businessIds: [...ownerForm.businessIds]
    })
    showToast('Akun pemilik berhasil diperbarui.')
  } else {
    await ownerStore.add({
      nama,
      email,
      nomorKTA: ownerForm.nomorKTA.trim(),
      password: ownerForm.password.trim(),
      businessIds: [...ownerForm.businessIds]
    })
    showToast('Akun pemilik baru berhasil dibuat.')
  }

  cancelOwnerEdit()
}

async function removeOwner(acc) {
  await ownerStore.delete(acc.id)
  showToast('Akun pemilik berhasil dihapus.')
  if (editingOwnerId.value === acc.id) cancelOwnerEdit()
}

function logout() {
  sessionStorage.removeItem('business-admin-auth')
  sessionStorage.removeItem('business-admin-email')
  router.replace({ name: 'AdminLogin' })
}

function checkMobile() {
  isMobile.value = window.innerWidth < 1024
  if (!isMobile.value) sidebarOpen.value = false
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

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
.stat-card {
  background: white;
  border: 1px solid #f3f4f6;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 1px 2px rgb(15 23 42 / 0.04);
  transition: box-shadow 0.2s ease;
}

.stat-card:hover {
  box-shadow: 0 8px 24px rgb(15 23 42 / 0.08);
}

.stat-icon,
.legend-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.legend-icon {
  width: 2rem;
  height: 2rem;
  background: rgb(89 178 146 / 0.1);
  color: #FFC94D;
}

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
  box-shadow: 0 0 0 2px rgba(89, 178, 146, 0.4);
  border-color: #FFC94D;
}

.admin-search-input {
  padding-left: 2.75rem !important;
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

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

.fade-enter-active,
.fade-leave-active,
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to,
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active > div:last-child,
.modal-leave-active > div:last-child {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from > div:last-child,
.modal-leave-to > div:last-child {
  transform: scale(0.95) translateY(10px);
  opacity: 0;
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

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background-color: #9ca3af;
}
</style>

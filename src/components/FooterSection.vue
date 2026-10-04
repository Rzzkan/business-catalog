<template>
  <footer class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
    <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 relative">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <div class="lg:col-span-1">
          <div class="flex items-center gap-2 mb-4">
            <img src="/logo.svg" alt="UMKMHub Logo" class="w-10 h-10 object-contain" />
            <span class="text-lg font-bold">UMKM<span class="text-primary">Hub</span></span>
          </div>
          <p class="text-gray-400 text-sm leading-relaxed">
            Platform E-Catalog untuk UMKM Indonesia. Temukan dan dukung usaha mikro, kecil, dan menengah di sekitarmu.
          </p>
        </div>

        <div>
          <h4 class="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">Navigasi</h4>
          <ul class="space-y-3">
            <li>
              <router-link to="/" class="footer-link">
                <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
                Beranda
              </router-link>
            </li>
            <li>
              <router-link to="/search" class="footer-link">
                <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
                Katalog UMKM
              </router-link>
            </li>
            <li>
              <router-link to="/syarat-ketentuan" class="footer-link">
                <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
                Syarat & Ketentuan
              </router-link>
            </li>
            <li>
              <router-link to="/kebijakan-privasi" class="footer-link">
                <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
                Kebijakan Privasi
              </router-link>
            </li>
            <li>
              <router-link to="/achievements" class="footer-link">
                <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
                Achievements
              </router-link>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">Kategori</h4>
          <ul class="space-y-3">
            <li v-for="cat in categories" :key="cat">
              <router-link :to="{ name: 'SearchResult', query: { q: cat } }" class="footer-link">
                <CategoryIcon :name="cat" class="w-4 h-4" />
                {{ cat }}
              </router-link>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">Kontak</h4>
          <ul class="space-y-3 text-sm text-gray-400">
            <li class="flex items-start gap-2">
              <svg class="w-4 h-4 text-primary mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10.5h.01" />
              </svg>
              <span>Indonesia</span>
            </li>
            <li class="flex items-start gap-2">
              <svg class="w-4 h-4 text-primary mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 6 8 6 8-6" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16v12H4z" />
              </svg>
              <span>info@umkmhub.id</span>
            </li>
            <li class="flex items-start gap-2">
              <svg class="w-4 h-4 text-primary mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.7.6 2.5a2 2 0 0 1-.5 2.1L8 9.5a16 16 0 0 0 6.5 6.5l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.6.5 2.5.6a2 2 0 0 1 1.7 2Z" />
              </svg>
              <span>+62 812-0000-0000</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-gray-500 text-sm">
          &copy; {{ new Date().getFullYear() }} UMKMHub. Mendukung UMKM Indonesia.
        </p>
        <p class="text-gray-600 text-xs">
          Dibuat untuk kemajuan UMKM Indonesia.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { umkmStore } from '../data/umkmData'
import CategoryIcon from './CategoryIcon.vue'

const categories = computed(() => umkmStore.getCategories())
</script>

<style scoped>
.footer-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: rgb(156 163 175);
  font-size: 0.875rem;
  transition: color 0.2s ease, transform 0.2s ease;
}

.footer-link:hover {
  color: var(--color-primary);
  transform: translateX(0.25rem);
}
</style>

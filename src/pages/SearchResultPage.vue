<script setup>
import { useRoute, useRouter } from 'vue-router'
import { umkmStore, getCategoryStyle } from '../data/umkmData'
import CategoryIcon from '../components/CategoryIcon.vue'
import { computed, ref, watch, nextTick, onBeforeUnmount } from 'vue'
import { useGravity } from '../composables/useGravity'

const route = useRoute()
const router = useRouter()

const query = computed(() => route.query.q || '')
const searchInput = ref('')
const easterEggClass = ref('')
const rootRef = ref(null)

// Easter egg "faiz sussy" — komponen menggantung & berbobot (tekan Escape untuk kembali) 🪐
const { activate: activateGravity, deactivate: deactivateGravity } = useGravity()
const GRAVITY_PHRASES = ['faiz sussy', 'faiz sus', 'faizsussy']
const isGravityEgg = computed(() => GRAVITY_PHRASES.includes((query.value || '').trim().toLowerCase()))

let gravityTimer = null
function startGravity() {
  localStorage.setItem('achievement_gravity', 'true')
  if (gravityTimer) clearTimeout(gravityTimer)
  // Tunggu kartu ter-render & transisi masuk halaman selesai sebelum memotret posisi elemen
  nextTick(() => {
    gravityTimer = setTimeout(() => {
      if (!rootRef.value || !isGravityEgg.value) return
      const els = Array.from(rootRef.value.querySelectorAll('[data-grav]'))
      activateGravity(els)
    }, 420)
  })
}

function stopGravity() {
  if (gravityTimer) {
    clearTimeout(gravityTimer)
    gravityTimer = null
  }
  deactivateGravity()
}

onBeforeUnmount(() => {
  if (gravityTimer) clearTimeout(gravityTimer)
})

watch(query, (newQuery) => {
  const q = (newQuery || '').trim().toLowerCase()

  if (GRAVITY_PHRASES.includes(q)) {
    easterEggClass.value = ''
    startGravity()
    return
  }
  stopGravity()

  if (q === '67' || q === '6-7' || q === 'six seven') {
    easterEggClass.value = 'animate-egg-67'
    localStorage.setItem('achievement_67', 'true')
    setTimeout(() => {
      if (easterEggClass.value === 'animate-egg-67') {
        easterEggClass.value = ''
      }
    }, 4000)
  } else if (q === 'do a barrel roll') {
    easterEggClass.value = 'animate-barrel-roll'
    localStorage.setItem('achievement_barrel_roll', 'true')
    setTimeout(() => {
      if (easterEggClass.value === 'animate-barrel-roll') {
        easterEggClass.value = ''
      }
    }, 4000)
  } else {
    easterEggClass.value = ''
  }
}, { immediate: true })
const selectedCategory = ref('Semua')
const sortBy = ref('nama-az')

const categories = computed(() => ['Semua', ...umkmStore.getCategories()])

const baseResults = computed(() =>
  query.value ? umkmStore.search(query.value) : umkmStore.getAll()
)

const filteredResults = computed(() => {
  let items = baseResults.value
  if (selectedCategory.value !== 'Semua') {
    items = items.filter(u => u.kategori === selectedCategory.value)
  }
  return items
})

const results = computed(() => {
  const items = [...filteredResults.value]
  switch (sortBy.value) {
    case 'nama-za':
      return items.sort((a, b) => b.namaUsaha.localeCompare(a.namaUsaha))
    case 'kategori':
      return items.sort((a, b) => a.kategori.localeCompare(b.kategori))
    case 'nama-az':
    default:
      return items.sort((a, b) => a.namaUsaha.localeCompare(b.namaUsaha))
  }
})

function handleSearch() {
  const q = searchInput.value.trim()
  router.push({ name: 'SearchResult', query: q ? { q } : {} })
  searchInput.value = ''
}

function goToDetail(id) {
  router.push({ name: 'UmkmDetail', params: { id } })
}

function goHome() {
  router.push({ name: 'Home' })
}

function showAllUmkm() {
  selectedCategory.value = 'Semua'
  router.push({ name: 'SearchResult' })
}

function truncate(text, maxLength = 100) {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trimEnd() + '...'
}
</script>

<template>
  <div
    ref="rootRef"
    class="min-h-screen bg-gradient-to-br from-[#FAE7CB]/30 via-white to-[#FFC94D]/5 dark:from-[#13100a] dark:via-[#0a0a0a] dark:to-[#07130f] pt-16 lg:pt-20 transition-colors duration-300"
    :class="easterEggClass"
  >
    <header class="bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md border-b border-[#FFC94D]/10 dark:border-white/5 transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div class="flex items-start sm:items-center gap-3 mb-4">
          <button
            data-grav
            @click="goHome"
            class="shrink-0 mt-1 sm:mt-0 w-9 h-9 flex items-center justify-center rounded-xl bg-[#FFC94D]/10 dark:bg-[#FFC94D]/20 text-[#FFC94D] hover:bg-[#FFC94D] hover:text-white dark:hover:text-black transition-all duration-200 cursor-pointer"
            aria-label="Kembali ke beranda"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div class="min-w-0">
            <h1 v-if="query" data-grav class="text-lg sm:text-xl font-bold text-gray-800 dark:text-white truncate">
              Hasil pencarian untuk "<span class="text-[#FFC94D]">{{ query }}</span>"
            </h1>
            <h1 v-else data-grav class="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
              Semua UMKM
            </h1>
            <p data-grav class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              <span class="font-semibold text-[#FFC94D]">{{ results.length }}</span> UMKM ditemukan
            </p>
          </div>
        </div>

        <form data-grav @submit.prevent="handleSearch" class="mb-4">
          <div class="relative flex items-center">
            <svg class="absolute left-3 w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
            </svg>
            <input
              v-model="searchInput"
              type="text"
              :placeholder="query ? 'Cari lagi...' : 'Cari UMKM...'"
              class="w-full pl-10 pr-24 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50/80 dark:bg-[#161a24] text-sm text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFC94D]/40 focus:border-[#FFC94D] transition-all duration-200"
            />
            <button
              type="submit"
              class="absolute right-1.5 px-4 py-1.5 rounded-lg bg-[#FFC94D] text-white text-sm font-medium hover:bg-[#e6b03a] active:scale-95 transition-all duration-150 cursor-pointer"
            >
              Cari
            </button>
          </div>
        </form>

        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div class="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <button
              v-for="cat in categories"
              :key="cat"
              data-grav
              @click="selectedCategory = cat"
              :class="[
                'shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer',
                selectedCategory === cat
                  ? 'bg-[#FFC94D] text-white shadow-md shadow-[#FFC94D]/25'
                  : 'bg-white dark:bg-[#161a24] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/5 hover:border-[#FFC94D]/40 hover:text-[#FFC94D] dark:hover:text-[#FFC94D]'
              ]"
            >
              <CategoryIcon :name="cat" class="w-3.5 h-3.5" />
              {{ cat }}
            </button>
          </div>

          <div data-grav class="flex items-center gap-2 shrink-0">
            <label class="text-xs text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">Urutkan:</label>
            <select
              v-model="sortBy"
              class="text-sm border border-gray-200 dark:border-white/10 rounded-lg px-2.5 py-1.5 bg-white dark:bg-[#161a24] text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FFC94D]/30 focus:border-[#FFC94D] transition-all duration-200 cursor-pointer"
            >
              <option value="nama-az">Nama A-Z</option>
              <option value="nama-za">Nama Z-A</option>
              <option value="kategori">Kategori</option>
            </select>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div
        v-if="results.length > 0"
        class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6"
      >
        <article
          v-for="umkm in results"
          :key="umkm.id"
          class="group bg-white dark:bg-[#161a24] rounded-2xl overflow-hidden border border-gray-100 dark:border-white/5 shadow-sm dark:shadow-black/40 hover:shadow-xl hover:shadow-[#FFC94D]/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          @click="goToDetail(umkm.id)"
        >
          <div class="relative h-32 sm:h-48 overflow-hidden">
            <img
              :src="umkm.foto.utama"
              :alt="umkm.namaUsaha"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
              decoding="async"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
            <div class="absolute top-2 left-2 sm:top-3 sm:left-3">
              <span
                class="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold shadow-lg"
                :style="getCategoryStyle(umkm.kategori)"
              >
                <CategoryIcon :name="umkm.kategori" class="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span class="hidden sm:inline">{{ umkm.kategori }}</span>
              </span>
            </div>
          </div>

          <div class="p-3 sm:p-5">
            <h3 class="font-bold text-gray-800 dark:text-white text-sm sm:text-base leading-snug mb-1 group-hover:text-[#FFC94D] transition-colors duration-200 line-clamp-1">
              {{ umkm.namaUsaha }}
            </h3>

            <div class="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2 sm:mb-3">
              <svg class="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7Z" />
              </svg>
              <span class="truncate">{{ umkm.namaPemilik }}</span>
            </div>

            <p class="text-[10px] sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-3 sm:mb-4 line-clamp-2">
              {{ truncate(umkm.deskripsi) }}
            </p>

            <button
              @click.stop="goToDetail(umkm.id)"
              class="w-full flex items-center justify-center gap-1.5 sm:gap-2 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl bg-[#FFC94D]/10 dark:bg-[#FFC94D]/20 text-[#FFC94D] text-xs sm:text-sm font-semibold hover:bg-[#FFC94D] hover:text-white dark:hover:text-black active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              Lihat Detail
              <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </article>
      </div>

      <div
        v-else
        class="flex flex-col items-center justify-center py-16 sm:py-24 text-center animate-fade-in"
      >
        <div data-grav class="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#FAE7CB]/60 dark:bg-[#FAE7CB]/10 flex items-center justify-center mb-6">
          <svg class="w-16 h-16 sm:w-20 sm:h-20 text-[#FA6781]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
            <circle cx="12" cy="12" r="10" />
            <path stroke-linecap="round" d="M8 9.5V9m8 .5V9" />
            <path stroke-linecap="round" d="M8 16c1-1.333 2.667-2 4-2s3 .667 4 2" />
          </svg>
        </div>

        <h2 data-grav class="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Tidak ada UMKM yang ditemukan
        </h2>
        <p data-grav class="text-gray-500 dark:text-gray-400 text-sm sm:text-base max-w-md mb-2">
          Kami tidak menemukan UMKM yang cocok dengan pencarian
          <span v-if="query" class="font-semibold text-[#FA6781]">"{{ query }}"</span>.
        </p>
        <p data-grav class="text-gray-400 dark:text-gray-500 text-sm mb-8">
          Coba gunakan kata kunci lain atau jelajahi kategori yang tersedia.
        </p>

        <div class="flex flex-col sm:flex-row items-center gap-3">
          <button
            data-grav
            @click="goHome"
            class="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#FFC94D] text-white font-semibold text-sm hover:bg-[#e6b03a] active:scale-95 shadow-lg shadow-[#FFC94D]/25 transition-all duration-200 cursor-pointer"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l9-9 9 9M5 10v10h14V10" />
            </svg>
            Kembali ke Beranda
          </button>
          <button
            data-grav
            @click="showAllUmkm"
            class="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white dark:bg-[#161a24] text-[#FFC94D] font-semibold text-sm border-2 border-[#FFC94D]/30 dark:border-white/10 hover:border-[#FFC94D] hover:bg-[#FFC94D]/5 dark:hover:bg-[#FFC94D]/10 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            Lihat Semua UMKM
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
@keyframes egg67 {
  0%   { transform: skewY(0deg) scale(1); }
  10%  { transform: skewY(10deg) scale(1.04); }
  25%  { transform: skewY(-10deg) scale(1.04); }
  40%  { transform: skewY(10deg) scale(1.04); }
  55%  { transform: skewY(-10deg) scale(1.04); }
  70%  { transform: skewY(10deg) scale(1.04); }
  85%  { transform: skewY(-10deg) scale(1.04); }
  100% { transform: skewY(0deg) scale(1); }
}

.animate-egg-67 {
  animation: egg67 1.8s cubic-bezier(0.6, 0.43, 0.68, 1.11) 1;
  transform-origin: center center;
}

@keyframes barrelRoll {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.animate-barrel-roll {
  animation: barrelRoll 2.5s cubic-bezier(0.25, 1, 0.5, 1);
  transform-origin: center center;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
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
</style>

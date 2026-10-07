<template>
  <div>
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10">
      <div class="absolute inset-0 bg-gradient-to-br from-cream-light via-white to-cream dark:from-[#0a0a0a] dark:via-[#11131a] dark:to-[#161922] transition-colors duration-300"></div>
      <div class="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-300 brand-grid-glow pointer-events-none" aria-hidden="true"></div>

      <div class="relative w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="rounded-3xl p-7 sm:p-10 lg:p-16 xl:p-20 lg:min-h-[calc(100vh-7rem)] lg:flex lg:flex-col lg:justify-center">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight mb-6">
            <span class="text-gray-900 dark:text-white transition-colors duration-300">Jelajahi Unit Bisnis Anggota </span>
            <span
              @click="handleEasterEgg"
              class="gradient-text cursor-pointer select-none active:scale-95 inline-block transition-transform duration-100"
              title="Touch me"
            >
              BPC HIPMI BANTUL
            </span>
            <br />
            <span class="text-gray-900 dark:text-white transition-colors duration-300">di Sekitarmu</span>
          </h1>

          <p class="text-gray-500 dark:text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto mb-10 leading-relaxed transition-colors duration-300">
            Berbagai usaha mikro, kecil, dan menengah lokal dari kuliner, minuman, sampai jasa harian.
          </p>

          <div
            class="max-w-3xl sm:max-w-4xl lg:max-w-5xl mx-auto mb-6 transition-all duration-500 ease-out"
            :class="searchState.docked ? 'opacity-0 -translate-y-4 scale-95 pointer-events-none' : 'opacity-100 translate-y-0 scale-100'"
          >
            <form class="relative group" @submit.prevent="handleSearch">
              <div class="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-coral rounded-2xl opacity-20 group-hover:opacity-40 blur-lg transition-opacity duration-500"></div>
              <div class="relative flex items-center bg-white dark:bg-[#161a24] rounded-2xl shadow-lg border border-transparent dark:border-white/5 transition-all duration-300">
                <div class="hidden sm:block pl-5 pr-2 text-gray-400">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                  </svg>
                </div>
                <input
                  v-model="searchState.query"
                  type="text"
                  :placeholder="placeholderText"
                  class="flex-1 py-4 pl-5 sm:pl-3 pr-3 bg-transparent text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none text-base sm:text-lg min-w-0 transition-colors duration-300"
                />
                <button
                  v-if="searchState.query"
                  type="button"
                  @click="searchState.query = ''"
                  class="p-2 mr-1 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Kosongkan pencarian"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
                <button
                  type="submit"
                  class="sm:hidden mr-2 p-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white flex items-center justify-center shadow-md shadow-primary/20 active:scale-95 transition-all"
                  aria-label="Cari"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              @click="handleSearch"
              class="hidden sm:flex w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-white text-base bg-gradient-to-r from-primary to-primary-dark hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 items-center justify-center gap-2"
            >
              Cari Bisnis
            </button>
            <button
              @click="handleFeelingLucky"
              :disabled="luckyLoading"
              class="w-full sm:w-auto sm:min-w-60 px-8 py-4 rounded-xl font-bold text-base bg-gradient-to-r from-accent to-accent-dark text-gray-800 hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 disabled:cursor-wait disabled:hover:translate-y-0"
            >
              <svg v-if="luckyLoading" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4Z" />
              </svg>
              <CategoryIcon v-else name="Makanan" class="w-5 h-5" />
              {{ luckyLoading ? luckyText : "I'm feeling lucky" }}
            </button>
          </div>

          <div class="mt-8 flex flex-wrap items-center justify-center gap-2">
            <span class="text-gray-400 dark:text-gray-500 text-sm mr-1">Populer:</span>
            <button
              v-for="cat in popularCategories"
              :key="cat"
              @click="searchByCategory(cat)"
              class="px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:border-primary dark:hover:border-primary hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/10"
            >
              {{ cat }}
            </button>
          </div>


          <div class="grid grid-cols-3 gap-4 sm:gap-8 mt-12">
            <div class="text-center">
              <p class="text-2xl sm:text-3xl font-extrabold text-primary">{{ totalBusiness }}+</p>
              <p class="text-gray-400 dark:text-gray-500 text-xs sm:text-sm mt-1 transition-colors duration-300">Bisnis Terdaftar</p>
            </div>
            <div class="text-center">
              <p class="text-2xl sm:text-3xl font-extrabold text-accent-dark">{{ totalKategori }}</p>
              <p class="text-gray-400 dark:text-gray-500 text-xs sm:text-sm mt-1 transition-colors duration-300">Kategori</p>
            </div>
            <div class="text-center">
              <p class="text-2xl sm:text-3xl font-extrabold text-coral">{{ totalProduk }}+</p>
              <p class="text-gray-400 dark:text-gray-500 text-xs sm:text-sm mt-1 transition-colors duration-300">Produk</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-white dark:bg-[#0d0f15] relative transition-colors duration-300">
      <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <span class="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
            Kategori
          </span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white transition-colors duration-300">
            Jelajahi Berdasarkan Kategori
          </h2>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <button
            v-for="cat in categoryCards"
            :key="cat.name"
            @click="searchByCategory(cat.name)"
            class="group relative overflow-hidden rounded-2xl p-6 sm:p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-transparent dark:border-white/5"
            :style="{
              background: `linear-gradient(135deg, ${cat.color}15, ${cat.color}05)`,
              color: cat.color
            }"
            @mouseenter="e => e.currentTarget.style.boxShadow = `0 20px 40px ${cat.color}15`"
            @mouseleave="e => e.currentTarget.style.boxShadow = 'none'"
          >
            <CategoryIcon :name="cat.name" class="w-11 h-11 sm:w-12 sm:h-12 mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" />
            <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">{{ cat.name }}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1 transition-colors duration-300">
              {{ cat.name === 'Lainnya' ? 'Lihat Semua' : `${cat.count} Bisnis` }}
            </p>
            <div class="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/50 dark:bg-black/35 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
              <svg class="w-4 h-4 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </section>

    <section class="py-20 bg-gradient-to-b from-white to-cream-light dark:from-[#0d0f15] dark:to-[#0a0a0a] relative transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
          <div>
            <span class="inline-block px-4 py-1.5 bg-accent/20 text-accent-dark text-sm font-semibold rounded-full mb-4">
              Bisnis Pilihan
            </span>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white transition-colors duration-300">
              Bisnis Terpopuler
            </h2>
            <p class="text-gray-500 dark:text-gray-400 mt-2 transition-colors duration-300">Temukan Bisnis dari Anggota BPC HIPMI Bantul</p>
          </div>
          <router-link
            to="/search"
            class="px-6 py-3 rounded-xl border-2 border-primary text-primary dark:text-primary-light font-semibold text-sm hover:bg-primary hover:text-white dark:hover:bg-primary-dark transition-all duration-300 flex items-center gap-2 shrink-0"
          >
            Lihat Semua
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0-4 4m4-4H3" />
            </svg>
          </router-link>
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          <router-link
            v-for="business in displayedBusiness"
            :key="business.id"
            :to="{ name: 'BusinessDetail', params: { id: business.id } }"
            class="group bg-white dark:bg-[#161a24] rounded-2xl overflow-hidden shadow-sm dark:shadow-black/40 hover:shadow-2xl hover:shadow-primary/10 dark:hover:shadow-primary/5 border border-transparent dark:border-white/5 transition-all duration-500 hover:-translate-y-2 card-hover"
          >
            <div class="relative h-32 sm:h-48 overflow-hidden">
              <img
                :src="resolveImageUrl(business.foto.utama)"
                :alt="business.namaUsaha"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
                decoding="async"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div class="absolute top-2 left-2 sm:top-3 sm:left-3">
                <span
                  class="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold shadow-lg"
                  :style="getCategoryStyle(business.kategori)"
                >
                  <CategoryIcon :name="business.kategori" class="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span class="hidden sm:inline">{{ business.kategori }}</span>
                </span>
              </div>
            </div>

            <div class="p-3 sm:p-5">
              <h3 class="font-bold text-gray-900 dark:text-white text-sm sm:text-base mb-1 group-hover:text-primary transition-colors line-clamp-1">
                {{ business.namaUsaha }}
              </h3>
              <p class="text-gray-400 dark:text-gray-500 text-xs sm:text-sm mb-2 sm:mb-3 flex items-center gap-1">
                <svg class="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7Z" />
                </svg>
                <span class="line-clamp-1">{{ business.namaPemilik }}</span>
              </p>
              <p class="text-gray-500 dark:text-gray-400 text-[10px] sm:text-sm leading-relaxed line-clamp-2 mb-3 sm:mb-4">
                {{ business.deskripsi }}
              </p>

              <div class="flex items-center justify-between pt-2 sm:pt-3 border-t border-gray-100 dark:border-white/5">
                <div class="flex items-center gap-1 text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 min-w-0">
                  <svg class="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10.5h.01" />
                  </svg>
                  <span class="line-clamp-1">{{ getCity(business.alamat) }}</span>
                </div>
                <span class="text-primary text-[10px] sm:text-xs font-semibold flex items-center gap-1 group-hover:gap-1.5 sm:group-hover:gap-2 transition-all duration-300">
                  <span class="hidden sm:inline">Detail</span>
                  <svg class="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </router-link>
        </div>

        <div v-if="displayedBusiness.length < allBusiness.length" class="text-center mt-12">
          <button
            @click="loadMore"
            class="px-8 py-3 rounded-xl border-2 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 font-semibold text-sm hover:border-primary dark:hover:border-primary hover:text-primary dark:hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-all duration-300 cursor-pointer"
          >
            Lihat Lebih Banyak
          </button>
        </div>
      </div>
    </section>

    <!-- Floating CTA: join BPC HIPMI Bantul -->
    <a
      href="https://daftar.hipmibantul.com"
      target="_blank"
      rel="noopener noreferrer"
      class="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 pl-4 pr-5 py-3.5 rounded-full bg-[#18933C] text-white text-sm font-semibold shadow-xl shadow-[#18933C]/30 hover:bg-[#147530] hover:-translate-y-1 active:scale-95 transition-all duration-300"
    >
      <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m14-11 2 2 4-4M11 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
      </svg>
      <span>Gabung BPC Hipmi Bantul</span>
    </a>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import CategoryIcon from '../components/CategoryIcon.vue'
import { businessStore, getCategoryStyle, resolveImageUrl } from '../data/businessData'
import { homeSearchState } from '../stores/uiState'

const router = useRouter()
const searchState = homeSearchState
const itemsToShow = ref(8)
const luckyLoading = ref(false)
const luckyText = ref("ayam goreng...")
let luckyInterval = null
let luckyTimeout = null

const easterEggClicks = ref(0)

const handleEasterEgg = () => {
  easterEggClicks.value++
  if (easterEggClicks.value >= 6) {
    easterEggClicks.value = 0
    triggerThumbsUpBurst()
  }
}

const triggerThumbsUpBurst = () => {
  const emojiCount = 35
  const container = document.createElement('div')
  container.style.position = 'fixed'
  container.style.inset = '0'
  container.style.pointerEvents = 'none'
  container.style.zIndex = '9999'
  document.body.appendChild(container)

  for (let i = 0; i < emojiCount; i++) {
    const emoji = document.createElement('span')
    emoji.innerText = '👍'
    emoji.style.position = 'absolute'
    
    const startX = Math.random() * 100
    emoji.style.left = `${startX}vw`
    emoji.style.top = `100vh`
    
    const scale = 0.5 + Math.random() * 1.5
    const duration = 1.5 + Math.random() * 2
    const delay = Math.random() * 0.5
    const wobble = -100 + Math.random() * 200
    const rotate = -45 + Math.random() * 90
    
    emoji.style.fontSize = `${24 * scale}px`
    emoji.style.filter = 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))'
    emoji.style.opacity = '0'
    emoji.style.transition = `all ${duration}s cubic-bezier(0.25, 1, 0.5, 1) ${delay}s`
    
    container.appendChild(emoji)
    
    setTimeout(() => {
      emoji.style.opacity = '1'
      emoji.style.transform = `translate(${wobble}px, -110vh) rotate(${rotate}deg)`
      setTimeout(() => {
        emoji.style.opacity = '0'
      }, (duration - 0.8) * 1000)
    }, 50)
  }

  setTimeout(() => {
    container.remove()
  }, 4500)
}

const allBusiness = computed(() => businessStore.getAll())
const displayedBusiness = computed(() => allBusiness.value.slice(0, itemsToShow.value))
const totalBusiness = computed(() => allBusiness.value.length)
const totalKategori = computed(() => businessStore.getCategories().length)
const totalProduk = computed(() => allBusiness.value.reduce((sum, u) => sum + (u.produk?.length || 0), 0))

const popularCategories = ['Makanan', 'Minuman', 'Jasa']
const luckyTexts = [
  'ayam goreng...',
  'manggil abang nasi goreng...',
  'faiz sussy...',
  'spinner lagi mikir keras...',
  'sabar, server lagi healing...',
  'lagi nyari wangsit...',
  'minum es teh dulu bentar...',
  'sistem lagi rebahan...',
  'nunggu hilal UMKM...',
  'ngaduk kopi dulu...',
  'ngetik mantra pencarian...',
  'otw cari yang paling mantap...',
  'tahan napas, bentar lagi dapet...',
  'ngajak ngobrol server...',
  'lagi nanya tetangga sebelah...'
]

const categoryCards = computed(() => {
  const pinnedNames = ['Makanan', 'Minuman', 'Jasa']
  const cards = pinnedNames.map(name => {
    const cat = businessStore.categoriesList.find(c => c.name === name)
    const color = cat ? cat.color : (name === 'Makanan' ? '#FA6781' : (name === 'Minuman' ? '#FFC94D' : '#4A5568'))
    return {
      name,
      count: businessStore.getByCategory(name).length,
      color
    }
  })
  
  // Calculate count of other categories' UMKM
  const otherCount = businessStore.businessList.filter(u => !pinnedNames.includes(u.kategori)).length
  
  cards.push({
    name: 'Lainnya',
    count: otherCount,
    color: '#718096' // Sleek neutral slate color
  })
  
  return cards
})

const getCity = (alamat) => {
  const parts = alamat.split(',')
  return parts[parts.length - 1]?.trim() || alamat
}

const handleSearch = () => {
  const q = searchState.query.trim()
  router.push({ name: 'SearchResult', query: q ? { q } : {} })
}

const handleFeelingLucky = () => {
  if (luckyLoading.value) return
  luckyLoading.value = true
  luckyText.value = luckyTexts[Math.floor(Math.random() * luckyTexts.length)]

  luckyInterval = window.setInterval(() => {
    luckyText.value = luckyTexts[Math.floor(Math.random() * luckyTexts.length)]
  }, 700)

  luckyTimeout = window.setTimeout(() => {
    window.clearInterval(luckyInterval)
    luckyInterval = null
    luckyLoading.value = false
    const randomBusiness = businessStore.getRandom(['Makanan', 'Minuman'])
    if (randomBusiness) {
      router.push({ name: 'BusinessDetail', params: { id: randomBusiness.id } })
    }
  }, 3000)
}

const searchByCategory = (category) => {
  if (category === 'Lainnya') {
    router.push({ name: 'SearchResult' })
  } else {
    router.push({ name: 'SearchResult', query: { q: category } })
  }
}

const loadMore = () => {
  itemsToShow.value += 4
}

const handleScroll = () => {
  searchState.docked = window.innerWidth >= 1024 && window.scrollY > 480
}

const placeholderText = ref('')
const placeholderPhrases = [
  "Cari UMKM, produk, atau kategori...",
  "Cari bakso sapi jumbo...",
  "Cari es kopi susu gula aren...",
  "Cari kemeja batik pria...",
  "Cari tatakan gelas set kayu jati...",
  "Cari servis ringan motor matic...",
  "Cari nasi rendang Padang...",
  "Cari jamu beras kencur segar...",
  "Cari sate ayam Madura asli...",
  "Cari martabak manis cokelat keju..."
]

let currentPhrase = placeholderPhrases[0]
let typeIndex = 0
let isDeleting = false
let typeTimeout = null

const startTypewriter = () => {
  if (!isDeleting) {
    placeholderText.value = currentPhrase.slice(0, typeIndex + 1)
    typeIndex++
    
    if (typeIndex === currentPhrase.length) {
      isDeleting = true
      typeTimeout = setTimeout(startTypewriter, 3000)
    } else {
      typeTimeout = setTimeout(startTypewriter, 100 + Math.random() * 50)
    }
  } else {
    placeholderText.value = currentPhrase.slice(0, typeIndex - 1)
    typeIndex--
    
    if (typeIndex === 0) {
      isDeleting = false
      // Choose a random phrase for the next cycle without repeating the current one
      const otherPhrases = placeholderPhrases.filter(p => p !== currentPhrase)
      currentPhrase = otherPhrases[Math.floor(Math.random() * otherPhrases.length)]
      typeTimeout = setTimeout(startTypewriter, 500)
    } else {
      typeTimeout = setTimeout(startTypewriter, 40)
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleScroll)
  handleScroll()
  startTypewriter()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleScroll)
  if (luckyInterval) window.clearInterval(luckyInterval)
  if (luckyTimeout) window.clearTimeout(luckyTimeout)
  if (typeTimeout) window.clearTimeout(typeTimeout)
  searchState.docked = false
})
</script>

<style scoped>
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

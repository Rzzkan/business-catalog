<template>
  <transition
    enter-active-class="transition-opacity duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="mobileMenuOpen"
      class="fixed top-16 bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
      @click="closeMenu"
    ></div>
  </transition>

  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="[
      scrolled && !navSolid ? 'bg-white/90 dark:bg-[#0c0e14]/90 backdrop-blur-xl shadow-lg shadow-primary/5 dark:shadow-black/20 border-b border-transparent dark:border-white/5' : '',
      navSolid ? 'bg-white dark:bg-[#0c0e14] shadow-lg shadow-primary/5 dark:shadow-black/20 border-b border-transparent dark:border-white/5' : '',
      !scrolled && !navSolid ? 'bg-transparent border-b border-transparent' : ''
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center gap-4 h-16 lg:h-20">
        <router-link to="/" class="flex items-center gap-2 group shrink-0">
          <img src="/logo.svg" alt="UMKMHub Logo" class="w-10 h-10 object-contain transition-all duration-300 group-hover:scale-105" />
          <div class="flex flex-col">
            <span class="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
              UMKM<span class="text-primary">Hub</span>
            </span>
            <span class="text-[10px] font-medium -mt-1 text-gray-400 dark:text-gray-500">
              E-Catalog Indonesia
            </span>
          </div>
        </router-link>

        <div class="hidden lg:flex flex-1 justify-center">
          <transition
            enter-active-class="transition-all duration-500 ease-out"
            enter-from-class="opacity-0 -translate-y-4 scale-95"
            enter-to-class="opacity-100 translate-y-0 scale-100"
            leave-active-class="transition-all duration-300 ease-in"
            leave-from-class="opacity-100 translate-y-0 scale-100"
            leave-to-class="opacity-0 -translate-y-4 scale-95"
          >
            <form
              v-if="showDockedSearch"
              @submit.prevent="handleDockedSearch"
              class="w-full max-w-xl"
            >
              <div class="relative flex items-center bg-white dark:bg-[#161a24] rounded-2xl border border-gray-100 dark:border-white/5 shadow-lg shadow-primary/10 dark:shadow-black/20">
                <svg class="absolute left-4 w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                </svg>
                <input
                  v-model="searchState.query"
                  type="text"
                  placeholder="Cari UMKM, produk, atau kategori..."
                  class="w-full pl-11 pr-24 py-3 bg-transparent text-sm text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
                />
                <button
                  type="submit"
                  class="absolute right-1.5 px-4 py-2 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-dark active:scale-[0.98] transition-all duration-200"
                >
                  Cari
                </button>
              </div>
            </form>
          </transition>
        </div>

        <div class="hidden md:flex items-center gap-2 ml-auto">
          <router-link
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 relative group"
            :class="isActive(link.path)
              ? 'text-primary bg-primary/10'
              : 'text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/10'"
          >
            {{ link.name }}
            <span
              v-if="isActive(link.path)"
              class="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
            />
          </router-link>

          <!-- Theme Toggle Button -->
          <button
            @click="handleToggleThemeClick"
            class="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-all duration-200 relative cursor-pointer"
            aria-label="Ubah Tema"
          >
            <div class="relative w-5 h-5 flex items-center justify-center overflow-hidden">
              <!-- Sun Icon -->
              <svg
                class="absolute w-5 h-5 transform transition-all duration-500"
                :class="themeState.isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
              </svg>
              <!-- Moon Icon -->
              <svg
                class="absolute w-5 h-5 transform transition-all duration-500"
                :class="themeState.isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
              </svg>
            </div>
          </button>
        </div>

        <button
          @click="toggleMenu"
          class="md:hidden ml-auto p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-white/10 transition-colors"
          :class="isAnimating ? 'opacity-50 cursor-not-allowed' : ''"
          aria-label="Buka menu"
        >
          <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="mobileMenuOpen"
        class="md:hidden bg-white dark:bg-[#0c0e14] border-t border-gray-100 dark:border-white/5 shadow-xl absolute top-full left-0 right-0 w-full overflow-hidden"
      >
        <transition name="slide-menu" mode="out-in">
          <!-- Main Mobile Menu -->
          <div v-if="activeMobileView === 'menu'" key="menu" class="px-4 py-3 space-y-1">
            <router-link
              v-for="link in navLinks"
              :key="link.path"
              :to="link.path"
              @click="closeMenu"
              class="block px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
              :class="isActive(link.path)
                ? 'text-primary bg-primary/10'
                : 'text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/10'"
            >
              {{ link.name }}
            </router-link>
            
            <!-- Link to mobile settings appearance -->
            <button
              @click="activeMobileView = 'settings'"
              class="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-all duration-200 cursor-pointer"
            >
              <div class="flex items-center gap-2">
                <svg class="w-4.5 h-4.5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.43l-1.003.828c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.43l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                <span>Tampilan</span>
              </div>
              <div class="flex items-center gap-1.5">
                <span class="text-xs text-gray-400 capitalize">
                  {{ themeState.theme === 'auto' ? 'Otomatis' : (themeState.theme === 'dark' ? 'Gelap' : 'Terang') }}
                </span>
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>
          
          <!-- Mobile Settings Page -->
          <div v-else-if="activeMobileView === 'settings'" key="settings" class="px-4 py-4 space-y-4">
            <!-- Back Button & Header -->
            <div class="flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-white/5">
              <button
                @click="activeMobileView = 'menu'"
                class="p-1 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5 transition-colors cursor-pointer"
                aria-label="Kembali"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h3 class="font-bold text-gray-900 dark:text-white text-sm">Pengaturan Tampilan</h3>
            </div>
            
            <!-- Appearance Options -->
            <div class="space-y-2">
              <button
                v-for="opt in themeOptions"
                :key="opt.value"
                @click="handleMobileThemeChange(opt.value, $event)"
                class="w-full flex items-center justify-between p-3 rounded-xl border text-sm font-semibold transition-all duration-200 cursor-pointer"
                :class="themeState.theme === opt.value
                  ? 'border-primary bg-primary/5 text-primary dark:border-primary dark:bg-primary/10'
                  : 'border-gray-100 dark:border-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'"
              >
                <div class="flex items-center gap-3">
                  <!-- Light Mode Icon -->
                  <svg v-if="opt.value === 'light'" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                  </svg>
                  <!-- Dark Mode Icon -->
                  <svg v-else-if="opt.value === 'dark'" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                  </svg>
                  <!-- Auto Mode Icon -->
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 21h6l-.75-4M3 13V5.25A2.25 2.25 0 0 1 5.25 3h13.5A2.25 2.25 0 0 1 21 5.25V13M3 13a2.25 2.25 0 0 0 2.25 2.25h13.5A2.25 2.25 0 0 0 21 13M3 13h18" />
                  </svg>
                  <span>{{ opt.name }}</span>
                </div>
                <!-- Selected Indicator Dot -->
                <div
                  v-if="themeState.theme === opt.value"
                  class="w-2.5 h-2.5 rounded-full bg-primary"
                ></div>
              </button>
            </div>
            
            <!-- Rain Mode Toggle for Mobile Settings -->
            <div class="mt-4 pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
              <div class="flex flex-col">
                <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Hujan Mode Gelap</span>
                <span class="text-xs text-gray-400">Efek hujan & petir di latar belakang</span>
              </div>
              <button
                @click="toggleRainMode"
                class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
                :class="themeState.isRaining ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'"
                aria-label="Toggle Hujan Mode Gelap"
              >
                <span
                  class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                  :class="themeState.isRaining ? 'translate-x-5' : 'translate-x-0'"
                ></span>
              </button>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { homeSearchState, themeState, setThemeWithAnimation } from '../stores/uiState'

const route = useRoute()
const router = useRouter()
const scrolled = ref(false)
const mobileMenuOpen = ref(false)
const navSolid = ref(false)
const isAnimating = ref(false)
const searchState = homeSearchState

const activeMobileView = ref('menu')

const handleToggleThemeClick = (event) => {
  const nextTheme = themeState.isDark ? 'light' : 'dark'
  setThemeWithAnimation(nextTheme, event)
}

const themeOptions = [
  { value: 'light', name: 'Terang' },
  { value: 'dark', name: 'Gelap' },
  { value: 'auto', name: 'Otomatis' }
]

const handleMobileThemeChange = (value, event) => {
  setThemeWithAnimation(value, event)
}

const toggleRainMode = () => {
  themeState.isRainingManuallyToggled = !themeState.isRainingManuallyToggled
  themeState.isRaining = themeState.isRainingManuallyToggled
  localStorage.setItem('isRainingManuallyToggled', themeState.isRainingManuallyToggled ? 'true' : 'false')
  if (themeState.isRaining && !themeState.isDark) {
    setThemeWithAnimation('dark')
  }
}

let closeTimeout = null

const toggleMenu = () => {
  if (isAnimating.value) return
  isAnimating.value = true
  mobileMenuOpen.value = !mobileMenuOpen.value
  setTimeout(() => {
    isAnimating.value = false
  }, 320)
}

const closeMenu = () => {
  if (isAnimating.value || !mobileMenuOpen.value) return
  isAnimating.value = true
  mobileMenuOpen.value = false
  setTimeout(() => {
    isAnimating.value = false
  }, 320)
}

watch(mobileMenuOpen, (isOpen) => {
  if (isOpen) {
    activeMobileView.value = 'menu'
    if (closeTimeout) clearTimeout(closeTimeout)
    navSolid.value = true
    document.body.classList.add('menu-open')
  } else {
    closeTimeout = setTimeout(() => {
      if (!mobileMenuOpen.value) {
        navSolid.value = false
        document.body.classList.remove('menu-open')
      }
    }, 300)
  }
})

const navLinks = [
  { name: 'Beranda', path: '/' },
  { name: 'Katalog', path: '/search' }
]

const showDockedSearch = computed(() => route.name === 'Home' && searchState.docked)

const isActive = (path) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}

const handleDockedSearch = () => {
  const q = searchState.query.trim()
  router.push({ name: 'SearchResult', query: q ? { q } : {} })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Prevent scrolling when mobile menu is open */
:global(body.menu-open) {
  overflow: hidden;
}

/* Slide transition for mobile menu settings page */
.slide-menu-enter-active,
.slide-menu-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-menu-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-menu-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>

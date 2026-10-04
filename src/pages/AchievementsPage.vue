<template>
  <div class="min-h-screen pt-36 pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#FAE7CB]/20 via-white to-[#FFC94D]/5 dark:from-[#13100a] dark:via-[#0a0a0a] dark:to-[#07130f] transition-colors duration-300">
    <div class="max-w-4xl mx-auto">
      
      <!-- Page Header -->
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-4">
          Ruang <span class="text-[#FFC94D]">Pencapaian</span>
        </h1>
        <p class="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-sm md:text-base mb-2">
          Temukan rahasia yang tersembunyi di seluruh website ini. Lakukan tindakan khusus untuk membuka pencapaian eksklusif!
        </p>
        <p class="text-xs text-[#FFC94D] font-semibold">
          Terbuka: {{ unlockedCount }} / {{ achievements.length }} Rahasia
        </p>
      </div>

      <!-- Achievements Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div 
          v-for="ach in achievements" 
          :key="ach.id"
          class="relative overflow-hidden rounded-3xl border transition-all duration-500 min-h-[200px]"
          :class="[
            ach.unlocked 
              ? `${ach.bgClass} border-transparent shadow-xl scale-[1.01] text-white` 
              : 'bg-white dark:bg-[#161a24] border-gray-200 dark:border-white/5 text-gray-400 dark:text-gray-500'
          ]"
        >
          <div class="p-6 sm:p-8 flex flex-col justify-between h-full relative z-10">
            
            <div>
              <!-- Header: Badge & Status -->
              <div class="flex items-center justify-between mb-6">
                <span 
                  class="text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1.5"
                  :class="ach.unlocked ? 'bg-white/20 text-white' : 'bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400'"
                >
                  <!-- Lock/Unlock SVGs -->
                  <svg v-if="ach.unlocked" class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <rect x="5" y="11" width="14" height="11" rx="2" ry="2" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 11V6a4 4 0 0 1 7.75-1.4" />
                  </svg>
                  <svg v-else class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <rect x="5" y="11" width="14" height="11" rx="2" ry="2" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 11V7a4 4 0 0 1 8 0v4" />
                  </svg>
                  <span>{{ ach.unlocked ? 'Unlocked' : 'Locked' }}</span>
                </span>
                
                <!-- Dynamic Hand-built Icon SVG -->
                <div class="w-10 h-10 flex items-center justify-center">
                  <template v-if="!ach.unlocked">
                    <!-- Question Mark SVG for Locked -->
                    <svg class="w-8 h-8 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="9" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3m0 4h.01" />
                    </svg>
                  </template>
                  <template v-else>
                    <!-- Geometric 67 SVG -->
                    <svg v-if="ach.id === '67'" class="w-8 h-8 text-white" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                      <path d="M10 7c-1.5 0-3 1-3 3v6a3 3 0 0 0 3 3h0.5a3 3 0 0 0 3-3v-2a3 3 0 0 0-3-3H7" />
                      <path d="M15 7h5.5L17 19" />
                    </svg>
                    <!-- Rotation arrows SVG for Barrel Roll -->
                    <svg v-else-if="ach.id === 'barrel_roll'" class="w-8 h-8 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                    <!-- Console/Terminal code SVG for Console Inspect -->
                    <svg v-else-if="ach.id === 'console'" class="w-8 h-8 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z" />
                    </svg>
                    <!-- Storm cloud SVG for Rain Mode -->
                    <svg v-else-if="ach.id === 'rain'" class="w-8 h-8 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M13 13.5l-2.25 3h3.5L12 19.5" />
                    </svg>
                    <!-- Geometric B A SVG -->
                    <svg v-else-if="ach.id === 'konami'" class="w-8 h-8 text-white" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                      <path d="M6 7h4a2.5 2.5 0 0 1 0 5H6h4a2.5 2.5 0 0 1 0 5H6V7z" />
                      <path d="M15 17l3-10 3 10M16 13h4" />
                    </svg>
                    <!-- Onigiri SVG -->
                    <svg v-else-if="ach.id === 'sata_andagi'" class="w-8 h-8 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                      <!-- Rounded triangle for the rice body -->
                      <path d="M12 3c1.2 0 2.2.6 3.1 1.8l5.8 9.2c1.2 1.9.8 4.4-1.1 5.8a4.9 4.9 0 0 1-2.8.8H7a4.9 4.9 0 0 1-2.8-.8c-1.9-1.4-2.3-3.9-1.1-5.8l5.8-9.2C9.8 3.6 10.8 3 12 3z" />
                      <!-- Nori seaweed wrap in the center bottom -->
                      <path d="M9 15.5h6v4.5H9v-4.5z" fill="currentColor" />
                    </svg>
                    <!-- Falling object to ground SVG for Gravity -->
                    <svg v-else-if="ach.id === 'gravity'" class="w-8 h-8 text-white" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                      <path d="M12 3v11" />
                      <path d="M7 9l5 5 5-5" />
                      <path d="M4 20h16" />
                    </svg>
                  </template>
                </div>
              </div>

              <!-- Title -->
              <h3 
                class="text-xl font-black mb-3"
                :class="ach.unlocked ? 'text-white' : 'text-gray-900 dark:text-white'"
              >
                {{ ach.unlocked ? ach.title : 'Misteri Tersembunyi' }}
              </h3>
              
              <!-- Description -->
              <p 
                class="text-sm leading-relaxed mb-6"
                :class="ach.unlocked ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'"
              >
                {{ ach.unlocked ? ach.description : 'Tindakan rahasia ini belum terpecahkan. Telusuri seluruh sudut website untuk membukanya!' }}
              </p>
            </div>

            <!-- Lock Status Footer Details -->
            <div class="border-t pt-4 border-current/10 flex items-center justify-between">
              <span 
                class="text-xs font-bold"
                :class="ach.unlocked ? 'text-white/70' : 'text-gray-400 dark:text-gray-500'"
              >
                Status: {{ ach.unlocked ? 'Berhasil Dibuka' : 'Belum Terbuka' }}
              </span>
            </div>

          </div>
        </div>
      </div>

      <!-- Bottom Centered Reset Button -->
      <div class="mt-16 text-center">
        <button 
          @click="resetAchievements"
          class="px-5 py-2.5 text-xs font-semibold text-red-500 hover:text-white border border-red-200 dark:border-red-900/30 hover:border-red-500 hover:bg-red-500 rounded-xl transition-all duration-200 active:scale-95 cursor-pointer bg-white dark:bg-[#161a24] dark:hover:bg-red-500 shadow-md shadow-black/5"
        >
          Reset Progress
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const is67Unlocked = ref(false)
const isBarrelUnlocked = ref(false)
const isConsoleUnlocked = ref(false)
const isRainUnlocked = ref(false)
const isKonamiUnlocked = ref(false)
const isSataAndagiUnlocked = ref(false)
const isGravityUnlocked = ref(false)

const achievements = computed(() => [
  {
    id: '67',
    title: 'Angka Legendaris',
    description: 'Mencari angka keberuntungan "67" di kolom pencarian.',
    unlocked: is67Unlocked.value,
    bgClass: 'bg-gradient-to-br from-purple-500/90 via-purple-600/90 to-indigo-700/90'
  },
  {
    id: 'barrel_roll',
    title: 'Do a Barrel Roll!',
    description: 'Menginstruksikan website untuk melakukan rotasi berputar lewat kolom pencarian.',
    unlocked: isBarrelUnlocked.value,
    bgClass: 'bg-gradient-to-br from-emerald-500/90 via-emerald-600/90 to-teal-700/90'
  },
  {
    id: 'console',
    title: 'Inspektur Wilayah',
    description: 'Membuka Developer Console (Inspect Element) untuk melihat berkas konsol tersembunyi.',
    unlocked: isConsoleUnlocked.value,
    bgClass: 'bg-gradient-to-br from-gray-700 via-gray-800 to-black'
  },
  {
    id: 'rain',
    title: 'Badai di Malam Hari',
    description: 'Mengaktifkan efek cuaca hujan badai + petir di latar belakang mode gelap.',
    unlocked: isRainUnlocked.value,
    bgClass: 'bg-gradient-to-br from-blue-500/90 via-blue-600/90 to-indigo-700/90'
  },
  {
    id: 'konami',
    title: 'How Did We Get Here?',
    description: 'Memasukkan kode legendaris Konami (↑ ↑ ↓ ↓ ← → ← → B A) di keyboard.',
    unlocked: isKonamiUnlocked.value,
    bgClass: 'bg-gradient-to-br from-[#FF55FF]/90 via-[#c035c0]/90 to-[#801080]/90 shadow-[#FF55FF]/10'
  },
  {
    id: 'sata_andagi',
    title: 'Sata Andagi!',
    description: 'Menemukan kue manis Sata Andagi misterius pada halaman error 404 dan mengekliknya.',
    unlocked: isSataAndagiUnlocked.value,
    bgClass: 'bg-gradient-to-br from-amber-500/90 via-amber-600/90 to-amber-800/90 shadow-amber-500/10'
  },
  {
    id: 'gravity',
    title: 'Gravitasi Faiz',
    description: 'Mencari "faiz sussy" di kolom pencarian dan meruntuhkan seluruh halaman dengan hukum gravitasi. Tarik dan lempar elemennya sesukamu!',
    unlocked: isGravityUnlocked.value,
    bgClass: 'bg-gradient-to-br from-indigo-500/90 via-purple-700/90 to-fuchsia-900/90 shadow-purple-500/10'
  }
])

const unlockedCount = computed(() => {
  return achievements.value.filter(a => a.unlocked).length
})

function loadAchievements() {
  is67Unlocked.value = localStorage.getItem('achievement_67') === 'true'
  isBarrelUnlocked.value = localStorage.getItem('achievement_barrel_roll') === 'true'
  isConsoleUnlocked.value = localStorage.getItem('achievement_console') === 'true'
  isRainUnlocked.value = localStorage.getItem('achievement_rain') === 'true'
  isKonamiUnlocked.value = localStorage.getItem('achievement_konami') === 'true'
  isSataAndagiUnlocked.value = localStorage.getItem('achievement_sata_andagi') === 'true'
  isGravityUnlocked.value = localStorage.getItem('achievement_gravity') === 'true'
}

function resetAchievements() {
  if (confirm('Apakah Anda yakin ingin me-reset semua pencapaian?')) {
    localStorage.removeItem('achievement_67')
    localStorage.removeItem('achievement_barrel_roll')
    localStorage.removeItem('achievement_console')
    localStorage.removeItem('achievement_rain')
    localStorage.removeItem('achievement_konami')
    localStorage.removeItem('achievement_sata_andagi')
    localStorage.removeItem('achievement_gravity')
    localStorage.removeItem('isRainingManuallyToggled')
    loadAchievements()
  }
}

onMounted(() => {
  loadAchievements()
})
</script>

<style scoped>
/* No scan overlay styling */
</style>

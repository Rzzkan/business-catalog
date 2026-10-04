<template>
  <div class="min-h-screen bg-[#FFF9F0] dark:bg-[#0a0a0a] flex items-center justify-center px-4 py-10 transition-colors duration-300">
    <section class="w-full max-w-md bg-white dark:bg-[#161a24] border border-gray-100 dark:border-white/5 rounded-2xl shadow-xl shadow-[#FFC94D]/10 dark:shadow-black/40 p-6 sm:p-8 transition-colors duration-300">
      <router-link to="/" class="inline-flex items-center gap-2 text-sm font-semibold text-[#FFC94D] hover:text-[#e6b03a] mb-8">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Kembali ke Beranda
      </router-link>

      <div class="mb-8">
        <div class="w-12 h-12 rounded-xl bg-[#FFC94D]/10 flex items-center justify-center p-2 mb-4">
          <img src="/logo.svg" alt="Logo BPC HIPMI Bantul" class="w-full h-full object-contain" />
        </div>
        <h1 class="text-2xl font-extrabold text-gray-900 dark:text-white">Login Admin</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">Masukkan email dan password untuk membuka panel admin.</p>
      </div>

      <form class="space-y-5" @submit.prevent="handleLogin">
        <div>
          <label for="email" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email</label>
          <input
            id="email"
            v-model.trim="email"
            type="email"
            autocomplete="email"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 text-gray-800 dark:text-white bg-white dark:bg-[#0d0f14] placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFC94D]/40 focus:border-[#FFC94D] transition-colors duration-300"
            placeholder="nama@email.com"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            autocomplete="current-password"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 text-gray-800 dark:text-white bg-white dark:bg-[#0d0f14] placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFC94D]/40 focus:border-[#FFC94D] transition-colors duration-300"
            placeholder="••••••••"
          />
        </div>

        <p v-if="errorMessage" class="text-sm font-medium text-[#FA6781]">{{ errorMessage }}</p>

        <button
          type="submit"
          :disabled="secondsRemaining > 0"
          class="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FFC94D] text-white font-bold hover:bg-[#e6b03a] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H3m12 0-4-4m4 4-4 4m5-13h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3" />
          </svg>
          Masuk
        </button>
      </form>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const email = ref('')
const password = ref('')
const errorMessage = ref('')

// Throttling / Rate-Limiting state
const failedAttempts = ref(Number(localStorage.getItem('admin-failed-attempts') || 0))
const lockoutUntil = ref(Number(localStorage.getItem('admin-lockout-until') || 0))
const secondsRemaining = ref(0)
let timer = null

function updateLockoutTimer() {
  const now = Date.now()
  if (lockoutUntil.value > now) {
    secondsRemaining.value = Math.ceil((lockoutUntil.value - now) / 1000)
    errorMessage.value = `Terlalu banyak percobaan masuk. Coba lagi dalam ${secondsRemaining.value} detik.`
    if (!timer) {
      timer = setInterval(() => {
        const remaining = Math.ceil((lockoutUntil.value - Date.now()) / 1000)
        if (remaining <= 0) {
          clearInterval(timer)
          timer = null
          secondsRemaining.value = 0
          errorMessage.value = ''
          localStorage.removeItem('admin-lockout-until')
          localStorage.removeItem('admin-failed-attempts')
          failedAttempts.value = 0
        } else {
          secondsRemaining.value = remaining
          errorMessage.value = `Terlalu banyak percobaan masuk. Coba lagi dalam ${secondsRemaining.value} detik.`
        }
      }, 1000)
    }
  } else {
    secondsRemaining.value = 0
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }
}

onMounted(() => {
  updateLockoutTimer()
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

function handleLogin() {
  errorMessage.value = ''

  // Check lockout
  const now = Date.now()
  if (lockoutUntil.value > now) {
    updateLockoutTimer()
    return
  }

  if (!email.value || !password.value) {
    errorMessage.value = 'Email dan password wajib diisi.'
    return
  }

  // Pre-configured credentials
  const correctEmail = 'admin@admin'
  const correctPassword = 'admin123'

  if (email.value !== correctEmail || password.value !== correctPassword) {
    failedAttempts.value++
    localStorage.setItem('admin-failed-attempts', failedAttempts.value.toString())

    if (failedAttempts.value >= 5) {
      const lockDuration = 30000 // 30 seconds lockout
      lockoutUntil.value = Date.now() + lockDuration
      localStorage.setItem('admin-lockout-until', lockoutUntil.value.toString())
      updateLockoutTimer()
    } else {
      errorMessage.value = `Email atau password salah. Sisa percobaan: ${5 - failedAttempts.value}`
    }
    return
  }

  // Success
  failedAttempts.value = 0
  localStorage.removeItem('admin-failed-attempts')
  localStorage.removeItem('admin-lockout-until')
  if (timer) {
    clearInterval(timer)
    timer = null
  }

  sessionStorage.setItem('business-admin-auth', 'true')
  sessionStorage.setItem('business-admin-email', email.value)
  router.replace(route.query.redirect || { name: 'Admin' })
}
</script>

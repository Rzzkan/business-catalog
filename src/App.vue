<template>
  <div class="min-h-screen bg-[#FFF9F0] dark:bg-[#0c0e14] flex flex-col transition-colors duration-300">
    <a href="#main-content" class="skip-link">Lewati ke konten utama</a>
    <Navbar v-if="!hideShell" />
    <main id="main-content" tabindex="-1" class="flex-1">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" :key="$route.fullPath" />
        </transition>
      </router-view>
    </main>
    <FooterSection v-if="!hideShell" />
    <MinecraftAchievement />
    <RainLightningEffect />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import FooterSection from './components/FooterSection.vue'
import MinecraftAchievement from './components/MinecraftAchievement.vue'
import RainLightningEffect from './components/RainLightningEffect.vue'

const route = useRoute()
const hideShell = computed(() => route.meta.hideShell === true)

onMounted(() => {
  const unlockConsole = () => {
    localStorage.setItem('achievement_console', 'true')
  }

  // Detect DevTools shortcuts
  window.addEventListener('keydown', (e) => {
    if (e.key === 'F12') {
      unlockConsole()
    }
    // Ctrl+Shift+I / J / C / K
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && ['i', 'j', 'c', 'k'].includes(e.key.toLowerCase())) {
      unlockConsole()
    }
    // Cmd+Opt+I / J / C (Mac)
    if (e.metaKey && e.altKey && ['i', 'j', 'c'].includes(e.key.toLowerCase())) {
      unlockConsole()
    }
  })

  // Detect Right Click -> Context Menu (likely to Inspect)
  window.addEventListener('contextmenu', () => {
    unlockConsole()
  })

  // Detect screen size layout mismatch (often occurs when DevTools is opened as a pane)
  const threshold = 160
  const checkDevTools = () => {
    const isMobile = window.innerWidth < 768
    if (isMobile) return
    const widthDiff = window.outerWidth - window.innerWidth > threshold
    const heightDiff = window.outerHeight - window.innerHeight > threshold
    if (widthDiff || heightDiff) {
      unlockConsole()
    }
  }
  
  setInterval(checkDevTools, 1500)
})
</script>

<style>
/* Skip link: hidden off-screen until focused via keyboard (Tab) */
.skip-link {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate(-50%, -150%);
  z-index: 100;
  padding: 0.75rem 1.25rem;
  border-radius: 0 0 0.75rem 0.75rem;
  background: #59B292;
  color: #fff;
  font-weight: 700;
  font-size: 0.875rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;
}

.skip-link:focus {
  transform: translate(-50%, 0);
  outline: 2px solid #fff;
  outline-offset: 2px;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>

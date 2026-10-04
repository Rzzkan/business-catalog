<template>
  <Teleport to="body">
    <transition
      enter-active-class="mc-achievement-enter-active"
      enter-from-class="mc-achievement-enter-from"
      enter-to-class="mc-achievement-enter-to"
      leave-active-class="mc-achievement-leave-active"
      leave-from-class="mc-achievement-leave-from"
      leave-to-class="mc-achievement-leave-to"
    >
      <div
        v-if="showAchievement"
        class="mc-achievement-container"
        @click="dismiss"
      >
        <div class="mc-achievement-toast">
          <!-- Cake Icon -->
          <div class="mc-achievement-icon">
            <canvas ref="cakeCanvas" width="32" height="32"></canvas>
          </div>
          <!-- Text -->
          <div class="mc-achievement-text">
            <div class="mc-achievement-title">How Did We Get Here?</div>
            <div class="mc-achievement-desc">Seriously, who tries this on a website?</div>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const showAchievement = ref(false)
const cakeCanvas = ref(null)
let konamiBuffer = []
let dismissTimeout = null

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a'
]

function drawMinecraftCake(canvas) {
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  ctx.imageSmoothingEnabled = false
  const s = 2 // scale factor: 16px art → 32px canvas

  // Clear
  ctx.clearRect(0, 0, 32, 32)

  // Color palette
  const white = '#FFFFFF'
  const icing = '#F0E0D0'
  const cherry = '#FF0000'
  const cherryDark = '#CC0000'
  const cakeTop = '#F5DEB3'
  const cakeMid = '#D2A56C'
  const cakeBot = '#8B6914'
  const cakeDark = '#6B4C12'
  const shadow = '#3D2B0A'

  // Helper
  function px(x, y, color) {
    ctx.fillStyle = color
    ctx.fillRect(x * s, y * s, s, s)
  }

  function row(y, x1, x2, color) {
    for (let x = x1; x <= x2; x++) px(x, y, color)
  }

  // Icing / top (rows 4-6)
  row(4, 3, 12, white)
  row(5, 2, 13, white)
  row(6, 2, 13, icing)

  // Cherries on icing
  px(4, 4, cherry); px(5, 4, cherry)
  px(8, 4, cherry); px(9, 4, cherry)
  px(11, 4, cherryDark)
  px(4, 5, cherryDark); px(9, 5, cherryDark)

  // Cake body (rows 7-11)
  row(7, 2, 13, cakeTop)
  row(8, 2, 13, cakeMid)
  row(9, 2, 13, cakeMid)
  row(10, 2, 13, cakeBot)
  row(11, 2, 13, cakeBot)

  // Darker stripes for texture
  for (let x = 3; x <= 12; x += 2) {
    px(x, 8, cakeTop)
    px(x, 10, cakeDark)
  }

  // Bottom shadow
  row(12, 3, 12, shadow)
}

let audioCtx = null
let achievementBuffer = null
let isPreloading = false

async function preloadAchievementSound() {
  if (isPreloading || achievementBuffer) return
  isPreloading = true
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    }
    const response = await fetch('/achievement_sound_effect.mp3')
    const arrayBuffer = await response.arrayBuffer()
    achievementBuffer = await audioCtx.decodeAudioData(arrayBuffer)
  } catch (e) {
    // fallback preloading fails
  } finally {
    isPreloading = false
  }
}

function playSound() {
  try {
    if (!achievementBuffer) {
      preloadAchievementSound().then(() => {
        playDecodedSound()
      })
    } else {
      playDecodedSound()
    }
  } catch (e) {
    // Fallback to standard audio element if context fails
    const audio = new Audio('/achievement_sound_effect.mp3')
    audio.volume = 0.6
    audio.play().catch(() => {})
  }
}

function playDecodedSound() {
  try {
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume()
    }
    if (audioCtx && achievementBuffer) {
      const source = audioCtx.createBufferSource()
      source.buffer = achievementBuffer
      
      const gainNode = audioCtx.createGain()
      gainNode.gain.value = 0.6
      
      source.connect(gainNode)
      gainNode.connect(audioCtx.destination)
      
      source.start(0)
    }
  } catch (e) {}
}

function triggerAchievement() {
  if (showAchievement.value) return
  showAchievement.value = true
  localStorage.setItem('achievement_konami', 'true')
  playSound()

  // Draw cake after element renders
  nextTick(() => {
    drawMinecraftCake(cakeCanvas.value)
  })

  // Auto-dismiss after 5 seconds
  dismissTimeout = setTimeout(() => {
    dismiss()
  }, 6000)
}

function dismiss() {
  showAchievement.value = false
  if (dismissTimeout) {
    clearTimeout(dismissTimeout)
    dismissTimeout = null
  }
}

function handleKeydown(e) {
  const key = e.key
  konamiBuffer.push(key)

  // Keep only the last N keys
  if (konamiBuffer.length > KONAMI_CODE.length) {
    konamiBuffer.shift()
  }

  // Check if buffer matches
  if (konamiBuffer.length === KONAMI_CODE.length) {
    const match = konamiBuffer.every((k, i) => k.toLowerCase() === KONAMI_CODE[i].toLowerCase())
    if (match) {
      konamiBuffer = []
      triggerAchievement()
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  preloadAchievementSound()
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  if (dismissTimeout) clearTimeout(dismissTimeout)
})
</script>

<style>
/* ========================================
   Minecraft Achievement Toast Styles
   ======================================== */

/* @font-face for Minecraft font */
@font-face {
  font-family: 'Monocraft';
  src: url('/fonts/Monocraft.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

.mc-achievement-container {
  position: fixed;
  top: 28px;
  right: 28px;
  z-index: 99999;
  pointer-events: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
}

.mc-achievement-toast {
  display: flex;
  align-items: center;
  gap: 0;
  /* Minecraft achievement styling */
  background-color: #313131;
  border: 2px solid #2a2a2a;
  outline: 2px solid #050505;
  padding: 7px 14px 7px 7px;
  cursor: pointer;
  image-rendering: pixelated;
  box-shadow:
    inset 0 0 0 1px #4a4a4a,
    4px 4px 0 rgba(0,0,0,0.4);
}

.mc-achievement-icon {
  width: 36px;
  height: 36px;
  background-color: #8B8B8B;
  border: 2px solid #373737;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  image-rendering: pixelated;
  margin-right: 8px;
}

.mc-achievement-icon canvas {
  image-rendering: pixelated;
  width: 32px;
  height: 32px;
}

.mc-achievement-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.mc-achievement-title {
  font-family: 'Monocraft', 'Courier New', monospace;
  font-size: 13px;
  font-weight: bold;
  color: #FF55FF; /* Pink */
  line-height: 1.1;
  letter-spacing: 0.5px;
  text-shadow: 2px 2px 0 #3F153F;
  white-space: nowrap;
}

.mc-achievement-desc {
  font-family: 'Monocraft', 'Courier New', monospace;
  font-size: 12px;
  font-weight: normal;
  color: #FFFFFF; /* White */
  line-height: 1.1;
  letter-spacing: 0.3px;
  text-shadow: 2px 2px 0 #2A2A2A;
  white-space: nowrap;
}

/* Slide-in from right animation */
.mc-achievement-enter-active {
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease-out;
}
.mc-achievement-enter-from {
  transform: translateX(120%);
  opacity: 0;
}
.mc-achievement-enter-to {
  transform: translateX(0);
  opacity: 1;
}

/* Slide-out to right */
.mc-achievement-leave-active {
  transition: transform 0.4s cubic-bezier(0.5, 0, 0.75, 0), opacity 0.3s ease-in;
}
.mc-achievement-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.mc-achievement-leave-to {
  transform: translateX(120%);
  opacity: 0;
}
</style>

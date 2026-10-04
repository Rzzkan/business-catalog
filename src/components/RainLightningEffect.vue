<template>
  <canvas
    v-if="themeState.isDark && themeState.isRaining"
    ref="canvasRef"
    class="weather-canvas"
  ></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { themeState } from '../stores/uiState'

const canvasRef = ref(null)
let animationId = null
let drops = []
let lightningFlash = 0 // 0 to 1 opacity of flash
let activeBolt = null
let nextLightningTime = 0
let width = 0
let height = 0

// Audio elements
let rainAudio = null
let audioCtx = null
let thunderBuffers = []
let isPreloadingThunder = false
const thunderUrls = ['/thunder_clap_1.mp3', '/thunder_clap_2.mp3']

async function preloadThunderWebAudio() {
  if (isPreloadingThunder || thunderBuffers.length > 0) return
  isPreloadingThunder = true
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    }
    const loadAndDecode = async (url) => {
      const response = await fetch(url)
      const arrayBuffer = await response.arrayBuffer()
      return await audioCtx.decodeAudioData(arrayBuffer)
    }
    thunderBuffers = await Promise.all(thunderUrls.map(url => loadAndDecode(url)))
  } catch (e) {
    // ignore decoding errors gracefully
  } finally {
    isPreloadingThunder = false
  }
}

function startRainSound() {
  try {
    if (!rainAudio) {
      // AAC (.m4a) decodes natively on every modern browser, incl. Safari/iOS.
      // If a browser still can't play it, the rain sound is skipped — the
      // rain/lightning visual keeps running.
      const canPlayAac = document.createElement('audio').canPlayType('audio/mp4; codecs="mp4a.40.2"')
      if (canPlayAac) {
        rainAudio = new Audio('/rain_ambient.m4a')
        rainAudio.loop = true
        rainAudio.volume = 0.35 // Ambient level
      }
    }
    if (rainAudio) {
      rainAudio.play().catch(() => {
        // Browser autoplay policy might block this until user interacts with the page
      })
    }

    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume()
    }
  } catch (e) {
    // Graceful fallback if audio is not supported
  }
}

function stopRainSound() {
  if (rainAudio) {
    try {
      rainAudio.pause()
      rainAudio.currentTime = 0
    } catch (e) {}
  }
  if (audioCtx && audioCtx.state === 'running') {
    audioCtx.suspend()
  }
}

function playThunderSound() {
  try {
    if (thunderBuffers.length === 0) {
      preloadThunderWebAudio()
      return
    }
    
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume()
    }
    
    const randomBuffer = thunderBuffers[Math.floor(Math.random() * thunderBuffers.length)]
    if (randomBuffer && audioCtx) {
      const source = audioCtx.createBufferSource()
      source.buffer = randomBuffer
      
      const gainNode = audioCtx.createGain()
      gainNode.gain.value = Math.random() * 0.3 + 0.3 // Randomize volume (30% - 60%)
      
      source.connect(gainNode)
      gainNode.connect(audioCtx.destination)
      
      source.start(0)
    }
  } catch (e) {
    // Graceful fallback
  }
}

// Create rain drop object
class Drop {
  constructor() {
    this.reset()
    // Randomize initial Y position so it doesn't all start from top
    this.y = Math.random() * height
  }

  reset() {
    this.x = Math.random() * width
    this.y = -20
    this.length = Math.random() * 20 + 15
    this.speed = Math.random() * 15 + 15
    this.opacity = Math.random() * 0.15 + 0.05
    this.angle = -0.1 // slight slant
  }

  update() {
    this.y += this.speed
    this.x += this.speed * this.angle

    if (this.y > height) {
      this.reset()
    }
  }

  draw(ctx) {
    ctx.strokeStyle = `rgba(174, 194, 224, ${this.opacity})`
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(this.x + this.length * this.angle, this.y + this.length)
    ctx.stroke()
  }
}

function resizeCanvas() {
  const canvas = canvasRef.value
  if (!canvas) return
  width = window.innerWidth
  height = window.innerHeight
  canvas.width = width
  canvas.height = height

  // Initialize drops (responsive to screen size)
  const count = Math.floor((width * height) / 15000)
  drops = []
  for (let i = 0; i < count; i++) {
    drops.push(new Drop())
  }
}

function generateBolt(startX, startY, endY) {
  const points = [{ x: startX, y: startY }]
  let x = startX
  let y = startY
  const segments = 12
  const segmentHeight = (endY - startY) / segments
  
  for (let i = 0; i < segments; i++) {
    y += segmentHeight
    x += (Math.random() - 0.5) * 45
    points.push({ x, y })
  }
  return points
}

function triggerLightning() {
  // Lightning consists of 2-3 quick flashes
  const flashCount = Math.random() < 0.5 ? 2 : 3
  let currentFlash = 0

  function doFlash() {
    lightningFlash = Math.random() * 0.35 + 0.25 // flash opacity
    
    // Play thunder sound on the first flash of the sequence
    if (currentFlash === 0) {
      playThunderSound()
    }
    
    // 60% chance to draw a visible lightning bolt
    if (Math.random() < 0.6) {
      const startX = Math.random() * width
      activeBolt = generateBolt(startX, 0, height * (0.6 + Math.random() * 0.4))
    } else {
      activeBolt = null
    }
    
    setTimeout(() => {
      lightningFlash = 0
      activeBolt = null
      currentFlash++
      if (currentFlash < flashCount) {
        setTimeout(doFlash, Math.random() * 80 + 40)
      }
    }, 60)
  }

  doFlash()
  
  // Schedule next lightning (every 40-100 seconds to prevent spamming)
  nextLightningTime = Date.now() + Math.random() * 60000 + 40000
}

function tick() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')

  // Clear with translucent overlay depending on lightning flash
  ctx.clearRect(0, 0, width, height)

  // Draw lightning overlay and bolt
  if (lightningFlash > 0) {
    ctx.fillStyle = `rgba(220, 230, 255, ${lightningFlash})`
    ctx.fillRect(0, 0, width, height)
    
    if (activeBolt) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)'
      ctx.lineWidth = 3
      ctx.shadowColor = 'rgba(156, 180, 255, 1)'
      ctx.shadowBlur = 20
      ctx.beginPath()
      ctx.moveTo(activeBolt[0].x, activeBolt[0].y)
      for (let i = 1; i < activeBolt.length; i++) {
        ctx.lineTo(activeBolt[i].x, activeBolt[i].y)
      }
      ctx.stroke()
      ctx.shadowBlur = 0 // reset shadowBlur
    }

    // Decay flash
    lightningFlash -= 0.02
    if (lightningFlash < 0) lightningFlash = 0
  }

  // Draw & update drops
  drops.forEach(drop => {
    drop.update()
    drop.draw(ctx)
  })

  // Check for lightning
  if (Date.now() > nextLightningTime) {
    triggerLightning()
  }

  animationId = requestAnimationFrame(tick)
}

function startEffect() {
  nextTick(() => {
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    // First lightning happens between 15 and 45 seconds after starting
    nextLightningTime = Date.now() + Math.random() * 30000 + 15000
    localStorage.setItem('achievement_rain', 'true')
    preloadThunderWebAudio()
    startRainSound()
    tick()
  })
}

function stopEffect() {
  if (animationId) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
  window.removeEventListener('resize', resizeCanvas)
  stopRainSound()
}

watch(() => [themeState.isDark, themeState.isRaining], ([isDark, isRaining]) => {
  if (isDark && isRaining) {
    startEffect()
  } else {
    stopEffect()
  }
}, { immediate: true })

onUnmounted(() => {
  stopEffect()
})
</script>

<style scoped>
.weather-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 25; /* overlay behind navbar/modals but over page contents */
}
</style>

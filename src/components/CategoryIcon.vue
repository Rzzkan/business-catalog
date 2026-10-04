<template>
  <svg
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    viewBox="0 0 24 24"
  >
    <!-- 1. utensils -->
    <template v-if="activeIcon === 'utensils'">
      <path d="M4 10h16" />
      <path d="M5 10a7 7 0 0 0 14 0" />
      <path d="M8 10V5" />
      <path d="M12 10V5" />
      <path d="M16 10V5" />
    </template>
    
    <!-- 2. coffee -->
    <template v-else-if="activeIcon === 'coffee'">
      <path d="M5 8h12v6a5 5 0 0 1-10 0V8Z" />
      <path d="M17 10h1a3 3 0 0 1 0 6h-1" />
      <path d="M6 20h12" />
      <path d="M8 4v1" />
      <path d="M12 3v2" />
      <path d="M16 4v1" />
    </template>
    
    <!-- 3. shirt -->
    <template v-else-if="activeIcon === 'shirt'">
      <path d="M20.38 3.46 16 6l-1 1-1-1-4.38-2.54a1 1 0 0 0-1 .08l-4 3a1 1 0 0 0-.38.8v11.2a2 2 0 0 0 2 2h13.52a2 2 0 0 0 2-2V7.34a1 1 0 0 0-.38-.8l-4-3a1 1 0 0 0-1-.08Z" />
      <path d="M12 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
    </template>
    
    <!-- 4. palette -->
    <template v-else-if="activeIcon === 'palette'">
      <path d="M12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 14.16 3.1 16.07 4.8 17.2C5.3 17.5 5.2 18.3 4.6 18.3C3.2 18.3 2 19.5 2 20.9C2 21.5 2.5 22 3.1 22H12Z" />
      <circle cx="7.5" cy="10.5" r="1" fill="currentColor" />
      <circle cx="11.5" cy="7.5" r="1" fill="currentColor" />
      <circle cx="16.5" cy="9.5" r="1" fill="currentColor" />
      <circle cx="15.5" cy="14.5" r="1" fill="currentColor" />
    </template>
    
    <!-- 5. wrench -->
    <template v-else-if="activeIcon === 'wrench'">
      <path d="m14.7 6.3 3-3a4 4 0 0 1 5 5l-3 3M14.7 6.3 6.4 14.7a3 3 0 0 0 0 4.2l.6.6a3 3 0 0 0 4.2 0l8.3-8.3" />
      <path d="m5 19-2 2" />
    </template>
    
    <!-- 6. shopping-bag -->
    <template v-else-if="activeIcon === 'shopping-bag'">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18M16 10a4 4 0 0 1-8 0" />
    </template>
    
    <!-- 7. car -->
    <template v-else-if="activeIcon === 'car'">
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H6c-.6 0-1.1.2-1.4.7C3.5 9 2.5 10 2.5 10s-1 .5-1.5 1.1c-.6.7-1 1.6-1 2.5v3.4c0 .6.4 1 1 1h2" />
      <circle cx="7.5" cy="17" r="2.5" />
      <circle cx="16.5" cy="17" r="2.5" />
    </template>
    
    <!-- 8. home -->
    <template v-else-if="activeIcon === 'home'">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
      <path d="M9 22V12h6v10" />
    </template>
    
    <!-- 9. plug -->
    <template v-else-if="activeIcon === 'plug'">
      <path d="M12 2v6M8 8h8v4a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V8ZM12 16v6" />
    </template>
    
    <!-- 10. scissors -->
    <template v-else-if="activeIcon === 'scissors'">
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M20 4 8.12 11.88M20 20 8.12 12.12M14.8 14.8l5.2 5.2M14.8 9.2l5.2-5.2" />
    </template>
    
    <!-- 11. heart -->
    <template v-else-if="activeIcon === 'heart'">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </template>
    
    <!-- 12. book -->
    <template v-else-if="activeIcon === 'book'">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5v-15Z" />
    </template>
    
    <!-- 13. dumbbell -->
    <template v-else-if="activeIcon === 'dumbbell'">
      <path d="M6.5 6.5h11M18 4h3v16h-3zM3 4h3v16H3zM6.5 12h11" />
    </template>
    
    <!-- 14. gamepad -->
    <template v-else-if="activeIcon === 'gamepad'">
      <rect x="2" y="6" width="20" height="12" rx="3" />
      <path d="M6 12h4M8 10v4M15 11h.01M18 13h.01" />
    </template>
    
    <!-- 15. paw -->
    <template v-else-if="activeIcon === 'paw'">
      <path d="M12 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 13a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM18 13a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM12 21a5 5 0 0 0 5-5H7a5 5 0 0 0 5 5Z" />
    </template>
    
    <!-- 16. leaf -->
    <template v-else-if="activeIcon === 'leaf'">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 22 2c-2.48 5-3 6.5-4.1 12.2A7 7 0 0 1 11 20Z" />
      <path d="M19 5 11 13" />
    </template>
    
    <!-- 17. truck -->
    <template v-else-if="activeIcon === 'truck'">
      <path d="M14 18H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h8M14 6h4l4 4v6a2 2 0 0 1-2 2h-2" />
      <circle cx="7.5" cy="18" r="2.5" />
      <circle cx="16.5" cy="18" r="2.5" />
    </template>
    
    <!-- 18. music -->
    <template v-else-if="activeIcon === 'music'">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </template>
    
    <!-- 19. camera -->
    <template v-else-if="activeIcon === 'camera'">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </template>
    
    <!-- 20. briefcase -->
    <template v-else-if="activeIcon === 'briefcase'">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </template>
    
    <!-- 21. grid (default) -->
    <template v-else>
      <path d="M3 3h7v7H3zm11 0h7v7h-7zM3 14h7v7H3zm11 0h7v7h-7z" />
    </template>
  </svg>
</template>

<script setup>
import { computed } from 'vue'
import { umkmStore } from '../data/umkmData'

const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  }
})

const activeIcon = computed(() => {
  if (props.icon) return props.icon
  if (props.name) {
    // Look up in store
    const cat = umkmStore.categoriesList?.find(c => c.name === props.name)
    if (cat) return cat.icon
    
    // Legacy mapping fallback
    const map = {
      'Makanan': 'utensils',
      'Minuman': 'coffee',
      'Fashion': 'shirt',
      'Kerajinan': 'palette',
      'Jasa': 'wrench'
    }
    return map[props.name] || 'grid'
  }
  return 'grid'
})
</script>

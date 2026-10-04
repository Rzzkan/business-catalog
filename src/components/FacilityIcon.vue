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
    <!-- 1. WiFi -->
    <template v-if="activeIcon === 'wifi'">
      <path d="M12 20h.01" />
      <path d="M8.5 16.5a5 5 0 0 1 7 0" />
      <path d="M5 13a10 10 0 0 1 14 0" />
      <path d="M1.5 9.5a15 15 0 0 1 21 0" />
    </template>
    
    <!-- 2. Meja & Tempat Duduk -->
    <template v-else-if="activeIcon === 'seats'">
      <path d="M18 20V10H6v10M6 13h12" />
      <path d="M8 10V4h8v6" />
    </template>
    
    <!-- 3. Toilet -->
    <template v-else-if="activeIcon === 'toilet'">
      <circle cx="6" cy="5" r="1.5" />
      <path d="M4 20V10c0-.5.5-1 1-1h2c.5 0 1 .5 1 1v10" />
      <circle cx="18" cy="5" r="1.5" />
      <path d="M16 20V11c0-.5.5-1 1-1h2c.5 0 1 .5 1 1v9" />
      <path d="M12 2v20" />
    </template>
    
    <!-- 4. Tempat Parkir -->
    <template v-else-if="activeIcon === 'parking'">
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
    </template>
    
    <!-- 5. AC -->
    <template v-else-if="activeIcon === 'ac'">
      <path d="M12 2v20M17 5L7 19M19 17L5 7M20 12H4" />
      <path d="m10 4 2 2 2-2M10 20l2-2 2 2M20 10l-2 2 2 2M4 10l2 2-2 2M15 3.5l-1 2.5 2.5 1M9 20.5l1-2.5-2.5-1" />
    </template>
    
    <!-- 6. Mushola -->
    <template v-else-if="activeIcon === 'mushola'">
      <path d="M12 3a9 9 0 1 0 9 9 9.75 9.75 0 0 1-9-9Z" />
      <path d="M18 5v4M16 7h4" stroke-width="1.5" />
    </template>
    
    <!-- 7. Area Merokok -->
    <template v-else-if="activeIcon === 'smoking'">
      <path d="M18 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h15" />
      <path d="M14 12v4M18 12a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2" />
      <path d="M22 13v2" />
      <path d="M7 8c.5-1.5 1-3 2-3s1 1.5 2 3M11 8c.5-1.5 1-3 2-3s1 1.5 2 3" />
    </template>
    
    <!-- 8. Pembayaran Non-Tunai / QRIS / Cashless -->
    <template v-else-if="activeIcon === 'cashless'">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20M6 14h4" />
    </template>
    
    <!-- 9. Live Music / Musik -->
    <template v-else-if="activeIcon === 'music'">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </template>
    
    <!-- 10. Colokan Listrik -->
    <template v-else-if="activeIcon === 'plug'">
      <path d="M12 2v6M8 8h8v4a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V8ZM12 16v6" />
    </template>
    
    <!-- 11. Area Main Anak -->
    <template v-else-if="activeIcon === 'playground'">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <circle cx="9" cy="9" r="1" fill="currentColor" />
      <circle cx="15" cy="9" r="1" fill="currentColor" />
    </template>
    
    <!-- 12. Taman / Outdoor -->
    <template v-else-if="activeIcon === 'garden'">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 22 2c-2.48 5-3 6.5-4.1 12.2A7 7 0 0 1 11 20Z" />
      <path d="M19 5 11 13" />
    </template>
    
    <!-- 13. Akses Disabilitas / Roda -->
    <template v-else-if="activeIcon === 'wheelchair'">
      <circle cx="16" cy="4" r="1" />
      <path d="M12 12h3.5l1.5-3M6 18.5A6.5 6.5 0 1 0 12.5 12h-3" />
      <path d="M9.5 13.5 14 18v3" />
    </template>
    
    <!-- 14. Pet Friendly -->
    <template v-else-if="activeIcon === 'pet'">
      <path d="M12 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 13a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM18 13a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM12 21a5 5 0 0 0 5-5H7a5 5 0 0 0 5 5Z" />
    </template>
    
    <!-- 15. TV / Proyektor -->
    <template v-else-if="activeIcon === 'tv'">
      <rect x="2" y="7" width="20" height="13" rx="2" />
      <path d="m17 2-5 5-5-5M12 20v2M8 22h8" />
    </template>
    
    <!-- 16. Kopi / Minuman -->
    <template v-else-if="activeIcon === 'coffee'">
      <path d="M17 8h1a3 3 0 1 1 0 6h-1" />
      <path d="M5 8h12v6a5 5 0 0 1-10 0V8Z" />
      <path d="M6 20h12" />
    </template>
    
    <!-- 17. Buku / Reading Area -->
    <template v-else-if="activeIcon === 'book'">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5v-15Z" />
    </template>
    
    <!-- 18. Keamanan / CCTV -->
    <template v-else-if="activeIcon === 'security'">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </template>
    
    <!-- 19. Sepeda / Parkir Sepeda -->
    <template v-else-if="activeIcon === 'bike'">
      <circle cx="5.5" cy="17.5" r="2.5" />
      <circle cx="18.5" cy="17.5" r="2.5" />
      <path d="M15 17.5 11.5 10H6.5M11.5 10l-2-4.5h-3M18.5 17.5l-3-7.5H11" />
    </template>
    
    <!-- 20. Sparkles / Menarik -->
    <template v-else-if="activeIcon === 'sparkles'">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </template>
    
    <!-- Custom / Default Check -->
    <template v-else>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </template>
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: ''
  }
})

const activeIcon = computed(() => {
  if (props.icon) {
    return props.icon.toLowerCase().trim()
  }

  const norm = props.name.toLowerCase().trim()
  
  if (norm.includes('wifi')) {
    return 'wifi'
  } else if (norm.includes('meja') || norm.includes('duduk') || norm.includes('kursi') || norm.includes('seat')) {
    return 'seats'
  } else if (norm.includes('toilet') || norm.includes('restroom') || norm.includes('wc')) {
    return 'toilet'
  } else if (norm.includes('parkir') || norm.includes('parking')) {
    return 'parking'
  } else if (norm.includes('ac') || norm.includes('pendingin') || norm.includes('air conditioner')) {
    return 'ac'
  } else if (norm.includes('mushola') || norm.includes('musholla') || norm.includes('sholat') || norm.includes('prayer')) {
    return 'mushola'
  } else if (norm.includes('rokok') || norm.includes('smoking')) {
    return 'smoking'
  } else if (norm.includes('non-tunai') || norm.includes('non tunai') || norm.includes('cashless') || norm.includes('qris') || norm.includes('debit') || norm.includes('kredit') || norm.includes('card')) {
    return 'cashless'
  } else if (norm.includes('musik') || norm.includes('music')) {
    return 'music'
  } else if (norm.includes('colokan') || norm.includes('plug') || norm.includes('charger')) {
    return 'plug'
  } else if (norm.includes('mainan') || norm.includes('playground') || norm.includes('bermain')) {
    return 'playground'
  } else if (norm.includes('taman') || norm.includes('garden') || norm.includes('outdoor')) {
    return 'garden'
  } else if (norm.includes('disabilitas') || norm.includes('akses') || norm.includes('wheelchair')) {
    return 'wheelchair'
  } else if (norm.includes('hewan') || norm.includes('pet')) {
    return 'pet'
  } else if (norm.includes('tv') || norm.includes('layar') || norm.includes('proyektor')) {
    return 'tv'
  } else if (norm.includes('kopi') || norm.includes('minum') || norm.includes('teh') || norm.includes('coffee')) {
    return 'coffee'
  } else if (norm.includes('buku') || norm.includes('baca') || norm.includes('book')) {
    return 'book'
  } else if (norm.includes('keamanan') || norm.includes('security') || norm.includes('cctv')) {
    return 'security'
  } else if (norm.includes('sepeda') || norm.includes('bike')) {
    return 'bike'
  } else if (norm.includes('menarik') || norm.includes('sparkles') || norm.includes('bintang')) {
    return 'sparkles'
  }
  
  return 'default'
})
</script>

<template>
  <div class="space-y-2">
    <label class="form-label">{{ label }}</label>
    <div
      v-for="(item, index) in modelValue"
      :key="index"
      class="space-y-2 p-3 rounded-xl border border-gray-100 dark:border-white/10 bg-gray-50/60 dark:bg-white/[0.02]"
    >
      <div class="flex gap-2">
        <ImageUrlInput
          :model-value="photoEntryUrl(item)"
          :variant="variant"
          class="flex-1"
          @update:modelValue="value => updateUrlAt(index, value)"
        />
        <button
          type="button"
          class="icon-action text-[#FA6781] hover:bg-[#FA6781]/10 self-start"
          @click="removeAt(index)"
        >
          <span class="legend-icon">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="m19 7-.9 12.1A2 2 0 0 1 16.1 21H7.9a2 2 0 0 1-2-1.9L5 7m5 4v6m4-6v6m1-10V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3M4 7h16" />
            </svg>
          </span>
        </button>
      </div>
      <input
        :value="photoEntryCaption(item)"
        type="text"
        class="form-input text-sm"
        :placeholder="`Keterangan foto (opsional), contoh: ${label} ${index + 1}`"
        @input="e => updateCaptionAt(index, e.target.value)"
      />
    </div>
    <button type="button" class="add-inline-button" @click="addItem">
      <span class="legend-icon">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </span>
      Tambah {{ label }}
    </button>
  </div>
</template>

<script setup>
// Shared by AdminPage.vue and OwnerDashboardPage.vue for the repeatable photo
// URL lists (Foto Tempat / Foto Produk / Foto Menu). Each row is an
// ImageUrlInput (paste a URL or upload a file straight to R2) plus a text
// field for an optional custom caption, which is what BusinessDetailPage.vue
// shows instead of the default "Suasana Tempat 1" / "Foto Produk 1" style
// auto-label once it's filled in.
import ImageUrlInput from './ImageUrlInput.vue'
import { photoEntryUrl, photoEntryCaption } from '../utils/photoEntry'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  label: {
    type: String,
    required: true
  },
  // Forwarded to each ImageUrlInput — see its `variant` prop.
  variant: {
    type: String,
    default: 'gallery'
  }
})
const emit = defineEmits(['update:modelValue'])

function updateUrlAt(index, value) {
  const next = [...props.modelValue]
  next[index] = { url: value, caption: photoEntryCaption(next[index]) }
  emit('update:modelValue', next)
}

function updateCaptionAt(index, value) {
  const next = [...props.modelValue]
  next[index] = { url: photoEntryUrl(next[index]), caption: value }
  emit('update:modelValue', next)
}

function removeAt(index) {
  const next = props.modelValue.filter((_, i) => i !== index)
  emit('update:modelValue', next.length ? next : [{ url: '', caption: '' }])
}

function addItem() {
  emit('update:modelValue', [...props.modelValue, { url: '', caption: '' }])
}
</script>

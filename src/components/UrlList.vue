<template>
  <div class="space-y-2">
    <label class="form-label">{{ label }}</label>
    <div v-for="(url, index) in modelValue" :key="index" class="flex gap-2">
      <ImageUrlInput
        :model-value="url"
        class="flex-1"
        @update:modelValue="value => updateAt(index, value)"
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
// ImageUrlInput, so every row can either be pasted by hand or filled by
// uploading a file straight to R2.
import ImageUrlInput from './ImageUrlInput.vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  label: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['update:modelValue'])

function updateAt(index, value) {
  const next = [...props.modelValue]
  next[index] = value
  emit('update:modelValue', next)
}

function removeAt(index) {
  const next = props.modelValue.filter((_, i) => i !== index)
  emit('update:modelValue', next.length ? next : [''])
}

function addItem() {
  emit('update:modelValue', [...props.modelValue, ''])
}
</script>

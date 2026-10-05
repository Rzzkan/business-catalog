<template>
  <div>
    <div class="flex gap-2">
      <input
        :value="modelValue"
        type="url"
        class="form-input flex-1"
        :placeholder="placeholder"
        :disabled="uploading"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <label
        class="icon-action shrink-0 cursor-pointer"
        :class="uploading ? 'text-gray-300 cursor-not-allowed' : 'text-[#FA6781] hover:bg-[#FA6781]/10'"
        :title="uploading ? 'Mengunggah...' : 'Upload gambar dari perangkat'"
      >
        <input
          type="file"
          accept="image/*"
          class="hidden"
          :disabled="uploading"
          @change="handleFileChange"
        />
        <svg v-if="!uploading" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 16.5V18a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1.5M7 9l5-5 5 5M12 4v12" />
        </svg>
        <svg v-else class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4Z"></path>
        </svg>
      </label>
    </div>
    <p v-if="errorMessage" class="text-xs text-[#FA6781] mt-1">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
// A URL text field paired with an upload button: picking a file uploads it
// straight to Cloudflare R2 (via the shared uploadImageToR2 helper) and fills
// the field with the resulting public URL. Pasting a URL by hand still works
// exactly as before, so existing records with external links keep working.
import { ref } from 'vue'
import { uploadImageToR2 } from '../utils/r2Upload'

defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: 'https://example.com/foto.jpg' }
})
const emit = defineEmits(['update:modelValue'])

const uploading = ref(false)
const errorMessage = ref('')

async function handleFileChange(event) {
  const file = event.target.files?.[0]
  if (!file) return
  uploading.value = true
  errorMessage.value = ''
  try {
    const publicUrl = await uploadImageToR2(file)
    emit('update:modelValue', publicUrl)
  } catch (err) {
    errorMessage.value = err?.message || 'Upload gagal. Silakan coba lagi.'
  } finally {
    uploading.value = false
    event.target.value = ''
  }
}
</script>

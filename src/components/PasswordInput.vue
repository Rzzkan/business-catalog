<template>
  <div class="relative">
    <input
      :id="id"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :type="visible ? 'text' : 'password'"
      :autocomplete="autocomplete"
      :placeholder="placeholder"
      :class="[inputClass, 'pr-11']"
    />
    <button
      type="button"
      @click="visible = !visible"
      :aria-label="visible ? 'Sembunyikan password' : 'Tampilkan password'"
      :title="visible ? 'Sembunyikan password' : 'Tampilkan password'"
      class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
    >
      <svg v-if="visible" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0 1 12 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 0 1 1.563-3.029m5.858.908a3 3 0 1 1 4.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878 3 3m6.878 6.878L21 21" />
      </svg>
      <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7Z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  modelValue: { type: String, default: '' },
  id: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  autocomplete: { type: String, default: 'current-password' },
  inputClass: { type: String, default: '' }
})
defineEmits(['update:modelValue'])

const visible = ref(false)
</script>

<template>
  <div class="relative" ref="rootEl">
    <input
      :value="modelValue"
      type="text"
      class="form-input"
      :placeholder="placeholder"
      autocomplete="off"
      @input="handleInput"
      @focus="open = true"
    />
    <div
      v-if="open && filteredOwners.length"
      class="absolute left-0 right-0 z-20 mt-1 max-h-48 overflow-y-auto bg-white border border-gray-100 rounded-xl shadow-lg py-1"
    >
      <button
        v-for="owner in filteredOwners"
        :key="owner.id"
        type="button"
        class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#FAE7CB]/30 transition-colors"
        @click="select(owner.nama)"
      >
        {{ owner.nama }}
      </button>
    </div>
    <p v-if="showNewNameHint" class="text-xs text-gray-400 mt-1">
      Nama belum terdaftar sebagai akun pemilik — tetap bisa disimpan sebagai teks biasa.
    </p>
  </div>
</template>

<script setup>
// Searchable dropdown for "Nama Pemilik": suggests names already registered as
// owner accounts (ownerStore) so the admin can just pick one instead of typing
// it from scratch, while still allowing free text for an owner who doesn't have
// an account yet. Purely a UX helper — it only fills form.namaPemilik with a
// plain string, same as before, and does not link the business to the owner
// account (that link is managed separately via "Akun Pemilik" / businessIds).
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ownerStore } from '../data/ownerData'

const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: 'Masukkan nama pemilik' }
})
const emit = defineEmits(['update:modelValue'])

const open = ref(false)
const rootEl = ref(null)

// De-duplicated list of registered owner names (an owner account can in theory
// share a name with another, so dedupe by lowercase name for the suggestions).
const ownerNames = computed(() => {
  const seen = new Set()
  const list = []
  for (const owner of ownerStore.getAll()) {
    const nama = (owner.nama || '').trim()
    const key = nama.toLowerCase()
    if (nama && !seen.has(key)) {
      seen.add(key)
      list.push(owner)
    }
  }
  return list
})

const filteredOwners = computed(() => {
  const q = props.modelValue.trim().toLowerCase()
  if (!q) return ownerNames.value
  return ownerNames.value.filter(owner => owner.nama.toLowerCase().includes(q))
})

const exactMatch = computed(() =>
  ownerNames.value.some(owner => owner.nama.toLowerCase() === props.modelValue.trim().toLowerCase())
)

const showNewNameHint = computed(
  () => ownerNames.value.length > 0 && props.modelValue.trim().length > 0 && !exactMatch.value
)

function handleInput(event) {
  emit('update:modelValue', event.target.value)
  open.value = true
}

function select(nama) {
  emit('update:modelValue', nama)
  open.value = false
}

function handleClickOutside(event) {
  if (rootEl.value && !rootEl.value.contains(event.target)) {
    open.value = false
  }
}

onMounted(() => document.addEventListener('mousedown', handleClickOutside))
onUnmounted(() => document.removeEventListener('mousedown', handleClickOutside))
</script>

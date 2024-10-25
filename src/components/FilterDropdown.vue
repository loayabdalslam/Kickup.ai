<script setup lang="ts">
defineProps<{
  label: string
  value: string
  options: string[]
}>()
</script>

<template>
  <div class="relative">
    <label class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <select
      class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
    >
      <option v-for="option in options" :key="option" :selected="option === value">
        {{ option }}
      </option>
    </select>
  </div>
</template>
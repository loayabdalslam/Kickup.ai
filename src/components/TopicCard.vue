<script setup lang="ts">
defineProps<{
  name: string
  percentage: number
  icon: string
  type: 'weak' | 'strong'
}>()
</script>

<template>
  <div class="flex items-center space-x-4">
    <div class="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
      <span class="text-xl">{{ icon }}</span>
    </div>
    <div class="flex-1 min-w-0">
      <p class="text-sm font-medium text-gray-900">{{ name }}</p>
      <div class="relative w-full h-2 bg-gray-100 rounded-full mt-1">
        <div
          class="absolute left-0 top-0 h-full rounded-full"
          :class="type === 'strong' ? 'bg-green-500' : 'bg-red-500'"
          :style="{ width: `${percentage}%` }"
        ></div>
      </div>
    </div>
    <div class="flex-shrink-0">
      <span class="text-sm font-medium" :class="type === 'strong' ? 'text-green-600' : 'text-red-600'">
        {{ percentage }}% Correct
      </span>
    </div>
  </div>
</template>
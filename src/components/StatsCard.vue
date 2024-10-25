<script setup lang="ts">
defineProps<{
  title: string
  value?: string
  total?: string
  trend?: 'up' | 'down'
  sparkline?: boolean
  chart?: boolean
}>()
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow">
    <div class="flex justify-between items-start">
      <div>
        <h3 class="text-sm font-medium text-gray-500">{{ title }}</h3>
        <div class="mt-1 flex items-baseline">
          <p class="text-2xl font-semibold text-gray-900">{{ value }}</p>
          <p v-if="total" class="ml-1 text-sm text-gray-500">{{ total }}</p>
        </div>
      </div>
      <div v-if="trend" :class="[
        'inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium',
        trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      ]">
        <svg v-if="trend === 'up'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
    <div v-if="sparkline" class="mt-4">
      <svg class="w-full h-8">
        <path d="M0,16 L4,14 L8,15 L12,11 L16,12 L20,8 L24,9" 
              fill="none" 
              stroke="#3b82f6" 
              stroke-width="2" />
      </svg>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  title: string
  items: Array<{
    name: string
    points: number
    correct: number
    avatar?: string
    trend: 'up' | 'down'
  }>
}>()
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow">
    <h3 class="text-lg font-medium mb-4">{{ title }}</h3>
    <div class="space-y-4">
      <div v-for="(item, index) in items" :key="item.name" 
           class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <span class="text-gray-500">{{ index + 1 }}</span>
          <div v-if="item.avatar" class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            {{ item.avatar }}
          </div>
          <div>
            <p class="text-sm font-medium text-gray-900">{{ item.name }}</p>
            <p class="text-sm text-gray-500">{{ item.points }} Points / {{ item.correct }}% Correct</p>
          </div>
        </div>
        <div :class="[
          'flex items-center space-x-2',
          item.trend === 'up' ? 'text-green-600' : 'text-red-600'
        ]">
          <svg v-if="item.trend === 'up'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <span class="text-sm font-medium">{{ index + 1 }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
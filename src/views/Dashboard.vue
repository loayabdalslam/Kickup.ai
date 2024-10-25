<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import TopicCard from '../components/TopicCard.vue'
import LeaderboardCard from '../components/LeaderboardCard.vue'
import StatsCard from '../components/StatsCard.vue'
import FilterDropdown from '../components/FilterDropdown.vue'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const timeframe = ref('All-time')
const people = ref('All')
const topic = ref('All')

const weakestTopics = ref([
  { name: 'Food Safety', percentage: 74, icon: '🍽️' },
  { name: 'Compliance Basics Procedures', percentage: 52, icon: '📋' },
  { name: 'Company Networking', percentage: 36, icon: '🌐' }
])

const strongestTopics = ref([
  { name: 'Covid Protocols', percentage: 95, icon: '🏥' },
  { name: 'Cyber Security Basics', percentage: 92, icon: '🔒' },
  { name: 'Social Media Policies', percentage: 89, icon: '📱' }
])

const userLeaderboard = ref([
  { name: 'Jesse Thomas', points: 847, correct: 98, avatar: '👨‍💼', trend: 'up' },
  { name: 'Thisal Mathewzhagun', points: 837, correct: 89, avatar: '👩‍💼', trend: 'down' }
])

const groupLeaderboard = ref([
  { name: 'Houston Facility', points: 92, correct: 95, trend: 'up' },
  { name: 'Test Group', points: 92, correct: 95, trend: 'down' }
])

const activityData = ref({
  labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
  datasets: [{
    label: 'Monthly Activity',
    data: [100, 220, 180, 200, 180, 250, 120, 180, 200, 220, 280, 300],
    fill: false,
    borderColor: '#3b82f6',
    tension: 0.4,
    borderWidth: 2
  }]
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: '#f3f4f6'
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header with filters -->
    <div class="flex items-center justify-between bg-white p-4 rounded-lg shadow">
      <div class="flex space-x-4">
        <FilterDropdown label="Timeframe" :value="timeframe" :options="['All-time', 'This Month', 'This Week']" />
        <FilterDropdown label="People" :value="people" :options="['All', 'Team A', 'Team B']" />
        <FilterDropdown label="Topic" :value="topic" :options="['All', 'Safety', 'Compliance']" />
      </div>
      <button class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md flex items-center space-x-2">
        <span>Download</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      </button>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-4 gap-4">
      <StatsCard title="Active Users" value="27" total="/80" />
      <StatsCard title="Questions Answered" value="3,298" />
      <StatsCard title="Av. Session Length" value="2m 34s" />
      <StatsCard title="Activity" chart />
    </div>

    <!-- Knowledge Stats -->
    <div class="grid grid-cols-3 gap-4">
      <StatsCard title="Starting Knowledge" value="64%" trend="up" sparkline />
      <StatsCard title="Current Knowledge" value="86%" trend="up" sparkline />
      <StatsCard title="Knowledge Gain" value="+34%" trend="up" sparkline />
    </div>

    <!-- Activity Chart -->
    <div class="bg-white p-6 rounded-lg shadow">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-medium">Activity</h3>
        <select class="bg-gray-100 border-0 rounded-md px-3 py-1">
          <option>Month</option>
          <option>Week</option>
          <option>Day</option>
        </select>
      </div>
      <div class="h-64">
        <Line :data="activityData" :options="chartOptions" />
      </div>
    </div>

    <!-- Topics Grid -->
    <div class="grid grid-cols-2 gap-6">
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-medium mb-4">Weakest Topics</h3>
        <div class="space-y-4">
          <TopicCard v-for="topic in weakestTopics" 
            :key="topic.name"
            :name="topic.name"
            :percentage="topic.percentage"
            :icon="topic.icon"
            type="weak"
          />
        </div>
      </div>
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-medium mb-4">Strongest Topics</h3>
        <div class="space-y-4">
          <TopicCard v-for="topic in strongestTopics"
            :key="topic.name"
            :name="topic.name"
            :percentage="topic.percentage"
            :icon="topic.icon"
            type="strong"
          />
        </div>
      </div>
    </div>

    <!-- Leaderboards -->
    <div class="grid grid-cols-2 gap-6">
      <LeaderboardCard title="User Leaderboard" :items="userLeaderboard" />
      <LeaderboardCard title="Groups Leaderboard" :items="groupLeaderboard" />
    </div>
  </div>
</template>
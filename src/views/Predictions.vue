<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Line } from 'vue-chartjs';
import { PredictionService } from '../services/prediction.service';
import type { ChartData, ChartOptions } from 'chart.js';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const predictionService = new PredictionService();
const salesData = ref<number[]>([]);
const predictions = ref<number[]>([]);
const isTraining = ref(false);
const error = ref<string | null>(null);

const chartData = ref<ChartData<'line'>>({
  labels: [],
  datasets: [
    {
      label: 'Actual Sales',
      data: [],
      borderColor: '#2563eb',
      fill: false
    },
    {
      label: 'Predicted Sales',
      data: [],
      borderColor: '#dc2626',
      fill: false
    }
  ]
});

const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true
    }
  }
};

const handleFileUpload = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  try {
    error.value = null;
    isTraining.value = true;
    const text = await file.text();
    const data = text.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(Number);

    if (data.some(isNaN)) {
      throw new Error('Invalid data format. Please ensure all lines contain valid numbers.');
    }

    if (data.length < 10) {
      throw new Error('Please provide at least 10 data points for accurate predictions.');
    }

    salesData.value = data;
    await trainModel(data);
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'An error occurred while processing the file.';
  } finally {
    isTraining.value = false;
  }
};

const trainModel = async (data: number[]) => {
  try {
    predictionService.train(data);
    predictions.value = predictionService.predict(data);
    updateChart();
  } catch (e) {
    error.value = 'An error occurred during model training. Please try again.';
    throw e;
  }
};

const updateChart = () => {
  const labels = [...Array(salesData.value.length + predictions.value.length).keys()].map(i => `Point ${i + 1}`);
  
  chartData.value = {
    labels,
    datasets: [
      {
        label: 'Actual Sales',
        data: [...salesData.value, ...Array(predictions.value.length).fill(null)],
        borderColor: '#2563eb',
        fill: false
      },
      {
        label: 'Predicted Sales',
        data: [...Array(salesData.value.length).fill(null), ...predictions.value],
        borderColor: '#dc2626',
        fill: false
      }
    ]
  };
};
</script>

<template>
  <div class="space-y-6">
    <div class="bg-white shadow rounded-lg p-6">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Sales Predictions</h3>
      
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700">Upload Sales Data (CSV)</label>
        <input 
          type="file" 
          accept=".csv,.txt"
          @change="handleFileUpload"
          :disabled="isTraining"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
        <p class="mt-2 text-sm text-gray-500">Upload a CSV file with one sales value per line</p>
        
        <div v-if="error" class="mt-2 text-sm text-red-600">
          {{ error }}
        </div>
        
        <div v-if="isTraining" class="mt-2 text-sm text-blue-600">
          Training model... Please wait.
        </div>
      </div>

      <div v-if="salesData.length > 0" class="h-96">
        <Line 
          :data="chartData"
          :options="chartOptions"
        />
      </div>
      
      <div v-else class="h-96 flex items-center justify-center text-gray-500">
        Upload data to see predictions
      </div>
    </div>
  </div>
</template>
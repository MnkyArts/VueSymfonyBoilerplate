<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import api from '@/api'
import { tryCatch } from '@/lib/tryCatch';

const steps = ref([
  { 
    id: 1, 
    title: 'Vue.js Frontend', 
    description: 'The frontend is running successfully!', 
    completed: true 
  },
  { 
    id: 2, 
    title: 'Symfony Backend', 
    description: 'Checking if the Symfony API is running on port 8000...', 
    completed: false 
  },
  { 
    id: 3, 
    title: 'Database Connection', 
    description: 'Checking database connection...', 
    completed: false 
  }
])

// Computed property to check if all steps are completed
const allStepsCompleted = computed(() => {
  return steps.value.every(step => step.completed)
})

// Computed property for the welcome message
const welcomeMessage = computed(() => {
  return allStepsCompleted.value 
    ? 'Vue Symfony Boilerplate is ready for development!' 
    : 'Vue Symfony Boilerplate setup in progress...'
})

// Computed property for the welcome message color class
const welcomeMessageClass = computed(() => {
  return allStepsCompleted.value 
    ? 'text-emerald-600 dark:text-emerald-400' 
    : 'text-amber-600 dark:text-amber-400'
})

// Check Symfony backend status
const checkBackendStatus = async () => {
  const { response, error } = await tryCatch(api.get('/status'));

  if (response) {
    steps.value[1].completed = true;
    steps.value[1].description = 'Symfony API is running successfully!';
  } else {
    console.error('Backend check error:', error);
    steps.value[1].description = 'Could not connect to Symfony API. Is it running?';
  }
};

// Check database connection
const checkDatabaseStatus = async () => {
  const { response, error } = await tryCatch(api.get('/database/status'));

  if (response) {
    steps.value[2].completed = true;
    steps.value[2].description = 'Database connection established successfully!';
  } else {
    console.error('Database check error:', error);
    steps.value[2].description = 'Could not connect to database. Check your .env configuration.';
  }
};

// Function to refresh all status checks
const refreshStatus = async () => {
  // Reset descriptions to loading state
  steps.value[1].description = 'Checking if the Symfony API is running on port 8000...'
  steps.value[2].description = 'Checking database connection...'
  
  await checkBackendStatus()
  await checkDatabaseStatus()
}

onMounted(refreshStatus)
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <!-- Welcome Message -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-4">Welcome to VSB!</h1>
      <p class="text-xl transition-colors duration-300" :class="welcomeMessageClass">
        {{ welcomeMessage }}
      </p>
      
      <!-- Status indicator -->
      <div class="mt-4 flex justify-center">
        <button 
          @click="refreshStatus" 
          class="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 rounded-full shadow-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
          <!-- Refresh icon -->
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-slate-500">
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
            <path d="M21 3v5h-5"></path>
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
            <path d="M3 21v-5h5"></path>
          </svg>
          <span class="text-sm font-medium">Refresh Status</span>
        </button>
      </div>
    </div>

    <!-- Setup Status -->
    <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-8">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-bold">Setup Status</h2>
        
        <!-- Status indicator -->
        <div 
          class="px-3 py-1 rounded-full text-sm font-medium"
          :class="allStepsCompleted 
            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' 
            : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'"
        >
          {{ allStepsCompleted ? 'All systems ready' : 'Setup in progress' }}
        </div>
      </div>
      
      <div class="space-y-4">
        <div 
          v-for="step in steps" 
          :key="step.id"
          class="flex items-start gap-3 p-3 rounded-lg"
          :class="step.completed ? 'bg-emerald-50 dark:bg-emerald-900/20' : 'bg-slate-100 dark:bg-slate-700/30'"
        >
          <div 
            class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
            :class="step.completed ? 'bg-emerald-100 dark:bg-emerald-800' : 'bg-slate-200 dark:bg-slate-700'"
          >
            <!-- Check Circle icon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
              class="w-5 h-5" 
              :class="step.completed ? 'text-emerald-500' : 'text-slate-400 dark:text-slate-500'">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <div>
            <h3 class="font-medium">{{ step.title }}</h3>
            <p class="text-sm text-slate-600 dark:text-slate-400">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Links -->
    <div class="grid md:grid-cols-3 gap-4 mb-8">
      <a 
        href="https://github.com/MnkyArts/VueSymfonyBoilerplate" 
        target="_blank"
        class="flex flex-col items-center p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
      >
        <!-- Github icon -->
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 mb-2 text-slate-700 dark:text-slate-300">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
          <path d="M9 18c-4.51 2-5-2-7-2"></path>
        </svg>
        <span class="font-medium">GitHub Repository</span>
      </a>
      
      <a 
        href="https://vuejs.org/guide/introduction.html" 
        class="flex flex-col items-center p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
      >
        <!-- Book icon -->
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 mb-2 text-slate-700 dark:text-slate-300">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
        </svg>
        <span class="font-medium">Vue Documentation</span>
      </a>
      
      <a 
        href="https://symfony.com/doc/current/index.html" 
        class="flex flex-col items-center p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
      >
        <!-- Terminal icon -->
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 mb-2 text-slate-700 dark:text-slate-300">
          <polyline points="4 17 10 11 4 5"></polyline>
          <line x1="12" x2="20" y1="19" y2="19"></line>
        </svg>
        <span class="font-medium">Symfony Documentation</span>
      </a>
    </div>

    <!-- Getting Started -->
    <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
      <h2 class="text-xl font-bold mb-4">Next Steps</h2>
      
      <ol class="list-decimal pl-5 space-y-2 text-slate-700 dark:text-slate-300">
        <li>Edit <code class="bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-sm">views/Home.vue</code> to customize this page</li>
        <li>Create new API endpoints in your Symfony backend</li>
        <li>Configure your database connection in the <code class="bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-sm">.env</code> file</li>
        <li>Add authentication using the pre-configured JWT system</li>
        <li>Build something amazing!</li>
      </ol>
    </div>
  </div>
</template>
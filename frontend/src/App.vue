<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import api from '@/api'
import { tryCatch } from '@/lib/tryCatch';

const apiStatus = ref('checking...')
const apiStatusClass = ref('text-yellow-500')

// Check connection to Symfony backend
onMounted(async () => {
  const { response, error } = await tryCatch(api.get('/status'));

  if (response) {
    apiStatus.value = 'connected';
    apiStatusClass.value = 'text-green-500';
  } else {
    apiStatus.value = 'disconnected: ' + error.message;
    apiStatusClass.value = 'text-red-500';
  }
});
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
    <header class="border-b border-slate-200 dark:border-slate-800">
      <div class="container mx-auto px-4 py-6">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <!-- Logo -->
          <div class="flex items-center gap-3">
            <div class="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
              <!-- Code icon -->
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
            </div>
            <span class="text-xl font-bold">VSB</span>
          </div>
          
          <!-- API Status -->
          <div class="flex items-center gap-2 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
            <!-- Server icon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-slate-500">
              <rect width="20" height="8" x="2" y="2" rx="2" ry="2"></rect>
              <rect width="20" height="8" x="2" y="14" rx="2" ry="2"></rect>
              <line x1="6" x2="6" y1="6" y2="6"></line>
              <line x1="6" x2="6" y1="18" y2="18"></line>
            </svg>
            <span class="text-sm text-slate-600 dark:text-slate-400">API:</span>
            <span class="text-sm font-medium" :class="apiStatusClass">{{ apiStatus }}</span>
          </div>
          
          <!-- Navigation -->
          <nav class="flex gap-4">
            <RouterLink to="/" class="px-3 py-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
              Home
            </RouterLink>
            <RouterLink to="/about" class="px-3 py-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
              About
            </RouterLink>
            <RouterLink to="/demo" class="px-3 py-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
              Demo
            </RouterLink>
          </nav>
        </div>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8">
      <!-- Router View -->
      <RouterView />
    </main>
  </div>
</template>
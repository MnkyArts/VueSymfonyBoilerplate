<script setup>
import { ref, onMounted } from 'vue'

const users = ref([])
const loading = ref(false)
const error = ref(null)
const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// Fetch users from the API
const fetchUsers = async () => {
  loading.value = true
  error.value = null
  
  try {
    const response = await fetch(`${apiBaseUrl}/users`)
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }
    
    const data = await response.json()
    users.value = data
  } catch (err) {
    console.error('Error fetching users:', err)
    error.value = err.message || 'Failed to fetch users'
  } finally {
    loading.value = false
  }
}

onMounted(fetchUsers)
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold">API Demo</h1>
      
      <button 
        @click="fetchUsers" 
        class="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
        :disabled="loading"
      >
        <!-- RefreshCw icon -->
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4" :class="{ 'animate-spin': loading }">
          <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
          <path d="M21 3v5h-5"></path>
          <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
          <path d="M3 21v-5h5"></path>
        </svg>
        Refresh
      </button>
    </div>
    
    <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-8">
      <div class="flex items-center gap-3 mb-4">
        <!-- Server icon -->
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-emerald-500">
          <rect width="20" height="8" x="2" y="2" rx="2" ry="2"></rect>
          <rect width="20" height="8" x="2" y="14" rx="2" ry="2"></rect>
          <line x1="6" x2="6" y1="6" y2="6"></line>
          <line x1="6" x2="6" y1="18" y2="18"></line>
        </svg>
        <h2 class="text-xl font-bold">Symfony API Connection</h2>
      </div>
      
      <p class="text-slate-700 dark:text-slate-300 mb-4">
        This demo shows how to connect to your Symfony backend API. It attempts to fetch users from the 
        <code class="bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-sm">/api/users</code> endpoint.
      </p>
      
      <!-- API Error -->
      <div v-if="error" class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
        <div class="flex items-start gap-3">
          <!-- AlertCircle icon -->
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" x2="12" y1="8" y2="12"></line>
            <line x1="12" x2="12.01" y1="16" y2="16"></line>
          </svg>
          <div>
            <h3 class="font-medium text-red-700 dark:text-red-400">API Error</h3>
            <p class="text-sm text-red-600 dark:text-red-300">{{ error }}</p>
            <p class="text-sm text-red-600 dark:text-red-300 mt-2">
              Make sure your Symfony backend is running at: {{ apiBaseUrl }}
            </p>
          </div>
        </div>
      </div>
      
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center py-8">
        <!-- RefreshCw icon (spinning) -->
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-emerald-500 animate-spin">
          <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
          <path d="M21 3v5h-5"></path>
          <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
          <path d="M3 21v-5h5"></path>
        </svg>
      </div>
      
      <!-- Results -->
      <div v-else-if="users.length > 0" class="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
        <table class="w-full text-left">
          <thead class="bg-slate-100 dark:bg-slate-700">
            <tr>
              <th class="px-4 py-3 font-medium">ID</th>
              <th class="px-4 py-3 font-medium">Name</th>
              <th class="px-4 py-3 font-medium">Email</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
            <tr v-for="user in users" :key="user.id" class="hover:bg-slate-50 dark:hover:bg-slate-700/50">
              <td class="px-4 py-3">{{ user.id }}</td>
              <td class="px-4 py-3">{{ user.name }}</td>
              <td class="px-4 py-3">{{ user.email }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- No Results -->
      <div v-else-if="!loading && !error" class="text-center py-8 text-slate-500 dark:text-slate-400">
        <p>No users found. You may need to create some users in your Symfony backend.</p>
      </div>
    </div>
    
    <!-- Code Example -->
    <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
      <h2 class="text-xl font-bold mb-4">Code Example</h2>
      
      <div class="bg-slate-900 text-slate-200 p-4 rounded-lg font-mono text-sm overflow-x-auto">
        <pre>
// Fetch data from Symfony API
const fetchData = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/resource')
    const data = await response.json()
    return data
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}
        </pre>
      </div>
    </div>
  </div>
</template>
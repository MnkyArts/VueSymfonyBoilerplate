<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/api'
import { tryCatch } from '@/lib/tryCatch';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore()

// Mock authentication state
const showLoginForm = ref(false)
const loginForm = ref({
  email: '',
  password: ''
})
const registerForm = ref({
  email: '',
  password: ''
})
const authError = ref('')

const users = ref<{ id: number; name: string; email: string }[]>([])
const loading = ref(false)
const fetchError = ref<Error | null>(null)

// Mock login function
const login = () => {
  // Simple validation
  if (!loginForm.value.email || !loginForm.value.password) {
    authError.value = 'Please fill in all fields'
    return
  }

  userStore.login(loginForm.value);
  authError.value = ''
  showLoginForm.value = false
  
  // Clear form
  loginForm.value = { email: '', password: '' }
}

// Mock register function
const register = () => {
  if (!registerForm.value || !registerForm.value.email || !registerForm.value.password) {
    authError.value = 'Please fill in all fields';
    return;
  }

  userStore.register(registerForm.value);

  authError.value = '';
  showLoginForm.value = false;

  // Clear form
  registerForm.value = { email: '', password: '' };
};

// Mock logout function
const logout = () => {
  userStore.logout();
  authError.value = '';
  showLoginForm.value = false;
}

// Toggle login/register form
const toggleAuthForm = () => {
  showLoginForm.value = !showLoginForm.value
  authError.value = ''
}

// Fetch users from API
const fetchUsers = async () => {
  loading.value = true;
  fetchError.value = null;

  const { response, error } = await tryCatch(api.get('/users'));

  if (response) {
    users.value = response.data;
  } else {
    fetchError.value = error;
    console.error('Error fetching users:', error);
  }

  loading.value = false;
};

onMounted(fetchUsers)

// Add tab functionality to toggle between Login and Register forms
const activeTab = ref('login'); // Default to login tab

const setActiveTab = (tab: string) => {
  activeTab.value = tab;
  authError.value = ''; // Clear any existing error messages
};
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold mb-2">API Demo</h1>
      <p class="text-slate-600 dark:text-slate-400">
        This page demonstrates API interaction and authentication
      </p>
    </div>
    
    <!-- Authentication Demo -->
    <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-8">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-bold">Authentication Demo</h2>
        
        <div v-if="!userStore.isAuthenticated" class="flex items-center gap-3">
          <button 
            @click="toggleAuthForm" 
            class="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md transition-colors"
          >
            Login / Register
          </button>
        </div>
        
        <div v-else class="flex items-center gap-3">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-500">
              <!-- User icon -->
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <span class="font-medium">{{ userStore.user?.email }}</span>
          </div>
          
          <button 
            @click="logout" 
            class="px-3 py-1 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-md text-sm transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
      
      <!-- Login/Register Form -->
      <div v-if="showLoginForm && !userStore.isAuthenticated" class="mb-6">
        <div class="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
          <!-- Tabs -->
          <div class="flex border-b border-slate-200 dark:border-slate-600 mb-4">
            <button 
              @click="setActiveTab('login')"
              :class="{'border-b-2 border-emerald-500 text-emerald-600 dark:text-emerald-400': activeTab === 'login'}"
              class="px-4 py-2 font-medium"
            >
              Login
            </button>
            <button 
              @click="setActiveTab('register')"
              :class="{'border-b-2 border-emerald-500 text-emerald-600 dark:text-emerald-400': activeTab === 'register'}"
              class="px-4 py-2 font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
            >
              Register
            </button>
          </div>
          
          <!-- Error message -->
          <div v-if="authError" class="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
            {{ authError }}
          </div>
          
          <!-- Login Form -->
          <form v-if="activeTab === 'login'" @submit.prevent="login" class="space-y-4">
            <div>
              <label for="email" class="block text-sm font-medium mb-1">Email</label>
              <input
                id="email"
                v-model="loginForm.email"
                type="email"
                class="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-600"
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <label for="password" class="block text-sm font-medium mb-1">Password</label>
              <input
                id="password"
                v-model="loginForm.password"
                type="password"
                class="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-600"
                placeholder="••••••••"
              />
            </div>
            
            <div class="flex justify-end">
              <button
                type="submit"
                class="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
              >
                Sign In
              </button>
            </div>
          </form>

          <!-- Register Form -->
          <form v-if="activeTab === 'register'" @submit.prevent="register" class="space-y-4">
            <div>
              <label for="email" class="block text-sm font-medium mb-1">Email</label>
              <input
                id="email"
                v-model="registerForm.email"
                type="email"
                class="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-600"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label for="password" class="block text-sm font-medium mb-1">Password</label>
              <input
                id="password"
                v-model="registerForm.password"
                type="password"
                class="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-600"
                placeholder="••••••••"
              />
            </div>

            <div class="flex justify-end">
              <button
                type="submit"
                class="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
              >
                Register
              </button>
            </div>
          </form>
        </div>
        
        <div class="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>For demo purposes, any name, email, and password will work</p>
        </div>
      </div>
      
      <!-- Protected Content -->
      <div v-if="userStore.isAuthenticated" class="space-y-4">
        <div class="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg">
          <div class="flex items-start gap-3">
            <!-- Check icon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <div>
              <h3 class="font-medium text-emerald-700 dark:text-emerald-400">Authentication Successful!</h3>
              <p class="text-sm text-emerald-600 dark:text-emerald-300 mt-1">
                You're now viewing protected content that's only visible to authenticated users.
              </p>
            </div>
          </div>
        </div>
        
        <!-- Protected Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-white dark:bg-slate-700 p-4 rounded-lg border border-slate-200 dark:border-slate-600 shadow-sm">
            <h3 class="text-lg font-medium mb-1">API Requests</h3>
            <div class="flex items-end gap-2">
              <span class="text-3xl font-bold">1,234</span>
              <span class="text-emerald-500 text-sm">+12%</span>
            </div>
          </div>
          
          <div class="bg-white dark:bg-slate-700 p-4 rounded-lg border border-slate-200 dark:border-slate-600 shadow-sm">
            <h3 class="text-lg font-medium mb-1">Active Users</h3>
            <div class="flex items-end gap-2">
              <span class="text-3xl font-bold">56</span>
              <span class="text-emerald-500 text-sm">+8%</span>
            </div>
          </div>
          
          <div class="bg-white dark:bg-slate-700 p-4 rounded-lg border border-slate-200 dark:border-slate-600 shadow-sm">
            <h3 class="text-lg font-medium mb-1">Server Load</h3>
            <div class="flex items-end gap-2">
              <span class="text-3xl font-bold">23%</span>
              <span class="text-emerald-500 text-sm">Normal</span>
            </div>
          </div>
        </div>
        
        <!-- Protected Actions -->
        <div class="flex flex-wrap gap-3 mt-4">
          <button class="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-md transition-colors flex items-center gap-2">
            <!-- Download icon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" x2="12" y1="15" y2="3"></line>
            </svg>
            Download Report
          </button>
          
          <button class="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-md transition-colors flex items-center gap-2">
            <!-- Settings icon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            Account Settings
          </button>
          
          <button class="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-md transition-colors flex items-center gap-2">
            <!-- Users icon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            Manage Team
          </button>
        </div>
      </div>
      
      <!-- Not authenticated message -->
      <div v-if="!userStore.isAuthenticated && !showLoginForm" class="p-4 bg-slate-100 dark:bg-slate-700 rounded-lg text-center">
        <p class="text-slate-600 dark:text-slate-400 mb-2">
          Click the "Login / Register" button to view protected content
        </p>
        <p class="text-sm text-slate-500 dark:text-slate-500">
          This is a demonstration of authentication - no real authentication is performed
        </p>
      </div>
    </div>
    
    <!-- API Data Demo -->
    <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
      <h2 class="text-xl font-bold mb-4">API Data</h2>
      
      <div v-if="loading" class="flex justify-center py-8">
        <!-- Loading spinner -->
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 animate-spin text-emerald-500">
          <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
        </svg>
      </div>
      
      <div v-else-if="fetchError" class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
        <div class="flex items-start gap-3">
          <!-- Alert icon -->
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" x2="12" y1="8" y2="12"></line>
            <line x1="12" x2="12.01" y1="16" y2="16"></line>
          </svg>
          <div>
            <h3 class="font-medium text-red-700 dark:text-red-400">Error loading data</h3>
            <p class="text-sm text-red-600 dark:text-red-300 mt-1">{{ fetchError }}</p>
          </div>
        </div>
      </div>
      
      <div v-else-if="users.length === 0" class="text-center py-8">
        <p class="text-slate-500 dark:text-slate-400">No users found</p>
      </div>
      
      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-slate-200 dark:border-slate-700">
              <th class="px-4 py-3 text-left text-sm font-medium text-slate-500 dark:text-slate-400">ID</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-slate-500 dark:text-slate-400">Name</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-slate-500 dark:text-slate-400">Email</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-slate-500 dark:text-slate-400">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
            <tr 
              v-for="user in users" 
              :key="user.id"
              class="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
            >
              <td class="px-4 py-3 text-sm">{{ user.id }}</td>
              <td class="px-4 py-3 text-sm">{{ user.name }}</td>
              <td class="px-4 py-3 text-sm">{{ user.email }}</td>
              <td class="px-4 py-3 text-sm">
                <button 
                  class="text-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400"
                  :class="{ 'opacity-50 cursor-not-allowed': !userStore.isAuthenticated }"
                  :disabled="!userStore.isAuthenticated"
                  :title="!userStore.isAuthenticated ? 'Login to view details' : 'View details'"
                >
                  <!-- View icon -->
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Note about authentication -->
      <div v-if="!userStore.isAuthenticated" class="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
        <div class="flex items-start gap-3">
          <!-- Info icon -->
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" x2="12" y1="16" y2="12"></line>
            <line x1="12" x2="12.01" y1="8" y2="8"></line>
          </svg>
          <p class="text-sm text-amber-600 dark:text-amber-300">
            Login to enable user detail actions
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
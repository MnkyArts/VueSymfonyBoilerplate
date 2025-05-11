<template>
  <div class="max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">About VSB</h1>
    
    <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-8">
      <p class="text-slate-700 dark:text-slate-300 mb-4">
        Vue Symfony Boilerplate (VSB) is a ready-to-use boilerplate that provides a clean, pre-configured setup for developing modern web applications using a standalone Vue.js frontend and a standalone Symfony 7 API backend.
      </p>
      
      <p class="text-slate-700 dark:text-slate-300">
        Unlike traditional integrations, this boilerplate does not use the Symfony UX-Vue integration within Symfony. Instead, both frameworks operate independently, communicating via a robust API-driven architecture. This separation ensures greater flexibility, clearer separation of concerns, and easier scalability for modern full-stack development workflows.
      </p>
    </div>
    
    <h2 class="text-2xl font-bold mb-4">Architecture</h2>
    
    <div class="grid md:grid-cols-2 gap-6 mb-8">
      <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
            <!-- Code icon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-emerald-500">
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
          </div>
          <h3 class="text-xl font-bold">Vue.js Frontend</h3>
        </div>
        
        <ul class="space-y-2 text-slate-700 dark:text-slate-300">
          <li>Vue 3 with Composition API</li>
          <li>Vue Router for navigation</li>
          <li>Pinia for state management</li>
          <li>Vite for fast development</li>
          <li>Tailwind CSS for styling</li>
        </ul>
      </div>
      
      <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <!-- Server icon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-blue-500">
              <rect width="20" height="8" x="2" y="2" rx="2" ry="2"></rect>
              <rect width="20" height="8" x="2" y="14" rx="2" ry="2"></rect>
              <line x1="6" x2="6" y1="6" y2="6"></line>
              <line x1="6" x2="6" y1="18" y2="18"></line>
            </svg>
          </div>
          <h3 class="text-xl font-bold">Symfony Backend</h3>
        </div>
        
        <ul class="space-y-2 text-slate-700 dark:text-slate-300">
          <li>Symfony 7 framework</li>
          <li>API Platform for RESTful APIs</li>
          <li>Doctrine ORM for database</li>
          <li>JWT authentication</li>
          <li>Symfony Messenger for async tasks</li>
        </ul>
      </div>
    </div>
    
    <div class="grid md:grid-cols-2 gap-6">
      <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
            <!-- Database icon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-amber-500">
              <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold">Database</h3>
        </div>
        
        <p class="text-slate-700 dark:text-slate-300">
          The boilerplate comes pre-configured with Doctrine ORM and supports MySQL, PostgreSQL, and SQLite. Database migrations and fixtures are set up for easy development and testing.
        </p>
      </div>
      
      <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
            <!-- Shield icon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-purple-500">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold">Authentication</h3>
        </div>
        
        <p class="text-slate-700 dark:text-slate-300">
          JWT authentication is pre-configured between the Vue frontend and Symfony backend, providing a secure and stateless authentication system for your application.
        </p>
      </div>
    </div>
  </div>
</template>
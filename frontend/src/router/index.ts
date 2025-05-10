import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: {
        title: 'About'
      }
    },
    {
      path: '/demo',
      name: 'demo',
      // Lazy-loaded component
      component: () => import('../views/DemoView.vue'),
      meta: {
        title: 'API Demo'
      }
    },
    {
      // Catch-all route for 404
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFound.vue'),
      meta: {
        title: '404 Not Found'
      }
    }
  ],
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active'
})

// Update document title based on route meta
router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} | VSB` : 'Vue Symfony Boilerplate'
  next()
})

export default router
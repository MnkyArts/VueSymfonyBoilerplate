import { defineStore } from 'pinia'
import api from '@/api'

interface User {
  // Define your user properties here
  id: string
  email: string
  // ...
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isRefreshing: boolean
}

interface RegisterData {
    email: string
    password: string
    // Add other registration fields based on your API requirements
}

export const useUserStore = defineStore('user', {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false,
    isRefreshing: false
  }),

  actions: {
    async login(credentials: { email: string; password: string }) {
      try {
        await api.post('/auth/login', credentials)
        return this.checkAuth()
      } catch (error) {
        this.clearUser()
        throw error
      }
    },

    async register(registerData: RegisterData) {
        try {
          await api.post('/auth/register', registerData)
          
          // Optional: Automatically log in after registration
          // return this.login({
          //   email: registerData.email,
          //   password: registerData.password
          // })
          
          return true
        } catch (error) {
          this.clearUser()
          throw error
        }
    },

    async checkAuth() {
      try {
        const response = await api.get('/user')
        this.user = response.data
        this.isAuthenticated = true
        return true
      } catch (error) {
        this.clearUser()
        return false
      }
    },

    async refreshToken() {
      if (this.isRefreshing) return
      this.isRefreshing = true

      try {
        await api.post('/token/refresh')
        return true
      } catch (error) {
        await this.logout()
        throw error
      } finally {
        this.isRefreshing = false
      }
    },

    async logout() {
      try {
        await api.post('/auth/logout')
      } finally {
        this.clearUser()
      }
    },

    clearUser() {
      this.user = null
      this.isAuthenticated = false
    }
  }
})
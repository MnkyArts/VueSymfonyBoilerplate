import axios from 'axios'
import { useUserStore } from '@/stores/user'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
})

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config
    const userStore = useUserStore()

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      
      try {
        await userStore.refreshToken()
        return api(originalRequest)
      } catch (refreshError) {
        await userStore.logout()
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default api
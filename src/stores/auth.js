import { defineStore } from 'pinia'
import { ref } from 'vue'
import { computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const id = ref(localStorage.getItem('id') || null)

  const isAuthenticated = computed(() => !!id.value)

  const login = (newId) => {
    id.value = newId
    localStorage.setItem('id', newId)
  }

  const logout = () => {
    id.value = null
    localStorage.removeItem('id')
  }

  return {
    id,
    isAuthenticated,
    login,
    logout,
  }
})

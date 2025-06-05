<script setup>
import { RouterLink } from 'vue-router'
import { UserIcon, ShoppingCartIcon, UserMinusIcon  } from '@heroicons/vue/24/solid'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const isMenuOpen = ref(false)
const auth = useAuthStore()

const logout = () => {
  auth.logout()
}
</script>

<template>
  <header class="flex justify-between items-center py-4 px-6 md:px-24">
    <div class="logo">
      <h1 class="text-2xl md:text-4xl font-extralight uppercase">Calmar</h1>
    </div>

    <button @click="isMenuOpen = !isMenuOpen" class="lg:hidden">
      <svg class="w-6 h-6 text-black" fill="none" stroke="currentColor" stroke-width="2"
           viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
    </button>

    <div class="hidden lg:flex lg:items-center lg:space-x-12">
      <nav class="flex space-x-8">
        <RouterLink to="/" class="font-medium">Accueil</RouterLink>
        <RouterLink to="/products" class="font-medium">Nos vêtements</RouterLink>
        <RouterLink to="/contact" class="font-medium">Nous contacter</RouterLink>
      </nav>
      <div class="flex items-center space-x-6">
        <button @click="logout" v-if="auth.isAuthenticated"><UserMinusIcon class="size-6 text-black cursor-pointer" /></button>
        <RouterLink v-else to="/login"><UserIcon class="size-6 text-black" /></RouterLink>
        <RouterLink to="/"><ShoppingCartIcon class="size-6 text-black" /></RouterLink>
      </div>
    </div>

    <div v-if="isMenuOpen" class="absolute top-16 left-0 w-full bg-white shadow-md lg:hidden z-50">
      <nav class="flex flex-col items-center py-4 space-y-4">
        <RouterLink to="/" class="font-medium" @click="isMenuOpen = false">Accueil</RouterLink>
        <RouterLink to="/products" class="font-medium" @click="isMenuOpen = false">Nos vêtements</RouterLink>
        <RouterLink to="/contact" class="font-medium" @click="isMenuOpen = false">Nous contacter</RouterLink>
        <div class="flex space-x-6 mt-2">
          <button @click="logout" v-if="auth.isAuthenticated"><UserMinusIcon class="size-6 text-black cursor-pointer" /></button>
          <RouterLink v-else to="/login"><UserIcon class="size-6 text-black" /></RouterLink>
          <RouterLink to="/"><ShoppingCartIcon class="size-6 text-black" /></RouterLink>
        </div>
      </nav>
    </div>
  </header>
</template>

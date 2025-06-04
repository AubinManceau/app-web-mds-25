<script setup>
import { RouterLink } from 'vue-router'
import { UserIcon, ShoppingCartIcon } from '@heroicons/vue/24/solid'
</script>

<template>
  <header class="flex justify-between items-center py-4 px-24">
    <div class="logo">
      <h1 class="text-4xl font-extralight uppercase">Calmar</h1>
    </div>
    <nav class="flex space-x-12">
      <RouterLink to="/" className="font-medium">Accueil</RouterLink>
      <RouterLink to="/products" className="font-medium">Nos vêtements</RouterLink>
      <RouterLink to="/contact" className="font-medium">Nous contacter</RouterLink>
    </nav>
    <div class="flex items-center space-x-6">
      <RouterLink to="/"><UserIcon class="size-6 text-black"/></RouterLink>
      <RouterLink to="/"><ShoppingCartIcon class="size-6 text-black"/></RouterLink>
    </div>
  </header>
</template>

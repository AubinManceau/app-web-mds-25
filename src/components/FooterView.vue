<script setup>
import { RouterLink } from 'vue-router';
import { UserIcon, ShoppingCartIcon } from '@heroicons/vue/24/solid';
</script>

<template>
  <footer class="py-6 px-4 sm:px-12 bg-black">
    <div class="flex flex-col sm:flex-row justify-between items-center gap-8">
      <div class="text-center sm:w-1/3">
        <h1 class="text-4xl font-extralight uppercase text-white">Calmar</h1>
      </div>

      <nav class="flex flex-col items-center text-white gap-2 sm:border-x sm:px-6 sm:w-1/3">
        <RouterLink to="/">Accueil</RouterLink>
        <RouterLink to="/products">Nos vêtements</RouterLink>
        <RouterLink to="/contact">Nous contacter</RouterLink>
        <RouterLink to="/mentions-legales">Mentions Légales</RouterLink>
      </nav>

      <div class="flex flex-col items-center gap-2 sm:w-1/3">
        <RouterLink to="/"><UserIcon class="size-6 text-white" /></RouterLink>
        <RouterLink to="/"><ShoppingCartIcon class="size-6 text-white" /></RouterLink>
      </div>
    </div>
    <div class="text-center text-white opacity-40 mt-6 text-xs">
      <p>&copy; 2025 Calmar. Tous droits réservés.</p>
    </div>
  </footer>
</template>
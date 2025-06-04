<script setup>
import LinkButton from '@/components/LinkButton.vue'
</script>

<template>
  <div class="bg-grey w-full px-6 lg:px-56 py-10 lg:h-128 flex flex-col lg:flex-row items-center justify-between gap-8">
    <div class="flex flex-col justify-center text-center lg:text-left">
      <h2 class="text-3xl lg:text-5xl uppercase font-bold">Nouvelle collection</h2>
      <h3 class="text-4xl lg:text-7xl uppercase font-extralight mt-1">été 2025</h3>
      <p class="text-sm font-light mt-4">Jusqu'à -50% sur la nouvelle collection*</p>
      <div class="flex flex-col sm:flex-row gap-4 mt-8 justify-center items-center lg:justify-start">
        <LinkButton title="Nos vêtements" type="full" to="/products" />
        <LinkButton title="Nous contacter" type="empty" to="/contact" />
      </div>
    </div>

    <div class="flex items-center justify-center lg:h-full">
      <img
        src="@/assets/images/homme.png"
        alt="Hero Image"
        class="w-auto hidden lg:flex lg:max-h-[90%] object-contain"
      />
    </div>
  </div>
</template>

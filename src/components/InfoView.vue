<script setup>
import { ChatBubbleBottomCenterTextIcon, ShieldCheckIcon, TruckIcon } from '@heroicons/vue/24/solid'
</script>

<template>
  <div class="px-6 md:px-16 lg:px-32 xl:px-64 flex flex-col sm:flex-row justify-between items-center text-center gap-8 sm:gap-0 my-12">
    <div class="flex flex-col items-center">
      <TruckIcon class="w-[50px]" />
      <p class="font-semibold text-lg mt-2">Livraison gratuite</p>
      <p>A partir de 30€ d'achat</p>
    </div>
    <div class="flex flex-col items-center">
      <ChatBubbleBottomCenterTextIcon class="w-[50px]" />
      <p class="font-semibold text-lg mt-2">Support en ligne</p>
      <p>24h / 24 et 7 jours / 7</p>
    </div>
    <div class="flex flex-col items-center">
      <ShieldCheckIcon class="w-[50px]" />
      <p class="font-semibold text-lg mt-2">Paiement sécurisé</p>
      <p>Paiement en ligne sécurisé</p>
    </div>
  </div>
</template>

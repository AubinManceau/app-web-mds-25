<script setup>
import { ChatBubbleBottomCenterTextIcon, ShieldCheckIcon, TruckIcon } from '@heroicons/vue/24/solid'
</script>

<template>
    <div class="px-64 flex justify-between items-center my-12">
        <div class="flex flex-col items-center">
            <TruckIcon class="w-[50px]" />
            <p class="font-semibold text-lg">Livraison gratuite</p>
            <p>A partir de 30€ d'achat</p>
        </div>
        <div class="flex flex-col items-center">
            <ChatBubbleBottomCenterTextIcon class="w-[50px]" />
            <p class="font-semibold text-lg">Support en ligne</p>
            <p>24h / 24 et 7 jours / 7</p>
        </div>
        <div class="flex flex-col items-center">
            <ShieldCheckIcon class="w-[50px]" />
            <p class="font-semibold text-lg">Paiement sécurisé</p>
            <p>Paiement en ligne sécurisé</p>
        </div>
    </div>
</template>
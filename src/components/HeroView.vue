<script setup>
import LinkButton from '@/components/LinkButton.vue';
</script>

<template>
    <div class="bg-grey w-full h-128 px-56 flex items-center justify-between">
        <div class="flex flex-col justify-center h-full">
            <h2 class="text-5xl uppercase font-bold">Nouvelle collection</h2>
            <h3 class="text-7xl uppercase font-extralight mt-1">été 2025</h3>
            <p class="text-sm font-light mt-4">Jusqu'à -50% sur la nouvelle collection*</p>
            <div class="flex gap-2 mt-8">
                <LinkButton title="Nos vêtements" type="full" to="/products"/>
                <LinkButton title="Nous contacter" type="empty" to="/contact"/>
            </div>
        </div>
        <div class="h-128 flex items-center justify-center">
            <img src="@/assets/images/homme.png" alt="Hero Image" class="w-full h-110">
        </div>
    </div>
</template>
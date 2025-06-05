<script setup>
import ActionButton from './ActionButton.vue';
defineProps({
    product: {
        type: Object,
        required: true,
    }
})
</script>

<template>
  <div class="px-6 md:px-16 lg:px-32 py-16 flex flex-col-reverse gap-12 md:gap-0 items-center md:items-start md:flex-row">
    <img :src="product.image" :alt="product.name" class="w-full md:w-1/2 aspect-square object-cover rounded-lg">
    <div class="w-full md:w-1/2 md:pl-16">
        <div class="flex items-center mb-2">
            <p class="border py-1 px-4 rounded-full">{{ product.category }}</p>
        </div>
        <h1 class="text-3xl font-bold">{{ product.title }}</h1>
        <p class="text-xs my-4">{{ product.description }}</p>
        <div class="flex items-center mb-6">
            <p class="text-2xl font-bold">{{ product.price }} €</p>
        </div>
        <div class="flex items-center mt-8">
            <ActionButton title="Ajouter au panier" />
        </div>
    </div>
  </div>
</template>

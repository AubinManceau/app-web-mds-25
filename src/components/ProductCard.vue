<script setup>
defineProps({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    id : {
        type: Number,
        required: true,
    }
})
</script>

<template>
    <RouterLink :to="`/products/${id}`" class="flex flex-col justify-center items-center">
        <img :src="image" :alt="title" class="w-[90%] h-48 object-center object-cover mb-1 rounded-lg">
        <p class="font-light text-xs">{{ category }}</p>
        <h3 class="mb-1">{{ title }}</h3>
        <p class="text-sm font-light">{{ price }} €</p>
    </RouterLink>
</template>
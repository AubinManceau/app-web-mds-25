<script setup>

defineProps({
    light: {
        type: String,
        required: false
    },
    bold: {
        type: String,
        required: false
    }
})
</script>

<template>
    <h2 class="text-2xl">
        <span class="text-black" v-if="light">{{ light }}</span>
        <span class="text-black font-semibold" v-if="bold">{{ ' ' + bold }}</span>
    </h2>
</template>

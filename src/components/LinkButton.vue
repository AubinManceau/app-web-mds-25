<script setup>
import { RouterLink } from 'vue-router'

defineProps({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'full',
        validator: (value) => {
            return ['full', 'empty'].includes(value)
        }
    },
    to: {
        type: String,
        default: '/'
    }
})
</script>

<template>
    
    <RouterLink :to="to" v-if="type === 'full'" class="w-56 py-2 text-center text-grey bg-black">{{ title }}</RouterLink>
    <RouterLink :to="to" v-else class="w-56 py-2 text-center text-black border-2 border-black">{{ title }}</RouterLink>
</template>

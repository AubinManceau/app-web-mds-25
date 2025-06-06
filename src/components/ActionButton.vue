<script setup>
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
    action: {
        type: Function,
        required: true
    }
})
</script>

<template>  
    <button @click="action" v-if="type === 'full'" class="w-56 py-2 text-center text-grey bg-black cursor-pointer">{{ title }}</button>
    <button @click="action" v-else class="w-56 py-2 text-center text-black border-2 border-black cursor-pointer">{{ title }}</button>
</template>

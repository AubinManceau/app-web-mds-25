<script setup>
const emit = defineEmits(['action'])
function handleClick() {
  emit('action')
}

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
        type: String,
        required: true
    }
})
</script>

<template>  
    <button @click="handleClick" v-if="type === 'full'" class="w-56 py-2 text-center text-grey bg-black cursor-pointer">{{ title }}</button>
    <button @click="handleClick" v-else class="w-56 py-2 text-center text-black border-2 border-black cursor-pointer">{{ title }}</button>
</template>

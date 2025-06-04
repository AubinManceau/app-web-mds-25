<script setup>
import ProductCard from '@/components/ProductCard.vue';

defineProps({
    products: {
        type: Array,
        required: true,
    }
})
</script>

<template>
  <div class="px-6 md:px-16 lg:px-32 py-16">
    <slot name="title">
    </slot>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 mt-12">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :title="product.title"
        :image="product.image"
        :category="product.category"
        :price="product.price"
        :id="product.id"
      />
    </div>
    
    <slot name="button">
    </slot>
  </div>
</template>

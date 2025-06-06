<script setup>
import Carousel from 'primevue/carousel';
import ProductCard from '@/components/ProductCard.vue';

defineProps({
  products: {
    type: Array,
    required: true,
  }
});

const responsiveOptions = [
  {
    breakpoint: '1024px',
    numVisible: 3,
    numScroll: 1
  },
  {
    breakpoint: '768px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '480px',
    numVisible: 1,
    numScroll: 1
  }
];
</script>

<template>
  <div class="px-6 md:px-16 lg:px-32 py-16">
    <slot name="title">

    </slot>
    <Carousel
      :value="products"
      :numVisible="4"
      :numScroll="1"
      :responsiveOptions="responsiveOptions"
      circular
      :autoplayInterval="3000"
      class="mt-12"
    >
      <template #item="{ data: product }">
        <ProductCard
          :key="product.id"
          :title="product.title"
          :image="product.image"
          :category="product.category"
          :price="product.price"
          :id="product.id"
        />
      </template>
    </Carousel>
  </div>
</template>

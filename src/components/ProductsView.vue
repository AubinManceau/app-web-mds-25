<script setup>
import TitleView from '@/components/TitleView.vue';
import ProductCard from '@/components/ProductCard.vue';
import LinkButton from '@/components/LinkButton.vue';

defineProps({
    products: {
        type: Array,
        required: true,
    }
})
</script>

<template>
  <div class="px-6 md:px-16 lg:px-32 py-16">
    <TitleView light="Nos" bold="produits" />

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

    <div class="flex justify-center mt-8">
      <LinkButton title="Voir plus de produits" type="empty" to="/contact" />
    </div>
  </div>
</template>

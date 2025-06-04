<script setup>
import HeroView from '@/components/HeroView.vue';
import ProductsView from '@/components/ProductsView.vue';
import BestSellerView from '@/components/BestSellerView.vue';
import { ref, onBeforeMount } from 'vue';
import { getProducts } from '@/services/products';
import InfoView from '@/components/InfoView.vue';

const products = ref([]);

onBeforeMount(async () => {
  try {
    const response = await getProducts();
    products.value = response;
  } catch (error) {
    console.error('Erreur lors du chargement des produits :', error);
  }
});
</script>

<template>
  <main>
    <HeroView />
    <ProductsView :products="products.reverse().slice(0,8)" />
    <InfoView />
    <BestSellerView :products="products.reverse().slice(0,6)" />
  </main>
</template>

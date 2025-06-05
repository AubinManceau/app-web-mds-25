<script setup>
import { ref, onBeforeMount } from 'vue';
import { getProducts, getProductById } from '@/services/products';
import BestSellerView from '@/components/BestSellerView.vue';
import InfoView from '@/components/InfoView.vue';
import TitleView from '@/components/TitleView.vue';
import ProductDetail from '@/components/ProductDetail.vue';

const products = ref([]);

onBeforeMount(async () => {
  try {
    const response = await getProducts();
    products.value = response;
  } catch (error) {
    console.error('Erreur lors du chargement des produits :', error);
  }
});

const product = ref([]);
onBeforeMount(async () => {
  try {
    const id = window.location.pathname.split('/').pop();
    const response = await getProductById(id);
    product.value = response;
  } catch (error) {
    console.error('Erreur lors du chargement du produit :', error);
  }
});
</script>

<template>
  <main>
    <ProductDetail :product="product" />
    <InfoView />
    <BestSellerView :products="products.reverse().slice(0,6)">
        <template #title>
            <TitleView light="Nos" bold="produits similaires" />
        </template>
    </BestSellerView>
  </main>
</template>

<script setup>
import HeroView from '@/components/HeroView.vue';
import ProductsView from '@/components/ProductsView.vue';
import BestSellerView from '@/components/BestSellerView.vue';
import { ref, onBeforeMount } from 'vue';
import { getProducts } from '@/services/products';
import InfoView from '@/components/InfoView.vue';
import LinkButton from '@/components/LinkButton.vue'
import TitleView from '@/components/TitleView.vue';

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
    <HeroView>
      <template #buttons>
        <div class="flex flex-col sm:flex-row gap-4 mt-8 justify-center items-center lg:justify-start">
          <LinkButton title="Nos vêtements" type="full" to="/products" />
          <LinkButton title="Nous contacter" type="empty" to="/contact" />
        </div>
      </template>
    </HeroView>

    <ProductsView :products="products.reverse().slice(0,8)">
      <template #title>
        <TitleView light="Nos" bold="produits" />
      </template>
      <template #button>
        <div class="flex justify-center mt-8">
          <LinkButton title="Voir plus de produits" type="empty" to="/contact" />
        </div>
      </template>
    </ProductsView>

    <InfoView />
    <BestSellerView :products="products.reverse().slice(0,6)">
      <template #title>
        <TitleView light="Nos" bold="meilleurs ventes" />
      </template>
    </BestSellerView>
  </main>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { getAllCourses } from '@/services/products';

const products = ref([]);

onBeforeMount(async () => {
  try {
    const response = await getAllCourses();
    products.value = response;
  } catch (error) {
    console.error('Erreur lors du chargement des produits :', error);
  }
});
</script>

<template>
  <main>
    test
    <ul>
      <li v-for="(product, index) in products" :key="index">
        {{ product.title }}
      </li>
    </ul>
  </main>
</template>

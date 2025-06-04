<script setup>
import { ref, onBeforeMount } from 'vue';
import { getAllCourses } from '@/services/products';
import HeroView from '@/components/HeroView.vue';

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
  <main class="mb-32">
    <HeroView />
  </main>
</template>

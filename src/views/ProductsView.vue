<script setup>
import HeroView from '@/components/HeroView.vue';
import ProductsView from '@/components/ProductsView.vue';
import { ref, computed, onBeforeMount, watch } from 'vue';
import { getProducts } from '@/services/products';

const products = ref([]);
const currentPage = ref(1);
const perPage = 12;

const selectedCategory = ref('');
const minPrice = ref(0);
const maxPrice = ref(1000);

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const inCategory = selectedCategory.value ? product.category === selectedCategory.value : true;
    const inPriceRange = product.price >= minPrice.value && product.price <= maxPrice.value;
    return inCategory && inPriceRange;
  });
});

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  return filteredProducts.value.slice(start, start + perPage);
});

const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / perPage);
});

watch([selectedCategory, minPrice, maxPrice], () => {
  currentPage.value = 1;
});

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

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

    <div class="flex flex-col md:flex-row gap-12 px-6 md:px-16 lg:px-32 pt-12 items-center">
      <h2 class="font-extralight uppercase text-xl">Filtrer par :</h2>
      <div class="flex items-center gap-4">
        <label class="text-md font-medium">Catégorie</label>
        <select v-model="selectedCategory" class="border px-2 py-1 rounded">
          <option value="">Toutes</option>
          <option
            v-for="category in [...new Set(products.map(p => p.category))]"
            :key="category"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
      </div>

      <div class="flex items-center gap-4">
        <label class="text-md font-medium">Prix</label>
        <input type="number" v-model.number="minPrice" class="border px-2 py-1 w-[80px] rounded" />
        <span class="text-sm">et</span>
        <input type="number" v-model.number="maxPrice" class="border px-2 py-1 w-[80px] rounded" />
      </div>
    </div>

    <ProductsView :products="paginatedProducts" />

    <div v-if="totalPages > 1" class="flex justify-center gap-2 mb-12">
      <button v-for="page in totalPages" :key="page"
        @click="goToPage(page)"
        :class="['w-[35px] h-[35px] flex items-center justify-center rounded-full',
          currentPage === page ? 'bg-black text-white' : 'bg-white text-black cursor-pointer'
        ]">{{ page }}
      </button>
    </div>
  </main>
</template>


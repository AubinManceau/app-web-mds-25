<script setup>
import TitleView from '@/components/TitleView.vue';
import Carousel from 'primevue/carousel';
import ProductCard from '@/components/ProductCard.vue';

defineProps({
    products: {
        type: Array,
        required: true,
    }
})
</script>

<template>
    <div class="px-32 py-16">
        <TitleView light="Nos" bold="meilleurs ventes" />
        <Carousel :value="products" :numVisible="4" :numScroll="1" :responsiveOptions="responsiveOptions" circular :autoplayInterval="3000" class="mt-12">
            <template #item="{ data: product }">
                <ProductCard :key="product.id" :title="product.title" :image="product.image" :category="product.category" :price="product.price" :id="product.id" />
            </template>
        </Carousel>
    </div>
</template>
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
    <div class="px-32 py-16">
        <TitleView light="Nos" bold="produits" />
        <div class="grid grid-cols-4 mt-12 gap-y-10">
            <ProductCard v-for="product in products" :key="product.id" :title="product.title" :image="product.image" :category="product.category" :price="product.price" :id="product.id" />
        </div>
        <div class="flex justify-center mt-8">
            <LinkButton title="Voir plus de produits" type="empty" to="/contact"/>
        </div>
    </div>
</template>
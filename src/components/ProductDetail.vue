<script setup>
import ActionButton from './ActionButton.vue'
import { useAuthStore } from '@/stores/auth'
import LinkButton from './LinkButton.vue'
import { updateCart, getCarts } from '@/services/carts'
import router from '@/router'
import { ref } from 'vue'
const auth = useAuthStore()
const quantity = ref(1)
const props = defineProps({
    product: {
        type: Object,
        required: true,
    }
})

const addToCart = async () => {
    try {
        const userId = Number(auth.id);
        const date = new Date().toISOString();
        const productToAdd = { 
            productId: props.product.id,
            quantity: quantity.value,
        };

        const carts = await getCarts();
        const userCart = carts.find(cart => cart.userId === userId);

        if (!userCart) {
            console.error("Aucun panier trouvé pour cet utilisateur");
            return;
        }

        const id = userCart.id;
        const updatedProducts = [...userCart.products];
        const existingProductIndex = updatedProducts.findIndex(p => p.productId === productToAdd.productId);

        if (existingProductIndex !== -1) {
            updatedProducts[existingProductIndex].quantity += productToAdd.quantity;
        } else {
            updatedProducts.push(productToAdd);
        }

        const response = await updateCart({ id, userId, products: updatedProducts, date });

        if (response) {
            router.push('/cart');
        }
    } catch (error) {
        console.error("Erreur lors de l'ajout au panier :", error);
    }
};
</script>

<template>
  <div class="px-6 md:px-16 lg:px-32 py-16 flex flex-col-reverse gap-12 md:gap-0 items-center md:items-start md:flex-row">
    <img :src="product.image" :alt="product.name" class="w-full md:w-1/2 aspect-square object-cover rounded-lg">
    <div class="w-full md:w-1/2 md:pl-16">
        <div class="flex items-center mb-2">
            <p class="border py-1 px-4 rounded-full">{{ product.category }}</p>
        </div>
        <h1 class="text-3xl font-bold">{{ product.title }}</h1>
        <p class="text-xs my-4">{{ product.description }}</p>
        <div class="flex items-center mb-6">
            <p class="text-2xl font-bold">{{ product.price }} €</p>
        </div>
        <div class="flex items-center mt-8">
            <div v-if="auth.isAuthenticated" class="flex items-center gap-2">
                <input 
                    id="quantity" 
                    type="number"
                    v-model.number="quantity" 
                    value="1"
                    min="1"
                    max="50" 
                    class="w-14 px-2 py-1 border rounded" 
                />
                <ActionButton title="Ajouter au panier" :action="addToCart" />
            </div>
            <LinkButton v-else to="/login" title="Ajouter au panier" />
        </div>
    </div>
  </div>
</template>

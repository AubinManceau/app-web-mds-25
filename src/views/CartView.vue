<script setup>
import { ref, onBeforeMount, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { getCarts, getCartById, updateCart } from '@/services/carts';
import { getProductById } from '@/services/products';
import InfoView from '@/components/InfoView.vue';
import ActionButton from '@/components/ActionButton.vue';
import LinkButton from '@/components/LinkButton.vue';

const auth = useAuthStore();
const cart = ref(null);
const detailedProducts = ref([]);
const loading = ref(true);
const error = ref(null);

const loadCart = async (retryCount = 0) => {
  try {
    loading.value = true;
    error.value = null;
    
    const userId = Number(auth.id);
    const carts = await getCarts();

    let userCart = carts.find(cart => cart.userId === userId);
    
    if (!userCart) {
      
      if (retryCount < 3) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return await loadCart(retryCount + 1);
      }
      detailedProducts.value = [];
      loading.value = false;
      return;
    }

    cart.value = await getCartById(userCart.id);
    console.log('Détails du panier:', cart.value);

    if (!cart.value.products || cart.value.products.length === 0) {
      detailedProducts.value = [];
      loading.value = false;
      return;
    }

    const products = await Promise.all(
      cart.value.products.map(async item => {
        const product = await getProductById(item.productId);
        return {
          ...item,
          product,
        };
      })
    );

    detailedProducts.value = products;
    loading.value = false;
  } catch (err) {
    console.error("Erreur chargement panier :", err);
    error.value = "Erreur lors du chargement du panier";
    loading.value = false;
  }
};

const refreshCart = async () => {
  await loadCart(0);
};

const updateQuantity = async (index, newQuantity) => {
  if (newQuantity < 1) return;

  detailedProducts.value[index].quantity = newQuantity;
  await syncCart();
};

const removeProduct = async (index) => {
  detailedProducts.value.splice(index, 1);
  await syncCart();
};

const syncCart = async () => {
  if (!cart.value) return;
  
  try {
    const userId = Number(auth.id);
    const id = cart.value.id;
    const date = new Date().toISOString();

    const updatedProducts = detailedProducts.value.map(item => ({
      productId: item.product.id,
      quantity: item.quantity,
    }));

    await updateCart({ id, userId, products: updatedProducts, date });
  } catch (err) {
    console.error("Erreur sync panier:", err);
    error.value = "Erreur lors de la synchronisation";
  }
};

const totalPrice = computed(() => {
  return detailedProducts.value.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);
});

onBeforeMount(async () => {
  while (!auth.id) {
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  await loadCart();
});
</script>

<template>
  <main class="px-4 sm:px-6 md:px-16 lg:px-32 py-10 sm:py-16">
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8">
      <h1 class="text-2xl sm:text-3xl font-bold text-center sm:text-left">Mon panier</h1>
    </div>

    <div v-if="loading" class="text-center py-8">
      <p class="text-gray-600">Chargement du panier...</p>
    </div>

    <div v-else-if="error" class="text-center py-8">
      <p class="text-red-600 mb-4">{{ error }}</p>
      <button 
        @click="refreshCart"
        class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Réessayer
      </button>
    </div>

    <div v-else-if="detailedProducts.length">
      <div class="space-y-6">
        <div 
          v-for="(item, index) in detailedProducts" 
          :key="index"
          class="flex flex-col md:flex-row items-center gap-4 md:gap-6 border p-4 rounded-md shadow-sm"
        >
          <img 
            :src="item.product.image" 
            :alt="item.product.title" 
            class="w-full md:w-24 h-40 md:h-24 object-cover rounded"
          />
          <div class="flex-1 w-full">
            <h2 class="text-lg sm:text-xl font-semibold text-center md:text-left">{{ item.product.title }}</h2>
            <div class="mt-2 flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2">
              <label class="text-center sm:text-left">
                Quantité :
                <input 
                  type="number" 
                  v-model.number="item.quantity" 
                  min="1" 
                  class="w-20 border px-2 py-1 rounded ml-1"
                  @change="updateQuantity(index, item.quantity)"
                />
              </label>
              <p class="text-center sm:text-left">Prix unitaire : {{ item.product.price }} €</p>
              <p class="font-semibold text-center sm:text-left">
                Total : {{ (item.product.price * item.quantity).toFixed(2) }} €
              </p>
            </div>
          </div>
          <button 
            @click="removeProduct(index)"
            class="text-red-600 hover:underline mt-2 md:mt-0"
          >
            Supprimer
          </button>
        </div>
      </div>

      <div class="mt-10 text-center sm:text-right">
        <p class="text-xl font-bold">Total du panier : {{ totalPrice.toFixed(2) }} €</p>
        <ActionButton title="Passer la commande" class="mt-4"/>
      </div>
    </div>

    <div v-else class="text-center py-8 flex flex-col items-center">
      <p class="text-gray-600 mb-4">Votre panier est vide.</p>
      <LinkButton to="/products" title="Continuer mes achats" type="empty"/>
    </div>

    <InfoView />
  </main>
</template>

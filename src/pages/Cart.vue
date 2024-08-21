<script setup>
  import { useCartStore } from '../store/CartStore';
  import { onMounted } from 'vue';

  onMounted(() => {
    cartStore.loadCart();
  })
  
  const cartStore = useCartStore();
  
  const removeFromCart = (productId) => {
    cartStore.removeFromCart(productId);
  };
  
  const updateQuantity = (productId, quantity) => {
    cartStore.updateQuantity(productId, quantity);
  };
  
  const clearCart = () => {
    cartStore.clearCart();
  };
</script>

<template>
    <div class="flex flex-col items-center">
      <div v-if="cartStore.cart.length === 0" class="text-center text-gray-600">
        Your cart is empty.
      </div>
      <div v-else class="w-full max-w-4xl">
        <div v-for="item in cartStore.cart" :key="item.id" class="flex flex-col p-4 border-b lg:flex-row lg:items-center">
          <div class="flex-shrink-0 lg:w-1/4 mb-4 lg:mb-0">
            <img :src="item.image" alt="Product Image" class="w-full h-auto object-cover rounded-md">
          </div>
          <div class="flex flex-col justify-between w-full lg:w-3/4 lg:ml-4">
            <div class="flex justify-between items-center">
              <h2 class="text-lg font-bold">{{ item.title }}</h2>
              <button @click="cartStore.removeFromCart(item.id)" class="text-red-500">Remove</button>
            </div>
            <div class="flex justify-between items-center mt-2">
              <span>${{ item.price }}</span>
              <input type="number" v-model="item.quantity" @change="cartStore.updateQuantity(item.id, item.quantity)" min="1" class="w-12 text-center border"/>
              <span>Total: R{{ (item.price * item.quantity).toFixed(2) }}</span>
            </div>
          </div>
        </div>
        <div class="flex justify-between mt-6">
          <h3>Total Items: {{ cartStore.cartItemCount }}</h3>
          <h3>Total Cost: R{{ cartStore.cartTotal }}</h3>
        </div>
        <div class="flex justify-between my-6">
          <router-link to="/checkout" class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
            Proceed to Checkout
          </router-link>
          <button @click="cartStore.clearCart" class="bg-red-500 text-white p-2 rounded">Clear Cart</button>
        </div>
      </div>
    </div>
</template>
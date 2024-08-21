<script setup>
    import { ref, onMounted } from 'vue';
    import { useCartStore } from '../store/CartStore';
    import PayPalButton from '../components/PayPalButton.vue';
    import { jwtDecode } from 'jwt-decode';

    const cartStore = useCartStore();
    const cartItems = cartStore.cart;
    const totalCost = cartStore.cartTotal;
    const paymentMethod = ref('');
    const errorMessage = ref('');
    const confirmationMessage = ref('');

    const userInfo = ref({
        name: '',
        address: '',
        email: ''
    });

    onMounted(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            const userId = decoded.sub;


        fetch(`https://fakestoreapi.com/users/${userId}`)
        .then(res => res.json())
        .then(data => {
            userInfo.value.name = `${data.name.firstname} ${data.name.lastname}`;
            userInfo.value.address = `${data.address.street}, ${data.address.city}, ${data.address.zipcode}`;
            userInfo.value.email = data.email;
        })
        .catch(error => {
            console.error('Error fetching user information:', error);
        });
    }
    });

    const placeOrder = () => {
        if (!paymentMethod.value) {
            errorMessage.value = 'Please select a payment method.';
            confirmationMessage.value = ''; 
            return;
        }

        const paymentSuccessful = true; 

        if (paymentSuccessful) {
            confirmationMessage.value = 'Your order has been placed successfully!';
            errorMessage.value = ''; 
        } else {
            errorMessage.value = 'Payment failed. Please try again.';
            confirmationMessage.value = ''; 
        }
    };

    const modifyInfo = () => {

    };

    const handleSuccess = (details) => {
    console.log('Payment successful!', details);
    confirmationMessage.value = 'Your order has been placed successfully!';
    errorMessage.value = ''; 
    };

    const handleError = (error) => {
    console.error('Payment failed:', error);
    errorMessage.value = 'Payment failed. Please try again.';
    confirmationMessage.value = ''; 
    };

    const handleCancel = (data) => {
    console.log('Payment canceled:', data);
    errorMessage.value = 'Payment was canceled.';
    confirmationMessage.value = ''; 
    };


</script>


<template>
    <div class="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 class="text-3xl font-bold mb-6">Checkout</h1>
  
      <!-- User Information Form -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Your Information</h2>
        <form @submit.prevent="placeOrder" class="space-y-4">
          <div class="flex flex-col">
            <label for="name" class="mb-2 text-lg font-medium">Name</label>
            <input v-model="userInfo.name" id="name" type="text" required
              class="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div class="flex flex-col">
            <label for="address" class="mb-2 text-lg font-medium">Residential Address</label>
            <input v-model="userInfo.address" id="address" type="text" required
              class="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div class="flex flex-col">
            <label for="email" class="mb-2 text-lg font-medium">Email</label>
            <input v-model="userInfo.email" id="email" type="email" required
              class="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button type="button" @click="modifyInfo"
            class="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Modify Info
          </button>
        </form>
      </div>
  
      <!-- Order Summary -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Order Summary</h2>
        <ul class="space-y-2">
          <li v-for="item in cartItems" :key="item.id" class="flex justify-between">
            <span>{{ item.title }}</span>
            <span>{{ item.quantity }} x R{{ item.price }}</span>
          </li>
        </ul>
        <p class="mt-4 text-xl font-semibold">Total: R{{ totalCost }}</p>
      </div>
  
      <!-- Payment Method Selection -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Select Payment Method</h2>
        <select v-model="paymentMethod" required
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="" disabled>Select a payment method</option>
          <option value="paypal">Paypal</option>
        </select>
        <div v-if="paymentMethod === 'paypal'" class="mt-4">
            <PayPalButton 
                :amount="totalCost"
                :onSuccess="handleSuccess"
                :onError="handleError"
                :onCancel="handleCancel"
            />
        </div>
      </div>
  
      <!-- Place Order Button -->
      <button @click="placeOrder"
        class="w-full py-3 bg-green-500 text-white rounded-md hover:bg-green-600 font-semibold text-lg">
        Place Order
      </button>
  
      <!-- Error and Confirmation Messages -->
      <div v-if="errorMessage" class="mt-4 text-red-600 text-center font-semibold">{{ errorMessage }}</div>
      <div v-if="confirmationMessage" class="mt-4 text-green-600 text-center font-semibold">{{ confirmationMessage }}</div>
    </div>
</template>
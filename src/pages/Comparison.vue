<script setup>
    import { useComparisonStore } from '../store/ComparisonStore';

    const comparisonStore = useComparisonStore();

    const removeFromComparison = (productId) => {
    comparisonStore.removeFromComparison(productId);
    };

    const clearComparisonList = () => {
    comparisonStore.clearComparisonList();
    };

    console.log(comparisonStore.comparisonList)
</script>

<template>
    <div v-if="comparisonStore.comparisonList.length === 0">
      <p>Your comparison list is empty.</p>
    </div>
    <div v-else class="overflow-x-auto">
      <table class="min-w-full table-auto">
        <thead>
          <tr>
            <th class="px-2 py-2 bg-gray-200 text-left"> Product Name</th>
            <th v-for="product in comparisonStore.comparisonList" :key="product.id" class="px-4 py-2 border">{{ product.title }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="px-4 py-2 border font-bold">Product Image</td>
            <td v-for="product in comparisonStore.comparisonList" :key="product.id" class="px-4 py-2 border">
              <img :src="product.image" alt="Product image" class="w-32 h-32 object-contain" />
            </td>
          </tr>
          <tr>
            <td class="px-4 py-2 border font-bold">Product Description</td>
            <td v-for="product in comparisonStore.comparisonList" :key="product.id" class="px-4 py-2 border">{{ product.description }}</td>
          </tr>
          <tr>
            <td class="px-4 py-2 border font-bold">Price</td>
            <td v-for="product in comparisonStore.comparisonList" :key="product.id" class="px-4 py-2 border">R{{ product.price }}</td>
          </tr>
          <tr>
            <td class="px-4 py-2 border font-bold">Rating</td>
            <td v-for="product in comparisonStore.comparisonList" :key="product.id" class="px-4 py-2 border">{{ product.rating.rate }} / 5</td>
          </tr>
          <tr>
            <td class="px-4 py-2"></td>
            <td v-for="product in comparisonStore.comparisonList" :key="product.id" class="px-4 py-2 border">
              <button @click="removeFromComparison(product.id)" class="bg-red-500 text-white p-2 rounded">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="clearComparisonList" class="bg-red-500 text-white p-2 mt-4 rounded">Clear Comparison List</button>
    </div>
</template>
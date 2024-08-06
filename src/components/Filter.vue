<script setup>
    import { ref, onMounted } from 'vue';
    import { useProductStore } from '../store/useProductStore';
    import { getCategories } from '../api/api';
  
    const store = useProductStore();
    const selectedCategory = ref(store.filterItem);
    const categories = ref([]);
  
    onMounted(async () => {
        const { response, error } = await getCategories();
        if (!error) {
        categories.value = response;
        }
    });
  
    const applyFilter = () => {
        store.setFilterItem(selectedCategory.value);
    };
</script>

<template>
    <div>
      <label for="filter">Filter by Category:</label>
      <select id="filter" v-model="selectedCategory" @change="applyFilter">
        <option value="All categories">All categories</option>
        <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
      </select>
    </div>
</template>
  

  
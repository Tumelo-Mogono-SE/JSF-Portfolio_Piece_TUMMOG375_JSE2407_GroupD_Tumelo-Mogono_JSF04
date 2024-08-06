<script setup>
    import { ref } from 'vue';
    import { useProductStore } from '../store/useProductStore';
    
    const store = useProductStore();
    const selectedSort = ref(store.sorting);
    
    const applySort = () => {
        store.setSorting(selectedSort.value);
    };
</script>

<template>
    <div>
      <label for="sort">Sort by:</label>
      <select id="sort" v-model="selectedSort" @change="applySort">
        <option value="default">Default</option>
        <option value="low">Price: Low to High</option>
        <option value="high">Price: High to Low</option>
      </select>
    </div>
</template>
  

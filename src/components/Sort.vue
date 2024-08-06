<script setup>
    import { ref } from 'vue';
    import { useProductStore } from '../store/useProductStore';
    
    /**
    * Initializes the product store.
    * @constant {Object}
    */
    const store = useProductStore();

    /**
    * Ref for selected sort option.
    * @constant {Ref<string>}
    */
    const selectedSort = ref(store.sorting);
    
    /**
    * Applies the selected sort option by updating the store.
    */
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
  

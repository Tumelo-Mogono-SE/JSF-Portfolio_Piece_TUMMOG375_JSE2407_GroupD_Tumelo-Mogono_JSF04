<script setup>
    import { ref, onMounted } from 'vue';
    import { getCategories } from '../api/api';

    const props = defineProps({
      store: {
        type: Object,
        required: true
      }
    })
  
    const selectedCategory = ref(props.store.filterItem);
    const categories = ref([]);

  
    /**
     * Fetches categories when the component is mounted.
    */
    onMounted(async () => {
        const { response, error } = await getCategories();
        if (!error) {
        categories.value = response;
        }
    });
  
    /**
     * Applies the selected category filter by updating the store.
     * @function
    */
    const applyFilter = () => {
        props.store.setFilterItem(selectedCategory.value);
    };
</script>

<template>
    <div class="flex lg:w-[31.25rem] sm:w-[95%] md:w-full relative">
      <label for="filter">Filter by Category:</label>
      <select id="filter" v-model="selectedCategory" @change="applyFilter">
        <option value="All categories">All categories</option>
        <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
      </select>
    </div>
</template>
  

  
<script setup>
    import { ref } from 'vue';
    

    const props = defineProps({
      store: {
        type: Object,
        required:true
      }
    })

    /**
    * Ref for selected sort option.
    * @constant {Ref<string>}
    */
    const selectedSort = ref(props.store.sorting);
    
    /**
    * Applies the selected sort option by updating the store.
    */
    const applySort = () => {
        props.store.setSorting(selectedSort.value);
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
  

<script setup>
    import { onMounted } from 'vue';
    import { useProductStore } from '../store/useProductStore';
    import Filter from '../components/Filter.vue';
    import Sort from '../components/Sort.vue';
    import ProductList from '../components/ProductList.vue';

    /**
    * Initializes the product store.
    * @constant {Object}
    */
    const store = useProductStore();

    /**
    * Fetches the product data when the component is mounted.
    */
    onMounted(() => {
        store.fetchProducts();
    });
</script>

<template>
    <div>
        <div class="grid lg:flex gap-y-4 gap-x-48 lg:items-start mt-3 mx-auto justify-center">
            <Filter />
            <Sort />
        </div>
        <ProductList />
    </div>
</template>
<script setup>
    import { onMounted } from 'vue';
    import { useProductStore } from '../store/useProductStore';
    import Filter from '../components/Filter.vue';
    import Sort from '../components/Sort.vue';
    import ProductList from '../components/ProductList.vue';

    const store = useProductStore();

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
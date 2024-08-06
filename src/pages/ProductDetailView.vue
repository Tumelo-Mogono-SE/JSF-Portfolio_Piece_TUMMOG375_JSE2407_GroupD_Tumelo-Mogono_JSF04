<script setup>
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import { fetchSingleProduct } from '../api/api';
    import { useProductStore } from '../store/useProductStore';
    import ProductDetail from '../components/ProductDetail.vue';
    import ProductSkeleton from '../components/ProductSkeleton.vue';
    import Error from '../components/Error.vue';

    const route = useRoute();
    const productStore = useProductStore();
    const product = ref(null);
    const error = ref(null);
    const loading = ref(true);

    const productId = route.params.id;
  
    onMounted(async () => {
        try {
            const { response, error: fetchError} = await fetchSingleProduct(productId);
            if(fetchError) {
                throw new Error(fetchError)
            }
            product.value = response;
        } catch (err) {
            error.value = err.message;
        } finally {
            loading.value = false;
        }
    });
</script>

<template>
    <div>
      <div v-if="error" class="flex justify-center">
        <Error />
      </div>
      <div v-else class="flex justify-center">
        <ProductSkeleton v-if="loading" />
        <ProductDetail v-else v-bind="product" />
      </div>
    </div>
</template>
  
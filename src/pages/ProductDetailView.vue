<script setup>
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import { fetchSingleProduct } from '../api/api';
    import ProductDetail from '../components/ProductDetail.vue';
    import ProductSkeleton from '../components/ProductSkeleton.vue';
    import Error from '../components/Error.vue';

    /**
    * The route object to access route parameters.
    * @constant {Object}
    */
    const route = useRoute();

    /**
    * Ref for the product data.
    * @constant {Ref<Object|null>}
    */
    const product = ref(null);

    /**
    * Ref for the error message.
    * @constant {Ref<string|null>}
    */
    const error = ref(null);

    /**
    * Ref for the loading state.
    * @constant {Ref<boolean>}
    */
    const loading = ref(true);

    /**
    * The ID of the product to fetch,hwhich is extracted from the route parameters.
    * @constant {string}
    */
    const productId = route.params.id;
  
    /**
    * Fetches the product data when the component is mounted.
    * Sets the product data or error message and updates the loading state.
    */
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
  
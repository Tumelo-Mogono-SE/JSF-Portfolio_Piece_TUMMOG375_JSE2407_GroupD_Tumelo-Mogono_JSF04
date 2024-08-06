<script setup>
    import { useProductStore } from '../store/useProductStore';
    import ProductCard from './ProductCard.vue';
    import CardSkeleton from './CardSkeleton.vue';
    import Error from './Error.vue';
    
    /**
    * Initializes the product store.
    * @constant {Object}
    */
    const productStore = useProductStore();
</script>

<template>
    <div>
      <div v-if="productStore.loading && !productStore.error" class="grid justify-center">
        <div class="lg:max-h-[130rem] max-w-xl mx-auto grid gap-4 grid-cols-1 lg:grid-cols-4 md:grid-cols-2 items-center lg:max-w-none my-4">
          <CardSkeleton v-for="n in 20" :key="n" />
        </div>
      </div>
      <div v-else-if="productStore.error" class="grid justify-center">
        <Error />
      </div>
      <div v-else class="grid justify-center">
        <div class="lg:max-h-[130rem] max-w-xl mx-auto grid gap-4 grid-cols-1 lg:grid-cols-4 md:grid-cols-2 items-center lg:max-w-none my-4">
          <ProductCard v-for="product in productStore.products" :key="product.id" v-bind="product"
             />
        </div>
      </div>
    </div>
</template>
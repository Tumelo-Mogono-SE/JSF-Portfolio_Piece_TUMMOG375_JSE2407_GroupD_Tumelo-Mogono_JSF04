<script setup>
    import ProductCard from '../components/ProductCard.vue';
    import { useWishlistStore } from '../store/WishlistStore';
    import Filter from '../components/Filter.vue';
    import Sort from '../components/Sort.vue';

    const wishlistStore = useWishlistStore();
</script>

<template>
    <div >
        <h2>My Wishlist</h2>

        <div class="grid lg:flex gap-y-4 gap-x-48 lg:items-start mt-3 mx-auto justify-center">
            <Filter :store="wishlistStore"/>
            <Sort :store="wishlistStore"/>
        </div>
        <div v-if="wishlistStore.wishlist.length === 0" class="text-center text-gray-600">
        Your wishlist is empty.
        </div>
        <div v-else class="grid justify-center">
            <div class="lg:max-h-[130rem] max-w-xl mx-auto grid gap-4 grid-cols-1 lg:grid-cols-4 md:grid-cols-2 items-center lg:max-w-none my-4">
                <ProductCard
                    v-for="item in wishlistStore.filteredAndSortedWishlist"
                    :key="item.id" v-bind="item"
                />
            </div>
        </div>
        <button @click="wishlistStore.clearWishlist" class="btn btn-danger mt-4">
            Clear Wishlist
        </button>
    </div>
</template>
import { defineStore } from 'pinia';

export const useWishlistStore = defineStore('wishlistStore', {
  state: () => ({
    wishlist: JSON.parse(localStorage.getItem('wishlist')) || [],
    sorting: 'default',
    filterItem: 'All categories'
  }),
  actions: {
    addToWishlist(product) {
      if (!this.wishlist.some(item => item.id === product.id)) {
        this.wishlist.push(product);
        this.syncLocalStorage();
      }
    },
    removeFromWishlist(productId) {
      this.wishlist = this.wishlist.filter(item => item.id !== productId);
      this.syncLocalStorage();
    },
    clearWishlist() {
      this.wishlist = [];
      this.syncLocalStorage();
    },
    syncLocalStorage() {
      localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
    },
    setSorting(sortOption) {
      this.sorting = sortOption;
    },
    setFilterItem(category) {
      this.filterItem = category;
    },
  },
  getters: {
    filteredAndSortedWishlist(state) {
      let filtered = state.wishlist;

      // Apply filtering
      if (state.filterItem !== 'All categories') {
        filtered = filtered.filter(
          product => product.category === state.filterItem
        );
      }

      // Apply sorting
      if (state.sorting === 'low') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (state.sorting === 'high') {
        filtered.sort((a, b) => b.price - a.price);
      }

      return filtered;
    },
  },
});
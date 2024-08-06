import { defineStore } from 'pinia';

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [],
    originalProducts: [],
    loading: false,
    error: false,
    sorting: 'default',
    filterItem: 'All categories',
  }),
  actions: {
    setSorting(sorting) {
      this.sorting = sorting;
      this.sortProducts();
    },
    setFilterItem(category) {
      this.filterItem = category;
      this.fetchProducts();
    },
    async fetchProducts() {
      this.loading = true;
      this.error = false;
      try {
        const filterItem = this.filterItem !== 'All categories' ? `/category/${this.filterItem}` : '';
        const response = await fetch(`https://fakestoreapi.com/products${filterItem}`);
        if (!response.ok) {
          throw new Error('Data fetching failed, please check your network connection');
        }
        const data = await response.json();
        this.products = data;
        this.originalProducts = JSON.parse(JSON.stringify(data)); // Deep copy
        this.sortProducts();
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    sortProducts() {
      if (this.sorting === 'low') {
        this.products.sort((a, b) => a.price - b.price);
      } else if (this.sorting === 'high') {
        this.products.sort((a, b) => b.price - a.price);
      } else {
        this.products = JSON.parse(JSON.stringify(this.originalProducts)); // Reset to original
      }
    },
  },
  getters: {
    filteredProducts: (state) => {
      return state.products.filter((product) => {
        if (state.filterItem === 'All categories') return true;
        return product.category === state.filterItem;
      });
    },
  },
});

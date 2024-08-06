import { defineStore } from 'pinia';


/**
 * A Store for managing product-related state.
 */
export const useProductStore = defineStore('productStore', {
  state: () => ({
    /**
     * An Array of products.
     * @type {Array<Object>}
     */
    products: [],

    /**
     * An Array of original products.
     * @type {Array<Object>}
     */
    originalProducts: [],

    /**
     * A Loading state indicator.
     * @type {boolean}
     */
    loading: false,

    /**
     * An Error state indicator.
     * @type {boolean|string}
     */
    error: false,

    /**
     * A Current sorting method.
     * @type {string}
     */
    sorting: 'default',

    /**
     * A Current filter item (category).
     * @type {string}
     */
    filterItem: 'All categories',
  }),
  actions: {

    /**
     * A function that Sets the sorting method and sorts the products.
     * @param {string} sorting - The sorting method ('low', 'high', 'default').
     */
    setSorting(sorting) {
      this.sorting = sorting;
      this.sortProducts();
    },

    /**
     * A function that Sets the filter item (category) and fetches products based on the selected category.
     * @param {string} category - The category to filter by.
     */
    setFilterItem(category) {
      this.filterItem = category;
      this.fetchProducts();
    },

    /**
     * A function that Fetches products from the API, applying any active filters.
     */
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

    /**
     * A function that Sorts the products based on the current sorting method.
     */
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
    /**
     * Returns the filtered list of products based on the selected category.
     * @returns {Array<Object>} Filtered products.
     */
    filteredProducts: (state) => {
      return state.products.filter((product) => {
        if (state.filterItem === 'All categories') return true;
        return product.category === state.filterItem;
      });
    },
  },
});

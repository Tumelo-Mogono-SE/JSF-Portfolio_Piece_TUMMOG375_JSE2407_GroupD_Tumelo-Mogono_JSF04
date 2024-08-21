import { defineStore } from 'pinia';

export const useComparisonStore = defineStore('comparisonStore', {
  state: () => ({
    comparisonList: [],
  }),
  actions: {
    addToComparison(product) {
      if (this.comparisonList.length < 4 && !this.comparisonList.find(item => item.id === product.id)) {
        this.comparisonList.push(product);
      }
    },
    removeFromComparison(productId) {
      this.comparisonList = this.comparisonList.filter(item => item.id !== productId);
    },
    clearComparisonList() {
      this.comparisonList = [];
    },
  },
  getters: {
    comparisonCount: (state) => state.comparisonList.length,
  },
});
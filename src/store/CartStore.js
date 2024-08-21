import { defineStore } from 'pinia';
import {jwtDecode} from 'jwt-decode';

export const useCartStore = defineStore('cartStore', {
  state: () => ({
    cart: [],
  }),
  getters: {
    cartItemCount: (state) => state.cart.reduce((count, item) => count + item.quantity, 0),
    cartTotal: (state) => state.cart.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2),
  },
  actions: {
    addToCart(product) {
      const existingItem = this.cart.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
      this.saveCart();
    },
    removeFromCart(productId) {
      this.cart = this.cart.filter(item => item.id !== productId);
      this.saveCart();
    },
    updateQuantity(productId, quantity) {
      const item = this.cart.find(item => item.id === productId);
      if (item) {
        item.quantity = quantity;
        this.saveCart();
      }
    },
    clearCart() {
      this.cart = [];
      this.saveCart();
    },
    saveCart() {
      const token = localStorage.getItem('token');
      if (token) {
        const userId = jwtDecode(token).sub;
        localStorage.setItem(`cart_${userId}`, JSON.stringify(this.cart));
      }
    },
    loadCart() {
      const token = localStorage.getItem('token');
      if (token) {
        const userId = jwtDecode(token).sub;
        const savedCart = localStorage.getItem(`cart_${userId}`);
        if (savedCart) {
          this.cart = JSON.parse(savedCart);
        }
      }
    },
    OnInit() {
      this.loadCart();
    }
  },
});

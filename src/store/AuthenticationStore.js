import { defineStore } from 'pinia';
import router from '../router';

export const useAuthenticationStore = defineStore('authenticationStore', {
    state: () => ({
      token: localStorage.getItem('token') || null,
      user: null,
      loading: false,
      error: null,
    }),
    actions: {
      async login(username, password) {
        this.loading = true;
        this.error = null;
        try {
          const response = await fetch('https://fakestoreapi.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
          });
          if (!response.ok) {
            throw new Error('Login failed');
          }
          const data = await response.json();
          this.token = data.token;
          localStorage.setItem('token', data.token);
          // Fetch user details if needed
          router.push({ path: this.returnTo || '/' });
        } catch (error) {
          this.error = error.message;
        } finally {
          this.loading = false;
        }
      },
      logout() {
        this.token = null;
        localStorage.removeItem('token');
        router.push('/');
      },
      isAuthenticated() {
        return !!this.token;
      },
    },
  });
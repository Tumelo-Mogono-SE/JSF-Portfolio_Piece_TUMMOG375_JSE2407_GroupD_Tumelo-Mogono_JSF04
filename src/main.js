import { createApp } from 'vue';
import './style.css';
import './tailwind.css';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';

// Initializes and mounts the main Vue application.
// Create the main application instance.
const app = createApp(App);

/**
 * Initializes and configures the Pinia store.
 * @type {Object}
 */
const pinia = createPinia();

// Use the Pinia store with the application.
app.use(pinia);

/**
 * Uses the Vue Router with the application.
 * @type {Object}
 */
app.use(router);

// Mount the application to the DOM element with the ID 'app'.
app.mount('#app');

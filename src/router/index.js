import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import ProductDetailView from '../pages/ProductDetailView.vue';
import LoginPage from '../pages/LoginPage.vue';
import Cart from '../pages/Cart.vue';
import Comparison from '../pages/Comparison.vue';
import Wishlist from '../pages/Wishlist.vue';
import { useAuthenticationStore } from '../store/AuthenticationStore';

/**
 * An Array of route definitions.
 * @type {Array<Object>}
 */
const routes = [

    /**
     * Route for the home page.
     * @type {Object}
     * @property {string} path - The URL path.
     * @property {Object} component - The component to render for this path.
     */
    { path: '/', component: Home },

    /**
     * Route for the product detail view.
     * @type {Object}
     * @property {string} path - The URL path, with a dynamic segment for the product ID.
     * @property {Object} component - The component to render for this path.
     */
    { path: '/products/:id', component: ProductDetailView },

    { path: '/login', component: LoginPage },

    { path: '/cart', component: Cart, meta: {requiresAuth: true}  },

    { path: '/comparisonlist', component: Comparison, meta: { requiresAuth: true }},

    { path: '/wishlist', component: Wishlist, meta: {requiresAuth: true}  },
];

/**
 * Creates and configures the router.
 * @type {Object}
 * @property {Object} history - The history mode for the router.
 * @property {Array<Object>} routes - The array of route definitions.
 */
const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const authenticationStore = useAuthenticationStore();
    if (to.meta.requiresAuth && !authenticationStore.isAuthenticated()) {
      authenticationStore.returnTo = to.fullPath;
      console.log(authenticationStore.returnTo);
      next('/login');
    } else {
      next();
    }
});

export default router;
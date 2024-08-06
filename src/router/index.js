import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import ProductDetailView from '../pages/ProductDetailView.vue';


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
    { path: '/products/:id', component: ProductDetailView }
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

export default router;
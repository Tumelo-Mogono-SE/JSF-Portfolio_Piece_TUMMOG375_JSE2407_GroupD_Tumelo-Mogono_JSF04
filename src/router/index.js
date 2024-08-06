import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import ProductDetailView from '../pages/ProductDetailView.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/products/:id', component: ProductDetailView }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
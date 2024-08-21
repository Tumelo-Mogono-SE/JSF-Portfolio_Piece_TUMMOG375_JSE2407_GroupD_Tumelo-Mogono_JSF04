<script setup>
    import { ref } from 'vue';
    import { useAuthenticationStore } from '../store/AuthenticationStore.js';

    const username = ref('');
    const password = ref('');
    const showPassword = ref(false);
    const authenticationStore = useAuthenticationStore();

    const login = () => {
        if (username.value && password.value) {
            authenticationStore.login(username.value, password.value);
        }
    };

    const togglePasswordVisibility = () => {
        showPassword.value = !showPassword.value;
    };
</script>

<template>
    <div class="flex justify-center items-center h-screen">
        <div class="w-full max-w-md">
            <h2 class="text-2xl font-bold text-center mb-6">Login</h2>
            <form @submit.prevent="login" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Username</label>
                    <input
                        v-model="username"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="Username"
                        required
                    />
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
                    <input
                        v-model="password"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        :type="showPassword ? 'text' : 'password'"
                        placeholder="********"
                        required
                    />
                    <button type="button" @click="togglePasswordVisibility">
                        {{  showPassword ? 'Hide' : 'Show' }} Password
                    </button>
                </div>
                <div class="text-red-500 text-xs italic mb-4" v-if="error">
                    {{ error }}
                </div>
                <div class="flex items-center justify-between">
                    <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
    import { ref } from 'vue';
    let message = ref('Data fetching failed, please check your network connection')
</script>

<template>
    <div class="mt-28 text-red-500 text-xl font-bold">
        {{ message }}
    </div>
</template>
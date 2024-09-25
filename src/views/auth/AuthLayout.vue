<script setup>
    import { computed } from 'vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();

    const title = computed(() => route.name === 'login' ? 'Login' : 'Sign up')
</script>

<template>
    <div class="md:flex justify-center items-center min-h-screen gap-5 p-2 md:p-0">
        <img src="/logo.png" alt="Logo image">
        <div class="w-full md:w-1/3">
            <div class="flex justify-between items-center mb-2 px-3 md:px-0">
                <h2 class="text-4xl font-black mb-3">{{ title }}</h2>
                <RouterLink
                    :to="{ name: 'home' }"
                    class="text-lg bg-gray-50 rounded shadow py-2 px-3 hover:bg-gray-100 transition-all font-semibold"
                >
                    Kiosk
                </RouterLink>
            </div>
            <div class="shadow rounded p-5">
                <RouterView />
            </div>
        </div>
    </div>
</template>
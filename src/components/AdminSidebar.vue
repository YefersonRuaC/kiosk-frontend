<script setup>
    import { useUserStore } from '@/stores/user';
    import { useRoute } from 'vue-router';

    const route = useRoute()
    const user = useUserStore()
</script>

<template>
    <aside class="flex flex-col justify-between md:w-56 lg:w-64 xl:w-80 h-auto md:h-screen px-2">
        <div class="flex flex-col justify-center items-center mt-2 gap-1">
            <img src="/logo.png" alt="Logo image" class="w-4/5">
            <RouterLink
                :to="{ name: 'orders' }"
                class="w-full shadow p-5 hover:bg-gray-100 transition-all rounded-sm font-bold mt-2 text-center"
                :class="{ 'bg-gray-100 hover:bg-gray-200' : route.name === 'orders'} "
            >
                Orders
            </RouterLink>
            <RouterLink
                :to="{ name: 'products' }"
                class="w-full shadow p-5 hover:bg-gray-100 transition-all rounded-sm font-bold text-center"
                :class="{ 'bg-gray-100 hover:bg-gray-200' : route.name === 'products'} "
            >
                Products in stock
            </RouterLink>
            <RouterLink
                :to="{ name: 'products-out' }"
                class="w-full shadow p-5 hover:bg-gray-100 transition-all rounded-sm font-bold text-center"
                :class="{ 'bg-gray-100 hover:bg-gray-200' : route.name === 'products-out'} "
            >
                Products out of stock
            </RouterLink>
        </div>
        <button
            type="button"
            class="w-full shadow p-3 bg-red-700 hover:bg-red-800 mt-10 mb-5 text-white transition-all rounded-sm font-bold"
            @click="user.logout"
        >
            Log out
        </button>
    </aside>
</template>
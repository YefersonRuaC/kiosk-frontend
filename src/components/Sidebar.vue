<script setup>
    import { RouterLink } from 'vue-router';
    import Category from '@/components/Category.vue';
    import { useCategoriesStore } from '@/stores/categories';
    import { onMounted } from 'vue';

    const categories = useCategoriesStore()

    onMounted( async() => {
        await categories.fetchCategories()
    })
</script>

<template>
    <aside class="md:w-56 lg:w-64 xl:w-80 h-screen px-2">
        <RouterLink
            :to="{ name: 'login' }"
            class="flex justify-center text-white font-bold hover:text-black transition-all"
        >
            Auth
        </RouterLink>

        <div class="flex justify-center">
            <img src="/logo.png" alt="Logo image" class="w-4/5">
        </div>
        
        <Category 
            v-for="category in categories.categories"
            :key="category.id"
            :category="category"
        />
    </aside>
</template>
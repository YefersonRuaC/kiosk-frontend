<script setup>
    import { useCategoriesStore } from '@/stores/categories';

    const categories = useCategoriesStore();

    defineProps({
        category: {
            type: Object
        }
    })
</script>

<template>
    <div class="">
        <button
            @click="categories.handleClickCategory(category.id)"
            class="w-full shadow py-5 hover:bg-gray-100 transition-all rounded-sm font-bold"
            :class="{ 'bg-gray-100 hover:bg-gray-200' : categories.setCurrentCategory === category.id }"
        >
            {{ category.name }}
        </button>
    </div>
</template>
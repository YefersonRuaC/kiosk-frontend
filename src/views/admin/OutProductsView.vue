<script setup>
    import AdminProduct from '@/components/AdminProduct.vue';
    import { useProductsStore } from '@/stores/products';
    import { onMounted, watch } from 'vue';

    const products = useProductsStore()

    // watch(products.products, async() => {
    onMounted( async() => {
        await products.unavailableProducts()
    })
</script>

<template>
    <h1 class="text-4xl font-black mb-3">Products out of stock</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        <AdminProduct 
            v-for="product in products.outProducts"
            :key="product.id"
            :product="product"
        />
    </div>
</template>
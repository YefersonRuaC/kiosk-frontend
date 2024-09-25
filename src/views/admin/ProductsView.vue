<script setup>
    import AdminProduct from '@/components/AdminProduct.vue';
    import { useProductsStore } from '@/stores/products';
    import { onMounted } from 'vue';

    const products = useProductsStore()

    onMounted( async() => {
        await products.fetchProducts()
    })
</script>

<template>
    <h1 class="text-4xl font-black mb-3">Products in stock</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        <AdminProduct 
            v-for="product in products.products"
            :key="product.id"
            :product="product"
        />
    </div>
</template>
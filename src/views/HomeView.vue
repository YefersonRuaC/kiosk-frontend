<script setup>
  import Sidebar from '@/components/Sidebar.vue';
  import Footer from '@/components/Footer.vue';
  import Product from '@/components/Product.vue';
  import { useProductsStore } from '@/stores/products';
  import { onMounted } from 'vue';
  import { useCategoriesStore } from '@/stores/categories';

  const products = useProductsStore();
  const categories = useCategoriesStore();

  onMounted(async () => {
    await products.fetchProducts();
  });
</script>

<template>
  <div class="md:flex min-h-screen">
    <Sidebar />

    <div class="flex-1 h-screen md:flex flex-col">
      <main class="flex-1 overflow-y-scroll px-4 pt-1 pb-80 md:pb-52">
        <h1 class="text-4xl font-black mb-3">{{ categories.setCategoryName }}</h1>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          <Product
            v-for="product in products.productsByCategory.value"
            :key="product.id"
            :product="product"
          />
        </div>
      </main>

      <Footer />
    </div>
  </div>
</template>

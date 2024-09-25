<script setup>
    import { useOrdersStore } from '@/stores/orders';
    import ProductSummary from './ProductSummary.vue';

    const orders = useOrdersStore();
</script>

<template>
    <footer class="flex w-full bottom-0 fixed bg-slate-100 h-72 md:h-48 md:justify-between p-2 md:p-0">
        <div class="grid grid-cols-12 w-full">
            <div v-if="orders.order.length" class="md:flex col-span-12 md:col-span-8 w-12/12 md:w-11/12 whitespace-nowrap overflow-x-scroll p-1 space-y-2 md:space-y-0 space-x-0 md:space-x-2">
                <ProductSummary 
                    v-for="order in orders.order"
                    :key="order.id"
                    :order="order"
                />
            </div>
            <div v-else class="flex justify-center items-center col-span-12 md:col-span-8 w-12/12 md:w-11/12 whitespace-nowrap overflow-x-scroll p-1 space-y-2 md:space-y-0 space-x-0 md:space-x-2">
                <p class="text-xl font-semibold text-gray-400">No products in your order yet</p>
            </div>
        
            <div class="flex flex-col items-center justify-center col-span-12 md:col-span-4 w-12/12 md:w-1/12 gap-3 py-5">
                <p class="text-xl font-bold text-center">
                    Total: ${{ orders.total.toFixed(2) }}
                </p>
            
                <form 
                    @submit.prevent="orders.handleSubmitCreateOrder"
                >
                    <input 
                        type="submit"
                        class="font-bold uppercase p-3 rounded bg-green-800 hover:bg-green-700 cursor-pointer text-white shadow transition-all"
                        value="Confirm order"
                    />
                </form>
            </div>
        </div>
    </footer>   
</template>
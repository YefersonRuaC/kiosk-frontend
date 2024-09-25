<script setup>
    import Order from '@/components/Order.vue';
    import { useOrdersStore } from '@/stores/orders';
    import { onMounted } from 'vue';

    const orders = useOrdersStore();
    
    onMounted( async() => {
        await orders.getPendingOrders();
    })
</script>

<template>
    <h1 class="text-4xl font-black mb-3">Orders</h1>
    <div v-if="orders.orders.length" class="grid grid-cols-1 md:grid-cols-2 gap-3 rounded">
        <Order 
            v-for="order in orders.orders"
            :key="order.id"
            :order="order"
        />
    </div>
    <p v-else class="text-center text-gray-400 uppercase text-lg">Not orders to prepare yet</p>
</template>
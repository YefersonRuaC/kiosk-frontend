<script setup>
    import { useOrdersStore } from '@/stores/orders';
    import { format } from 'date-fns';

    const orders = useOrdersStore();

    defineProps({
        order: {
            type: Object
        }
    })

    const formatDate = (dateString) => {
        return format(new Date(dateString), 'MMMM dd, yyyy');  // Formato para la fecha
    };

    // Función para formatear la hora
    const formatTime = (dateString) => {
        return format(new Date(dateString), 'HH:mm:ss');  // Formato para la hora
    };
</script>

<template>
    <div class="p-3 bg-white shadow border-b rounded-sm flex flex-col h-full">
        <p class="text-center text-gray-600 font-normal">
            Order placed at {{ formatTime(order.created_at) }} on
            <span>{{ formatDate(order.created_at) }}.</span>
        </p>
        <p class="text-xl font-bold">Order content:</p>
        <div class="flex-grow">
            <div 
                v-for="product in order.products" 
                class="border-b border-b-slate-200 last-of-type:border-none py-2"
            >
                <p class="text-sm text-gray-600">Order id: {{ order.id }}</p>
                <p class="font-semibold">{{ product.name }}</p>
                <p>Quantity: <span class="font-bold text-black">{{ product.pivot.quantity }}</span></p>
            </div>
        </div>
        <p class="text-lg font-bold">
            Total to pay: 
            <span class="font-semibold text-green-900 text-xl">
                ${{ order.total }}
            </span>
        </p>
        <button
            @click="orders.updateOrderState(order.id)"
            class='bg-green-600 hover:bg-green-800 cursor-pointer px-5 py-2 mt-3 text-white font-bold uppercase rounded-md w-full transition-all'
        >
            Complete
        </button>
    </div>    
</template>
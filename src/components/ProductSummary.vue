<script setup>
    import { useOrdersStore } from '@/stores/orders';
    import { ref } from 'vue';
    import { VueFinalModal } from 'vue-final-modal';

    const props = defineProps({
        order: {
            type: Object
        }
    });

    const orders = useOrdersStore();

    const isModal = ref(false);

    const openModal = () => {
        orders.changeProduct(props.order);
        isModal.value = true;
    };
</script>

<template>
    <div class="col-span-2 shadow p-3 rounded bg-white">
        <div class="">
            <p class="text-lg font-bold">{{ props.order.name }}</p>
            <p class="font-normal">
                Quantity: <span class="font-semibold">{{ props.order.quantity }}</span>
            </p>
            <p class="font-normal">
            Price: <span class="font-semibold">${{ props.order.price }}</span>
            </p>
            <p class="text-lg text-gray-700">
            Subtotal: ${{ props.order.subTotal.toFixed(2) }}
            </p>
        </div>

        <div class="flex justify-between md:justify-center md:gap-28 py-2 px-4 md:px-0">
            <button
                @click="openModal"
                class="bg-sky-700 p-2 text-white rounded-md font-bold uppercase shadow-md text-center"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>              
            </button>
            <button
                @click="orders.handleDeleteFromOrder(order.id)"
                class="bg-red-700 p-2 text-white rounded-md font-bold uppercase shadow-md text-center"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>              
            </button>
        </div>
    </div>  

    <VueFinalModal 
        v-model="isModal"
    >
        <div @click="isModal = false" class="fixed inset-0 bg-black bg-opacity-40"></div>

        <div class="bg-white rounded-lg shadow-lg p-8 md:w-full max-w-3xl md:mx-auto relative mt-12 md:mt-36 mx-5">
            <div class="flex justify-end">
                <button 
                    @click="isModal = false" 
                    class="text-gray-700 hover:text-gray-800 transition-all"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8">
                        <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>

            <div class="md:flex gap-10 mt-4 md:mt-0">
                <div class="md:w-1/3">
                    <img 
                        :src="`/img/${props.order.image}.jpg`" 
                        alt="Product Image" 
                        class="w-full" 
                    />
                </div>
                <div class="md:w-2/3 mt-5 md:mt-0">
                    <h1 class="text-3xl font-bold text-center md:text-left">{{ props.order.name }}</h1>
                    <p class="mt-3 font-black text-4xl text-green-900 text-center md:text-left">
                        ${{ props.order.price }}
                    </p>
                    <div class="flex justify-center md:justify-start gap-4 mt-5">
                        <button 
                            @click="orders.setQuantity(-1)" 
                            class="p-2 border border-gray-200 rounded-xl hover:bg-gray-100 transition-all"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </button>
                        <p class="font-medium text-3xl">{{ orders.quantity }}</p>
                        <button 
                            @click="orders.setQuantity(1)" 
                            class="p-2 rounded-xl border border-gray-200 hover:bg-gray-100 transition-all"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </button>
                    </div>
                    <button
                        @click="orders.handleUpdateFromOrder(order.id, orders.quantity); isModal = false"
                        class="w-full md:w-auto bg-blue-600 hover:bg-blue-800 px-5 py-2 mt-5 text-white font-bold uppercase rounded transition-all"
                    >
                        Save changes
                    </button>
                </div>
            </div>
        </div>
    </VueFinalModal>
</template>
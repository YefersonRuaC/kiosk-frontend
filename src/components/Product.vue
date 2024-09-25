<script setup>
    import { useOrdersStore } from '@/stores/orders';
    import { ref } from 'vue';
    import { VueFinalModal } from 'vue-final-modal';

    const props = defineProps({
        product: {
            type: Object
        }
    });

    const isModal = ref(false);
    const order = useOrdersStore();

    const openModal = () => {
        order.changeProduct(props.product);
        isModal.value = true;
    };
</script>

<template>
    <div class="shadow rounded flex flex-col h-full">
        <img 
            :src="`/img/${props.product.image}.jpg`" 
            alt="Image" 
            class="w-full h-auto rounded-t"
        >
        <div class="flex-grow px-2">
            <p class="text-lg text-center font-normal">{{ props.product.name }}</p>
            <p class="text-xl text-center font-semibold">${{ props.product.price }}</p>
        </div>
        <button
            @click="openModal"
            class="w-full p-2 bg-green-600 hover:bg-green-700 transition-all rounded-b uppercase font-bold text-white"
        >
            Add
        </button>
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
                        :src="`/img/${props.product.image}.jpg`" 
                        alt="Product Image" 
                        class="w-full" 
                    />
                </div>
                <div class="md:w-2/3 mt-5 md:mt-0">
                    <h1 class="text-3xl font-bold text-center md:text-left">{{ props.product.name }}</h1>
                    <p class="mt-3 font-black text-4xl text-green-900 text-center md:text-left">
                        ${{ props.product.price }}
                    </p>
                    <div class="flex justify-center md:justify-start gap-4 mt-5">
                        <button 
                            @click="order.setQuantity(-1)" 
                            class="p-2 border border-gray-200 rounded-xl hover:bg-gray-100 transition-all"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </button>
                        <p class="font-medium text-3xl">{{ order.quantity }}</p>
                        <button 
                            @click="order.setQuantity(1)" 
                            class="p-2 rounded-xl border border-gray-200 hover:bg-gray-100 transition-all"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </button>
                    </div>
                    <button
                        @click="order.handleAddOrder(props.product); isModal = false"
                        class="w-full md:w-auto bg-green-600 hover:bg-green-800 px-5 py-2 mt-5 text-white font-bold uppercase rounded transition-all"
                    >
                        Add to order
                    </button>
                </div>
            </div>
        </div>
    </VueFinalModal>
</template>
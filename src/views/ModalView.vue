<script setup>

</script>

<template>
    <!-- <div class="md:flex gap-10">
        <div class="md:w-1/3">
            <img 
                src="/img/cafe_01.jpg"
                alt=""
            />
        </div>
        <div class="md:w-2/3">
            <div class="flex justify-end">
                <button

                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            <h1 class="text-3xl font-bold mt-5">producto.nombre</h1>

            <p class="mt-5 font-black text-5xl text-amber-500">
                producto.precio
            </p>

            <div class="flex gap-4 mt-5">
                <button
                    type="button"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>

                <p class="text-3xl">cantidad</p>

                <button
                    type="button" 
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>
            </div>

            <button
                type="button"
                class="bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-5 text-white font-bold
                uppercase rounded-md"
            >
                Añadir al pedido
            </button>
        </div>
    </div> -->
    <div class="md:flex gap-10">
        <div class="md:w-1/3">
            <img 
                :src="`/img/${product.image}.jpg`"
                alt=""
            />
        </div>
        <div class="md:w-2/3">
            <div class="flex justify-end">
                <button @click="isModalVisible = false">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8">
                        <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>

            <h1 class="text-3xl font-bold mt-5">{{ product.name }}</h1>

            <p class="mt-5 font-black text-5xl text-amber-500">
                ${{ product.price }}
            </p>

            <div class="flex gap-4 mt-5">
                <button type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>

                <p class="text-3xl">1</p>

                <button type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>
            </div>

            <button
                type="button"
                class="bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-5 text-white font-bold uppercase rounded-md"
            >
                Añadir al pedido
            </button>
        </div>
    </div>
</template>
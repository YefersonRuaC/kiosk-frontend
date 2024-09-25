import ProductsAPI from "@/api/ProductsAPI";
import { defineStore } from "pinia";
import { inject, ref } from "vue";

export const useProductsStore = defineStore('products', () => {

    const toast = inject('toast');
    const products = ref([]);
    const outProducts = ref([]);
    const productsByCategory = ref([]);

    async function fetchProducts() {
        try {
            const { data } = await ProductsAPI.products();
            // console.log(data.data)
            products.value = data.data;

        } catch (error) {
            console.log(error);
        }
    }

    async function unavailableProducts() {
        try {
            const { data } = await ProductsAPI.unavailableProducts();
            // console.log(data.data)
            outProducts.value = data.data;

        } catch (error) {
            console.log(error);
        }
    }

    async function changeAvailability(id) {
        try {
            const { data } = await ProductsAPI.productAvailability(id);
            // console.log(data.product.available)

            if(data.product.available) {
                unavailableProducts();
                toast.open({
                    message: 'Product put into stock',
                    type: 'info'
                });
            } else {
                fetchProducts();
                toast.open({
                    message: 'Product taken out of stock',
                    type: 'info'
                });
            }

        } catch (error) {
            console.log(error);
        }
    }

    return {
        products,
        outProducts,
        fetchProducts,
        unavailableProducts,
        changeAvailability,
        productsByCategory
    }
});
import OrdersAPI from "@/api/OrdersAPI";
import { defineStore } from "pinia";
import { inject, ref, watch } from "vue";

export const useOrdersStore = defineStore('orders', () => {

    const toast = inject('toast');
    const orders = ref([]);
    const quantity = ref(1);
    const currentProduct = ref(null);
    const order = ref([]);
    const total = ref(0);

    watch(orders, () => {
        getPendingOrders();
    });

    watch(order, () => {
        defineNewTotal();
    }, { deep: true });

    async function getPendingOrders() {
        try {
            const { data }  = await OrdersAPI.pendingOrders();
            // console.log(data.data)
            orders.value = data.data;

        } catch (error) {
            console.log(error);
        }
    }

    async function updateOrderState(id) {
        try {
            const { data } = await OrdersAPI.updateState(id);
            // console.log(data.order)
            getPendingOrders();
            toast.open({
                message: `Order ${data.order.id} completed`,
                type: 'success'
            });

        } catch (error) {
            console.log(error);
        }
    }
    
    const setQuantity = (amount) => {
        if(amount < 0 && quantity.value > 1) {
            quantity.value--;
        } else if(amount > 0 && quantity.value < 5) {
            quantity.value++;
        }
        // console.log(quantity.value);
    }

    //Always that modal is open, check the product
    const changeProduct = (product) => {
        currentProduct.value = product;
        // console.log(product)
        //Check if currentProduct already exists in order array
        const existsProduct = order.value.find(selectedProduct => selectedProduct.id === product.id);
        if (existsProduct) {
            quantity.value = existsProduct.quantity;
        } else {
            quantity.value = 1;
        }
    }

    const defineNewTotal = () => {
        const newTotal = order.value.reduce((total, order) => order.subTotal + total, 0);
        total.value = newTotal;
    }
    
    const handleAddOrder = (product) => {
        //Check whether product exists in order array or no
        const existsProduct = order.value.find(selectedProduct => selectedProduct.id === product.id);
        // console.log(existsProduct)
        if(existsProduct) {
            existsProduct.quantity = quantity.value;
            existsProduct.subTotal = existsProduct.quantity * product.price;

            toast.open({
                message: 'Product updated successfully',
                type: 'info'
            });
        } else {
            order.value.push({
                ...product,
                quantity: quantity.value,
                subTotal: product.price * quantity.value
            });

            toast.open({
                message: 'Product added to order',
                type: 'success'
            });
        }
        quantity.value = 1;//Reset quantity state
        // console.log('ORDER', order.value)
    }

    const handleUpdateFromOrder = (id, newQuantity) => {
        //Getting the product that is gonna be updated
        const productToUpdate = order.value.find(product => product.id === id);
        // console.log(productToUpdate)
        if(productToUpdate) {
            //New quantity and subtotal of the updated product
            productToUpdate.quantity = newQuantity;
            productToUpdate.subTotal = productToUpdate.quantity * productToUpdate.price;
        }
        toast.open({
            message: 'Product updated successfully',
            type: 'info'
        });
    }

    const handleDeleteFromOrder = (id) => {
        //New order array without the product selected
        const orderUpdated = order.value.filter(product => product.id !== id);
        order.value = orderUpdated;
        toast.open({
            message: 'Product removed from order',
            type: 'error'
        });
    }

    async function handleSubmitCreateOrder() {
        const payload = {
            total: total.value,//Order total
            products: order.value.map(product => {//Order array with id and quantity of each product
                return {
                    id: product.id,
                    quantity: product.quantity
                }
            })
        }
        // console.log(payload)
        if (payload.products.length === 0) {
            toast.open({
                message: 'You must add at least one product to the order.',
                type: 'warning'
            });
            return;
        }

        try {
            const { data } = await OrdersAPI.createOrder(payload)
            // console.log(data)
            toast.open({
                message: data.message,
                type: 'success'
            });
            order.value = [];
            total.value = 0;

        } catch (error) {
            console.log(error);
            toast.open({
                message: 'Failed to create order. Please try again later.',
                type: 'error'
            });
        }
    }

    return {
        orders,
        getPendingOrders,
        updateOrderState,
        setQuantity,
        quantity,
        changeProduct,
        handleAddOrder,
        handleDeleteFromOrder,
        handleUpdateFromOrder,
        order,
        total,
        handleSubmitCreateOrder
    }
});
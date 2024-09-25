import api from "@/lib/axios";

export default {
    pendingOrders() {
        return api.get('/orders');
    },
    createOrder(payload) {
        return api.post('/orders', payload);
    },
    updateState(id) {
        return api.put(`/orders/${id}`);
    }
}
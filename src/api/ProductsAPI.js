import api from "@/lib/axios";

export default {
    products() {
        return api.get('/products');
    },
    unavailableProducts() {
        return api.get('/products/unavailable');
    },
    productAvailability(id) {
        return api.put(`/products/${id}`);
    }
}
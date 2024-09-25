import api from "@/lib/axios";

export default {
    register(data) {
        return api.post('/register', data);
    },
    login(data) {
        return api.post('/login', data)
    },
    logout() {
        return api.post('/logout')
    },
    auth() {
        return api.get('/user')
    },
    admin() {
        return api.get('/admin')
    }
}
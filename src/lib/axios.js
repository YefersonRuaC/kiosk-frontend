import axios from 'axios';

const api = axios.create({
    baseURL : import.meta.env.VITE_API_URL,
    headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true
})

api.interceptors.request.use( config => {
    const token = localStorage.getItem('local_token');
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
});

export default api
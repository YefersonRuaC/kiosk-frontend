import axios from 'axios';

//Axios instance
const api = axios.create({
    baseURL : import.meta.env.VITE_API_URL,
    headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'//Setting ajax requests
    },
    //Allow to send cookies in our requests
    withCredentials: true
})

//HTTP request interceptor
api.interceptors.request.use( config => {
    //Getting autorization token from localstorage
    const token = localStorage.getItem('local_token');
    if(token) {
        //Adding token to authorizacion headers
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
});

//api will be used in all requests to the laravel api endpoints (To check validation)
export default api
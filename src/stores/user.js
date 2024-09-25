import AuthAPI from "@/api/AuthAPI";
import { defineStore } from "pinia";
import { inject, ref } from "vue";
import { useRouter } from "vue-router";
import api from '@/lib/axios';

export const useUserStore = defineStore('user', () => {

    const toast = inject('toast');
    const router = useRouter();
    const user = ref({});
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const password_confirmation = ref('');

    async function register(data) {
        try {
            await AuthAPI.register(data)

            toast.open({
                message: `User ${data.name} registered`,
                type: 'success'
            })

            router.push({ name: 'login' })

        } catch (error) {
            toast.open({
                message: error.response.data,
                type: 'error'
            })
        }

        resetRegisterForm()
    }

    async function login(formdata) {
        try {
            const { data } = await AuthAPI.login(formdata)
            // console.log(data.token)
            // console.log(data.user)
            localStorage.setItem('local_token', data.token)
            api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`

            user.value = data.user;
            
            router.push({ name: 'orders' });

        } catch (error) {
            // console.log('Not user access', error)
            toast.open({
                message: error.response.data.errors[0],
                type: 'error'
            })
        }

        resetLoginForm()
    }

    async function logout() {
        await AuthAPI.logout();

        localStorage.removeItem('local_token')
        delete api.defaults.headers.common['Authorization']

        user.value = {}

        router.push({ name: 'home' })
    }

    function resetRegisterForm() {
        name.value = '',
        email.value = '',
        password.value = ''
        password_confirmation.value = ''
    }

    function resetLoginForm() {
        email.value = '',
        password.value = ''
    }

    return {
        user,
        name,
        email,
        password,
        password_confirmation,
        register,
        login,
        logout
    }
});
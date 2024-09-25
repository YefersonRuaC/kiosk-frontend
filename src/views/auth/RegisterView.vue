<script setup>
    import { useUserStore } from '@/stores/user';
    import { inject } from 'vue';
    
    const toast = inject('toast')
    const user = useUserStore()

    const handleSubmit = async () => {
        const data = {
            name: user.name,
            email: user.email,
            password: user.password,
            password_confirmation: user.password_confirmation
        }

        if (Object.values(data).some(value => value === undefined || value === '')) {
            toast.open({
                message: 'All fields are required.',
                type: 'error'
            })
            return
        }

        if (user.password !== user.password_confirmation) {
            toast.open({
                message: 'Password confirmation does not match.',
                type: 'error'
            })
            return
        }
        
        await user.register(data)
    }
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <div class="mb-2">
            <label for="name" class="text-slate-700 font-bold">Name</label>
            <input 
                type="name"
                id="name"
                class="mt-2 w-full p-3 shadow bg-gray-50 rounded"
                placeholder="Name"
                v-model="user.name"
            />
        </div>

        <div class="mb-2">
            <label for="email" class="text-slate-700 font-bold">Email</label>
            <input 
                type="email"
                id="email"
                class="mt-2 w-full p-3 shadow bg-gray-50 rounded"
                placeholder="Email"
                v-model="user.email"
            />
        </div>

        <div class="mb-2">
            <label for="password" class="text-slate-700 font-bold">Password</label>
            <input 
                type="password"
                id="password"
                class="mt-2 w-full p-3 shadow bg-gray-50 rounded"
                placeholder="Password"
                v-model="user.password"
            />
        </div>

        <div class="mb-2">
            <label for="password_confirmation" class="text-slate-700 font-bold">Password confirmation</label>
            <input 
                type="password"
                id="password_confirmation"
                class="mt-2 w-full p-3 shadow bg-gray-50 rounded"
                placeholder="Password confirmation"
                v-model="user.password_confirmation"
            />
        </div>
        
        <input
            type="submit"
            class="bg-green-600 hover:bg-green-700 uppercase text-white w-full p-3 mt-2 font-bold cursor-pointer rounded transition-all"
            value="Sign Up"
        />
    </form>
    <div class="mt-4 text-center text-blue-600 hover:text-blue-700 font-semibold transition-all">
        <RouterLink :to="{ name: 'login' }">
            Login
        </RouterLink>
    </div>
</template>
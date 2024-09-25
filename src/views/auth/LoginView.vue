<script setup>
    import { useUserStore } from '@/stores/user';
    import { inject } from 'vue';
    
    const toast = inject('toast')
    const user = useUserStore()

    const handleSubmit = async () => {
        const formData = {
            email: user.email,
            password: user.password
        }

        if (Object.values(formData).some(value => value === undefined || value === '')) {
            toast.open({
                message: 'All fields are required.',
                type: 'error'
            })
            return
        }
        
        await user.login(formData)
    }
</script>

<template>
    <form @submit.prevent="handleSubmit" >
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

        <input 
            type="submit" 
            class="bg-blue-600 hover:bg-blue-700 uppercase text-white w-full p-3 mt-2
            font-bold cursor-pointer rounded transition-all"
            value="Log in" 
        />
    </form>
    
    <div class="mt-4 text-center text-green-600 hover:text-green-700 font-semibold transition-all">
        <RouterLink :to="{ name: 'register' }">
            Sign up
        </RouterLink>
    </div>
</template>
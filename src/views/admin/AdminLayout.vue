<script setup>
    import AdminSidebar from '@/components/AdminSidebar.vue';

</script>

<template>
    <div class="md:flex min-h-screen">
    <AdminSidebar />
        <div class="flex-1 h-screen md:flex flex-col">
            <main class="flex-1 overflow-y-scroll px-4 pt-1 pb-5">
                <RouterView />
            </main>
        </div>
    </div>
</template>
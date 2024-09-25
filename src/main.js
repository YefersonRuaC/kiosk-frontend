import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useToast } from 'vue-toast-notification'
import "vue-toast-notification/dist/theme-sugar.css"
import { createVfm } from 'vue-final-modal'
import 'vue-final-modal/style.css'

const app = createApp(App)

const $toast = useToast({
    duration: 4000,
    position: 'top-right'
})

const vfm = createVfm();
app.use(createPinia());
app.use(router);
app.provide('toast', $toast);
app.use(vfm);

app.mount('#app')
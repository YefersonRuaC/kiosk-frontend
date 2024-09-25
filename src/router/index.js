import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthAPI from '@/api/AuthAPI';
import { inject } from 'vue';
import api from '@/lib/axios';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/modal',
      name: 'modal',
      component: () => import('@/views/ModalView.vue')
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/views/auth/AuthLayout.vue'),
      children: [
        {
          path: 'register',
          name: 'register',
          component: () => import('@/views/auth/RegisterView.vue')
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/auth/LoginView.vue')
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/admin/AdminLayout.vue'),
      meta: { 
        requiresAuth: true, 
        requiresAdmin: true 
      },
      children: [
        {
          path: '',
          name: 'orders',
          component: () => import('@/views/admin/OrdersView.vue')
        },
        {
          path: 'products',
          name: 'products',
          component: () => import('@/views/admin/ProductsView.vue')
        },
        {
          path: 'products/out',
          name: 'products-out',
          component: () => import('@/views/admin/OutProductsView.vue')
        }
      ]
    }
  ]
})

router.beforeEach( async(to, from, next) => {
  const requiresAuth = to.matched.some( url => url.meta.requiresAuth )
  // console.log(requiresAuth)
  const toast = inject('toast');
  
  if(requiresAuth) {
    const { data } = await AuthAPI.auth();
    // console.log(data.admin)
    const token = localStorage.getItem('local_token')

    if (!token || !data.admin) {
      localStorage.removeItem('local_token')
      delete api.defaults.headers.common['Authorization']
      toast.open({
        message: 'Not valid action',
        type: 'error'
      })
      return next({ name: 'home' })
    }
  }

  next()
});

router.beforeEach(async (to, from, next) => {
  
  const requiresAdmin = to.matched.some(url => url.meta.requiresAdmin);
  const toast = inject('toast');

  if (requiresAdmin) {
      try {
          await AuthAPI.admin();
          // console.log('user admin')
          next();
      } catch (error) {
          // console.log('ERR', error)
          toast.open({
            message: error.response.data.error,
            type: 'error'
          })
          next({ name: 'home' });
      }
  } else {
      next();
  }
});

export default router
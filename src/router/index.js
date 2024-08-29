import { createRouter, createWebHistory } from 'vue-router'
import Registration from '@/views/RegistrationForm.vue'
import Login from '@/views/LoginView.vue'

const routes = [
  {
    path: '/registration',
    name: 'Registration',
    component: Registration
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
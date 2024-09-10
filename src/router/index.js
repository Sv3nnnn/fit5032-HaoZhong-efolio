import { createRouter, createWebHistory } from 'vue-router'
import Registration from '@/views/RegistrationForm.vue'
import Login from '@/views/LoginView.vue'
import Home from '@/views/HomeView.vue'
import Rating from '@/views/Rating.vue'


const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/registration',
    name: 'Registration',
    component: Registration
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/rating',
    name: 'Rating',
    component: Rating
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
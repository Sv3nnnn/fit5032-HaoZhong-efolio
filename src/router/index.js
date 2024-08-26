import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/RegistrationForm.vue'
import AboutView from '../views/Loginview.vue'

const routes = [
  {
    path: '/registration',
    name: 'Registration',
    component: HomeView
  },
  {
    path: '/login',
    name: 'Login',
    component: AboutView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
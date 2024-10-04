import { createRouter, createWebHistory } from 'vue-router'
import Registration from '@/views/RegistrationForm.vue'
import Login from '@/views/LoginView.vue'
import Home from '@/views/HomeView.vue'
import Rating from '@/views/Rating.vue'
import AddBook from '@/views/AddBookView.vue'
import GetBookCount from '@/views/GetBookCountView.vue'
import Weather from '@/views/WeatherView.vue'
import CountBookAPI from '@/views/CountBookAPI.vue'



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
  },
  {
    path: '/addbook',
    name: 'AddBook',
    component: AddBook
  },
  {
    path: '/GetBookCount',
    name: 'GetBookCount',
    component: GetBookCount
  },
  {
    path: '/WeatherCheck',
    name: 'WeatherCheck',
    component: Weather
  },
  {
    path: '/CountBookAPI',
    name: 'CountBookAPI',
    component: CountBookAPI
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">Login</h1>
        <p class="text-center">
          Please enter your credentials to log in.
        </p>
        <form @submit.prevent="handleLogin">
          <div class="row mb-3">
            <div class="col-md-6">
              <label for="username" class="form-label">Username</label>
              <input type="text" class="form-control" id="username" v-model="username" @blur="validateUsername"
                @input="updateLastActivity" required />
              <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
            </div>
            <div class="col-md-6">
              <label for="password" class="form-label">Password</label>
              <input type="password" class="form-control" id="password" v-model="password" @blur="validatePassword"
                @input="updateLastActivity" required />
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input type="checkbox" class="form-check-input" id="rememberMe" v-model="rememberMe" @change="updateLastActivity" />
              <label class="form-check-label" for="rememberMe">Remember me</label>
            </div>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2" :disabled="!isFormValid">Login</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const username = ref('')
const password = ref('')
const rememberMe = ref(false)
const errors = ref({ username: '', password: '' })
const isLoggedIn = ref(false)
const lastActivity = ref(Date.now())

const LOGOUT_TIMEOUT = 30 * 60 * 1000 
let logoutTimer

const validateUsername = () => {
  if (username.value.length < 3) {
    errors.value.username = 'Username must be at least 3 characters long'
  } else if (username.value.length > 20) {
    errors.value.username = 'Username must not exceed 20 characters'
  } else {
    errors.value.username = ''
  }
}

const validatePassword = () => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
  if (!passwordRegex.test(password.value)) {
    errors.value.password = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number'
  } else {
    errors.value.password = ''
  }
}

const isFormValid = computed(() => {
  return username.value.length > 0 &&
    password.value.length > 0 &&
    errors.value.username === '' &&
    errors.value.password === ''
})

const handleLogin = () => {
  validateUsername()
  validatePassword()

  if (isFormValid.value) {
    console.log('Login attempted', {
      username: username.value,
      password: password.value,
      rememberMe: rememberMe.value
    })

    isLoggedIn.value = true
    updateLastActivity()

    // Save to localStorage if "Remember me" is checked
    if (rememberMe.value) {
      localStorage.setItem('rememberedUsername', username.value)
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('lastActivity', lastActivity.value.toString())
    }
    
    startLogoutTimer()
  } else {
    console.log('Form is not valid. Please correct the errors.')
  }
}

const clearForm = () => {
  username.value = ''
  password.value = ''
  rememberMe.value = false
  errors.value = { username: '', password: '' }
  localStorage.removeItem('rememberedUsername')
  localStorage.removeItem('isLoggedIn')
  localStorage.removeItem('lastActivity')
  isLoggedIn.value = false
  clearTimeout(logoutTimer)
}

const loadRememberedUser = () => {
  const rememberedUsername = localStorage.getItem('rememberedUsername')
  const storedIsLoggedIn = localStorage.getItem('isLoggedIn')
  const storedLastActivity = localStorage.getItem('lastActivity')

  if (rememberedUsername && storedIsLoggedIn === 'true' && storedLastActivity) {
    const timeSinceLastActivity = Date.now() - parseInt(storedLastActivity)
    if (timeSinceLastActivity < LOGOUT_TIMEOUT) {
      username.value = rememberedUsername
      rememberMe.value = true
      isLoggedIn.value = true
      lastActivity.value = parseInt(storedLastActivity)
      startLogoutTimer()
    } else {
      clearForm() 
    }
  }
}

const updateLastActivity = () => {
  lastActivity.value = Date.now()
  if (rememberMe.value) {
    localStorage.setItem('lastActivity', lastActivity.value.toString())
  }
}

const startLogoutTimer = () => {
  clearTimeout(logoutTimer)
  logoutTimer = setTimeout(autoLogout, LOGOUT_TIMEOUT)
}

const autoLogout = () => {
  if (isLoggedIn.value) {
    console.log('Auto logout due to inactivity')
    clearForm()
  }
}

onMounted(() => {
  loadRememberedUser()
  window.addEventListener('mousemove', updateLastActivity)
  window.addEventListener('keypress', updateLastActivity)
})

onUnmounted(() => {
  clearTimeout(logoutTimer)
  window.removeEventListener('mousemove', updateLastActivity)
  window.removeEventListener('keypress', updateLastActivity)
})
</script>
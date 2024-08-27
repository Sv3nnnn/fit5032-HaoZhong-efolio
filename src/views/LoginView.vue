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
                required />
              <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
            </div>
            <div class="col-md-6">
              <label for="password" class="form-label">Password</label>
              <input type="password" class="form-control" id="password" v-model="password" @blur="validatePassword"
                required />
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input type="checkbox" class="form-check-input" id="rememberMe" v-model="rememberMe" />
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
import { ref, computed } from 'vue'

const username = ref('')
const password = ref('')
const rememberMe = ref(false)
const errors = ref({ username: '', password: '' })

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
    // Add your login logic here
  } else {
    console.log('Form is not valid. Please correct the errors.')
  }
}

const clearForm = () => {
  username.value = ''
  password.value = ''
  rememberMe.value = false
  errors.value = { username: '', password: '' }
}
</script>

<style scoped>
/* You can add any additional custom styles here */
</style>
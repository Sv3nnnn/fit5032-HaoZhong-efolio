<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h1 class="text-center mb-4">Login</h1>
        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" v-model="email" required />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" v-model="password" required />
          </div>
          <div v-if="error" class="alert alert-danger" role="alert">
            {{ error }}
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary" :disabled="!isFormValid">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { auth } from '../firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router' 

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')

const isFormValid = computed(() => {
  return email.value.trim() !== '' && password.value.trim() !== ''
})

const handleLogin = async () => {
  if (!isFormValid.value) return

  try {
    error.value = ''
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
    console.log('Login successful', userCredential.user)
    router.push('/home')

  } catch (err) {
    console.error('Login failed', err.message)
    error.value = 'Invalid email or password'
  }
}
</script>
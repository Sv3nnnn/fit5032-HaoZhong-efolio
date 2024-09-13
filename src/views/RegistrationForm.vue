<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h1 class="text-center">Registration Form</h1>
        <div v-if="error" class="alert alert-danger" role="alert">
          {{ error }}
        </div>
        <form @submit.prevent="submitForm">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" v-model="formData.email" required />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" v-model="formData.password" 
                   @blur="validatePassword(true)" @input="validatePassword(false)" required />
            <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
          </div>
          <div class="mb-3">
            <label for="gender" class="form-label">Gender</label>
            <select class="form-select" id="gender" v-model="formData.gender" required>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="reason" class="form-label">Reason for joining</label>
            <textarea class="form-control" id="reason" rows="3" v-model="formData.reason" required></textarea>
          </div>
          <div class="mb-3">
            <label for="suburb" class="form-label">Suburb</label>
            <input type="text" class="form-control" id="suburb" v-model="formData.suburb" required />
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary" :disabled="!isFormValid">Register</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { auth, db } from '../firebase/config'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

const router = useRouter()
const formData = ref({
  email: '',
  password: '',
  gender: '',
  reason: '',
  suburb: ''
})

const error = ref(null)
const errors = ref({
  password: null
})

const adminEmails = ['admin@gmail.com']

const validatePassword = (blur) => {
  const password = formData.value.password
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`
  } else if (!hasUppercase) {
    if (blur) errors.value.password = 'Password must contain at least one uppercase letter.'
  } else if (!hasLowercase) {
    if (blur) errors.value.password = 'Password must contain at least one lowercase letter.'
  } else if (!hasNumber) {
    if (blur) errors.value.password = 'Password must contain at least one number.'
  } else if (!hasSpecialChar) {
    if (blur) errors.value.password = 'Password must contain at least one special character.'
  } else {
    errors.value.password = null
  }
}

const isFormValid = computed(() => {
  return formData.value.email &&
         formData.value.password &&
         formData.value.gender &&
         formData.value.reason &&
         formData.value.suburb &&
         !errors.value.password
})

function hashPassword(password) {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString(16); // Convert to hexadecimal string
}

const submitForm = async () => {
  if (!isFormValid.value) {
    error.value = "Please fill all fields correctly."
    return
  }

  try {
    error.value = null
    // Create user with email and password using Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, formData.value.email, formData.value.password)
    const user = userCredential.user
    const hashedPassword = hashPassword(formData.value.password);

    const role = adminEmails.includes(formData.value.email) ? 'admin' : 'customer'
    
    // Store user data in Firestore database
    await setDoc(doc(db, "users", user.uid), {
      password: hashedPassword, // store hashed password in Firestore
      email: formData.value.email,
      gender: formData.value.gender,
      reason: formData.value.reason,
      suburb: formData.value.suburb,
      role: role

    })
    console.log('User registered successfully')
    // Redirect to home page
    router.push('/home')
    
  } catch (err) {
    console.error('Registration failed', err.message)
    error.value = err.message
  }

}
</script>



<style scoped>
.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  /* background-color: #e0bfbf; */
  border-radius: 10px;
}

/* Class selectors */
.form {
  text-align: center;
  margin-top: 50px;
}

/* ID selectors */
#username:focus,
#password:focus,
#isAustralian:focus,
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card-header {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}
.list-group-item {
  padding: 10px;
}
</style>
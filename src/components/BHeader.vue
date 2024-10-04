<template>
  <div class="container">
    <header class="d-flex justify-content-between align-items-center py-3">
      <!-- Links between pages -->
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/home" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/rating" class="nav-link">Rating</router-link>
        </li>
        <li v-if="isAdmin" class="nav-item">
          <router-link to="/admin" class="nav-link">Admin Panel</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/addbook" class="nav-link" active-class="active">Add Book</router-link>
        </li>
          <li class="nav-item">
            <router-link to="/GetBookCount" class="nav-link" active-class="active">GetBookCount</router-link>
        </li>
      </ul>

      <!-- User actions -->
      <div v-if="user">
        <span class="me-2">Welcome, {{ user.email }}</span>
        <button @click="logout" class="btn btn-outline-danger">Logout</button>
      </div>
      <div v-else>
        <router-link to="/login" class="btn btn-outline-primary">Login</router-link>
        <router-link to="/Registration" class="btn btn-primary ms-2">Sign Up</router-link>
      </div>
    </header>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { auth, db } from '../firebase/config'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { useRouter } from 'vue-router'

const user = ref(null)
const isAdmin = ref(false)
const router = useRouter()

const checkUserRole = async (user) => {
  if (!user) {
    isAdmin.value = false
    return
  }

  try {
    const userDoc = await getDoc(doc(db, 'users', user.uid))
    if (userDoc.exists()) {
      const userData = userDoc.data()
      isAdmin.value = userData.role === 'admin'
    } else {
      isAdmin.value = false
    }
  } catch (error) {
    console.error('Error checking user role:', error)
    isAdmin.value = false
  }
}

const logout = async () => {
  try {
    await signOut(auth)
    console.log('User has logged out') 
    router.push('/home')
  } catch (error) {
    console.error('Error signing out:', error)
  }
}

onMounted(() => {
  onAuthStateChanged(auth, async (authUser) => {
    user.value = authUser
    if (authUser) {
      console.log('Current user:', authUser.email)
      await checkUserRole(authUser)
    } else {
      console.log('No user is logged in') 
      isAdmin.value = false
    }
  })
})
</script>

<style scoped>
.header-container {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 1rem;
  margin-bottom: 2rem;
}

.nav-link {
  color: #6c757d !important;
}

.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow:
    inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
    inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.form-control-dark {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: var(--bs-gray);
}
.form-control-dark:focus {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: #fff;
  box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.25);
}

.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

.text-small {
  font-size: 85%;
}

.dropdown-toggle {
  outline: 0;
}
</style>
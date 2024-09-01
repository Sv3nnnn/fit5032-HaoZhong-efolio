<script setup>
// import JSONLab from './components/JSONLab.vue'
import BHeader from './components/BHeader.vue'
// import RegistrationForm from './views/RegistrationForm.vue'
import FooterComponent from './components/Footer.vue'
</script>

<template>
  <div class="main-container">
    <header>
      <BHeader />
    </header>

    <main class="main-box">
      <!-- <JSONLab /> -->
      <router-view></router-view>
    </main>
    <footer>
      <FooterComponent />
    </footer>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-box {
  flex: 1;
}

footer {
  width: 100%;
}
</style>
<template>
    <footer class="d-flex justify-content-between align-items-center py-3">
      <p class="text-muted">&copy; 2024 Your Website Name</p>
      <ul class="nav">
        <li class="nav-item">
          <router-link to="/privacy-policy" class="nav-link text-muted">Privacy Policy</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/terms-of-service" class="nav-link text-muted">Terms of Service</router-link>
        </li>
      </ul>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'FooterComponent',
  };
  </script>
  

  <style scoped>
  footer {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    padding-top: 1rem;
    margin-top: 2rem;
    background-color: #f8f9fa;
    width: 100%;
  }
    
  .nav-link {
    color: #6c757d !important;
  }
  </style>
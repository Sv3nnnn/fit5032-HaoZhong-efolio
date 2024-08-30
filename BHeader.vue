<template>
  <div class="container">
    <header class="d-flex justify-content-between align-items-center py-3">
      
      <!-- <div class="d-flex align-items-center">
        <img src="" alt="Web icon" width="40" height="40" />
      </div> -->

      <!-- Links between pages -->
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/Language Support" class="nav-link">Language Support</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/Employment Support" class="nav-link">Employment Support</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/Cultural Education" class="nav-link">Cultural Education</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/Health Service" class="nav-link">Health Service</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/Global Map" class="nav-link">Global Map</router-link>
        </li>
      </ul>

      <!--Login/Register button -->
      <div>
        <router-link to="/login" class="btn btn-outline-primary">Login</router-link>
        <router-link to="/Registration" class="btn btn-primary ms-2">Sign Up</router-link>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'HeaderComponent',
};
</script>


<style scoped>
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
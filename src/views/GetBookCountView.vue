<template>
    <div id="app" class="container">
      <h1>Book Counter</h1>
      <button @click="getBookCount">Get Book Count</button>
      <p v-if="count !== null">Total number of books: {{ count }}</p>
      <p v-if="error">{{ error }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        count: null,
        error: null,
      };
    },
    methods: {
      async getBookCount() {
        try {
          const response = await axios.get('https://countbooks-np2aswaz7a-uc.a.run.app/countBooks');
          this.count = response.data.count;
          this.error = null;
        } catch (error) {
          console.error('Error fetching book count:', error);
          this.error = error;
          this.count = null;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start; 
    align-items: center;
    height: 100vh;
    padding-top: 100px; 
    text-align: center;
  }
  
  button {
    margin-top: 20px;
    padding: 10px 20px;
  }
  
  p {
    margin-top: 15px;
  }
  </style>
  
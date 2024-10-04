<template>
    <div class="container">
      <h1 class="header">All Books Data</h1>
      <pre class="data">{{ jsondata }}</pre>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        jsondata: null,
        error: null,
      };
    },
    mounted() {
      this.getAllBooksAPI();
    },
    methods: {
      async getAllBooksAPI() {
        try {
          const response = await axios.get('https://getallbooks-np2aswaz7a-uc.a.run.app'); 
          this.jsondata = response.data;
          this.error = null;
        } catch (error) {
          console.error('Error fetching all books:', error);
          this.error = error;
          this.jsondata = null;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start; /* Align items towards the top */
    min-height: 100vh;
    text-align: center;
    margin-top: 40px; /* Moves the content slightly upwards */
  }
  
  .header {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }
  
  .data {
    font-size: 1.5rem;
    white-space: pre-wrap; /* Ensures long JSON data wraps correctly */
    text-align: left; /* Align JSON data to the left for readability */
    max-width: 80%;
  }
  </style>
  
<script>
import { ref } from 'vue';

export default {
  setup() {
    const books = ref([
      { id: 1, name: 'Book One', isbn: 1234 },
      { id: 2, name: 'Book Two', isbn: 5678 },
      { id: 3, name: 'Book Three', isbn: 91011 }
    ]);

    return {
      books
    };
  }
};
</script>

<template>
  <div>
    <h1>Books with ISBN > 1000</h1>
    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.name }} - ISBN: {{ book.isbn }}
      </li>
    </ul>
  </div>
</template>

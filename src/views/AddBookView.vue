<template>
    <div>
      <h1>Add Book</h1>
      <form @submit.prevent="addBook">
        <div>
          <label for="isbn">ISBN:</label>
          <input type="text" v-model="isbn" id="isbn" required />
        </div>
        <div>
          <label for="name">Name:</label>
          <input type="text" v-model="name" id="name" required />
        </div>
        <button type="submit">Add Book</button>
      </form>
  
      <h1>Update or Delete Book</h1>
      <form @submit.prevent="updateBook">
        <div>
          <label for="updateIsbn">Update ISBN:</label>
          <input type="text" v-model="updateIsbn" id="updateIsbn" required />
        </div>
        <div>
          <label for="updateName">Update Name:</label>
          <input type="text" v-model="updateName" id="updateName" required />
        </div>
        <button type="submit">Update Book</button>
      </form>
      <button @click="deleteBook">Delete Book</button>
  
      <h1>Book List</h1>
      <ul>
        <li v-for="book in books" :key="book.id">
          {{ book.name }} - ISBN: {{ book.isbn }}
        </li>
      </ul>
    </div>
  </template>
<script>
import { ref, onMounted} from 'vue';
import { db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { query, where, getDocs, updateDoc, deleteDoc, orderBy, limit } from 'firebase/firestore';


// import BookList from '../components/BookList.vue';


export default {
  setup() {
    const isbn = ref('');
    const name = ref('');
    const updateIsbn = ref('');
    const updateName = ref('');
    const books = ref([]);

    const addBook = async () => {
      try {
        const isbnNumber = Number(isbn.value);
        if (isNaN(isbnNumber)) {
          alert('ISBN must be a valid number');
          return;
        }

        await addDoc(collection(db, 'books'), {
          isbn: isbnNumber,
          name: name.value
        });

        isbn.value = '';
        name.value = '';
        alert('Book added successfully!');
      } catch (error) {
        console.error('Error adding book: ', error);
      }
    };

 
    const updateBook = async () => {
      try {
        const bookQuery = query(collection(db, 'books'), where('isbn', '==', Number(updateIsbn.value)));
        const querySnapshot = await getDocs(bookQuery);

        if (!querySnapshot.empty) {
          const bookRef = querySnapshot.docs[0].ref; 
          await updateDoc(bookRef, { name: updateName.value });
          alert('Book updated successfully!');
        } else {
          alert('No book found with this ISBN');
        }

        updateIsbn.value = '';
        updateName.value = '';
      } catch (error) {
        console.error('Error updating book: ', error);
      }
    };

    const deleteBook = async () => {
      try {
        const bookQuery = query(collection(db, 'books'), where('isbn', '==', Number(updateIsbn.value)));
        const querySnapshot = await getDocs(bookQuery);

        if (!querySnapshot.empty) {
          const bookRef = querySnapshot.docs[0].ref; 
          await deleteDoc(bookRef);
          alert('Book deleted successfully!');
        } else {
          alert('No book found with this ISBN');
        }

        updateIsbn.value = '';
        updateName.value = '';
      } catch (error) {
        console.error('Error deleting book: ', error);
      }
    };

    const getBooks = async () => {
      try {
        const booksQuery = query(
          collection(db, 'books'),
          where('isbn', '>', 1000),
          orderBy('isbn', 'asc'),
          limit(5)
        );
        const querySnapshot = await getDocs(booksQuery);
        books.value = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
      } catch (error) {
        console.error('Error fetching books: ', error);
      }
    };
    onMounted(() => {
      getBooks();
    });

    return {
      isbn,
      name,
      addBook,
      updateIsbn,
      updateName,
      updateBook,
      deleteBook,
      books
    };
  }
};
</script>
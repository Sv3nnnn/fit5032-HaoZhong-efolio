/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});

admin.initializeApp();

// Function to count the number of books in Firestore
exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();
      const count = snapshot.size;

      res.status(200).send({count});
    } catch (error) {
      console.error("Error counting books:", error.message);
      res.status(500).send("Error counting books");
    }
  });
});

// Function to automatically capitalize the book name when a new book is added
exports.capitalizeBookData = onDocumentCreated("books/{bookId}", (event) => {
  const newValue = event.data.data(); // Get the newly added book data

  if (newValue && newValue.name) {
    // Capitalize the book name
    const capitalizedData = {
      name: newValue.name.toUpperCase(),
      isbn: newValue.isbn,
    };

    // Update the document with the capitalized name
    return event.data.ref.set(capitalizedData, {merge: true});
  }

  return null; // If no name is found, return null
});

// Function to return all books in Firestore
exports.getAllBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();
      const books = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      res.status(200).send(books);
    } catch (error) {
      console.error("Error fetching all books:", error.message);
      res.status(500).send("Error fetching all books");
    }
  });
});

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

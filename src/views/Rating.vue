<template>
    <div class="rating-page">
        <h1>Ratings</h1>

        <!-- Rating Submission Form -->
        <div v-if="user" class="rating-form">
            <h2>Submit Your Rating</h2>
            <div v-if="message" :class="['alert', messageType === 'error' ? 'alert-danger' : 'alert-success']">
                {{ message }}
            </div>
            <form @submit.prevent="submitRating">
                <div class="form-group">
                    <label>Rating:</label>
                    <div class="star-rating">
                        <span v-for="star in 5" :key="star" @click="setRating(star)" @mouseover="hoverRating = star"
                            @mouseleave="hoverRating = 0" :class="{ 'active': star <= (hoverRating || rating) }">
                            ★
                        </span>
                    </div>
                    <div class="mt-3">Selected value: <span class="selected-value">{{ hoverRating || rating }}</span>
                    </div>
                </div>
                <div class="form-group">
                    <label for="comment">Comment (optional):</label>
                    <textarea v-model="comment" id="comment" rows="4"></textarea>
                </div>
                <button type="submit" :disabled="!rating || isSubmitting">
                    {{ isSubmitting ? 'Submitting...' : 'Submit Rating' }}
                </button>
            </form>
        </div>
        <div v-else class="alert alert-warning">
            Please log in to submit a rating.
        </div>

        <!-- Ratings Display Admin Only -->
        <div v-if="isAdmin" class="ratings-list">
            <h2>All Ratings (Admin View)</h2>
            <div v-if="isLoading">Loading ratings...</div>
            <div v-else-if="ratings.length === 0">No ratings yet.</div>
            <div v-else class="rating-item" v-for="rating in ratings" :key="rating.id">
                
                <div class="rating-details">
                    <p><strong>User Rating:</strong> {{ rating.rating  }} rating-stars</p>
                    <p><strong>User ID:</strong> {{ rating.userId }}</p>

                    <p><strong>Date:</strong> {{ formatDate(rating.date) }}</p>
                    <p><strong>Comment:</strong> {{ rating.comment || 'No comment' }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { auth, db } from '../firebase/config'
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp, doc, getDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

const user = ref(null)
const isAdmin = ref(false)
const rating = ref(0)
const hoverRating = ref(0)
const comment = ref('')
const message = ref('')
const messageType = ref('')
const isSubmitting = ref(false)
const ratings = ref([])
const isLoading = ref(true)

const setRating = (value) => {
    rating.value = value
}

const submitRating = async () => {
    if (isSubmitting.value || !user.value) return

    isSubmitting.value = true
    message.value = ''
    messageType.value = ''

    try {
        const ratingData = {
            userId: user.value.uid,
            rating: rating.value,
            comment: comment.value,
            date: serverTimestamp()
        }

        const docRef = await addDoc(collection(db, 'ratings'), ratingData)

        console.log('Rating submitted with ID:', docRef.id)
        message.value = `Thank you for your ${rating.value}-star rating!`
        messageType.value = 'success'

        // Reset form
        rating.value = 0
        comment.value = ''

        // Refresh ratings list if admin
        if (isAdmin.value) {
            await fetchRatings()
        }
    } catch (error) {
        console.error('Error submitting rating:', error)
        message.value = `Error: ${error.message}. Please try again.`
        messageType.value = 'error'
    } finally {
        isSubmitting.value = false
    }
}

const fetchRatings = async () => {
    if (!isAdmin.value) return

    try {
        isLoading.value = true
        const q = query(collection(db, 'ratings'), orderBy('date', 'desc'))
        const querySnapshot = await getDocs(q)
        ratings.value = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            date: doc.data().date?.toDate() // Convert Firestore Timestamp to JavaScript Date
        }))
    } catch (error) {
        console.error('Error fetching ratings:', error)
    } finally {
        isLoading.value = false
    }
}

const formatDate = (date) => {
    if (!(date instanceof Date)) return 'Invalid Date'
    return date.toLocaleString()
}

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

onMounted(() => {
    onAuthStateChanged(auth, async (authUser) => {
        user.value = authUser
        await checkUserRole(authUser)
        if (isAdmin.value) {
            await fetchRatings()
        }
    })
})
</script>

<style scoped>
.rating-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.rating-form {
    margin-bottom: 40px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}

.star-rating {
    font-size: 24px;
    color: #ddd;
    cursor: pointer;
}

.star-rating span {
    transition: color 0.2s;
}

.star-rating span.active {
    color: #ffd700;
}

.selected-value {
    color: #4CAF50;
    font-weight: bold;
}

textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover:not(:disabled) {
    background-color: #45a049;
}

button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}

.alert {
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 4px;
}

.alert-danger {
    background-color: #f8d7da;
    border-color: #f5c6cb;
    color: #721c24;
}

.alert-success {
    background-color: #d4edda;
    border-color: #c3e6cb;
    color: #155724;
}

.ratings-list {
    margin-top: 40px;
}

.rating-item {
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    padding: 15px;
    margin-bottom: 15px;
}

.rating-stars {
    font-size: 20px;
    color: #ffd700;
    margin-bottom: 10px;
}

.rating-details p {
    margin: 5px 0;
}
</style>
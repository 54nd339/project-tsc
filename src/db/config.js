import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFunctions } from 'firebase/functions'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// API_KEY: "AIzaSyB8wHdsem-DGmoiTNz_9Tr3hMhD_U5_FfU",
// AUTH_DOMAIN: "tsc-web-361112.firebaseapp.com",
// DB_URL: "https://tsc-web-361112-default-rtdb.asia-southeast1.firebasedatabase.app/",
// PROJECT_ID: "tsc-web-361112",
// STORAGE_BUCKET: "tsc-web-361112.appspot.com",
// MESSAGING_SENDER_ID: "263466741558",          
// APP_ID: "1:263466741558:web:35a32980924b5b5fd04d97"
const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_DB_URL,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,    
    appId: import.meta.env.VITE_APP_ID,
}
console.log(firebaseConfig)

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Utils
const db = getFirestore(app)
const auth = getAuth(app)
const functions = getFunctions(app)
const storage = getStorage(app)

// export utils/refs
export {
    db, auth, functions, storage
}
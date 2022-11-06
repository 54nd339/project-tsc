import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFunctions } from 'firebase/functions'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB8wHdsem-DGmoiTNz_9Tr3hMhD_U5_FfU",
    authDomain: "tsc-web-361112.firebaseapp.com",
    databaseURL: "https://tsc-web-361112-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "tsc-web-361112",
    storageBucket: "tsc-web-361112.appspot.com",
    messagingSenderId: "263466741558",          
    appId: "1:263466741558:web:35a32980924b5b5fd04d97"
}

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
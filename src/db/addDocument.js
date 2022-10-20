import { ref } from 'vue'
import { db } from '@/db/config'
import { doc, setDoc } from 'firebase/firestore'

const addCollection = async (collectionId) => {
    const error = ref(null)
    const isPending = ref(false)
    
    const addDoc = async (docId, data) => {
        isPending.value = true

        const docRef = doc(db, collectionId, docId)
        return await setDoc(docRef, data).then(() => {
            console.log('Document written with ID: ', docRef.uid)
            isPending.value = false
        }).catch((err) => {
            console.log(err.message)
            error.value = 'Could not add document'
            isPending.value = false
        })
    }
    return { error, addDoc, isPending }
}

export default addCollection
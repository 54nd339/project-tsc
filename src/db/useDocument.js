import { ref } from 'vue'
import { db } from '@/db/config'
import { doc, deleteDoc, updateDoc } from 'firebase/firestore'

const useDocument = async (collectionId, docId) => {
    let error = ref(null)
    let isPending = ref(false)
    let docRef = doc(db, collectionId, docId)

    const delDoc = async () => {
        isPending.value = true

        return await deleteDoc(docRef).then(() => {
            isPending.value = false
        }).catch((err) => {
            console.log(err.message)
            error.value = 'Could not delete document'
            isPending.value = false
        })
    }
    const updateDoc = async (updates) => {
        isPending.value = true
        
        return await updateDoc(docRef, updates).then(() => {
            isPending.value = false
        }
        ).catch((err) => {
            console.log(err.message)
            error.value = 'Could not update document'
            isPending.value = false
        })
    }
    return { error, delDoc, updateDoc, isPending }
}

export default useDocument
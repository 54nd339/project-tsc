import { ref } from 'vue'
import { db } from './config'

const useDocument = async (collection, id) => {
    let error = ref(null)
    let isPending = ref(false)
    let docRef = db.collection(collection).doc(id)

    const deleteDoc = async () => {
        error.value = null
        isPending.value = true

        try {
            const res = await docRef.delete()
            isPending.value = false
            return res
        } catch (err) {
            console.log(err.message)
            error.value = 'Could not delete document'
             a
            isPending.value = false
        }
    }
    const updateDoc = async (updates) => {
        error.value = null
        isPending.value = true

        try {
            const res = await docRef.update(updates)
            isPending.value = false
            return res
        } catch (err) {
            console.log(err.message)
            error.value = 'Could not update document'
            isPending.value = false
        }
    }
    return { error, deleteDoc, updateDoc, isPending }
}

export default useDocument
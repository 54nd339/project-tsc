import { ref } from 'vue'
import { db } from './config'

const addCollection = async (collection) => {
    const error = ref(null)
    const isPending = ref(false)
    
    const addDoc = async (doc) => {
        error.value = null
        isPending.value = true

        try {
            const res = await db.collection(collection).add(doc)
            isPending.value = false
            return res
        } catch (err) {
            console.log(err.message)
            error.value = 'Could not add document'
            isPending.value = false
        }
    }
    return { error, addDoc, isPending }
}

export default addCollection
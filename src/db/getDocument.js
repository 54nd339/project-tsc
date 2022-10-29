import { ref, watchEffect } from 'vue'
import { db } from '@/db/config'
import { doc, getDoc } from 'firebase/firestore'

const getDocument = (collectionId, docId) => {
    const error = ref(null)
    const docRef = doc(db, collectionId, docId)

    const getDetail = async () => {
        return await getDoc(docRef).then((doc) => {
            if (doc.exists()) {
                return { ...doc.data(), id: doc.id }
            } else {
                error.value = 'Document does not exist'
            }
        }).catch((err) => {
            console.log(err.message)
            error.value = 'Could not fetch data'
        })
    }

    return { getDetail, error }
}

export default getDocument
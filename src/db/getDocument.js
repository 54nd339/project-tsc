import { ref, watchEffect } from 'vue'
import { db } from '@/db/config'
import { doc, onSnapshot } from 'firebase/firestore'

const getDocument = (collectionId, docId) => {
    const error = ref(null)
    const document = ref(null)
    const docRef = doc(db, collectionId, docId)

    const unsubscribe = onSnapshot(docRef, doc => {
        if (doc.data()) {
            document.value = { ...doc.data(), id: doc.id }
            error.value = null
        } else {
            error.value = 'That document does not exist'
        }
    }, err => {
        console.log(err.message)
        error.value = 'Could not fetch the document'
    })

    watchEffect((onInvalidate) => {
        onInvalidate(() => unsubscribe())
    })

    return { error, document, docRef }
}

export default getDocument
import { ref, watchEffect } from 'vue'
import { db } from '@/db/config'
import { doc, onSnapshot } from 'firebase/firestore'

const getDocument = (collectionId, docId) => {
    const error = ref(null)
    const document = ref(null)
    let docRef = doc(db, collectionId, docId)

    let unsubscribe = onSnapshot(docRef, doc => {
        if (doc.data()) {
            document.value = { ...doc.data(), id: doc.uid }
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

    return { error, document }
}

export default getDocument
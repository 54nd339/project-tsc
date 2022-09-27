import { watchEffect, ref } from 'vue'
import { db } from './config'

const getDocument = (collection, id) => {
    let error = ref(null)
    let document = ref(null)
    let documentRef = db.collection(collection).doc(id)

    let unsubscribe = documentRef.onSnapshot(doc => {
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

    return { error, document }
}

export default getDocument
import { ref, watchEffect } from 'vue'
import { db } from './config'

const getCollection = (collection, query) => {
    let error = ref(null)
    let documents = ref(null)

    let collectionRef = db.collection(collection).orderBy('createdAt')

    if (query) {
        collectionRef = collectionRef.where(...query)
    }

    let unsubscribe = collectionRef.onSnapshot(snap => {
        let results = []
        snap.docs.forEach(doc => {
            results.push({ ...doc.data(), id: doc.id })
        })
        documents.value = results
        error.value = null
    }, err => {
        console.log(err.message)
        error.value = 'Could not fetch data'
    })

    watchEffect((onInvalidate) => {
        onInvalidate(() => unsubscribe())
    })

    return { error, documents }
}

export default getCollection
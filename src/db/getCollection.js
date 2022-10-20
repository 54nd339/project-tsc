import { ref, watchEffect } from 'vue'
import { db } from '@/db/config'
import { collection, query, where, getDocs } from 'firebase/firestore'

const getCollection = (collectionId, queries) => {
    const error = ref(null)
    const documents = ref([])
    let collectionRef = collection(db, collectionId)

    if (queries) {
        collectionRef = query(collectionRef, where(...queries))
    }

    let unsub = async () => {
        return await getDocs(collectionRef).then((querySnapshot) => {
            let results = []
            querySnapshot.forEach((doc) => {
                results.push({ ...doc.data(), id: doc.uid })
            })
            documents.value = results
            return results
        }).catch((err) => {
            console.log(err.message)
            error.value = 'Could not fetch data'
        })
    }

    watchEffect((onInvalidate) => {
        onInvalidate(() => unsub())
    })

    return { error, documents }
}

export default getCollection
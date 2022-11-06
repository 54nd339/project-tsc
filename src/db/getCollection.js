import { ref, watchEffect } from 'vue'
import { db } from '@/db/config'
import { collection, query, where, getDocs } from 'firebase/firestore'

const getCollection = (collectionId, queries1, queries2) => {
    const error = ref(null)
    let collectionRef = collection(db, collectionId)

    if (queries1) {
        if(queries2)
            collectionRef = query(collectionRef, where(...queries1), where(...queries2))
        else
            collectionRef = query(collectionRef, where(...queries1))
    }

    const getDocuments = async () => {
        return await getDocs(collectionRef).then((querySnapshot) => {
            let results = []
            querySnapshot.forEach((doc) => {
                results.push({ ...doc.data(), id: doc.id })
            })
            return results
        }).catch((err) => {
            console.log(err.message)
            error.value = 'Could not fetch data'
        })
    }

    return { getDocuments, error }
}

export default getCollection
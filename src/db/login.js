import { ref } from 'vue'
import { auth } from '@/db/config'
import { signInWithEmailAndPassword } from 'firebase/auth'

const useLogin = () => {
    const error = ref(null)
    const isPending = ref(false)

    const login = async (email, password) => {
        isPending.value = true

        return await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            isPending.value = false
            return userCredential.user
        }).catch((err) => {
            console.log(err.message)
            error.value = 'Incorrect login credentials'
            isPending.value = false
        }) 
    }
    return { error, login, isPending }
}

export default useLogin
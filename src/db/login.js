import { ref } from 'vue'
import { auth } from './config'

const error = ref(null)
const isPending = ref(false)

const login = async (email, password) => {
    error.value = null
    isPending.value = true

    try {
        const res = await auth.signInWithEmailAndPassword(email, password)
        error.value = null
        isPending.value = false
        return res
    } catch (err) {
        console.log(err.message)
        error.value = 'Incorrect login credentials'
        isPending.value = false
    }
}

const useLogin = () => {
    return { error, login, isPending }
}

export default useLogin
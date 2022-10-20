import { ref } from 'vue'
import { auth } from '@/db/config'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

const useSignup = () => {
    const error = ref(null)
    const isPending = ref(false)

    const signup = async (email, password, displayName) => {
        isPending.value = true

        return await createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            await updateProfile(userCredential.user, { displayName })
            isPending.value = false
            return userCredential.user
        }).catch((err) => {
            console.log(err.message)
            error.value = 'Could not create account'
            isPending.value = false
        })
    }
    return { error, signup, isPending }
}
export default useSignup
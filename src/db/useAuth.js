import { ref } from 'vue'
import { auth } from '@/db/config'
import { createUserWithEmailAndPassword, updateProfile,
        signInWithEmailAndPassword, signOut,
        onAuthStateChanged } from 'firebase/auth'

const useAuth = () => {
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
    const getUser = () => {
        const user = ref(auth.currentUser)
    
        onAuthStateChanged(auth, _user => {
            console.log('User state change. Current user is: ', _user)
            user.value = _user
        })
    
        return user
    }
    const logout = async () => {
        isPending.value = true

        return await signOut(auth).then(() => {
            isPending.value = false
        }).catch((err) => {
            console.log(err.message)
            error.value = err.message
            isPending.value = false
        })
    }
    return { error, signup, login, getUser, logout, isPending }
}
export default useAuth
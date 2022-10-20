import { ref } from 'vue'
import { auth } from '@/db/config'
import { signOut } from 'firebase/auth'

const useLogout = () => {
    const error = ref(null)
    const isPending = ref(false)

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
    return { error, logout, isPending }
}

export default useLogout
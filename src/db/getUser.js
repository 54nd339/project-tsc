import { ref } from 'vue'
import { auth } from '@/db/config'
import { onAuthStateChanged } from 'firebase/auth'

const getUser = () => {
    const user = ref(auth.currentUser)

    onAuthStateChanged(auth, _user => {
        console.log('User state change. Current user is: ', _user)
        user.value = _user
    })

    return { user }
}

export default getUser
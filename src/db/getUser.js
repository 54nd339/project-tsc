import { ref } from 'vue'
import { auth } from './config'

const user = ref(auth.currentUser)

auth.onAuthStateChanged(_user => {
    console.log('User state change. Current user is: ', _user)
    user.value = _user
})

const getUser = () => {
    return { user }
}

export default getUser
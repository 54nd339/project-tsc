<template>
	<!-- Modal -->
	<b-modal id="loginForm" title="Login" aria-labelledby="loginForm" aria-hidden="true" :hide-footer="true">
		<form ref="form">
			<b-form-input id="email" type="email" v-model="email" class="form-control form-control-lg d-flex mx-auto"
				placeholder="Enter Email" required trim></b-form-input>
			<b-form-input id="password" type="password" v-model="password"
				class="form-control form-control-lg d-flex mx-auto" placeholder="Enter Password" required>
			</b-form-input>
			<!-- <div id="Remember" class="d-flex mx-auto mt-2">
				<input class="form-check-input" type="checkbox" value="" id="remme">
				<label class="form-check-label" for="remme"> Remember Me</label><br>
			</div> -->
			<div>
				<b-form-radio-group v-model="selected" :options="options" class="mb-3" value-field="item"
					text-field="name"></b-form-radio-group>
				<div class="mt-3" v-if="selected">Login as <strong>{{ selected }}</strong></div>
				<div id="warn" class="mt-3 text-danger" v-if="warnmsg"><strong>{{ warnmsg }}</strong></div>
			</div>
			<b-button id="loginpg" variant="success d-flex mx-auto mt-2" size="lg" type="button" @click="handleSubmit()"
				v-model="loginpg" :disabled=isPending>{{ LoginText }}</b-button>
		</form>
	</b-modal>
</template>

<script>
import useLogin from '../db/login'
import { db } from '../db/config'
import { doc, getDoc } from 'firebase/firestore'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
	setup() {
		const { error, login, isPending } = useLogin()
		const router = useRouter()
		const email = ref('')
		const password = ref('')
		const selected = ref('')
		const warnmsg = ref('')
		const loginpg = ref(false)
		const LoginText = ref('Login')
		const options = [
				{ item: 'student', name: 'Student' },
				{ item: 'teacher', name: 'Teacher' },
				{ item: 'admin', name: 'Admin' },
			]
		const handleSubmit = async() => {
			const pathName = selected.value
			LoginText.value = 'Logging in...'
			loginpg.value = true
			console.log(pathName)
			const res = await login(email.value, password.value)
			.then(async(res) => {
				console.log('Login Success')
				LoginText.value = 'Login'
				loginpg.value = false
				document.querySelector('.btn-close').click()
				if(res) {
					const docRef = doc(db, pathName, res.uid)
					const docSnap = await getDoc(docRef)
					if (docSnap.exists()) {
						console.log('Document data:', docSnap.data())
						router.push({ path: `/${pathName}/${res.uid}` })
					} else {
						// doc.data() will be undefined in this case
						warnmsg.value = 'No such document!'
					}
				}
				else {
					warnmsg.value = error.value
				}
			})
		}
		return { email, password, handleSubmit, selected, options, warnmsg, isPending, loginpg, LoginText }
	}
}
</script>

<style>
</style>
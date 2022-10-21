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
			<b-button id="loginpg" variant="success d-flex mx-auto mt-2" size="lg" type="button" @click="handleLogin()"
				v-model="loginpg" :disabled=isLoginPending>{{ LoginText }}</b-button>
		</form>
	</b-modal>
	<b-modal id="logoutConfirm" title="Logout" aria-labelledby="logoutConfirm" aria-hidden="true" :hide-footer="true">
		<form ref="form">
			<p class="justify-content-center align-items-center" id="logoutText">Confirm Logout?</p>
			<b-button id="logoutpg" variant="success d-flex mx-auto mt-2" size="lg" type="button" @click="handleLogout()"
				v-model="logoutpg" :disabled=isLogoutPending>{{ LogoutText }}</b-button>
		</form>
	</b-modal>
</template>

<script setup>
import useLogin from '../db/login'
import useLogout from '../db/logout'
import { db } from '../db/config'
import { doc, getDoc } from 'firebase/firestore'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { loginErr, login, isLoginPending } = useLogin()
const { logoutErr, logout, isLogoutPending } = useLogout()

const email = ref('')
const password = ref('')
const selected = ref('')
const warnmsg = ref('')
const options = [
		{ item: 'student', name: 'Student' },
		{ item: 'teacher', name: 'Teacher' },
		{ item: 'admin', name: 'Admin' },
	]
const loginpg = ref(false)
const LoginText = ref('Login')
const handleLogin = async() => {
	const pathName = selected.value
	LoginText.value = 'Logging in...'
	loginpg.value = true

	await login(email.value, password.value).then(async(res) => {
		LoginText.value = 'Login'
		loginpg.value = false
		if(res) {
			// console.log('Login Success')
			const docRef = doc(db, pathName, res.uid)
			// console.log(db, pathName, res.uid)
			await getDoc(docRef).then((doc) => {
				if(doc.exists()) {
					document.querySelector('.btn-close').click()
					// console.log('Document data:', doc.data())
					router.push({ path: `/${pathName}/${res.uid}` })
				} else {
					// console.log('No such user as ', pathName, '!')
					warnmsg.value = 'No such user as ' + pathName + '!'
				}
			})
		}
		else {
			warnmsg.value = loginErr
		}
	})
}

const logoutpg = ref(false)
const LogoutText = ref('Logout')
const handleLogout = async() => {
	LogoutText.value = 'Logging out...'
	logoutpg.value = true

	await logout().then(async() => {
		LogoutText.value = 'Logout'
		logoutpg.value = false
		document.querySelectorAll('.btn-close')[1].click()
		router.push({ path: `/` })
	}).catch((err) => {
		console.log(err)
		warnmsg.value = logoutErr
	})
}
</script>

<style>
</style>
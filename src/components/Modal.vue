<template>
	<!-- Modal -->
	<b-modal id="loginForm" title="Login" aria-labelledby="loginForm" aria-hidden="true" :hide-footer="true">
		<form ref="form" @submit.prevent="handleSubmit">
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
			<b-button id="loginpg" variant="success d-flex mx-auto mt-2" size="lg" type="button"
				data-bs-dismiss="modal" v-if="!isPending">Login</b-button>
			<b-button id="loginpg" variant="success d-flex mx-auto mt-2" size="lg" type="button"
				v-else disabled>Logging in...</b-button>
		</form>
	</b-modal>
</template>

<script>
import useLogin from '../db/login'
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
		const handleSubmit = async() => {
			const pathName = this.selected
			const res = await login(email.value, password.value)
			if (res) {
				router.push({ path: `/${pathName}` })
			}
			this.warnmsg = error.value
		}
		const options = [
				{ item: 'student', name: 'Student' },
				{ item: 'teacher', name: 'Teacher' },
				{ item: 'admin', name: 'Admin' },
			]
		return { email, password, handleSubmit, selected, options, warnmsg, isPending }
	}
}
</script>

<style>
</style>
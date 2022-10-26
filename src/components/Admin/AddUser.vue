<template>
	<b-modal id="addUser" :title="titleName" aria-labelledby="addUser" aria-hidden="true" :hide-footer="true">
		<b-form @submit="onSubmit" @reset="onReset">
			<b-form-input id="addEmail" v-model="email" type="email" placeholder="Enter email" required></b-form-input>
			<b-form-input id="addPassword" v-model="password" type="password" placeholder="Enter password" required></b-form-input>
			<b-form-input id="addName" v-model="name" type="text" placeholder="Enter name" required></b-form-input>
			<b-form-input id="addPhone" v-model="phone" type="text" placeholder="Enter phone" required></b-form-input>
			<b-button type="submit" variant="primary">Submit</b-button>
			<b-button type="reset" variant="danger">Reset</b-button>
		</b-form>
	</b-modal>
</template>

<script setup>
import useSignup from '@/db/addUser'
import addCollection from '@/db/addDocument';
import useDocument from '@/db/useDocument';
import { ref } from 'vue'

const props = defineProps({
	title: String,
	cls: Number
})
const emit = defineEmits(['submitClick'])
const titleName = 'Add ' + props.title
const collectionId = props.title.toLowerCase()

const email = ref('')
const password = ref('')
const name = ref('')
const phone = ref('')

const { errSignIn, signup, isSignInPending } = useSignup()
const onSubmit = async() => {
	await signup(email.value, password.value, name.value).then(async(res) => {
		if(res) {
			(await addCollection(collectionId)).addDoc(res.uid, {
				name: name.value,
				phone: phone.value,
				email: email.value,
			}).then(async() => {
				// console.log('Added User is',collectionId)
				if(collectionId == 'student') {
					(await useDocument('student', res.uid)).updateDocs({
						class: props.cls,
						subjects: {}
					}).then(() => {
						emit('submitClick')
					}).catch((err) => {
						console.log(err)
					})
				}
				if(collectionId == 'teacher') {
					(await useDocument('teacher', res.uid)).updateDocs({
						rating: 0,
						subjects: {}
					}).then(() => {
						emit('submitClick')
					}).catch((err) => {
						console.log(err)
					})
				}
			}).catch((err) => {
				console.log(err)
			})
		}
		else {
			console.log('error')
		}
	})
}
const onReset = () => {
	email.value = ''
	password.value = ''
	name.value = ''
	phone.value = ''
}
</script>

<style>

</style>
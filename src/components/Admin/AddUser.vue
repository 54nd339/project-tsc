<template>
	<b-modal :id="modalId" :title="titleName" aria-labelledby="addUser" aria-hidden="true" :hide-footer="true">
		<b-form @submit="onSubmit">
			<b-form-input v-model="email" type="email" class="d-flex mx-auto my-1"
				size="lg" placeholder="Enter email" required></b-form-input>
			<b-form-input v-model="password" type="password" class="d-flex mx-auto my-1"
				size="lg" placeholder="Enter password" required></b-form-input>
			<b-form-input v-model="name" type="text" class="d-flex mx-auto my-1"
				size="lg" placeholder="Enter name" required></b-form-input>
			<b-form-input v-model="phone" type="text" class="d-flex mx-auto my-1"
				size="lg" placeholder="Enter phone" required></b-form-input>
			<div class="d-flex mb-1 justify-content-end">
				<b-button-group>
					<b-button type="reset" variant="danger" size="lg">Reset </b-button>
					<b-button type="submit" variant="primary" size="lg">Submit</b-button>
				</b-button-group>
			</div>
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
	cls: {
		type: Number,
		default: 0
	}
})
const emit = defineEmits(['submitClick'])
const titleName = 'Add ' + props.title
const modalId = 'add' + props.title
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
						attendance: 0,
						subjects: {
							eng1: [],
							eng2: [],
							odia: [],
							hind: [],
							math: [],
							comp: [],
							sci: [],
							phys: [],
							chem: [],
							bio: [],
							sst: [],
							hist: [],
							geo: []
						}
					}).then(() => {
						emit('submitClick')
					}).catch((err) => {
						console.log(err)
					})
				}
				if(collectionId == 'teacher') {
					(await useDocument('teacher', res.uid)).updateDocs({
						rating: 0,
						attendance: 0,
						classes: {
							10: [],
							9: [],
							8: [],
							7: [],
							6: [],
							5: []
						}
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
</script>

<style>

</style>
<template>
	<b-modal :id="modalId" :title="titleName" aria-labelledby="addUser" aria-hidden="true" :hide-footer="true">
		<b-form @submit="onSubmit">
			<b-form-input v-model="email" type="email" class="d-flex mx-auto my-1"
				size="lg" placeholder="Enter email" required />
			<b-form-input v-model="password" type="password" class="d-flex mx-auto my-1"
				size="lg" placeholder="Enter password" required />
			<b-form-input v-model="name" type="text" class="d-flex mx-auto my-1"
				size="lg" placeholder="Enter name" required />
			<b-form-input v-model="phone" type="tel" class="d-flex mx-auto my-1"
				size="lg" placeholder="Enter phone" required />
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
import useAuth from '@/db/useAuth'
import addCollection from '@/db/addDocument'
import useDocument from '@/db/useDocument'
import { ref } from 'vue'

const props = defineProps({
	title: String,
	crs: {
		type: String,
		default: 'default'
	},
	cls: {
		type: Number,
		default: 0
	}  
})
const emit = defineEmits(['submitClick'])
const titleName = 'Add ' + props.title
const modalId = 'add' + props.title
const collectionId = props.title.toLowerCase() + 's'

const email = ref('')
const password = ref('')
const name = ref('')
const phone = ref('')

const onSubmit = async() => {
	await useAuth().signup(email.value, password.value, name.value)
	.then(async(res) => {
		if(res) {
			(await addCollection(collectionId))
			.addDocument(res.uid, {
				name: name.value,
				phone: phone.value,
				email: email.value,
			}).then(async() => {
				if(collectionId == 'admins')
					emit('submitClick')
				if(collectionId == 'students') {
					(await useDocument('students', res.uid))
					.updateDocs({
						attendance: 0,
						class: props.cls,
						course: props.crs,
						feedback: 'default',
						subjects: {}
					}).then(() => {
						emit('submitClick')
					}).catch((err) => {
						console.log(err)
					})
				}
				if(collectionId == 'teachers') {
					(await useDocument('teachers', res.uid))
					.updateDocs({
						attendance: 0,
						classes: {},
						rating: {
							count: 0,
							val: 0,
							vals: [0, 0, 0, 0, 0, 0, 0, 0, 0]
						},
						todo: []
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
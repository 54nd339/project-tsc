<template>
	<b-modal :id="modalId" :title="titleName" aria-labelledby="modifyUser" aria-hidden="true" :hide-footer="true">
		<b-form @submit="onSubmit">
			<b-form-input v-model="name" type="text" class="d-flex mx-auto my-1"
				size="lg" placeholder="Enter name" :value="name" required />
			<b-form-input v-model="phone" type="tel" class="d-flex mx-auto my-1"
				size="lg" placeholder="Enter phone" :value="phone" required />
			<b-form-input v-model="email" type="email" class="d-flex mx-auto my-1"
				size="lg" placeholder="Enter Mail" :value="email" required />
			<b-input-group size="lg" prepend="Enter DOB" class="mb-1">
				<input v-model="dob" type="date" class="d-flex mx-auto my-1" required/>
			</b-input-group>
			<div class="d-flex mb-1 justify-content-between">
				<b-button size="lg" @click="useAuth().passwordReset(email)">Reset Password</b-button>
				<b-button-group>
					<b-button type="reset" variant="danger" size="lg">Reset </b-button>
					<b-button type="submit" variant="primary" size="lg">Submit</b-button>
				</b-button-group>
			</div>
		</b-form>
	</b-modal>
</template>

<script setup>
import useDocument from '@/db/useDocument'
import useAuth from '@/db/useAuth'
import { ref } from 'vue'

const props = defineProps({
	title: String,
	id: String
})
const emit = defineEmits(['submitClick', 'setNav'])

const index = props.title.indexOf('_')
var colId = props.title.toLowerCase() + 's'
var titId = props.title
if(index > 0) {
	colId = colId.substring(index + 1)
	titId = 'User'
}
const titleName = 'Modify ' + titId
const modalId = 'modify' + titId

const name = ref('')
const email = ref('')
const phone = ref('')
const dob = ref('')

const loadData = async () => {
	(await useDocument(colId, props.id))
	.getDetail().then((doc) => {
		name.value = doc.name
		email.value = doc.email
		phone.value = doc.phone
		dob.value = doc.dob
	}).catch((err) => {
		console.log(err)
	})
}
defineExpose({
	loadData
})

const onSubmit = async() => {
	const btn = event.target.closest('.modal-content')
                            .querySelector('.btn-close')
	await (await useDocument(collectionId, props.id))
	.updateDocs({
		name: name.value,
		email: email.value,
		phone: phone.value,
		dob: dob.value
	}).then(() => {
		btn.click()
		emit('submitClick', props.id,
			name.value, email.value, phone.value)
		emit('setNav', name.value, dob.value)
	}).catch((err) => {
		console.log(err)
	})
}

</script>

<style>
/* .modal-content {
	width: 500px;
} */
</style>
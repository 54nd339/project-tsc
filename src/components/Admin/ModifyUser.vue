<template>
	<b-modal :id="modalId" :title="titleName" aria-labelledby="modifyUser" aria-hidden="true" :hide-footer="true">
		<b-form @submit="onSubmit">
			<b-form-input v-model="name" type="text" class="d-flex mx-auto my-1"
				size="lg" placeholder="Enter name" :value="name" required></b-form-input>
			<b-form-input v-model="phone" type="text" class="d-flex mx-auto my-1"
				size="lg" placeholder="Enter phone" :value="phone" required></b-form-input>
			<div class="d-flex mb-1 justify-content-end">
				<b-button-group>
					<b-button type="reset" variant="danger" size="lg">Reset </b-button>
					<b-button type="submit" variant="primary" size="lg" @click="click">Submit</b-button>
				</b-button-group>
			</div>
		</b-form>
	</b-modal>
</template>

<script setup>
import useDocument from '@/db/useDocument';
import getDocument from '@/db/getDocument';
import { ref } from 'vue'

const props = defineProps({
	title: String,
	id: String
})
const emit = defineEmits(['submitClick'])
const titleName = 'Modify ' + props.title
const modalId = 'modify' + props.title
const collectionId = props.title.toLowerCase()

const name = ref('')
const phone = ref('')

const loadData = async () => {
	let doc = getDocument(collectionId, props.id)
	console.log(doc, collectionId, props.id)
	doc.getDetail().then((doc) => {
		name.value = doc.name
		phone.value = doc.phone
	}).catch((err) => {
		console.log(err)
	})
}
defineExpose({
	loadData
})

const btn = ref(null)
const click = () => {
    btn.value = event.target.closest('.modal-content')
                            .querySelector('.btn-close')
    // console.log(btn.value)
}

const onSubmit = async() => {
	await (await useDocument(collectionId, props.id)).updateDocs({
		name: name.value,
		phone: phone.value
	}).then(() => {
		btn.value.click()
		emit('submitClick')
	}).catch((err) => {
		console.log(err)
	})
}
</script>

<style>

</style>
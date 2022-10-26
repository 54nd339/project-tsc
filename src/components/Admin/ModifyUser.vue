<template>
	<b-modal id="modifyUser" :title="titleName" aria-labelledby="modifyUser" aria-hidden="true" :hide-footer="true">
		<b-form @submit="onSubmit" @reset="onReset">
			<b-form-input id="modName" v-model="name" type="text" placeholder="Enter name"></b-form-input>
			<b-form-input id="modPhone" v-model="phone" type="text" placeholder="Enter phone"></b-form-input>
            <b-button type="submit" variant="primary">Submit</b-button>
			<b-button type="reset" variant="danger">Reset</b-button>
		</b-form>
	</b-modal>
</template>

<script setup>
import useDocument from '@/db/useDocument';
import getDocument from '@/db/getDocument';
import { computed, ref } from 'vue'

const props = defineProps({
	title: String,
	id: String
})
const emit = defineEmits(['submitClick'])
const titleName = 'Modify ' + props.title
const collectionId = props.title.toLowerCase()

const name = ref('')
const phone = ref('')

// watch(props.id, async() => {
// 	const doc = await getDocument(collectionId, props.id).document
// 	if(doc) {
// 		name.value = doc.name
// 		phone.value = doc.phone
// 	}
// 	console.log(doc)
// })

computed(async() => {
	const doc = await getDocument(collectionId, props.id).document
	if(doc) {
		name.value = doc.name
		phone.value = doc.phone
	}
	console.log(doc)
})

const onSubmit = async() => {
	await (await useDocument(collectionId, props.id)).updateDocs({
		name: name.value,
		phone: phone.value
	}).then(() => {
		document.querySelectorAll('.btn-close')[3].click()
		emit('submitClick')
	}).catch((err) => {
		console.log(err)
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
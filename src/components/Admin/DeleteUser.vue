<template>
	<b-modal :id="modalId" :title="titleName" aria-labelledby="deleteUser" aria-hidden="true" :hide-footer="true">
		<b-form @submit="onSubmit">
			<p class="justify-content-center align-items-center" id="deleteText">Confirm Delete?</p>
			<b-button type="submit" variant="danger d-flex mx-auto mt-2" size="lg">Delete</b-button>
		</b-form>
	</b-modal>
</template>

<script setup> 
import useDocument from '@/db/useDocument';
import { ref } from 'vue'

const props = defineProps({
	title: String,
	ids: Array
})
const emit = defineEmits(['submitClick'])
const titleName = 'Delete ' + props.title
const modalId = 'delete' + props.title
const collectionId = props.title.toLowerCase()

const onSubmit = async() => {
	event.target.closest('.modal-content')
                .querySelector('.btn-close').click()
	for (var i = 0; i < props.ids.length; i++) {
		await (await useDocument(collectionId, props.ids[i]))
		.delDoc().then(() => {
			// console.log('deleted')
		}).catch((err) => {
			console.log(err)
		})
	}
	emit('submitClick')
}
</script>

<style>

</style>
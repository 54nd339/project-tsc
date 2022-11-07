<template>
	<b-modal :id="modalId" :title="titleName" aria-labelledby="deleteUser" aria-hidden="true" :hide-footer="true">
		<b-form @submit="onSubmit">
			<p class="justify-content-center align-items-center" id="promoteText">Confirm Reset?</p>
			<b-button type="submit" variant="danger d-flex mx-auto mt-2" size="lg">Reset</b-button>
		</b-form>
	</b-modal>
</template>

<script setup> 
import useDocument from '@/db/useDocument'

const props = defineProps({
	title: String,
    ids: Array
})
const emit = defineEmits(['submitClick'])
const titleName = 'Reset ' + props.title + ' Attendance'
const modalId = 'reset' + props.title
const collectionId = props.title.toLowerCase() + 's'

const onSubmit = async() => {
	event.target.closest('.modal-content')
                .querySelector('.btn-close').click()
	// console.log(props.ids)
	props.ids.forEach(async (docId) => {
		await (await useDocument(collectionId, docId.id))
		.updateDocs({attendance: 0}).then(() => {
			// console.log('deleted')
		}).catch((err) => {
			console.log(err)
		})
	})
    emit('submitClick')
}
</script>

<style>

</style>
<template>
	<b-modal :id="modalId" :title="titleName" aria-labelledby="modifyUser" aria-hidden="true" :hide-footer="true">
		<b-form @submit="onSubmit">
			<b-form-input v-model="name" type="text" class="d-flex mx-auto my-1"
				size="lg" placeholder="Enter name" :value="name" required />
			<b-form-input v-model="phone" type="tel" class="d-flex mx-auto my-1"
				size="lg" placeholder="Enter phone" :value="phone" required />
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
import useDocument from '@/db/useDocument'
import { ref } from 'vue'

const props = defineProps({
	title: String,
	id: String
})
const emit = defineEmits(['submitClick'])
const titleName = 'Modify ' + props.title
const modalId = 'modify' + props.title
const collectionId = props.title.toLowerCase() + 's'

const name = ref('')
const phone = ref('')

const loadData = async () => {
	(await useDocument(collectionId, props.id))
	.getDetail().then((doc) => {
		name.value = doc.name
		phone.value = doc.phone
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
		phone: phone.value
	}).then(() => {
		btn.click()
		emit('submitClick', props.id, name.value, phone.value)
	}).catch((err) => {
		console.log(err)
	})
}
</script>

<style>

</style>
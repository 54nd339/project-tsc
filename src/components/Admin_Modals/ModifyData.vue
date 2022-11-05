<template>
	<b-modal :id="modalId" :title="titleName" :hide-footer="true">
        <b-form @submit="saveData">
            <p class="justify-content-center align-items-center">Confirm Changes?</p>
            <b-button type="submit" variant="danger d-flex mx-auto mt-2" size="lg">Modify</b-button>
        </b-form>
    </b-modal>
</template>

<script setup>
import useDocument from '@/db/useDocument'

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    data: {
        type: Object,
        required: true
    }
})
const emit = defineEmits(['confirmClick'])
const titleName = 'Confirm ' + props.title
const modalId = 'confirm' + props.title
const collectionId = props.title.toLowerCase()

const saveData = async() => {
    const btn = event.target.closest('.modal-content')
                    .querySelector('.btn-close')

    await (await useDocument(collectionId, props.id))
    .updateDocs(data).then(() => {
        btn.click()
        emit('confirmClick')
    }).catch((err) => {
        console.log(err)
    })
}
</script>

<style>

</style>
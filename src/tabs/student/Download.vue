<template>
  	<div id="content" class="row justify-content-center">
		<b-form-select mx-5 px-5 v-model="subject" :options="props.subjects" @update:model-value="loadData" />
		<div class="col-md-3 m-3" v-for="note in notes" :key="note">
			<div class="card" style="width: 18rem;">
				<div class="card-body">
					<h5 class="card-title">{{ note.topic }}</h5>
					<b-button @click="download(note)" :disabled="downloadText != 'Download'">
						{{ downloadText }}
					</b-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import getCollection from '@/db/getCollection'
import useStorage from '@/db/useStorage'
import { ref } from 'vue'

const props = defineProps({
	subjects: {
		type: Array,
		required: true
	},
	user: {
		type: Object,
		required: true
	}
})
const subject = ref('default')
const notes = ref([])
const loadData = async() => {
	await getCollection('notes', ['course', '==', props.user.course],
		['class', '==', props.user.class], ['subject', '==', subject.value], '')
		.getDocuments().then((docs) => {
			notes.value = docs
		}).catch((err) => {
			console.log(err)
		})
}
const downloadText = ref('Download')
const download = async (note) => {
    const url = note.url
    const name = note.course + '_' + note.class + '_' + note.subject + '_' + note.topic
    downloadText.value = 'Downloading...'

    useStorage().downloadFile(url, name).then(() => {
        downloadText.value = 'Download'
    }).catch((err) => {
        console.log(err)
    })
}
loadData()
</script>

<style>

</style>
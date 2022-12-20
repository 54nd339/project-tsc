<template>
  	<b-row id="content" class="justify-content-center">
		<b-form-select mx-5 px-5 v-model="subject" :options="props.subjects" @update:model-value="loadData" />
		<b-col md="4" v-for="(note, index) in notes" :key="note">
			<b-card border-variant="success" :header="note.topic" align="center" class="m-3" :class="{ shadow: isHover && ind == index }"
				@mouseover="isHover = true; ind = index" @mouseout="isHover = false; ind = -1">
				<b-button variant="success" @click="download(note)" :disabled="downloadText != 'Download'">
					{{ downloadText }}
				</b-button>
			</b-card>
		</b-col>
	</b-row>
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
const isHover = ref(false)
const ind = ref(-1)
const subject = ref('default')
const res = ref([])
const notes = ref([])
const loadData = () => {
	notes.value = res.value.filter((note) => {
		return note.subject == subject.value && note.course == props.user.course && note.class == props.user.class
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

await getCollection('notes')
.getDocuments().then((data) => {
	res.value = data
	loadData()
}).catch((err) => {
	console.log(err)
})
</script>

<style>

</style>
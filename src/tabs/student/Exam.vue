<template>
	<b-container fluid id="content">
		<b-form-select mx-5 p-5 v-model="subject" :options="props.subjects" @update:model-value="loadData" />
		<b-row id="currtests" class="featurette p-2 m-2">
			<h2 class="featurette-heading pb-md-2">Take Tests</h2>
			<b-col md="4" v-for="(test, index) in tests" :key="test">
				<b-card border-variant="success" :header="test.topic" align="center" class="m-3" :class="{ shadow: isHover && ind == index && sec == 'take' }"
					@mouseover="isHover = true; ind = index; sec = 'take'" @mouseout="isHover = false; ind = -1; sec = ''">
					<b-button>Take Tests</b-button>
				</b-card>
			</b-col>
		</b-row>
		<hr class="featurette-divider">
		<b-row id="prevtests" class="featurette p-2 m-2">
			<h2 class="featurette-heading pb-md-2">Previous Tests</h2>
			<b-col md="4" v-for="(test, index) in prevTests" :key="test">
				<b-card border-variant="success" :header="test.topic" align="center" class="m-3" :class="{ shadow: isHover && ind == index && sec == 'prev' }"
					@mouseover="isHover = true; ind = index; sec = 'prev'" @mouseout="isHover = false; ind = -1; sec = ''">
					<b-button variant="success" @click="download(test)" :disabled="downloadText != 'Download'">
						{{ downloadText }}
					</b-button>
				</b-card>
			</b-col>
		</b-row>
	</b-container>
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
const sec = ref('')
const subject = ref('default')
const res = ref([])
const prevTests = ref([])
const tests = ref([])

const loadData = async() => {
	const today = new Date().toJSON().slice(0, 10)
	prevTests.value = []
	tests.value = []

	const docs = res.value.filter((test) => {
		return test.subject == subject.value && test.course == props.user.course && test.class == props.user.class
	})
	docs.forEach((doc) => {
		if (doc.date < today) {
			prevTests.value.push(doc)
		}
		else if (doc.date == today) {
			tests.value.push(doc)
		}
	})
}

const downloadText = ref('Download')
const download = async (test) => {
	const url = test.url
	const name = test.course + '_' + test.class + '_' + test.subject + '_' + test.topic
	downloadText.value = 'Downloading...'

	useStorage().downloadFile(url, name).then(() => {
		downloadText.value = 'Download'
	}).catch((err) => {
		console.log(err)
	})
}

await getCollection('tests')
.getDocuments().then((data) => {
	res.value = data
	loadData()
}).catch((err) => {
	console.log(err)
})

// something just like this - coldplay
</script>

<style>

</style>
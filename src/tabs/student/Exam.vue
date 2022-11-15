<template>
	<div id="content" class="container-fluid">
		<b-form-select mx-5 p-5 v-model="subject" :options="props.subjects" @update:model-value="loadData" />
		<div id="currtests" class="row featurette p-2 m-2">
			<h2 class="featurette-heading pb-md-2">Take Tests</h2>
			<div class="col-md-4" v-for="test in tests" :key="test">
				<div class="card" style="width: 18rem;">
					<div class="card-body">
						<h5 class="card-title">{{ test.topic }}</h5>
						<b-button>Take Tests</b-button>
					</div>
				</div>
			</div>
		</div>
		<hr class="featurette-divider">
		<div id="prevtests" class="row featurette p-2 m-2">
			<h2 class="featurette-heading pb-md-2">Previous Tests</h2>
			<div class="col-md-4" v-for="test in prevTests" :key="test">
				<div class="card" style="width: 18rem;">
					<div class="card-body">
						<h5 class="card-title">{{ test.topic }}</h5>
						<b-button @click="download(test)" :disabled="downloadText != 'Download'">
							{{ downloadText }}
						</b-button>
					</div>
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

</script>

<style>

</style>
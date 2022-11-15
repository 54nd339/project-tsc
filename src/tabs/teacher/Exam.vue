<template>
	<div id="content" class="container-fluid">
		<b-form-select mx-5 p-5 v-model="clas" :options="props.classes" @update:model-value="loadData" />
		<div id="currtests" class="row featurette p-2 m-2">
			<h2 class="featurette-heading pb-md-2">Upcoming Tests</h2>
			<div class="col-md-4" v-for="test in nextTests" :key="test">
				<div class="card" style="width: 18rem;">
					<div class="card-body">
						<h5 class="card-title">{{ test.topic }}</h5>
						<h6 class="card-subtitle mb-2 text-muted">{{ test.date }}</h6>
						<b-button v-if="test.url" @click="openUrl(test.url)">View</b-button>
                        <b-button v-else v-b-modal.addTestFile @click="target = test">Upload File</b-button>
					</div>
				</div>
			</div>
		</div>
		<hr class="featurette-divider">
		<div id="currtests" class="row featurette p-2 m-2">
			<h2 class="featurette-heading pb-md-2">Today's Tests</h2>
			<div class="col-md-4" v-for="test in tests" :key="test">
				<div class="card" style="width: 18rem;">
					<div class="card-body">
						<h5 class="card-title">{{ test.topic }}</h5>
						<b-button v-if="test.url" @click="openUrl(test.url)">View</b-button>
                        <b-button v-else v-b-modal.addTestFile @click="target = test">Upload File</b-button>
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
						<h6 class="card-subtitle mb-2 text-muted">{{ test.date }}</h6>
						<b-button @click="openUrl(test.url)">view</b-button>
					</div>
				</div>
			</div>
		</div>
		<b-modal id="addTestFile" title="Add File" aria-labelledby="addTestFile" aria-hidden="true" :hide-footer="true">
			<b-form @submit="addTestFile">
				<input name="file" class="d-flex mx-auto my-1" type="file" @change="onFileChange" required/>
				<div class="d-flex mb-1 justify-content-end">
					<b-button-group>
						<b-button type="reset" variant="danger" size="lg">Reset </b-button>
						<b-button type="submit" variant="primary" size="lg"
						:disabled="uploadText != 'Upload'">{{ uploadText }}</b-button>
					</b-button-group>
				</div>
			</b-form>
		</b-modal>
	</div>
</template>

<script setup>
import getCollection from '@/db/getCollection'
import useDocument from '@/db/useDocument'
import useStorage from '@/db/useStorage'
import { ref } from 'vue'

const props = defineProps({
	user: {
		type: Object,
		required: true
	},
	classes: {
		type: Array,
		required: true
	}
})
const clas = ref('default')
const res = ref([])
const prevTests = ref([])
const tests = ref([])
const nextTests = ref([])
const loadData = async() => {
	if(clas.value == 'default') {
		return
	}
	const today = new Date().toJSON().slice(0, 10)
	const arr = clas.value.split('_')
	let course, grade, subject
	if(arr.length == 3)
		[course, grade, subject] = [arr[0], Number(arr[1]), arr[2]]
	else
		[course, grade, subject] = [arr[0]+'_'+arr[1], Number(arr[2]), arr[3]]

	const docs = res.value.filter(doc => {
		return doc.course == course && doc.class == grade && doc.subject == subject
	})
	docs.forEach((doc) => {
		if (doc.date < today) {
			prevTests.value.push(doc)
		}
		else if (doc.date == today) {
			tests.value.push(doc)
		}
		else {
			nextTests.value.push(doc)
		}
	})
}

const file1 = ref(null)
const onFileChange = (e) => {
    file1.value = e.target.files[0]
}
const openUrl = (url) => {
    window.open(url)
}
const target = ref(null)
const uploadText = ref('Upload')
const addTestFile = async () => {
    const btn = event.target.closest('.modal-content')
                .querySelector('.btn-close')
    let file = file1.value
    let path = `tests/${target.value.course + '_' + target.value.class}/${target.value.subject}/${file.name}` 
    uploadText.value = 'Uploading...'

    await useStorage().uploadFile(file, path)
    .then(async(fileRef) => {
        if(fileRef) {
            await (await useDocument('tests', target.value.id))
            .updateDocs({
                url: fileRef.url,
                path: fileRef.snapshot.metadata.fullPath
            }).then(() => {
				// update the test in the array
				const index = res.value.findIndex(test => test.id == target.value.id)
				res.value[index].url = fileRef.url
				res.value[index].path = fileRef.snapshot.metadata.fullPath
                file1.value = null
                btn.click()
				uploadText.value = 'Upload'
                loadData()
            }).catch((err) => {
                console.log(err)
            })
        }
        else
            console.log('File not uploaded')
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
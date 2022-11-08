<template>
	<div id="content" class="row justify-content-center">
		<b-form-select mx-5 p-5 v-model="clas" :options="props.classes" @update:model-value="loadData" />
		<b-button-group class="my-1 d-flex mx-6">
			<b-button v-if="clas != 'default'" v-b-modal.addNote>Add</b-button>
		</b-button-group>
		<div class="col-md-3 m-3" v-for="note in notes" :key="note">
			<div class="card" style="width: 18rem;">
				<div class="card-body">
					<h5 class="card-title">{{ note.topic }}</h5>
					<b-button @click="openUrl(note.url)">view</b-button>
				</div>
			</div>
		</div>
		<b-modal id="addNote" title="Add Note" aria-labelledby="addNote" aria-hidden="true" :hide-footer="true">
			<b-form @submit="addNote">
				<b-form-input v-model="topic" class="d-flex mx-auto my-1"
					size="lg" placeholder="Enter Topic" required />
				<input type="file" class="d-flex mx-auto my-1" name="file" @change="onFileChange" required/>
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
import addCollection from '@/db/addDocument'
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
const course = ref('default')
const grade = ref(0)
const subject = ref('default')
const openUrl = (url) => {
    window.open(url)
}

const clas = ref('default')
const notes = ref([])
const loadData = async() => {
	if(clas.value == 'default') {
		return
	}

	const arr = clas.value.split('_')
	if(arr.length == 3)
		[course.value, grade.value, subject.value] = [arr[0], Number(arr[1]), arr[2]]
	else
		[course.value, grade.value, subject.value] = [arr[0]+'_'+arr[1], Number(arr[2]), arr[3]]

	await getCollection('notes', ['course', '==', course.value],
		['class', '==', grade.value], ['subject', '==', subject.value], '')
		.getDocuments().then((docs) => {
			notes.value = docs
        	uploadText.value = 'Upload'
		}).catch((err) => {
			console.log(err)
		})
}

const topic = ref('')
const file1 = ref(null)
const onFileChange = (e) => {
    file1.value = e.target.files[0]
}
const uploadText = ref('Upload')
const addNote = async () => {
    let file = file1.value
    let path = `notes/${course.value + '_' + grade.value}/${subject.value}/${file.name}` 
    uploadText.value = 'Uploading...'

    await useStorage().uploadFile(file, path).then(async(res) => {
        if(res) {
            await (await addCollection('notes')).addDocument('', {
                course: course.value,
                class: grade.value,
                subject: subject.value,
                topic: topic.value,
                url: res.url,
                path: res.snapshot.metadata.fullPath,
                date: res.snapshot.metadata.timeCreated
            }).then(() => {
                topic.value = ''
                file1.value = null
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

loadData()
</script>

<style>

</style>
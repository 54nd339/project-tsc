<template>
	<div class="col-md-5 rounded-3 m-2" style="background-color:#80ED99; max-height: 70vh; overflow-y: auto;">
        <div class="shadow m-3 p-1 rounded-3" style="background-color:#57CC99">
            <h3 class="text-center" style>Uploads</h3>
        </div>
        <div id="content" class="container-fluid">
            <b-button-group class="my-1">
                <b-form-select v-model="grade" :options="gradeList" @update:modelValue="loadData" />
                <b-form-select v-model="subject" :options="subjectList" @update:modelValue="loadData" />
                <b-button variant="success" v-b-modal.addNote>Add</b-button>
            </b-button-group>
            <table class="table table-hover table-responsive">
                <thead><tr>
                    <th scope="col">Topic</th>
                    <th scope="col">Date</th>
                    <th scope="col">View</th>
                    <th scope="col">Delete</th>
                </tr></thead>
                <tbody ref="rows" id="rows">
                    <tr v-for="note in notes" :key="note">
                        <td>{{ note.topic }}</td>
                        <td>{{ note.date }}</td>
                        <td><b-button @click="download(note)" :disabled="downloadText != 'Download'">
                            {{ downloadText }}</b-button></td>
                        <td><b-button variant="outline-danger" size="sm" class="m-1" @click="delNote(note)">
                            <font-awesome-icon icon="fa-solid fa-trash" size="1x" />
                        </b-button></td>
                    </tr>
                </tbody>
            </table>
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
    </div>
</template>

<script setup>
import getCollection from '@/db/getCollection'
import addCollection from '@/db/addDocument'
import useDocument from '@/db/useDocument'
import useStorage from '@/db/useStorage'
import { ref } from 'vue'

const props = defineProps({  
	gradeList: {
		type: Array,
		required: true
	},
	subjectList: {
		type: Array,
		required: true
	}
})
const grade = ref(10)
const subject = ref('eng1')
const topic = ref('')
const file1 = ref(null)
const onFileChange = (e) => {
    file1.value = e.target.files[0]
}

const notes = ref([])
const loadData = async () => {
    let collection = getCollection('notes',
        ['class', '==', grade.value], ['subject', '==', subject.value])

	collection.getDocuments().then((docs) => {
		notes.value = docs
        uploadText.value = 'Upload'
        downloadText.value = 'Download'
	}).catch((err) => {
		console.log(err)
	})
}

const uploadText = ref('Upload')
const addNote = async () => {
    let file = file1.value
    let path = `notes/${grade.value + 'th'}/${subject.value}/${file.name}` 
    uploadText.value = 'Uploading...'

    await useStorage().uploadFile(file, path).then(async(res) => {
        if(res) {
            await (await addCollection('notes')).addDocument('', {
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
const downloadText = ref('Download')
const download = async (note) => {
    const url = note.url
    const name = note.class + 'th_' + note.subject + '_' + note.topic
    downloadText.value = 'Downloading...'

    useStorage().downloadFile(url, name).then(() => {
        downloadText.value = 'Download'
    }).catch((err) => {
        console.log(err)
    })
}
const delNote = async (note) => {
    await useStorage().deleteFile(note.path).then(async(res) => {
        if(res) {
            await (await useDocument('notes', note.id)).delDoc().then(() => {
                loadData()
            }).catch((err) => {
                console.log(err)
            })
        }
        else
            console.log('File not found')
    }).catch((err) => {
        console.log(err)
    })
}

loadData()
</script>

<style>

</style>
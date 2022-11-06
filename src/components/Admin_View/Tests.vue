<template>
	<div class="col-md-5 rounded-3 m-2" style="background-color:#80ED99; max-height: 70vh; overflow-y: auto;">
        <div class="shadow m-3 p-1 rounded-3" style="background-color:#57CC99">
            <h3 class="text-center" style>Schedule Test</h3>
        </div>
        <div id="content" class="container-fluid">
            <b-button-group class="my-1">
                <b-form-select v-model="grade" :options="gradeList" @update:modelValue="loadData" />
                <b-form-select v-model="subject" :options="subjectList" @update:modelValue="loadData" />
                <b-button variant="success" v-b-modal.addTest>Add</b-button>
            </b-button-group>
            <table class="table table-hover table-responsive">
                <thead><tr>
                    <th scope="col">Topic</th>
                    <th scope="col">FM</th>
                    <th scope="col">View</th>
                    <th scope="col">Delete</th>
                </tr></thead>
                <tbody ref="rows" id="rows">
                    <tr v-for="test in tests" :key="test">
                        <td>{{ test.topic }}</td>
                        <td>{{ test.fm }}</td>
                        <td><b-button @click="download(test)" :disabled="downloadText != 'Download'">
                            {{ downloadText }}</b-button></td>
                        <td><b-button variant="outline-danger" size="sm" class="m-1" @click="delTest(test)">
                            <font-awesome-icon icon="fa-solid fa-trash" size="1x" />
                        </b-button></td>
                    </tr>
                </tbody>
            </table>
            <b-modal id="addTest" title="Add Test" aria-labelledby="addTest" aria-hidden="true" :hide-footer="true">
                <b-form @submit="addTest">
                    <b-form-input v-model="topic" class="d-flex mx-auto my-1" size="lg" placeholder="Enter Topic" required />
                    <b-form-input v-model="fm" class="d-flex mx-auto my-1" type="number" size="lg" placeholder="Enter F.M." required />
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
const fm = ref(0)
const file1 = ref(null)
const onFileChange = (e) => {
    file1.value = e.target.files[0]
}

const tests = ref([])
const loadData = async () => {
    let collection = getCollection('test',
        ['class', '==', grade.value], ['subject', '==', subject.value])

	collection.getDocuments().then((docs) => {
		tests.value = docs
        uploadText.value = 'Upload'
        downloadText.value = 'Download'
	}).catch((err) => {
		console.log(err)
	})
}

const uploadText = ref('Upload')
const addTest = async () => {
    let file = file1.value
    let path = `tests/${grade.value + 'th'}/${subject.value}/${file.name}` 
    uploadText.value = 'Uploading...'

    await useStorage().uploadFile(file, path).then(async(res) => {
        if(res) {
            await (await addCollection('test')).addDocument('', {
                class: grade.value,
                subject: subject.value,
                topic: topic.value,
                fm: fm.value,
                url: res.url,
                path: res.snapshot.metadata.fullPath,
                date: res.snapshot.metadata.timeCreated
            }).then(() => {
                topic.value = ''
                fm.value = 0
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
const download = async (test) => {
    const url = test.url
    const name = test.class + 'th_' + test.subject + '_' + test.topic
    downloadText.value = 'Downloading...'

    useStorage().downloadFile(url, name).then(() => {
        downloadText.value = 'Download'
    }).catch((err) => {
        console.log(err)
    })
}

const delTest = async (test) => {
    await useStorage().deleteFile(test.path).then(async(res) => {
        if(res) {
            await (await useDocument('test', test.id)).delDoc()
            .then(() => {
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
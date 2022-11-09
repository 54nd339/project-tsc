<template>
	<div class="col-md-5 rounded-3 m-2" style="background-color:#80ED99; min-height: 50vh; max-height: 70vh; overflow-y: auto;">
        <div class="shadow m-3 p-1 rounded-3" style="background-color:#57CC99">
            <h3 class="text-center" style>Schedule Test</h3>
        </div>
        <div id="content" class="container-fluid">
            <b-button-group class="my-1 d-flex">
                <b-form-select v-model="course" :options="courseList" @update:modelValue="loadData" />
                <b-form-select v-model="grade" :options="gradeList" @update:modelValue="loadData" />
                <b-form-select v-model="subject" :options="subjectList" @update:modelValue="loadData" />
                <b-button v-if="course != 'default' && grade != 0 && subject != 'default'"
                    variant="success" v-b-modal.addTest>Add</b-button>
            </b-button-group>
            <table class="table table-hover table-responsive">
                <thead><tr>
                    <th scope="col">Topic</th>
                    <th scope="col">FM</th>
                    <th scope="col">Date</th>
                    <th scope="col">isMarked</th>
                    <th scope="col">View</th>
                    <th scope="col">Delete</th>
                </tr></thead>
                <tbody ref="rows" id="rows">
                    <tr v-for="test in tests" :key="test">
                        <td>{{ test.topic }}</td>
                        <td>{{ test.fm }}</td>
                        <td>{{ test.date }}</td>
                        <td><b-button @click="updateMarked(test)">
                            {{ test.marked ? 'Marked' : 'Unmarked' }}
                        </b-button></td>
                        <td><b-button v-if="test.url" @click="openUrl(test.url)">View</b-button>
                            <b-button v-else v-b-modal.addFile @click="target = test">Upload File</b-button>
                        </td>
                        <td><b-button variant="outline-danger" size="sm" class="m-1"
                                @click="test.url ? delTest(test) : delDoc(test)">
                            <font-awesome-icon icon="fa-solid fa-trash" size="1x" />
                        </b-button></td>
                    </tr>
                </tbody>
            </table>
            <b-modal id="addTest" title="Add Test" aria-labelledby="addTest" aria-hidden="true" :hide-footer="true">
                <b-form @submit="addTest">
                    <b-form-input v-model="topic" class="d-flex mx-auto my-1" size="lg" placeholder="Enter Topic" required />
                    <b-form-input v-model="fm" class="d-flex mx-auto my-1" type="number" size="lg" placeholder="Enter F.M." required />
                    <input v-model="date" class="d-flex mx-auto my-1" type="date" required/>
                    <div class="d-flex mb-1 justify-content-end">
                        <b-button-group>
                            <b-button type="reset" variant="danger" size="lg">Reset </b-button>
                            <b-button type="submit" variant="primary" size="lg">Submit</b-button>
                        </b-button-group>
                    </div>
                </b-form>
            </b-modal>
            <b-modal id="addFile" title="Add File" aria-labelledby="addTest" aria-hidden="true" :hide-footer="true">
                <b-form @submit="addFile">
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
    </div>
</template>

<script setup>
import getCollection from '@/db/getCollection'
import addCollection from '@/db/addDocument'
import useDocument from '@/db/useDocument'
import useStorage from '@/db/useStorage'
import { ref } from 'vue'

const props = defineProps({  
	courseList: {
		type: Array,
		required: true
	},
	gradeList: {
		type: Array,
		required: true
	},
	subjectList: {
		type: Array,
		required: true
	}
})
const course = ref('ICSE')
const grade = ref(10)
const subject = ref('eng1')
const topic = ref('')
const fm = ref(0)
const date = ref('')
const file1 = ref(null)
const onFileChange = (e) => {
    file1.value = e.target.files[0]
}
const openUrl = (url) => {
    window.open(url)
}
const tests = ref([])
const loadData = async () => {
    if(course.value == 'default' || grade.value == 0 || subject.value == 'default') {
        return
    }
    let collection = getCollection('tests', ['course', '==', course.value],
        ['class', '==', grade.value], ['subject', '==', subject.value], ['date', 'desc'])

	collection.getDocuments().then((docs) => {
		tests.value = docs
        uploadText.value = 'Upload'
        topic.value = ''
        fm.value = 0
        date.value = ''
	}).catch((err) => {
		console.log(err)
	})
}

const addTest = async () => {
    await (await addCollection('tests'))
    .addDocument('', {
        course: course.value,
        class: grade.value,
        subject: subject.value,
        topic: topic.value,
        fm: fm.value,
        date: date.value,
        marked: false,
        url: '', path: ''
    }).then(async() => {
        await (getCollection('students', ['course', '==', course.value],
        ['class', '==', grade.value], '', '')).getDocuments()
        .then((docs) => {
            if(docs)
                docs.forEach(async(doc) => {
                    if(!doc.subjects.hasOwnProperty(subject.value))
                        doc.subjects[subject.value] = []

                    doc.subjects[subject.value].push({
                        date: date.value, marked: false,
                        topic: topic.value,
                        marks: 0, fm: fm.value
                    })
                    await updateStudent(doc).then(() => {
                        // loadData()
                    }).catch((err) => {
                        console.log(err)
                    })
                    // console.log(typeof doc.subjects)
                })
        }).catch((err) => {
            console.log(err)
        })
    }).catch((err) => {
        console.log(err)
    })
}
const target = ref(null)
const uploadText = ref('Upload')
const addFile = async () => {
    const btn = event.target.closest('.modal-content')
                .querySelector('.btn-close')
    let file = file1.value
    let path = `tests/${target.value.course + '_' + target.value.class}/${target.value.subject}/${file.name}` 
    uploadText.value = 'Uploading...'

    await useStorage().uploadFile(file, path)
    .then(async(res) => {
        if(res) {
            await (await useDocument('tests', target.value.id))
            .updateDocs({
                url: res.url,
                path: res.snapshot.metadata.fullPath
            }).then(() => {
                file1.value = null
                btn.click()
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

const delDoc = async (test) => {
    await (await useDocument('tests', test.id))
    .delDoc().then(async() => {
        await (getCollection('students', ['course', '==', test.course],
        ['class', '==', test.class], '', '')).getDocuments()
        .then((docs) => {
            if(docs)
                docs.forEach(async(doc) => {
                    doc.subjects[test.subject].forEach((sub, index) => {
                        if(sub.date == test.date && sub.topic == test.topic && sub.fm == test.fm) {
                            doc.subjects[test.subject].splice(index, 1)
                        }
                    })
                    await updateStudent(doc)
                })
        }).catch((err) => {
            console.log(err)
        })
    }).catch((err) => {
        console.log(err)
    })
}
const delTest = async (test) => {
    await useStorage().deleteFile(test.path)
    .then(async(res) => {
        if(res) 
            delDoc(test)
        else
            console.log('File not found')
    }).catch((err) => {
        console.log(err)
    })
}

const updateStudent = async (doc) => {
    await (await useDocument('students', doc.id))
    .updateDocs({
        subjects: doc.subjects
    }).then(() => {
        // console.log(doc.subjects[subject.value])
        loadData()
    }).catch((err) => {
        console.log(err)
    })
}
const updateMarked = async (test) => {
    await (await useDocument('tests', test.id))
    .updateDocs({
        marked: !test.marked
    }).then(async () => {
        await (getCollection('students', ['course', '==', course.value],
        ['class', '==', grade.value], '', ''))
        .getDocuments().then((docs) => {
            if(docs)
                docs.forEach(async(doc) => {
                    const obArray = doc.subjects[subject.value]
                    const index = obArray.findIndex((ob) => {
                        return ob.date == test.date && ob.topic == test.topic && ob.fm == test.fm
                    })
                    if(index != -1) {
                        obArray[index].marked = !obArray[index].marked
                        await updateStudent(doc)
                    }
                })
        }).catch((err) => {
            console.log(err)
        })
    }).catch((err) => {
        console.log(err)
    })
}

loadData()
</script>

<style>

</style>
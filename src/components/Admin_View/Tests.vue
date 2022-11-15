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
                    <th scope="col">View</th>
                    <th scope="col">Delete</th>
                </tr></thead>
                <tbody ref="rows" id="rows">
                    <tr v-for="test in tests" :key="test">
                        <td>{{ test.topic }}</td>
                        <td>{{ test.fm }}</td>
                        <td>{{ test.date }}</td>
                        <td><b-button variant="primary" v-b-modal.viewFiles @click="target = test; setSheet(target)">View</b-button></td>
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
            <b-modal id="viewFiles" title="Test Files" aria-labelledby="testFiles" aria-hidden="true" :hide-footer="true">
                <b-form>
                    <b-form-group label="Question Paper:">
                        <div class="d-flex mb-1 justify-content-between">
                            <input name="file" class="d-flex mx-auto my-1" type="file" v-if="!target.url" @change="qFileChange" />
                            <b-button-group>
                                <b-button variant="primary" size="lg" :disabled="uploadText != 'Upload'"
                                    @click="addFile" v-if="!target.url">{{ uploadText }}</b-button>
                                <b-button v-if="target.url" @click="openUrl(target.url)">View</b-button>
                            </b-button-group>
                        </div>
                    </b-form-group>
                    <b-form-group label="Mark Sheet:">
                        <div class="d-flex mb-1 justify-content-between">
                            <input name="file" class="d-flex mx-auto my-1" type="file" @change="mFileChange" accept=".xls,.xlsx,application/msexcel/">
                            <b-button-group>
                                    <section><xlsx-read :file="mfile">
                                        <xlsx-json><template #default="{collection}">
                                            <b-button variant="primary" size="lg" :disabled="uploadText != 'Upload' || !mfile"
                                                @click="data = collection; updateMarks()">{{ uploadText }}</b-button>
                                        </template></xlsx-json>
                                    </xlsx-read></section>
                                    <section><Suspense>
                                        <xlsx-workbook>
                                            <xlsx-sheet :collection="sheet.data" v-for="sheet in sheets" :key="sheet.name" :sheet-name="sheet.name" />
                                            <b-button-group><xlsx-download><b-button size="lg">Download</b-button></xlsx-download></b-button-group>
                                        </xlsx-workbook>
                                    </Suspense></section>
                            </b-button-group>
                        </div>
                    </b-form-group>
                </b-form>
            </b-modal>
        </div> 
    </div>
</template>

<script setup>
import { XlsxWorkbook, XlsxSheet, XlsxDownload, XlsxRead, XlsxJson } from 'vue3-xlsx'
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

const qfile = ref(null)
const qFileChange = (e) => {
    qfile.value = e.target.files[0]
}
const mfile = ref(null)
const mFileChange = (e) => {
    mfile.value = e.target.files[0]
}
const openUrl = (url) => {
    window.open(url)
}

const res = ref([])
const tests = ref([])
const loadData = async () => {
    if(course.value == 'default' || grade.value == 0 || subject.value == 'default') {
        return
    }
    tests.value = res.value.filter((test) => {
        return test.course == course.value && test.class == grade.value && test.subject == subject.value
    })
    topic.value = ''
    fm.value = 0
    date.value = ''
    uploadText.value = 'Upload'
}

const students = ref([])
await(getCollection('students'))
.getDocuments().then((doc) => {
    students.value = doc
}).catch((err) => {
    console.log(err)
})
const updateStudent = async (doc) => {
    await (await useDocument('students', doc.id))
    .updateDocs({
        subjects: doc.subjects
    }).then(() => {
        // loadData()
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
    }).then(async(uid) => {
        res.value.push({
            id: uid,
            course: course.value,
            class: grade.value,
            subject: subject.value,
            topic: topic.value,
            fm: fm.value,
            date: date.value,
            marked: false,
            url: '', path: ''
        });
        (async() => {
            const resDocs = students.value.filter((student) => {
                return student.course == course.value && student.class == grade.value
            })
            resDocs.forEach(async(doc) => {
                if(!doc.subjects.hasOwnProperty(subject.value))
                    doc.subjects[subject.value] = []

                doc.subjects[subject.value].push({
                    date: date.value, marked: false,
                    topic: topic.value,
                    mark: 0, fm: fm.value
                })
                await updateStudent(doc)
            })
        })().then(() => loadData()).catch((err) => {
            console.log(err)
        })
    }).catch((err) => {
        console.log(err, typeof res.value)
    })
}
const target = ref({
    id: '',
    course: '',
    class: 0,
    subject: '',
    topic: '',
    fm: 0,
    date: '',
    marked: false,
    url: '', path: ''
})
const uploadText = ref('Upload')
const addFile = async () => {
    const btn = event.target.closest('.modal-content')
                .querySelector('.btn-close')
    let file = qfile.value
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
                qfile.value = null
                btn.click()
                const index = res.value.findIndex((test) => test.id == target.value.id)
                res.value[index].url = fileRef.url
                res.value[index].path = fileRef.snapshot.metadata.fullPath
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
        res.value = res.value.filter((doc) => doc.id != test.id);
        
        (async() => {
            const resDocs = students.value.filter((student) => {
                return student.course == course.value && student.class == grade.value
            })
            resDocs.forEach(async(doc) => {
                doc.subjects[test.subject] = doc.subjects[test.subject].filter((sub) => {
                    return sub.date != test.date && sub.topic != test.topic && sub.fm != test.fm
                })
                await updateStudent(doc)
            })
        })().then(() => loadData()).catch((err) => {
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

const sheets = ref([{
    name: 'default',
    data: [{}]
}])
const setSheet = async(test) => {
    const docs = students.value.filter((doc) => {
        return doc.course == test.course && doc.class == test.class
    })
    sheets.value[0].name = test.course + '_' + test.class + '_' + test.subject + '_' + test.topic + '_' + test.date
    sheets.value[0].data = []
    docs.forEach((doc) => {
        sheets.value[0].data.push({
            id: doc.id,
            name: doc.name,
            score: doc.subjects[test.subject].find((ob) => {
                return ob.date == test.date && ob.topic == test.topic && ob.fm == test.fm
            }).mark
        })
    })
}

const data = ref([])
const updateMarks = async() => {
    console.log(data.value)
    await (await useDocument('tests', target.value.id))
    .updateDocs({
        marked: !target.value.marked
    }).then(async () => {
        const index = res.value.findIndex((doc) => doc.id == target.value.id)
        res.value[index].marked = !target.value.marked;

        (async() => {
            const resDocs = students.value.filter((student) => {
                return student.course == course.value && student.class == grade.value
            })
            resDocs.forEach(async(doc) => {
                const obArray = doc.subjects[subject.value]
                const index = obArray.findIndex((ob) => {
                    return ob.date == target.value.date && ob.topic == target.value.topic && ob.fm == target.value.fm
                })
                const mark = data.value.find((ob) => {
                    return ob.id == doc.id
                })
                if(mark) {
                    obArray[index].mark = mark.score
                    obArray[index].marked = !obArray[index].marked
                }
                await updateStudent(doc)
            })
        })().then(() => loadData()).catch((err) => {
            console.log(err)
        })
    }).catch((err) => {
        console.log(err)
    })
}

await getCollection('tests', '', '', ['date', 'desc'])
.getDocuments().then((doc) => {
    res.value = doc
    loadData()
}).catch((err) => {
    console.log(err)
})
</script>

<style>

</style>
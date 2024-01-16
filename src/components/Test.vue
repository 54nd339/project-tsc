<template>
    <b-modal id="addTest" title="Add Test" aria-labelledby="addTest" aria-hidden="true" :hide-footer="true">
        <b-form @submit="addTest">
            <b-form-input v-model="topic" class="d-flex mx-auto my-1" size="lg" placeholder="Enter Topic" required />
            <b-form-input v-model="fm" class="d-flex mx-auto my-1" type="number" size="lg" placeholder="Enter F.M." required />
            <b-input-group size="lg" prepend="Select Test Date">
                <input v-model="date" class="d-flex mx-auto my-1" type="date" required/>
            </b-input-group>
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
                <b-input-group prepend="Upload Paper" v-if="!target.url">
                    <input type="file" class="d-flex mx-auto my-1" :name="qfile" @change="qFileChange" />
                </b-input-group>
                <div class="d-flex m-1 justify-content-end">
                    <b-button-group>
                        <b-button variant="primary" :disabled="qUploadText != 'Upload' || !qfile"
                            @click="addFile" v-if="!target.url">{{ qUploadText }}</b-button>
                        <b-button v-if="target.url" @click="openUrl(target.url)">View</b-button>
                    </b-button-group>
                </div>
            </b-form-group>
            <b-form-group label="Mark Sheet:">
                <b-input-group prepend="Upload Sheet">
                    <input type="file" class="d-flex mx-auto my-1" :name="mfile" @change="mFileChange" accept=".xls,.xlsx,application/msexcel/" />
                </b-input-group>
                <div class="d-flex m-1 justify-content-between">
                    <section><Suspense>
                        <xlsx-workbook>
                            <xlsx-sheet :collection="sheet.data" v-for="sheet in sheets" :key="sheet.name" :sheet-name="sheet.name" />
                            <b-button-group><xlsx-download><b-button>Download</b-button></xlsx-download></b-button-group>
                        </xlsx-workbook>
                    </Suspense></section>
                    <section><xlsx-read :file="mfile">
                        <xlsx-json><template #default="{collection}">
                            <b-button variant="primary" :disabled="mUploadText != 'Upload' || !mfile"
                                @click="data = collection; updateMarks()">{{ mUploadText }}</b-button>
                        </template></xlsx-json>
                    </xlsx-read></section>
                </div>
            </b-form-group>
        </b-form>
    </b-modal>
</template>

<script setup>
import { XlsxWorkbook, XlsxSheet, XlsxDownload, XlsxRead, XlsxJson } from 'vue3-xlsx'
import getCollection from '@/db/getCollection'
import addCollection from '@/db/addDocument'
import useDocument from '@/db/useDocument'
import useStorage from '@/db/useStorage'
import { ref } from 'vue'

const props = defineProps({  
	target: {
		type: Object,
		required: true
	},
})
const emit = defineEmits(['submitClick'])
const topic = ref('')
const fm = ref('')
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
    let test = props.target
    const newTest = {
        course: test.course,
        class: test.class,
        subject: test.subject,
        topic: topic.value,
        fm: Number(fm.value),
        date: date.value,
        marked: false,
        url: '', path: ''
    }
    await (await addCollection('tests'))
    .addDocument('', newTest).then(async(uid) => {
        (async() => {
            const resDocs = students.value.filter((student) => {
                return student.course == test.course && student.class == test.class
            })
            resDocs.forEach(async(doc) => {
                if(!doc.subjects.hasOwnProperty(test.subject))
                    doc.subjects[test.subject] = []

                doc.subjects[test.subject].push({
                    date: date.value, marked: false,
                    topic: topic.value,
                    mark: 0, fm: Number(fm.value)
                })
                await updateStudent(doc)
            })
        })().then(() => {
            emit('submitClick', 'add', { id: uid, ...newTest })
        }).catch((err) => {
            console.log(err)
        })
    }).catch((err) => {
        console.log(err)
    })
}

const qUploadText = ref('Upload')
const addFile = async () => {
    const btn = event.target.closest('.modal-content')
                .querySelector('.btn-close')
    let test = props.target
    let file = qfile.value
    let path = `tests/${test.course + '_' + test.class}/${test.subject}/${file.name}` 
    qUploadText.value = 'Uploading...'

    await useStorage().uploadFile(file, path)
    .then(async(fileRef) => {
        if(fileRef) {
            await (await useDocument('tests', test.id))
            .updateDocs({
                url: fileRef.url,
                path: fileRef.snapshot.metadata.fullPath
            }).then(() => {
                qfile.value = null
                qUploadText.value = 'Upload'
                btn.click()
                test.url = fileRef.url
                test.path = fileRef.snapshot.metadata.fullPath
                emit('submitClick', 'mod', test)
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

const delDoc = async () => {
    let test = props.target
    await (await useDocument('tests', props.target.id))
    .delDoc().then(async() => {        
        (async() => {
            const resDocs = students.value.filter((student) => {
                return student.course == test.course && student.class == test.class
            })
            resDocs.forEach(async(doc) => {
                doc.subjects[test.subject] = doc.subjects[test.subject].filter((sub) => {
                    return sub.date != test.date && sub.topic != test.topic && sub.fm != test.fm
                })
                await updateStudent(doc)
            })
        })().then(() => {
            emit('submitClick', 'del', test)
        }).catch((err) => {
            console.log(err)
        })
    }).catch((err) => {
        console.log(err)
    })
}
const delTest = async () => {
    await useStorage().deleteFile(props.target.path)
    .then(async(res) => {
        if(res) 
            delDoc()
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
const setSheet = async() => {
    let test = props.target
    const docs = students.value.filter((doc) => {
        return doc.course == test.course && doc.class == test.class
    })
    sheets.value[0].name = test.course + '_' + test.class + '_' + test.subject + '_' + test.topic
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
const mUploadText = ref('Upload')
const updateMarks = async() => {
    const btn = event.target.closest('.modal-content')
                .querySelector('.btn-close')
    let test = props.target
    mUploadText.value = 'Uploading...'

    await (await useDocument('tests', test.id))
    .updateDocs({ marked: true })
    .then(async () => {
        (async() => {
            const resDocs = students.value.filter((student) => {
                return student.course == test.course && student.class == test.class
            })
            resDocs.forEach(async(doc) => {
                const obArray = doc.subjects[test.subject]
                const index = obArray.findIndex((ob) => {
                    return ob.date == test.date && ob.topic == test.topic && ob.fm == test.fm
                })
                const mark = data.value.find((ob) => {
                    return ob.id == doc.id
                })
                if(mark) {
                    obArray[index].mark = mark.score
                    obArray[index].marked = true
                }
                await updateStudent(doc)
            })
        })().then(() => {
            test.marked = true
            mfile.value = null
            mUploadText.value = 'Upload'
            btn.click()
            emit('submitClick', 'mod', test)
        }).catch((err) => {
            console.log(err)
        })
    }).catch((err) => {
        console.log(err)
    })
}

defineExpose({ setSheet, delDoc, delTest })
</script>

<style>

</style>
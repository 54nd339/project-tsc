<template>
	<div class="col-md-5 rounded-3 m-2 order-md-2" style="background-color:#57CC99; min-height: 50vh; max-height: 70vh; overflow-y: auto;">
        <div class="shadow m-3 p-1 rounded-3" style="background-color:#80ED99">
            <h3 class="text-center" style>Uploads</h3>
        </div>
        <b-container fluid id="content">
            <b-button-group class="my-1 d-flex">
                <b-form-select v-model="course" :options="courseList" @update:modelValue="loadData" />
                <b-form-select v-model="grade" :options="gradeList" @update:modelValue="loadData" />
                <b-form-select v-model="subject" :options="subjectList" @update:modelValue="loadData" />
                <b-button v-if="course != 'default' && grade != 0 && subject != 'default'"
                    variant="success" v-b-modal.addNote @click="setTarget">Add</b-button>
            </b-button-group>
            <div style="overflow-x:auto"><table class="table table-hover table-responsive">
                <thead><tr>
                    <th scope="col">Topic</th>
                    <th scope="col">Date</th>
                    <th scope="col">View/Delete</th>
                </tr></thead>
                <tbody ref="rows" id="rows">
                    <tr v-for="note in notes" :key="note">
                        <td>{{ note.topic }}</td>
                        <td>{{ note.date.slice(0, 10) }}</td>
                        <td><b-button @click="openUrl(note.url)">View</b-button>
                            <b-button variant="outline-danger" size="sm" class="m-1" @click="delNote(note)">
                            <font-awesome-icon icon="fa-solid fa-trash" size="1x" />
                        </b-button></td>
                    </tr>
                </tbody>
            </table></div>
        </b-container>
    </div>
    <Note :target="targetNote" ref="noteRef" @submitClick="updateRes" />
</template>

<script setup>
import Note from '@/components/Notes.vue'
import getCollection from '@/db/getCollection'
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
const openUrl = (url) => {
    window.open(url)
}

const targetNote = ref({
    id: '',
    course: '',
    class: 0,
    subject: '',
    topic: '',
    url: '',
    path: '',
    date: ''
})
const setTarget = () => {
    targetNote.value.class = grade.value
    targetNote.value.course = course.value
    targetNote.value.subject = subject.value
}
const noteRef = ref()
const delNote = (note) => {
    targetNote.value = note
    setTimeout(() => {
        noteRef.value.delNote()
    }, 100)
}

const notes = ref([])
const loadData = async () => {
    if(course.value == 'default' || grade.value == 0 || subject.value == 'default') {
        return
    }
    notes.value = res.value.filter((note) => {
        return note.course == course.value && note.class == grade.value && note.subject == subject.value
    })
}
const res = ref([])
await (getCollection('notes'))
.getDocuments().then((docs) => {
    res.value = docs
    loadData()
}).catch((err) => {
    console.log(err)
})

const updateRes = async (mod, target) => {
    if (mod == 'add') {
        res.value.push(target)
    } else if (mod == 'del') {
        res.value = res.value.filter((note) => note.id != target.id)
    }
    loadData()
}
</script>

<style>

</style>
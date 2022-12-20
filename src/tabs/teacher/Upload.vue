<template>
	<b-row id="content" class="justify-content-center">
		<b-button-group class="my-1 d-flex mx-6">
			<b-form-select mx-5 p-5 v-model="clas" :options="props.classes" @update:model-value="loadData" />
			<b-button variant="success" :disabled="clas == 'default'" v-b-modal.addNote @click="setTarget">Add</b-button>
		</b-button-group>
		<b-col md="4" v-for="(note, index) in notes" :key="note">
			<b-card border-variant="success" :header="note.topic" align="center" class="m-3" :class="{ shadow: isHover && ind == index }"
				@mouseover="isHover = true; ind = index" @mouseout="isHover = false; ind = -1">
				<div class="d-flex justify-content-between">
					<b-button variant="outline-danger" size="sm" class="m-1" @click="delNote(note)">
						<font-awesome-icon icon="fa-solid fa-trash" size="1x" />
					</b-button>
					<b-button variant="success" @click="openUrl(note.url)">View</b-button>
				</div>
			</b-card>
		</b-col>
	</b-row>
    <Note :target="targetNote" ref="noteRef" @submitClick="updateRes" />
</template>

<script setup>
import Note from '@/components/Notes.vue'
import getCollection from '@/db/getCollection'
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
const isHover = ref(false)
const ind = ref(-1)
const clas = ref('default')
const course = ref('default')
const grade = ref(0)
const subject = ref('default')
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

	notes.value = res.value.filter(note => {
		return note.course == course.value && note.class == grade.value && note.subject == subject.value
	})
}
const res = ref([])
await getCollection('notes')
.getDocuments().then((data) => {
	res.value = data
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
const noteRef = ref()
const delNote = (note) => {
    targetNote.value = note
    setTimeout(() => {
        noteRef.value.delNote()
    }, 100)
}
</script>

<style>

</style>
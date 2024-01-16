<template>
	<b-container fluid id="content">
		<b-button-group class="my-1 d-flex">
			<b-form-select mx-5 p-5 v-model="clas" :options="props.classes" @update:model-value="loadData" />
			<b-button v-if="course != 'default' && grade != 0 && subject != 'default'"
				variant="success" v-b-modal.addTest @click="setTarget">Add</b-button>
		</b-button-group>
		<b-row id="nexttests" class="featurette p-2 m-2">
			<h2 class="featurette-heading pb-md-2">Upcoming Tests</h2>
			<b-col md="4" v-for="(test, index) in nextTests" :key="test">
				<b-card border-variant="success" :header="test.topic" align="center" class="m-3" :class="{ shadow: isHover && ind == index && sec == 'next' }"
				@mouseover="isHover = true; ind = index; sec = 'next'" @mouseout="isHover = false; ind = -1; sec = ''">
					<h6 class="card-subtitle mb-2 text-muted">{{ test.date }}</h6>
					<div class="d-flex justify-content-between">
						<b-button variant="outline-danger" size="sm" class="m-1" @click="delFiles(test);">
                            <font-awesome-icon icon="fa-solid fa-trash" size="1x" />
						</b-button>
						<b-button variant="success" v-b-modal.viewFiles @click="viewFiles(test)">View</b-button>
					</div>
				</b-card>
			</b-col>
		</b-row>
		<hr class="featurette-divider">

		<b-row id="currtests" class="featurette p-2 m-2">
			<h2 class="featurette-heading pb-md-2">Today's Tests</h2>
			<b-col md="4" v-for="(test, index) in tests" :key="test">
				<b-card border-variant="success" :header="test.topic" align="center" class="m-3" :class="{ shadow: isHover && ind == index && sec == 'take' }"
				@mouseover="isHover = true; ind = index; sec = 'take'" @mouseout="isHover = false; ind = -1; sec = ''">
					<h6 class="card-subtitle mb-2 text-muted">{{ test.date }}</h6>
					<div class="d-flex justify-content-between">
						<b-button variant="outline-danger" size="sm" class="m-1" @click="delFiles(test);">
                            <font-awesome-icon icon="fa-solid fa-trash" size="1x" />
						</b-button>
						<b-button variant="success" v-b-modal.viewFiles @click="viewFiles(test)">View</b-button>
					</div>
				</b-card>
			</b-col>
		</b-row>
		<hr class="featurette-divider">

		<b-row id="prevtests" class="featurette p-2 m-2">
			<h2 class="featurette-heading pb-md-2">Previous Tests</h2>
			<b-col md="4" v-for="(test, index) in prevTests" :key="test">
				<b-card border-variant="success" :header="test.topic" align="center" class="m-3" :class="{ shadow: isHover && ind == index && sec == 'prev' }"
				@mouseover="isHover = true; ind = index; sec = 'prev'" @mouseout="isHover = false; ind = -1; sec = ''">
					<h6 class="card-subtitle mb-2 text-muted">{{ test.date }}</h6>
					<div class="d-flex justify-content-between">
						<b-button variant="outline-danger" size="sm" class="m-1" @click="delFiles(test);">
                            <font-awesome-icon icon="fa-solid fa-trash" size="1x" />
						</b-button>
						<b-button variant="success" v-b-modal.viewFiles @click="viewFiles(test)">View</b-button>
					</div>
				</b-card>
			</b-col>
		</b-row>
	</b-container>
    <Test :target="targetTest" ref="testRef" @submitClick="updateRes" />
</template>

<script setup>
import Test from '@/components/Test.vue'
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
const sec = ref('')
const clas = ref('default')
const course = ref('default')
const grade = ref(0)
const subject = ref('default')
const targetTest = ref({
    id: '',
    course: '',
    class: 0,
    subject: '',
    topic: '',
    fm: '',
    date: '',
    marked: false,
    url: '', path: ''
})
const setTarget = () => {
    targetTest.value.class = grade.value
    targetTest.value.course = course.value
    targetTest.value.subject = subject.value
}

const testRef = ref()
const viewFiles = (test) => {
    targetTest.value = test
    setTimeout(() => {
        testRef.value.setSheet()
    }, 100)
}
const delFiles = (test) => {
    targetTest.value = test
    setTimeout(() => {
        test.url ? testRef.value.delTest() : testRef.value.delDoc()
    }, 100)
}

const prevTests = ref([])
const tests = ref([])
const nextTests = ref([])
const loadData = async() => {
	if(clas.value == 'default') {
		return
	}
	const today = new Date().toJSON().slice(0, 10)
	const arr = clas.value.split('_')
	if(arr.length == 3)
		[course.value, grade.value, subject.value] = [arr[0], Number(arr[1]), arr[2]]
	else
		[course.value, grade.value, subject.value] = [arr[0]+'_'+arr[1], Number(arr[2]), arr[3]]

	const docs = res.value.filter(doc => {
		return doc.course == course.value && doc.class == grade.value && doc.subject == subject.value
	})

	prevTests.value = []
	tests.value = []
	nextTests.value = []

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
const res = ref([])
await getCollection('tests')
.getDocuments().then((data) => {
	res.value = data
	loadData()
}).catch((err) => {
	console.log(err)
})

const updateRes = (mod, target) => {
	if(mod == 'add') {
		res.value.push(target)
	} else if(mod == 'del') {
		res.value = res.value.filter(doc => {
			return doc.id != target.id
		})
	} else if(mod == 'edit') {
		res.value = res.value.map(doc => {
			return doc.id == target.id ? target : doc
		})
	}
	loadData()
}
</script>

<style>

</style>
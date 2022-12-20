<template>
	<div class="col-md-5 rounded-3 m-2" style="background-color:#80ED99; min-height: 50vh; max-height: 70vh; overflow-y: auto;">
        <div class="shadow m-3 p-1 rounded-3" style="background-color:#57CC99">
            <h3 class="text-center" style>Schedule Test</h3>
        </div>
        <b-container fluid id="content">
            <b-button-group class="my-1 d-flex">
                <b-form-select v-model="course" :options="courseList" @update:modelValue="loadData" />
                <b-form-select v-model="grade" :options="gradeList" @update:modelValue="loadData" />
                <b-form-select v-model="subject" :options="subjectList" @update:modelValue="loadData" />
                <b-button v-if="course != 'default' && grade != 0 && subject != 'default'"
                    variant="success" v-b-modal.addTest @click="setTarget">Add</b-button>
            </b-button-group>
            <div style="overflow-x:auto"><table class="table table-hover table-responsive">
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
                        <td><b-button v-b-modal.viewFiles @click="viewFiles(test)">View</b-button></td>
                        <td><b-button variant="outline-danger" size="sm" class="m-1" @click="delFiles(test);">
                            <font-awesome-icon icon="fa-solid fa-trash" size="1x" />
                        </b-button></td>
                    </tr>
                </tbody>
            </table></div>
        </b-container>
    </div>
    <Test :target="targetTest" ref="testRef" @submitClick="updateRes" />
</template>

<script setup>
import Test from '@/components/Test.vue'
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

const tests = ref([])
const loadData = async () => {
    if(course.value == 'default' || grade.value == 0 || subject.value == 'default') {
        return
    }
    tests.value = res.value.filter((test) => {
        return test.course == course.value && test.class == grade.value && test.subject == subject.value
    })
    setTarget()
}
const res = ref([])
await getCollection('tests', '', '', ['date', 'desc'])
.getDocuments().then((doc) => {
    res.value = doc
    loadData()
}).catch((err) => {
    console.log(err)
})

const updateRes = (mod, target) => {
    if (mod == 'add') {
        res.value.push(target)
    }
    else if (mod == 'del') {
        res.value = res.value.filter((test) => test.id != target.id)
    }
    else if (mod == 'mod') {
        res.value = res.value.map((test) => {
            return test.id == target.id ? target : test
        })
    }
    loadData()
}
</script>

<style>

</style>
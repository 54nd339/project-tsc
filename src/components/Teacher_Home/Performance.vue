<template>
    <div class="col-md-5 rounded-3 m-2" style="background-color:#80ED99; min-height: 60vh; max-height: 70vh; overflow-y: auto;">
        <div class="shadow m-3 py-1 rounded-3 p-md-2" style="background-color:#57CC99">
            <h3 class="text-center" style>Performance Analytics</h3>
        </div>
        <div class="d-flex justify-content-center mx-md-3">
            <b-input-group :prepend="cls">
                <b-form-select v-model="student" :options="students" />
            </b-input-group>
        </div>
        <ViewChart chartId="performChart" :scores="student.subjects[subject]"
				:course="course" :grade="grade" :sub="subject" :key="student" />
		<div class="d-flex mb-1 justify-content-center">
			<b-button variant="primary" v-b-modal.viewChart>View</b-button>
		</div>
		<b-modal size="lg" id="viewChart" title="Your Performance" aria-labelledby="ViewChart" aria-hidden="true" :hide-footer="true">
			<ViewChart chartId="performChartModal" :scores="student.subjects[subject]"
				:course="course" :grade="grade" :sub="subject" :key="student" />
		</b-modal>
    </div>
</template>

<script setup>
import ViewChart from '@/components/ViewChart.vue'
import getCollection from '@/db/getCollection'
import { ref } from 'vue'

const props = defineProps({
    cls: {
        type: String,
        required: true
    }
})
const course = ref('default')
const grade = ref(0)
const subject = ref('default')

const placeholder = {
    subjects: {}
}
const students = ref([
	{ value: placeholder, text: 'All' }
])
const student = ref(placeholder)

const loadData = async() => {
	if(props.cls == 'default') {
		return
	}

	const arr = props.cls.split('_')
	if(arr.length == 3)
		[course.value, grade.value, subject.value] = [arr[0], Number(arr[1]), arr[2]]
	else
		[course.value, grade.value, subject.value] = [arr[0]+'_'+arr[1], Number(arr[2]), arr[3]]

	await getCollection('students', ['course', '==', course.value],
		['class', '==', grade.value], '', '')
		.getDocuments().then((docs) => {
            if(docs) {
                docs.forEach((doc) => {
                    students.value.push({ value: doc, text: doc.name })
                })
            }
		}).catch((err) => {
			console.log(err)
		})
}

loadData()
</script>

<style>

</style>
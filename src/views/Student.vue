<template>
	<main role="main" id="content" class="tab-content mt-3 mb-4" style="min-height: 85vh;">
		<div id="home" class=" tab-pane fade show active tab-content" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
			<Home :subjects="subjectList" :user="student" />
		</div>
		<div id="download" class="tab-pane fade tab-content" role="tabpanel" aria-labelledby="pills-courses-tab" tabindex="0">
			<Download :subjects="subjectList" :user="student" />
		</div>
		<div id="exam" class="tab-pane fade tab-content" role="tabpanel" aria-labelledby="pills-success-tab" tabindex="0">
			<Exam :subjects="subjectList" :user="student" />     
		</div>
		<div id="feedback" class="tab-pane fade tab-content" role="tabpanel" aria-labelledby="pills-about-tab" tabindex="0">
			<Feedback :user="student" v-if="student.feedback != 'default'" @submitClick="refresh" :key="student.feedback" />
			<div v-else class="blank">
				<div class="blank-icon">⚠</div>
				<div class="blank-title">The form is not available at the moment</div>
				<div class="blank-desc">Contact admins for further queries</div>
			</div>
		</div>
	</main>
</template>

<script setup>
import Home from '@/tabs/student/Home.vue'
import Download from '@/tabs/student/Download.vue'
import Exam from '@/tabs/student/Exam.vue'
import Feedback from '@/tabs/student/Feedback.vue'

import useDocument from '@/db/useDocument'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const subjectList = [
	{ value: 'default', text: 'Select Subject'},
	{ value: 'eng1', text: 'English 1'},
	{ value: 'eng2', text: 'English 2'},
	{ value: 'odia', text: 'Odia'},
	{ value: 'hindi', text: 'Hindi'},
	{ value: 'math', text: 'Mathematics'},
	{ value: 'comp', text: 'Computers'},
	{ value: 'sci', text: 'Science'},
	{ value: 'phys', text: 'Physics'},
	{ value: 'chem', text: 'Chemistry'},
	{ value: 'bio', text: 'Biology'},
	{ value: 'sst', text: 'Social Science'},
	{ value: 'hist', text: 'History'},
	{ value: 'geo', text: 'Geography'}
]

const id = useRoute().params.id
const student = ref({})
await(await useDocument('students', id))
.getDetail().then((data) => {
	student.value = data
}).catch((err) => {
	console.log(err)
})

const refresh = async() => {
	await(await useDocument('students', id))
	.getDetail().then((data) => {
		student.value = data
	}).catch((err) => {
		console.log(err)
	})
}

</script>

<style>
.body {
	margin-top: 5vh;
	margin-bottom: 5vh;
}

.blank {
  text-align: center;
}
.blank-icon {
  color: gray;
  font-size: 4rem;
}
.blank-title {
  font-size: 1.6rem;
}
.blank-desc {
  font-size: 1rem;
  color: gray;
}
</style>
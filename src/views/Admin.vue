<template>
  	<main role="main" id="content" class="tab-content mt-3 mb-4" style="min-height: 85vh;">
		<div id="home" class="tab-pane fade show active tab-content" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
			<Home :courses="courseList" :grades="gradeList" :subjects="subjectList" />
		</div>
		<div id="students" class="tab-pane fade tab-content" role="tabpanel" aria-labelledby="pills-courses-tab" tabindex="0">
			<Students :courses="courseList" :grades="gradeList" :subjects="subjectList" />
		</div>
		<div id="teachers" class="tab-pane fade tab-content" role="tabpanel" aria-labelledby="pills-success-tab" tabindex="0">
            <Teachers :courses="courseList" :grades="gradeList" :subjects="subjectList" />
		</div>
		<div id="pending" class="tab-pane fade tab-content" role="tabpanel" aria-labelledby="pills-success-tab" tabindex="0">
            <Pending />
		</div>
        <div id="site" class="tab-pane fade tab-content" role="tabpanel" aria-labelledby="pills-about-tab" tabindex="0">
            <Site />
		</div>
	</main>
</template>

<script setup>
import Home from '@/tabs/admin/Home.vue'
import Students from '@/tabs/admin/Students.vue'
import Teachers from '@/tabs/admin/Teachers.vue'
import Pending from '@/tabs/admin/Pending.vue'
import Site from '@/tabs/admin/Site.vue'

const gradeList = [
	{ value: 0, text: 'All'},
    { value: 5, text: '5' },
    { value: 6, text: '6' },
    { value: 7, text: '7' },
    { value: 8, text: '8' },
    { value: 9, text: '9' },
    { value: 10, text: '10' },
    { value: 11, text: '11' },
    { value: 12, text: '12' }
]
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
const courseList = [
	{ value: 'default', text: 'Select Course'},
	{ value: 'ICSE', text: 'ICSE' },
	{ value: 'CBSE', text: 'CBSE' },
	{ value: 'CHSE', text: 'CHSE' },
	{ value: 'JEE_NEET', text: 'JEE/NEET' }
]

</script>

<style>
.body {
	margin-top: 5vh;
    margin-bottom: 5vh;
}
</style>
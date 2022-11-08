<template>
  	<main role="main" id="content" class="tab-content mt-3 mb-5" style="min-height: 85vh;">
		<div id="home" class=" tab-pane fade show active tab-content" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
			<Home :user="teacher" :classes="cls" />
		</div>
		<div id="upload" class="tab-pane fade tab-content" role="tabpanel" aria-labelledby="pills-courses-tab" tabindex="0">
			<Upload :user="teacher" :classes="cls" />
		</div>
		<div id="exam" class="tab-pane fade tab-content" role="tabpanel" aria-labelledby="pills-success-tab" tabindex="0">
            <Exam :user="teacher" :classes="cls" />
		</div>
	</main>
</template>

<script setup>
import Home from '@/tabs/teacher/Home.vue'
import Upload from '@/tabs/teacher/Upload.vue'
import Exam from '@/tabs/teacher/Exam.vue'

import useDocument from '@/db/useDocument'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const id = useRoute().params.id
const teacher = ref({})
const cls = ref(['default'])
await(await useDocument('teachers', id))
.getDetail().then((data) => {
	if(data) {
		teacher.value = data
		let classes = data.classes
		for (const clas in classes){
			if (classes[clas].length > 0) {
				classes[clas].forEach((c) => {
					cls.value.push(clas + '_' + c)
				})
			}
		} 
	}
}).catch((err) => {
	console.log(err)
})
</script>

<style>
.body {
	margin-top: 5vh;
  	margin-bottom: 5vh;
}
</style>
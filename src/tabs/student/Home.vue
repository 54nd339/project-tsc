<template>
 	<b-container fluid id="content">
		<b-row align-h="center">
			<Personal :student="user" :subjectList="subjects" 
				@subChanged="updateSub" />
			<Performance :student="user" :subject="sub" :key="sub" />
		</b-row>
		<b-row align-h="center">
			<UpcomingTest :student="user" />
			<Timetable :student="user" />
		</b-row>
	</b-container>
</template>

<script setup>
import Personal from '@/components/Student_Home/Personal.vue'
import Performance from '@/components/Student_Home/Performance.vue'
import UpcomingTest from '@/components/Student_Home/UpcomingTest.vue'
import Timetable from '@/components/Student_Home/Timetable.vue'
import { ref } from 'vue'

const props = defineProps({
	subjects: {
		type: Array,
		required: true
	},
	user: {
		type: Object,
		required: true
	}
})
const sub = ref('default')
const updateSub = (subject) => {
	sub.value = subject
}
</script>

<style>

</style>
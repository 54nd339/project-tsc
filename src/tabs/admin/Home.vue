<template>
	<div id="content" class="container-fluid">
		<div class="row justify-content-center">
			<TimeTable :courseList="courses" :gradeList="grades" :subjectList="subjects" />
			<Tests :courseList="courses" :gradeList="grades" :subjectList="subjects" />
		</div>
		<div class="row justify-content-center">
			<Uploads :courseList="courses" :gradeList="grades" :subjectList="subjects" />
			<Admins />
		</div>
	</div>
</template>

<script setup>
import Admins from '@/components/Admin_View/Admins.vue'
import Tests from '@/components/Admin_View/Tests.vue'
import TimeTable from '@/components/Admin_View/TimeTable.vue'
import Uploads from '@/components/Admin_View/Uploads.vue'

const props = defineProps({  
	courses: {
		type: Array,
		required: true
	},
	grades: {
		type: Array,
		required: true
	},
	subjects: {
		type: Array,
		required: true
	}
})

// Do something
</script>

<style>

</style>
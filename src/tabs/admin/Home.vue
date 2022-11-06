<template>
	<div id="content" class="container-fluid">
		<div class="row justify-content-center">
			<Suspense><TimeTable :gradeList="grades" :subjectList="subjects" /></Suspense>
			<Suspense><Tests :gradeList="grades" :subjectList="subjects" /></Suspense>
		</div>
		<div class="row justify-content-center">
			<Suspense><Uploads :gradeList="grades" :subjectList="subjects" /></Suspense>
			<Suspense><Admins /></Suspense>
		</div>
	</div>
</template>

<script setup>
import Admins from '@/components/Admin_View/Admins.vue'
import Tests from '@/components/Admin_View/Tests.vue'
import TimeTable from '@/components/Admin_View/TimeTable.vue'
import Uploads from '@/components/Admin_View/Uploads.vue'

const props = defineProps({  
	grades: {
		type: Array,
		required: true
	},
	subjects: {
		type: Array,
		required: true
	}
})
</script>

<style>

</style>
<template>
	<div id="content" class="container-fluid">
		<div id="grid" class="row featurette justify-content-center">
			<Suspense><TimeTable :gradeList="grades" :subjectList="subjects" /></Suspense>
			<Suspense><Tests :gradeList="grades" :subjectList="subjects" /></Suspense>
		</div>
		<div class="row justify-content-center">
			<Suspense><Uploads :gradeList="grades" :subjectList="subjects" /></Suspense>
			<Suspense><Admins /></Suspense>
		</div>
		<hr class="featurette-divider">

		<div id="enquiries" class="row featurette">
			<div class="col-md-12">
				<h2 class="featurette-heading pb-md-2">Enquiries</h2>
				<section class="container-fluid">
					<Suspense><Enquiries :gradeList="grades" :subjectList="subjects" /></Suspense>
				</section>
			</div>
		</div>
	</div>
</template>

<script setup>
import Admins from '@/components/Admin_Home/Admins.vue'
import Enquiries from '@/components/Admin_Home/Enquiries.vue'
import Tests from '@/components/Admin_Home/Tests.vue'
import TimeTable from '@/components/Admin_Home/TimeTable.vue'
import Uploads from '@/components/Admin_Home/Uploads.vue'

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
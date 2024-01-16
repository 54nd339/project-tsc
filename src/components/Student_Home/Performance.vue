<template>
    <div class="col-md-5 rounded-3 m-2" style="background-color:#80ED99; min-height: 50vh; max-height: 70vh; overflow-y: auto;">
        <div class="shadow m-3 py-1 rounded-3 p-md-2" style="background-color:#57CC99">
            <h3 class="text-center" style>Performance Analytics</h3>
        </div>
		<ViewChart chartId="performChart" :scores="student.subjects[subject]"
				:course="student.course" :grade="student.class" :sub="subject" />
		<div class="d-flex mb-1 justify-content-center">
			<b-button variant="primary" v-b-modal.viewChart>View</b-button>
		</div>
    </div>
	<b-modal size="lg" id="viewChart" title="Your Performance" aria-labelledby="ViewChart" aria-hidden="true" :hide-footer="true">
		<ViewChart chartId="performChartModal" :scores="student.subjects[subject]"
			:course="student.course" :grade="student.class" :sub="subject" />
	</b-modal>
</template>

<script setup>
import ViewChart from '@/components/ViewChart.vue'

const props = defineProps({
	subject: {
		type: String,
		required: true
	},
	student: {
		type: Object,
		required: true
	}
})
</script>

<style>

</style>
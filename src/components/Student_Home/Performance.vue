<template>
    <div class="col-md-5 rounded-3 m-3" style="background-color:#57CC99; min-height: 45vh">
        <div class="shadow m-3 py-1 rounded-3 p-md-2" style="background-color:#80ED99">
            <h3 class="text-center" style>Performance Analytics</h3>
        </div>
		<div class="chart-container d-flex mb-1 justify-content-center" style="height:35vh;">
			<canvas id="chart"></canvas>
		</div>
		<div class="d-flex mb-1 justify-content-center">
			<b-button variant="primary" @click="viewModal" v-b-modal.viewChart>View</b-button>
		</div>
		<b-modal size="lg" id="viewChart" title="Your Performance" aria-labelledby="ViewChart" aria-hidden="true" :hide-footer="true">
			<div class="chart-container">
				<canvas id="modal-chart"></canvas>
			</div>
		</b-modal>
    </div>
</template>

<script setup>
import getCollection from '@/db/getCollection'
import { ref } from 'vue'
import Chart from 'chart.js/auto'

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
const selected = ref([])
var fms = [], highest = [], avg = [], myMarks = [], xValues = []
const loadData = async() => {
	if(props.subject === 'default') {
		selected.value = []
		return
	}

	const marks = props.student.subjects[props.subject]
	marks.forEach(mark => {
		if(mark.marked) {
			selected.value.push(mark)
			myMarks.push(mark.mark)
			fms.push(mark.fm)
			xValues.push(mark.date)
		}
	})
	// console.log(myMarks, fms)

	const length = selected.value.length
	await(getCollection('students', ['course', '==', props.student.course],
		['class', '==', props.student.class], '', ''))
		.getDocuments().then(async (docs) => {
			// console.log(docs)
			const res = []
			if(docs) {
				docs.forEach(doc => {
					const studentMarks = doc.subjects[props.subject]
					const subres = []
					studentMarks.forEach(mark => {
						if(mark.marked) {
							subres.push(mark.mark)
						}
					})
					res.push(subres)
				})
			}
			// console.log(res)

			let count = 0
			for(let i = 0; i < length; i++) {
				let sum = 0, max = 0
				res.forEach(subres => {
					if(subres[i]) {
						sum += subres[i]
						if(subres[i] > max) {
							max = subres[i]
						}
						count++
					}
				})
				highest.push(max)
				avg.push(sum / count)
			}
			// console.log(highest, avg)

			const ctx = document.getElementById('chart')
			makeChart(ctx)
		})
}

const viewModal = () => {
	const ctx = document.getElementById('modal-chart')
	makeChart(ctx)
}
const makeChart = (ctx) => {
	new Chart(ctx, {
		type: "line",
		data: {
			labels: xValues,
			datasets: [{
					label: "F.M.",
					data: fms,
					borderColor: "red",
					fill: false
				}, {
					label: "Highest",
					data: highest,
					borderColor: "green",
					fill: false
				}, {
					label: "Average",
					data: avg,
					borderColor: "blue",
					fill: false
				}, {
					label: "My Marks",
					data: myMarks,
					borderColor: "orange",
					fill: false
				}]
		},
	})
}

loadData()
</script>

<style>

</style>
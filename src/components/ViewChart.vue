<template>
    <div class="chart-container">
        <canvas :id="chartId"></canvas>
    </div>
</template>

<script setup>
import getCollection from '@/db/getCollection'
import { ref } from 'vue'
import Chart from 'chart.js/auto'

const props = defineProps({
	scores: {
		type: Array,
        default: []
	},
	course: {
		type: String,
		required: true
	},
	grade: {
		type: Number,
		required: true
	},
	sub: {
		type: String,
        required: true
	},
    chartId: {
        type: String,
        required: true
    }
})

const loadData = async() => {
	let xValues = [], fms = [], highest = [], avg = []
	const marks = ref([])
	if(props.sub === 'default') {
		return
	}

	const dataset = ref([])
	if(props.scores.length > 0) {
		props.scores.forEach(score => {
			if(score.marked) {
				marks.value.push(score.mark)
			}
		})
		dataset.value.push({
			label: "Marks",
			data: marks.value,
			borderColor: "blue",
			fill: false
		})
	}

	await(getCollection('students', ['course', '==', props.course],
		['class', '==', props.grade], '', ''))
		.getDocuments().then(async (docs) => {
			const res = []
			if(docs) {
				docs.forEach((doc, index) => {
					const studentMarks = doc.subjects[props.sub]
					const subres = []
					if(studentMarks)
						studentMarks.forEach(mark => {
							if(mark.marked) {
								subres.push(mark.mark ? mark.mark : 0)
								if(index === 0) {
									xValues.push(mark.date)
									fms.push(mark.fm)
								}
							}
						})
						res.push(subres)
				})
			}
			// console.log(res)

			let count = res.length
			for(let i = 0; i < count; i++) {
				let sum = 0, max = 0
				res.forEach(subres => {
					if(subres[i]) {
						sum += subres[i]
						if(subres[i] > max) {
							max = subres[i]
						}
					}
				})
				highest.push(max)
				avg.push(sum / count)
			}
			// console.log(highest, avg)

			dataset.value.push({
				label: "Highest",
				data: highest,
				borderColor: "red",
				fill: false
			})
			dataset.value.push({
				label: "Average",
				data: avg,
				borderColor: "orange",
				fill: false
			})
			dataset.value.push({
				label: "Full Marks",
				data: fms,
				borderColor: "green",
				fill: false
			})
			const ctx = document.getElementById(props.chartId)
            new Chart(ctx, {
				type: "line",
				data: {
					labels: xValues,
					datasets: dataset.value
				},
			})
		})
}

loadData()
</script>

<style>

</style>
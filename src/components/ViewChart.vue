<template>
	<div class="chart-container">
        <canvas :id="chartId"></canvas>
    </div>
</template>

<script setup>
import getCollection from '@/db/getCollection'
import { onMounted, ref } from 'vue'
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

const students = ref([])
await(getCollection('students'))
.getDocuments().then((docs) => {
	students.value = docs
}).catch((err) => {
	console.log(err)
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

	let count = 1
	const selected = students.value.filter(student => {
		return student.course === props.course && student.class === props.grade
	})
	const res = []
	count = selected.length
	selected.forEach((student, index) => {
		const studentMarks = student.subjects[props.sub]
		const subres = [], tempxValues = [], tempfms = []
		if(studentMarks)
			studentMarks.forEach(mark => {
				if(mark.marked) {
					subres.push(mark.mark ? mark.mark : 0)
					tempxValues.push(mark.date)
					tempfms.push(mark.fm)
				}
			})
			res.push(subres)
			if(tempxValues.length > xValues.length) {
				xValues = tempxValues
				fms = tempfms
			}
	})

	for(let i = 0; i < fms.length; i++) {
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
	}	// console.log(count, highest, avg)

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

	onMounted(() => {
		const ctx = document.getElementById(props.chartId)
		new Chart(ctx, {
			type: "line",
			data: {
				labels: xValues,
				datasets: dataset.value
			},
			// options: {
			// 	scales: {
			// 		y: {
			// 			beginAtZero: true
			// 		}
			// 	}
			// }
		})
	})
}
loadData()
</script>

<style>

</style>
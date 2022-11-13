<template>
	<b-modal id="addMarks" title="add Marks" aria-labelledby="addMarks" aria-hidden="true" :hide-footer="true">
		<b-form>
			<b-button-group class="my-1 d-flex">
				<b-form-select :disabled="selected != 0" v-model="course" :options="crs"
					@update:model-value="setTests" />
				<b-form-select :disabled="selected != 0" v-model="grade" :options="classes"
					@update:model-value="setTests" />
				<b-form-select :disabled="selected != 0" v-model="subject" :options="subs"
					@update:model-value="setTests" />
				<b-form-select :disabled="selected != 0 || course == 'default' || grade == 0 || subject == 'default'"
					v-model="test" :options="tests" @update:model-value="print" />
			</b-button-group>
			// input
			<div class="d-flex mb-1 justify-content-end">
				<b-button-group>
					<b-button type="reset" variant="danger" size="lg" @click="reset()">Reset</b-button>
					<b-button
						:disabled="course == 'default' || grade == 0 || subject == 'default' || test.text == 'default'"
						variant="primary" size="lg" @click="upload">Upload Marks</b-button>
					<b-button :disabled="course == 'default' || grade == 0 || subject == 'default'" variant="primary"
						size="lg" @click="download">Download Sheet</b-button>
				</b-button-group>
			</div>
			<div v-if="selected == 1">
				<h3>Upload XLSX</h3>
				<input type="file" @change="onChange" />
				<xlsx-read :file="file">
					<!-- <xlsx-table /> -->
					<xlsx-json>
						<template #default="{ collection }">
							<div>
								<!-- {{ collection }} -->
								<button v-if="file" @click="uploadSubmit(collection)">Submit</button>
							</div>
						</template>
					</xlsx-json>
				</xlsx-read>
			</div>
			<div v-if="selected == 2">
				<h3>Downloading XLSX</h3>
				<xlsx-workbook>
					<xlsx-sheet :collection="sheet.data" v-for="sheet in sheets.value" :key="sheet.name"
						:sheet-name="sheet.name" />
					<xlsx-download>
						<button>Download</button>
					</xlsx-download>
					<!-- <xlsx-download disable-wrapper-click>
						<template #default="{ download }">
							<button @click="download">Download with slot scope</button>
						</template>
					</xlsx-download> -->
				</xlsx-workbook>
			</div>

		</b-form>
	</b-modal>
</template>

<script setup>
import { ref } from 'vue'
import getCollection from '@/db/getCollection';
import { XlsxRead, XlsxTable, XlsxJson, XlsxWorkbook, XlsxSheet, XlsxDownload } from "vue3-xlsx/dist/vue3-xlsx.cjs.prod.js";

const props = defineProps({
	crs: {
		type: Array,
		required: true,
	},
	classes: {
		type: Array,
		required: true,
	},
	subs: {
		type: Array,
		required: true,
	},
});

const course = ref('default');
const grade = ref(0);
const subject = ref('default');
const selected = ref(0);
const students = ref([]);
const file = ref(null)
const sheets = ref({ name: 'Sheet 1', data: [] })

const test = ref({
	text: 'default',
	value: 'default'
})
const res = ref([])
const tests = ref([])

await getCollection('tests', ['marked', '==', false], '', '', '').getDocuments().then((doc) => {
	res.value = doc
	console.log(res)
})

const print = () => {
	// const output = res.value.filter((item) => {
	// 	return item.course == course.value && item.grade == grade.value && item.subject == subject.value
	// })
	// console.log(test.value);
	// console.log(test)
	// const temp = student.subjects[subject.value].filter((sub) => {
	// 	sub.topic == test.topic && sub.date == testdate
	// })
	// console.log(temp);
	// temp.forEach((t) => {
	// 	tests.value.push({ text: t.topic + '(' + t.date + ')', value: t })
	// })
}

const reset = () => {
	course.value = 'default'
	grade.value = 0
	subject.value = 'default'
	test.value = {
		text: 'default',
		value: 'default'
	}
	selected.value = 0
}

// upload logic here
const uploadSubmit = (cool) => {
	console.log(cool[0]);
}

const onChange = (event) => {
	file.value = event.target.files ? event.target.files[0] : null;
}

const upload = async () => {
	selected.value = 1
	await fetchStudents().then(() => {
		console.log(students.value)
	})
}

// download logic here
const download = async () => {
	selected.value = 2
	await fetchStudents().then(() => {
		students.value.forEach((s) => {
			console.log(s.id, s.name, s.subjects)
			const temp = s.subjects[subject.value].filter((sub) => sub.topic == test.value.topic && sub.date == test.value.date)
			console.log(sheets.value.data);
			const pp = {
				'ID': s.id,
				'Name': s.name,
				'Marks': temp[0].marks
			}
			sheets.value.data.push(pp)
		})
	})
	console.log(sheets.value.data);
}

const setTests = () => {
	if (course.value == 'default' || grade.value == 0 || subject.value == 'default') {
		tests.value = []
	} else {
		const temp = res.value.filter((t) => t.course == course.value && t.class == grade.value && t.subject == subject.value)
		console.log(temp)
		temp.forEach((t) => {
			tests.value.push({ text: t.topic + '(' + t.date + ')', value: t })
		})
	}
}

const fetchStudents = async () => {
	// console.log(course, grade, subject, test);
	await getCollection('students', ['class', '==', grade.value], ['course', '==', course.value], '', '').getDocuments().then((doc) => {
		students.value = doc
		console.log(students.value)
	})
}

</script>

<style>

</style>
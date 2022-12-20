<template>
	<b-container fluid id="content">
		<b-button-group class="my-1 d-flex">
			<b-form-select v-model="course" :options="courses" @update:modelValue="loadData" />
			<b-form-select v-model="grade" :options="grades" @update:modelValue="loadData" />
			<b-form-select v-model="subject" :options="subjects" />
		</b-button-group>
		<b-button-group class="my-1 d-flex">
			<b-button v-b-modal.promoteAll>Promote All</b-button>
			<b-button v-b-modal.resetStudent>Reset Attendance</b-button>
			<b-button v-b-modal.closeFeedback v-if="course != 'default' && grade != 0 && subject != 'default' && openfb">Close Feedback</b-button>
			<b-button v-if="course != 'default' && grade != 0 && subject != 'default' && !openfb" @click="openFeedback">Open Feedback</b-button>
			<b-button @click="editMode = !editMode; if(!editMode) saveEdits()">{{ editMode ? 'Save Edits' : 'Enter Edit Mode' }}</b-button>
			<b-button @click="fetchData">Refresh</b-button>
		</b-button-group>
		<b-button-group class="my-1">
			<b-button v-if="grade != 0 && course != 'default'" variant="success" v-b-modal.addStudent>Add</b-button>
			<b-button v-if="selected.length > 0" variant="danger" v-b-modal.deleteStudent>Delete</b-button>
			<b-button v-if="selected.length == 1" variant="primary" v-b-modal.modifyStudent @click="$refs.modUser.loadData">Modify</b-button>
			<b-button v-if="selected.length > 0" variant="primary" v-b-modal.saveSAttendance>Add attendance</b-button>
		</b-button-group>
		<div style="overflow-x:auto"><table class="table table-hover table-responsive">
			<thead><tr>
				<th scope="col" v-if="editMode">
					<b-button variant="outline-success" size="sm" @click="selectAll">
						<font-awesome-icon icon="fa-solid fa-check" size="1x" />
					</b-button>
				</th>
				<th scope="col">Name</th>
				<th scope="col" v-if="course == 'default'">Course</th>
				<th scope="col" v-if="grade == 0">Class</th>
				<th scope="col">Phone</th>
				<th scope="col">Email</th>
				<th scope="col">Attendance</th>
				<th scope="col" v-if="subject != 'default'">Marks</th>
			</tr></thead>
			<tbody ref="rows" id="rows">
				<tr v-for="student in students" :key="student">
					<td v-if="editMode"><b-form-checkbox :value="student.id" @click="updateSelected" /></td>
					<td>{{ student.name }}</td>
					<td v-if="course == 'default'"><tr>
						<td v-if="!editMode">{{ student.course }}</td>
						<td v-else>
							<b-input-group :prepend="student.course">
								<b-form-select v-model="student.course" :options="courses" />
							</b-input-group>
						</td>
					</tr></td>
					<td v-if="grade == 0"><tr>
						<td v-if="!editMode">{{ student.class }}</td>
						<td v-else>
							<b-input-group :prepend="student.class">
								<b-form-select v-model="student.class" :options="grades" />
							</b-input-group>
						</td>
					</tr></td>
					<td>{{ student.phone }}</td>
					<td>{{ student.email }}</td>
					<td><tr>
						<td v-if="!editMode">{{ student.attendance }}/ 30</td>
						<td v-else>
							<b-input-group :prepend="student.attendance">
								<b-form-input type="number" v-model="student.attendance" />
							</b-input-group>
						</td>
					</tr></td>
					<td v-if="subject != 'default'">
						<b-button v-if="!editMode" variant="primary" v-b-modal.viewStudentChart @click="target = student">View</b-button>
						<div v-else>
							<tr v-for="(mark) in student.subjects[subject]" :key="mark">
								<td class="mx-2">{{ mark.topic }} ({{ mark.date }})</td>
								<td><b-input-group :prepend="mark.mark ? mark.mark : 0" :append="`/${mark.fm}`">
									<b-form-input @blur="handleUpdate(mark, $event)" type="number" />
								</b-input-group></td>
							</tr>
						</div>
					</td>
				</tr>
			</tbody>
		</table></div>
		<AddUser title="Student" :cls="grade" :crs="course" @submitClick="addStudent"/>
		<ModifyUser title="Student" :id="docID" ref="modUser" @submitClick="modStudent"/>
		<DeleteModal title="Student" :ids="selected" @submitClick="delStudent"/>
		<ResetUser title="Student" :ids="students" @submitClick="resetAtt"/>
		<b-modal id="saveSAttendance" title="Save Attendance" aria-labelledby="saveAtt" aria-hidden="true" :hide-footer="true">
			<b-form @submit="saveAtt">
				<p class="justify-content-center align-items-center" id="promoteText">Save Attendance</p>
				<b-button type="submit" variant="success d-flex mx-auto mt-2" size="lg">Save</b-button>
			</b-form>
		</b-modal>
		<b-modal id="promoteAll" title="Promote" aria-labelledby="promoteAll" aria-hidden="true" :hide-footer="true">
			<b-form @submit="promoteAll">
				<p class="justify-content-center align-items-center" id="promoteText">Confirm Promote?</p>
				<b-button type="submit" variant="success d-flex mx-auto mt-2" size="lg">Promote</b-button>
			</b-form>
		</b-modal>
		<b-modal id="closeFeedback" title="Close Feedback" aria-labelledby="close Feedback" aria-hidden="true" :hide-footer="true">
			<b-form @submit="closeFeedback">
				<p class="justify-content-center align-items-center" id="promoteText">Confirm Close?</p>
				<b-button type="Close" variant="danger d-flex mx-auto mt-2" size="lg">Close</b-button>
			</b-form>
		</b-modal>
		<b-modal size="lg" id="viewStudentChart" title="Performance" aria-labelledby="ViewChart" aria-hidden="true" :hide-footer="true">
			<ViewChart chartId="studentPerformModal" :scores="target.subjects[subject]"
				:course="target.course" :grade="target.class" :sub="subject" :key="JSON.stringify(target) + subject" />
		</b-modal>
	</b-container>
</template>

<script setup>
import AddUser from '@/components/Admin_Modals/AddUser.vue'
import DeleteModal from '@/components/Admin_Modals/DeleteModal.vue'
import ModifyUser from '@/components/Admin_Modals/ModifyUser.vue'
import ResetUser from '@/components/Admin_Modals/ResetUser.vue'
import ViewChart from '@/components/ViewChart.vue'

import getCollection from '@/db/getCollection'
import useDocument from '@/db/useDocument'
import { ref } from 'vue'

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
const course = ref('default')
const grade = ref(0)
const subject = ref('default')
const targetMark = ref(null)
const target = ref({
	subjects: {},
	course: '',
	class: 0
})
const res = ref([])
const fetchData = async () => { 
	await getCollection('students')
	.getDocuments().then((docs) => {
		res.value = docs
		loadData()
	}).catch((err) => {
		console.log(err)
	})
}

const students = ref([])
const selected = ref([])
const docID = ref('default')
const editMode = ref(false)
const loadData = () => {
	if (grade.value == 0 && course.value == 'default') 
		students.value = res.value
	else if (grade.value == 0 && course.value != 'default')
		students.value = res.value.filter((student) => student.course == course.value)
	else if (grade.value != 0 && course.value == 'default')
		students.value = res.value.filter((student) => student.class == grade.value)
	else
		students.value = res.value.filter((student) => student.class == grade.value && student.course == course.value)

	selected.value = []
	docID.value = 'default'
	editMode.value = false
}

const updateSelected = () => {
	const checked = event.target.closest('table')
					.querySelectorAll('input[type=checkbox]:checked')
	let ids = []
	checked.forEach((check) => {
		ids.push(check.value)
	})
	selected.value = ids
	docID.value = ids[0]
}
const selectAll = () => {
	const checkboxes = event.target.closest('table')
						.querySelectorAll('input[type=checkbox]')
	checkboxes.forEach((checkbox) => {
		checkbox.checked = true
	})
	updateSelected()
}
const handleUpdate = (mark, event) => {
	const newMark = event.target.value
	if(newMark >= 0 && newMark <= mark.fm && !isNaN(newMark)) {
		mark.mark = Number(event.target.value)
	}
}

const addStudent = (user) => {
	res.value.push(user)
	loadData()
}
const modStudent = (id, name, email, phone) => {
	const index = res.value.findIndex((student) => student.id == id)
	res.value[index].name = name
	res.value[index].email = email
	res.value[index].phone = phone
	loadData()
}
const delStudent = (ids) => {
	ids.forEach((id) => {
		res.value = res.value.filter((user) => user.id != id)
	})
	loadData()
}

const resetAtt = (students) => {
	students.forEach((student) => {
		const index = res.value.findIndex((user) => user.id == student.id)
		res.value[index].attendance = 0 
	})
	loadData()
}
const saveAtt = async() => {
	event.target.closest('.modal-content')
				.querySelector('.btn-close').click()
	selected.value.forEach(async (id) => {
		await (await useDocument('students', id))
		.updateDocs({
			attendance: Number(students.value.find((student) => student.id == id).attendance + 1)
		}).then(() => {
			const index = res.value.findIndex((student) => student.id == id)
			res.value[index].attendance = Number(res.value[index].attendance + 1)
			loadData()
		}).catch((err) => {
			console.log(err)
		})
	})
}

const promoteAll = async() => {
	event.target.closest('.modal-content')
				.querySelector('.btn-close').click()
	students.value.forEach(async(student) => {
		student.class += 1
		await (await useDocument('students', student.id))
		.updateDocs({class: student.class}).then(() => {
			const index = res.value.findIndex((user) => user.id == student.id)
			res.value[index].class = student.class
			loadData()			
		}).catch((err) => {
			console.log(err)
		})
	})
}

const openfb = ref(false)
const openFeedback = () => (async() => {
	students.value.forEach(async (student) => {
		await (await useDocument('students', student.id))
		.updateDocs({feedback: subject.value}).then(() => {
			// console.log('updated')
		}).catch((err) => {
			console.log(err)
		})
	})
})().then(() => {
	openfb.value = true
}).catch((err) => {
	console.log(err)
})
const closeFeedback = () => (async() => {
	event.target.closest('.modal-content')
				.querySelector('.btn-close').click()
	students.value.forEach(async (student) => {
		await (await useDocument('students', student.id))
		.updateDocs({feedback: 'default'}).then(() => {
			// console.log('updated')
		}).catch((err) => {
			console.log(err)
		})
	})
})().then(() => {
	openfb.value = false
}).catch((err) => {
	console.log(err)
})

const saveEdits = async() => {
	students.value.forEach(async (student) => {
		await (await useDocument('students', student.id))
		.updateDocs({
			attendance: student.attendance,
			class: student.class,
			course: student.course,
			subjects: student.subjects
		}).then(() => {
			const index = res.value.findIndex((user) => user.id == student.id)
			res.value[index].attendance = student.attendance
			res.value[index].class = student.class
			res.value[index].course = student.course
			res.value[index].subjects = student.subjects
			loadData()
		}).catch((err) => {
			console.log(err)
		})
	})
}

fetchData()
</script>

<style>
/* body { overflow: auto; } */
</style>
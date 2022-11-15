<template>
	<div id="content" class="container-fluid">
		<b-button-group class="my-1 d-flex">
			<b-button variant="secondary" v-b-modal.resetRate>Reset Ratings</b-button>
			<b-button variant="secondary" v-b-modal.resetTeacher>Reset Attendance</b-button>
			<b-button @click="editMode = !editMode; if(!editMode) saveEdits()">{{ editMode ? 'Save Edits' : 'Enter Edit Mode' }}</b-button>
			<b-button @click="fetchData">Refresh</b-button>
		</b-button-group>
		<b-button-group class="my-1">
			<b-button variant="success" v-b-modal.addTeacher>Add</b-button>
			<b-button v-if="selected.length > 0" variant="danger" v-b-modal.deleteTeacher>Delete</b-button>
			<b-button v-if="selected.length == 1" variant="primary" v-b-modal.modifyTeacher
				@click="$refs.modUser.loadData">Modify</b-button>
			<b-button v-if="selected.length > 0" variant="primary" v-b-modal.saveTAttendance>Add attendance</b-button>
		</b-button-group>
		<table class="table table-hover table-responsive">
			<thead><tr>
				<th scope="col" v-if="editMode">
					<b-button variant="outline-success" size="sm" @click="selectAll">
						<font-awesome-icon icon="fa-solid fa-check" size="1x" />
					</b-button>
				</th>
				<th scope="col">Name</th>
				<th scope="col">Rating</th>
				<th scope="col">Phone</th>
				<th scope="col">Email</th>
				<th scope="col">Attendance</th>
				<th scope="col">Classes</th>
			</tr></thead>
			<tbody ref="rows" id="rows">
				<tr v-for="teacher in teachers" :key="teacher">
					<td v-if="editMode"><b-form-checkbox :value="teacher.id" @click="updateSelected" /></td>
					<td>{{ teacher.name }}</td>
					<td><b-input-group :prepend="(teacher.rating.val/teacher.rating.count).toFixed(2)">
							<b-button variant="outline-primary" v-b-modal.viewStat @click="target = teacher">View</b-button>
						</b-input-group></td>
					<td>{{ teacher.phone }}</td>
					<td>{{ teacher.email }}</td>
					<td v-if="!editMode">{{ teacher.attendance }}/ 30</td>
					<td v-else><b-input-group :prepend="teacher.attendance">
						<b-form-input type="number" v-model="teacher.attendance" />
					</b-input-group></td>
					<td><tr v-if="editMode">
							<b-input-group>
								<b-input-group-prepend>
									<b-form-select v-model="course" :options="courses" />
									<b-form-select v-model="grade" :options="grades" />
									<b-form-select v-model="subject" :options="subjects" />
								</b-input-group-prepend>
								<b-input-group-append>
									<b-button variant="outline-success" @click="addSub(teacher)"
										:disabled="course == 'default' || grade == 0 || subject == 'default'">
										<font-awesome-icon icon="fa-solid fa-plus" size="1x" />
									</b-button>
								</b-input-group-append>
							</b-input-group>
						</tr>
						<tr v-for="(subs, grade) in teacher.classes" :key="grade">
						<b-input-group v-if="subs.length > 0" :prepend="grade">
							<section v-for="(sub, index) in subs" :key="sub">
								<b-input-group :prepend="sub" size="sm"><b-input-group-append v-if="editMode">
									<b-button variant="outline-danger" @click="delSub(teacher.id, teacher.classes, grade, index)">
										<font-awesome-icon icon="fa-solid fa-trash" size="1x" />
									</b-button>
								</b-input-group-append></b-input-group>
							</section>
						</b-input-group>
					</tr></td>
				</tr>
			</tbody>
		</table>
		<AddUser title="Teacher" @submitClick="addTeacher"/>
		<ModifyUser title="Teacher" :id="docID" ref="modUser" @submitClick="modTeacher"/>
		<DeleteModal title="Teacher" :ids="selected" @submitClick="delTeacher"/>
		<ResetUser title="Teacher" :ids="teachers" @submitClick="resetAtt"/>
		<b-modal id="saveTAttendance" title="Save Attendance" aria-labelledby="saveAtt" aria-hidden="true" :hide-footer="true">
			<b-form @submit="saveAtt">
				<p class="justify-content-center align-items-center" id="promoteText">Save Attendance</p>
				<b-button type="submit" variant="success d-flex mx-auto mt-2" size="lg">Save</b-button>
			</b-form>
		</b-modal>
		<b-modal id="resetRate" title="Reset Teacher Ratings" aria-labelledby="ResetRate" aria-hidden="true" :hide-footer="true">
			<b-form @submit="ResetRate">
				<p class="justify-content-center align-items-center" id="ResetText">Confirm Reset?</p>
				<b-button type="submit" variant="danger d-flex mx-auto mt-2" size="lg">Reset</b-button>
			</b-form>
		</b-modal>
		<b-modal size="lg" id="viewStat" title="Teacher Ratings" aria-labelledby="viewRate" aria-hidden="true" :hide-footer="true">
			<div class="d-flex justify-content-center"> Total Responses: {{ count }}</div>
			<div class="d-flex mb-1 justify-content-center">
				<b-form><b-form-group v-for="(question, index) in questions" :key="question"
					content-cols="2" :label="question"> {{ getRating(target.rating, index) }} / 5 </b-form-group>
				</b-form>
			</div>
		</b-modal>
	</div>
</template>

<script setup>
import AddUser from '@/components/Admin_Modals/AddUser.vue'
import DeleteModal from '@/components/Admin_Modals/DeleteModal.vue'
import ModifyUser from '@/components/Admin_Modals/ModifyUser.vue'
import ResetUser from '@/components/Admin_Modals/ResetUser.vue'

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
const questions = [
    "Q1. The teacher covers the whole syllabus :",
    "Q2. The teacher discusses syllabus in detail :",
    "Q3. The teacher possesses deep knowledege of the subject taught :",
    "Q4. The teacher communicates clearly :",
    "Q5. The teacher inspires me by his/her knowledege in the subject :",
    "Q6. The teacher is punctual to the class :",
    "Q7. The teacher engages the class for the full duration and completes the course in time :",
    "Q8. The teacher comes fully prepared for the class :",
    "Q9. The teacher provides guidance counselling in academic and non-academic matters in/out side the class :"
]

const target = ref({})
const editMode = ref(false)
const teachers = ref([])
const fetchData = async () => {
	await getCollection('teachers')
	.getDocuments().then((doc) => {
		teachers.value = doc
		refresh()
	}).catch((err) => {
		console.log(err)
	})
}

const selected = ref([])
const docID = ref('default')
const updateSelected = () => {
	const checked = event.target.closest('table').querySelectorAll('input[type=checkbox]:checked')
	let ids = []
	checked.forEach((check) => {
		ids.push(check.value)
	})
	selected.value = ids
	docID.value = ids[0]
}
const selectAll = () => {
	const checkboxes = event.target.closest('table').querySelectorAll('input[type=checkbox]')
	checkboxes.forEach((checkbox) => {
		checkbox.checked = true
	})
	updateSelected()
}
const refresh = () => {
    const rows = document.querySelectorAll('#rows input[type=checkbox]')
    rows.forEach((row) => {
        row.checked = false
    })
	selected.value = []
	docID.value = 'default'
}

const addTeacher = (user) => {
	teachers.value.push(user)
}
const modTeacher = (id, name, phone) => { 
	const index = teachers.value.findIndex((teacher) => teacher.id == id)
	teachers.value[index].name = name
	teachers.value[index].phone = phone
	refresh()
}
const delTeacher = (ids) => {
	ids.forEach((id) => {
		teachers.value = teachers.value.filter((user) => user.id != id)
	})
	refresh()
}

const course = ref('default')
const grade = ref(0)
const subject = ref('default')
const addSub = (teacher) => {
	let clas = course.value + '_' + grade.value
	if(!teacher.classes.hasOwnProperty(clas)) {
        teacher.classes[clas] = []
	}					
	if (teacher.classes[clas].includes(subject.value)) {
		return
	}
	// Fix Dropdowns
	teacher.classes[clas].push(subject.value)
}
const delSub = async(id, classes, grad, index) => {
	classes[grad].splice(index, 1)
}

const count = ref(0)
const getRating = (rating, ind) => {
	if(rating == undefined) {
		return 0
	}
	count.value = rating.count
	return (rating.vals[ind] / rating.count).toFixed(2)
}
const ResetRate = async() => {
	event.target.closest('.modal-content')
				.querySelector('.btn-close').click()

	teachers.value.forEach(async(teacher) => {
		await (await useDocument('teachers', teacher.id))
		.updateDocs({
			rating: {
				count: 0, val: 0,
				vals: [0, 0, 0, 0, 0, 0, 0, 0, 0]
			}
		}).then(() => {
			teacher.rating = {
				count: 0, val: 0,
				vals: [0, 0, 0, 0, 0, 0, 0, 0, 0]
			}			
		}).catch((err) => {
			console.log(err)
		})
	})
}

const resetAtt = (users) => {
	users.forEach((user) => {
		const index = res.value.findIndex((teacher) => teacher.id == user.id)
		teachers.value[index].attendance = 0 
	})
}
const saveAtt = async() => {
	event.target.closest('.modal-content')
				.querySelector('.btn-close').click()
	selected.value.forEach(async (id) => {
		await (await useDocument('teachers', id))
		.updateDocs({
			attendance: teachers.value.find((teacher) => teacher.id == id).attendance + 1
		}).then(() => {
			teachers.value.find((teacher) => teacher.id == id).attendance += 1
			refresh()
		}).catch((err) => {
			console.log(err)
		})
	})
}

const saveEdits = async() => {
	teachers.value.forEach(async (teacher) => {
		await (await useDocument('teachers', teacher.id))
		.updateDocs({
			attendance: teacher.attendance,
			classes: teacher.classes,
			rating: teacher.rating
		}).then(() => {
			const index = teachers.value.findIndex((user) => user.id == teacher.id)
			teachers.value[index].attendance = teacher.attendance
			teachers.value[index].classes = teacher.classes
			teachers.value[index].rating = teacher.rating
			refresh()
		}).catch((err) => {
			console.log(err)
		})
	})
}

fetchData()
</script>

<style>

</style>
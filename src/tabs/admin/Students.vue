<template>
	<div id="content" class="container-fluid">
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
			<b-button @click="editMode = !editMode">{{ editMode ? 'Turn Edit Off' : 'Turn Edit On' }}</b-button>
		</b-button-group>
		<b-button-group class="my-1">
			<b-button v-if="grade != 0 && course != 'default'" variant="success" v-b-modal.addStudent>Add</b-button>
			<b-button v-if="selected.length > 0" variant="danger" v-b-modal.deleteStudent>Delete</b-button>
			<b-button v-if="selected.length == 1" variant="primary" v-b-modal.modifyStudent @click="$refs.modUser.loadData">Modify</b-button>
			<b-button v-if="selected.length > 0" variant="primary" v-b-modal.saveAttendance>Add attendance</b-button>
		</b-button-group>
		<table class="table table-hover table-responsive">
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
					<td v-if="course == 'default'"><table>
						<tr>
							<td v-if="noCourseEdit || student.id != target">{{ student.course }}</td>
							<td v-else>
								<b-input-group :prepend="student.course">
									<b-form-select v-model="student.course" :options="courses" />
									<b-input-group-append>
									<b-button variant="outline-success" size="sm" @click="modifyCourse(student)">
										<font-awesome-icon icon="fa-solid fa-check" size="1x" />
									</b-button>
									</b-input-group-append>
								</b-input-group>
							</td>
							<td v-if="editMode">
								<b-button variant="outline-primary" size="sm" class="mx-1" @click="noCourseEdit = !noCourseEdit; target = student.id">
									<font-awesome-icon icon="fa-regular fa-pen-to-square" size="1x" />
								</b-button>
							</td>
						</tr>
					</table></td>
					<td v-if="grade == 0"><table>
						<tr>
							<td v-if="noGradeEdit || student.id != target">{{ student.class }}</td>
							<td v-else>
								<b-input-group :prepend="student.class">
									<b-form-select v-model="student.class" :options="grades" />
									<b-input-group-append>
									<b-button variant="outline-success" size="sm" @click="modifyGrade(student)">
										<font-awesome-icon icon="fa-solid fa-check" size="1x" />
									</b-button>
									</b-input-group-append>
								</b-input-group>
							</td>
							<td v-if="editMode">
								<b-button variant="outline-primary" size="sm" class="mx-1" @click="noGradeEdit = !noGradeEdit; target = student.id">
									<font-awesome-icon icon="fa-regular fa-pen-to-square" size="1x" />
								</b-button>
							</td>
						</tr>
					</table></td>
					<td>{{ student.phone }}</td>
					<td>{{ student.email }}</td>
					<td><div>
						<tr>
							<td v-if="noAttEdit || student.id != target">{{ student.attendance }}/ 30</td>
							<td v-else>
								<b-input-group :prepend="student.attendance">
									<b-form-input type="number" v-model="student.attendance" />
									<b-input-group-append>
									<b-button variant="outline-success" size="sm" @click="noAttEdit = !noAttEdit; modifyAtt(student)">
										<font-awesome-icon icon="fa-solid fa-check" size="1x" />
									</b-button>
									</b-input-group-append>
								</b-input-group>
							</td>
							<td v-if="editMode">
								<b-button variant="outline-primary" size="sm" class="mx-1" @click="noAttEdit = !noAttEdit; target = student.id">
									<font-awesome-icon icon="fa-regular fa-pen-to-square" size="1x" />
								</b-button>
							</td>
						</tr>
					</div></td>
					<td v-if="subject != 'default'">
						<b-button v-if="!editMode" variant="primary" v-b-modal.viewStudentChart @click="target = student">View</b-button>
						<div v-else>
							<tr v-for="(mark, index) in student.subjects[subject]" :key="mark">
								<td class="mx-2">{{ mark.topic }} ({{ mark.date }})</td>
								<td v-if="noMarkEdit || student.id != target || index != targetMark">
									<tr>{{ mark.mark ? mark.mark : 0 }}/{{ mark.fm }}</tr>
								</td>
								<td v-else>
									<b-input-group :prepend="mark.mark" :append="mark.fm">
										<b-form-input type="number" min="0" :max="mark.fm" />
										<b-input-group-append>
										<b-button variant="outline-success" size="sm" @click="modifyMark(student, index)">
											<font-awesome-icon icon="fa-solid fa-check" size="1x" />
										</b-button>
										</b-input-group-append>
									</b-input-group>
								</td>
								<td><b-button variant="outline-primary" size="sm" class="m-1"
									@click="noMarkEdit = !noMarkEdit; target = student.id; targetMark = index">
									<font-awesome-icon icon="fa-regular fa-pen-to-square" size="1x" />
								</b-button></td>
							</tr>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
		<AddUser title="Student" :cls="grade" :crs="course" @submitClick="loadData"/>
		<ModifyUser title="Student" :id="docID" ref="modUser" @submitClick="loadData"/>
		<DeleteModal title="Student" :ids="selected" @submitClick="loadData"/>
		<ResetUser title="Student" :ids="students" @submitClick="loadData"/>
		<b-modal id="saveAttendance" title="Save Attendance" aria-labelledby="saveAtt" aria-hidden="true" :hide-footer="true">
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
	</div>
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
const students = ref([])
const editMode = ref(false)
const target = ref({
	subjects: {},
	course: '',
	class: 0
})
const targetMark = ref(null)
const selected = ref([])
const docID = ref('default')

const loadData = async () => {let collection
	if (grade.value == 0 && course.value == 'default') 
		collection = getCollection('students', '', '', '', '')
	else if (grade.value == 0 && course.value != 'default')
		collection = getCollection('students', ['course', '==', course.value], '', '', '')
	else if (grade.value != 0 && course.value == 'default')
		collection = getCollection('students', ['class', '==', grade.value], '', '', '')
	else
		collection = getCollection('students', ['class', '==', grade.value], ['course', '==', course.value], '', '')

	collection.getDocuments().then((docs) => {
		students.value = docs
		selected.value = []
		docID.value = 'default'
	}).catch((err) => {
		console.log(err)
	})
}
const updateSelected = () => {
	const checked = event.target.closest('table').querySelectorAll('input[type=checkbox]:checked')
	let ids = []
	checked.forEach((check) => {
		ids.push(check.value)
	})
	selected.value = ids
	docID.value = ids[0]
}

const noMarkEdit = ref(true)
const modifyMark = async(student, ind) => {
	noMarkEdit.value = !noMarkEdit.value
	const textBody = event.target.closest('.input-group').querySelector('input[type=number]')
	const val = Number(textBody.value)
	// console.log(textBody, val)
	if(val != '') {
		const mark = student.subjects[subject.value][ind]
		mark.mark = val
		await (await useDocument('students', student.id)).updateDocs({
			subjects: student.subjects
		}).then(() => {
			loadData()
		}).catch((err) => {
			console.log(err)
		})
	}
}
const noGradeEdit = ref(true)
const modifyGrade = async(student) => {
	noGradeEdit.value = !noGradeEdit.value
	await (await useDocument('students', student.id))
	.updateDocs({class: student.class}).then(() => {
		// console.log('updated')
		loadData()
	}).catch((err) => {
		console.log(err)
	})
}
const noCourseEdit = ref(true)
const modifyCourse = async(student) => {
	noCourseEdit.value = !noCourseEdit.value
	await (await useDocument('students', student.id))
	.updateDocs({course: student.course}).then(() => {
		// console.log('updated')
		loadData()
	}).catch((err) => {
		console.log(err)
	})
}

const noAttEdit = ref(true)
const modifyAtt = async(student) => {
	await (await useDocument('students', student.id))
	.updateDocs({attendance: student.attendance}).then(() => {
		// console.log('updated')
		loadData()
	}).catch((err) => {
		console.log(err)
	})
}
const promoteAll = async() => {
	event.target.closest('.modal-content')
				.querySelector('.btn-close').click()
	students.value.forEach(async(student) => {
		await (await useDocument('students', student.id))
		.updateDocs({class: student.class + 1}).then(() => {
			// console.log('promoted')
			loadData()
		}).catch((err) => {
			console.log(err)
		})
	})
}

const openfb = ref(false)
const openFeedback = async() => {
	students.value.forEach(async (student) => {
		await (await useDocument('students', student.id))
		.updateDocs({feedback: subject.value})
		.then(() => {
			// console.log('updated')
			openfb.value = true
		}).catch((err) => {
			console.log(err)
		})
	})
}
const closeFeedback = async() => {
	event.target.closest('.modal-content').querySelector('.btn-close').click()
	students.value.forEach(async (student) => {
		await (await useDocument('students', student.id))
		.updateDocs({feedback: 'default'})
		.then(() => {
			// console.log('updated')
			openfb.value = false
		}).catch((err) => {
			console.log(err)
		})
	})
}

const selectAll = () => {
	const checkboxes = event.target.closest('table').querySelectorAll('input[type=checkbox]')
	checkboxes.forEach((checkbox) => {
		checkbox.checked = true
	})
	updateSelected()
}
const saveAtt = async() => {
	event.target.closest('.modal-content')
				.querySelector('.btn-close').click()
	selected.value.forEach(async (id) => {
		await (await useDocument('students', id))
		.updateDocs({attendance: students.value.find((student) => student.id == id).attendance + 1})
		.then(() => {
			loadData()
		}).catch((err) => {
			console.log(err)
		})
	})
}
loadData()
</script>

<style>

</style>
<template>
	<div>
		<b-form-select v-model="grade" :options="grades" class="mt-5" @update:modelValue="loadData"></b-form-select>
		<b-button class="m-3" v-if="grade != 69" variant="success" v-b-modal.addStudent>Add</b-button>
		<b-button class="m-3" v-else variant="secondary" v-b-modal.promoteAll>Promote All</b-button>
		<b-button class="m-3" variant="secondary" v-b-modal.resetStudent>reset Attendance</b-button>
		<b-button class="m-3" v-if="selected.length > 0" variant="danger" v-b-modal.deleteStudent>Delete</b-button>
		<b-button class="m-3" v-if="selected.length == 1" variant="primary" v-b-modal.modifyStudent @click="$refs.modUser.loadData">Modify</b-button>
		<table class="table table-hover table-responsive">
			<thead>
			<tr>
				<th scope="col">#</th>
				<th scope="col">Name</th>
				<th scope="col" v-if="grade == 69">Class</th>
				<th scope="col">Phone</th>
				<th scope="col">Email</th>
				<th scope="col">Attendance</th>
				<th scope="col">
					<b-form-select v-model="subject" :options="subjects"></b-form-select>
				</th>
			</tr>
			</thead>
			<tbody ref="rows" id="rows">
				<tr v-for="student in students" :key="student">
					<td>
						<input type="checkbox" :value="student.id" @click="updateSelected">
						<!-- {{ student.id }} -->
					</td>
					<td>{{ student.name }}</td>
					<td v-if="grade == '69'"><table>
						<tr>
							<td v-if="noClassEdit || student.id != target">{{ student.class }}</td>
							<td v-else>
								<b-input-group :prepend="student.class">
									<b-form-select v-model="student.class" :options="grades"></b-form-select>
									<b-input-group-append>
									<b-button variant="outline-success" size="sm" @click="modC(student)">
										<font-awesome-icon icon="fa-solid fa-check" size="1x" />
									</b-button>
									</b-input-group-append>
								</b-input-group>
							</td>
							<td><b-button variant="outline-primary" size="sm" class="mx-1" @click="noClassEdit = !noClassEdit; target = student.id">
								<font-awesome-icon icon="fa-regular fa-pen-to-square" size="1x" />
							</b-button></td>
						</tr>
					</table></td>
					<td>{{ student.phone }}</td>
					<td>{{ student.email }}</td>
					<td><div>
						<tr>
							<td v-if="noAttEdit || student.id != target">{{ student.attendance }}/ 30</td>
							<td v-else>
								<b-input-group :prepend="student.attendance">
									<b-form-input v-model="student.attendance"></b-form-input>
									<b-input-group-append>
									<b-button variant="outline-success" size="sm" @click="noAttEdit = !noAttEdit; modA(student)">
										<font-awesome-icon icon="fa-solid fa-check" size="1x" />
									</b-button>
									</b-input-group-append>
								</b-input-group>
							</td>
							<td><b-button variant="outline-primary" size="sm" class="mx-1" @click="noAttEdit = !noAttEdit; target = student.id">
								<font-awesome-icon icon="fa-regular fa-pen-to-square" size="1x" />
							</b-button></td>
							<td><b-button variant="outline-secondary" size="sm" class="mx-1" @click="student.attendance++; modA(student)">
								<font-awesome-icon icon="fa-solid fa-plus" />
							</b-button></td>
						</tr>
					</div></td>
					<td>
						<div v-if="subject != 'default'">
							<tr>
								<td><b-form-input type="text" placeholder="Enter Mark"></b-form-input></td>
								<td><b-button variant="outline-success" class="mx-1" @click="add(student.id, student.subjects)">
									<font-awesome-icon icon="fa-solid fa-plus" />
								</b-button></td>
							</tr>
							<tr v-for="(mark, index) in getMarks(student.subjects)" :key="mark">
								<td v-if="noMarkEdit || student.id != target">{{ mark }}</td>
								<td v-else>
									<b-input-group :prepend="mark">
										<b-form-input></b-form-input>
										<b-input-group-append>
										<b-button variant="outline-success" size="sm" @click="mod(student.id, student.subjects, index)">
											<font-awesome-icon icon="fa-solid fa-check" size="1x" />
										</b-button>
										</b-input-group-append>
									</b-input-group>
								</td>
								<td><b-button variant="outline-primary" size="sm" class="m-1" @click="noMarkEdit = !noMarkEdit; target = student.id">
									<font-awesome-icon icon="fa-regular fa-pen-to-square" size="1x" />
								</b-button></td>
								<td><b-button variant="outline-danger" size="sm" class="m-1" @click="del(student.id, student.subjects, index)">
									<font-awesome-icon icon="fa-solid fa-trash" size="1x" />
								</b-button></td>
							</tr>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
		<AddUser title="Student" :cls="grade" v-on:submitClick="loadData"/>
		<ModifyUser title="Student" :id="docID" ref="modUser" v-on:submitClick="loadData"/>
		<DeleteUser title="Student" :ids="selected" v-on:submitClick="loadData"/>
		<ResetUser title="Student" :ids="students" v-on:submitClick="loadData"/>
		<b-modal id="promoteAll" title="Promote" aria-labelledby="promoteAll" aria-hidden="true" :hide-footer="true">
			<b-form @submit="promoteAll">
				<p class="justify-content-center align-items-center" id="promoteText">Confirm Promote?</p>
				<b-button type="submit" variant="success d-flex mx-auto mt-2" size="lg">Promote</b-button>
			</b-form>
		</b-modal>
	</div>
</template>

<script setup>
import AddUser from '@/components/Admin/AddUser.vue'
import DeleteUser from '@/components/Admin/DeleteUser.vue'
import ModifyUser from '@/components/Admin/ModifyUser.vue'
import ResetUser from '@/components/Admin/ResetUser.vue'

import getCollection from '@/db/getCollection'
import useDocument from '@/db/useDocument'
import { ref } from 'vue'

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
const grade = ref(69)
const subject = ref('default')
const students = ref([])
const target = ref(null)
const selected = ref([])
const docID = ref('default')

const getMarks = (subs) => {
	return subs[subject.value]
}
const loadData = async () => {
	let collection = grade.value == 69 ? getCollection('student', '') :
		getCollection('student', ['class', '==', grade.value])
	collection.getDocuments().then((docs) => {
		students.value = docs
	}).catch((err) => {
		console.log(err)
	})
	selected.value = []
	docID.value = 'default'
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

const updateMarks = async (id, marks) => {
	await (await useDocument('student', id))
	.updateDocs({subjects: marks}).then(() => {
		// console.log('updated')
	}).catch((err) => {
		console.log(err)
	})
	loadData()
}
const add = (id, subs) => {
	const textBody = event.target.closest('tr').querySelector('input[type=text]')
	const val = textBody.value
	if(val != '') {
		subs[subject.value].push(val)
		updateMarks(id, subs).then(() => {
			textBody.value = ''
			// console.log('added')
		}).catch((err) => {
			console.log(err)
		})
	}
}
const del = (id, subs, ind) => {
	// remove the element at index ind
	subs[subject.value].splice(ind, 1)
	updateMarks(id, subs).then(() => {
		// console.log('deleted')
	}).catch((err) => {
		console.log(err)
	})
}

const noMarkEdit = ref(true)
const mod = (id, subs, ind) => {
	noMarkEdit.value = !noMarkEdit.value
	const textBody = event.target.closest('.input-group').children[1]
	const val = textBody.value
	// console.log(textBody)
	if(val != '') {
		subs[subject.value][ind] = val
		updateMarks(id, subs).then(() => {
			textBody.value = ''
			// console.log('modified')
		}).catch((err) => {
			console.log(err)
		})
	}
}
const noClassEdit = ref(true)
const modC = async(student) => {
	noClassEdit.value = !noClassEdit.value
	await (await useDocument('student', student.id))
	.updateDocs({class: student.class}).then(() => {
		// console.log('updated')
	}).catch((err) => {
		console.log(err)
	})
	loadData()
}
const noAttEdit = ref(true)
const modA = async(student) => {
	await (await useDocument('student', student.id))
	.updateDocs({attendance: student.attendance}).then(() => {
		// console.log('updated')
	}).catch((err) => {
		console.log(err)
	})
	loadData()
}

const promoteAll = async() => {
	event.target.closest('.modal-content')
				.querySelector('.btn-close').click()
	students.value.forEach(async(student) => {
		await (await useDocument('student', student.id))
		.updateDocs({class: student.class + 1}).then(() => {
			// console.log('promoted')
		}).catch((err) => {
			console.log(err)
		})
	})
	loadData()	
}

loadData()
</script>

<style>
	.body {
		overflow-x: scroll;
		margin-top: 6vh;
		margin-bottom: 6vh;
	}
</style>
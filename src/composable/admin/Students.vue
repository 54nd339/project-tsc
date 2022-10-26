<template>
	<div>
		<b-form-select v-model="clas" :options="classes" class="mt-5" @update:modelValue="loadData()"></b-form-select>
		<b-button class="m-3" v-if="clas != 69" variant="success" v-b-modal.addUser>Add</b-button>
		<b-button class="m-3" v-else variant="secondary"  v-b-modal.promoteAll()>Promote All</b-button>
		<b-button class="m-3" v-if="selected.length > 0" variant="danger" v-b-modal.deleteConfirm>Delete</b-button>
		<b-button class="m-3" v-if="selected.length == 1" variant="primary" v-b-modal.modifyUser>Modify</b-button>
		<table class="table table-hover table-responsive">
			<thead>
			<tr>
				<th scope="col">#</th>
				<th scope="col">Name</th>
				<th scope="col" v-if="clas == 69">Class</th>
				<th scope="col">Phone</th>
				<th scope="col">Email</th>
				<th scope="col">
					<b-form-select v-model="subject" :options="options"></b-form-select>
				</th>
				<th scope="col" v-if="subject != 'default'">Add score</th>
			</tr>
			</thead>
			<tbody ref="rows" id="rows">
				<tr v-for="student in students" :key="student">
					<td>
						<input type="checkbox" :value="student.id" @click="updateSelected()">
						<!-- {{ student.id }} -->
					</td>
					<td>{{ student.name }}</td>
					<td v-if="clas == '69'"><table>
						<tr>
							<td v-if="noClassEdit">{{ student.class }}</td>
							<td v-else>
								<b-input-group :prepend="student.class">
									<b-form-select v-model="student.class" :options="classes" @update:modelValue="updateClass(student.id, student.class)"></b-form-select>
									<b-input-group-append>
									<b-button variant="outline-success" @click="modC(student)"><font-awesome-icon icon="fa-solid fa-check" size="1x" /></b-button>
									</b-input-group-append>
								</b-input-group>
							</td>
							<td><b-button variant="outline-primary" class="m-1" @click="noClassEdit = !noClassEdit"><font-awesome-icon icon="fa-regular fa-pen-to-square" size="1x" /></b-button></td>
						</tr>
					</table></td>
					<td>{{ student.phone }}</td>
					<td>{{ student.email }}</td>
					<td>
						<table>
							<tr v-for="(mark, index) in getMarks(student.subjects)" :key="mark">
								<td v-if="noMarkEdit">{{ mark }}</td>
								<td v-else>
									<b-input-group :prepend="mark">
										<b-form-input></b-form-input>
										<b-input-group-append>
										<b-button variant="outline-success" @click="mod(student.subjects, student.id, index)"><font-awesome-icon icon="fa-solid fa-check" size="1x" /></b-button>
										</b-input-group-append>
									</b-input-group>
								</td>
								<td><b-button variant="outline-primary" class="m-1" @click="noMarkEdit = !noMarkEdit"><font-awesome-icon icon="fa-regular fa-pen-to-square" size="1x" /></b-button></td>
								<td><b-button variant="outline-danger" class="m-1" @click="del(student.subjects, student.id, index)"><font-awesome-icon icon="fa-solid fa-trash" size="1x" /></b-button></td>
							</tr>
						</table>
					</td>
					<td v-if="subject != 'default'"><input type="text" placeholder="Mark">
						<b-button variant="outline-success" @click="add(student.subjects, student.id)"><font-awesome-icon icon="fa-solid fa-plus" /></b-button></td>
				</tr>
			</tbody>
		</table>
		<AddUser title="Student" :cls="clas" v-on:submitClick="loadData"/>
		<ModifyUser title="Student" :id="docID" v-on:submitClick="loadData"/>
		<b-modal id="deleteConfirm" title="Delete" aria-labelledby="deleteConfirm" aria-hidden="true" :hide-footer="true">
			<form ref="form">
				<p class="justify-content-center align-items-center" id="deleteText">Confirm Delete?</p>
				<b-button variant="danger d-flex mx-auto mt-2" size="lg" type="button" @click="deleteStudents()">Delete</b-button>
			</form>
		</b-modal>
		<b-modal id="promoteAll" title="Promote" aria-labelledby="promoteAll" aria-hidden="true" :hide-footer="true">
			<form ref="form">
				<p class="justify-content-center align-items-center" id="promoteText">Confirm Promote?</p>
				<b-button variant="success d-flex mx-auto mt-2" size="lg" type="button" @click="promoteStudents()">Promote</b-button>
			</form>
		</b-modal>
	</div>
</template>

<script setup>
import AddUser from '@/components/Admin/AddUser.vue'
import ModifyUser from '@/components/Admin/ModifyUser.vue'

import getCollection from '@/db/getCollection'
import useDocument from '@/db/useDocument'
import { ref } from 'vue'

const classes = [
	{value:69, text:'All'},
	{value:10, text:'10'},
	{value:9, text:'9'},
	{value:8, text:'8'},
	{value:7, text:'7'},
	{value:6, text:'6'},
	{value:5, text:'5'},
]
const clas = ref(69)
const students = ref([])

const loadData = async () => {
	let collection = clas == 69 ? getCollection('student', '') :
		getCollection('student', ['class', '==', clas.value])
	collection.getDocuments().then((docs) => {
		students.value = docs
	}).catch((err) => {
		console.log(err)
	})
}

const options = [
	{value:'default', text:'Select Subject'},
	{value:'eng1', text:'English 1'},
	{value:'eng2', text:'English 2'},
	{value:'odia', text:'Odia/Hindi'},
	{value:'math', text:'Mathematics'},
	{value:'comp', text:'Computers'},
	{value:'phys', text:'Physics'},
	{value:'chem', text:'Chemistry'},
	{value:'bio', text:'Biology'},
	{value:'hist', text:'History'},
	{value:'geo', text:'Geography'}
]
const subject = ref('default')
const getMarks = (subs) => {
	return subs[subject.value]
}

const selected = ref([])
const docID = ref('default')
const updateSelected = () => {
	const checked = document.querySelectorAll('input[type=checkbox]:checked')
	let ids = []
	for (var i = 0; i < checked.length; i++) {
		ids.push(checked[i].value)
	}
	selected.value = ids
	docID.value = ids[0]
}
const deleteStudents = async() => {
	for (var i = 0; i < selected.value.length; i++) {
		await (await useDocument('student', selected.value[i]))
		.delDoc().then(() => {
			// console.log('deleted')
		}).catch((err) => {
			console.log(err)
		})
	}
	selected.value = []
	loadData()
	document.querySelectorAll('.btn-close')[4].click()
}

const updateMarks = async (marks, id) => {
	await (await useDocument('student', id))
	.updateDocs({subjects: marks}).then(() => {
		// console.log('updated')
	}).catch((err) => {
		console.log(err)
	})
	loadData()
}

const add = (subs, id) => {
	const textBody = event.target.closest('td').children[0]
	const val = textBody.value
	if(val != '') {
		subs[subject.value].push(val)
		updateMarks(subs, id).then(() => {
			textBody.value = ''
			// console.log('added')
		}).catch((err) => {
			console.log(err)
		})
	}
}
const del = (subs, id, ind) => {
	// remove the element at index ind
	subs[subject.value].splice(ind, 1)
	updateMarks(subs, id).then(() => {
		// console.log('deleted')
	}).catch((err) => {
		console.log(err)
	})
}

const noMarkEdit = ref(true)
const mod = (subs, id, ind) => {
	noMarkEdit.value = !noMarkEdit.value
	const textBody = event.target.closest('.input-group').children[1]
	const val = textBody.value
	// console.log(textBody)
	if(val != '') {
		subs[subject.value][ind] = val
		updateMarks(subs, id).then(() => {
			textBody.value = ''
			// console.log('modified')
		}).catch((err) => {
			console.log(err)
		})
	}
}

const noClassEdit = ref(true)
const modc = async(student) => {
	noClassEdit.value = !noClassEdit.value
	await (await useDocument('student', student.id))
	.updateDocs({class: student.class}).then(() => {
		// console.log('updated')
	}).catch((err) => {
		console.log(err)
	})
	loadData()
}

const promoteAll = async() => {
	for (var i = 0; i < students.value.length; i++) {
		await (await useDocument('student', students.value[i].id))
		.updateDocs({class: students.value[i].class + 1}).then(() => {
			// console.log('promoted')
		}).catch((err) => {
			console.log(err)
		})
	}
	loadData()
	document.querySelectorAll('.btn-close')[5].click()
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
<template>
	<div id="content" class="container-fluid">
		<b-button-group class="my-1">
			<b-button variant="success" v-b-modal.addTeacher>Add</b-button>
			<b-button variant="secondary" v-b-modal.resetRate>Reset Ratings</b-button>
			<b-button variant="secondary" v-b-modal.resetTeacher>Reset Attendance</b-button>
			<b-button v-if="selected.length > 0" variant="danger" v-b-modal.deleteTeacher>Delete</b-button>
			<b-button v-if="selected.length == 1" variant="primary" v-b-modal.modifyTeacher @click="$refs.modUser.loadData">Modify</b-button>
		</b-button-group>
		<table class="table table-hover table-responsive">
			<thead><tr>
				<th scope="col">#</th>
				<th scope="col">Name</th>
				<th scope="col">Rating</th>
				<th scope="col">Phone</th>
				<th scope="col">Email</th>
				<th scope="col">Attendance</th>
				<th scope="col">Classes</th>
				<th scope="col">Add Class</th>
			</tr></thead>
			<tbody ref="rows" id="rows">
				<tr v-for="teacher in teachers" :key="teacher">
					<td>
						<b-form-checkbox :value="teacher.id" @click="updateSelected" /><!-- {{ teacher.id }} -->
					</td>
					<td>{{ teacher.name }}</td>
					<td>{{ teacher.rating }}</td>
					<td>{{ teacher.phone }}</td>
					<td>{{ teacher.email }}</td>
					<td><div>
						<tr>
							<td v-if="noAttEdit || teacher.id != target">{{ teacher.attendance }}/ 30</td>
							<td v-else>
								<b-input-group :prepend="teacher.attendance">
									<b-form-input type="number" v-model="teacher.attendance" />
									<b-input-group-append>
									<b-button variant="outline-success" @click="noAttEdit = !noAttEdit; modA(teacher)">
										<font-awesome-icon icon="fa-solid fa-check" size="1x" />
									</b-button>
									</b-input-group-append>
								</b-input-group>
							</td>
							<td><b-button variant="outline-primary" size="sm" class="mx-1" @click="noAttEdit = !noAttEdit; target = teacher.id">
								<font-awesome-icon icon="fa-regular fa-pen-to-square" size="1x" />
							</b-button></td>
							<td><b-button variant="outline-secondary" size="sm" class="mx-1" @click="teacher.attendance++; modA(teacher)">
								<font-awesome-icon icon="fa-solid fa-plus" />
							  </b-button></td>
						</tr>
					</div></td>
					<td><div>
						<tr v-for="(subs, grade) in teacher.classes" :key="grade">
							<b-input-group v-if="subs.length > 0" :prepend="grade">
								<td v-for="(sub, index) in subs" :key="sub">
									<b-input-group :prepend="sub" size="sm"><b-input-group-append>
										<b-button variant="outline-danger" @click="delSub(teacher.id, teacher.classes, grade, index)">
											<font-awesome-icon icon="fa-solid fa-trash" size="1x" />
										</b-button>
									</b-input-group-append></b-input-group>
								</td>
							</b-input-group>
						</tr>
					</div></td>
					<td>
						<b-input-group>
							<b-input-group-prepend>
								<b-form-select v-model="course" :options="courses" />
								<b-form-select v-model="grade" :options="grades" />
								<b-form-select v-model="subject" :options="subjects" />
							</b-input-group-prepend>
							<b-input-group-append>
								<b-button variant="outline-success" @click="addSub(teacher.id, teacher.classes)">
									<font-awesome-icon icon="fa-solid fa-plus" size="1x" />
								</b-button>
							</b-input-group-append>
						</b-input-group>
					</td>
				</tr>
			</tbody>
		</table>
		<AddUser title="Teacher" v-on:submitClick="loadData"/>
		<ModifyUser title="Teacher" :id="docID" ref="modUser" v-on:submitClick="loadData"/>
		<DeleteModal title="Teacher" :ids="selected" v-on:submitClick="loadData"/>
		<ResetUser title="Teacher" :ids="teachers" v-on:submitClick="loadData"/>
		<b-modal id="resetRate" title="Reset Teacher Ratings" aria-labelledby="resetRate" aria-hidden="true" :hide-footer="true">
			<b-form @submit="resetRate">
				<p class="justify-content-center align-items-center" id="resetText">Confirm Reset?</p>
				<b-button type="submit" variant="danger d-flex mx-auto mt-2" size="lg">Reset</b-button>
			</b-form>
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
const teachers = ref([])
const target = ref(null)

const loadData = async () => {
	let collection = getCollection('teachers', '', '', '')
	collection.getDocuments().then((docs) => {
		teachers.value = docs
		selected.value = []
		docID.value = 'default'
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

const noAttEdit = ref(true)
const modA = async(teacher) => {
	await (await useDocument('teachers', teacher.id))
	.updateDocs({attendance: teacher.attendance}).then(() => {
		loadData()
		// console.log('updated')
	}).catch((err) => {
		console.log(err)
	})
}

const updateSub = async(id, classes) => {
	await (await useDocument('teachers', id))
	.updateDocs({classes: classes}).then(() => {
		loadData()
		// console.log('updated')
	}).catch((err) => {
		console.log(err)
	})
}
const course = ref('default')
const grade = ref(0)
const subject = ref('default')
const addSub = async(id, classes) => {
	if (course.value == 'default' || grade.value == 0 || subject.value == 'default') {
		return
	}
	let clas = course.value + '_' + grade.value
	if (classes[clas].includes(subject.value)) {
		return
	}

	classes[clas].push(subject.value)
	updateSub(id, classes).then(() => {
		course.value = 'default'
		grade.value = 0
		subject.value = 'default'
		loadData()
	}).catch((err) => {
		console.log(err)
	})
}
const delSub = async(id, classes, grad, index) => {
	classes[grad].splice(index, 1)
	updateSub(id, classes).then(() => {
		grade.value = 0
		subject.value = 'default'
		loadData()
	}).catch((err) => {
		console.log(err)
	})
}

const resetRate = async() => {
	event.target.closest('.modal-content')
				.querySelector('.btn-close').click()
	teachers.value.forEach(async(teacher) => {
		await (await useDocument('teachers', teacher.id))
		.updateDocs({rating: 0}).then(() => {
			// console.log('updated')
			loadData()
		}).catch((err) => {
			console.log(err)
		})
	})
}
// Fix dropdown
loadData()
</script>

<style>

</style>
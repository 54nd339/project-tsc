<template>
	<section class="container-fluid">
		<b-button-group class="my-1">
			<b-button :disabled="selected.length == 0" variant="danger" v-b-modal.deleteEnquiry>Delete</b-button>
		</b-button-group>
		<table class="table table-hover table-responsive">
			<thead><tr>
				<th scope="col">#</th>
				<th scope="col">Name</th>
				<th scope="col">Course</th>
				<th scope="col">Grade</th>
				<th scope="col">Phone</th>
				<th scope="col">Enquiry</th>
			</tr></thead>
			<tbody ref="rows" id="rows">
				<tr v-for="enquiry in enquiries" :key="enquiry">
					<td>
						<b-form-checkbox :value="enquiry.id" @click="updateSelected" />
						<!-- {{ enquiry.id }} -->
					</td>
					<td>{{ enquiry.name }}</td>
					<td>{{ enquiry.course }}</td>
					<td>{{ enquiry.grade }}</td>
					<td>{{ enquiry.phone }}</td>
					<td>{{ enquiry.message }}</td>
				</tr>
			</tbody>
		</table>
		<DeleteModal title="Enquiry" :ids="selected" @submitClick="loadData"/>
	</section>
</template>

<script setup>
import DeleteModal from '@/components/Admin_Modals/DeleteModal.vue'
import getCollection from '@/db/getCollection'
import { ref } from 'vue'

const enquiries = ref([])
const loadData = async () => {
	let collection = getCollection('enquiry', '', '', '', '')
	collection.getDocuments().then((docs) => {
		enquiries.value = docs
		selected.value = []
	}).catch((err) => {
		console.log(err)
	})
}

const selected = ref([])
const updateSelected = () => {
	const checked = event.target.closest('table')
		.querySelectorAll('input[type=checkbox]:checked')
	let ids = []
	checked.forEach((check) => {
		ids.push(check.value)
	})
	selected.value = ids
}

loadData()
</script>

<style>

</style>
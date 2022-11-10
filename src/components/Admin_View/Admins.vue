<template>
	<div class="col-md-5 rounded-3 m-2 order-md-1" style="background-color:#80ED99; min-height: 50vh; max-height: 70vh; overflow-y: auto;">
        <div class="shadow m-3 p-1 rounded-3" style="background-color:#57CC99">
            <h3 class="text-center" style>Admins</h3>
        </div>
        <div id="content" class="container-fluid">
            <b-button-group class="my-1 d-flex">
                <b-button variant="success" v-b-modal.addAdmin>Add</b-button>
                <b-button v-if="selected.length > 0" variant="danger" v-b-modal.deleteAdmin>Delete</b-button>
                <b-button v-if="selected.length == 1" variant="primary" v-b-modal.modifyAdmin @click="$refs.modUser.loadData">Modify</b-button>
            </b-button-group>
            <table class="table table-hover table-responsive">
                <thead><tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Email</th>
                </tr></thead>
                <tbody ref="rows" id="rows">
                    <tr v-for="admin in admins" :key="admin">
                        <td>
                            <b-form-checkbox :value="admin.id" @click="updateSelected" /><!-- {{ admin.id }} -->
                        </td>
                        <td>{{ admin.name }}</td>
                        <td>{{ admin.phone }}</td>
                        <td>{{ admin.email }}</td>
                    </tr>
                </tbody>
            </table>
            <AddUser title="Admin" @submitClick="loadData"/>
            <ModifyUser title="Admin" :id="docID" ref="modUser" @submitClick="loadData"/>
            <DeleteModal title="Admin" :ids="selected" @submitClick="loadData"/>
        </div> 
    </div>
</template>

<script setup>
import AddUser from '@/components/Admin_Modals/AddUser.vue'
import DeleteModal from '@/components/Admin_Modals/DeleteModal.vue'
import ModifyUser from '@/components/Admin_Modals/ModifyUser.vue'

import getCollection from '@/db/getCollection'
import { ref } from 'vue'

const admins = ref([])
const loadData = async () => {
	let collection = getCollection('admins', '', '', '', '')
	collection.getDocuments().then((docs) => {
		admins.value = docs
        selected.value = []
        docID.value = 'default'
	}).catch((err) => {
		console.log(err)
	})
}

const selected = ref([])
const docID = ref('default')
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

loadData()
</script>

<style>

</style>
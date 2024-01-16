<template>
	<div class="col-md-5 rounded-3 m-2 order-md-1" style="background-color:#80ED99; min-height: 50vh; max-height: 70vh;">
        <div class="shadow m-3 p-1 rounded-3" style="background-color:#57CC99">
            <h3 class="text-center" style>Admins</h3>
        </div>
        <b-container fluid id="content">
            <b-button-group class="my-1 d-flex">
                <b-button variant="success" v-b-modal.addAdmin>Add</b-button>
                <b-button v-if="selected.length > 0" variant="danger" v-b-modal.deleteAdmin>Delete</b-button>
                <b-button v-if="selected.length == 1" variant="primary" v-b-modal.modifyAdmin @click="$refs.modUser.loadData">Modify</b-button>
            </b-button-group>
            <div style="overflow:auto"><table class="table table-hover table-responsive">
                <thead><tr>
                    <th scope="col">
                        <b-button variant="outline-success" size="sm" @click="selectAll">
                            <font-awesome-icon icon="fa-solid fa-check" size="1x" />
                        </b-button>
                    </th>
                    <th scope="col">Name</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Email</th>
                </tr></thead>
                <tbody ref="rows" id="rows">
                    <tr v-for="admin in admins" :key="admin">
                        <td><b-form-checkbox :value="admin.id" @click="updateSelected" /></td>
                        <td>{{ admin.name }}</td>
                        <td>{{ admin.phone }}</td>
                        <td>{{ admin.email }}</td>
                    </tr>
                </tbody>
            </table></div>
        </b-container> 
    </div>
    <AddUser title="Admin" @submitClick="addAdmin"/>
    <ModifyUser title="Admin" :id="docID" ref="modUser" @submitClick="modAdmin"/>
    <DeleteModal title="Admin" :ids="selected" @submitClick="delAdmin"/>
</template>

<script setup>
import AddUser from '@/components/Admin_Modals/AddUser.vue'
import DeleteModal from '@/components/Admin_Modals/DeleteModal.vue'
import ModifyUser from '@/components/Admin_Modals/ModifyUser.vue'

import getCollection from '@/db/getCollection'
import { ref } from 'vue'

const admins = ref([])
await(getCollection('admins'))
.getDocuments().then((docs) => {
    admins.value = docs
}).catch((err) => {
    console.log(err)
})

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
const refresh = () => {
    const rows = document.querySelectorAll('#rows input[type=checkbox]')
    rows.forEach((row) => {
        row.checked = false
    })
    selected.value = []
}
const selectAll = () => {
	const checkboxes = event.target.closest('table')
						.querySelectorAll('input[type=checkbox]')
	checkboxes.forEach((checkbox) => {
		checkbox.checked = true
	})
	updateSelected()
}

const addAdmin = (user) => {
	admins.value.push(user)
    refresh()
}
const modAdmin = (id, name, email, phone) => {
	const index = admins.value.findIndex((admin) => admin.id == id)
	admins.value[index].name = name
    admins.value[index].email = email
	admins.value[index].phone = phone
    refresh()
}
const delAdmin = (ids) => {
	ids.forEach((id) => {
		admins.value = admins.value.filter((user) => user.id != id)
	})
    refresh()
}

</script>

<style>

</style>
<template>
	<section class="container-fluid">
		<b-button-group class="my-1 d-flex">
			<b-form-select v-model="role" :options="roles" @update:modelValue="loadData" />
			<b-button variant="success" :disabled="role == 'default'" v-b-modal.addPic>Add</b-button>
		</b-button-group>
		<table class="table table-hover table-responsive">
			<thead><tr>
				<th scope="col">Title</th>
				<th scope="col">Context</th>
				<th scope="col" v-if="role == 'default'">Role</th>
				<th scope="col">Date</th>
				<th scope="col">View/Delete</th>
			</tr></thead>
			<tbody ref="rows" id="rows">
				<tr v-for="pic in pics" :key="pic">
					<td>{{ pic.title }}</td>
					<td>{{ pic.context }}</td>
					<td v-if="role == 'default'">{{ pic.role }}</td>
					<td>{{ pic.date.slice(0, 10) }}</td>
					<td><b-button @click="target = pic" v-b-modal.Pic>View</b-button>
                        <b-button variant="outline-danger" size="sm" class="m-1" @click="delPic(pic)">
                            <font-awesome-icon icon="fa-solid fa-trash" size="1x" />
                        </b-button>
                    </td>
				</tr>
			</tbody>
		</table>
		<b-modal id="addPic" title="Add Pic" aria-labelledby="addPic" aria-hidden="true" :hide-footer="true">
			<b-form @submit="addPic">
				<b-form-input v-model="title" class="d-flex mx-auto my-1" size="lg" placeholder="Enter Title" required />
				<b-form-input v-model="context" class="d-flex mx-auto my-1" size="lg" placeholder="Enter Context" />
				<input type="file" class="d-flex mx-auto my-1" name="file" @change="onFileChange" required/>
				<div class="d-flex mb-1 justify-content-end">
					<b-button-group>
						<b-button type="reset" variant="danger" size="lg">Reset </b-button>
						<b-button type="submit" variant="primary" size="lg"
						:disabled="uploadText != 'Upload'">{{ uploadText }}</b-button>
					</b-button-group>
				</div>
			</b-form>
		</b-modal>
		<ViewImage name="Pic" :title="target.title" :src="target.url" />
	</section>
</template>

<script setup>
import ViewImage from '@/components/Admin_Modals/ViewImage.vue'

import getCollection from '@/db/getCollection'
import addCollection from '@/db/addDocument'
import useDocument from '@/db/useDocument'
import useStorage from '@/db/useStorage'
import { ref } from 'vue'

const roles = [
	{ value: 'default', text: 'Select Role' },
    { value: 'activities', text: 'activities' },
    { value: 'awards', text: 'awards' },
    { value: 'banners', text: 'banners' },
    { value: 'photos', text: 'photos' }
]
const role = ref('default')
const title = ref('')
const context = ref('')
const file1 = ref(null)
const onFileChange = (e) => {
    file1.value = e.target.files[0]
}

const target = ref({})
const res = ref([])
const pics = ref([])
const loadData = () => {
    pics.value = role.value == 'default' ? res.value
        : res.value.filter(pic => pic.role == role.value)

    uploadText.value = 'Upload'
}

const uploadText = ref('Upload')
const addPic = async () => {
    let file = file1.value
    let path = `gallery/${role.value}/${file.name}` 
    uploadText.value = 'Uploading...'

    await useStorage().uploadFile(file, path).then(async(file) => {
        if(file) {
            await (await addCollection('gallery')).addDocument('', {
                role: role.value,
                title: title.value,
                context: context.value,
                url: file.url,
                path: file.snapshot.metadata.fullPath,
                date: file.snapshot.metadata.timeCreated
            }).then((uid) => {
                res.value.push({
                    id: uid,
                    role: role.value,
                    title: title.value,
                    context: context.value,
                    url: file.url,
                    path: file.snapshot.metadata.fullPath,
                    date: file.snapshot.metadata.timeCreated
                })
                title.value = ''
				context.value = ''
                file1.value = null
                loadData()
            }).catch((err) => {
                console.log(err)
            })
        }
        else
            console.log('File not uploaded')
    }).catch((err) => {
        console.log(err)
    })
}

const delPic = async (pic) => {
    await useStorage().deleteFile(pic.path).then(async(file) => {
        if(file) {
            await (await useDocument('gallery', pic.id)).delDoc()
			.then(() => {
                res.value.splice(res.value.indexOf(pic), 1)
                loadData()
            }).catch((err) => {
                console.log(err)
            })
        }
        else
            console.log('File not found')
    }).catch((err) => {
        console.log(err)
    })
}

getCollection('gallery', '', '', '', '')
.getDocuments().then((docs) => {
    res.value = docs
    loadData()
}).catch((err) => {
    console.log(err)
})
</script>

<style>

</style>
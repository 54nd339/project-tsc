<template>
	<section class="container-fluid">
		<b-button-group class="my-1">
			<b-button variant="success" v-b-modal.addTopper>Add</b-button>
		</b-button-group>
		<div style="overflow-x:auto"><table class="table table-hover table-responsive">
			<thead><tr>
				<th scope="col">Name</th>
				<th scope="col">Course</th>
				<th scope="col">Score</th>
				<th scope="col">View/Delete</th>
			</tr></thead>
			<tbody ref="rows" id="rows">
				<tr v-for="topper in toppers" :key="topper">
					<td>{{ topper.name }}</td>
					<td>{{ topper.course }}</td>
					<td>{{ topper.score }}</td>
					<td><b-button @click="target = topper" v-b-modal.Topper>View</b-button>
                        <b-button variant="outline-danger" size="sm" class="m-1" @click="delTopper(topper)">
                            <font-awesome-icon icon="fa-solid fa-trash" size="1x" />
                        </b-button>
                    </td>
				</tr>
			</tbody>
		</table></div>
		<b-modal id="addTopper" title="Add Topper" aria-labelledby="addTopper" aria-hidden="true" :hide-footer="true">
			<b-form @submit="addTopper">
				<b-form-input v-model="name" class="d-flex mx-auto my-1" size="lg" placeholder="Enter Name" required />
				<b-form-input v-model="course" class="d-flex mx-auto my-1" size="lg" placeholder="Enter Course" required />
				<b-form-input v-model="score" class="d-flex mx-auto my-1" size="lg" placeholder="Enter Score" required />
				<input type="file" class="d-flex mx-auto my-1" :name="file1" @change="onFileChange" required/>
				<div class="d-flex mb-1 justify-content-end">
					<b-button-group>
						<b-button type="reset" variant="danger" size="lg">Reset </b-button>
						<b-button type="submit" variant="primary" size="lg"
						:disabled="uploadText != 'Upload'">{{ uploadText }}</b-button>
					</b-button-group>
				</div>
			</b-form>
		</b-modal>
		<ViewImage name="Topper" :title="target.title" :src="target.url" />
	</section>
</template>

<script setup>
import ViewImage from '@/components/Admin_Modals/ViewImage.vue'
import getCollection from '@/db/getCollection'
import addCollection from '@/db/addDocument'
import useDocument from '@/db/useDocument'
import useStorage from '@/db/useStorage'
import { ref } from 'vue'

const name = ref('')
const course = ref('')
const score = ref('')
const file1 = ref(null)
const onFileChange = (e) => {
    file1.value = e.target.files[0]
}
const target = ref({})
const toppers = ref([])
await (getCollection('toppers'))
.getDocuments().then((docs) => {
    toppers.value = docs
}).catch((err) => {
    console.log(err)
})

const uploadText = ref('Upload')
const addTopper = async () => {
    let file = file1.value
    let path = `gallery/toppers/${file.name}` 
    uploadText.value = 'Uploading...'

    await useStorage().uploadFile(file, path).then(async(res) => {
        if(res) {
            await (await addCollection('toppers')).addDocument('', {
                name: name.value,
                course: course.value,
                score: score.value,
                url: res.url,
                path: res.snapshot.metadata.fullPath,
                date: res.snapshot.metadata.timeCreated
            }).then((uid) => {
                toppers.value.push({
                    id: uid,
                    name: name.value,
                    course: course.value,
                    score: score.value,
                    url: res.url,
                    path: res.snapshot.metadata.fullPath,
                    date: res.snapshot.metadata.timeCreated
                })
                name.value = ''
				course.value = ''
                score.value = ''
                uploadText.value = 'Upload'
                file1.value = null
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
const delTopper = async (topper) => {
    await useStorage().deleteFile(topper.path).then(async(res) => {
        if(res) {
            await (await useDocument('toppers', topper.id)).delDoc()
			.then(() => {
                toppers.value = toppers.value.filter((item) => item.id != topper.id)
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

</script>

<style>

</style>
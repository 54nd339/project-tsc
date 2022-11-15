<template>
	<section class="container-fluid">
		<b-button-group class="my-1">
            <b-button variant="success" v-b-modal.addBatch>Add</b-button>
            <b-button v-if="selected.length > 0" variant="danger" v-b-modal.deleteBatch>Delete</b-button>
            <b-button v-if="selected.length == 1" variant="primary" v-b-modal.modifyBatch>Modify</b-button>
        </b-button-group>
		<div style="overflow-x:auto"><table class="table table-hover table-responsive">
			<thead><tr>
				<th scope="col">#</th>
				<th scope="col">Title</th>
                <th scope="col">SubTitle</th>
				<th scope="col">Context</th>
                <th scope="col">View/Delete</th>
			</tr></thead>
			<tbody ref="rows" id="rows">
				<tr v-for="batch in batches" :key="batch">
					<td><b-form-checkbox :value="batch.id" @click="updateSelected" /></td>
					<td>{{ batch.title }}</td>
					<td>{{ batch.subtitle }}</td>
					<td>{{ batch.context }}</td>
                    <td><b-button v-b-modal.Batch @click="target = batch">View</b-button>
                        <b-button variant="outline-danger" size="sm" class="m-1" @click="delBatch(batch)">
                            <font-awesome-icon icon="fa-solid fa-trash" size="1x" /></b-button>
                    </td>
				</tr>
			</tbody>
		</table></div>
        <b-modal id="addBatch" title="Add Batch" aria-labelledby="addBatch" aria-hidden="true" :hide-footer="true">
            <b-form @submit="addBatch">
                <b-form-input v-model="title" class="d-flex mx-auto my-1" size="lg" placeholder="Enter Title" required />
                <b-form-input v-model="subtitle" class="d-flex mx-auto my-1" size="lg" placeholder="Enter SubTitle" required />
                <b-form-textarea v-model="context" class="d-flex mx-auto my-1" size="lg" no-resize
                    placeholder="Enter Context" rows="3" max-rows="8" required />
                <input name="file" class="d-flex mx-auto my-1" type="file" @change="onFileChange" required/>
                <div class="d-flex mb-1 justify-content-end">
                    <b-button-group>
                        <b-button type="reset" variant="danger" size="lg">Reset </b-button>
                        <b-button type="submit" variant="primary" size="lg"
                            :disabled="uploadText != 'Upload'">{{ uploadText }}</b-button>
                    </b-button-group>
                </div>
            </b-form>
        </b-modal>
        <b-modal id="modifyBatch" title="Modify Batch" aria-labelledby="modifyBatch" aria-hidden="true" :hide-footer="true">
            <b-form @submit="modBatch">
                <b-form-input v-model="target.title" class="d-flex mx-auto my-1" size="lg" placeholder="Enter Title" required />
                <b-form-input v-model="target.subtitle" class="d-flex mx-auto my-1" size="lg" placeholder="Enter SubTitle" required />
                <b-form-textarea v-model="target.context" class="d-flex mx-auto my-1" size="lg" no-resize
                    placeholder="Enter Context" rows="3" max-rows="8" required />
                <div class="d-flex mb-1 justify-content-end">
                    <b-button-group>
                        <b-button type="reset" variant="danger" size="lg">Reset </b-button>
                        <b-button type="submit" variant="primary" size="lg">Submit</b-button>
                    </b-button-group>
                </div>
            </b-form>
        </b-modal>
		<ViewImage name="Batch" :title="target.title" :src="target.url" />
	</section>
</template>

<script setup>
import ViewImage from '@/components/Admin_Modals/ViewImage.vue'

import addCollection from '@/db/addDocument'
import getCollection from '@/db/getCollection'
import useDocument from '@/db/useDocument'
import useStorage from '@/db/useStorage'
import { ref } from 'vue'

const batches = ref([])
await(getCollection('batches'))
.getDocuments().then((docs) => {
    batches.value = docs
}).catch((err) => {
    console.log(err)
})

const selected = ref([])
const target = ref({})
const updateSelected = () => {
	const checked = event.target.closest('table')
		.querySelectorAll('input[type=checkbox]:checked')
	let ids = []
	checked.forEach((check) => {
		ids.push(check.value)
	})
	selected.value = ids
    if(selected.value.length > 0) {
        target.value = batches.value.find((batch) => batch.id == selected.value[0])
    }
}
const refresh = () => {
    const rows = document.querySelectorAll('#rows input[type=checkbox]')
    rows.forEach((row) => {
        row.checked = false
    })
    selected.value = []
}

const title = ref('')
const subtitle = ref('')
const context = ref('')
const file1 = ref(null)
const uploadText = ref('Upload')
const onFileChange = (e) => {
    file1.value = e.target.files[0]
}

const addBatch = async() => {
    let file = file1.value
    let path = `gallery/batches/${file.name}` 
    uploadText.value = 'Uploading...'

    await useStorage().uploadFile(file, path).then(async(res) => {
        if(res) {
            await (await addCollection('batches')).addDocument('', {
                title: title.value,
                subtitle: subtitle.value,
                context: context.value,
                url: res.url,
                path: res.snapshot.metadata.fullPath,
                date: res.snapshot.metadata.timeCreated
            }).then((uid) => {
                batches.value.push({
                    id: uid,
                    title: title.value,
                    subtitle: subtitle.value,
                    context: context.value,
                    url: res.url,
                    path: res.snapshot.metadata.fullPath,
                    date: res.snapshot.metadata.timeCreated
                })
                title.value = ''
                subtitle.value = ''
                context.value = ''
                file1.value = null
                uploadText.value = 'Upload'
                refresh()
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
const modBatch = async() => {
    const btn = event.target.closest('.modal-content')
                        .querySelector('.btn-close')
                        
    await(await useDocument('batches', target.value.id))
    .updateDocs(target.value).then(() => {
        btn.click()
        batches.value = batches.value.map((batch) => {
            if(batch.id == target.value.id)
                return target.value
            else
                return batch
        })
        refresh()
    }).catch((err) => {
        console.log(err)
    })
}
const delBatch = async (batch) => {
    await useStorage().deleteFile(batch.path).then(async(res) => {
        if(res) {
            await (await useDocument('batches', batch.id))
            .delDoc().then(() => {
                batches.value = batches.value.filter((b) => b.id != batch.id)
                refresh()
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
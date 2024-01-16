<template>
	<b-container fluid>
		<b-button-group class="my-1">
            <b-button variant="success" @click="update()">Update</b-button>
            <b-button variant="success" v-b-modal.addQuery>Add</b-button>
            <b-button v-if="selected.length > 0" variant="danger" v-b-modal.deleteQuery>Delete</b-button>
            <b-button v-if="selected.length == 1" variant="primary" v-b-modal.modifyQuery>Modify</b-button>
        </b-button-group>
		<div style="overflow-x:auto"><table class="table table-hover table-responsive">
			<thead><tr>
				<th scope="col">#</th>
				<th scope="col">Query</th>
			</tr></thead>
			<tbody ref="rows" id="rows">
				<tr v-for="(query, index) in queries" :key="query">
					<td><b-form-checkbox :value="index" @click="updateSelected" /></td>
					<td>{{ query }}</td>
				</tr>
			</tbody>
		</table></div>
	</b-container>
    <b-modal id="addQuery" title="Add Query" aria-labelledby="addQuery" aria-hidden="true" :hide-footer="true">
        <b-form @submit="addQuery">
            <b-form-textarea v-model="context" class="d-flex mx-auto my-1" size="lg" no-resize
                placeholder="Enter Context" rows="3" max-rows="8" required />
            <div class="d-flex mb-1 justify-content-end">
                <b-button-group>
                    <b-button type="reset" variant="danger" size="lg">Reset </b-button>
                    <b-button type="submit" variant="primary" size="lg">Submit</b-button>
                </b-button-group>
            </div>
        </b-form>
    </b-modal>
    <b-modal id="modifyQuery" title="Modify Query" aria-labelledby="modifyQuery" aria-hidden="true" :hide-footer="true">
        <b-form @submit="modQuery">
            <b-form-textarea v-model="queries[target]" class="d-flex mx-auto my-1" size="lg" no-resize
                placeholder="Enter Context" rows="3" max-rows="8" required />
            <div class="d-flex mb-1 justify-content-end">
                <b-button-group>
                    <b-button type="reset" variant="danger" size="lg">Reset </b-button>
                    <b-button type="submit" variant="primary" size="lg">Submit</b-button>
                </b-button-group>
            </div>
        </b-form>
    </b-modal>
    <b-modal id="deleteQuery" title="Delete Query" aria-labelledby="deleteQuery" aria-hidden="true" :hide-footer="true">
		<b-form @submit="delQuery">
			<p class="justify-content-center align-items-center" id="deleteText">Confirm Delete?</p>
			<b-button type="submit" variant="danger d-flex mx-auto mt-2" size="lg">Delete</b-button>
		</b-form>
	</b-modal>
</template>

<script setup>
import getCollection from '@/db/getCollection'
import useDocument from '@/db/useDocument'
import { ref } from 'vue'

const queries = ref([])
await(await useDocument('notices', 'feedback'))
.getDetail().then((data) => {
    queries.value = data.queries
}).catch((err) => {
    console.log(err)
})

const selected = ref([])
const target = ref(0)
const updateSelected = () => {
    const checked = event.target.closest('table')
		.querySelectorAll('input[type=checkbox]:checked')
    let ids = []
	checked.forEach((check) => {
		ids.push(check.value)
	})
	selected.value = ids
    if(ids.length > 0) {
        target.value = ids[0]
    }
}
const refresh = () => {
    const rows = document.querySelectorAll('#rows input[type=checkbox]')
    rows.forEach((row) => {
        row.checked = false
    })
    context.value = ''
    selected.value = []
}

const context = ref('')
const addQuery = async() => {
    queries.value.push(context.value)
    refresh()
}
const modQuery = async() => {
    const btn = event.target.closest('.modal-content')
                        .querySelector('.btn-close')
    btn.click()
    refresh()
}
const delQuery = async() => {
    const btn = event.target.closest('.modal-content')
                        .querySelector('.btn-close')
    let updated = queries.value.filter((query, index) => {
        return !selected.value.includes(index.toString())
    })
    btn.click()
    queries.value = updated
    refresh()
}

const update = async() => {
    await(await useDocument('notices', 'feedback'))
    .updateDocs({queries: queries.value}).then(async () => {
        await getCollection('teachers')
        .getDocuments().then((teachers) => {
            teachers.forEach(async(teacher) => {
                await(await useDocument('teachers', teacher.id))
                .updateDocs({rating: {
                    count: 0,
                    val: 0,
                    vals: Array(queries.value.length).fill(0) }
                }).then(() => {
                    // console.log('Updated')
                }).catch((err) => {
                    console.log(err)
                })
            })
        }).catch((err) => {
            console.log(err)
        })
    }).catch((err) => {
        console.log(err)
    })
}
</script>

<style>

</style>
<template>
	<section class="container-fluid">
		<b-button-group class="my-1">
            <b-button variant="success" v-b-modal.addNotice>Add</b-button>
            <b-button v-if="selected.length > 0" variant="danger" v-b-modal.deleteNotice>Delete</b-button>
            <b-button v-if="selected.length == 1" variant="primary" v-b-modal.modifyNotice>Modify</b-button>
        </b-button-group>
		<table class="table table-hover table-responsive">
			<thead><tr>
				<th scope="col">#</th>
				<th scope="col">Title</th>
				<th scope="col">Context</th>
			</tr></thead>
			<tbody ref="rows" id="rows">
				<tr v-for="notice in notices" :key="notice">
					<td><b-form-checkbox :value="notice.id" @click="updateSelected" /></td>
					<td>{{ notice.title }}</td>
					<td>{{ notice.context }}</td>
				</tr>
			</tbody>
		</table>
        <b-modal id="addNotice" title="Add Notice" aria-labelledby="addNotice" aria-hidden="true" :hide-footer="true">
            <b-form @submit="addNotice">
                <b-form-input v-model="title" class="d-flex mx-auto my-1" size="lg" placeholder="Enter Title" required />
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
        <b-modal id="modifyNotice" title="Modify Notice" aria-labelledby="modifyNotice" aria-hidden="true" :hide-footer="true">
            <b-form @submit="modNotice">
                <b-form-input v-model="target.title" class="d-flex mx-auto my-1" size="lg" placeholder="Enter Title" required />
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
		<DeleteModal title="Notice" :ids="selected" @submitClick="delNotice"/>
	</section>
</template>

<script setup>
import DeleteModal from '@/components/Admin_Modals/DeleteModal.vue'
import addCollection from '@/db/addDocument'
import getCollection from '@/db/getCollection'
import useDocument from '@/db/useDocument'
import { ref } from 'vue'

const notices = ref([])
await(getCollection('notices'))
.getDocuments().then((docs) => {
    notices.value = docs
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
    if(ids.length > 0) {
        target.value = notices.value.find((notice) => notice.id == ids[0])
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
const context = ref('')
const addNotice = async() => {
    await (await addCollection('notices'))
    .addDocument('', {
        title: title.value,
        context: context.value
    }).then((uid) => {
        notices.value.push({
            id: uid,
            title: title.value,
            context: context.value
        })
        title.value = ''
        context.value = ''
        refresh()
    }).catch((err) => {
        console.log(err)
    }) 
}
const modNotice = async() => {
    const btn = event.target.closest('.modal-content')
                        .querySelector('.btn-close')
    await(await useDocument('notices', target.value.id))
    .updateDocs(target.value).then(() => {
        notices.value.forEach((notice) => {
            if (notice.id == target.value.id) {
                notice.title = target.value.title
                notice.context = target.value.context
            }
        })
        btn.click()
        refresh()
    }).catch((err) => {
        console.log(err)
    })
}
const delNotice = (ids) => {
	ids.forEach((id) => {
		notices.value = notices.value.filter((notice) => notice.id != id)
	})
}
</script>

<style>

</style>
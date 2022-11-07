<template>
	<section class="container-fluid">
		<b-button-group class="my-1">
            <b-button variant="success" v-b-modal.addFaq>Add</b-button>
            <b-button v-if="selected.length > 0" variant="danger" v-b-modal.deleteFaq>Delete</b-button>
            <b-button v-if="selected.length == 1" variant="primary" v-b-modal.modifyFaq>Modify</b-button>
        </b-button-group>
		<table class="table table-hover table-responsive">
			<thead><tr>
				<th scope="col">#</th>
				<th scope="col">Question</th>
				<th scope="col">Answer</th>
			</tr></thead>
			<tbody ref="rows" id="rows">
				<tr v-for="faq in faqs" :key="faq">
					<td><b-form-checkbox :value="faq.id" @click="updateSelected" /></td>
					<td>{{ faq.question }}</td>
					<td>{{ faq.answer }}</td>
				</tr>
			</tbody>
		</table>
        <b-modal id="addFaq" title="Add Faq" aria-labelledby="addFaq" aria-hidden="true" :hide-footer="true">
            <b-form @submit="addFaq">
                <b-form-input v-model="question" class="d-flex mx-auto my-1" size="lg" placeholder="Enter Question" required />
                <b-form-textarea v-model="answer" class="d-flex mx-auto my-1" size="lg" no-resize
                    placeholder="Enter Answer" rows="3" max-rows="8" required />
                <div class="d-flex mb-1 justify-content-end">
                    <b-button-group>
                        <b-button type="reset" variant="danger" size="lg">Reset </b-button>
                        <b-button type="submit" variant="primary" size="lg">Submit</b-button>
                    </b-button-group>
                </div>
            </b-form>
        </b-modal>
        <b-modal id="modifyFaq" title="Modify Faq" aria-labelledby="modifyFaq" aria-hidden="true" :hide-footer="true">
            <b-form @submit="modFaq">
                <b-form-input v-model="target.question" class="d-flex mx-auto my-1" size="lg" placeholder="Enter Question" required />
                <b-form-textarea v-model="target.answer" class="d-flex mx-auto my-1" size="lg" no-resize
                    placeholder="Enter Answer" rows="3" max-rows="8" required />
                <div class="d-flex mb-1 justify-content-end">
                    <b-button-group>
                        <b-button type="reset" variant="danger" size="lg">Reset </b-button>
                        <b-button type="submit" variant="primary" size="lg">Submit</b-button>
                    </b-button-group>
                </div>
            </b-form>
        </b-modal>
		<DeleteModal title="Faq" :ids="selected" v-on:submitClick="loadData"/>
	</section>
</template>

<script setup>
import DeleteModal from '@/components/Admin_Modals/DeleteModal.vue'

import addCollection from '@/db/addDocument'
import getCollection from '@/db/getCollection'
import useDocument from '@/db/useDocument'
import { ref } from 'vue'

const faqs = ref([])
const loadData = async () => {
	let collection = getCollection('faqs', '', '', '')
	collection.getDocuments().then((docs) => {
		faqs.value = docs
		selected.value = []
	}).catch((err) => {
		console.log(err)
	})
}

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
    faqs.value.forEach((faq) => {
        if (faq.id == ids[0]) {
            target.value = faq
        }
    })
}

const question = ref('')
const answer = ref('')
const addFaq = async() => {
    await (await addCollection('faqs'))
    .addDocument('', {
        question: question.value,
        answer: answer.value
    }).then(() => {
        question.value = ''
        answer.value = ''
        loadData()
    }).catch((err) => {
        console.log(err)
    }) 
}

const modFaq = async() => {
    const btn = event.target.closest('.modal-content')
                        .querySelector('.btn-close')
    await(await useDocument('faqs', target.value.id))
    .updateDocs(target.value).then(() => {
        loadData()
        btn.click()
    }).catch((err) => {
        console.log(err)
    })
}

loadData()
</script>

<style>

</style>
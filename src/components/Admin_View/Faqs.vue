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
		<DeleteModal title="Faq" :ids="selected" @submitClick="delFaq"/>
	</section>
</template>

<script setup>
import DeleteModal from '@/components/Admin_Modals/DeleteModal.vue'
import addCollection from '@/db/addDocument'
import getCollection from '@/db/getCollection'
import useDocument from '@/db/useDocument'
import { ref } from 'vue'

const faqs = ref([])
let collection = getCollection('faqs')
collection.getDocuments().then((docs) => {
    faqs.value = docs
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
    if (ids.length > 0) {
        target.value = faqs.value.find((faq) => faq.id == ids[0])
    }
}
const refresh = () => {
    const rows = document.querySelectorAll('#rows input[type=checkbox]')
    rows.forEach((row) => {
        row.checked = false
    })
    selected.value = []
}

const question = ref('')
const answer = ref('')
const addFaq = async() => {
    await (await addCollection('faqs'))
    .addDocument('', {
        question: question.value,
        answer: answer.value
    }).then((uid) => {
        faqs.value.push({
            id: uid,
            question: question.value,
            answer: answer.value
        })
        question.value = ''
        answer.value = ''
        refresh()
    }).catch((err) => {
        console.log(err)
    }) 
}
const modFaq = async() => {
    const btn = event.target.closest('.modal-content')
                        .querySelector('.btn-close')
    await(await useDocument('faqs', target.value.id))
    .updateDocs(target.value).then(() => {
        faqs.value = faqs.value.map((faq) => {
            if(faq.id == target.value.id) {
                faq.question = target.value.question
                faq.answer = target.value.answer
            }
            return faq
        })
        btn.click()
        refresh()
    }).catch((err) => {
        console.log(err)
    })
}
const delFaq = (ids) => {
	ids.forEach((id) => {
		faqs.value = faqs.value.filter((faq) => faq.id != id)
	})
    refresh()
}

</script>

<style>

</style>
<template>
	<div class="col-md-5 rounded-3 m-2" style="background-color:#80ED99; max-height: 45vh; overflow-y: auto;">
        <div class="shadow m-3 p-1 rounded-3" style="background-color:#57CC99">
            <h3 class="text-center" style>Schedule Test</h3>
        </div>
        <div id="content" class="container-fluid">
            <b-button-group class="my-1">
                <b-button variant="success" v-b-modal.addTest>Add</b-button>
                <b-button v-if="selected.length > 0" variant="danger" v-b-modal.deleteTest>Delete</b-button>
                <b-button v-if="selected.length == 1 && !modify" variant="primary" @click="modify = !modify">Modify</b-button>
            </b-button-group>
            <table class="table table-hover table-responsive">
                <thead><tr>
                    <th scope="col">#</th>
                    <th scope="col">Class</th>
                    <th scope="col">Subject</th>
                    <th scope="col">FM</th>
                    <th scope="col">Date</th>
                </tr></thead>
                <tbody ref="rows" id="rows">
                    <tr v-for="test in tests" :key="test">
                        <td>
                            <b-button v-if="modify && test.id == docId" variant="outline-success" size="sm" @click="modData(test)">
                                <font-awesome-icon icon="fa-solid fa-check" size="1x" />
                            </b-button>
                            <b-form-checkbox v-else :value="test.id" @click="updateSelected" />
                        </td>
                        <td>
                            <b-form-select v-if="modify && test.id == docId" v-model="test.class" :options="gradeList" />
                            <p v-else>{{ test.class }}</p>
                        </td>
                        <td>
                            <b-form-select v-if="modify && test.id == docId" v-model="test.subject" :options="subjectList" />
                            <p v-else>{{ test.subject }}</p>
                        </td>
                        <td>
                            <b-form-input v-if="modify && test.id == docId" v-model="test.fm" type="number" />
                            <p v-else>{{ test.fm }}</p>
                        </td>
                        <td>
                            <b-form-input v-if="modify && test.id == docId" v-model="test.date" type="date" />
                            <p v-else>{{ test.date }}</p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <b-modal id="addTest" title="Add Test" aria-labelledby="addUser" aria-hidden="true" :hide-footer="true">
                <b-form @submit="addTest">
                    <b-form-select v-model="grade" :options="gradeList" class="d-flex mx-auto my-1" size="lg" required />
                    <b-form-select v-model="subject" :options="subjectList" class="d-flex mx-auto my-1" size="lg" required />
                    <b-form-input v-model="fm" type="number" class="d-flex mx-auto my-1"
                        size="lg" placeholder="Enter Full Marks" required />
                    <b-form-input v-model="date" type="date" class="d-flex mx-auto my-1"
                        size="lg" placeholder="Enter Date of Exam" required />
                    <div class="d-flex mb-1 justify-content-end">
                        <b-button-group>
                            <b-button type="reset" variant="danger" size="lg">Reset </b-button>
                            <b-button type="submit" variant="primary" size="lg">Submit</b-button>
                        </b-button-group>
                    </div>
                </b-form>
            </b-modal>
            <DeleteModal title="Test" :ids="selected" v-on:submitClick="loadData"/>
        </div> 
    </div>
</template>

<script setup>
import DeleteModal from '@/components/Admin_Modals/DeleteModal.vue'
import addCollection from '@/db/addDocument'
import getCollection from '@/db/getCollection'
import useDocument from '@/db/useDocument'
import { ref } from 'vue'

const props = defineProps({  
	gradeList: {
		type: Array,
		required: true
	},
	subjectList: {
		type: Array,
		required: true
	}
})

const tests = ref([])
const selected = ref([])
const docId = ref(null)
const modify = ref(false)
const loadData = async () => {
	let collection = getCollection('test', '')
	collection.getDocuments().then((docs) => {
		tests.value = docs
        selected.value = []
        docId.value = null
        modify.value = false
	}).catch((err) => {
		console.log(err)
	})
}
const updateSelected = () => {
	const checked = event.target.closest('table')
        .querySelectorAll('input[type=checkbox]:checked')
	let ids = []
	checked.forEach((check) => {
		ids.push(check.value)
	})
	selected.value = ids
    docId.value = ids[0]
}

const grade = ref(0)
const subject = ref('default')
const fm = ref(0)
const date = ref(null)
const addTest = async () => {
    await(await addCollection('test')).addDocument('', {
        class: grade.value,
        subject: subject.value,
        fm: fm.value,
        date: date.value
    }).then(() => {
        loadData()
    }).catch((err) => {
        console.log(err)
    })
}
const modData = async (test) => {
    await(await useDocument('test', docId.value))
    .updateDocs({
        class: test.class,
        subject: test.subject,
        fm: test.fm,
        date: test.date
    }).then(() => {
        loadData()
    }).catch((err) => {
        console.log(err)
    })
} 

loadData()
</script>

<style>

</style>
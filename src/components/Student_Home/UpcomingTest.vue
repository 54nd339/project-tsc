<template>
	<div class="col-md-5 rounded-3 m-2 order-md-2" style="background-color:#57CC99; min-height: 50vh; max-height: 70vh; overflow-y: auto;">
        <div class="shadow m-3 p-1 rounded-3" style="background-color:#80ED99">
            <h3 class="text-center" style>Upcoming Tests</h3>
        </div> 
        <div id="content" class="container-fluid">
            <table class="table table-hover table-responsive">
                <thead><tr>
                    <th scope="col">Topic</th>
                    <th scope="col">FM</th>
                    <th scope="col">Date</th>
                </tr></thead>
                <tbody ref="rows" id="rows">
                    <tr v-for="test in tests" :key="test">
                        <td>{{ test.topic }}</td>
                        <td>{{ test.fm }}</td>
                        <td>{{ test.date }}</td>
                    </tr>
                </tbody>
            </table>
        </div> 
    </div>
</template>

<script setup>
import getCollection from '@/db/getCollection'
import { ref } from 'vue'

const props = defineProps({
    student: {
		type: Object,
		required: true
	}
})

const tests = ref([])
const today = new Date().toJSON().slice(0, 10)
await getCollection('tests', ['course', '==', props.student.course],
    ['class', '==', props.student.class])
    .getDocuments().then((docs) => {
        docs.forEach((doc) => {
            if (doc.date > today) {
                tests.value.push(doc)
            }
        })
    }).catch((err) => {
        console.log(err)
    })
</script>

<style>

</style>
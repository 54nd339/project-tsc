<template>
    <div class="col-md-5 rounded-3 m-3" style="background-color:#80ED99; min-height: 45vh">
        <div class="shadow m-3 p-1 rounded-3" style="background-color:#57CC99">
            <h3 class="text-center" style>{{ student.name }}</h3>
        </div>
        <div class="d-flex justify-content-between mx-md-5">
            <h6>Course: {{ student.course }}</h6>
            <h6>Class: {{ student.class }}</h6>
        </div>
        <div class="d-flex justify-content-center mx-md-5">
            <b-form-select v-model="subject" :options="subjectList" @update:model-value="loadData" />
        </div>
        <table class="table table-hover table-responsive">
            <thead><tr>
                <th scope="col">Topic</th>
                <th scope="col">Date</th>
                <th scope="col">Marks</th>
            </tr></thead>
            <tbody ref="rows" id="rows">
                <tr v-for="mark in selected" :key="mark">
                    <td>{{ mark.topic }}</td>
                    <td>{{ mark.date }}</td>
                    <td>{{ mark.mark }} / {{ mark.fm }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
	subjectList: {
		type: Array,
		required: true
	},
    student: {
		type: Object,
		required: true
	}
})
const emit = defineEmits(['subChanged'])
const subject = ref('default')
const selected = ref([])
const loadData = async() => {
    if(subject.value === 'default') {
        selected.value = []
        return
    }
    selected.value = []
    emit('subChanged', subject.value)
	const marks = props.student.subjects[subject.value]
    marks.forEach(mark => {
    	if(mark.marked) {
    		selected.value.push(mark)
    	}
    })
}

loadData()
</script>

<style>

</style>
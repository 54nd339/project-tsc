<template>
	<div class="col-md-5 rounded-3 m-2" style="background-color:#57CC99; min-height: 50vh; max-height: 70vh; overflow-y: auto;">
        <div class="shadow m-3 p-1 rounded-3" style="background-color:#80ED99">
            <h3 class="text-center" style>Time Table</h3>
        </div>
        <b-container fluid id="content">
            <b-button-group class="my-1 d-flex">
                <b-form-select v-model="course" :options="courseList" @update:modelValue="loadData" />
                <b-form-select v-model="grade" :options="gradeList" @update:modelValue="loadData" />
                <b-button v-if="modify" variant="success" v-b-modal.confirm>Done</b-button>
                <b-button v-else variant="primary" @click="modify = !modify">Modify</b-button>
            </b-button-group>
            <div style="overflow-x:auto"><table class="table table-hover table-responsive">
                <thead><tr>
                    <th scope="col">Days</th>
                    <th scope="col" v-for="col in 3" :key="col">P - {{col}}</th>
                    <th scope="col">Start</th>
                    <th scope="col">End</th>
                </tr></thead>
                <tbody ref="rows" id="rows">
                    <tr><td>Monday</td>
                        <td v-for="(period, index) in schedule.mon.periods" :key="index">
                            <b-form-select v-if="modify" v-model="schedule.mon.periods[index]" :options="subjectList" />
                            <p v-else-if="schedule.mon.periods[index] != 'default'">{{ period }}</p>
                        </td>
                        <td><b-form-select v-if="modify" v-model= "schedule.mon.start" :options="hours" />
                            <p v-else>{{ schedule.mon.start }}</p></td>
                        <td><b-form-select v-if="modify" v-model= "schedule.mon.end" :options="hours" />
                            <p v-else>{{ schedule.mon.end }}</p>
                        </td>
                    </tr>
                    <tr><td>Tuesday</td>
                        <td v-for="(period, index) in schedule.tue.periods" :key="index">
                            <b-form-select v-if="modify" v-model= "schedule.tue.periods[index]" :options="subjectList" />
                            <p v-else-if="schedule.tue.periods[index] != 'default'">{{ period }}</p>
                        </td>
                        <td><b-form-select v-if="modify" v-model= "schedule.tue.start" :options="hours" />
                            <p v-else>{{ schedule.tue.start }}</p></td>
                        <td><b-form-select v-if="modify" v-model= "schedule.tue.end" :options="hours" />
                            <p v-else>{{ schedule.tue.end }}</p>
                        </td>
                    </tr>
                    <tr><td>Wednesday</td>
                        <td v-for="(period, index) in schedule.wed.periods" :key="index">
                            <b-form-select v-if="modify" v-model= "schedule.wed.periods[index]" :options="subjectList" />
                            <p v-else-if="schedule.wed.periods[index] != 'default'">{{ period }}</p>
                        </td>
                        <td><b-form-select v-if="modify" v-model= "schedule.wed.start" :options="hours" />
                            <p v-else>{{ schedule.wed.start }}</p></td>
                        <td><b-form-select v-if="modify" v-model= "schedule.wed.end" :options="hours" />
                            <p v-else>{{ schedule.wed.end }}</p>
                        </td>
                    </tr>
                    <tr><td>Thursday</td>
                        <td v-for="(period, index) in schedule.thu.periods" :key="index">
                            <b-form-select v-if="modify" v-model= "schedule.thu.periods[index]" :options="subjectList" />
                            <p v-else-if="schedule.thu.periods[index] != 'default'">{{ period }}</p>
                        </td>
                        <td><b-form-select v-if="modify" v-model= "schedule.thu.start" :options="hours" />
                            <p v-else>{{ schedule.thu.start }}</p></td>
                        <td><b-form-select v-if="modify" v-model= "schedule.thu.end" :options="hours" />
                            <p v-else>{{ schedule.thu.end }}</p>
                        </td>
                    </tr>
                    <tr><td>Friday</td>
                        <td v-for="(period, index) in schedule.fri.periods" :key="index">
                            <b-form-select v-if="modify" v-model= "schedule.fri.periods[index]" :options="subjectList" />
                            <p v-else-if="schedule.fri.periods[index] != 'default'">{{ period }}</p>
                        </td>
                        <td><b-form-select v-if="modify" v-model= "schedule.fri.start" :options="hours" />
                            <p v-else>{{ schedule.fri.start }}</p></td>
                        <td><b-form-select v-if="modify" v-model= "schedule.fri.end" :options="hours" />
                            <p v-else>{{ schedule.fri.end }}</p>
                        </td>
                    </tr>
                    <tr><td>Saturday</td>
                        <td v-for="(period, index) in schedule.sat.periods" :key="index">
                            <b-form-select v-if="modify" v-model= "schedule.sat.periods[index]" :options="subjectList" />
                            <p v-else-if="schedule.sat.periods[index] != 'default'">{{ period }}</p>
                        </td>
                        <td><b-form-select v-if="modify" v-model= "schedule.sat.start" :options="hours" />
                            <p v-else>{{ schedule.sat.start }}</p></td>
                        <td><b-form-select v-if="modify" v-model= "schedule.sat.end" :options="hours" />
                            <p v-else>{{ schedule.sat.end }}</p>
                        </td>
                    </tr>
                </tbody>
            </table></div>
            <!-- <b-button @click="test">Click Me Honey!</b-button> -->
        </b-container> 
    </div>
    <b-modal id="confirm" title="Confirm Changes" :hide-footer="true">
        <b-form @submit="saveData">
            <p class="justify-content-center align-items-center" id="deleteText">Confirm Changes?</p>
            <b-button type="submit" variant="danger d-flex mx-auto mt-2" size="lg">Modify</b-button>
        </b-form>
    </b-modal>
</template>

<script setup>
import getCollection from '@/db/getCollection'
import useDocument from '@/db/useDocument'
// import test from '@/db/test'
import { ref } from 'vue'

const props = defineProps({    
	courseList: {
		type: Array,
		required: true
	},
	gradeList: {
		type: Array,
		required: true
	},
	subjectList: {
		type: Array,
		required: true
	}
})
const modify = ref(false)
const course = ref('ICSE')
const grade = ref(10)
const schedule = ref({})
const hours = ref([])
for(let i = 8; i < 20; i++) {
    for(let j = 0; j < 60; j += 15) {
        hours.value.push(i + ':' + (j < 10 ? '0'+j : j))
    }
}
hours.value.push('20:00')

const res = ref([])
await getCollection('schedule')
.getDocuments().then((data) => {
    res.value = data
}).catch((err) => {
    console.log(err)
})
const loadData = async () => {
    modify.value = false
    if(course.value == 'default' || grade.value == 0)
        return

    const docId = course.value + '_' + grade.value
    schedule.value = res.value.find((doc) => doc.id == docId)
}
const saveData = async () => {
    const btn = event.target.closest('.modal-content')
                    .querySelector('.btn-close')

    const docId = course.value + '_' + grade.value
    await (await useDocument('schedule', docId))
    .updateDocs(schedule.value).then(() => {
        btn.click()
        loadData()
    }).catch((err) => {
        console.log(err)
    })
}
loadData()
</script>

<style>

</style>
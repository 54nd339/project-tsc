<template>
	<div class="col-md-5 rounded-3 m-2" style="background-color:#57CC99; max-height: 45vh; overflow-y: auto;">
        <div class="shadow m-3 p-1 rounded-3" style="background-color:#80ED99">
            <h3 class="text-center" style>Time Table</h3>
        </div>
        <div id="content" class="container-fluid">
            <b-button-group class="my-1">
                <b-form-select v-model="grade" :options="gradeList" @update:modelValue="loadData" />
                <b-button v-if="modify" variant="success" v-b-modal.confirm>Done</b-button>
                <b-button v-else variant="primary" @click="modify = !modify">Modify</b-button>
            </b-button-group>
            <table class="table table-hover table-responsive">
                <thead><tr>
                    <th scope="col">Days</th>
                    <th scope="col"  v-for="col in 3" :key="col">Period {{col}}</th>
                </tr></thead>
                <tbody ref="rows" id="rows">
                    <tr>
                        <td>Monday</td>
                        <td v-for="(period, index) in schedule.mon" :key="period">
                            <b-form-select v-if="modify" v-model= "schedule.mon[index]" :options="subjectList" />
                            <p v-else-if="schedule.mon[index] != 'default'">{{ period }}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>Tuesday</td>
                        <td v-for="(period, index) in schedule.tue" :key="period">
                            <b-form-select v-if="modify" v-model= "schedule.tue[index]" :options="subjectList" />
                            <p v-else-if="schedule.tue[index] != 'default'">{{ period }}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>Wednesday</td>
                        <td v-for="(period, index) in schedule.wed" :key="period">
                            <b-form-select v-if="modify" v-model= "schedule.wed[index]" :options="subjectList" />
                            <p v-else-if="schedule.wed[index] != 'default'">{{ period }}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>Thursday</td>
                        <td v-for="(period, index) in schedule.thu" :key="period">
                            <b-form-select v-if="modify" v-model= "schedule.thu[index]" :options="subjectList" />
                            <p v-else-if="schedule.thu[index] != 'default'">{{ period }}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>Friday</td>
                        <td v-for="(period, index) in schedule.fri" :key="period">
                            <b-form-select v-if="modify" v-model= "schedule.fri[index]" :options="subjectList" />
                            <p v-else-if="schedule.fri[index] != 'default'">{{ period }}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>Saturday</td>
                        <td v-for="(period, index) in schedule.sat" :key="period">
                            <b-form-select v-if="modify" v-model= "schedule.sat[index]" :options="subjectList" />
                            <p v-else-if="schedule.sat[index] != 'default'">{{ period }}</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div> 
        <b-modal id="confirm" title="Confirm Changes" :hide-footer="true">
            <b-form @submit="saveData">
                <p class="justify-content-center align-items-center" id="deleteText">Confirm Changes?</p>
                <b-button type="submit" variant="danger d-flex mx-auto mt-2" size="lg">Modify</b-button>
            </b-form>
        </b-modal>
    </div>
</template>

<script setup>
import getDocument from '@/db/getDocument'
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
const modify = ref(false)
const grade = ref(10)
const schedule = ref({})

const loadData = async () => {
    const docId = 'class_' + grade.value
    await getDocument('schedule', docId).getDetail().then((doc) => {
        schedule.value = doc
        // console.log(doc)
    }).catch((err) => {
        console.log(err)
    })
    modify.value = false
}
const saveData = async () => {
    const btn = event.target.closest('.modal-content')
                    .querySelector('.btn-close')

    const docId = 'class_' + grade.value
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
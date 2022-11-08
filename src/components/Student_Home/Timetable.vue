<template>
    <div class="col-md-5 rounded-3 m-3 order-md-1" style="background-color:#57CC99; min-height: 45vh;">
        <div class="shadow m-3 p-1 rounded-3" style="background-color:#80ED99">
            <h3 class="text-center" style>Time Table</h3>
        </div>
        <div id="content" class="container-fluid">
            <table class="table table-hover table-responsive">
                <thead><tr>
                    <th scope="col">Days</th>
                    <th scope="col" v-for="col in 3" :key="col">Period {{col}}</th>
                </tr></thead>
                <tbody ref="rows" id="rows">
                    <tr>
                        <td>Monday</td>
                        <td v-for="(period, index) in schedule.mon" :key="index">
                            <p v-if="schedule.mon[index] != 'default'">{{ period }}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>Tuesday</td>
                        <td v-for="(period, index) in schedule.tue" :key="index">
                            <p v-if="schedule.tue[index] != 'default'">{{ period }}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>Wednesday</td>
                        <td v-for="(period, index) in schedule.wed" :key="index">
                            <p v-if="schedule.wed[index] != 'default'">{{ period }}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>Thursday</td>
                        <td v-for="(period, index) in schedule.thu" :key="index">
                            <p v-if="schedule.thu[index] != 'default'">{{ period }}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>Friday</td>
                        <td v-for="(period, index) in schedule.fri" :key="index">
                            <p v-if="schedule.fri[index] != 'default'">{{ period }}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>Saturday</td>
                        <td v-for="(period, index) in schedule.sat" :key="index">
                            <p v-if="schedule.sat[index] != 'default'">{{ period }}</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div> 
    </div>
</template>

<script setup>
import useDocument from '@/db/useDocument'
import { ref } from 'vue'

const props = defineProps({
	student: {
		type: Object,
		required: true
	}
})

const schedule = ref({})
const docId = props.student.course + '_' + props.student.class
await (await useDocument('schedule', docId))
.getDetail().then((doc) => {
    schedule.value = doc
    // console.log(doc)
}).catch((err) => {
    console.log(err)
})
</script>

<style>

</style>
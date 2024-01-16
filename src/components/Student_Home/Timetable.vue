<template>
    <div class="col-md-5 rounded-3 m-2 order-md-1" style="background-color:#80ED99; min-height: 50vh; max-height: 70vh; overflow-y: auto;">
        <div class="shadow m-3 p-1 rounded-3" style="background-color:#57CC99">
            <h3 class="text-center" style>Time Table</h3>
        </div>
        <b-container fluid id="content">
            <table class="table table-hover table-responsive">
                <thead><tr>
                    <th scope="col">Days</th>
                    <th scope="col" v-for="col in 3" :key="col">P - {{col}}</th>
                    <th scope="col">Timing</th>
                </tr></thead>
                <tbody ref="rows" id="rows">
                    <tr><td>Monday</td>
                        <td v-for="(period, index) in schedule.mon.periods" :key="index">
                            <p v-if="schedule.mon.periods[index] != 'default'">{{ period }}</p>
                        </td>
                        <td>{{ schedule.mon.start }} - {{ schedule.mon.end }}</td>
                    </tr>
                    <tr><td>Tuesday</td>
                        <td v-for="(period, index) in schedule.tue.periods" :key="index">
                            <p v-if="schedule.tue.periods[index] != 'default'">{{ period }}</p>
                        </td>
                        <td>{{ schedule.tue.start }} - {{ schedule.tue.end }}</td>
                    </tr>
                    <tr><td>Wednesday</td>
                        <td v-for="(period, index) in schedule.wed.periods" :key="index">
                            <p v-if="schedule.wed.periods[index] != 'default'">{{ period }}</p>
                        </td>
                        <td>{{ schedule.wed.start }} - {{ schedule.wed.end }}</td>
                    </tr>
                    <tr><td>Thursday</td>
                        <td v-for="(period, index) in schedule.thu.periods" :key="index">
                            <p v-if="schedule.thu.periods[index] != 'default'">{{ period }}</p>
                        </td>
                        <td>{{ schedule.thu.start }} - {{ schedule.thu.end }}</td>
                    </tr>
                    <tr><td>Friday</td>
                        <td v-for="(period, index) in schedule.fri.periods" :key="index">
                            <p v-if="schedule.fri.periods[index] != 'default'">{{ period }}</p>
                        </td>
                        <td>{{ schedule.fri.start }} - {{ schedule.fri.end }}</td>
                    </tr>
                    <tr><td>Saturday</td>
                        <td v-for="(period, index) in schedule.sat.periods" :key="index">
                            <p v-if="schedule.sat.periods[index] != 'default'">{{ period }}</p>
                        </td>
                        <td>{{ schedule.sat.start }} - {{ schedule.sat.end }}</td>
                    </tr>
                </tbody>
            </table>
        </b-container> 
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
<template>
	<div class="col-md-5 rounded-3 m-2" style="background-color:#57CC99; min-height: 50vh; max-height: 70vh; overflow-y: auto;">
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
    classList: {
        type: Array,
        required: true
    }
})
const schedule = ref({
    mon: ['default', 'default', 'default'],
    tue: ['default', 'default', 'default'],
    wed: ['default', 'default', 'default'],
    thu: ['default', 'default', 'default'],
    fri: ['default', 'default', 'default'],
    sat: ['default', 'default', 'default']
})
const loadData = async () => {
    let res = []
    props.classList.forEach((cls) => {
        const arr = cls.split('_')
        let docId, subject
        if(arr.length == 3)
            [docId, subject] = [arr[0]+'_'+arr[1], arr[2]]
        else
            [docId, subject] = [arr[0]+'_'+arr[1]+'_'+arr[2], arr[3]]

        res.push({
            classId: docId,
            sub: subject
        })
    })
    res.forEach(async (cls) => {
        (await useDocument('schedule', cls.classId))
        .getDetail().then((doc) => {
            if(doc) {
                doc.mon.forEach((period, index) => {
                    if(period == cls.sub)
                        schedule.value.mon[index] = cls.classId+'_'+cls.sub
                })
                doc.tue.forEach((period, index) => {
                    if(period == cls.sub)
                        schedule.value.tue[index] = cls.classId+'_'+cls.sub
                })
                doc.wed.forEach((period, index) => {
                    if(period == cls.sub)
                        schedule.value.wed[index] = cls.classId+'_'+cls.sub
                })
                doc.thu.forEach((period, index) => {
                    if(period == cls.sub)
                        schedule.value.thu[index] = cls.classId+'_'+cls.sub
                })
                doc.fri.forEach((period, index) => {
                    if(period == cls.sub)
                        schedule.value.fri[index] = cls.classId+'_'+cls.sub
                })
                doc.sat.forEach((period, index) => {
                    if(period == cls.sub)
                        schedule.value.sat[index] = cls.classId+'_'+cls.sub
                })
            }
        })
    })
}
loadData()
</script>

<style>

</style>
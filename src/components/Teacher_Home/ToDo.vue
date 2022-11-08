<template>
    <div class="col-md-5 rounded-3 m-3" style="background-color:#80ED99; min-height: 45vh">
        <div class="shadow m-3 p-1 rounded-3" style="background-color:#57CC99">
            <h3 class="text-center" style>To Do</h3>
        </div> 
        <table class="table table-hover table-responsive">
            <thead><tr>
                <th scope="col">List</th>
                <th scope="col">Add/Del</th>
            </tr></thead>
            <tbody ref="rows" id="rows">
                <tr>
                    <td><b-form-input type="text" placeholder="Enter Task" /></td>
                    <td><b-button variant="outline-success" class="mx-1" @click="add()">
                        <font-awesome-icon icon="fa-solid fa-plus" />
                    </b-button></td>
                </tr>
                <tr v-for="(task, index) in tasks" :key="index">
                    <td>{{ task }}</td>
                    <td><b-button variant="outline-danger" @click="delTask(index)">
                        <font-awesome-icon icon="fa-solid fa-trash" size="1x" />
                    </b-button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import useDocument from '@/db/useDocument'
import { ref } from 'vue'

const props = defineProps({
    teacher: {
        type: Object,
        required: true
    }
})
const tasks = ref([])
const loadData = () => {
    tasks.value = props.teacher.todo
}

const add = async() => {
    const textArea = event.target.closest('tr').querySelector('input[type=text]')
    const task = textArea.value
    tasks.value.push(task)
    await(await useDocument('teachers', props.teacher.id))
    .updateDocs({todo: tasks.value}).then(() => {
        loadData()
    }).catch((err) => {
        console.log(err)
    })
}
const delTask = async(index) => {
    tasks.value.splice(index, 1)
    await(await useDocument('teachers', props.teacher.id))
    .updateDocs({todo: tasks.value}).then(() => {
        loadData()
    }).catch((err) => {
        console.log(err)
    })
}

loadData()
</script>

<style>

</style>
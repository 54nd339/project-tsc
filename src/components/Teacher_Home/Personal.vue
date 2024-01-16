<template>
    <div class="col-md-5 rounded-3 m-2" style="background-color:#57CC99; min-height: 60vh; max-height: 70vh; overflow-y: auto;">
        <div class="shadow m-3 p-1 rounded-3" style="background-color:#80ED99">
            <h3 class="text-center" style>{{ teacher.name }}</h3>
        </div>
        <h6 class="mx-3"><b>CLASSES :</b></h6>
        <b-container fluid id="content">
            <table class="table table-hover table-responsive">
                <thead><tr>
                    <th scope="col">Class ID</th>
                    <th scope="col">View</th>
                </tr></thead>
                <tbody ref="rows" id="rows">
                    <tr v-for="cls in classList" :key="cls">
                        <td v-if="cls != 'default'">{{ cls }}</td>
                        <td v-if="cls != 'default'"><b-button @click="emit('clsChanged', cls)">view</b-button></td>
                    </tr>
                </tbody>
            </table>
        </b-container>
    </div>
</template>

<script setup>
const props = defineProps({
    teacher: {
		type: Object,
		required: true
	},
    classList: {
		type: Array,
		required: true
	}
})
const emit = defineEmits(['clsChanged'])
</script>

<style>

</style>
<template>
	<div id="content" class="container-fluid">
		<div class="row justify-content-center">
			<Personal :teacher="user" :classList="classes" @clsChanged="updateCls" />
			<Performance :cls="clas" :key="clas" />	
		</div>
		<div class="row justify-content-center">
			<Timetable :classList="classes" />
			<ToDo :teacher="user" />
		</div>
	</div>
</template>

<script setup>
import Personal from '@/components/Teacher_Home/Personal.vue'
import Performance from '@/components/Teacher_Home/Performance.vue'
import ToDo from '@/components/Teacher_Home/ToDo.vue'
import Timetable from '@/components/Teacher_Home/Timetable.vue'

import { ref } from 'vue'

const props = defineProps({
	user: {
		type: Object,
		required: true
	},
	classes: {
		type: Array,
		required: true
	}
})
const clas = ref('default')
const updateCls = (cls) => {
	clas.value = cls
}
</script>

<style>

</style>
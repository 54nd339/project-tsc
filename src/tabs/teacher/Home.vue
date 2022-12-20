<template>
	<b-container fluid id="content">
		<b-row align-h="center">
			<Personal :teacher="user" :classList="classes" @clsChanged="updateCls" />
			<Performance :cls="clas" :key="clas" />	
		</b-row>
		<b-row align-h="center">
			<Timetable :classList="classes" />
			<ToDo :teacher="user" />
		</b-row>
	</b-container>
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
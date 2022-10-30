<template>
	<div id="content" class="container-fluid">
		<div class="row justify-content-center">
			<Personal />
			<Performance />	
		</div>
		<div class="row justify-content-center">
			<ToDo />
			<Timetable />
		</div>
	</div>
</template>

<script>
	import Personal from '@/components/Teacher_Home/Personal.vue';
	import Performance from '@/components/Teacher_Home/Performance.vue';
	import ToDo from '@/components/Teacher_Home/ToDo.vue';
	import Timetable from '@/components/Teacher_Home/Timetable.vue';

	export default {
		components: { 
			Personal, Performance, ToDo, Timetable 
		}
	}
</script>

<style>

</style>
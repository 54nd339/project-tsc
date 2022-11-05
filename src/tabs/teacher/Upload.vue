<template>
	<div id="content" class="row justify-content-center">
		<div class="col-md-4" v-for="card in cards" :key="card">
			<div class="card" style="width: 18rem;">
				<div class="card-body">
					<h5 class="card-title">{{ card.title }}</h5>
					<p class="card-text">{{ card.content }}</p>
					<a href="#" class="btn btn-primary">Upload</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
const cards = [
	{ title: 'English 1', content: 'TCS BOARD REVISION CAPSULE FOR CLASS 10TH' },
	{ title: 'English 2', content: 'TCS BOARD REVISION CAPSULE FOR CLASS 10TH' },
	{ title: 'Odia/Hindi', content: 'TCS BOARD REVISION CAPSULE FOR CLASS 10TH' },
	{ title: 'Mathematics', content: 'TCS BOARD REVISION CAPSULE FOR CLASS 10TH' },
	{ title: 'Geography', content: 'TCS BOARD REVISION CAPSULE FOR CLASS 10TH' },
	{ title: 'History', content: 'TCS BOARD REVISION CAPSULE FOR CLASS 10TH' },
	{ title: 'Physics', content: 'TCS BOARD REVISION CAPSULE FOR CLASS 10TH' },
	{ title: 'Chemistry', content: 'TCS BOARD REVISION CAPSULE FOR CLASS 10TH' },
	{ title: 'Biology', content: 'TCS BOARD REVISION CAPSULE FOR CLASS 10TH' },
	{ title: 'Computer', content: 'TCS BOARD REVISION CAPSULE FOR CLASS 10TH' },
]
</script>

<style>

</style>
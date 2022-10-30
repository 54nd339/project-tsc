<template>
  	<main role="main" id="content" class="tab-content mb-md-5" style="min-height: 85vh;">
		<div id="home" class=" tab-pane fade show active tab-content" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
			<Home />
		</div>
		<div id="download" class="tab-pane fade tab-content" role="tabpanel" aria-labelledby="pills-courses-tab" tabindex="0">
			<Download />
		</div>
		<div id="exam" class="tab-pane fade tab-content" role="tabpanel" aria-labelledby="pills-success-tab" tabindex="0">
            <Exam />
		</div>
	</main>
</template>

<script>
	import Home from '@/tabs/teacher/Home.vue'
	import Download from '@/tabs/teacher/Download.vue'
	import Exam from '@/tabs/teacher/Exam.vue'
	export default {
		components: { 
			Home, Download, Exam 
		}
	}
</script>

<style>
.body {
	margin-top: 5vh;
  	margin-bottom: 5vh;
}
</style>
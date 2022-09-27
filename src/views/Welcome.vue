<template>
	<main role="main" id="content" class="tab-content mb-md-3" style="min-height: 85vh;">
		<div id="home" class="tab-pane fade show active tab-content" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
			<Home />
		</div>
		<div id="courses" class="tab-pane fade tab-content" role="tabpanel" aria-labelledby="pills-courses-tab" tabindex="0">
			<Courses />	
		</div>
		<div id="success" class="tab-pane fade tab-content" role="tabpanel" aria-labelledby="pills-success-tab" tabindex="0">
			<Success />
		</div>
		<div id="about" class="tab-pane fade tab-content" role="tabpanel" aria-labelledby="pills-about-tab" tabindex="0">
			<About />
		</div>
		<div id="contact" class="tab-pane fade tab-content" role="tabpanel" aria-labelledby="pills-contact-tab" tabindex="0">
			<Contact />
		</div>
	</main>
</template>

<script>
	import Home from '../composable/home/Home.vue'
	import Courses from '../composable/home/Courses.vue'
	import Success from '../composable/home/Success.vue'
	import About from '../composable/home/About.vue'
	import Contact from '../composable/home/Contact.vue'
	export default {
			components: {
			Home,
			Courses,
			Success,
			About,
			Contact
		}
	}
</script>

<style>
#home .col-lg-4, #toppers .col-lg-12 {
	margin-bottom: 1.5rem;
	text-align: center;
}
</style>
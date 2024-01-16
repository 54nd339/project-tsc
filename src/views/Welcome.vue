<template>
	<main role="main" id="content" class="tab-content mt-2 mb-4" style="min-height: 85vh;">
		<div id="home" class="tab-pane fade show active tab-content" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
			<Home />
		</div>
		<div id="courses" class="tab-pane fade tab-content pt-5" role="tabpanel" aria-labelledby="pills-courses-tab" tabindex="0">
			<Courses />	
		</div>
		<div id="success" class="tab-pane fade tab-content pt-3" role="tabpanel" aria-labelledby="pills-success-tab" tabindex="0">
			<Success />
		</div>
		<div id="about" class="tab-pane fade tab-content pt-5" role="tabpanel" aria-labelledby="pills-about-tab" tabindex="0">
			<About />
		</div>
		<div id="contact" class="tab-pane fade tab-content pt-5" role="tabpanel" aria-labelledby="pills-contact-tab" tabindex="0">
			<Contact />
		</div>
	</main>
	<SiteLinks />
</template>

<script setup>
import Home from '@/tabs/home/Home.vue'
import Courses from '@/tabs/home/Courses.vue'
import Success from '@/tabs/home/Success.vue'
import About from '@/tabs/home/About.vue'
import Contact from '@/tabs/home/Contact.vue'
import SiteLinks from '@/components/Welcome_Home/SiteLinks.vue'
</script>

<style>
#home .col-lg-4, #toppers .col-lg-12 {
	text-align: center;
}
</style>
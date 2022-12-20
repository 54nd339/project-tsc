<template>
	<b-container fluid id="content">
		<b-row id="enquiries" class="featurette">
			<h2 class="featurette-heading pb-md-2">Enquiries</h2>
			<Enquiries />
		</b-row>
		<hr class="featurette-divider">

		<b-row id="notices" class="featurette">
			<h2 class="featurette-heading pb-md-2">Notices</h2>
			<Notices />
		</b-row>
		<hr class="featurette-divider">

		<b-row id="toppers" class="featurette">
			<h2 class="featurette-heading pb-md-2">Toppers</h2>
			<Toppers />
		</b-row>
		<hr class="featurette-divider">

		<b-row id="gallery" class="featurette">
			<h2 class="featurette-heading pb-md-2">Gallery</h2>
			<Gallery />
		</b-row>
		<hr class="featurette-divider">

		<b-row id="faqs" class="featurette">
			<h2 class="featurette-heading pb-md-2">Faqs</h2>
			<Faqs />
		</b-row>
		<hr class="featurette-divider">

		<b-row id="batches" class="featurette">
			<h2 class="featurette-heading pb-md-2">Batches</h2>
			<Batches />
		</b-row>
	</b-container>
</template>

<script setup>
import Enquiries from '@/components/Admin_View/Enquiries.vue'
import Notices from '@/components/Admin_View/Notices.vue'
import Toppers from '@/components/Admin_View/Toppers.vue'
import Gallery from '@/components/Admin_View/Gallery.vue'
import Faqs from '@/components/Admin_View/Faqs.vue'
import Batches from '@/components/Admin_View/Batches.vue'

// do something
</script>

<style>
/* body {
	overflow: auto;
} */
</style>
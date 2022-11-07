<template>
	<div id="content" class="container-fluid">
		<div id="enquiries" class="row featurette">
			<div class="col-md-12">
				<h2 class="featurette-heading pb-md-2">Enquiries</h2>
				<Enquiries />
			</div>
		</div>
		<hr class="featurette-divider">

		<div id="notices" class="row featurette">
			<div class="col-md-12">
				<h2 class="featurette-heading pb-md-2">Notices</h2>
				<Notices />
			</div>
		</div>
		<hr class="featurette-divider">

		<div id="toppers" class="row featurette">
			<div class="col-md-12">
				<h2 class="featurette-heading pb-md-2">Toppers</h2>
				<Toppers />
			</div>
		</div>
		<hr class="featurette-divider">

		<div id="gallery" class="row featurette">
			<div class="col-md-12">
				<h2 class="featurette-heading pb-md-2">Gallery</h2>
				<Gallery />
			</div>
		</div>
		<hr class="featurette-divider">

		<div id="faqs" class="row featurette">
			<div class="col-md-12">
				<h2 class="featurette-heading pb-md-2">Faqs</h2>
				<Faqs />
			</div>
		</div>
		<hr class="featurette-divider">

		<div id="batches" class="row featurette">
			<div class="col-md-12">
				<h2 class="featurette-heading pb-md-2">Batches</h2>
				<Batches />
			</div>
		</div>
	</div>
</template>

<script setup>
import Enquiries from '@/components/Admin_View/Enquiries.vue'
import Notices from '@/components/Admin_View/Notices.vue'
import Toppers from '@/components/Admin_View/Toppers.vue'
import Gallery from '@/components/Admin_View/Gallery.vue'
import Faqs from '@/components/Admin_View/Faqs.vue'
import Batches from '@/components/Admin_View/Batches.vue'
</script>

<style>

</style>
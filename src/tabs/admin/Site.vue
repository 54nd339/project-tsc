<template>
	<div id="content" class="container-fluid">
		<div id="enquiries" class="row featurette">
			<div class="col-md-12">
				<h2 class="featurette-heading pb-md-2">Enquiries</h2>
				<Suspense><Enquiries /></Suspense>
			</div>
		</div>
		<hr class="featurette-divider">

		<div id="toppers" class="row featurette">
			<div class="col-md-12">
				<h2 class="featurette-heading pb-md-2">Toppers</h2>
				<Suspense><Toppers /></Suspense>
			</div>
		</div>
		<hr class="featurette-divider">

		<div id="enquiries" class="row featurette">
			<div class="col-md-12">
				<h2 class="featurette-heading pb-md-2">Gallery</h2>
				<Suspense><Gallery /></Suspense>
			</div>
		</div>
	</div>
</template>

<script setup>
import Enquiries from '@/components/Admin_View/Enquiries.vue'
import Toppers from '@/components/Admin_View/Toppers.vue'
import Gallery from '@/components/Admin_View/Gallery.vue'

</script>

<style>

</style>
<template>
	<div class="shadow mb-4">
		<Slides title="Banners" :carouselItems="banners" />
	</div>
	<div id="content" class="container-fluid">
		<Vision />
		<Batches />
		<Toppers />
		<b-row id="extras" class="m-md-3">
			<Enquiry /><Notices /><Map />
		</b-row>
	</div>
</template>

<script setup>
import Slides from '@/components/Slides.vue'
import Vision from '@/components/Welcome_Home/Vision.vue'
import Batches from '@/components/Welcome_Home/Batches.vue'
import Toppers from '@/components/Welcome_Home/Toppers.vue'
import Enquiry from '@/components/Welcome_Home/Enquiry.vue'
import Notices from '@/components/Welcome_Home/Notices.vue'
import Map from '@/components/Welcome_Home/Map.vue'
// import Faqs from '@/components/Welcome_Home/Faqs.vue'

import getCollection from '@/db/getCollection'
import { ref } from 'vue'

const banners = ref([])
const loadData = async() => {
    await(getCollection('gallery', ['role', '==', 'banners']))
    .getDocuments().then((docs) => {
		if(docs) {
			banners.value = docs
		}
	}).catch((err) => {
		console.log(err)
	})
}

loadData()
</script>

<style>

</style>
<template>
	<div  class="shadow mb-4">
		<Slides title="Banners" :urls="banUrls" :captions="banCaptions" :texts="banTexts" />
	</div>
	<div id="content" class="container-fluid">
		<div class="row">
			<div id="main" class="col-md-8 px-md-3 mx-md-3">
				<Vision />
				<div id="extras" class ="row m-md-3">
					<Enquiry /><Notices />
				</div>
			</div>
			<Toppers />
		</div>
	</div>
</template>

<script setup>
import Slides from '@/components/Slides.vue'
import Vision from '@/components/Welcome_Home/Vision.vue'
import Enquiry from '@/components/Welcome_Home/Enquiry.vue'
import Notices from '@/components/Welcome_Home/Notices.vue'
import Toppers from '@/components/Welcome_Home/Toppers.vue'
	
import getCollection from '@/db/getCollection'
import { ref } from 'vue'

const banUrls = ref([])
const banCaptions = ref([])
const banTexts = ref([])
const loadData = async() => {
    await(getCollection('gallery', ['role', '==', 'banners'], '', '', ''))
    .getDocuments().then((docs) => {
		if(docs) {
			docs.forEach((doc) => {
				banUrls.value.push(doc.url)
				banCaptions.value.push(doc.title)
				banTexts.value.push(doc.context)
			})
		}
	}).catch((err) => {
		console.log(err)
	})
}
loadData()
</script>

<style>

</style>
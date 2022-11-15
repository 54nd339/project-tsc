<template>
  <div id="content" class="container-fluid">
	<div class="row featurette">
		<section class="container-fluid">
			<div class="light-overlay">
				<div class="container">
					<h2>Award & Achievements</h2>
					<div class="photo-section">
						<Slides title="Awardss" :urls="awardUrls" :captions="awardCaptions" :texts="awardTexts" />
					</div>
				</div>
			</div>
		</section> 
	</div>
	
	<div class="row featurette">
		<section class="container-fluid">
			<div class="light-overlay">
				<div class="container">
					<h2>Cultural Activities</h2>
					<div class="photo-section">
						<Slides title="Activities" :urls="actUrls" :captions="actCaptions" :texts="actTexts" />
					</div>
				</div>
			</div>
		</section> 
	</div>
	
	<div class="row featurette">
		<section class="container-fluid">
			<div class="light-overlay">
				<div class="container">
					<h2>Gallery</h2>
					<div class="photo-section">
						<Slides title="Gallery" :urls="galUrls" :captions="galCaptions" :texts="galTexts" />
					</div>
				</div>
			</div>
		</section> 
	</div>
</div>
</template>

<script setup>
import Slides from '@/components/Slides.vue'
import getCollection from '@/db/getCollection'
import { ref } from 'vue'

const awardUrls = ref([])
const awardCaptions = ref([])
const awardTexts = ref([])
const actUrls = ref([])
const actCaptions = ref([])
const actTexts = ref([])
const galUrls = ref([])
const galCaptions = ref([])
const galTexts = ref([])
const loadData = async() => {
    await(getCollection('gallery', ['role', '==', 'photos']))
    .getDocuments().then((docs) => {
		if(docs)
			docs.forEach((doc) => {
				galUrls.value.push(doc.url)
				galCaptions.value.push(doc.title)
				galTexts.value.push(doc.context)
			})
	}).catch((err) => {
		console.log(err)
	})

	await(getCollection('gallery', ['role', '==', 'activities']))
    .getDocuments().then((docs) => {
		if(docs)
			docs.forEach((doc) => {
				actUrls.value.push(doc.url)
				actCaptions.value.push(doc.title)
				actTexts.value.push(doc.context)
			})
	}).catch((err) => {
		console.log(err)
	})

	await(getCollection('gallery', ['role', '==', 'awards']))
	.getDocuments().then((docs) => {
		if(docs)
			docs.forEach((doc) => {
				awardUrls.value.push(doc.url)
				awardCaptions.value.push(doc.title)
				awardTexts.value.push(doc.context)
			})
	}).catch((err) => {
		console.log(err)
	})
}
loadData()
</script>

<style>

</style>
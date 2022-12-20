<template>
	<b-container fluid id="content">
		<b-row id="awards" class="featurette">
			<div class="light-overlay">
				<h2>Award & Achievements</h2>
				<div class="photo-section shadow rounded">
					<Slides title="Awardss" :urls="awardUrls" :captions="awardCaptions" :texts="awardTexts" />
				</div>
			</div>
		</b-row>
		<b-row id="activities" class="featurette">
			<div class="light-overlay">
				<h2>Cultural Activities</h2>
				<div class="photo-section shadow rounded">
					<Slides title="Activities" :urls="actUrls" :captions="actCaptions" :texts="actTexts" />
				</div>
			</div>
		</b-row>
		<b-row id="others" class="featurette">
			<div class="light-overlay">
				<h2>Gallery</h2>
				<div class="photo-section shadow rounded">
					<Slides title="Gallery" :urls="galUrls" :captions="galCaptions" :texts="galTexts" />
				</div>
			</div>
		</b-row>
	</b-container>
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
    await(getCollection('gallery'))
    .getDocuments().then((docs) => {
		if(docs)
			docs.forEach((doc) => {
				if(doc.role == 'awards') {
					awardUrls.value.push(doc.url)
					awardCaptions.value.push(doc.caption)
					awardTexts.value.push(doc.text)
				}
				else if(doc.role == 'activities') {
					actUrls.value.push(doc.url)
					actCaptions.value.push(doc.caption)
					actTexts.value.push(doc.text)
				}
				else if(doc.role == 'photos') {
					galUrls.value.push(doc.url)
					galCaptions.value.push(doc.caption)
					galTexts.value.push(doc.text)
				}
			})
	}).catch((err) => {
		console.log(err)
	})
}
loadData()
</script>

<style>

</style>
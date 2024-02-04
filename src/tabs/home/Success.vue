<template>
	<b-container fluid id="content">
		<b-row id="awards" class="featurette">
			<div class="light-overlay">
				<h2>Award & Achievements</h2>
				<div class="photo-section shadow rounded">
					<Slides title="Awards" :carouselItems="awards" />
				</div>
			</div>
		</b-row>
		<b-row id="activities" class="featurette">
			<div class="light-overlay">
				<h2>Cultural Activities</h2>
				<div class="photo-section shadow rounded">
					<Slides title="Activities" :carouselItems="activities" />
				</div>
			</div>
		</b-row>
		<b-row id="others" class="featurette">
			<div class="light-overlay">
				<h2>Gallery</h2>
				<div class="photo-section shadow rounded">
					<Slides title="Gallery" :carouselItems="gallery" />
				</div>
			</div>
		</b-row>
	</b-container>
</template>

<script setup>
import Slides from '@/components/Slides.vue'
import getCollection from '@/db/getCollection'
import { ref } from 'vue'

const awards = ref([])
const activities = ref([])
const gallery = ref([])

const loadData = async() => {
    await(getCollection('gallery'))
    .getDocuments().then((docs) => {
		if(docs)
			docs.forEach((doc) => {
				if(doc.role == 'awards') {
					awards.value.push(doc)
				}
				else if(doc.role == 'activities') {
					activities.value.push(doc)
				}
				else if(doc.role == 'photos') {
					gallery.value.push(doc)
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
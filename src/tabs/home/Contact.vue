<template>
  	<b-container fluid id="content">
		<div id="contact" class="featurette">
			<h2 class="featurette-heading pb-md-2"><span class="text-muted">DON'T BE SHY,</span> LET'S TALK ABOUT EVERYTHING.</h2>
			<h4 class="quote">"You don't have to see the whole staircase, just take the first step."</h4>
			<b-row class="p-md-5 pb-2">
				<b-col md="4" class="p-2"><b-container class="m-2 p-2 shadow rounded h-100">
					<h2 class="pb-md-1"><b>Visiting Time</b></h2>
					<p>Monday to Saturday : <br> 8:30 A.M. to 2:00 P.M. (MORNING) <br> 3:30 P.M. to 8:30 P.M. (EVENING)</p>
					<p>Sunday : <br> 8 : 30 A.M. to 2 : 30 P.M. (MORNING)</p>
				</b-container></b-col>
				<b-col md="4" class="p-2"><b-container class="m-2 p-2 shadow rounded h-100">
					<h2 class="pb-md-1"><b>Locate Us</b></h2>
					<p>TALENT SPRINT CLASSES, <br> GAJAPATI NAGAR MAIN LANE, <br> BEHIND STATE BANK OF INDIA ADB BRANCH, <br> BERHAMPUR - 760010 (ODISHA) India</p>
				</b-container></b-col>
				<b-col md="4" class="p-2"><b-container class="m-2 p-2 shadow rounded h-100">
					<h2 class="pb-md-1"><b>Write or Ring Us</b></h2>
					<p>bidwanclasses.brahmapur@gmail.com <br> tsc.bam@rediffmail.com <br> admin@bidwanclasses.com</p>
					<p>+91-9438339317, 9040612211, 9439133317</p>
				</b-container></b-col>
			</b-row>
		</div>
		<hr class="featurette-divider">
		<div id="map" class="featurette">
			<h2 class="featurette-heading pb-md-2">Find Us Here.</h2>
			<b-container fluid class="p-md-5 pb-2">
				<div id="frame" class="shadow container-fluid" style="overflow: hidden; border-radius: 0.25em;">
					<iframe id="view" class="responsive-iframe" src="https://maps.google.com/maps?q=Bidwan%20Classes%20,main%20lane,%20Gajapati%20Nagar,%20Brahmapur,%20Odisha%20760010,%20India&t=&z=13&ie=UTF8&iwloc=&output=embed"
					allowfullscreen></iframe>
				</div>
			</b-container> 
		</div>
		<hr class="featurette-divider">
		<div id="faq" class="featurette">
			<h2 class="featurette-heading pb-md-2">FAQs</h2>
			<b-container class="accordion" id="qna">
				<div class="accordion-item" v-for="(faq, index) in faqs" :key="faq">
					<h2 class="accordion-header" :id="`heading${index}`">
						<button class="accordion-button collapsed" type="button" v-b-toggle="`collapse${index}`">
							{{ faq.question }}
						</button>
					</h2>
					<div :id="`collapse${index}`" class="accordion-collapse collapse" data-bs-parent="#qna">
						<div class="accordion-body"> {{ faq.answer }} </div>
					</div>
				</div>
			</b-container>
		</div>
	</b-container>
</template>

<script setup>
import getCollection from '@/db/getCollection'
import { ref } from 'vue'

const faqs = ref([])
const loadData = async() => {
    await(getCollection('faqs'))
    .getDocuments().then((docs) => {
        faqs.value = docs
    }).catch((err) => {
        console.log(err)
    })
}
loadData()
</script>

<style>

</style>
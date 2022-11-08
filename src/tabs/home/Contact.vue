<template>
  	<div id="content" class="container-fluid">
		<div id="contact" class="row featurette">
			<div class="col-md-12">
				<h2 class="featurette-heading pb-md-2"><span class="text-muted">DON'T BE SHY,</span> LET'S TALK ABOUT EVERYTHING.</h2>
				<h4 class="quote">"You don't have to see the whole staircase, just take the first step."</h4>
				<div class="row">
					<div class="col-md-4 px-md-5 mt-2">
						<h2 class="pb-md-1"><b>Visiting Time</b></h2>
						<p>Monday to Saturday : <br> 8:30 A.M. to 2:00 P.M. (MORNING) <br> 3:30 P.M. to 8:30 P.M. (EVENING)</p>
						<p>Sunday : <br> 8 : 30 A.M. to 2 : 30 P.M. (MORNING)</p>
					</div>
					<div class="col-md-4 px-md-5 mt-2"> 
						<h2 class="pb-md-1"><b>Locate Us</b></h2>
						<p>TALENT SPRINT CLASSES, <br> GAJAPATI NAGAR MAIN LANE, <br> BEHIND STATE BANK OF INDIA ADB BRANCH, <br> BERHAMPUR - 760010 (ODISHA) India</p>
					</div>
					<div class="col-md-4 px-md-5 mt-2">
						<h2 class="pb-md-1"><b>Write or Ring Us</b></h2>
						<p>bidwanclasses.brahmapur@gmail.com <br> tsc.bam@rediffmail.com <br> admin@bidwanclasses.com</p>
						<p>+91-9438339317, 9040612211, 9439133317</p>
					</div>
				</div>
			</div>
		</div>
		<hr class="featurette-divider">
		
		<div id="map" class="row featurette">
			<div class="col-md-12">
				<h2 class="featurette-heading pb-md-2">Find Us Here.</h2>
				<section class="container-fluid">
					<div id="frm-container" class="col-md-12 rounded flex-grow-1">
						<div id="frame" class="shadow container-fluid" style="overflow: hidden; border-radius: 0.25em;">
							<iframe id="view" class="responsive-iframe" src="https://maps.google.com/maps?q=Bidwan%20Classes%20,main%20lane,%20Gajapati%20Nagar,%20Brahmapur,%20Odisha%20760010,%20India&t=&z=13&ie=UTF8&iwloc=&output=embed"
							allowfullscreen></iframe>
						</div>
					</div>
				</section> 
			</div>
		</div>
		<hr class="featurette-divider">
		
		<div id="faq" class="row featurette">
			<div class="col-md-12">
				<h2 class="shadow featurette-heading pb-md-2">FAQs</h2>
				<div class="accordion" id="qna">
					<div class="accordion-item" v-for="(faq, index) in faqs" :key="faq">
						<h2 class="accordion-header" :id="'heading' + index">
							<button class="accordion-button collapsed" type="button" v-b-toggle="'collapse' + index">
								{{ faq.question }}
							</button>
						</h2>
						<div :id="'collapse' + index" class="accordion-collapse collapse" data-bs-parent="#qna">
							<div class="accordion-body">
								{{ faq.answer }}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import getCollection from '@/db/getCollection'
import { ref } from 'vue'

const faqs = ref([])
const loadData = async() => {
    await(getCollection('faqs', '', '', '', ''))
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
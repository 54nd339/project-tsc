<template>
   	<div id="content" class="container-fluid" v-for="(batch, index) in batches" :key="batch">
		<div class="row featurette">
			<div :class="[(index%2) == 0 ? '' : 'order-md-2', 'col-md-7']">
				<h2 class="featurette-heading">{{ batch.name }} <span class="text-muted">({{ batch.subname }})</span></h2>
				<p class="lead">{{ batch.content }}</p>
			</div>
			<div :class="[(index%2) == 0 ? '' : 'order-md-1', 'col-md-5']">
				<svg class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#eee"/><text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text></svg>
			</div>
		</div>
		<hr class="featurette-divider">
	</div>
</template>

<script setup>
const batches = [
	{ name:"Talent Sprint Classes", subname:"Board Preparations for class V1 to X", content:"Board prepartion for Class VI to X. ICSE, CBSE and CHSE." },
	{ name:"Neon Batch", subname:"INTEGRATED COURSE FOR 11TH AND 12TH", content:"A Separate Unit of Bidwan Classes for the students who urge to attempt or appear IIT-JEE (For Enginnering) and NEET/AIIMS (For Medical) in order to achieve their fream so as to become an Engineer or Doctor or in R & D field (Research and Development). For this a student needs a tough preparation with rigorous practice from the grass root level i.e. from the beginning of Class 11th (+2 Science 1st Year). This Unit is also eligibile for Class 12th (+2 Science 2nd Year). We provide the students the best foundation grooming by our well experienced faculty from KOTA (Rajasthan) with NTA based Materials facilty." },
	{ name:"Argon Batch", subname:"SPECIAL BATCH FOR 12TH PASSOUT STUDENTS", content:"Argon is the name of the special batch for the students who are aspiring for Medical (NEET/AIIMS) or Engineering Entrance (IIT-JEE/NIT) after passing out Class 12th (+2 Science 2nd Year) respectively. This is a Rapid-Go batch for quick revision of the students of the courses that had been to them in the last two years. Only Entrance classes will be conducted and emphasis will be given more on preparations and exams based on the competititve pattern of exams." },
	{ name:"Krypton Batch", subname:"DISTANCE LEARNING PROGRAMME FOR IIT/NIT/NEET/AIIMS", content:"It is the Unit of Bidwan Classes that deals with Distance Learning Programme for those who are willing to learn and prepare for Competitive exams (For NEET/AIIMS/IIT/NIT). DLP is for those who are staying abroad or want to learn from home. Hence, We provide them all resources for their preparation through paid services. The materials that we provide is NTA based and is highly helpful for those who are aspiring for NEET/AIIMS/IIT/NIT/NTSE/OUAT/NISER/IISER and also helpful for preparing to other competitive exams too.." },
	{ name:"Xenon Batch", subname:"FOUNDATION COURSE FOR MEDICAL AND ENGG. FOR CLASS VII TO X", content:"It is the Paid Unit of Bidwan Classes that deals with those who to nurture their dreams to appear in different Medical or Engineering Entrance Exams from class 7th itself in order to achieve their dreams for being a Doctor/Engineer or A Scientist and many more. This course is provided to the school students as a Foundation-Build-In Programme by the Bidwan Classes. The Syllabus is designed based on their school syllabus. Here, Students are given an overview of the Pattern of Examination Conducted by Various Entrance Exams along with a well-designed syllabus worth for the gradual growth of the students regarding the preparation of students for the competitive exams so that these exams will not be a topic of worriedness for them in the near future." },
]
</script>

<style>

</style>
<template>
	<header>
	<nav class="navbar navbar-expand-md sticky-top border-bottom bg-light shadow bg-body rounded">
		<div class="container-fluid">
			<a class="navbar-brand" href="#" style="max-width: 6%;" @click="home()">
				<img src="../assets/logo.png" class="img-fluid">
			</a>
			<h1 class="navbar-brand d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-2 mb-1 text-primary" v-if="userType === 'Guest'">{{ name }}</h1>
			<h3 class="navbar-brand d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-2 mb-1 text-success" v-else>Welcome {{ userName }}!</h3>
			<button class="navbar-toggler collapsed position-relative" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
				<span> </span><span> </span><span> </span>
			</button>

			<div class="collapse navbar-collapse justify-content-center" id="navbarCollapse">
				<div class="nav nav-pills col-12 col-md-auto mb-2 justify-content-center mb-md-0" v-if="userType === 'Guest'">
					<button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
					<button class="nav-link" id="pills-course-tab" data-bs-toggle="pill" data-bs-target="#courses" type="button" role="tab" aria-controls="courses" aria-selected="false">Courses</button>
					<button class="nav-link" id="pills-success-tab" data-bs-toggle="pill" data-bs-target="#success" type="button" role="tab" aria-controls="success" aria-selected="false">Our Success</button>
					<button class="nav-link" id="pills-about-tab" data-bs-toggle="pill" data-bs-target="#about" type="button" role="tab" aria-controls="about" aria-selected="false">About Us</button>
					<button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Contact Us</button> 
				</div>
				<div class="nav nav-pills col-12 col-md-auto mb-2 justify-content-center mb-md-0" v-else-if="userType === 'Student'">
					<button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
					<button class="nav-link" id="pills-course-tab" data-bs-toggle="pill" data-bs-target="#download" type="button" role="tab" aria-controls="courses" aria-selected="false">Download</button>
					<button class="nav-link" id="pills-success-tab" data-bs-toggle="pill" data-bs-target="#exam" type="button" role="tab" aria-controls="success" aria-selected="false">Exam</button>
					<button class="nav-link" id="pills-about-tab" data-bs-toggle="pill" data-bs-target="#feedback" type="button" role="tab" aria-controls="about" aria-selected="false">Feedback</button>      
				</div>
				<div class="nav nav-pills col-12 col-md-auto mb-2 justify-content-center mb-md-0" v-else-if="userType === 'Teacher'">
					<button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
					<button class="nav-link" id="pills-course-tab" data-bs-toggle="pill" data-bs-target="#download" type="button" role="tab" aria-controls="courses" aria-selected="false">Download</button>
					<button class="nav-link" id="pills-success-tab" data-bs-toggle="pill" data-bs-target="#exam" type="button" role="tab" aria-controls="success" aria-selected="false">Exam</button>   
				</div>
				<div class="nav nav-pills col-12 col-md-auto mb-2 justify-content-center mb-md-0" v-else-if="userType === 'Admin'">
					<button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
					<button class="nav-link" id="pills-course-tab" data-bs-toggle="pill" data-bs-target="#students" type="button" role="tab" aria-controls="courses" aria-selected="false">Students</button>
					<button class="nav-link" id="pills-success-tab" data-bs-toggle="pill" data-bs-target="#teachers" type="button" role="tab" aria-controls="success" aria-selected="false">Teachers</button>
					<button class="nav-link" id="pills-success-tab" data-bs-toggle="pill" data-bs-target="#courses" type="button" role="tab" aria-controls="success" aria-selected="false">Courses</button>
					<button class="nav-link" id="pills-about-tab" data-bs-toggle="pill" data-bs-target="#site" type="button" role="tab" aria-controls="about" aria-selected="false">Site</button>      
				</div>
				<div class="col-md-3 text-end" v-if="userType === 'Guest'">
					<!-- Button trigger modal -->
					<button type="button" id="login" class="btn btn-outline-success mx-md-2" v-b-modal.loginForm>Login</button>
					<button type="button" id="register" class="btn btn-success">Register</button>
				</div>
				<div class="col-md-3 text-end" v-else>
					<button type="button" id="logout" class="btn btn-outline-success mx-md-2" v-b-modal.logoutConfirm>Logout</button>
				</div> 
			</div>
		</div>
	</nav>
	</header>
</template>

<script setup>
import { db } from '@/db/config'
import { doc, getDoc } from 'firebase/firestore'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const name = ref('Talent Sprint Classes')
const userType = ref('Guest')

const routeName = route.name
if(routeName == 'Student')
	userType.value = 'Student'
else if(routeName == 'Teacher')
	userType.value = 'Teacher'
else if(routeName == 'Admin')
	userType.value = 'Admin'
else 
	userType.value = 'Guest'

const userName = ref('User')
if(userType.value != 'Guest') { 
	const docName = routeName.toString().toLowerCase()
	const docRef = doc(db, docName, route.params.id)
	// console.log(db, docName, route.params.id)
	await getDoc(docRef).then((doc) => {
		if (doc.exists()) {
			// console.log("Document data:", doc.data());
			userName.value = doc.data().name
		} else {
			// doc.data() will be undefined in this case
			console.log("No User Found!");
		}
	}).catch((error) => {
		console.log("Error getting document:", error);
	});
}

const home = () => {
	const btn = document.getElementById('logout')
	if(btn)
		btn.click()
}
</script>

<style>
.nav-pills .nav-link.active, .nav-pills .show>.nav-link {
	color: #fff !important;
	background-color: #198754 !important;
}
.nav-link:not(.active):hover {
	transform: scale(1.2);
	color: #198754 !important;
} 
.nav-link {
	color: #777777 !important;
}
.navbar-toggler:focus,
.navbar-toggler:active { outline: none }
.navbar-toggler span {
    display: block;
    background-color: #444;
    height: 3px;
    width: 25px;
    margin-top: 4px;
    margin-bottom: 4px;
    transform: rotate(0deg);
    position: relative;
    left: 0;
    opacity: 1;
}.navbar-toggler span:nth-child(1),
.navbar-toggler span:nth-child(3) {
    transition: transform 300ms linear;
}
.navbar-toggler:not(.collapsed) span:nth-child(1) {
    position: absolute;
    left: 12px;
    top: 10px;
    transform: rotate(45deg);
    opacity: 0.9;
}
.navbar-toggler:not(.collapsed) span:nth-child(2) {
    height: 12px;
    visibility: hidden;
    background-color: transparent;
}
.navbar-toggler:not(.collapsed) span:nth-child(3) {
    position: absolute;
    left: 12px;
    top: 10px;
    transform: rotate(-45deg);
    opacity: 0.9;
}
</style>
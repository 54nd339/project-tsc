<template>
	<header>
	<nav class="navbar navbar-expand-md sticky-top border-bottom bg-light shadow bg-body rounded">
		<div class="container-fluid">
			<a class="navbar-brand" href="#" style="max-width: 6%;">
				<img src="../assets/logo.png" class="img-fluid">
			</a>
			<h1 class="navbar-brand d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-2 mb-1 text-primary"><router-link :to="{ name: 'Welcome' }">{{ name }}</router-link></h1>
			<button class="navbar-toggler collapsed position-relative" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
				<span> </span><span> </span><span> </span>
			</button>
			<div class="collapse navbar-collapse justify-content-center" id="navbarCollapse">
				<div class="nav nav-pills col-12 col-md-auto mb-2 justify-content-center mb-md-0" v-if="isLoggedIn()">
					<button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
					<button class="nav-link" id="pills-course-tab" data-bs-toggle="pill" data-bs-target="#courses" type="button" role="tab" aria-controls="courses" aria-selected="false">Courses</button>
					<button class="nav-link" id="pills-success-tab" data-bs-toggle="pill" data-bs-target="#success" type="button" role="tab" aria-controls="success" aria-selected="false">Our Success</button>
					<button class="nav-link" id="pills-about-tab" data-bs-toggle="pill" data-bs-target="#about" type="button" role="tab" aria-controls="about" aria-selected="false">About Us</button>
					<button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Contact Us</button> 
				</div>
				<div class="nav nav-pills col-12 col-md-auto mb-2 justify-content-center mb-md-0" v-else-if="userType() === 'Student'">
					<button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
					<button class="nav-link" id="pills-course-tab" data-bs-toggle="pill" data-bs-target="#download" type="button" role="tab" aria-controls="courses" aria-selected="false">Download</button>
					<button class="nav-link" id="pills-success-tab" data-bs-toggle="pill" data-bs-target="#exam" type="button" role="tab" aria-controls="success" aria-selected="false">Exam</button>
					<button class="nav-link" id="pills-about-tab" data-bs-toggle="pill" data-bs-target="#feedback" type="button" role="tab" aria-controls="about" aria-selected="false">Feedback</button>      
				</div>
				<div class="nav nav-pills col-12 col-md-auto mb-2 justify-content-center mb-md-0" v-else-if="userType() === 'Teacher'">
					<button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
					<button class="nav-link" id="pills-course-tab" data-bs-toggle="pill" data-bs-target="#download" type="button" role="tab" aria-controls="courses" aria-selected="false">Download</button>
					<button class="nav-link" id="pills-success-tab" data-bs-toggle="pill" data-bs-target="#exam" type="button" role="tab" aria-controls="success" aria-selected="false">Exam</button>   
				</div>
				<div class="nav nav-pills col-12 col-md-auto mb-2 justify-content-center mb-md-0" v-else-if="userType() === 'Admin'">
					<button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
					<button class="nav-link" id="pills-course-tab" data-bs-toggle="pill" data-bs-target="#students" type="button" role="tab" aria-controls="courses" aria-selected="false">Students</button>
					<button class="nav-link" id="pills-success-tab" data-bs-toggle="pill" data-bs-target="#teachers" type="button" role="tab" aria-controls="success" aria-selected="false">Teachers</button>
					<button class="nav-link" id="pills-success-tab" data-bs-toggle="pill" data-bs-target="#courses" type="button" role="tab" aria-controls="success" aria-selected="false">Courses</button>
					<button class="nav-link" id="pills-about-tab" data-bs-toggle="pill" data-bs-target="#site" type="button" role="tab" aria-controls="about" aria-selected="false">Site</button>      
				</div>
				<div class="col-md-3 text-end" v-if="isLoggedIn()">
					<!-- Button trigger modal -->
					<button type="button" class="btn btn-outline-success mx-md-2" v-b-modal.loginForm>Login</button>
					<button type="button" class="btn btn-success">Register</button>
				</div>
				<div class="col-md-3 text-end" v-else>
					<h3 class="text-success">Welcome User!</h3>
				</div> 
			</div>
		</div>
	</nav>
	</header>
</template>

<script>
export default {
	props:[
		'name'
	],
	methods: {
		isLoggedIn(){
			// console.log(this.$route.path)
			return this.$route.path == '/'
		},
		userType() {
			const name = this.$route.name
			// console.log(name)
			if (name == 'Student')
				return 'Student'
			if (name == 'Teacher')
				return 'Teacher'
			if (name == 'Admin')
				return 'Admin'
		}
	}
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
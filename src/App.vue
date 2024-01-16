<template>
	<Suspense>
		<Navbar :key="$route.fullPath" v-if="$route.name != 'NotFound'" />
	</Suspense>
	<Suspense><router-view /></Suspense>
	<Footer v-if="$route.name != 'NotFound'" />
</template>

<script>
	import Navbar from '@/components/Navbar.vue'
	import Footer from '@/components/Footer.vue'

	export default {
		components: {
			Navbar, Footer
		}
	}
</script>

<style>
#app {
	overflow-x: hidden;
	margin-top: 55px;
}
.sticky-top {
	position: fixed; top: 0;
    transition: all 0.25s ease-in;
	width:100%;
}
.stuck .navbar.sticky-top {
    padding-top: .1rem !important;
    padding-bottom: .1rem !important;
}
::-webkit-scrollbar {
	width: 7px;
}
/* Track */
::-webkit-scrollbar-track {
	box-shadow: inset 0 0 5px grey;
	border-radius: 10px;
}
/* Handle */
::-webkit-scrollbar-thumb {
	background: #38A3A5;
	border-radius: 10px;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
	background: #22577A;
}

h2 {
	color: black;
}
.underline {
	text-decoration: underline;
}

footer {
	position: fixed;
	height: 3vh;
	bottom: 0;
	width: 100vh;
}
</style>
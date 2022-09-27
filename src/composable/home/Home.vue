<template>
  <Banner />
  <div id="content" class="container-fluid">
		<div class="row">
			<div id="main" class="col-md-8 px-md-3 mx-md-3">
				<Vision />
				<div id="extras" class ="row p-4">
					<Enquiry />
					<Notices />
				</div>
			</div>
			<Toppers />
		</div>
	</div>
</template>

<script>
	import Banner from '../../components/Welcome_Home/Banner.vue'
	import Vision from '../../components/Welcome_Home/Vision.vue'
	import Enquiry from '../../components/Welcome_Home/Enquiry.vue'
	import Notices from '../../components/Welcome_Home/Notices.vue'
	import Toppers from '../../components/Welcome_Home/Toppers.vue'
	export default {
		components: {
			Banner,
			Vision,
			Enquiry,
			Notices,
			Toppers
		}
	}
</script>

<style>

</style>
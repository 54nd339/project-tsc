<template>
	<div id="content" class="container-fluid">
		<div class="row justify-content-center">
			<Tests />
			<Uploads />
		</div>
		<div class="row justify-content-center">
			<Enquiries />
			<Admins />
		</div>
	</div>
</template>

<script>
	import Admins from '@/components/Admin_Home/Admins.vue';
	import Enquiries from '@/components/Admin_Home/Enquiries.vue';
	import Tests from '@/components/Admin_Home/Tests.vue';
	import Uploads from '@/components/Admin_Home/Uploads.vue';
 	export default {
		components: { 
			Admins, Enquiries, Tests, Uploads 
		}
 	}
 </script>
 
 <style>
 
 </style>
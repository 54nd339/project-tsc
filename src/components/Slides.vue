<template>
	<b-carousel controls indicators :id="title">
		<b-carousel-slide active :img-src="urls[0]"
			img-height="480px" img-width="1024px" :caption="captions[0]"
			:text="texts[0]" alt="image slot" />

		<b-carousel-slide :img-src="urls[1]"
			img-height="480px" img-width="1024px" :caption="captions[1]"
			:text="texts[1]" alt="image slot" />

		<b-carousel-slide :img-src="urls[2]"
			img-height="480px" img-width="1024px" :caption="captions[2]"
			:text="texts[2]" alt="image slot" />

		<b-carousel-slide :img-src="urls[3]"
			img-height="480px" img-width="1024px" :caption="captions[3]"
			:text="texts[3]" alt="image slot" />

		<b-carousel-slide :img-src="urls[4]"
			img-height="480px" img-width="1024px" :caption="captions[4]"
			:text="texts[4]" alt="image slot" />
	</b-carousel>
</template>

<script setup>
const props = defineProps({
	title: {
		type: String,
		required: true,
	},
	urls: {
		type: Array,
		required: true,
	},
	captions: {
		type: Array,
		required: true,
	},
	texts: {
		type: Array,
		required: true,
	}
})

// Do something
</script>

<style>

</style>
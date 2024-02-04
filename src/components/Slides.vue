<template>
	<b-carousel controls :id="title">
		<b-carousel-slide v-for="(item, index) in carouselItems" :key="item.id"
			:img-src="item.url" img-height="480px" img-width="1024px"
			:active="index === 0" :id="item.id" :img-alt="item.title"
			:caption="item.title" :text="item.context"
		/>
	</b-carousel>
</template>

<script setup>
const props = defineProps({
	title: {
		type: String,
		required: true,
	},
	carouselItems: {
		type: Array,
		required: true,
	},
});
</script>

<style>
.carousel-caption {
	display: inline-block;
	background: radial-gradient(circle, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0));
}
</style>
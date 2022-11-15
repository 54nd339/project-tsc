<template>
	<b-modal :id="name" :title="$props.title" aria-labelledby="ViewImage" aria-hidden="true" :hide-footer="true">
        <img :src="$props.src" class="img-fluid" />
	</b-modal>
</template>

<script setup>
const props = defineProps({
	name: String, title: String, src: String
})
</script>

<style>

</style>
<template>
   	<b-container fluid id="content" v-for="(batch, index) in batches" :key="batch">
		<b-row class="featurette p-md-3">
			<div :class="[(index%2) == 0 ? '' : 'order-md-2', 'col-md-7']">
				<h2 class="featurette-heading">{{ batch.title }} <span class="text-muted">({{ batch.subtitle }})</span></h2>
				<p class="lead">{{ batch.context }}</p>
			</div>
			<div :class="[(index%2) == 0 ? '' : 'order-md-1', 'col-md-5']" class="justify-content-center">
				<img :src="batch.url" class="img-fluid shadow rounded" height="500" width="500" />
			</div>
		</b-row>
		<hr class="featurette-divider" v-if="index != batches.length - 1">
	</b-container>
</template>

<script setup>
import getCollection from '@/db/getCollection'
import { ref } from 'vue'

const batches = ref([])
const loadData = async() => {
    await(getCollection('batches'))
    .getDocuments().then((docs) => {
        batches.value = docs
    }).catch((err) => {
        console.log(err)
    })
}

loadData()
</script>

<style>

</style>
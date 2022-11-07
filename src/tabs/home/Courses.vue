<template>
   	<div id="content" class="container-fluid" v-for="(batch, index) in batches" :key="batch">
		<div class="row featurette">
			<div :class="[(index%2) == 0 ? '' : 'order-md-2', 'col-md-7']">
				<h2 class="featurette-heading">{{ batch.title }} <span class="text-muted">({{ batch.subtitle }})</span></h2>
				<p class="lead">{{ batch.context }}</p>
			</div>
			<div :class="[(index%2) == 0 ? '' : 'order-md-1', 'col-md-5']">
				<img :src="batch.url" class="img-fluid" height="500" width="500" />
			</div>
		</div>
		<hr class="featurette-divider">
	</div>
</template>

<script setup>
import getCollection from '@/db/getCollection'
import { ref } from 'vue'

const batches = ref([])
const loadData = async() => {
    await(getCollection('batches', '', '', ''))
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
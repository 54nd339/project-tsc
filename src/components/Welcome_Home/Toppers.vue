<template>
    <div id="toppers" class="col-md-3 px-md-3 mx-md-3">
        <div class="row">
            <div class="col-lg-12">
                <h2 class="shadow m-md-2 py-4 d-flex justify-content-center heading"> Our Polished Gems</h2>
            </div>
            <div id="toppers" style="height: 115vh; overflow-y: auto;">
                <div v-for="topper in toppers" :key="topper" class="col-lg-12">
                    <img :src="topper.url" width="250" height="250" />
                    <p><strong>{{ topper.name }}</strong><br>{{ topper.course }} : {{ topper.score }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import getCollection from '@/db/getCollection'
import { ref } from 'vue'

const toppers = ref([])
const loadData = async() => {
    await(getCollection('toppers', '', '', '', ''))
    .getDocuments().then((docs) => {
        toppers.value = docs
    }).catch((err) => {
        console.log(err)
    })
}
loadData()
</script>

<style>

</style>
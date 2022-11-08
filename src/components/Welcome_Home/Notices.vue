<template>
    <div id="Notices" class="col-md-6 p-1">
        <b-container fluid>
            <div class="col-lg-12">
                <h2 class="shadow m-md-1 py-3 d-flex justify-content-center heading">Notices</h2>
            </div>
            <div class="p-md-3 rounded" style="background-color: #57cc99; max-height: 59vh; overflow-y: auto;">
                <div v-for="notice in notices" :key="notice.id" class="p-1 p-md-0">
                    <h5>{{ notice.title }}</h5>
                    <p>{{ notice.context }}</p>
                </div>
            </div>
        </b-container>
    </div>
</template>

<script setup>
import getCollection from '@/db/getCollection'
import { ref } from 'vue'

const notices = ref([])
const loadData = async() => {
    await(getCollection('notices', '', '', '', ''))
    .getDocuments().then((docs) => {
        notices.value = docs
    }).catch((err) => {
        console.log(err)
    })
}
loadData()
</script>

<style>

</style>
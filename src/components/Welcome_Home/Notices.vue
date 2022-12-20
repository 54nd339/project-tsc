<template>
    <b-col md="4" id="notices" class="p-1">
        <b-container fluid>
            <h2 class="m-md-1 py-3 d-flex justify-content-center heading">Notices</h2>
            <div class="p-md-3 rounded border border-success shadow" style="height: 28vw; overflow-y: auto; min-height: 430px">
                <b-card class="text-center m-2" v-for="(notice, index) in notices" :key="notice.id" :header="notice.title"
                    header-bg-variant="success" header-text-variant="light" :class="{ shadow: isHover && ind == index }"
                    @mouseover="isHover = true; ind = index" @mouseout="isHover = false; ind = -1">
                        <b-card-text>{{ notice.context }}</b-card-text>
                </b-card>
            </div>
        </b-container>
    </b-col>
</template>

<script setup>
import getCollection from '@/db/getCollection'
import { ref } from 'vue'
const notices = ref([])
const loadData = async() => {
    await(getCollection('notices'))
    .getDocuments().then((docs) => {
        notices.value = docs
    }).catch((err) => {
        console.log(err)
    })
}
const isHover = ref(false)
const ind = ref(-1)
loadData()
</script>

<style>

</style>
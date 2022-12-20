<template>
    <b-container fluid id="batches" class="my-1">
        <h1 class="m-2 py-4 d-flex justify-content-center border-bottom">Our Batches</h1>
        <b-row align-h="center">
            <b-col md="3" v-for="(batch, index) in batches" :key="batch" rounded>
                <div class="flip-card m-2">
                    <div class="flip-card-inner rounded border border-success" :class="{ shadow: isHover && ind == index }"
                        @mouseover="isHover = true; ind = index" @mouseout="isHover = false; ind = -1">
                        <div class="flip-card-front rounded p-3">
                            <b-img :src="batch.url" alt="Card image" style="max-height:215px" fluid-grow rounded />
                        </div>
                        <div class="flip-card-back rounded p-3">
                            <p>{{ batch.summary }}</p>
                        </div>
                    </div>
                </div>
            </b-col>
        </b-row>
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
const isHover = ref(false)
const ind = ref(-1)

loadData()
</script>

<style>
.flip-card {
    height: 250px;
    perspective: 1000px;
}
.flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    /* box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); */
}
.flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
}
.flip-card-front, .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
}
.flip-card-back {
    background-color: #2980b9;
    color: white;
    transform: rotateY(180deg);
}
</style>
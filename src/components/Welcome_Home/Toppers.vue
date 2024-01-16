<template>
    <div id="toppers" class="row rounded">
        <div class="col-lg-12">
            <h2 class="m-2 py-4 d-flex justify-content-center border-bottom"> Our Polished Gems</h2>
        </div>
        <section class="scroller__wrapper">
            <div class="scroller__container">
                <div class="scroller p-3">
                    <div class="scroller__item m-2 rounded border border-success" v-for="(topper, index) in toppers" :key="topper"
                        :class="{ shadow: isHover && ind == index }"  @mouseover="isHover = true; ind = index" @mouseout="isHover = false; ind = -1">
                        <img :src="topper.url" width="250" height="250" alt="topper" />
                        <div class="d-flex flex-column align-items-center justify-content-center">
                            <h4><strong>{{ topper.name }}</strong></h4>
                            <h6>{{ topper.course }} : {{ topper.score }}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import getCollection from '@/db/getCollection'
import { ref } from 'vue'

const toppers = ref([])
const loadData = async() => {
    await(getCollection('toppers'))
    .getDocuments().then((docs) => {
        toppers.value = [...docs, ...docs]
    }).catch((err) => {
        console.log(err)
    })
}
const isHover = ref(false)
const ind = ref(-1)

loadData()
</script>

<style>
.scroller__wrapper {
    /* How long one slide is visible on screen (from entering screen to leaving it) */
    --scrolling-gallery-item-duration: 15s;
    /* How many items we want to see on screen at once */
    --scrolling-gallery-items-visible: 5;
    /* How many items are to scroll */
    --scrolling-gallery-items-total: v-bind(toppers.length/2);
    overflow: hidden;
    will-change: transform;
}
@media screen and (max-width: 425px) {
    .scroller__wrapper {
        --scrolling-gallery-item-duration: 5s;
        --scrolling-gallery-items-visible: 1;
    }
}
@media screen and (max-width: 768px) and (min-width: 426px) {
    .scroller__wrapper {
        --scrolling-gallery-item-duration: 15s;
        --scrolling-gallery-items-visible: 2;
    }
}
.scroller {
    animation-duration: calc(var(--scrolling-gallery-item-duration, 1s) / var(--scrolling-gallery-items-visible) * var(--scrolling-gallery-items-total));
    animation-timing-function: linear;
    animation-name: scrolling-gallery;
    animation-iteration-count: infinite;
    display: flex;
    white-space: nowrap;
}
.scroller__container {
    /* Without this, scroll will jump on desktop if any vertical scrollbar is shown */
    width: 100vw;
}
.scroller__item {
    flex: 1 0 calc(100% / var(--scrolling-gallery-items-visible));
    /* Without this, block elements will take width from their contents and thus making wrong calculations,
        so this just force elements to take only exact part of the container (screen) and equal for all */
    width: 0px;
    /* If you want to have it continuous without any spaces, remove two lines below */
    box-sizing: border-box;
    padding: 0.5em;
}
.scroller img {
    display: block;
    object-fit: cover;
    object-position: center;
    width: 100%;
}
@keyframes scrolling-gallery {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(calc(var(--scrolling-gallery-items-total) * -100vw / var(--scrolling-gallery-items-visible)));
    }
}
.scroller:hover, .scroller:focus {
    animation-play-state: paused;
}
</style>
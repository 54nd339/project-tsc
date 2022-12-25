<template>
    <b-container fluid id="vision" class="my-1">
        <h1 class="m-2 py-4 d-flex justify-content-center border-bottom">Our Process</h1>
        <b-row align-h="center">
            <b-col md="4" class="p-2" v-for="(image, index) in images" :key="image">
                <b-container class="m-1 p-4 shadow rounded h-100 border border-success text-center">
                    <b-img :src="getSrc(index)" alt="Our Process"
                        class="img-fluid" height="85px" width="85px" />
                    <h2>{{ image.title }}</h2>
                    <p>{{ image.context }}</p>
                </b-container>
            </b-col>
            <div class="d-flex justify-content-center m-2">
                <b-button variant="success" class="shadow" v-b-modal.registerForm>Register Now</b-button>
            </div>
        </b-row>
    </b-container>
</template>

<script setup>
const images = [{
    title: 'What do we do?',
    context: 'Every student is different. We try to find the best in them and work passionately in order to awaken the inner potential and channelize it to an optimum level.'
}, {
    title: 'How do we do it?',
    context: 'Well, everyone is blessed with unique skills. We figure out the capabilities of each individual and combine them to work in conjunction.'
}, {
    title: 'How are we unique?',
    context: 'Individual attention and performance analysis are the key factors to our success. Of course, we have other secret ingredients as well!'
}]

const getSrc = (index) => {
    return new URL(`../../assets/images/our_process_${index+1}.png`, import.meta.url).href
}
</script>

<style>

</style>
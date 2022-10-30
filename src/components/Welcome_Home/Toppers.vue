<template>
    <div id="toppers" class="col-md-3 px-md-3 mx-md-3">
        <div class="row">
            <div class="col-lg-12">
                <h2 class="shadow m-md-2 py-4 d-flex justify-content-center heading"> Our Polished Gems</h2>
            </div>
            <div id="toppers" style="height: 121vh; overflow-y: auto;">
                <div v-for="topper in toppers" :key="topper" class="col-lg-12">
                    <svg class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 500x500"><title>Placeholder</title><rect width="100%" height="100%" fill="#eee"/><text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text></svg>
                    <p><strong>{{ topper.name }}</strong><br>{{ topper.class }} : {{ topper.marks }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const toppers = [
    { id: 1, name: 'John Doe', class: 'CBSE 12th', marks: '97.6%' },
    { id: 2, name: 'Jane Doe', class: 'CBSE 10th', marks: '97.6%' },
    { id: 3, name: 'John Doe', class: 'CBSE 12th', marks: '97.6%' },
    { id: 4, name: 'Jane Doe', class: 'CBSE 10th', marks: '97.6%' }
]
</script>

<style>

</style>
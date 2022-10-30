<template>
    <div id="Notices" class="col-md-6 p-1">
        <b-container fluid>
            <div class="col-lg-12">
                <h2 class="shadow m-md-1 py-3 d-flex justify-content-center heading">Notices</h2>
            </div>
            <div class="p-md-3 rounded" style="background-color: #57cc99; max-height: 54vh; overflow-y: auto;">
                <div v-for="notice in notices" :key="notice.id" class="p-1 p-md-0">
                    <h5>{{ notice.title }}</h5>
                    <p>{{ notice.content }}</p>
                </div>
            </div>
        </b-container>
    </div>
</template>

<script setup>
const notices = [
    { id: 1, title: 'New Batches Starting Soon', content: 'CBSE and ICSE batches from class 6th to 10th starting soon' },
    { id: 2, title: 'Class 12 Results declared', content: 'We achieved success. 5 students above 95 and 19 above 90' },
    { id: 3, title: 'Class 10 Board Exams Schedule Released', content: 'Clink the link here. Revision classes starting soon. Register Now' },
    { id: 4, title: 'Sample Test Papers released', content: 'Find them here. Prepare accordingly with the articles mentioned' },
    { id: 5, title: 'We in news', content: 'Click the link below to see the success of our students and their goals' },
    { id: 6, title: 'New Batches Starting Soon', content: 'CBSE and ICSE batches from class 6th to 10th starting soon' },
    { id: 7, title: 'Class 12 Results declared', content: 'We achieved success. 5 students above 95 and 19 above 90' },
    { id: 8, title: 'Class 10 Board Exams Schedule Released', content: 'Clink the link here. Revision classes starting soon. Register Now' },
    { id: 9, title: 'Sample Test Papers released', content: 'Find them here. Prepare accordingly with the articles mentioned' },
    { id: 10, title: 'We in news', content: 'Click the link below to see the success of our students and their goals' }
]
</script>

<style>

</style>
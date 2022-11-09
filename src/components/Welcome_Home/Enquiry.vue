<template>
  <div id="Enquiry" class="col-md-6 p-1">
    <b-container fluid>
        <div class="col-lg-12">
            <h2 class="shadow m-md-1 py-3 d-flex justify-content-center heading">Let's Get in Touch</h2>
        </div>
        <b-form class="p-1 p-md-3 rounded" @submit="onSubmit" style="background-color: #57cc99; height: 59vh;">
            <b-form-select v-model="course" :options="courseList" size="lg" class="d-flex mx-auto m-2" />
            <b-form-select v-model="grade" :options="gradeList" size="lg" class="d-flex mx-auto m-2" />
            <b-form-input v-model="name" type="text" class="d-flex mx-auto m-2"
				size="lg" placeholder="Enter name" required />
            <b-form-input v-model="phone" type="tel" class="d-flex mx-auto m-2"
				size="lg" placeholder="Enter phone" required />
            <b-form-textarea v-model="message" class="d-flex mx-auto m-2" size="lg" no-resize
                placeholder="Enter your message" rows="3" max-rows="8" required />
            <div class="d-flex justify-content-center">
                <b-button type="submit" variant="primary" size="lg" v-if="submit">Submit</b-button>
                <b-button type="submit" size="lg" v-else disabled>Submitted</b-button>
            </div>
        </b-form>
    </b-container>
  </div>
</template>

<script setup>
import addCollection from '@/db/addDocument.js'
import { ref } from 'vue'

const course = ref('default')
const courseList = [
    { value: 'default', text: 'Select Course' },
    { value: 'ICSE', text: 'ICSE' },
    { value: 'CBSE', text: 'CBSE' },
    { value: 'CHSE', text: 'CHSE' },
    { value: 'JEE/NEET', text: 'JEE/NEET' }
]
const grade = ref(0)
const gradeList = [
	{ value: 0, text: 'Select Grade'},
    { value: 5, text: '5' },
    { value: 6, text: '6' },
    { value: 7, text: '7' },
    { value: 8, text: '8' },
    { value: 9, text: '9' },
    { value: 10, text: '10' },
    { value: 11, text: '11' },
    { value: 12, text: '12' }
]
const name = ref('')
const phone = ref('')
const message = ref('')
const submit = ref(true)

const onSubmit = async() => {
    (await addCollection('enquiry')).addDocument('', {
        name: name.value,
        phone: phone.value,
        course: course.value,
        grade: grade.value,
        message: message.value
    }).then(async() => {
        name.value = ''
        phone.value = ''
        course.value = 'default'
        grade.value = 0
        message.value = ''
        submit.value = false
        setTimeout(() => {
            submit.value = true
        }, 5000)
    }).catch((err) => {
        console.log(err)
    })
}

</script>

<style>

</style>
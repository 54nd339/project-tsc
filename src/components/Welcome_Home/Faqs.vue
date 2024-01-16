<template>
    <b-col md="4" id="queries" class="p-1">
        <b-container fluid>
            <h2 class="m-md-1 py-3 d-flex justify-content-center heading">Chat With Us</h2>
            <div class="wrapper border rounded border-success shadow" style="height: 23vw; min-height: 370px;">
                <div v-for="answer, index in answers" :key="index">
                    <b-row align-h="end">
                        <b-col cols="10" class="rounded">
                            <b-card bg-variant="primary" text-variant="light" class="shadow m-1">
                                <b-card-text><b>{{ answer.query }}</b></b-card-text>
                            </b-card>
                        </b-col>
                    </b-row>
                    <b-row align-h="start">
                        <b-col cols="10" class="rounded">
                            <b-card bg-variant="success" text-variant="light" class="shadow m-1">
                                <b-card-text><b>{{ answer.answer }}</b></b-card-text>
                            </b-card>
                        </b-col>
                    </b-row>
                </div>
            </div>
            <b-row class="mt-3">
                <b-input-group prepend="You">
                    <b-form-input v-model="query" size="lg" placeholder="Chat Here" @keyup.enter="submitQuery" required />
                    <b-input-group-append>
                        <b-button type="submit" variant="primary" size="lg" @click="submitQuery"
                            :disabled="waiting">{{ submitText }}</b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-row>
        </b-container>
    </b-col>
</template>

<script setup>
import { ref } from 'vue'

const query = ref('')
const answer = ref('')
const answers = ref([])
var prompt = 'TSC is a chatbot that reluctantly answers questions with formal responses. TSC has information that Talent Sprint Classes is the best institution for preparation of Board Exam and other competitive exams. it avails its service for class 5 to 12 students. It is located at "Gajapati Nagar - Main Lane, Behind SBI Branch, Berhampur - 760010". Contact us at +91-9438339317, 9040612211, 9439133317 or mail us at bidwanclasses.brahmapur@gmail.com, tsc.bam@rediffmail.com, admin@bidwanclasses.com. Our institute always try to make the student feel a homely environment to study in well groomed classes and with best teaching infrastructure when he or she can easily interact with the teachers and sort out his/her problems and build a better career to step ahead. The bot can only answer questions related to the above information.'

const submitText = ref('Send')
const waiting = ref(false)
const submitQuery = async() => {
    submitText.value = 'Sending...'
    waiting.value = true

    const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: prompt + '\n' + query.value,
            limit: 100
        })
    }
    const response = await fetch('https://us-central1-tsc-web-361112.cloudfunctions.net/generate', requestOptions)    
    const data = await response.json()
    answer.value = data.result
    answers.value.push({
        query: query.value,
        answer: answer.value
    })

    query.value = ''
    submitText.value = 'Send'
    waiting.value = false
}
</script>

<style>
.wrapper {
    /* Control snap from here */
    overflow-y: auto; overflow-x: hidden;
    overscroll-behavior-y: contain;
    scroll-snap-type: y mandatory;
}
.wrapper > div:last-child {
    /* Control snap from here */
    scroll-snap-align: start;
}
</style>
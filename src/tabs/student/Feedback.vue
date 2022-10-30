<template>
    <div id="Enquiry" class="rounded justify-content-center" style="background-color: #57cc99;">
        <form>
            <h3><u>FEEDBACK FORM !!</u></h3>
            <b-form-select v-model="subject" :options="subjectList"></b-form-select>
            <div class="form-group" v-for="question in questions" :key="question">
                <label class="col-md-7 px-4 mx-3">{{ question }}</label>
                <b-form-radio-group v-model="selected" :options="options" class="my-1" value-field="item"
                text-field="name"></b-form-radio-group>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const options = [
    { name: 'Strongly Disagree', item: 1 },
    { name: 'Disagree', item: 2 },
    { name: 'Neutral', item: 3 },
    { name: 'Agree', item: 4 },
    { name: 'Strongly Agree', item: 5 }
]
const selected = ref(0)
const subject = ref('default')
const subjectList = [
	{ value: 'default', text: 'Select Subject'},
	{ value: 'eng1', text: 'English 1'},
	{ value: 'eng2', text: 'English 2'},
	{ value: 'odia', text: 'Odia'},
	{ value: 'hindi', text: 'Hindi'},
	{ value: 'math', text: 'Mathematics'},
	{ value: 'comp', text: 'Computers'},
	{ value: 'sci', text: 'Science'},
	{ value: 'phys', text: 'Physics'},
	{ value: 'chem', text: 'Chemistry'},
	{ value: 'bio', text: 'Biology'},
	{ value: 'sst', text: 'Social Science'},
	{ value: 'hist', text: 'History'},
	{ value: 'geo', text: 'Geography'}
]
const questions = [
    "Q1. The teacher covers the whole syllabus :",
    "Q2. The teacher discusses syllabus in detail :",
    "Q3. The teacher possesses deep knowledege of the subject taught :",
    "Q4. The teacher communicates clearly :",
    "Q5. The teacher inspires me by his/her knowledege in the subject :",
    "Q6. The teacher is punctual to the class :",
    "Q7. The teacher engages the class for the full duration and completes the course in time :",
    "Q8. The teacher comes fully prepared for the class :",
    "Q9. The teacher provides guidance counselling in academic and non-academic matters in/out side the class :"
]

const value = ref(0)
</script>

<style>

</style>
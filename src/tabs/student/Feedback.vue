<template>
    <div class="rounded-3 m-3" style="background-color:#57CC99; min-height: 45vh">
        <div class="shadow m-3 py-1 rounded-3 p-md-2" style="background-color:#80ED99">
            <h3 class="text-center" style>Feedback Form for {{ user.feedback }}</h3>
        </div>
        <div class="d-flex mb-1 justify-content-center">
			<b-form @submit="onSubmit">
                <b-form-group v-for="(question, index) in questions" :key="question"
                    content-cols="6" :label="question">
                    <b-form-radio-group v-model="selects[index]" :options="options" class="my-1" value-field="item"
                    text-field="name" required></b-form-radio-group>
                </b-form-group>
                <div class="d-flex mb-1 justify-content-end">
                    <b-button-group>
                        <b-button type="reset" variant="danger" size="lg">Reset </b-button>
                        <b-button type="submit" variant="primary" size="lg">Submit</b-button>
                    </b-button-group>
                </div>
            </b-form>
		</div>
    </div>
</template>

<script setup>
import getCollection from '@/db/getCollection'
import useDocument from '@/db/useDocument'
import { ref } from 'vue'

const props = defineProps({
    user: {
		type: Object,
		required: true
	}
})
const emit = defineEmits(['submitClick'])

const options = [
    { name: 'Strongly Disagree', item: 1 },
    { name: 'Disagree', item: 2 },
    { name: 'Neutral', item: 3 },
    { name: 'Agree', item: 4 },
    { name: 'Strongly Agree', item: 5 }
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

const selects = Array.from({ length: questions.length }, () => ref(0))
const teacherId = ref('default')

const onSubmit = async() => {
    const btn = event.target.querySelector('button[type="reset"]')
    const key = 'classes.' + props.user.course + '_' + props.user.class

    await getCollection('teachers', [key, 'array-contains', props.user.feedback])
    .getDocuments().then(async (data) => {
        if(data) {
            teacherId.value = data[0].id
            await (await useDocument('teachers', teacherId.value))
            .getDetail().then(async (data) => {
                if(data) {
                    const currRating = data.rating
                    currRating.count = Number(currRating.count) + 1
                    selects.forEach((val, index) => {
                        currRating.vals[index] = Number(currRating.vals[index]) + Number(val)
                    })
                    
                    currRating.val = currRating.vals.reduce((a, b) => a + b, 0) / currRating.vals.length
                    currRating.val = currRating.val.toFixed(2)

                    await (await useDocument('teachers', teacherId.value))
                    .updateDocs({rating: currRating}).then(async () => {
                        await (await useDocument('students', props.user.id))
                        .updateDocs({feedback: 'default'}).then(() => {
                            btn.click()
                            alert('Feedback submitted successfully')
                            emit('submitClick')
                        }).catch((err) => {
                            console.log(err)
                        })
                    }).catch((err) => {
                        console.log(err)
                    })
                }
            }).catch((err) => {
                console.log(err)
            })
        }
    }).catch((err) => {
        console.log(err)
    })
}
</script>

<style>

</style>
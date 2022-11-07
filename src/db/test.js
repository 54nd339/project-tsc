import addDocument from "./addDocument"
import { ref } from "vue"

export default async function test() {
    const course = ['ICSE', 'CBSE', 'CHSE']

    course.forEach(async (item) => {
        for(let i = 5; i <= 12; i++) {
            (await addDocument('schedule'))
            .addDocument(item+'_'+i, {
                mon: ['default', 'default', 'default'],
                tue: ['default', 'default', 'default'],
                wed: ['default', 'default', 'default'],
                thu: ['default', 'default', 'default'],
                fri: ['default', 'default', 'default'],
                sat: ['default', 'default', 'default'],
            })
        }
    })
}
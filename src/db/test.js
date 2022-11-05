import useDocument from "./useDocument"
import getDocument from "./getDocument"
import { ref } from "vue"
export default async function test() {
    getDocument('schedule', 'class_10').getDetail().then(async (doc) => {
        for(let i = 5; i <= 12; i++) {
            if(i != 10) {
                let docId = 'class_' + i
                console.log(doc)
                await (await useDocument('schedule', docId)).updateDocs({
                    mon: doc.mon,
                    tue: doc.tue,
                    wed: doc.wed,
                    thu: doc.thu,
                    fri: doc.fri,
                    sat: doc.sat,
                }).then(() => {
                    console.log('done')
                }).catch((err) => {
                    console.log(err)
                })            
            }
        }
    })
}
<template>
	<b-modal id="payFee" title="Pay Fee" aria-labelledby="payFee" aria-hidden="true" :hide-footer="true">
		<b-form @submit="uploadSS">
			<b-card id="payf" v-if="!student.paid">
				<p>Pay Here, ignore if you have already paid. You'll be Informed Soon. Contact 9439133317 for fee details and approval status.</p>
				<b-img src="https://firebasestorage.googleapis.com/v0/b/tsc-web-361112.appspot.com/o/QR%20Code%20-%20M_s%20TALENT%20SPRINT%20GROUP%20OF%20INSTITUTIONS%20%20(2).png?alt=media&token=7a9d57d0-ad68-4871-a52d-923344311fe1" fluid alt="QR" />
				<b-input-group prepend="Upload Screenshot">
					<input type="file" class="d-flex mx-auto my-1" name="file" @change="onFileChange" required/>
				</b-input-group>
			</b-card>
            <b-card id="payf" v-else>
				<b-img :src="student.ssURL" fluid alt="QR" />
			</b-card>
			<div class="d-flex my-1 justify-content-end">
				<b-button-group>
					<b-button type="reset" variant="danger" size="lg">Reset </b-button>
					<b-button type="submit" variant="primary" size="lg"
					:disabled="uploadText != 'Upload'">{{ uploadText }}</b-button>
				</b-button-group>
			</div>
		</b-form>
	</b-modal>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import useDocument from '@/db/useDocument'
import useStorage from '@/db/useStorage'

const id = useRoute().params.id
const student = ref({})
await(await useDocument('students', id))
.getDetail().then((data) => {
	student.value = data
}).catch((err) => {
	console.log(err)
})

const file1 = ref(null)
const onFileChange = (e) => {
	file1.value = e.target.files[0]
}
const uploadText = ref('Upload')
const uploadSS = async() => {
    const btn = event.target.closest('.modal-content')
                            .querySelector('.btn-close')
	let file = file1.value
    uploadText.value = 'Uploading...'
	let path = `fees/${student.value.course}_${student.value.class}/${student.value.name}_${file.name}`
	await useStorage().uploadFile(file, path)
	.then(async(res) => {
		if(res) {
            student.value = {
				...student.value,
                paid: true,
				ssURL: res.url,
				ssPath: res.snapshot.metadata.fullPath
			}
            await(await useDocument('students', id))
            .updateDocs(student.value).then(() => {
				uploadText.value = 'Upload'
				file1.value = null
                btn.click()
            }).catch((err) => {
                console.log(err)
            })
		}
		else
			console.log('Error uploading ss')
	}).catch(err => {
		console.log(err)
	})
}

</script>

<style>

</style>
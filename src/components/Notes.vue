<template>
    <b-modal id="addNote" title="Add Note" aria-labelledby="addNote" aria-hidden="true" :hide-footer="true">
        <b-form @submit="addNote">
            <b-form-input v-model="topic" class="d-flex mx-auto my-1"
                size="lg" placeholder="Enter Topic" required />
            <b-input-group size="lg" prepend="Upload Note">
                <input type="file" class="d-flex mx-auto my-1" :name="file1" @change="onFileChange" required/>
            </b-input-group>
            <div class="d-flex mb-1 justify-content-end">
                <b-button-group>
                    <b-button type="reset" variant="danger" size="lg">Reset </b-button>
                    <b-button type="submit" variant="primary" size="lg"
                    :disabled="uploadText != 'Upload' || !file1">{{ uploadText }}</b-button>
                </b-button-group>
            </div>
        </b-form>
    </b-modal>
</template>

<script setup>
import addCollection from '@/db/addDocument'
import useDocument from '@/db/useDocument'
import useStorage from '@/db/useStorage'
import { ref } from 'vue'

const props = defineProps({  
	target: {
		type: Object,
		required: true
	},
})
const emit = defineEmits(['submitClick'])
const topic = ref('')
const file1 = ref(null)
const onFileChange = (e) => {
    file1.value = e.target.files[0]
}

const uploadText = ref('Upload')
const addNote = async () => {
    let note = props.target
    let file = file1.value
    let path = `notes/${note.course + '_' + note.class}/${note.subject}/${file.name}` 
    uploadText.value = 'Uploading...'

    await useStorage().uploadFile(file, path)
    .then(async(fileRef) => {
        if(fileRef) {
            const newNote = {
                course: note.course,
                class: note.class,
                subject: note.subject,
                topic: topic.value,
                url: fileRef.url,
                path: fileRef.snapshot.metadata.fullPath,
                date: fileRef.snapshot.metadata.timeCreated
            }

            await (await addCollection('notes'))
            .addDocument('', newNote).then((uid) => {
                topic.value = ''
                file1.value = null
                uploadText.value = 'Upload'
                emit('submitClick', 'add', { id: uid, ...newNote })
            }).catch((err) => {
                console.log(err)
            })
        }
        else
            console.log('File not uploaded')
    }).catch((err) => {
        console.log(err)
    })
}

const delNote = async () => {
    const note = props.target
    await useStorage().deleteFile(note.path)
    .then(async(fileRef) => {
        if(fileRef) {
            await (await useDocument('notes', note.id))
            .delDoc().then(() => {
                emit('submitClick', 'del', note)
            }).catch((err) => {
                console.log(err)
            })
        }
        else
            console.log('File not found')
    }).catch((err) => {
        console.log(err)
    })
}

defineExpose({ delNote })
</script>

<style>

</style>
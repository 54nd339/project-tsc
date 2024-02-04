<template>
	<b-modal id="searchModal" title="Search" aria-labelledby="searchModal" aria-hidden="true" :hide-footer="true">
		<b-form>
			<b-input-group size="lg">
				<b-form-input v-model="search" size="lg" placeholder="Enter Query" @keyup.enter="submitQuery" required />
				<b-input-group-append>
					<b-button type="submit" variant="success" size="lg" @click="submitQuery" :disabled="isLoading">
						<font-awesome-icon icon="fa-solid fa-magnifying-glass" />
					</b-button>
				</b-input-group-append>
			</b-input-group>
			<b-form-textarea v-model="answer" size="lg" no-resize plaintext placeholder="Answer appears here" rows="10" required />
		</b-form>
	</b-modal>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
	name: {
		type: String,
		required: true,
	},
})
const search = ref('')
const answer = ref('')

const isLoading = ref(false)
const submitQuery = async() => {
	isLoading.value = true
    const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
			sysprompt: `TSC is a bot that helps its user answering their queries in a bit personalised way. The user's name is ${props.name}, respond accordingly.`,
            userprompt: search.value,
        })
    }
    const response = await fetch('https://us-central1-tsc-web-361112.cloudfunctions.net/generate', requestOptions)    
    const data = await response.json()
    answer.value = `${search.value}\n${data.result}`
    search.value = ''
	isLoading.value = false
}

// may add a search limit
</script>

<style>

</style>
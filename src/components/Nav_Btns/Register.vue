<template>
	<b-modal id="registerForm" title="Register" aria-labelledby="registerForm" aria-hidden="true" :hide-footer="true">
		<b-form>
			<b-card id="init" class="text-center fade show">
				<div class="d-flex flex-column">
					<b-button variant="outline-success" size="lg" @click="newClick()" class="m-1">New User</b-button>
					<b-button variant="outline-success" size="lg" @click="regClick()" class="m-1">Already Registered</b-button>
				</div>
			</b-card>
			<b-card id="email" class="fade">
				<b-form-input v-model="email" type="email" class="d-flex mx-auto my-1"
					size="lg" placeholder="Enter email" required />
				<div class="d-flex justify-content-center">
					<b-form-radio-group v-model="selected" :options="options" class="my-1" value-field="item" text-field="name" />
				</div>
				<div id="warn" class="m-1 text-danger" v-if="warnmsg"><strong>{{ warnmsg }}</strong></div>
			</b-card>
			<b-card id="pay" class="fade">
				<p>Pay Here, ignore if you have already paid. You'll be Informed Soon. Contact 9439133317 for fee details and approval status.</p>
				<b-img src="https://www.payumoney.com/media/images/payby_payumoney/new_buttons/21.png" fluid />
				<b-input-group prepend="Upload Screenshot">
					<input type="file" class="d-flex mx-auto my-1" :name="payscreen" @change="onPayChange" required/>
				</b-input-group>
				<div id="warn" class="m-1 text-danger" v-if="warnmsg"><strong>{{ warnmsg }}</strong></div>
			</b-card>
			<b-card id="personal" class="fade">
				<b-form-input v-model="name" type="text" class="d-flex mx-auto my-1"
					size="lg" placeholder="Enter name" required />
				<b-form-input v-model="phone" type="tel" class="d-flex mx-auto my-1"
					size="lg" placeholder="Enter phone" required />
				<b-input-group size="lg" prepend="Enter DOB">
					<input v-model="dob" type="date" class="d-flex mx-auto my-1" required/>
				</b-input-group>
				<b-form-input v-model="email" type="email" class="d-flex mx-auto my-1"
					size="lg" placeholder="Enter email" required />
				<b-form-input v-model="password" type="password" class="d-flex mx-auto my-1"
					size="lg" placeholder="Enter password" required />
				<div class="d-flex justify-content-center">
					<b-form-radio-group v-model="selected" :options="options" class="my-1"
						value-field="item" text-field="name" required />
				</div>
				<div class="m-1" v-if="selected">Register as <strong>{{ selected }}</strong></div>
				<div id="warn" class="m-1 text-danger" v-if="warnmsg"><strong>{{ warnmsg }}</strong></div>
			</b-card>
			<b-card id="student_academic" class="fade">
				<b-form-input v-model="school" type="text" class="d-flex mx-auto my-1"
					size="lg" placeholder="Enter School Name" required />
				<b-input-group>
					<b-form-select v-model="grade" :options="gradeList" size="lg" />
					<b-form-select v-model="course" :options="courseList" size="lg" />
				</b-input-group>
			</b-card>
			<b-card id="student_detail" class="fade">
				<b-form-input v-model="marks" type="text" class="d-flex mx-auto my-1"
					size="lg" placeholder="Enter Recent Marks" required />
				<b-input-group class="m-1" prepend="Upload Photo">
					<input type="file" class="d-flex mx-auto my-1" :name="pic" @change="onPicChange" required/>
				</b-input-group>
				<b-input-group class="m-1" prepend="Upload Adhaar">
					<input type="file" class="d-flex mx-auto my-1" :name="adhaar" @change="onFileChange" required/>
				</b-input-group>
			</b-card>
			<b-card id="staff_academic" class="fade">
				<b-form-input v-model="qualification" type="text" class="d-flex mx-auto my-1"
					size="lg" placeholder="Enter Qualification" required />
				<b-form-input v-model="stream" type="text" class="d-flex mx-auto my-1"
					size="lg" placeholder="Enter Stream" required />
				<b-form-input v-model="university" type="text" class="d-flex mx-auto my-1"
					size="lg" placeholder="Enter University" required />
				<b-form-input v-model="yearofpass" type="text" class="d-flex mx-auto my-1"
					size="lg" placeholder="Enter Year of Passing" required />
			</b-card>
			<b-card id="staff_detail" class="fade">
				<b-form-input v-model="experience" type="text" class="d-flex mx-auto my-1"
					size="lg" placeholder="Enter Experience (None if none)" required />
				<b-form-input v-model="lastorg" type="text" class="d-flex mx-auto my-1"
					size="lg" placeholder="Enter Last Organisation (None if none)" required />
				<b-input-group v-if="selected == 'teacher'">
					<b-form-select v-model="grade" :options="gradeList" size="lg" />
					<b-form-select v-model="subject" :options="subjectList" size="lg" />
				</b-input-group>
				<b-input-group v-else>
					<b-form-select v-model="pos" :options="posList" size="lg" />
				</b-input-group>
				<b-input-group class="m-1" prepend="Upload Photo">
					<input type="file" class="d-flex mx-auto my-1" :name="pic" @change="onPicChange" required/>
				</b-input-group>
				<b-input-group class="m-1" prepend="Upload Adhaar">
					<input type="file" class="d-flex mx-auto my-1" :name="adhaar" @change="onFileChange" required/>
				</b-input-group>
				<b-input-group class="m-1" prepend="Upload Resume">
					<input type="file" class="d-flex mx-auto my-1" :name="cv" @change="onCVChange" required/>
				</b-input-group>
			</b-card>
			<b-card id="thanks" class="fade justify-content-center">
				<p>Thank you for registering.<br>You'll be Informed Soon.<br>Contact 9439133317 for fee details and approval status.</p>
			</b-card>
			<div v-if="state != 'init' && state != 'thanks'" class="d-flex justify-content-between m-1 p-1">
				<b-button variant="outline-success" size="lg" @click="goPrev">Previous</b-button>
				<b-button variant="outline-success" size="lg" v-if="nextState(state) != 'thanks' && state != 'pay'" @click="goNext">Next</b-button>
				<b-button variant="outline-success" size="lg" v-else @click="regUser"
					:disabled="subText == 'Registering...' || subText == 'Registered'">{{ subText }}</b-button>
			</div>
		</b-form>
	</b-modal>
</template>

<script setup>
import addCollection from '@/db/addDocument'
import getCollection from '@/db/getCollection'
import useDocument from '@/db/useDocument'
import useStorage from '@/db/useStorage'
import { onMounted, ref } from 'vue'

const state = ref('init')
const stateHistory = ref([])
const name = ref('')
const phone = ref('')
const dob = ref('')
const email = ref('')
const password = ref('')
const selected = ref('')
const warnmsg = ref('')
const options = [
	{ item: 'student', name: 'Student' },
	{ item: 'teacher', name: 'Teacher' },
	{ item: 'staff', name: 'Staff' },
]

const school = ref('')
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
const course = ref('default')
const courseList = [
	{ value: 'default', text: 'Select Course'},
	{ value: 'ICSE', text: 'ICSE' },
	{ value: 'CBSE', text: 'CBSE' },
	{ value: 'CHSE', text: 'CHSE' },
	{ value: 'JEE_NEET', text: 'JEE/NEET' }
]
const marks = ref('')
const pic = ref(null)
const onPicChange = (e) => {
	pic.value = e.target.files[0]
}
const adhaar = ref(null)
const onFileChange = (e) => {
	adhaar.value = e.target.files[0]
}

const qualification = ref('')
const stream = ref('')
const university = ref('')
const yearofpass = ref('')
const experience = ref('')
const lastorg = ref('')
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
const pos = ref('default')
const posList = [
	{ value: 'default', text: 'Select Position'},
	{ value: 'admin', text: 'Admin'},
	{ value: 'accountant', text: 'Accountant'},
	{ value: 'receptionist', text: 'Receptionist'},
	{ value: 'counsellor', text: 'Counsellor'},
	{ value: 'officeboy', text: 'Office Boy'}
]
const cv = ref(null)
const onCVChange = (e) => {
	cv.value = e.target.files[0]
}
const payscreen = ref(null)
const onPayChange = (e) => {
	payscreen.value = e.target.files[0]
}
onMounted(() => {
	const ele = document.getElementById('registerForm')
	ele.querySelector('.btn-close')
	.addEventListener('click', () => {
		if(state.value == 'init') return
		ele.querySelector('#init').classList.add('show')
		ele.querySelector(`#${state.value}`).classList.remove('show')
		state.value = 'init'
		stateHistory.value.pop()
	})
})

const newClick = () => {
	const ele = event.target.closest('.card')
	ele.classList.remove('show')
	ele.closest('form').querySelector('#personal').classList.add('show')
	state.value = 'personal'
	stateHistory.value.push('init')
}
const regClick = () => {
	const ele = event.target.closest('.card')
	ele.classList.remove('show')
	ele.closest('form').querySelector('#email').classList.add('show')
	state.value = 'email'
	stateHistory.value.push('init')
}
const nextState = (cur) => {
	if(state.value == 'email')
		return (selected.value == 'student') ? 'pay' : 'thanks'
	if(selected.value == 'student') {
		if(cur == 'personal') return 'student_academic'
		if(cur == 'student_academic') return 'student_detail'
		if(cur == 'student_detail') return 'thanks'
	}
	if(selected.value == 'teacher' || selected.value == 'staff') {
		if(cur == 'personal') return 'staff_academic'
		if(cur == 'staff_academic') return 'staff_detail'
		if(cur == 'staff_detail') return 'thanks'
	}
}
const goNext = async() => {
	const ele = event.target.closest('form')
	const curStep = ele.querySelector(`#${state.value}`)
	const inputs = curStep.querySelectorAll('input')
	let valid = true
	for(let i = 0; i < inputs.length; i++) {
		if(inputs[i].value == '') {
			inputs[i].classList.add('invalid')
			valid = false
		} else {
			if(inputs[i].classList.contains('invalid'))
				inputs[i].classList.remove('invalid')
		}
	}
	if(state.value == 'personal') {
		await getCollection('users', ['email', '==', email.value])
		.getDocuments().then((snapshot) => {
			if(!snapshot) return
			if(snapshot.length > 0) {
				warnmsg.value = 'Email already registered'
				valid = false
			}
			else warnmsg.value = ''
		})
	}
	if(state.value == 'email') {
		await getCollection('users', ['email', '==', email.value])
		.getDocuments().then((snapshot) => {
			if(!snapshot) return
			if(snapshot.length == 0) {
				warnmsg.value = 'Email not registered'
				valid = false
			}
			else warnmsg.value = ''
		})
	}
	if(!valid || selected.value == '') return
	curStep.classList.remove('show')

	const nextStep = nextState(state.value)
	const next = ele.querySelector(`#${nextStep}`)
	next.classList.add('show')

	stateHistory.value.push(state.value)
	state.value = nextStep
}
const goPrev = () => {
	const ele = event.target.closest('form')
	const cur = ele.querySelector(`#${state.value}`)
	cur.classList.remove('show')

	const prevStep = stateHistory.value.pop()
	const prev = ele.querySelector(`#${prevStep}`)
	prev.classList.add('show')

	state.value = prevStep
}

const newUser = ref(null)
const uploadPic = async() => {
	let picFile = pic.value
	let firstName = newUser.value.name.split(' ')[0]
	let path = `users/${firstName}_${newUser.value.phone}/${picFile.name}`
	await useStorage().uploadFile(picFile, path)
	.then((res) => {
		if(res) {
			newUser.value = {
				...newUser.value,
				picURL: res.url,
				picPath: res.snapshot.metadata.fullPath
			}
		}
		else
			console.log('Error uploading pic')
	}).catch(err => {
		console.log(err)
	})
}
const uploadAdhaar = async() => {
	let adhaarFile = adhaar.value
	let firstName = newUser.value.name.split(' ')[0]
	let path = `users/${firstName}_${newUser.value.phone}/${adhaarFile.name}`
	await useStorage().uploadFile(adhaarFile, path)
	.then((res) => {
		if(res) {
			newUser.value = {
				...newUser.value,
				adhaarURL: res.url,
				adhaarPath: res.snapshot.metadata.fullPath
			}
		}
		else
			console.log('Error uploading adhaar')
	}).catch(err => {
		console.log(err)
	})
}
const uploadCV = async() => {
	let cvFile = cv.value
	let firstName = newUser.value.name.split(' ')[0]
	let path = `users/${firstName}_${newUser.value.phone}/${cvFile.name}`
	await useStorage().uploadFile(cvFile, path)
	.then((res) => {
		if(res) {
			newUser.value = {
				...newUser.value,
				cvURL: res.url,
				cvPath: res.snapshot.metadata.fullPath
			}
		}
		else
			console.log('Error uploading cv')
	}).catch(err => {
		console.log(err)
	})
}
const uploadSS = async() => {
	let ssFile = payscreen.value
	let firstName = newUser.value.name.split(' ')[0]
	let path = `users/${firstName}_${newUser.value.phone}/${ssFile.name}`
	await useStorage().uploadFile(ssFile, path)
	.then((res) => {
		if(res) {
			newUser.value.paid = true
			newUser.value = {
				...newUser.value,
				ssURL: res.url,
				ssPath: res.snapshot.metadata.fullPath
			}
		}
		else
			console.log('Error uploading ss')
	}).catch(err => {
		console.log(err)
	})
}

const subText = ref('Register')
const regUser = async() => {
	const ele = event.target.closest('form')
	subText.value = 'Registering...'
	if(state.value == 'pay') {
		await getCollection('users', ['email', '==', email.value])
		.getDocuments().then(async(snapshot) => {
			if(!snapshot) return
			newUser.value = snapshot[0] 
			const id = snapshot[0].id
			delete newUser.value.id
			await uploadSS()

			await(await useDocument('users', id))
			.updateDocs(newUser.value).then(() => {
				subText.value = 'Registered'
				setTimeout(() => {
					ele.querySelector(`#${state.value}`).classList.remove('show')
					ele.querySelector(`#init`).classList.add('show')
					subText.value = 'Register'
					state.value = 'init'
					stateHistory.value = []
					email.value = ''
					selected.value = ''
				}, 5000)
			}).catch((err) => {
				console.log(err)
			})
		}).catch((err) => {
			console.log(err)
		})
		return
	}
	newUser.value = {
		name: name.value,
		phone: phone.value,
		dob: dob.value,
		email: email.value,
		password: password.value,
		role: selected.value,
	}
	await uploadPic()
	await uploadAdhaar()

	if(selected.value == 'student') {
		newUser.value = {
			...newUser.value,
			school: school.value,
			class: grade.value,
			course: course.value,
			marks: marks.value,
			paid: false,
		}
	}
	else if(selected.value == 'teacher' || selected.value == 'staff') {
		newUser.value = {
			...newUser.value,
			qualification: qualification.value,
			stream: stream.value,
			university: university.value,
			yearofpass: yearofpass.value,
			experience: experience.value,
			lastorg: lastorg.value,
		}
		if(selected.value == 'teacher') {
			newUser.value = {
				...newUser.value,
				subject: subject.value,
				class: grade.value,
			}
		}
		else {
			newUser.value = {
				...newUser.value,
				position: pos.value,
			}
		}
		await uploadCV()
	}

	await (await addCollection('users'))
	.addDocument('', newUser.value).then(() => {
		subText.value = 'Registered'
		ele.querySelector(`#${state.value}`).classList.remove('show')
		ele.querySelector('#thanks').classList.add('show')	
		setTimeout(() => {
			ele.querySelector('#thanks').classList.remove('show')
			ele.querySelector('#init').classList.add('show')
			subText.value = 'Register'
			state.value = 'init'
			stateHistory.value = []
			name.value = ''
			phone.value = ''
			dob.value = ''
			email.value = ''
			password.value = ''
			selected.value = ''
			adhaar.value = null
			pic.value = null
			school.value = ''
			grade.value = 0
			course.value = 'default'
			marks.value = ''
			qualification.value = ''
			stream.value = ''
			university.value = ''
			yearofpass.value = ''
			experience.value = ''
			lastorg.value = ''
			cv.value = null
			subject.value = 'default'
			pos.value = ''
		}, 5000)
	}).catch((err) => {
		console.log(err)
		subText.value = 'Register'
	})
}
</script>

<style>
.fade:not(.show) {
	display: none;
}
.invalid {
	border: 1px solid red;
}
</style>
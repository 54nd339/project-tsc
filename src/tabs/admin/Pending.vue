<template>
	<b-container fluid id="content">
		<b-button-group class="my-1 d-flex">
			<b-form-select v-model="role" :options="roles" @update:modelValue="loadData" />
			<b-button variant="success" :disabled="selected.length == 0" v-b-modal.approveUser>Approve</b-button>
			<b-button variant="danger" :disabled="selected.length == 0" v-b-modal.deleteUser>Delete</b-button>
		</b-button-group>
		<div style="overflow-x:auto"><table class="table table-hover table-responsive">
			<thead><tr>
				<th scope="col">
					<b-button variant="outline-success" size="sm" @click="selectAll">
						<font-awesome-icon icon="fa-solid fa-check" size="1x" />
					</b-button>
				</th>
				<th scope="col">Name</th>
				<th scope="col">Phone</th>
				<th scope="col" v-if="role == 'default'">Role</th>
				<th scope="col">Email</th>
				<th scope="col">View</th>
                <th scope="col" v-if="role == 'student' || role == 'teacher'">Grade</th>
                <th scope="col" v-if="role == 'student'">Course</th>
                <th scope="col" v-if="role == 'teacher'">Subject</th>
                <th scope="col" v-if="role == 'staff'">Qualification</th>
                <th scope="col" v-if="role == 'staff'">Position</th>
			</tr></thead>
			<tbody ref="rows" id="rows">
				<tr v-for="user in users" :key="user">
					<td><b-form-checkbox :value="user.id" @click="updateSelected" /></td>
					<td>{{ user.name }}</td>
					<td>{{ user.phone }}</td>
					<td v-if="role == 'default'">{{ user.role }}</td>
					<td>{{ user.email }}</td>
					<td><b-button variant="primary" v-b-modal.viewUser @click="target=user">View</b-button></td>
                    <td v-if="role == 'student' || role == 'teacher'">{{ user.class }}</td>
                    <td v-if="role == 'student'">{{ user.course }}</td>
                    <td v-if="role == 'teacher'">{{ user.subject }}</td>
                    <td v-if="role == 'staff'">{{ user.qualification }}</td>
                    <td v-if="role == 'staff'">{{ user.position }}</td>
				</tr>
			</tbody>
		</table></div>
	</b-container>
    <b-modal id="viewUser" title="User Details" aria-labelledby="viewUser" aria-hidden="true" :hide-footer="true">
        <div class="text-center" style="overflow-x:auto" v-if="target">
            <table class="table table-hover table-responsive">
                <thead><tr>
                    <th scope="col">Field</th>
                    <th scope="col">Value</th>
                </tr></thead>
                <tbody ref="rows" id="rows">
                    <tr><td>Name</td><td>{{ target.name }}</td></tr>
                    <tr><td>Phone</td><td>{{ target.phone }}</td></tr>
                    <tr><td>DOB</td><td>{{ target.dob }}</td></tr>
                    <tr><td>E-Mail</td><td>{{ target.email }}</td></tr>
                    <tr><td>Role</td><td>{{ target.role }}</td></tr>
                    <tr v-if="target.role == 'student'"><td>School</td><td>{{ target.school }}</td></tr>
                    <tr v-else><td>Qualification</td><td>{{ target.qualification }}</td></tr>
                    <tr v-if="target.role == 'student' || target.role == 'teacher'">
                        <td>Grade</td><td>{{ target.class }}</td>
                    </tr>
                    <tr v-else><td>Stream</td><td>{{ target.stream }}</td></tr>
                    <tr v-if="target.role == 'teacher'"><td>Subject</td><td>{{ target.subject }}</td></tr>
                    <tr v-else-if="target.role == 'staff'"><td>Position</td><td>{{ target.pos }}</td></tr>
                    <tr v-if="target.role == 'student'"><td>Course</td><td>{{ target.course }}</td></tr>
                    <tr v-else><td>Experience</td><td>{{ target.experience }}</td></tr>
                    <tr v-if="target.role == 'student'"><td>Marks</td><td>{{ target.marks }}</td></tr>
                    <tr v-else><td>University</td><td>{{ target.university }}</td></tr>
                    <tr v-if="target.role != 'student'"><td>Year of Pass</td><td>{{ target.yearofpass }}</td></tr>
                    <tr><td>Adhaar</td><td><b-button @click="openUrl(target.adhaarURL)">View</b-button></td></tr>
                    <tr><td>Photo</td><td><b-button @click="openUrl(target.picURL)">View</b-button></td></tr>
                    <tr v-if="target.role != 'student'">
                        <td>Resume</td><td><b-button @click="openUrl(target.cvURL)">View</b-button></td>
                    </tr>
                    <tr v-else>
                        <td>Payment Status</td>
                        <td v-if="target.paid"><b-button @click="openUrl(target.ssURL)">View</b-button></td>
                        <td v-else>Not Paid</td>
                    </tr>
                </tbody>
            </table>
            <b-button-group>
                <b-button variant="success" @click="handleApprove" :disabled="approveText == 'Approved'">{{ approveText }}</b-button>
                <b-button variant="danger" @click="handleReject" :disabled="rejectText == 'Rejected'">{{ rejectText }}</b-button>
            </b-button-group>
        </div>
    </b-modal>
    <b-modal id="approveUser" title="Approve User" aria-labelledby="approveUser" aria-hidden="true" :hide-footer="true">
        <b-form @submit="approveAll">
			<p class="justify-content-center align-items-center" id="deleteText">Confirm Approval!</p>
			<b-button type="submit" variant="success d-flex mx-auto mt-2" size="lg"
                :disabled="approveText == 'Approved'">{{ approveText }}</b-button>
		</b-form>
    </b-modal>
    <b-modal id="deleteUser" title="Delete User" aria-labelledby="deleteUser" aria-hidden="true" :hide-footer="true">
        <b-form @submit="rejectAll">
			<p class="justify-content-center align-items-center" id="deleteText">Confirm Delete?</p>
			<b-button type="submit" variant="danger d-flex mx-auto mt-2" size="lg"
                :disabled="rejectText == 'Rejected'">{{ rejectText }}</b-button>
		</b-form>
    </b-modal>
</template>

<script setup>
import addCollection from '@/db/addDocument'
import getCollection from '@/db/getCollection'
import useDocument from '@/db/useDocument'
import useAuth from '@/db/useAuth'
import useStorage from '@/db/useStorage'
import { ref } from 'vue'

const roles = [
	{ value: 'default', text: 'Select Role' },
    { value: 'student', text: 'Student' },
    { value: 'teacher', text: 'Teacher' },
    { value: 'staff', text: 'Staff' },
]
const role = ref('default')
const target = ref(null)
const approveText = ref('Approve')
const rejectText = ref('Reject')
const openUrl = (url) => {
    window.open(url)
}
const selected = ref([])
const updateSelected = () => {
	const checked = event.target.closest('table')
					.querySelectorAll('input[type=checkbox]:checked')
	let ids = []
	checked.forEach((check) => {
		ids.push(check.value)
	})
	selected.value = ids
}
const selectAll = () => {
	const checkboxes = event.target.closest('table')
						.querySelectorAll('input[type=checkbox]')
	checkboxes.forEach((checkbox) => {
		checkbox.checked = true
	})
	updateSelected()
}
const res = ref([])
const users = ref([])
const loadData = () => {
    users.value = role.value == 'default' ? res.value
        : res.value.filter(user => user.role == role.value)
}

const freeStorage = async(user) => {
    await useStorage().deleteFile(user.adhaarPath)
    .then(() => {
        // console.log('Adhaar Deleted')
    }).catch((err) => {
        console.log(err)
    })
    await useStorage().deleteFile(user.picPath)
    .then(() => {
        // console.log('Pic Deleted')
    }).catch((err) => {
        console.log(err)
    })
    if(user.role != 'student')
        await useStorage().deleteFile(user.cvPath)
        .then(() => {
            // console.log('CV Deleted')
        }).catch((err) => {
            console.log(err)
        })
    else if(user.paid)
        await useStorage().deleteFile(user.ssPath)
        .then(() => {
            // console.log('SS Deleted')
        }).catch((err) => {
            console.log(err)
        })
}
const updateRes = async(user, mode) => {
    (await useDocument('users', user.id))
    .delDoc().then(async() => {
        res.value = res.value.filter(u => u.id != user.id)
        if(mode == 'reject') {
            await freeStorage(user)
        }
        loadData()
    }).catch((err) => {
        console.log(err)
    })
}
const approveUser = async(user) => {
    const role = user.role
    const colId = role == 'staff' ? 'admins' : role + 's'
    await useAuth().signup(user.email, user.password, user.name)
    .then(async(res) => {
        if(res) {
            (await addCollection(colId))
			.addDocument(res.uid, {
                name: user.name,
                phone: user.phone,
                email: user.email,
                dob: user.dob,
            }).then(async() => {
                if(colId == 'students') {
					(await useDocument('students', res.uid))
					.updateDocs({
						attendance: 0,
						class: user.class,
						course: user.course,
						feedback: 'default',
						subjects: {}
					}).then(async() => {
                        // await updateRes()
					}).catch((err) => {
						console.log(err)
					})
				}
				if(colId == 'teachers') {
					(await useDocument('teachers', res.uid))
					.updateDocs({
						attendance: 0,
						classes: {},
						rating: {
							count: 0,
							val: 0,
							vals: [0, 0, 0, 0, 0, 0, 0, 0, 0]
						},
						todo: []
					}).then(async() => {
                        // await updateRes()
					}).catch((err) => {
						console.log(err)
					})
				}
                await updateRes(user, 'approve')
            })
        }
    })
}
const handleApprove = async() => {
    const btn = event.target.closest('.modal-content')
				.querySelector('.btn-close')
    approveText.value = 'Approved'
    await approveUser(target.value)
    .then(() => {
        setTimeout(() => {
            btn.click()
            approveText.value = 'Approve'
        }, 1000)
    }).catch((err) => {
        console.log(err)
    })
}
const handleReject = async() => {
    const btn = event.target.closest('.modal-content')
                .querySelector('.btn-close')
    rejectText.value = 'Rejected'
    await updateRes(target.value, 'reject')
    .then(() => {
        setTimeout(() => {
            btn.click()
            rejectText.value = 'Reject'
        }, 1000)
    }).catch((err) => {
        console.log(err)
    })
}
const approveAll = async() => {
    const btn = event.target.closest('.modal-content')
                .querySelector('.btn-close')
    approveText.value = 'Approved';
    (async() => {
        selected.value.forEach(async(user) => {
            res.value.forEach(async(u) => {
                if(u.id == user) {
                    await approveUser(u)
                }
            })
        })
    })().then(() => {
        setTimeout(() => {
            btn.click()
            approveText.value = 'Approve'
        }, 1000)
    }).catch((err) => {
        console.log(err)
    })
}
const rejectAll = async() => {
    const btn = event.target.closest('.modal-content')
                .querySelector('.btn-close')
    rejectText.value = 'Rejected';
    (async() => {
        selected.value.forEach(async(user) => {
            res.value.forEach(async(u) => {
                if(u.id == user) {
                    await updateRes(u, 'reject')
                }
            })
        })
    })().then(() => {
        setTimeout(() => {
            btn.click()
            rejectText.value = 'Reject'
        }, 1000)
    }).catch((err) => {
        console.log(err)
    })
}

await(getCollection('users'))
.getDocuments().then((docs) => {
    res.value = docs
    loadData()
}).catch((err) => {
    console.log(err)
})
</script>

<style>

</style>
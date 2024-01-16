const functions = require("firebase-functions")
// const { Configuration, OpenAIApi } = require('openai')

const cors = require('cors')
const corsHandler = cors({ origin: true })

// const config = new Configuration({
// 	apiKey: process.env.OPENAI_KEY,
// })
// const openai = new OpenAIApi(config)

// exports.generate = functions.https.onRequest(async (req, res) => {
// 	corsHandler(req, res, async () => {
// 		const completion = await openai.createCompletion({
// 			model: 'text-davinci-003',
// 			prompt: req.body.prompt,
// 			temperature: 0.5,
// 			max_tokens: req.body.limit,
// 			top_p: 0.3,
// 			frequency_penalty: 0.5,
// 			presence_penalty: 0,
// 		})
// 		res.status(200).json({ result: completion.data.choices[0].text })
// 	})
// })
import { client } from "@gradio/client";

const app = await client("https://chansung-llama2-with-gradio-chat.hf.space/");
exports.generate = functions.https.onRequest(async (req, res) => {
	corsHandler(req, res, async () => {
		const completion = await app.predict(1, [req.body.prompt])
		res.status(200).json({ result: completion })
	})
});

const admin = require('firebase-admin')
// const serviceAccount = require('admin-creds.json')
// admin.initializeApp({
// 	credential: admin.credential.cert(serviceAccount),
// 	databaseURL: "https://tsc-web-361112-default-rtdb.asia-southeast1.firebasedatabase.app/",
// })
admin.initializeApp()

const delUser = (uid, data) => {
	admin.auth().deleteUser(uid).then(() => {
		console.log(`Successfully deleted user with data: ${data}`)
	}).catch((error) => {
		console.log(`Error deleting user with ID: ${uid}`, error)
	})
}

exports.removeAdmin = functions.firestore.document("/admins/{uid}")
    .onDelete((snapshot, context) => {
		return delUser(context.params.uid, snapshot.data())
    })
exports.removeStudent = functions.firestore.document("/students/{uid}")
	.onDelete((snapshot, context) => {
		return delUser(context.params.uid, snapshot.data())
	})
exports.removeTeacher = functions.firestore.document("/teachers/{uid}")
	.onDelete((snapshot, context) => {
		return delUser(context.params.uid, snapshot.data())
	})

const modUser = (uid, change) => {
	const oldMail = change.before.get('email')
	const newMail = change.after.get('email')

	if (oldMail !== newMail) {
		admin.auth().updateUser(uid, {
			email: newMail,
		}).then(() => {
			console.log(`Changed email from ${oldMail} to ${newMail} for user with ID: ${uid}`)
		}).catch((error) => {
			console.log(`Error updating user with ID: ${uid}`, error)
		})
	}

	const oldName = change.before.get('name')
	const newName = change.after.get('name')

	if (oldName !== newName) {
		admin.auth().updateUser(uid, {
			displayName: newName,
		}).then(() => {
			console.log(`Changed name from ${oldName} to ${newName} for user with ID: ${uid}`)
		}).catch((error) => {
			console.log(`Error updating user with ID: ${uid}`, error)
		})
	}
}

exports.listenAdmin = functions.firestore.document('/admins/{uid}')
	.onUpdate((change, context) => {
		modUser(context.params.uid, change)
	})
exports.listenStudent = functions.firestore.document('/students/{uid}')
	.onUpdate((change, context) => {
		modUser(context.params.uid, change)
	})
exports.listenTeacher = functions.firestore.document('/teachers/{uid}')
	.onUpdate((change, context) => {
		modUser(context.params.uid, change)
	})
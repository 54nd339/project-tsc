const functions = require("firebase-functions")

const cors = require('cors')
const corsHandler = cors({ origin: true })

exports.generate = functions.https.onRequest(async (req, res) => {
	corsHandler(req, res, async () => {
		const dynamic = new Function('modulePath', 'return import(modulePath)');
		const { client } = await dynamic('@gradio/client');
		const app = await client("https://huggingface-projects-llama-2-7b-chat.hf.space/--replicas/djqud/");
		
		const result = await app.predict("/chat", [
			req.body.userprompt,
			req.body.sysprompt,
			50,		// Max tokens (between 1 and 2048)
			1,		// Temperature (between 0.1 and 4.0)
			0.05,	// Top-p (nucleus sampling) (between 0.05 and 1.0))
			1,		// Top-k (between 1 and 1000)
			1,		// Repetition penalty (between 1.0 and 2.0)
		]);

		res.status(200).json({ result: result.data });
	})
});

const admin = require('firebase-admin')
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
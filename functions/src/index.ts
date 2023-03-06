import * as functions from "firebase-functions";
import * as admin from 'firebase-admin'

admin.initializeApp()
const db = admin.firestore()

export const createStudentDocument = functions.auth
    .user()
    .onCreate(async (user) => {
        db.collection('students')
            .doc(user.uid)
            .set(JSON.parse(JSON.stringify(user)))
})


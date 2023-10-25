import { db, doc, getDoc, collection, setDoc } from '$lib/firebaseConfig.ts'

async function getFirebaseData() {
    const docRef = doc(db, "main-db", 'superAdmins')
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        return undefined
    }
}
export const data = await getFirebaseData()
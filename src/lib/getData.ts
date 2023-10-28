import { db, doc, getDoc, setDoc } from '$lib/firebaseConfig.ts'
import { adminID } from './stores'


async function getCollectionsData() {
    const docRef = doc(db, "main-db", 'superAdmins')
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        return undefined
    }
}
export const data = await getCollectionsData()

// async function getParagraphsData() {
//     const docRef = doc(db, "main-db", adminID)
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//         return docSnap.data()['paragraphs']
//     } else {
//         return undefined
//     }
// }
// export const paragraphsData = await getParagraphsData()

// async function getQuestionsData() {
//     const docRef = doc(db, "main-db", `${adminID}`, 'questionsLibrary', 'qDU6R1HQZjGeTe4D8c4r')
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//         return docSnap.data()
//     } else {
//         return undefined
//     }
// }
// export const questionsData = await getQuestionsData()
// console.log(questionsData)
import { db, doc, getDoc } from '$lib/firebaseConfig.ts'
import { adminID } from '$lib/stores'

export const getCollectionsData = async () => {
    const docRef = doc(db, "main-db", 'superAdmins')
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        throw new Error('Couldn\'t connect to DataBase')
    }
}

export const getParagraphsData = async () => {
    const docRef = doc(db, "main-db", adminID)
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        throw new Error('Couldn\'t connect to DataBase')
    }
}

export const getQuestionsData = async () => {
    const docRef = doc(db, "main-db", `${adminID}`, 'questionsLibrary', 'qDU6R1HQZjGeTe4D8c4r')
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        throw new Error('Couldn\'t connect to DataBase')
    }
}

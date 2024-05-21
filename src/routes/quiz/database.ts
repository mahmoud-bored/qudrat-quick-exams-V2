import { mergeArraysUnique } from '$lib/app';
import type { RedisDB, DbData, CategoriesContainer, ParagraphsContainer, QuestionsContainer, Question } from '$lib/databaseInterfaces';
import { categoriesObject, type Collection, type CollectionsContainer, globalCollections, globalCollectionsOrder, paragraphsObject, questionsObject } from '$lib/stores';








// ->|Check Versions (✔)
// ---=>|Good: Using IndexedDB (✔)
// -------=>| Okay: Load the Data into the app (✔)
// ---------| Error: Abort and Use Supabase Full Load (✔)
// ---=>|Update: Using Supabase (✔)
// -------=>| Get New Data from Supabase (✔)
// -------=>| Get Old Data from IndexedDB (✔)
// --------------| Error: Use Supabase Full Load (✔)
// ------------=>| Okay: Merge New and Old Data then Delete refrenced records in the delete_record if any (✔)
// -----------------=>| Load the Data into the app
// -----------------=>| Update IndexedDB Data and Delete refrenced records in the delete_record if any (✔)
// ---------------------=>| Okay: Update Versions (✔)
// -----------------------| Error: Save Error and continue the app (✔) 
function getRecordID(obj: any) {
    const ID = obj.question_tag_id ||
        obj.question_exam_id || 
        obj.answer_id || 
        obj.question_id || 
        obj.tag_id || 
        obj.paragraph_id || 
        obj.category_id || 
        obj.exam_id ||
        obj.collection_id || 
        obj.course_id ||
        obj.id
    return ID
}
function assignIDsToRecords(obj: { [key: string]: object[] }) {
    const newObj = {} as DbData
    for(const [table_name, table] of Object.entries(obj)) {
        newObj[table_name] = {}
        for(const record of table) {
            const recordID = getRecordID(record) 
            newObj[table_name][recordID] = record
        }
    }
    return newObj
}
function buildDatabase(db: IDBDatabase) {
    // Creating Tables to store data from Supabase
    if(!db.objectStoreNames.contains('version')) {
            const objectStore = db.createObjectStore('version', { autoIncrement: true })
            objectStore.createIndex('course_id, table_name', ['course_id', 'table_name'], { unique: true })
        }
        if(!db.objectStoreNames.contains('tag')) {
            const objectStore = db.createObjectStore('tag', { keyPath: 'tag_id'})
            objectStore.createIndex('tag_id', 'tag_id', { unique: true })
        }
        if(!db.objectStoreNames.contains('question_tag')) {
            const objectStore = db.createObjectStore('question_tag', { keyPath: 'question_tag_id' })
            objectStore.createIndex('question_tag_id', 'question_tag_id', { unique: true })
        }
        if(!db.objectStoreNames.contains('question_exam')) {
            const objectStore = db.createObjectStore('question_exam', { keyPath: 'question_exam_id' })
            objectStore.createIndex('question_exam_id', 'question_exam_id', { unique: true })
        }
        if(!db.objectStoreNames.contains('question')) {
            const objectStore = db.createObjectStore('question', { keyPath: 'question_id'})
            objectStore.createIndex('question_id', 'question_id', { unique: true })
        }
        if(!db.objectStoreNames.contains('paragraph')) {
            const objectStore = db.createObjectStore('paragraph', { keyPath: 'paragraph_id'})
            objectStore.createIndex('paragraph_id', 'paragraph_id', { unique: true })
        }
        if(!db.objectStoreNames.contains('exam')) {
            const objectStore = db.createObjectStore('exam', { keyPath: 'exam_id'})
            objectStore.createIndex('exam_id', 'exam_id', { unique: true })
        }
        if(!db.objectStoreNames.contains('collection')) {
            const objectStore = db.createObjectStore('collection', { keyPath: 'collection_id'})
            objectStore.createIndex('collection_id', 'collection_id', { unique: true })
        }
        if(!db.objectStoreNames.contains('category')) {
            const objectStore = db.createObjectStore('category', { keyPath: 'category_id'})
            objectStore.createIndex('category_id', 'category_id', { unique: true })
        }
        if(!db.objectStoreNames.contains('answer')) {
            const objectStore = db.createObjectStore('answer', { keyPath: 'answer_id'})
            objectStore.createIndex('answer_id', 'answer_id', { unique: true })
        }
        if(!db.objectStoreNames.contains('course')) {
            const objectStore = db.createObjectStore('course', { keyPath: 'course_id'})
            objectStore.createIndex('course_id', 'course_id', { unique: true })
        }
}


type IndexedDbData = {
    data: DbData;
}
async function loadFromIndexedDb(db: IDBDatabase, table_list: string[]): Promise<IndexedDbData> {
    type TablePromise = { data: object[]; table_name: string; }

    // Returns the stored old data from IndexedDB
    const transaction = db.transaction(table_list, 'readonly')
    const requests: Promise<TablePromise>[] = []
    for(const table_name of table_list) {
        const objectStore = transaction.objectStore(table_name)
        const requestPromise = new Promise<TablePromise>((resolve, reject) => {
            const request = objectStore.getAll()
            request.onerror = reject
            request.onsuccess = () => resolve({ data: request.result, table_name })
        })
        requests.push(requestPromise)
    }
    return new Promise(async (resolve, reject) => {
        await Promise.all(requests)
            .then((results) => {
                const dataObject: IndexedDbData = { data: {} as DbData }
                for(const result of results) {
                    dataObject.data[result.table_name] = result.data
                }
                resolve(dataObject)
            })
            .catch((err) => reject(err?.message))
    })
}
async function fetchFromSupabase(data: object, fullLoad: boolean = false) {
    return new Promise((resolve, reject) => {
        fetch('/quiz/api', {
            method: 'POST',
            body: JSON.stringify({ fullLoad, data }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((result) => resolve(result.json()))
        .catch((err) => reject(err?.message))
    })
}
async function getNewDataFromSupabase(updateList: object[]) {
    const supabaseRequests = []
    for(const updateObj of updateList) {
        supabaseRequests.push(fetchFromSupabase(updateObj))
    }
    return await Promise.all(supabaseRequests).then((result: any[]) => {
        let tempObj: {[key: keyof DbData]: object[] } = {}
        for(const obj of result) {
            tempObj[obj.table_name] = obj.data
        }
        return tempObj
    })
}
type UpdateLists = {
    new: { [key: string]: object[] };
    update: { [key: string]: object[] };
    delete: DeletedRecord;
}
function mergeDataAndGetIndexedDbUpdateLists(oldData: DbData, newData: DbData) {
    const updateLists: UpdateLists = {
        new: {},
        update: {},
        delete: {}
    }
    const mergedData: DbData = { ...oldData }
    for(const [table_name, table] of Object.entries(newData)) {
        for(const recordID in table) {
            if(oldData[table_name][recordID]) {
                // Update
                if(!updateLists.update[table_name]) updateLists.update[table_name] = []
                updateLists.update[table_name].push(table[recordID])
            } else {
                // New
                if(!updateLists.new[table_name]) updateLists.new[table_name] = []
                updateLists.new[table_name].push(table[recordID])
            }
            mergedData[table_name][recordID] = table[recordID]
        }
    }
    return { updateLists, mergedData }
}
async function updateIndexedDb(db: IDBDatabase, updateList: UpdateLists, redisDB: RedisDB, course_id: number) {
    const requiredTables = mergeArraysUnique(Object.keys(updateList.new), Object.keys(updateList.update), Object.keys(updateList.delete))
    const transaction = db.transaction(requiredTables, 'readwrite')
    let updateStatusOkay = true
    const requests = []
    if(updateList.new) {
        for(const table_name in updateList.new) {
            const objectStore = transaction.objectStore(table_name)
            for(const obj of updateList.new[table_name]) {
                const requestPromise = new Promise((resolve, reject) => {
                    const request = objectStore.add(obj)
                    request.onerror = () => {
                        console.log('Error: ', request.result)
                        updateStatusOkay = false
                        reject()
                    }
                    request.onsuccess = () => resolve(true)
                })
                requests.push(requestPromise)
            }
        }
    }
    if(updateList.update) {
        for(const table_name in updateList.update) {
            const objectStore = transaction.objectStore(table_name)
            for(const obj of updateList.update[table_name]) {
                const requestPromise = new Promise((resolve, reject) => {
                    const request = objectStore.put(obj)
                    request.onerror = () => {
                        console.log('Error: ', request.result)
                        updateStatusOkay = false
                        reject()
                    }
                    request.onsuccess = () => resolve(true)
                })
                requests.push(requestPromise)
            }
        }
    }
    if(updateList.delete) {
        const deleted_record = updateList.delete
        for(const table_name in deleted_record) {
            const objectStore = transaction.objectStore(table_name)
            for(const record_id in deleted_record[table_name]) {
                const requestPromise = new Promise((resolve, reject) => {
                    const request = objectStore.delete(deleted_record[table_name][record_id].deleted_record_id)
                    request.onerror = () => {
                        console.log('Error: ', request.result)
                        updateStatusOkay = false
                        reject()
                    }
                    request.onsuccess = () => resolve(true)
                })
                requests.push(requestPromise)
            }
        }
    }
    await Promise.all(requests).then(() => {
        if(updateStatusOkay) {
            // Update IndexedDB Versions
            const objectStore = db.transaction('version', 'readwrite').objectStore('version')

            for(const [table_name, table] of Object.entries(redisDB)) {
                const version = table.version
                const timestamp = table.timestamp

                const request = objectStore.put({ course_id, table_name, table_version: version, timestamp }, [course_id, table_name])
                request.onerror = () => console.log('Error: ', request.error)
                request.onsuccess = () => console.log('Success: ', request.result)
            }
        }
        db.close()
    })
}
type DeletedRecord = {
    [table_name: string]: {
        [id: number]: {
            id: number;
            table_name: string;
            timestamp: string;
            course_id: number;
            id_column_name: string;
            deleted_record_id: number;
        }
    }
}
function processDeletedRecordData(data: DbData) {
    const tempObj: DeletedRecord = {}
    const deleted_record = data.deleted_record
    if(deleted_record) {
        for(const [id, record] of Object.entries(deleted_record as DeletedRecord['table_name'])) {
            const recordID = parseInt(id)
            const table_name = record.table_name
            if(!tempObj[table_name]) tempObj[table_name] = {}
            tempObj[table_name][recordID] = record
        }
        delete data.deleted_record
        return { data, deleted_record: tempObj }
        
    } else {
        return { data }
    }
    
}
function cleanMergedData(data: DbData, deleted_record: DeletedRecord): DbData {
    for(const table_name in deleted_record) {
        for(const id in deleted_record[table_name]) {
            const deleted_record_id = deleted_record[table_name][id].deleted_record_id
            delete data[table_name][deleted_record_id]
        }
    }
    return data 
}
async function updateIndexedDbUsingSupabase(db: IDBDatabase, tableUpdateList: object[], redisDB: RedisDB, fullTableList: string[], course_id: number): Promise<DbData> {
    return new Promise((resolve, reject) => {
        Promise.all([ getNewDataFromSupabase(tableUpdateList), loadFromIndexedDb(db, fullTableList)])
            .then((results) => {
                const newDataFromSupabase = results[0]
                const oldDataFromIndexedDb = results[1]
                const newDataFromSupabaseProcessed = assignIDsToRecords(newDataFromSupabase)
                const { data: dbData, deleted_record } = processDeletedRecordData(newDataFromSupabaseProcessed)
                const oldDataFromIndexedDbProcessed = assignIDsToRecords(oldDataFromIndexedDb.data)
        
                let { updateLists, mergedData } = mergeDataAndGetIndexedDbUpdateLists(oldDataFromIndexedDbProcessed, dbData)
                if(deleted_record) {
                    mergedData = cleanMergedData(mergedData, deleted_record)
                    updateLists.delete = deleted_record
                }
                console.log("Update Lists: ", updateLists)
                // Inject Merged Data into IndexedDb
                console.log("Merged Data: ", mergedData)
                updateIndexedDb(db, updateLists, redisDB, course_id)
                resolve(mergedData)
            }).catch(err => reject(err?.message))
    })
}
async function fullLoadFromSupabase(table_list: string[], course_id: number): Promise<DbData> {
    const requests: Promise<unknown>[] = []
    const returnObj = {} as DbData
    for(const table_name of table_list) {
        requests.push(fetchFromSupabase({ table_name, course_id }, true))
    }
    return new Promise(async (resolve, reject) => {
        await Promise.all(requests)
            .then((results: any[]) => {
                for(const result of results) {
                    returnObj[result.table_name] = result.data
                }
                resolve(assignIDsToRecords(returnObj))
            })
            .catch((err) => reject(err?.message))
        
    }) 
}
type VersionUpdateList = {
    isUpdateRequired: boolean;
    fullLoad: boolean;
    updateList: {
        table_name: string;
        timestamp: string;
        course_id: number;
    }[];
}
type VersionsInfo = {
    table_name: string; 
    timestamp: string; 
    course_id: number, 
    table_version: number
}[];
type ProcessedVersionsInfo = {
    [table_name: string]: {
        timestamp: string;
        course_id: number;
        table_version: number;
    };
}
function checkVersions(db: IDBDatabase, redisDB: RedisDB, course_id: number): Promise<VersionUpdateList> {
    // Returns a list of Tables that need an update
    const returnObj: VersionUpdateList = { 
        isUpdateRequired: false, 
        fullLoad: false,
        updateList: [] 
    }
    return new Promise<VersionUpdateList>((resolve) => {
        const objectStore = db.transaction('version', 'readonly').objectStore('version')
        const request = objectStore.getAll()
        function getAllVersions() {
            returnObj.isUpdateRequired = true
            for(const table_name in redisDB) {
                returnObj.updateList.push({ table_name, timestamp: '2020-05-06 15:05:00.063400+00', course_id })
            }
            return returnObj
        }

        request.onerror = () => {
            returnObj.fullLoad = true
            resolve(returnObj)
        }
        request.onsuccess = () => {
            const result: VersionsInfo = request.result
            if(result && result.length !== 0) {
                const processedVersionsInfo: ProcessedVersionsInfo = {}
                for(const table_info of result) {
                    processedVersionsInfo[table_info.table_name] = {
                        timestamp: table_info.timestamp,
                        course_id: table_info.course_id,
                        table_version: table_info.table_version
                    }
                }
                for(const table_name in redisDB) {
                    if(!processedVersionsInfo[table_name]) {
                        returnObj.isUpdateRequired = true
                        returnObj.updateList.push({ table_name, timestamp: '2020-05-06 15:05:00.063400+00', course_id })
                    } else {
                        if(!(processedVersionsInfo[table_name].table_version === redisDB[table_name].version)) {
                            const oldTimestamp = processedVersionsInfo[table_name].timestamp
                            const versionCourse_id = processedVersionsInfo[table_name].course_id

                            console.log('Please Update ', table_name)
                            returnObj.isUpdateRequired = true
                            returnObj.updateList.push({ table_name, timestamp: oldTimestamp, course_id: versionCourse_id })
                        } else {
                            console.log('Good')
                        }
                    }
                }
                resolve(returnObj)
            } else {
                resolve(getAllVersions())
            }
        }
        
    })
}
export async function loadDatabase(redisDB: RedisDB, course_id: number): Promise<DbData> {
    const table_list = Object.keys(redisDB).filter(e => e !== 'deleted_record')
    const IDBrequest = window.indexedDB.open('mainDB', 1)
    const db = () => IDBrequest.result
    
    const closeDb = (data: DbData) => {
        IDBrequest.result.close()
        return data
    }
    return new Promise((resolve, reject) => {
        IDBrequest.onerror = async () => {
            console.log('Error')
            await fullLoadFromSupabase(table_list, course_id)
                .then((result: DbData) => resolve(closeDb(result)))
                .catch((err: Error) => reject(err))
        }
        IDBrequest.onupgradeneeded = () => buildDatabase(db())
        IDBrequest.onsuccess = async () => {
            const checkVersionsData = await checkVersions(db(), redisDB, course_id)
            if(checkVersionsData.fullLoad) {
                await fullLoadFromSupabase(table_list, course_id)
                    .then((result: DbData) => resolve(closeDb(result)))
                    .catch((err: Error) => reject(err))
            } else if(checkVersionsData.isUpdateRequired) {
                // Updaing IndexedDB Using Supabase
                await updateIndexedDbUsingSupabase(db(), checkVersionsData.updateList, redisDB, table_list, course_id)
                // Not using closeDb because it still writing the new Versions to it.
                    .then((result: DbData) => resolve(result))
                    .catch(async () => {
                        await fullLoadFromSupabase(table_list, course_id)
                            .then((result) => resolve(result))
                            .catch((err: Error) => reject(err))
                    })
            } else {
                // Using IndexedDB
                console.log('Using IndexedDB');
                await loadFromIndexedDb(db(), table_list)
                    .then((result: IndexedDbData) => {
                        const data = assignIDsToRecords(result.data)
                        resolve(closeDb(data))
                    })
                    .catch(async () => {
                        await fullLoadFromSupabase(table_list, course_id)
                            .then((result: DbData) => resolve(closeDb(result)))
                            .catch((err: Error) => reject(err))
                    })

            }
        }
        
    })
}


export function loadInitialDbDataIntoStores(data: DbData) {
    const collectionQuestionsCount: CollectionsCounter = {}
    
    const collectionsOrder = getCollectionsOrder()
    const collectionsData = getCollectionsData()
    globalCollectionsOrder.set(collectionsOrder)
    globalCollections.set(collectionsData)
    
    return { collectionsData, collectionsOrder }
    
    type CollectionsCounter = {
        [key: number]: { exams: number; questions: number}
    }
    function getCollectionsData() {
        const examTable = data.exam
        const collectionsTable = data.collection
        const resultCollections: CollectionsContainer = {}
        const examsObj = {} as { [key: number]: Collection['exams']}
        const examsOrder: { [key: number]: number[] } = {}
        for(const [id, examRecord] of Object.entries(examTable)) {
            const examID = parseInt(id)
            const collectionID = examRecord.collection_id
            // Get Collection's exam-question Count
            const examsCount = collectionQuestionsCount[collectionID]?.exams || 0
            const currentQuestionsCount = collectionQuestionsCount[collectionID]?.questions || 0
            collectionQuestionsCount[collectionID] = {
                exams: examsCount + 1,
                questions: currentQuestionsCount + examTable[examID].number_of_questions
            }
            // Get Collection's exams Info
            if(!examsObj[collectionID]) examsObj[collectionID] = {}
            examsObj[collectionID][examID] = {
                name: examRecord.exam_name,
                numberOfQuestions: examTable[examID].number_of_questions
            }
            // Get Collection's exams Order
            const examOrder = examRecord.exam_order
            if(!examsOrder[collectionID]) examsOrder[collectionID] = []
            examsOrder[collectionID][examOrder] = examID
        }
        for(const collectionID in collectionsTable) {
            resultCollections[collectionID] = {
                info: {
                    numberOfQuestions: collectionQuestionsCount[collectionID]?.questions || 0,
                    numberOfExams: collectionQuestionsCount[collectionID]?.exams || 0,
                    collectionName: collectionsTable[collectionID].collection_name,
                },
                examsOrder: examsOrder[collectionID] || [],
                exams: examsObj[collectionID] || {}
            }
            
        }
        return resultCollections
    }
    function getCollectionsOrder() {
        const resultCollectionsOrder: number[] = []
        const collectionsTable = data.collection
        for(const [collectionID, collectionRecord] of Object.entries(collectionsTable)) {
            const collectionOrder = collectionRecord.collection_order
            resultCollectionsOrder[collectionOrder] = parseInt(collectionID)
        }
        return resultCollectionsOrder
    }
}
export function loadDbDataIntoStores(data: DbData){
    const examTable = data.exam
    const answersTable = data.answer
    const questionExamTable = data.question_exam
    const resultQuestions: QuestionsContainer = {}
    
    const paragraphsData = getParagraphsData()
    const questionsData = getQuestionsData()
    const categoriesData = getCategoriesData()

    paragraphsObject.set(paragraphsData)
    questionsObject.set(questionsData)
    categoriesObject.set(categoriesData)
    
    function getParagraphsData() {
        const resultParagraphs: ParagraphsContainer = {}
        const paragraphTable = data.paragraph
        for(const paragraphId in paragraphTable) {
            const id = parseInt(paragraphId)
            resultParagraphs[id] = {
                paragraphText: paragraphTable[id].paragraph_text,
                paragraphTitle: paragraphTable[id].paragraph_title
            }
        }
        return resultParagraphs
    }
    function getQuestionsData() {
        const questionsTable = data.question
        for(const [id, answerRecord] of Object.entries(questionsTable)) {
            const questionID = parseInt(id)
            resultQuestions[questionID] = {
                answerExplination: answerRecord.question_answer_explination,
                lastUpdateDate: answerRecord.timestamp,
                questionCategoryID: answerRecord.catigory_id,
                questionHead: answerRecord.question_text,
                questionHint: answerRecord.question_hint || null,
                questionParagraphID: answerRecord.paragraph_id || null,
                questionAnswers: {},
            } as Question
        }
        for(const [answerID, answerRecord] of Object.entries(answersTable)) {
            const questionID = answerRecord.question_id
            // Add correctAnswer
            if(answerRecord.is_correct) resultQuestions[questionID].correctAnswer = answerRecord.answer_text
            // Add questionAnswers
            resultQuestions[questionID].questionAnswers[answerRecord.answer_order] = answerRecord.answer_text
            
        }
        for(const [questionExamId, questionExamRecord] of Object.entries(questionExamTable)) {
            const questionID = questionExamRecord.question_id
            const examID = questionExamRecord.exam_id
            const collectionID = examTable[examID].collection_id
            const questionOrder = questionExamRecord.question_order
            
            if(!resultQuestions[questionID].linkedCollections) resultQuestions[questionID].linkedCollections = {}
            if(!resultQuestions[questionID].linkedCollections[collectionID]) resultQuestions[questionID].linkedCollections[collectionID] = {}
            resultQuestions[questionID].linkedCollections[collectionID][examID] = questionOrder
        }
        return resultQuestions
    }
    function getCategoriesData() {
        const resultCategories: CategoriesContainer = {}
        const categoriesTable = data.category
        for(const [categoryId, categoryRecord] of Object.entries(categoriesTable)) {
            resultCategories[parseInt(categoryId)] = {
                name: categoryRecord.category_name,
                type: categoryRecord.category_type
            }
        }
        return resultCategories
    }


}
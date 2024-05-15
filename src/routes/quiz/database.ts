import type { RedisDB, DbData, CategoriesContainer, ParagraphsContainer, QuestionsContainer, Question } from '$lib/databaseInterfaces';
import { categoriesObject, type Collection, type CollectionsContainer, globalCollections, globalCollectionsOrder, paragraphsObject, questionsObject } from '$lib/stores';




function mergeArraysUnique(...arrays: any[]) {
    function mergeTwoArraysUnique(arr1: any[], arr2: any[]){
        const newArr = arr1.concat(arr2)
        var a = newArr.concat();
        for(var i=0; i<a.length; ++i) {
            for(var j=i+1; j<a.length; ++j) {
                if(a[i] === a[j])
                    a.splice(j--, 1);
            }
        }

        return a;
    }

    let mergedArrays = arrays[0]
    for(let i = 0; i < arrays.length; i++) {
        const nextArr = arrays[i + 1]
        if(mergedArrays && nextArr) {
            mergedArrays = mergeTwoArraysUnique(mergedArrays, nextArr)
        } else {
            return mergedArrays
        }
    }
}



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
    isStatusGood: boolean;
    data: DbData;
}
async function loadFromIndexedDb(db: IDBDatabase, table_list: string[]) {
    // Returns the stored old data from IndexedDB
    const transaction = db.transaction(table_list, 'readonly')
    type TablePromise = {
        isStatusGood: boolean;
        data: object[];
        table_name: string;
    }

    const requests: Promise<TablePromise>[] = []
    for(const table_name of table_list) {
        const objectStore = transaction.objectStore(table_name)
        const requestPromise = new Promise<TablePromise>((resolve) => {
            const request = objectStore.getAll()
            request.onerror = () => resolve({ isStatusGood: false, data: [], table_name })
            request.onsuccess = () => resolve({ isStatusGood: true, data: request.result, table_name })
        })
        requests.push(requestPromise)
    }
    return Promise.all(requests).then((results) => {
        const dataObject: IndexedDbData = { isStatusGood: true, data: {} as DbData }
        for(const result of results) {
            if(result.isStatusGood) {
                dataObject.data[result.table_name] = result.data
            } else {
                dataObject.isStatusGood = false
            }
        }
        return dataObject
    })
}
async function fetchFromSupabase(data: object, fullLoad: boolean = false) {
    return new Promise((resolve) => {
        fetch('/quiz/api', {
            method: 'POST',
            body: JSON.stringify({ fullLoad, data }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((result) => resolve(result.json()) )
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
async function updateIndexedDbUsingSupabase(db: IDBDatabase, tableUpdateList: object[], redisDB: RedisDB, fullTableList: string[], course_id: number) {
    const newDataFromSupabase = await getNewDataFromSupabase(tableUpdateList)
    const oldDataFromIndexedDb = await loadFromIndexedDb(db, fullTableList)
    if(oldDataFromIndexedDb.isStatusGood) {
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
        return mergedData
    } else {
        const data = await fullLoadFromSupabase(fullTableList, course_id)
        return data
    }
}
async function fullLoadFromSupabase(table_list: string[], course_id: number) {
    const requests = []
    const returnObj = {} as DbData
    for(const table_name of table_list) {
        requests.push(fetchFromSupabase({ table_name, course_id }, true))
    }
    return await Promise.all(requests).then((results: any[]) => {

        for(const result of results) {
            returnObj[result.table_name] = result.data
        }
        return assignIDsToRecords(returnObj)
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
            type VersionsInfo = {
                table_name: string; 
                timestamp: string; 
                course_id: number, 
                table_version: number
            }[];
            const result: VersionsInfo = request.result
            if(result && result.length !== 0) {
                // for(const table_info of result) {
                //     const table_name = table_info['table_name']
                //     const table_version = table_info['table_version']
                    
                //     if(redisDB[table_name].version === table_version) {
                //         console.log('Good')
                //     } else {
                //         console.log('Please Update ', table_name)
                //         returnObj.isUpdateRequired = true
                //         returnObj.updateList.push({ table_name, timestamp: table_info['timestamp'], course_id })
                //     }
                // }
                type ProcessedVersionsInfo = {
                    [table_name: string]: {
                        timestamp: string;
                        course_id: number;
                        table_version: number;
                    };
                }
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
    return new Promise((resolve) => {
        IDBrequest.onerror = async () => {
            console.log('Error')
            const data = await fullLoadFromSupabase(table_list, course_id)
            resolve(closeDb(data))
        }
        IDBrequest.onupgradeneeded = () => buildDatabase(db())
        IDBrequest.onsuccess = async () => {
            const checkVersionsData = await checkVersions(db(), redisDB, course_id)
            if(checkVersionsData.fullLoad) {
                const data = await fullLoadFromSupabase(table_list, course_id)
                resolve(closeDb(data))
            } else if(checkVersionsData.isUpdateRequired) {
                // Updaing IndexedDB Using Supabase
                console.log('Updating IndexedDB Using Supabase');
                const data = await updateIndexedDbUsingSupabase(db(), checkVersionsData.updateList, redisDB, table_list, course_id)
                // Not closing the database because it still writing the new Versions to it.
                resolve(data)
            } else {
                // Using IndexedDB
                console.log('Using IndexedDB');

                const loadFromIndexedDbData = await loadFromIndexedDb(db(), table_list)
                if(loadFromIndexedDbData.isStatusGood) {
                    const data = assignIDsToRecords(loadFromIndexedDbData.data)
                    resolve(closeDb(data))
                } else {
                    const data = await fullLoadFromSupabase(table_list, course_id)
                    resolve(closeDb(data))
                }
            }
        }
        
    })
}


export function loadDbDataIntoStores(data: DbData){
    const examTable = data.exam
    const examQuestionsCount: { [key: number]: number } = {}
    const collectionQuestionsCount: CollectionsCounter = {}
    const answersTable = data.answer
    const questionExamTable = data.question_exam
    const resultQuestions: QuestionsContainer = {}
    
    const paragraphsData = getParagraphsData()
    const questionsData = getQuestionsData()
    const categoriesData = getCategoriesData()
    const collectionsData = getCollectionsData()
    const collectionsOrder = getCollectionsOrder()
    paragraphsObject.set(paragraphsData)
    questionsObject.set(questionsData)
    categoriesObject.set(categoriesData)
    globalCollections.set(collectionsData)
    globalCollectionsOrder.set(collectionsOrder)
    
    
    return { collectionsData, collectionsOrder }

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
            let answerPositionFound = false
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
            // Setup question Counter
            if(!examQuestionsCount[examID]) examQuestionsCount[examID] = 0
            examQuestionsCount[examID]++
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
    type CollectionsCounter = {
        [key: number]: { exams: number; questions: number}
    }
    function getCollectionsData() {
        const resultCollections: CollectionsContainer = {}
        const collectionsTable = data.collection
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
                questions: currentQuestionsCount + examQuestionsCount[examID]
            }
            // Get Collection's exams Info
            if(!examsObj[collectionID]) examsObj[collectionID] = {}
            examsObj[collectionID][examID] = {
                name: examRecord.exam_name,
                numberOfQuestions: examQuestionsCount[examID]
            }
            // Get Collection's exams Order
            const examOrder = examRecord.exam_order
            if(!examsOrder[collectionID]) examsOrder[collectionID] = []
            examsOrder[collectionID][examOrder] = examID
        }
        for(const [id, collectionRecord] of Object.entries(collectionsTable)) {
            const collectionID = parseInt(id)
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
        for(const [id, collectionRecord] of Object.entries(collectionsTable)) {
            const collectionID = parseInt(id)
            const collectionOrder = collectionRecord.collection_order
            resultCollectionsOrder[collectionOrder] = collectionID
        }
        return resultCollectionsOrder
    }
}
import { categoriesObject, paragraphsObject, questionsObject } from "$lib/stores"
import type { Category, ParagraphsContainer, Question, QuestionsContainer } from "$lib/databaseInterfaces.ts"
import { question, answers, correctAnswer, currentQuestionID, questionParagraph } from "./quiz-main-stores"

// source: https://stackoverflow.com/questions/45336281/javascript-find-by-value-deep-in-a-nested-object-array
function findNestedValue(obj: any, key: any, value: any, baseKey: any = null) {
    // Base case
    if (obj[key] === value) {
        if(baseKey !== null){
            return [obj, baseKey];
        }else {
            return obj
        }
    } else {
        var keys = Object.keys(obj); // add this line to iterate over the keys
    
        for (var i = 0; i < keys.length; i++) {
            var k = keys[i]; // use this key for iteration, instead of index "i"
            
            // add "obj[k] &&" to ignore null values
            if (obj[k] && typeof obj[k] == 'object') {
                var found: any = findNestedValue(obj[k], key, value, k);
                if (found) {
                    // If the object was found in the recursive call, bubble it up.
                    if(baseKey !== null){
                        return [found, baseKey];
                    }else {
                        return found
                    }
                }
            }
        }
    }
}



let mainParagraphsObject: ParagraphsContainer = {}
let mainQuestionsObject: QuestionsContainer = {}
let mainCategoriesObject: Category = {}
paragraphsObject.subscribe((data) => { if(data){ mainParagraphsObject = JSON.parse(data) } })
questionsObject.subscribe((data) => { if(data){ mainQuestionsObject = JSON.parse(data) } })
categoriesObject.subscribe((data) => { if(data){ mainCategoriesObject = JSON.parse(data) } })


// get long questions category IDs
let longQuestionsCategoryIDs: string[] = []
for(const category in mainCategoriesObject){
    if(mainCategoriesObject[category]['type'] == "long"){
        longQuestionsCategoryIDs.push(category)
    }
}

let currentQuestionsObject = new Map()
const mock = {	"question-oEl2OewD0Px8doKGI1S6": {
    "state": "shared",
    "linkedCollections": {
        "collection-6e6188cdf7f5d5c00ea4e4791d42ae2eaf34f43e": {
            "exam-b56324e8f5bdc26d0d3": 4
        }
    },
    "questionCategoryID": "category-10abd86d71",
    "questionParagraphID": "paragraph-gJUNFrgzruBZLQJDyYiz",
    "questionHint": "",
    "answerExplination": "",
    "questionHead": "كيف يمكن معالجة السمنة ؟",
    "questionAnswers": {
        "0": "زيادة الوعي الصحي"
    },
    "correctAnswer": "زيادة الوعي الصحي",
    "lastUpdateDate": ""
},}
currentQuestionsObject.set(0, mock)
const getLastItemInMap = (map: Map<string, QuestionsContainer>) => [...map][map.size-1]
function isLastQuestionLong() {
    // check if last question was long
    if(!getLastItemInMap(currentQuestionsObject)) { return false }
    const lastQuestionMapArr: [questionCounter: string, questionObject: QuestionsContainer] = getLastItemInMap(currentQuestionsObject)
    console.log(lastQuestionMapArr)
    const lastQuestionCounter = Object.keys(lastQuestionMapArr[1])[0]
    const lastQuestionObj = lastQuestionMapArr[1][lastQuestionCounter]
    console.log(lastQuestionObj)
    for(const longQuestionCategoryID of longQuestionsCategoryIDs){
        if(lastQuestionObj['questionCategoryID'] == longQuestionCategoryID){
            return lastQuestionObj['questionParagraphID']
        }
    }
    return false
}
export function getNewRandomQuestion() {
    console.log("getNewRandomQuestion()")
    let newQuestionID = Object.keys(mainQuestionsObject)[Math.floor(Math.random() * Object.keys(mainQuestionsObject).length)]
    // Remove the string add after fixing the database
    console.log("----------------")
    console.log(mainQuestionsObject)
    const questionParagraphID = 'paragraph-' + mainQuestionsObject?.[newQuestionID]?.['questionParagraphID']

    // to make sure that the question had a paragraph ID
    if(mainQuestionsObject[newQuestionID]['questionParagraphID'].length !== 0){
        questionParagraph.set(mainParagraphsObject[questionParagraphID]["paragraphText"])
    }else {
        questionParagraph.set("")
    }
    question.set(mainQuestionsObject[newQuestionID]['questionHead'])
    answers.set(mainQuestionsObject[newQuestionID]['questionAnswers'])
    correctAnswer.set(mainQuestionsObject[newQuestionID]['correctAnswer'])
    currentQuestionID.set(newQuestionID)
}


export function getQuestion() {
    const lastQuestionParagraphID = isLastQuestionLong()
    console.log(lastQuestionParagraphID)
    if(lastQuestionParagraphID) {
        const newLongQuestionArr: [questionObject: Question, questionID: string] = findNestedValue(mainQuestionsObject, "questionParagraphID", lastQuestionParagraphID.replace("paragraph-", ""))
        // Remove the string add after fixing the database
        const questionParagraphID = 'paragraph-' + newLongQuestionArr[0]['questionParagraphID']
        // to make sure that the question had a paragraph ID
        if(newLongQuestionArr[0]['questionParagraphID'].length !== 0){
            questionParagraph.set(mainParagraphsObject[questionParagraphID]['paragraphText'])
        }else {
            questionParagraph.set("")
        }
        question.set(newLongQuestionArr[0]['questionHead'])
        answers.set(newLongQuestionArr[0]['questionAnswers'])
        correctAnswer.set(newLongQuestionArr[0]['correctAnswer'])
        currentQuestionID.set(newLongQuestionArr[1])
        // delete mainQuestionsObject[newLongQuestionArr[1]]
        // if() {}
    }else {
        getNewRandomQuestion()
    }
}
import { categoriesObject, paragraphsObject, questionsObject } from "$lib/stores"
import type { Category, ParagraphsContainer, Question, QuestionsContainer } from "$lib/databaseInterfaces.ts"
import { question, answers, correctAnswer, currentQuestionID, questionParagraph, questionID, skipState, correctState, incorrectState, questionCounter } from "./quiz-main-stores"

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



let mainParagraphsObject: ParagraphsContainer
let mainQuestionsObject: QuestionsContainer = {}
let mainCategoriesObject: Category = {}
let localCorrectAnswer: string
let localQuestionID: string
let localQuestionCounter: number
paragraphsObject.subscribe((data) => { if(data){ mainParagraphsObject = JSON.parse(data) } })
questionsObject.subscribe((data) => { if(data){ mainQuestionsObject = JSON.parse(data) } })
categoriesObject.subscribe((data) => { if(data){ mainCategoriesObject = JSON.parse(data) } })
correctAnswer.subscribe((data) => localCorrectAnswer = data)
questionID.subscribe((data) => localQuestionID = data)
questionCounter.subscribe((data) => localQuestionCounter = data)

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
    let newQuestionID = Object.keys(mainQuestionsObject)[Math.floor(Math.random() * Object.keys(mainQuestionsObject).length)]
    // Remove the string add after fixing the database
    const questionParagraphID = 'paragraph-' + mainQuestionsObject[newQuestionID]['questionParagraphID']
    // to make sure that the question had a paragraph ID
    if(mainQuestionsObject[newQuestionID]['questionParagraphID'].length !== 0){
        questionParagraph.set(mainParagraphsObject[questionParagraphID]["paragraphText"])
    }else {
        questionParagraph.set("")
    }

    questionID.set(newQuestionID)
    question.set(mainQuestionsObject[newQuestionID]['questionHead'])
    answers.set(mainQuestionsObject[newQuestionID]['questionAnswers'])
    correctAnswer.set(mainQuestionsObject[newQuestionID]['correctAnswer'])
    currentQuestionID.set(newQuestionID)
}

let isAnimationActive = false
export function pickAnswer(e: Event) {
    if(!isAnimationActive){
        isAnimationActive = true
        const pick = (e.target as HTMLDivElement)?.getAttribute("data-value")
        if (pick == 'skip'){
            console.log('skipping')
            skipState.set(true)
            setTimeout(() => skipState.set(false), 500)
        }else {
            if(pick == localCorrectAnswer){
                console.log('Correct!')
                
                correctState.set(true)
                setTimeout(() => correctState.set(false), 500)
            }else {
                console.log('Incorrect! Better luck next time.')
                
                incorrectState.set(true)
                setTimeout(() => incorrectState.set(false), 500)
            }
        }
        currentQuestionsObject.set(localQuestionCounter, { localQuestionID: mainQuestionsObject[localQuestionID]})
        questionCounter.update((count) => count + 1)
        console.log(currentQuestionsObject)
        setTimeout(() => { getQuestion(); isAnimationActive = false }, 400)
        // make sure the timing is perfect
        // delete question from mainObject if noRepeat was true
    }
}
export function getNewLongQuestion(lastQuestionParagraphID: string) {
    const newLongQuestionArr: [questionObject: Question, questionID: string] = findNestedValue(mainQuestionsObject, "questionParagraphID", lastQuestionParagraphID.replace("paragraph-", ""))
    // Remove the string add after fixing the database
    const questionParagraphID = 'paragraph-' + newLongQuestionArr[0]['questionParagraphID']
    // to make sure that the question had a paragraph ID
    if(newLongQuestionArr[0]['questionParagraphID'].length !== 0){
        questionParagraph.set(mainParagraphsObject[questionParagraphID]['paragraphText'])
    }else {
        questionParagraph.set("")
    }
    questionID.set(newLongQuestionArr[1])
    question.set(newLongQuestionArr[0]['questionHead'])
    answers.set(newLongQuestionArr[0]['questionAnswers'])
    correctAnswer.set(newLongQuestionArr[0]['correctAnswer'])
    currentQuestionID.set(newLongQuestionArr[1])
}
export function getQuestion() {
    const lastQuestionParagraphID = isLastQuestionLong()
    if(lastQuestionParagraphID) {
        getNewLongQuestion(lastQuestionParagraphID)
    }else {
        getNewRandomQuestion()
    }
}
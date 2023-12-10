import { categoriesObject, globalQuestionsAmount, paragraphsObject, questionsObject } from "$lib/stores"
import type { Category, ParagraphsContainer, Question, QuestionsContainer } from "$lib/databaseInterfaces.ts"
import { 
    timer,
    question, 
    answers, 
    correctAnswer, 
    questionParagraph, 
    questionID, 
    skipState, 
    correctState, 
    incorrectState, 
    streakCounter, 
    questionOutTransitionDuration,
    questionInTransitionDuration,
    questionStreak,
    questionCounter,
    isQuestionMarked,
    isNextQuestionReady,
    isShowResultsVisible,
} from "./quiz-main-stores"
import ProgressBarFragment from "./ProgressBarFragment.svelte"

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
let localQuestionsAmount: number
let localQuestionCounter: number
let localQuestionOutTransitionDuration: number
let localQuestionInTransitionDuration: number
let localIsQuestionMarked: boolean
let localTimer: number
paragraphsObject.subscribe((data) => { if(data){ mainParagraphsObject = JSON.parse(data) } })
questionsObject.subscribe((data) => { if(data){ mainQuestionsObject = JSON.parse(data) } })
categoriesObject.subscribe((data) => { if(data){ mainCategoriesObject = JSON.parse(data) } })
correctAnswer.subscribe((data) => localCorrectAnswer = data)
questionID.subscribe((data) => localQuestionID = data)
globalQuestionsAmount.subscribe(data => localQuestionsAmount = data)
questionCounter.subscribe((data) => localQuestionCounter = data)
questionOutTransitionDuration.subscribe((data) => localQuestionOutTransitionDuration = data)
questionInTransitionDuration.subscribe((data) => localQuestionInTransitionDuration = data)
isQuestionMarked.subscribe(data => localIsQuestionMarked = data)
timer.subscribe(data => localTimer = data)
// get long questions category IDs
let longQuestionsCategoryIDs: string[] = []
for(const category in mainCategoriesObject){
    if(mainCategoriesObject[category]['type'] == "long"){
        longQuestionsCategoryIDs.push(category)
    }
}
// start timer
setInterval(() => timer.update((time) => { 
    if( time > 0 ) {
        return time - 1
    } else {
        return 0
    }
}), 1000)

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
    const lastQuestionCounter = Object.keys(lastQuestionMapArr[1])[0]
    const lastQuestionObj = lastQuestionMapArr[1][lastQuestionCounter]

    for(const longQuestionCategoryID of longQuestionsCategoryIDs){
        if(lastQuestionObj['questionCategoryID'] == longQuestionCategoryID){
            return lastQuestionObj['questionParagraphID']
        }
    }
    return false
}

export function getNewRandomQuestion() {
    let newQuestionID = Object.keys(mainQuestionsObject)[Math.floor(Math.random() * Object.keys(mainQuestionsObject).length)]
    // console.log(mainQuestionsObject)
    // Remove the string add incatnation fixing the database
    const questionParagraphID = 'paragraph-' + mainQuestionsObject[newQuestionID]['questionParagraphID']
    // to make sure that the question had a paragraph ID
    if(mainQuestionsObject[newQuestionID]['questionParagraphID'].length !== 0){
        questionParagraph.set(mainParagraphsObject[questionParagraphID]["paragraphText"])
    }else {
        questionParagraph.set("")
    }
    return {
        questionID: newQuestionID,
        question: mainQuestionsObject[newQuestionID]['questionHead'],
        answers: mainQuestionsObject[newQuestionID]['questionAnswers'],
        correctAnswer: mainQuestionsObject[newQuestionID]['correctAnswer'],
    }
}
export function getNewLongQuestion(newLongQuestionArr: [questionObject: Question, questionID: string]) {
    // console.log('getNewLongQuestion()')
    // console.log(newLongQuestionArr)
    
    // Remove the string add after fixing the database
    const questionParagraphID = 'paragraph-' + newLongQuestionArr[0]['questionParagraphID']
    // to make sure that the question had a paragraph ID
    if(newLongQuestionArr[0]['questionParagraphID'].length !== 0){
        questionParagraph.set(mainParagraphsObject[questionParagraphID]['paragraphText'])
    }else {
        questionParagraph.set("")
    }
    return {
        questionID: newLongQuestionArr[1],
        question: newLongQuestionArr[0]['questionHead'],
        answers: newLongQuestionArr[0]['questionAnswers'],
        correctAnswer: newLongQuestionArr[0]['correctAnswer'],
    }
}
export function getQuestion() {
    // reset timer and question mark
    timer.set(50)
    isQuestionMarked.set(false)

    const lastQuestionParagraphID = isLastQuestionLong()
    let nextQuestionObj
    if(lastQuestionParagraphID) {
        const newLongQuestionArr: [questionObject: Question, questionID: string] = findNestedValue(mainQuestionsObject, "questionParagraphID", lastQuestionParagraphID.replace("paragraph-", ""))
        // Check if there's any long question left
        if(newLongQuestionArr) {
            nextQuestionObj = getNewLongQuestion(newLongQuestionArr)
        }else {
            nextQuestionObj = getNewRandomQuestion()
        }
    }else {
        nextQuestionObj = getNewRandomQuestion()
    }
    // console.log(nextQuestionObj.correctAnswer)
    questionID.set(nextQuestionObj.questionID)
    question.set(nextQuestionObj.question)
    answers.set(nextQuestionObj.answers)
    correctAnswer.set(nextQuestionObj.correctAnswer)
}

function addProgressBarFragment(answerResult: string){
    new ProgressBarFragment({
        target: document.querySelector('.progress-bar-container') || document.body,
        props: {
            width: `${100 / localQuestionsAmount}%`, 
            answerResult: answerResult,
            fragmentID: localQuestionCounter.toString()
        }
    })
}
export function pickAnswer(e: Event) {
    isNextQuestionReady.set(false)
    const pick = (e.target as HTMLDivElement)?.getAttribute("data-value")
    if (pick == 'skip'){
        questionInTransitionDuration.set(400)
        questionOutTransitionDuration.set(500)
        skipState.set(true)
        setTimeout(() => skipState.set(false), localQuestionInTransitionDuration + 200)
        addProgressBarFragment('skip')
        questionStreak.update(n => n + 1)
    }else {
        if(pick == localCorrectAnswer){
            questionInTransitionDuration.set(100)
            questionOutTransitionDuration.set(100)
            correctState.set(true)
            setTimeout(() => correctState.set(false), localQuestionInTransitionDuration + 200)
            addProgressBarFragment('correct')
            questionStreak.update(n => n + 1)
        }else {
            questionInTransitionDuration.set(400)
            questionOutTransitionDuration.set(500)
            incorrectState.set(true)
            setTimeout(() => incorrectState.set(false), localQuestionInTransitionDuration + 200)
            addProgressBarFragment('incorrect')
            questionStreak.set(0)
        }
    }

    mainQuestionsObject[localQuestionID]['isQuestionMarked'] = localIsQuestionMarked
    currentQuestionsObject.set(localQuestionCounter, { localQuestionID: mainQuestionsObject[localQuestionID]})
    delete mainQuestionsObject[localQuestionID]

    streakCounter.update((count) => count + 1)
    questionCounter.update((count) => count + 1)
    // console.log(localQuestionCounter, localQuestionsAmount)
    if(localQuestionCounter >= localQuestionsAmount){
        endQuiz()
    }
    setTimeout(() => isNextQuestionReady.set(true), localQuestionInTransitionDuration + 200)
    setTimeout(getQuestion,  localQuestionInTransitionDuration + 200)
}



export function endQuiz() {
    isShowResultsVisible.set(true)
}
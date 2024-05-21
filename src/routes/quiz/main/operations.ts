import { categoriesObject, globalQuestionsAmount, paragraphsObject, questionsObject } from "$lib/stores"
import type { CategoriesContainer, ParagraphsContainer, Question, QuestionsContainer } from "$lib/databaseInterfaces.ts"
import { 
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
import { timer, totalTimer } from "../quiz-stores"
import ProgressBarFragment from "./ProgressBarFragment.svelte"
import { 
    generalCurrentQuestionsMap, 
    generalAllQuestionsMap,
    generalCorrectQuestionsMap,
    generalIncorrectQuestionsMap,
    generalSkippedQuestionsMap,
    generalMarkedQuestionsMap    
} from "../quiz-stores";
import { writable } from "svelte/store"

export const isNavigationIntentional = writable(false)
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
let mainCategoriesObject: CategoriesContainer = {}
let localCorrectAnswer: string
let localQuestionID: number
let localQuestionsAmount: number
let localQuestionCounter: number
let localQuestionOutTransitionDuration: number
let localQuestionInTransitionDuration: number
let localIsQuestionMarked: boolean
let localTimer: number
paragraphsObject.subscribe(data => mainParagraphsObject = data)
questionsObject.subscribe(data => mainQuestionsObject = data)
categoriesObject.subscribe(data => mainCategoriesObject = data)
correctAnswer.subscribe(data => localCorrectAnswer = data)
questionID.subscribe(data => localQuestionID = data)
globalQuestionsAmount.subscribe(data => localQuestionsAmount = data)
questionCounter.subscribe(data => localQuestionCounter = data)
questionOutTransitionDuration.subscribe(data => localQuestionOutTransitionDuration = data)
questionInTransitionDuration.subscribe(data => localQuestionInTransitionDuration = data)
isQuestionMarked.subscribe(data => localIsQuestionMarked = data)
timer.subscribe(data => localTimer = data)
// get long questions category IDs
let longQuestionsCategoryIDs: number[] = []
for(const category in mainCategoriesObject){
    if(mainCategoriesObject[category]['type'] == "long"){
        longQuestionsCategoryIDs.push(parseInt(category))
    }
}
// start timer
const questionTimer = setInterval(() => timer.update((time) => { 
    if( time > 0 ) {
        return time - 1
    } else {
        return 0
    }
}), 1000)
const quizTimer = setInterval(() => totalTimer.update(time => time + 1), 1000)

let currentQuestionsMap = new Map()

const getLastItemInMap = (map: Map<number, QuestionsContainer>) => [...map][map.size-1]
function isLastQuestionLong() {
    // check if last question was long
    if(!getLastItemInMap(currentQuestionsMap)) return false
    const lastQuestionMapArr: [questionCounter: number, questionObject: QuestionsContainer] = getLastItemInMap(currentQuestionsMap)
    const lastQuestionCounter = parseInt(Object.keys(lastQuestionMapArr[1])[0])
    const lastQuestionObj = lastQuestionMapArr[1][lastQuestionCounter]

    for(const longQuestionCategoryID of longQuestionsCategoryIDs){
        if(lastQuestionObj['questionCategoryID'] == longQuestionCategoryID){
            return lastQuestionObj['questionParagraphID']
        }
    }
    return false
}

export function getNewRandomQuestion() {
    let newQuestionID = parseInt(Object.keys(mainQuestionsObject)[Math.floor(Math.random() * Object.keys(mainQuestionsObject).length)])
    // Remove the string add incatnation fixing the database
    const questionParagraphID = mainQuestionsObject[newQuestionID]['questionParagraphID']
    // to make sure that the question had a paragraph ID
    if(typeof questionParagraphID === 'number'){
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
export function getNewLongQuestion(newLongQuestionArr: [questionObject: Question, questionID: number]) {
    // Remove the string add after fixing the database
    const questionParagraphID = newLongQuestionArr[0]['questionParagraphID']
    // to make sure that the question had a paragraph ID
    if(typeof questionParagraphID === 'number'){
        questionParagraph.set(mainParagraphsObject[questionParagraphID]['paragraphText'])
    } else {
        questionParagraph.set(undefined)
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
        const newLongQuestionArr: [questionObject: Question, questionID: number] = findNestedValue(mainQuestionsObject, "questionParagraphID", lastQuestionParagraphID)
        // Check if there's any long question left
        if(newLongQuestionArr) {
            nextQuestionObj = getNewLongQuestion(newLongQuestionArr)
        }else {
            nextQuestionObj = getNewRandomQuestion()
        }
    }else {
        nextQuestionObj = getNewRandomQuestion()
    }
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
    mainQuestionsObject[localQuestionID]['skipState'] = false
    mainQuestionsObject[localQuestionID]['correctState'] = false
    mainQuestionsObject[localQuestionID]['incorrectState'] = false
    mainQuestionsObject[localQuestionID]['pickedAnswer'] = pick || ""
    if (pick == 'skip'){
        questionInTransitionDuration.set(400)
        questionOutTransitionDuration.set(500)
        mainQuestionsObject[localQuestionID]['skipState'] = true

        skipState.set(true)
        setTimeout(() => skipState.set(false), localQuestionInTransitionDuration + 200)
        addProgressBarFragment('skip')
        questionStreak.update(n => n + 1)
    }else {
        if(pick == localCorrectAnswer){
            questionInTransitionDuration.set(100)
            questionOutTransitionDuration.set(100)
            
            mainQuestionsObject[localQuestionID]['correctState'] = true

            correctState.set(true)
            setTimeout(() => correctState.set(false), localQuestionInTransitionDuration + 200)
            addProgressBarFragment('correct')
            questionStreak.update(n => n + 1)
        }else {
            questionInTransitionDuration.set(400)
            questionOutTransitionDuration.set(500)
            mainQuestionsObject[localQuestionID]['incorrectState'] = true

            incorrectState.set(true)
            setTimeout(() => incorrectState.set(false), localQuestionInTransitionDuration + 200)
            addProgressBarFragment('incorrect')
            questionStreak.set(0)
        }
    }

    mainQuestionsObject[localQuestionID]['isQuestionMarked'] = localIsQuestionMarked
    currentQuestionsMap.set(localQuestionCounter, { [localQuestionID]: mainQuestionsObject[localQuestionID]})
    delete mainQuestionsObject[localQuestionID]

    streakCounter.update((count) => count + 1)
    questionCounter.update((count) => count + 1)

    if(localQuestionCounter >= localQuestionsAmount){
        setTimeout(endQuiz, localQuestionInTransitionDuration + 200)
    }
    setTimeout(() => isNextQuestionReady.set(true), localQuestionInTransitionDuration + 200)
    setTimeout(getQuestion,  localQuestionInTransitionDuration + 200)
}



export function endQuiz() {

    let allQuestionsMap: Map<number, Question> = new Map()
    let correctQuestionsMap: Map<number, Question> = new Map()
    let incorrectQuestionsMap: Map<number, Question> = new Map()
    let skippedQuestionsMap: Map<number, Question> = new Map()
    let markedQuestionsMap: Map<number, Question> = new Map()

    for(const [count, question] of currentQuestionsMap) {
        for(const key of Object.keys(question)) {
            const questionObject = question[key]
            allQuestionsMap.set(count, questionObject)
            if (questionObject['isQuestionMarked'] === true) { markedQuestionsMap.set(count, questionObject) }
            if (questionObject['correctState'] === true) { correctQuestionsMap.set(count, questionObject) }
            if (questionObject['incorrectState'] === true) { incorrectQuestionsMap.set(count, questionObject) }
            if (questionObject['skipState'] === true) { skippedQuestionsMap.set(count, questionObject) }
        }
    }
    generalAllQuestionsMap.set(allQuestionsMap)
    generalCorrectQuestionsMap.set(correctQuestionsMap)
    generalIncorrectQuestionsMap.set(incorrectQuestionsMap)
    generalSkippedQuestionsMap.set(skippedQuestionsMap)
    generalMarkedQuestionsMap.set(markedQuestionsMap)

    clearInterval(questionTimer)
    clearInterval(quizTimer)
    
    let questionsAmount = allQuestionsMap.size
    let correctQuestionsAmount = correctQuestionsMap.size
    let incorrectQuestionsAmount = incorrectQuestionsMap.size
    const percentage1 = Math.round(correctQuestionsAmount * 100 / questionsAmount)
    const percentage2 = Math.round(incorrectQuestionsAmount * 100 / questionsAmount)
    if(percentage2 && percentage1) {
        isShowResultsVisible.set(true)
    } else {
        isNavigationIntentional.set(true)
        window.location.href = '/quiz'
    }  
    
    setTimeout(()=>{
        (document.querySelector('.percentage-2') as SVGPathElement)?.style.setProperty('transform', `rotate(${360 * percentage1 / 100}deg)`);
        (document.querySelector('.percentage-3') as SVGPathElement)?.style.setProperty('transform', `rotate(${360 * (percentage2 + percentage1) / 100}deg)`);
    }, 50)
    
    generalCurrentQuestionsMap.set(currentQuestionsMap)
}
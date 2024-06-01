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
    generalMarkedQuestionsMap    
} from "../quiz-stores";
import { writable } from "svelte/store"
import { findNestedValue } from "$lib/app"

export const isNavigationIntentional = writable(false)


type TempQuestionsContainer = {
    [questionID: number]: {
        answerExplination: string | null,
        correctAnswer: string,
        lastUpdateDate: string,
        questionAnswers: {
            [answerID: number]: string
        }
        questionCategoryID: number,
        questionHead: string,
        questionHint: string | null,
        questionParagraphID: number | null,
        state?: string, //=||>
        isQuestionMarked?: boolean, //=||>
        skipState?: boolean, //=||>
        correctState?: boolean, //=||>
        incorrectState?: boolean, //=||>
        pickedAnswer?: string, //=||>

    }
}
export const mainParagraphsObject: ParagraphsContainer = {
    1: {
        paragraphTitle: null,
        paragraphText: 'حقٌّ على الإنسان أن يتحرّى بغاية جهده مصاحبة الأخيار ومجالستهم، فهي قد تجعل الشرّير خيّرًا. كما أن صحبة الأشرار قد تجعل الخيّر شرّيرًا'
    }
}
const mainQuestionsObject: TempQuestionsContainer = {
    1: {
        questionHead: '"حقُّ على الإنسان "  هذه العبارة تعني :',
        questionParagraphID: 1,
        answerExplination: null,
        lastUpdateDate: '2020-05-06 15:05:00.063400+00',
        correctAnswer: 'يجب عليه',
        questionAnswers: {
            0: 'يجوز له',
            1: 'يحق له',
            2: 'يجب عليه',
            3: 'يصدق عليه'
        },
        questionCategoryID: 5,
        questionHint: null
    },
    2: {
        questionHead: 'بحسب السياق ، أي المعاني التالية لا يدل على معنى " يتحرّى " ؟',
        questionParagraphID: 1,
        answerExplination: null,
        lastUpdateDate: '2020-05-06 15:05:00.063400+00',
        correctAnswer: 'ينتظر',
        questionAnswers: {
            0: 'ينتظر',
            1: 'يحرص',
            2: 'يجتهد',
            3: 'يقصد'
        },
        questionCategoryID: 5,
        questionHint: null
    },
    3: {
        questionHead: 'المراد بالجهد في " غاية جهده " :',
        questionParagraphID: 1,
        answerExplination: null,
        lastUpdateDate: '2020-05-06 15:05:00.063400+00',
        correctAnswer: 'الوسع',
        questionAnswers: {
            0: 'الصعوبة',
            1: 'الوسع',
            2: 'المشقة',
            3: 'الصبر'
        },
        questionCategoryID: 5,
        questionHint: null
    },
    4: {
        questionHead: 'تمثل عبارة (صحبة الاشرار قد تجعل الخير شريرا ) لما قبلها : ',
        questionParagraphID: 1,
        answerExplination: null,
        lastUpdateDate: '2020-05-06 15:05:00.063400+00',
        correctAnswer: 'ايضاحا وتأكيدا',
        questionAnswers: {
            0: 'اكمالا وايجازا',
            1: 'اقرارا',
            2: 'تكرارا',
            3: 'ايضاحا وتأكيدا'
        },
        questionCategoryID: 5,
        questionHint: null
    },
    5: {
        questionHead: 'أي العبارات لا تتوافق مع النص : ',
        questionParagraphID: 1,
        answerExplination: null,
        lastUpdateDate: '2020-05-06 15:05:00.063400+00',
        correctAnswer: 'الخير والشر ضدان',
        questionAnswers: {
            0: 'المرء على دين خليله',
            1: 'الصاحب ساحب',
            2: 'الخير والشر ضدان',
            3: 'كل قرين بالمقارن يقتدي'
        },
        questionCategoryID: 5,
        questionHint: null
    },
    6: {
        questionHead: 'السماء الغائمة في فصل الشتاء تؤذن بزوال المطر.',
        questionParagraphID: null,
        answerExplination: null,
        lastUpdateDate: '2020-05-06 15:05:00.063400+00',
        correctAnswer: 'بزوال',
        questionAnswers: {
            0: 'السماء',
            1: 'الغائمة',
            2: 'الشتاء',
            3: 'بزوال'
        },
        questionCategoryID: 4,
        questionHint: null
    },
    7: {
        questionHead: 'إن للتعلم مرارة لن يذوقها إلا من ذاق مرارته.',
        questionParagraphID: null,
        answerExplination: null,
        lastUpdateDate: '2020-05-06 15:05:00.063400+00',
        correctAnswer: 'مرارة',
        questionAnswers: {
            0: 'مرارة',
            1: 'يذوقها',
            2: 'ذاق',
            3: 'مرارته'
        },
        questionCategoryID: 4,
        questionHint: null
    },
    8: {
        questionHead: 'الجهل أبو الشرور ؛ وأسوأ مصائب الجهل أن يعرف الجاهل أنه جاهل.',
        questionParagraphID: null,
        answerExplination: null,
        lastUpdateDate: '2020-05-06 15:05:00.063400+00',
        correctAnswer: 'يعرف',
        questionAnswers: {
            0: 'الشرور',
            1: 'أسوأ',
            2: 'الجهل',
            3: 'يعرف'
        },
        questionCategoryID: 4,
        questionHint: null
    },
    9: {
        questionHead: 'إني أشفق على البخيل بماله فإنه ينشغل في الدنيا على ....... ويحاسب في الآخرة على .....',
        questionParagraphID: null,
        answerExplination: null,
        lastUpdateDate: '2020-05-06 15:05:00.063400+00',
        correctAnswer: 'جمعه- منعه',
        questionAnswers: {
            0: 'أمد – الطموح',
            1: 'البخل- الشحيح',
            2: 'جمعه- منعه',
            3: 'شوكها – حرّها'
        },
        questionCategoryID: 3,
        questionHint: null
    },
    10: {
        questionHead: 'الكريم........إذا استعطفته ، واللئيم.............إذا لاطفته.',
        questionParagraphID: null,
        answerExplination: null,
        lastUpdateDate: '2020-05-06 15:05:00.063400+00',
        correctAnswer: 'يلين - يقسو',
        questionAnswers: {
            0: 'يفرح - يعطى',
            1: 'يلين - يقسو',
            2: 'يعطف - يرق',
            3: 'يعظم - يتمرد'
        },
        questionCategoryID: 3,
        questionHint: null
    },
    11: {
        questionHead: 'لن يراك الناس…….اذا تجاهلت السفهاء ولكن قد. ……بينكم عندما تحاول مواجهتهم.',
        questionParagraphID: null,
        answerExplination: null,
        lastUpdateDate: '2020-05-06 15:05:00.063400+00',
        correctAnswer: 'متكبرا – يخلطون',
        questionAnswers: {
            0: 'متكبرا – يخلطون',
            1: 'متغطرسًا – يميزون',
            2: 'متواضعًا -يمزجون',
        },
        questionCategoryID: 3,
        questionHint: null
    },
    12: {
        questionHead: 'إهمال : إخفاق',
        questionParagraphID: null,
        answerExplination: null,
        lastUpdateDate: '2020-05-06 15:05:00.063400+00',
        correctAnswer: 'تسويف: تراكم',
        questionAnswers: {
            0: 'تسويف: تراكم',
            1: 'تعاون : تكاتف',
            2: 'تقدم : تراجع',
            3: 'تهاون : تكاسل'
        },
        questionCategoryID: 1,
        questionHint: null
    },
    13: {
        questionHead: 'ورقة : غصن',
        questionParagraphID: null,
        answerExplination: null,
        lastUpdateDate: '2020-05-06 15:05:00.063400+00',
        correctAnswer: 'سعادة :شعور',
        questionAnswers: {
            0: 'مدرسية : ملعب',
            1: 'سعادة :شعور',
            2: 'طاولة :سبورة',
            3: 'حديقة : مظلة'
        },
        questionCategoryID: 1,
        questionHint: null
    },
    14: {
        questionHead: 'فول : بقوليات',
        questionParagraphID: null,
        answerExplination: null,
        lastUpdateDate: '2020-05-06 15:05:00.063400+00',
        correctAnswer: 'حافلة : مركبات',
        questionAnswers: {
            0: 'مدارس : جامعات',
            1: 'طماطم : فاكهة',
            2: 'بيض : بروتين',
            3: 'حافلة : مركبات'
        },
        questionCategoryID: 1,
        questionHint: null
    },
    15: {
        questionHead: 'العاجلة : الآخرة',
        questionParagraphID: null,
        answerExplination: null,
        lastUpdateDate: '2020-05-06 15:05:00.063400+00',
        correctAnswer: 'الدنيا : الآجلة',
        questionAnswers: {
            0: 'البعث : القيامة',
            1: 'الموت : النشور',
            2: 'الحياة - العمل',
            3: 'الدنيا : الآجلة'
        },
        questionCategoryID: 1,
        questionHint: null
    },
}
const mainCategoriesObject: CategoriesContainer = {
    1: {
        name: 'التناظر اللفظي',
        type: 'short'
    },
    3: {
        name: 'إكمال الجمل',
        type: 'short'
    },
    4: {
        name: 'الخطأ السياقي',
        type: 'short'
    },
    5: {
        name: 'إستيعاب المقروء',
        type: 'long'
    },
    6: {
        name: 'المفردة الشاذة',
        type: 'short'
    }
}
const localQuestionsAmount: number = 14

let localCorrectAnswer: string
let localQuestionID: number
let localQuestionCounter: number
let localQuestionOutTransitionDuration: number
let localQuestionInTransitionDuration: number
let localIsQuestionMarked: boolean
let localTimer: number


correctAnswer.subscribe(data => localCorrectAnswer = data)
questionID.subscribe(data => localQuestionID = data)
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
    let markedQuestionsMap: Map<number, Question> = new Map()

    for(const [count, question] of currentQuestionsMap) {
        for(const key of Object.keys(question)) {
            const questionObject = question[key]
            allQuestionsMap.set(count, questionObject)
            if (questionObject['isQuestionMarked'] === true) { markedQuestionsMap.set(count, questionObject) }
            if (questionObject['correctState'] === true) { correctQuestionsMap.set(count, questionObject) }
            if (questionObject['incorrectState'] === true) { incorrectQuestionsMap.set(count, questionObject) }
        }
    }
    generalAllQuestionsMap.set(allQuestionsMap)
    generalCorrectQuestionsMap.set(correctQuestionsMap)
    generalIncorrectQuestionsMap.set(incorrectQuestionsMap)
    generalMarkedQuestionsMap.set(markedQuestionsMap)

    clearInterval(questionTimer)
    clearInterval(quizTimer)
    
    let questionsAmount = allQuestionsMap.size
    let correctQuestionsAmount = correctQuestionsMap.size
    let incorrectQuestionsAmount = incorrectQuestionsMap.size
    const percentage1 = Math.round(correctQuestionsAmount * 100 / questionsAmount)
    const percentage2 = Math.round(incorrectQuestionsAmount * 100 / questionsAmount)
    if(percentage2 || percentage1) {
        isShowResultsVisible.set(true)
    } else {
        isNavigationIntentional.set(true)
        window.location.href = '/demo'
    }
    
    setTimeout(()=>{
        (document.querySelector('.percentage-2') as SVGPathElement)?.style.setProperty('transform', `rotate(${360 * percentage1 / 100}deg)`);
        (document.querySelector('.percentage-3') as SVGPathElement)?.style.setProperty('transform', `rotate(${360 * (percentage2 + percentage1) / 100}deg)`);
    }, 50)
    
    generalCurrentQuestionsMap.set(currentQuestionsMap)
}
import { activeExamsIDs, maxQuestionAmount, globalQuestionsAmount, questionNoRepeat } from "$lib/stores"

let localMaxQuestionAmount: number
let localGlobalQuestionsAmount: number
let localActiveExamsIDs: string[]
let noRepeat: boolean

activeExamsIDs.subscribe((value) => localActiveExamsIDs = value)
maxQuestionAmount.subscribe((value) => localMaxQuestionAmount = value)
globalQuestionsAmount.subscribe((value) => localGlobalQuestionsAmount = value)
questionNoRepeat.subscribe((value) => noRepeat = value)

export function isExamListValid() {
    if(localActiveExamsIDs.length === 0){
        return false
    }
    return true
}

export function isExamQuestionAmountValid() {
    if(localGlobalQuestionsAmount <= 0){
        return false
    } else if(localGlobalQuestionsAmount > localMaxQuestionAmount){
        if(noRepeat){
            maxQuestionAmount.set(localGlobalQuestionsAmount)
            return true
        }
    }
    return true
}
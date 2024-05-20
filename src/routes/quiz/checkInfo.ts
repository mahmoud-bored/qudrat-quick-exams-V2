import { activeExamsIDs, maxQuestionAmount, globalQuestionsAmount, questionNoRepeat } from "$lib/stores"

let localMaxQuestionAmount: number
let localGlobalQuestionsAmount: number
let localActiveExamsIDs: { [collectionID: number]: number[]}
let noRepeat: boolean

activeExamsIDs.subscribe((value) => localActiveExamsIDs = value)
maxQuestionAmount.subscribe((value) => localMaxQuestionAmount = value)
globalQuestionsAmount.subscribe((value) => localGlobalQuestionsAmount = value)
questionNoRepeat.subscribe((value) => noRepeat = value)

export function isExamListValid() {
    for(const [key, value] of Object.entries(localActiveExamsIDs)){
        if(value.length > 0) return true
    }
    return false
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
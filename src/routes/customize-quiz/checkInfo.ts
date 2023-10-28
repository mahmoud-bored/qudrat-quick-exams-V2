import { activeExamsIDs, warningMessage, maxQuestionAmount, globalQuestionsAmount, questionNoRepeat } from "$lib/stores"

let localMaxQuestionAmount: number
let localGlobalQuestionsAmount: number
let localActiveExamsIDs: string[]
let noRepeat: boolean

activeExamsIDs.subscribe((value) => localActiveExamsIDs = value)
maxQuestionAmount.subscribe((value) => localMaxQuestionAmount = value)
globalQuestionsAmount.subscribe((value) => localGlobalQuestionsAmount = value)
questionNoRepeat.subscribe((value) => noRepeat = value)

export function checkExamListValidty() {
    if(localActiveExamsIDs.length === 0){
        warningMessage.set('يجب اختيار اختبار واحد على الأقل')
        return false
    } else {
        warningMessage.set('')
        return true
    }
}

export function checkExamQuestionAmountValidty() {
    if(localGlobalQuestionsAmount > localMaxQuestionAmount){
        if(noRepeat){
            warningMessage.set('عدد الأسئلة المختارة أكبر من عدد الحد الأقصى')
            return false
        }
    }else if(localGlobalQuestionsAmount <= 0){
        warningMessage.set('يجب ان يكون عدد الأسئلة واحد على الأقل')
        return false
    }else {
        warningMessage.set('')
        return true
    }
}
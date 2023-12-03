import { goto } from "$app/navigation"
import { isExamCustomized } from "$lib/stores"
let localIsExamCustomized: boolean
isExamCustomized.subscribe((value) => localIsExamCustomized = value)

export function checkQuizReady(){
    if(localIsExamCustomized){
        return true
    } else {
        goto('/quiz/customize-quiz')
    }
}

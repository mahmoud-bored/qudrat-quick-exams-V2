import { getHTMLElement } from '$lib/app.ts'
import { activeExamsIDs, examsCollectionCustomizeTab, isSelectAllButtonActive, maxQuestionAmount } from '$lib/stores'
import type { Collection, CollectionContainer, CollectionInfo } from '$lib/stores'

let localActiveExamsIDs: string[]
let localExamsCollectionCustomizeTab: CollectionInfo
let maxQuestionAmountValue = 0

activeExamsIDs.subscribe((value) => localActiveExamsIDs = value)
examsCollectionCustomizeTab.subscribe((value) => localExamsCollectionCustomizeTab = value)

export function checkActiveExamsList(collections: CollectionContainer){
    maxQuestionAmountValue = 0
    // Check if Collection is active
    for(const collectionID in collections){
        const examsArr = collections[collectionID]['examsOrder']
        let isActive = false
        for(const examID of examsArr){
            if(localActiveExamsIDs.includes(examID)){
                isActive = true
                // Add number of questions to maxQuestionAmountValue
                maxQuestionAmountValue += parseInt(collections[collectionID]['exams'][examID]['numberOfQuestions'])
            }
        }
        if(isActive){
            activateCollection(collectionID)
        }else{
            deactivateCollection(collectionID)
        }
    }
    // Update Max Question Amount
    updateMaxQuestionAmount()

    // Check if an Exam is active
    try{
        for(const examID of localExamsCollectionCustomizeTab['examsOrder']){
            if(localActiveExamsIDs.includes(examID)){
                activateExam(examID)
            }else{
                deactivateExam(examID)
            }
        }
    }catch(err){  }

    // Check if toggleAll button is active
    try{
        let isActive = true
        for(const exam of localExamsCollectionCustomizeTab['examsOrder']){
            if(!localActiveExamsIDs.includes(exam)){
                isActive = false
            }
        }
        if(isActive){
            activateToggleAllButton()
        } else{
            deactivateToggleAllButton()
        }
    } catch(err){  }

}




// getHTMLElement returns querySelector's result as HTMLElement
function activateCollection(collectionID: string){
    // Add border color of collection container
    getHTMLElement( document.querySelector(`.collection-container[data-id="${collectionID}"]`) )?.style.setProperty('border-color', '#009759')
    // Check the checkbox
    document.querySelector(`.collection-container[data-id="${collectionID}"] > .right-side-container > input`)?.setAttribute('checked', 'true')
}
function deactivateCollection(collectionID: string){
    // Remove border color of collection container
    getHTMLElement( document.querySelector(`.collection-container[data-id="${collectionID}"]`) )?.style.setProperty('border-color', '')
    // Uncheck the checkbox
    document.querySelector(`.collection-container[data-id="${collectionID}"] > .right-side-container > input`)?.removeAttribute('checked')
}

function activateExam(examID: string){
    // Add border color of exam container
    getHTMLElement( document.querySelector(`.exam-card[data-id="${examID}"]`) )?.style.setProperty('border-color', '#009759')
    // Check the checkbox
    document.querySelector(`.exam-card[data-id="${examID}"] > .button-title > input`)?.setAttribute('checked', 'true')
}
function deactivateExam(examID: string){
    // Remove border color of exam container
    getHTMLElement( document.querySelector(`.exam-card[data-id="${examID}"]`) )?.style.setProperty('border-color', '')
    // Uncheck the checkbox
    document.querySelector(`.exam-card[data-id="${examID}"] > .button-title > input`)?.removeAttribute('checked')
}


export function toggleAllExamsListInCustomizationTab(collections: CollectionContainer){
    let isActive = false
    for(const exam of localExamsCollectionCustomizeTab['examsOrder']){
        if(!localActiveExamsIDs.includes(exam)){
            localActiveExamsIDs.push(exam)
            activateToggleAllButton()
            isActive = true
        }
    }
    if(!isActive){
        // remove all localExamsCollectionCustomizeTab['examsOrder'] from localActiveExamsIDs
        localActiveExamsIDs = localActiveExamsIDs.filter((exam) => !localExamsCollectionCustomizeTab['examsOrder'].includes(exam))
        deactivateToggleAllButton()
    }
    activeExamsIDs.set(localActiveExamsIDs)
    checkActiveExamsList(collections)
}

function activateToggleAllButton(){ isSelectAllButtonActive.set(true) }
function deactivateToggleAllButton(){ isSelectAllButtonActive.set(false) }
function updateMaxQuestionAmount(){ maxQuestionAmount.set(maxQuestionAmountValue) }
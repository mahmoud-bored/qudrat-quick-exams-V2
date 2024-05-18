<script lang="ts">
    import { isExamsCutomizationTabVisible, examsCollectionCustomizeTab, activeExamsIDs } from "$lib/stores"
    import type { CollectionsContainer } from "$lib/stores";
    import { checkActiveExamsList } from "./activeExamsList";
	import { onMount } from "svelte";

    export let collectionID: number
    export let collections: CollectionsContainer

    let isCardMounted = false
    onMount(()=>  setTimeout(() => isCardMounted = true , 50))

    const collectionObj = collections[collectionID]
    const collectionObjInfo = collectionObj.info
    let collectionQuestionsAmount = collections[collectionID].info.numberOfQuestions
    let localActiveExamsIDs: number[]
    let isCollectionActive = false
    activeExamsIDs.subscribe((value)=> localActiveExamsIDs = value)
    // check if the collection is active
    $: {
        isCollectionActive = false
        for(const exam of Object.keys(collectionObj['exams'])){
            if(localActiveExamsIDs.includes(parseInt(exam))){
                isCollectionActive = true
                break
            }
        }
    }
    function addOrRemoveExamFromActiveExamsIDs(){
        // if the collection is active we remove every item in the examsCollection from the activeExamsIDs
        // if its not active we add every item in the examsCollection to the activeExamsIDs
        if(isCollectionActive){
            for(const exam of Object.keys(collectionObj['exams'])){
                // remove exam from localActiveExamsIDs
                localActiveExamsIDs.splice(localActiveExamsIDs.indexOf(parseInt(exam)), 1)
                isCollectionActive = false
            }
        } else {
            for(const exam of Object.keys(collectionObj['exams'])){
                // add exam to localActiveExamsIDs
                localActiveExamsIDs.push(parseInt(exam))
                isCollectionActive = true
            }
        }
        // update activeExamsIDs
        setActiveExams(localActiveExamsIDs)
    }
    function setActiveExams(arr: number[]){ activeExamsIDs.set(arr) }
    function showCustomizationTab(){ isExamsCutomizationTabVisible.set(true) }
    function setExamsCollection(){ examsCollectionCustomizeTab.set(collectionObj) }
</script>

<div class="collection-container py-2 px-3 w-9/10 rounded bg-secondary-light flex justify-evenly items-center 
        gap-2 ml-20 -mt-5 opacity-0 transition border-3 border-transparent outer-shadow
        hover:border-primary hover:bg-blend-lighten" 
    data-id={collectionID} 
    class:collection-container-mounted={isCardMounted}
>
    <div class="left-side-container w-full flex items-center justify-between">
        <button 
            class="collection-customize-button flex items-center w-1/2 rounded border-2 border-primary 
                flex-center text-xs py-1 transition cursor-pointer pointer-events-auto hover:bg-primary hover:text-secondary-light" 
            on:click={()=> { 
                setExamsCollection(); 
                showCustomizationTab(); 
                checkActiveExamsList(collections); 
            }}
        >
            تخصيص
        </button>
        <p class="text-xs text-zinc-400" dir="rtl">{collectionQuestionsAmount} سؤال</p>
    </div>
    <hr class="h-9/10 w-0 border border-zinc-500"/>
    <button 
        class="right-side-container w-full flex items-center justify-end gap-2 text-base cursor-pointer pointer-events-auto" 
        on:click={()=> { 
            addOrRemoveExamFromActiveExamsIDs()
            checkActiveExamsList(collections) 
        }}
    >
        <p>{collectionObjInfo['collectionName']}</p>
        <input 
            class="border-3 border-secondary-light min-w-5 min-h-5 checkbox-input checked:border-primary"
            type="checkbox" 
            bind:checked={isCollectionActive}
        />
    </button>
</div>

<style lang="sass">
    .collection-container-mounted
        margin-left: 0
        margin-top: 0
        opacity: 1

</style>
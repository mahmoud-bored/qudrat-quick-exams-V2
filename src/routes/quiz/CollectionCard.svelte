<script lang="ts">
	import { mergeArraysUnique } from "$lib/app";
    import { isExamsCutomizationTabVisible, examsCollectionCustomizeTab, activeExamsIDs } from "$lib/stores"
    import type { CollectionsContainer } from "$lib/stores";
	import { onMount } from "svelte";

    export let collectionID: number
    export let collections: CollectionsContainer

    let isCardMounted = false
    onMount(()=>  setTimeout(() => isCardMounted = true , 50))

    const collectionObj = collections[collectionID]
    const collectionObjInfo = collectionObj.info
    let collectionQuestionsAmount = collections[collectionID].info.numberOfQuestions
    let localActiveExamsIDs: { [collectionID: number]: number[] }
    let isCollectionActive = false
    activeExamsIDs.subscribe((value)=> localActiveExamsIDs = value)
    // check if the collection is active
    $: {
        isCollectionActive = false
        for(const examID of collectionObj.examsOrder){
            if(examID) {
                if($activeExamsIDs[collectionID]?.includes(examID)){
                    isCollectionActive = true
                    break
                }
            }
        }
    }
    function toggleAllCollectionExamsIDs(){
        // if the collection is active we remove every item in the examsCollection from the activeExamsIDs
        // if its not active we add every item in the examsCollection to the activeExamsIDs
        if(isCollectionActive){
            activeExamsIDs.update((collections) => {
                collections[collectionID] = []
                return collections
            })
            isCollectionActive = false
        } else {
            activeExamsIDs.update((collections) => {
                if(!collections[collectionID]) collections[collectionID] = []
                const newArr = mergeArraysUnique(collections[collectionID], collectionObj.examsOrder)
                collections[collectionID] = newArr
                return collections
            })
        }
    }
</script>

<div 
    class="collection-container py-2 px-3 w-9/10 rounded flex justify-evenly items-center gap-2 ml-20 -mt-5 
        opacity-0 bg-secondary-light transition border-3 outer-shadow hover:border-primary hover:bg-blend-lighten"
    class:border-primary={isCollectionActive}
    class:border-transparent={!isCollectionActive}
    class:collection-container-mounted={isCardMounted}
    data-id={collectionID}  
>
    <div class="left-side-container w-full flex items-center justify-between">
        <button 
            class="collection-customize-button flex items-center w-1/2 rounded border-2 border-primary 
                flex-center text-xs py-1 transition cursor-pointer pointer-events-auto hover:bg-primary hover:text-secondary-light" 
            on:click={()=> { 
                examsCollectionCustomizeTab.set({ [collectionID]: collectionObj })
                isExamsCutomizationTabVisible.set(true) 
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
            toggleAllCollectionExamsIDs()
        }}
    >
        <p>{collectionObjInfo['collectionName']}</p>
        <input 
            type="checkbox"
            class="border-3 border-secondary-light min-w-5 min-h-5 checkbox-input checked:border-primary"
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
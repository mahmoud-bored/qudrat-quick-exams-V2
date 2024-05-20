<script lang="ts">
	import { fly } from "svelte/transition"
    import { activeExamsIDs, isExamsCutomizationTabVisible } from "$lib/stores"
    import type { CollectionsContainer, CollectionInfo } from '$lib/stores'
    import ExamCard from "./ExamCard.svelte"
	import { mergeArraysUnique } from "$lib/app";

    export let collections: CollectionsContainer
    export let collectionObj: { [collectionID: number]: CollectionInfo }

    const collectionID = parseInt(Object.keys(collectionObj)[0])
    const examsOrder = collectionObj[collectionID].examsOrder;
    const exams = collectionObj[collectionID].exams
    let isAllExamsChecked: boolean

    $:{
        let active = true
        for(const examID of examsOrder){
            if(examID) {
                if(!$activeExamsIDs[collectionID]?.includes(examID)){
                    active = false
                    break
                }
            }
        }
        if(active) isAllExamsChecked = true
            else isAllExamsChecked = false
    }

    function toggleAllExamsList(){
        if(!isAllExamsChecked){
            activeExamsIDs.update((collections) => {
                if(!collections[collectionID]) collections[collectionID] = []
                collections[collectionID] = mergeArraysUnique(collections[collectionID], examsOrder)
                return collections
            })
        } else {
            activeExamsIDs.update((collections) => {
                collections[collectionID] = []
                return collections
            })
        }
    }
    function closeTab(){
        isExamsCutomizationTabVisible.set(false)
    }
</script>
    

<div class="customization-tab-container absolute top-0 left-0 bg-black/30 w-full h-full flex-center z-[1]" transition:fly={{ y: -30, duration: 400 }}>
    <div class="customization-tab relative h-9/10 w-9/10 bg-secondary-default rounded-lg border-4 border-solid border-secondary-light py-4 flex flex-col items-center justify-between inner-shadow" transition:fly={{ x: 40, duration: 600 }}>
        <div class="w-9/10 flex justify-between">
            <button 
                class="h-7 w-7 rounded-full bg-red-600 hover:bg-red-500 flex-center transition cursor-pointer outer-shadow" 
                on:click={ closeTab }
                transition:fly={{ y: -20, duration: 600 }} 
            >
                <svg class="w-4/10" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.5439 2L1.99994 19.1568" stroke="white" stroke-width="3" stroke-linecap="round"/>
                    <path d="M18.5957 19.2598L2.05121 2.10348" stroke="white" stroke-width="3" stroke-linecap="round"/>
                </svg>

            </button>
            <button 
                class="flex justify-start items-center gap-2" 
                transition:fly={{ x: 20, duration: 600 }}
                on:click={() => toggleAllExamsList() } 
            >
                <p class="text-xl transition" class:text-primary={isAllExamsChecked}>تحديد الكل</p>
                <input class="outer-shadow checkbox-input checked:border-primary" type="checkbox" bind:checked={isAllExamsChecked}>
            </button>
        </div>
        <div class="h-full w-full mt-5 py-4 flex flex-col justify-start items-center gap-5 overflow-y-auto scrollbar-thin" transition:fly={{ x: 40, duration: 500}}>
            {#each examsOrder as examID}
                {#if examID}
                    <ExamCard {collectionID} {exams} {examID} {collections} />
                {/if}
            {/each}
        </div>
        <div class="customization-tab-footer-container w-full flex-center" transition:fly={{ x: 50, duration: 600 }}>
            <button 
                class="h-12 w-9/10 rounded-lg bg-secondary-light border-2 border-solid border-primary transition 
                    text-xl font-bold flex-center cursor-pointer hover:bg-primary hover:text-secondary-default" 
                on:click={ closeTab } 
            >
                تم
            </button>
        </div>
    </div>
</div>

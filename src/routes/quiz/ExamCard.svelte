<script lang="ts">
    import { activeExamsIDs } from "$lib/stores"
    import type { CollectionsContainer, Exams } from "$lib/stores"
	import { onMount } from "svelte";

    export let collectionID: number
    export let collections: CollectionsContainer
    export let exams: Exams
    export let examID: number

    let isExamActive = false
    function updateActiveExamsIDs(){
        activeExamsIDs.update((collections)=> {
            if(collections[collectionID]?.includes(examID)){
                const newArr = collections[collectionID].filter((id) => id != examID)
                collections[collectionID] = newArr
            } else {
                if(!collections[collectionID]) collections[collectionID] = []
                collections[collectionID].push(examID)
            }
            return collections
        })

    }
    $: if($activeExamsIDs[collectionID]?.includes(examID)) isExamActive = true
        else isExamActive = false
</script>


<button 
    class="group exam-card w-10/12 min-h-14 bg-secondary-light rounded flex justify-between items-center 
    border-3 transition px-2 gap-2 hover:border-primary outer-shadow" 
    class:border-primary={isExamActive}
    class:border-secondary-light={!isExamActive}
    data-examID={examID} 
    data-collectionID={collectionID}
    on:click={()=>{ 
        updateActiveExamsIDs(); 
    }}
>
    <div class="text-xs text-zinc-400 w-2/10" dir="rtl">{exams[examID].numberOfQuestions} سؤال</div>
    <hr class="h-7/10">
    <div class="button-title w-8/10 flex justify-start items-center gap-2" dir="rtl">
        <input 
            type="checkbox"
            class="border-3 border-secondary-light min-w-5 min-h-5 transition checkbox-input checked:border-primary" 
            bind:checked={isExamActive}
        >
        <p class="text-sm">{exams[examID].name}</p>
    </div>
</button>








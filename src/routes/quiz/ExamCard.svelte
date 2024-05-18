<script lang="ts">
    import { checkActiveExamsList } from "./activeExamsList";
    import { activeExamsIDs } from "$lib/stores"
    import type { CollectionsContainer, Exams } from "$lib/stores"
	import { onMount } from "svelte";

    export let collections: CollectionsContainer
    export let exams: Exams
    export let examID: number
    let localActiveExamsIDs: number[] 

    
    activeExamsIDs.subscribe((value)=> localActiveExamsIDs = value)
    let isExamActive = false
    function updateActiveExamsIDs(){
        activeExamsIDs.update((value)=> {
            if(value.includes(examID)){
                return value.filter((id)=> id != examID)
            } else {
                return [...value, examID]
            }
        })

    }

    $: {
        isExamActive = false
        for(const exam of Object.keys(exams)){
            if(localActiveExamsIDs.includes(parseInt(exam))){
                isExamActive = true
                break
            }
        }
    }
    onMount(()=> checkActiveExamsList(collections))
</script>


<button 
    class="group exam-card w-10/12 min-h-14 bg-secondary-light rounded flex justify-between items-center border-3 
    border-secondary-light transition px-2 gap-2 hover:border-primary outer-shadow" 
    data-id={examID} 
    on:click={()=>{ 
        updateActiveExamsIDs(); 
        checkActiveExamsList(collections) 
    }}
>
    <div class="text-xs text-zinc-400 w-2/10" dir="rtl">{exams[examID].numberOfQuestions} سؤال</div>
    <hr class="h-7/10">
    <div class="button-title w-8/10 flex justify-start items-center gap-2" dir="rtl">
        <input class="border-3 border-secondary-light min-w-5 min-h-5 transition checkbox-input checked:border-primary" type="checkbox">
        <p class="text-sm">{exams[examID].name}</p>
    </div>
</button>








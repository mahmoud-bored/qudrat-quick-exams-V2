<script lang="ts">
    import { checkActiveExamsList } from "./activeExamsList";
    import { activeExamsIDs } from "$lib/stores"
    import type { CollectionContainer, Exams } from "$lib/stores"
	import { onMount } from "svelte";

    export let collections: CollectionContainer
    export let exams: Exams
    export let examID: string
    let localActiveExamsIDs: string[] 
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
        for(const exam of Object.keys(exams.examsIDs)){
            if(localActiveExamsIDs.includes(exam)){
                isExamActive = true
                break
            }
        }
    }
    onMount(()=> checkActiveExamsList(collections) )
</script>


<button class="exam-card" data-id={examID} on:click={()=>{ updateActiveExamsIDs(); checkActiveExamsList(collections) }}>
    <div class="button-subtxt">{exams.examsIDs[examID].numberOfQuestions} سؤال</div>
    <hr>
    <div class="button-title">
        <input type="checkbox">
        <p>{exams.examsIDs[examID].name}</p>
    </div>
</button>







<style lang="sass">
    @import '$lib/assets/app.sass'
    .exam-card
        width: 85%
        min-height: 50px
        background-color: $color-bg-secondary
        border-radius: 10px
        display: flex
        justify-content: space-between
        align-items: center
        border: 3px solid 
        border-color: $color-bg-secondary
        transition: all 0.2s ease
        padding: 0 10px
        gap: 10px
        @include outer-shadow()
        @media (hover: hover)
            &:hover
                border-color: $color-primary
                .button-title
                    input
                        border: 3px solid $color-primary
        .button-subtxt
            font-size: 0.8em
            color: #979797
            direction: rtl
            width: 19%
        hr
            height: 70%
        .button-title
            width: 80%
            display: flex
            justify-content: flex-start
            align-items: center
            direction: rtl
            gap: 10px
            p
                font-size: 0.9em
            input
                border: 3px solid $color-bg-secondary
                min-width: 20px
                min-height: 20px
</style>
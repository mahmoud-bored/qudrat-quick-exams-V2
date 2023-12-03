<script lang="ts">
    import { isExamsCutomizationTabVisible, examsCollectionCustomizeTab, activeExamsIDs } from "$lib/stores"
    import type { CollectionContainer } from "$lib/stores";
    import { checkActiveExamsList } from "./activeExamsList";
	import { onMount } from "svelte";

    export let collectionID: string
    export let collections: CollectionContainer

    let isCardMounted = false
    onMount(()=> { setTimeout(() => { isCardMounted = true }, 50) })

    const collectionObj = collections[collectionID]
    const collectionObjInfo = collectionObj['info']
    let collectionQuestionsAmount = 0
    for(const exam of Object.keys(collectionObj['exams'])){
        collectionQuestionsAmount += parseInt(collectionObj['exams'][exam]['numberOfQuestions'])
    }
    let localActiveExamsIDs: string[]
    let isCollectionActive = false
    activeExamsIDs.subscribe((value)=> localActiveExamsIDs = value)
    // check if the collection is active
    $: {
        isCollectionActive = false
        for(const exam of Object.keys(collectionObj['exams'])){
            if(localActiveExamsIDs.includes(exam)){
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
                localActiveExamsIDs.splice(localActiveExamsIDs.indexOf(exam), 1)
                isCollectionActive = false
            }
        } else {
            for(const exam of Object.keys(collectionObj['exams'])){
                // add exam to localActiveExamsIDs
                localActiveExamsIDs.push(exam)
                isCollectionActive = true
            }
        }
        // update activeExamsIDs
        setActiveExams(localActiveExamsIDs)
    }
    function setActiveExams(arr: string[]){ activeExamsIDs.set(arr) }
    function showCustomizationTab(){ isExamsCutomizationTabVisible.set(true) }
    function setExamsCollection(){ examsCollectionCustomizeTab.set(collectionObj) }
</script>

<div class="collection-container" data-id={collectionID} class:collection-container-mounted={isCardMounted}>
    <div class="left-side-container">
        <button class="collection-customize-button" on:click={()=> { setExamsCollection(); showCustomizationTab(); checkActiveExamsList(collections); }}>تخصيص</button>
        <p>{collectionQuestionsAmount} سؤال</p>
    </div>
    <hr>
    <button class="right-side-container"  on:click={()=> { addOrRemoveExamFromActiveExamsIDs(); checkActiveExamsList(collections) } }>
        <p>{collectionObjInfo['collectionName']}</p>
        <input type="checkbox" bind:checked={isCollectionActive}>
    </button>
</div>

<style lang="sass">
    @import '$lib/assets/app.sass'
    .collection-container
        padding: 5px 15px
        min-height: 55px
        width: 90%
        border-radius: 5px
        background-color: $color-bg-secondary
        display: flex
        justify-content: space-evenly
        align-items: center
        gap: 7px
        margin-left: 70px
        margin-top: -20px
        opacity: 0
        transition: all 0.4s ease-out
        border: 3px solid transparent
        @include outer-shadow()
        div, button
            width: 100%
            display: flex
            align-items: center
        .left-side-container
            justify-content: space-between
            .collection-customize-button
                width: 50%
                border-radius: 5px
                border: 2px solid $color-primary
                display: flex
                justify-content: center
                align-items: center
                font-size: min(3.5vw, 0.9em)
                transition: all 0.2s ease
                cursor: pointer
                pointer-events: all
                @media (hover: hover)
                    &:hover
                        background-color: $color-primary
                        color: $color-bg-secondary
            p
                font-size: min(4.5vw, 0.8rem)
                color: #979797
                direction: rtl
        .right-side-container
            justify-content: flex-end
            gap: 10px
            font-size: min(4.5vw, 1.2rem)
            cursor: pointer
            pointer-events: all
            input
                border: 3px solid $color-bg-secondary
                min-width: 20px
                min-height: 20px
        hr
            height: 90%
        @media (hover: hover)
            &:hover
                border-color: $color-primary
                background-color: lighten($color-bg-secondary, 3%)
                .right-side-container
                    input
                        border: 3px solid $color-primary
    .collection-container-mounted
        margin-left: 0
        margin-top: 0
        opacity: 1

</style>
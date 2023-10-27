<script lang="ts">
    import { fly } from 'svelte/transition'
    import CollectionCard from './CollectionCard.svelte'
    import ExamsCustomizationTab from "./ExamsCustomizationTab.svelte"
    import { isExamsCutomizationTabVisible, examsCollectionCustomizeTab, collections, collectionsOrder, activeExamsIDs, maxQuestionAmount } from "$lib/stores.ts"
    import TypeWriter from '$lib/assets/TypeWriter.svelte'
    import type { Collection } from '$lib/stores.ts';
    export let noRepeat = true

    // Update Active state of CollectionCards and ExamsCards



    // Update Active state of questionAmountButtons
    let questionsAmount: number
    $: {
        try{        
            document.querySelectorAll('.question-amount-btn').forEach((btn)=>{
                btn.classList.remove('active')
            })
            document.querySelector(`.question-amount-btn[data-value="${questionsAmount}"]`)?.classList.add('active')
        } catch(e){console.log(e)}

    }

    let isExamQuestionsCustomizationVisible: boolean
    let examsCollectionObj: Collection
    let localActiveExamsIDs: string[]
    let localMaxQuestionAmount: number

    isExamsCutomizationTabVisible.subscribe((value)=> isExamQuestionsCustomizationVisible = value)
    examsCollectionCustomizeTab.subscribe((value)=> examsCollectionObj = value)
    activeExamsIDs.subscribe((value)=> localActiveExamsIDs = value)
    maxQuestionAmount.subscribe((value)=> localMaxQuestionAmount = value)

</script>


<div class="exam-customization">
    {#if isExamQuestionsCustomizationVisible}
        <ExamsCustomizationTab collectionObj={examsCollectionObj}/>
    {/if}
    <div class="exam-customization-header" transition:fly={{ x: -200, duration: 400 }}>
        <hr>
        <h2>بنك اسئلة اللفظي</h2>
        <div class="exam-customization-collections-container">
            {#each collectionsOrder as collectionID}
                {#if Object.keys(collections[collectionID]['exams']).length != 0}
                    <CollectionCard {collectionID} {collections} />
                {/if}

            {/each}

        </div>
    </div>
    <div class="exam-customization-questions-repeat-container" transition:fly={{ x: -200, duration: 600 }}>
        <h2>تكرار الأسئلة</h2>
        <button class="exam-customization-questions-repeat-input-container active" on:click={() => {
            noRepeat = !noRepeat
            document.querySelector('.exam-customization-questions-repeat-input-container')?.classList.toggle('active')
        }}>
            <h2>عدم تكرار الأسئلة</h2>
            <input type="checkbox" bind:checked={noRepeat}/>
        </button>
    </div>
    <div class="exam-customization-questions-amount-container" transition:fly={{ x: -200, duration: 500 }}>
        <div class="exam-customization-questions-amount-header-container">
            <h2>عدد الأسئلة</h2>
                {#if noRepeat}
                    <p><TypeWriter speed={3}>الحد الأقصى: </TypeWriter> <TypeWriter speed={2}>{localMaxQuestionAmount}</TypeWriter></p>
                {/if}
        </div>
        <div class="exam-customization-questions-amount-input-container">
            <button class="question-amount-btn" data-value="15" on:click={()=> questionsAmount = 15 }>15</button>
            <button class="question-amount-btn" data-value="30" on:click={()=> questionsAmount = 30 }>30</button>
            <button class="question-amount-btn" on:click={()=> questionsAmount = 0 }>الكل</button>
            <input class="questions-amount-input" bind:value={questionsAmount} type="number" placeholder="مخصص">
        </div>
    </div>

</div>

<style lang="sass">
    @import '$lib/assets/app.sass'
    .exam-customization
        height: 100%
        display: flex
        flex-direction: column
        justify-content: flex-start
        gap: 30px
        .exam-customization-header
            height: 50%
            width: 100%
            text-align: center
            display: flex
            flex-direction: column
            align-items: center
            gap: 10px
            hr
                width: 30%
                border: 2px solid $color-bg-primary
                border-radius: 10px
                margin: 0
            .exam-customization-collections-container
                height: 100%
                width: 100%
                background-color: $color-bg-primary
                border-radius: 10px
                padding-top: 15px
                display: flex
                flex-direction: column
                justify-content: flex-start
                align-items: center
                gap: 20px
                overflow-y: auto
                scrollbar-width: thin
                @include inner-shadow()
        .exam-customization-questions-repeat-container
            height: min(20%, 100px)
            width: 100%
            display: flex
            flex-direction: column
            align-items: flex-end
            transition: all 0.2s ease
            .exam-customization-questions-repeat-input-container
                height: 60px
                width: calc(100% - 30px)
                padding: 0 15px
                display: flex
                justify-content: flex-end
                align-items: center
                gap: 10px
                background-color: $color-bg-primary
                border: 3px solid
                border-color: $color-bg-secondary
                transition: all 0.2s ease
                border-radius: 10px
                cursor: pointer
                @include inner-shadow()
                h2
                    font-size: min(6vw, 1.5em)
                    text-shadow: 3px 4px 7px rgba(0, 0, 0, 0.4)
                input
                    width: 25px
                    height: 25px
                @media (hover: hover)
                    &:hover
                        background-color: lighten($color-bg-primary, 5%)
            .active
                border-color: $color-primary
        .exam-customization-questions-amount-container
            height: min(20%, 100px)
            width: 100%
            display: flex
            flex-direction: column
            align-items: flex-end
            .exam-customization-questions-amount-header-container
                width: 100%
                display: flex
                justify-content: flex-start
                align-items: center
                gap: 10px
                direction: rtl
                h2
                    font-size: min(6vw, 1.5em)
                    text-shadow: 3px 4px 7px rgba(0, 0, 0, 0.4)
                p
                    font-size: min(3.5vw, 1rem)
                    display: flex
                    color: #979797
                    direction: rtl
                    margin-bottom: 5px
                    gap: 3px
            .exam-customization-questions-amount-input-container
                height: 60px
                width: 100%
                display: flex
                justify-content: space-evenly
                align-items: center
                background-color: $color-bg-primary
                border-radius: 10px
                @include inner-shadow()
                button
                    height: 40px
                    width: 15%
                    border-radius: 7px
                    background-color: $color-bg-secondary
                    color: #fff
                    transition: all 0.2s ease-in-out
                    font-size: min(4.5vw, 1.2rem)
                    font-weight: 800
                    display: flex
                    justify-content: center
                    align-items: center
                    cursor: pointer
                    @media (hover: hover)
                        &:hover
                            background-color: $color-primary
                            color: $color-bg-primary
                input
                    width: 20%
                    height: 40px
                    padding: 0 10px
                    border-radius: 7px
                    background-color: #fff
                    color: $color-bg-primary
                .active
                    background-color: $color-primary
                    color: $color-bg-primary
                *
                    @include outer-shadow()

</style>
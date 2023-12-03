<script lang="ts">
	import { fade, fly } from "svelte/transition"
    import closeIconSrc from '$lib/assets/close-icon.svg'
    import { isExamsCutomizationTabVisible, isSelectAllButtonActive } from "$lib/stores"
    import type { Collection, CollectionContainer, CollectionInfo, Exams } from '$lib/stores'
    import { toggleAllExamsListInCustomizationTab } from "./activeExamsList"
    import ExamCard from "./ExamCard.svelte"

    export let collections: CollectionContainer
    export let collectionObj: CollectionInfo

    let selectAllState: boolean
    isSelectAllButtonActive.subscribe((value)=> selectAllState = value)

    const examsOrder = collectionObj.examsOrder;
    const exams: Exams = {
        examsIDs: collectionObj.exams
    };

    function closeTab(){
        isExamsCutomizationTabVisible.set(false)
    }
</script>
    

<div class="customization-tab-container" transition:fly={{ y: -30, duration: 400 }}>
    <div class="customization-tab" transition:fly={{ x: 40, duration: 600 }}>
        <div class="customization-tab-header-container">
            <button 
                class="close-button-container" 
                on:click={ closeTab }
                transition:fly={{ y: -20, duration: 600 }} 
            >
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.5439 2L1.99994 19.1568" stroke="white" stroke-width="3" stroke-linecap="round"/>
                    <path d="M18.5957 19.2598L2.05121 2.10348" stroke="white" stroke-width="3" stroke-linecap="round"/>
                </svg>

            </button>
            <button class="select-all-button" on:click={ ()=> toggleAllExamsListInCustomizationTab(collections) } transition:fly={{ x: 20, duration: 600 }} >
                <p class:active={selectAllState}>تحديد الكل</p>
                <input type="checkbox" bind:checked={selectAllState}>
            </button>
        </div>
        <div class="customization-tab-body-container" transition:fly={{ x: 40, duration: 500}}>
            {#each examsOrder as examID}
                <ExamCard {exams} {examID} {collections} />
            {/each}
        </div>
        <div class="customization-tab-footer-container" transition:fly={{ x: 50, duration: 600 }}>
            <button on:click={ closeTab } >تم</button>
        </div>
    </div>
</div>




<style lang="sass">
    @import '$lib/assets/app.sass'
    .customization-tab-container
        position: absolute
        top: 0
        left: 0
        background-color: rgba(0, 0, 0, 0.3)
        width: 100%
        height: 100%
        display: flex
        justify-content: center
        align-items: center
        .customization-tab
            position: relative
            height: 90%
            width: 90%
            background-color: $color-bg-primary
            border-radius: 10px
            border: 4px solid $color-bg-secondary
            padding: 15px 0
            display: flex
            flex-direction: column
            justify-content: space-between
            align-items: center
            @include inner-shadow()
            .customization-tab-header-container
                width: 90%
                display: flex
                justify-content: space-between
                .close-button-container
                    height: 30px
                    width: 30px
                    border-radius: 50%
                    background-color: #CE3030
                    display: flex
                    justify-content: center
                    align-items: center
                    transition: all 0.2s ease
                    cursor: pointer
                    box-shadow: 2px 4px 16px -6px rgba(0, 0, 0, 0.75)
                    -webkit-box-shadow: 2px 4px 16px -6px rgba(0, 0, 0, 0.75)
                    -moz-box-shadow: 2px 4px 16px -6px rgba(0, 0, 0, 0.75)
                    svg
                        width: 40%
                        margin-right: 1px
                    @media (hover: hover)
                        &:hover
                            background-color: #FF3030
                .select-all-button
                    display: flex
                    justify-content: flex-start
                    align-items: center
                    gap: 10px
                    font-size: 1.2em
                    text-shadow: 3px 5px 5px rgba(0, 0, 0, 0.4)
                    p
                        transition: all 0.2s ease
                    .active
                        color: $color-primary
                    input
                        box-shadow: 3px 5px 9px -2px rgba(0, 0, 0, 0.75)
                        -webkit-box-shadow: 3px 5px 9px -2px rgba(0, 0, 0, 0.75)
                        -moz-box-shadow: 3px 5px 9px -2px rgba(0, 0, 0, 0.75)

            .customization-tab-body-container
                height: 100%
                width: 100%
                margin-top: 20px
                display: flex
                flex-direction: column
                justify-content: flex-start
                align-items: center
                gap: 20px
                overflow-y: auto
                scrollbar-width: thin
            .customization-tab-footer-container
                width: 100%
                display: flex
                justify-content: center
                align-items: center
                button
                    height: 50px
                    width: 90%
                    border-radius: 7px
                    background-color: $color-bg-secondary
                    border: 2px solid $color-primary
                    color: $color-primary
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



</style>
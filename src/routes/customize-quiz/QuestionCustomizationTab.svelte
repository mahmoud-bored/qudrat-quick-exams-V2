<script lang="ts">
    import { fly } from 'svelte/transition'
    import CollectionCard from './CollectionCard.svelte'
    import ExamsCustomizationTab from "./ExamsCustomizationTab.svelte"
    import { 
        isExamsCutomizationTabVisible, 
        examsCollectionCustomizeTab, 
        activeExamsIDs, 
        maxQuestionAmount, 
        globalQuestionsAmount, 
        questionNoRepeat, 
        adminID, 
        globalCollections, 
        globalCollectionsOrder,
        questionsVersion,
        paragraphsVersion
    } from "$lib/stores"
    import type { CollectionContainer, CollectionInfo } from '$lib/stores';
    import { checkActiveExamsList } from "./activeExamsList";
	import { onMount } from 'svelte';
    import { getCollectionsData } from './getData'
	import ErrorIcon from '$lib/assets/error-icon.svg'


    export let examListWarning: boolean
    export let questionsAmountWarning: boolean
    export let noRepeat = true

    let isCollectionsDataReady: boolean | string = false
    let collections: CollectionContainer
    let collectionsOrder: string[]
    if(Object.keys($globalCollections).length == 0) {
        getCollectionsData().then((data)=>{
            collections = data?.[adminID]['collections']['collections']
            collectionsOrder = data?.[adminID]['collections']['order']

            questionsVersion.set(data?.[adminID]['versions']['questionsVersion'])
            paragraphsVersion.set(data?.[adminID]['versions']['paragraphsVersion'])
            globalCollections.set(collections)
            globalCollectionsOrder.set(collectionsOrder)

            isCollectionsDataReady = true
        }).catch((e) => {
            console.log(e)
            isCollectionsDataReady = "Error"
        })
    }else {
        collections = $globalCollections
        collectionsOrder = $globalCollectionsOrder
        isCollectionsDataReady = true
    }

    

    $: questionNoRepeat.set(noRepeat)
    $: { if(questionsAmount === undefined) { globalQuestionsAmount.set(0) }
        else { globalQuestionsAmount.set(questionsAmount) }
    }



    let questionsAmount = $globalQuestionsAmount
    onMount(()=> {
        questionsAmount = $globalQuestionsAmount
        document.querySelector('.questions-amount-input')?.setAttribute("value", questionsAmount.toString())
        setActiveQuestionAmountButtonActive()
        checkActiveExamsList(collections)
    })
    function setActiveQuestionAmountButtonActive(){
        document.querySelectorAll('.question-amount-btn').forEach((btn)=>{
                btn.classList.remove('active')
            })
        if(questionsAmount != 0){ document.querySelector(`.question-amount-btn[data-value="${questionsAmount}"]`)?.classList.add('active') }
    }
    // Update Active state of questionAmountButtons
    $: {
        try{
            questionsAmount = questionsAmount
            setActiveQuestionAmountButtonActive()
        } catch(e) { }
    }

    let isExamQuestionsCustomizationVisible: boolean
    let examsCollectionObj: CollectionInfo
    let localActiveExamsIDs: string[]

    isExamsCutomizationTabVisible.subscribe((value)=> isExamQuestionsCustomizationVisible = value)
    examsCollectionCustomizeTab.subscribe((value)=> examsCollectionObj = value)
    activeExamsIDs.subscribe((value)=> localActiveExamsIDs = value)

</script>


<div class="exam-customization">
    {#if isExamQuestionsCustomizationVisible}
        <ExamsCustomizationTab collectionObj={examsCollectionObj} {collections}/>
    {/if}
    <div class="exam-customization-header" transition:fly={{ x: -200, duration: 400 }}>
        <hr>
        <h2>بنك اسئلة اللفظي</h2>
        <div class="exam-customization-collections-container" class:collections-container-warning={examListWarning}>
            {#if isCollectionsDataReady == false}
                <div class="ring">
                    Loading
                    <span></span>
                </div>
            {:else if isCollectionsDataReady == true}
                {#each collectionsOrder as collectionID}
                    {#if Object.keys(collections[collectionID]['exams']).length != 0}
                        <CollectionCard {collectionID} {collections} />
                    {/if}
                {/each}
            {:else if isCollectionsDataReady == "Error"}
                <div class="exam-customization-collections-error-container">
                    <p>حدث خطأ. يرجى إعادة تحميل الصفحة</p>
                    <img src="{ErrorIcon}" alt=" ">
                </div>
            {/if}

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
                    <p in:fly={{ y: -5, duration: 500 }} out:fly={{ y: 5, duration: 500 }}>الحد الأقصى: {$maxQuestionAmount}</p>
                {/if}
        </div>
        <div class="exam-customization-questions-amount-input-container" class:questions-amount-warning={questionsAmountWarning}>
            <button class="question-amount-btn" data-value="15" on:click={()=> questionsAmount = 15 }>15</button>
            <button class="question-amount-btn" data-value="30" on:click={()=> questionsAmount = 30 }>30</button>
            <button class="question-amount-btn" data-value="{$maxQuestionAmount}" on:click={()=> questionsAmount = $maxQuestionAmount }>الكل</button>
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
                overflow-x: hidden
                overflow-y: auto
                scrollbar-width: thin
                box-shadow: 0 0 0 0 #000
                -webkit-box-shadow: 0 0 0 0 #000
                -moz-box-shadow: 0 0 0 0 #000
                transition: all ease 0.2s
                // Throbber Style
                .ring
                    position: relative
                    width: 150px
                    height: 150px
                    background: transparent
                    border: 3px solid #3c3c3c
                    border-radius: 50%
                    text-align: center
                    line-height: 150px
                    font-family: sans-serif
                    font-size: 20px
                    color: #009759
                    letter-spacing: 4px
                    text-transform: uppercase
                    text-shadow: 0 0 10px #009759
                    box-shadow: 0 0 20px rgba(0,0,0,.5)
                    margin-block: auto
                    top: -10px
                    &:before
                        content: ''
                        position: absolute
                        top: -3px
                        left: -3px
                        width: 100%
                        height: 100%
                        border: 3px solid transparent
                        border-top: 3px solid #009759
                        border-right: 3px solid #009759
                        border-radius: 50%
                        animation:  animateC 2s linear infinite
                    span
                        display: block
                        position: absolute
                        top: calc(50% - 2px)
                        left: 50%
                        width: 50%
                        height: 4px
                        background: transparent
                        transform-origin: left
                        animation:  animate 2s linear infinite
                        &:before
                            content: ''
                            position:  absolute
                            width: 16px
                            height: 16px
                            border-radius: 50%
                            background: #009759
                            top: -6px
                            right: -8px
                            box-shadow: 0 0 20px #009759

                    @keyframes animateC
                        from
                            transform: rotate(0deg)

                        to
                            transform: rotate(360deg)


                    @keyframes animate
                        0%
                            transform: rotate(45deg)

                        100%
                            transform: rotate(405deg)
                .exam-customization-collections-error-container
                    height: 100%
                    width: 100%
                    display: flex
                    flex-direction: column
                    justify-content: center
                    align-items: center
                    gap: 20px
                    font-size: 1.1em
                    color: #ff4141
                    img
                        width: 50%
                        height: 50%
            .collections-container-warning
                @include warning-shadow()
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
                    width: auto
                    height: 50%
                    aspect-ratio: 1 / 1
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
                transition: all ease 0.2s
                box-shadow: 0 0 0 0 #000
                -webkit-box-shadow: 0 0 0 0 #000
                -moz-box-shadow: 0 0 0 0 #000
                button
                    height: 70%
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
                    height: 70%
                    padding: 0 10px
                    border-radius: 7px
                    background-color: #fff
                    color: $color-bg-primary
                .active
                    background-color: $color-primary
                    color: $color-bg-primary
                *
                    @include outer-shadow()
            .questions-amount-warning
                @include warning-shadow()

</style>
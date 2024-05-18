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
        globalCollections, 
        globalCollectionsOrder
    } from "$lib/stores"
    import type { CollectionsContainer, CollectionInfo } from '$lib/stores';
    import { checkActiveExamsList } from "./activeExamsList";
	import { onMount } from 'svelte';


    export let examListWarning = false
    export let questionsAmountWarning = false
    export let noRepeat = true
    export let nextButtonElement: HTMLButtonElement
    export let isCollectionsDataReady: boolean | string

    let collections: CollectionsContainer
    let collectionsOrder: number[]

    $: collections = $globalCollections
    $: collectionsOrder = $globalCollectionsOrder

    $: questionNoRepeat.set(noRepeat)
    $: { if(questionsAmount === undefined) { globalQuestionsAmount.set(0) }
        else { globalQuestionsAmount.set(questionsAmount) }
    }



    let questionsAmount = $globalQuestionsAmount
    onMount(()=> {
        questionsAmount = $globalQuestionsAmount
        document.querySelector('.questions-amount-input')?.setAttribute("value", questionsAmount.toString())
        checkActiveExamsList(collections)
    })
    let isExamQuestionsCustomizationVisible: boolean
    let examsCollectionObj: CollectionInfo
    let localActiveExamsIDs: number[]

    isExamsCutomizationTabVisible.subscribe((value)=> isExamQuestionsCustomizationVisible = value)
    examsCollectionCustomizeTab.subscribe((value)=> examsCollectionObj = value)
    activeExamsIDs.subscribe((value)=> localActiveExamsIDs = value)

    const selectAll = (e: Event) => {
        (e.target as HTMLInputElement)?.select()
    }
</script>

<svelte:window on:keydown={(e) => {
    if(e.key === "Enter") nextButtonElement.focus()
}} />

<div class="h-full flex flex-col justify-start gap-7 p-5">
    {#if isExamQuestionsCustomizationVisible}
        <ExamsCustomizationTab collectionObj={examsCollectionObj} {collections}/>
    {/if}
    <div 
        class="min-h-[165px] h-1/2 w-full text-center flex flex-col items-center gap-2" 
        transition:fly={{ x: -200, duration: 400 }}
    >
        <hr class="w-1/3 border-solid border-2 border-secondary-default rounded-xl">
        <h2 class="text-2xl">بنك اسئلة اللفظي</h2>
        <div 
            class="h-full w-full bg-secondary-default rounded-lg py-4 flex flex-col justify-start items-center
                gap-5 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-primary shadow transition ease-linear" 
            class:warning-shadow={examListWarning}
        >
            {#if isCollectionsDataReady === false}
                <div class="ring">
                    Loading
                    <span></span>
                </div>
            {:else if isCollectionsDataReady === true}
                {#each collectionsOrder as collectionID}
                    {#if collectionID && collections[collectionID].info.numberOfExams !== 0}
                        <CollectionCard {collectionID} {collections} />
                    {/if}
                {/each}
            {:else if isCollectionsDataReady === "Error"}
                <div class="h-full w-full flex-center flex-col gap-5">
                    <p class="text-lg text-red-500" dir="rtl">حدث خطأ، يرجى إعادة تحميل الصفحة أو المحاولة لاحقا.</p>
                    <svg class="w-1/2 h-1/2" width="424" height="444" viewBox="0 0 424 444" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M208.59 240.56C210.151 238.015 213.849 238.015 215.41 240.56L304.393 385.659C306.028 388.324 304.11 391.75 300.983 391.75H123.016C119.89 391.75 117.972 388.324 119.607 385.659L208.59 240.56Z" fill="#EA3435"/><rect width="424" height="305" rx="19" fill="#FF6B6B"/><g filter="url(#filter0_d_162_16)"><path d="M288 61L327 100" stroke="#EA3435" stroke-width="11" stroke-linecap="round"/></g><g filter="url(#filter1_d_162_16)"><path d="M96 61L135 100" stroke="#EA3435" stroke-width="11" stroke-linecap="round"/></g><g filter="url(#filter2_d_162_16)"><path d="M327 61L288 100" stroke="#EA3435" stroke-width="11" stroke-linecap="round"/></g><g filter="url(#filter3_d_162_16)"><path d="M135 61L95.9996 100" stroke="#EA3435" stroke-width="11" stroke-linecap="round"/></g><g filter="url(#filter4_d_162_16)"><path d="M212 108L211.565 168" stroke="#E4EAF8" stroke-width="15" stroke-linecap="round"/></g><g filter="url(#filter5_d_162_16)"><circle cx="211.5" cy="189.5" r="7.5" fill="#E4EAF8"/></g><path d="M136.001 266.393C148.996 258.499 170 246.239 203.617 236.824C235.673 227.847 255.996 226.878 272.431 226.879" stroke="#E4EAF8" stroke-width="9" stroke-linecap="round"/><defs><filter id="filter0_d_162_16" x="278.5" y="55.5" width="58" height="58" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="4"/><feGaussianBlur stdDeviation="2"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_162_16"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_162_16" result="shape"/></filter><filter id="filter1_d_162_16" x="86.5" y="55.5" width="58" height="58" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="4"/><feGaussianBlur stdDeviation="2"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_162_16"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_162_16" result="shape"/></filter><filter id="filter2_d_162_16" x="278.5" y="55.5" width="58" height="58" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="4"/><feGaussianBlur stdDeviation="2"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_162_16"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_162_16" result="shape"/></filter><filter id="filter3_d_162_16" x="86.5" y="55.5" width="58" height="58" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="4"/><feGaussianBlur stdDeviation="2"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_162_16"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_162_16" result="shape"/></filter><filter id="filter4_d_162_16" x="200.064" y="100.5" width="23.4355" height="83" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="4"/><feGaussianBlur stdDeviation="2"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_162_16"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_162_16" result="shape"/></filter><filter id="filter5_d_162_16" x="200" y="182" width="23" height="23" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="4"/><feGaussianBlur stdDeviation="2"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_162_16"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_162_16" result="shape"/></filter></defs>
                    </svg>
                </div>
            {/if}

        </div>
    </div>
    <div class="h-1/2 flex flex-col justify-around min-h-48">
        <div class="h-[min(50%,100px)] w-full flex flex-col items-end transition opacity-50 pointer-events-none" transition:fly={{ x: -200, duration: 600 }}>
            <p class="text-2xl">تكرار الأسئلة</p>
            <button 
                class="inner-shadow h-16 w-full px-4 flex justify-end items-center gap-3 bg-secondary-default border-3 
                border-solid transition rounded-lg cursor-pointer" 
                class:border-primary={noRepeat}
                on:click={() => noRepeat = !noRepeat }
            >
                <p class="text-xl">عدم تكرار الأسئلة</p>
                <input class="h-1/2 checkbox-input checked:border-primary" type="checkbox" bind:checked={noRepeat}/>
            </button>
        </div>
        <div class="h-[min(50%,100px)] w-full flex flex-col items-end" transition:fly={{ x: -200, duration: 500 }}>
            <div class="w-full flex justify-start items-center gap-3" dir="rtl">
                <p class="text-2xl">عدد الأسئلة</p>
                    {#if noRepeat}
                        <p class="text-base text-zinc-400" in:fly={{ y: -5, duration: 500 }} out:fly={{ y: 5, duration: 500 }}>الحد الأقصى: {$maxQuestionAmount}</p>
                    {/if}
            </div>
            <div 
                class=" *:outer-shadow h-[60px] w-full flex justify-evenly items-center 
                    rounded-lg bg-secondary-default transition" 
                class:warning-shadow={questionsAmountWarning}>
                <button 
                    class="question-amount-btn" 
                    data-value="15" 
                    class:active={questionsAmount == 15}
                    on:click={()=> questionsAmount = 15}
                >
                    15
                </button>
                <button
                    class="question-amount-btn"  
                    data-value="30"
                    class:active={questionsAmount == 30} 
                    on:click={()=> questionsAmount = 30}
                >
                    30
                </button>
                <button 
                    class="question-amount-btn"
                    data-value="{$maxQuestionAmount}" 
                    class:active={(questionsAmount == $maxQuestionAmount) && (questionsAmount != 0)}
                    on:click={()=> {
                        if($maxQuestionAmount == 0 || $maxQuestionAmount === undefined){
                            examListWarning = true
                            setTimeout(() => examListWarning = false, 1000)
                        }else {
                            questionsAmount = $maxQuestionAmount
                        }
                    }}
                >
                    الكل
                </button>
                <input 
                    lang="en"
                    dir="rtl"
                    class="questions-amount-input input-hide-arrows w-2/10 h-7/10 px-3 bg-white text-secondary-default rounded-lg"
                    on:focus={selectAll}
                    bind:value={questionsAmount} 
                    type="number" 
                    placeholder="مخصص"
                >
            </div>
        </div>

    </div>

</div>
<style lang="sass">
@import '$lib/assets/chromeScrollbarStyle.sass'
@include chrome-scrollbar(#057b4a, #333)
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
        width: inherit
        height: inherit
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
.question-amount-btn
    @apply h-7/10 w-[15%] rounded-lg bg-secondary-light text-white transition text-xl 
    @apply font-bold flex-center hover:cursor-pointer hover:bg-primary hover:text-secondary-default
.active
    @apply bg-primary text-secondary-default
</style>
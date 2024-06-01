<script lang="ts">
    import { fade, fly } from 'svelte/transition'
    import TypeWriter from '$lib/assets/TypeWriter.svelte'
    import QuestionCustomizationTab from './QuestionCustomizationTab.svelte'
    import ThemeCustomizationTab from './ThemeCustomizationTab.svelte'
    import { injectDOMErrorMessage } from './injectDOMErrorMessage.ts'
    import { activeExamsIDs, featureFlags, isExamCustomized, questionsObject, paragraphsObject, type CollectionsContainer, globalQuestionsAmount } from '$lib/stores.ts'
    import type { RedisDB, Question } from '$lib/databaseInterfaces.ts'
	import { goto } from '$app/navigation'
    import { isExamListValid, isExamQuestionAmountValid } from './checkInfo.ts'
	import { onMount } from 'svelte'
	import { loadDatabase, loadDbDataIntoStores, loadInitialDbDataIntoStores } from './database.ts';
    export let data
    const redisDB: RedisDB = data.redisDB
    let isExamQuestionsCustomizationVisible = true
    let isExamThemeCustomizationVisible = false
    featureFlags.set(data.featureFlags)

    let collections: CollectionsContainer
    let collectionsOrder: number[]
    let isInitialDataReady: boolean | 'Error' = false
    let isDataReady: boolean | 'Error' = false
    onMount(async () => {
        globalQuestionsAmount.set(0)
        const initialTables = {
            exam: redisDB.exam,
            collection: redisDB.collection,
            deleted_record: redisDB.deleted_record,
        }
        const initialDbDataLoad = await loadDatabase(initialTables, data.course_id)
            .then(initialDbData => {
                const { collectionsData: data, collectionsOrder: order } = loadInitialDbDataIntoStores(initialDbData)

                // const { collectionsData: data, collectionsOrder: order } = loadDbDataIntoStores(dbData)
                collections = data
                collectionsOrder = order
                isInitialDataReady = true
                console.log(initialDbData)
            }).catch((err) => {
                console.log(err)
                isInitialDataReady = "Error"
            })
        const fullDataTables = { ...redisDB }
        delete fullDataTables['collection']
        const fullDbDataLoad = await loadDatabase(fullDataTables, data.course_id)
            .then(dbData => {
                loadDbDataIntoStores(dbData)
                console.log(dbData)
                isDataReady = true
            }).catch((err) => {
                console.log(err)
                isDataReady = "Error"
            })
    })
    let examListWarning = false
    function handleExamListError(){
        injectDOMErrorMessage('يجب اختيار اختبار واحد على الأقل')
        // Show Red Shadow arround the Error Area in the DOM
        examListWarning = true
        setTimeout(() => examListWarning = false, 1500)
    }
    let questionsAmountWarning = false
    function handleExamQuestionsAmountError(){
        injectDOMErrorMessage('يجب ان يكون عدد الأسئلة واحد او اكثر')
        // Show Red Shadow arround the Error Area in the DOM
        questionsAmountWarning = true
        setTimeout(() => questionsAmountWarning = false, 1500)
    }
    let nextButtonElement: HTMLButtonElement
    function focusNextButtonElmnt() {
        nextButtonElement.focus()
    }
    let isNextButtonFullsize = false
    function switchToThemeCustomizationTab() {
        isNextButtonFullsize = true
        isExamCustomized.set(true)
        isExamQuestionsCustomizationVisible = !isExamQuestionsCustomizationVisible
        isExamThemeCustomizationVisible = !isExamThemeCustomizationVisible
    }
    function cleanUnusedData() {
        const usedParagraphsIDs: number[] = []
        questionsObject.update((questions) => {
            for(const [questionID, question] of Object.entries($questionsObject) as [string, Question][]) {
                let isQuestionUsed = false
                for(const linkedCollectionID in question.linkedCollections) {
                    for(const linkedExamID in question.linkedCollections[linkedCollectionID]) {
                        if($activeExamsIDs[linkedCollectionID]?.includes(parseInt(linkedExamID))) {
                            isQuestionUsed = true
                        }
                    }
                }
                if(!isQuestionUsed) {
                    delete questions[parseInt(questionID)]
                } else {
                    if(question.questionParagraphID && typeof question.questionParagraphID === 'number') {
                        usedParagraphsIDs.push(question.questionParagraphID)
                    }
                }
            }
            return questions
        })
        paragraphsObject.update((paragraphs) => {
            for(const paragraphID in paragraphs) {
                if(!usedParagraphsIDs[paragraphID]) {
                    delete paragraphs[paragraphID]
                }
            }
            return paragraphs
        })
        resetPage()
    }
    function resetPage() {
        isInitialDataReady = false
        activeExamsIDs.set({})
    }
    let waitingForDb = false
    $: if(isDataReady === 'Error') {
        isQuizStartThrobberVisible = false
        injectDOMErrorMessage('حدث خطأ، يرجى إعادة تحميل الصفحة أو المحاولة لاحقا.', true)
    } else if (isDataReady && waitingForDb) {
        cleanUnusedData()
        goto('/quiz/main')
    }
    let isQuizStartThrobberVisible = false
    function handlePageNextButton(){
        if(isExamQuestionsCustomizationVisible){
            // Check if still in questions customization tab
            if(isExamListValid() && isExamQuestionAmountValid()) {
                // If fields filled, move to theme customization tab
                switchToThemeCustomizationTab()
            }else {
                // Handle errors if fields are not filled
                if(!isExamListValid()) handleExamListError()
                    else if(!isExamQuestionAmountValid()) handleExamQuestionsAmountError()
            }
        } else {
            // Check if in theme customization tab
            if(!isQuizStartThrobberVisible) {
                isQuizStartThrobberVisible = true
                if(isDataReady) {
                    cleanUnusedData()
                    goto('/quiz/main')
                } else {
                    waitingForDb = true
                }
            }
        }
    }
</script>

<main class="h-full-vh supports-dvh:h-dvh w-[100%] text-white font-messiri">

    <div class="dotted-bg h-full w-full flex justify-center items-end bg-secondary-default">
        <div class="relative h-[min(99%,700px)] w-[min(95vw,400px)] bg-secondary-light rounded-tr-xl rounded-tl-xl overflow-hidden">
            <!-- Back Button -->
            {#if isExamThemeCustomizationVisible}
                <button 
                    class="absolute top-4 left-4 bg-red-600 transition hover:bg-red-700 flex-center rounded-full pointer w-10 h-10"
                    transition:fly={{ y: -30, duration: 600 }} 
                    on:click={()=>{
                        isExamQuestionsCustomizationVisible = !isExamQuestionsCustomizationVisible
                        isExamThemeCustomizationVisible = !isExamThemeCustomizationVisible
                        isNextButtonFullsize = false
                    }}
                >
                    <svg class="mr-[3px] w-5 h-5" width="88" height="150" viewBox="0 0 88 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M74.9668 13L12.9993 74.9459" stroke="white" stroke-width="26" stroke-linecap="round"/>
                        <path d="M74.9668 136.946L12.9993 75.0004" stroke="white" stroke-width="26" stroke-linecap="round"/>
                    </svg>
                </button>
            {/if}
            <!-- Body -->
            <div class="overflow-y-auto overflow-x-hidden h-[calc(100%-60px)] grid grid-cols-1 grid-rows-1 *:row-start-1 *:col-start-1">
                {#if isExamQuestionsCustomizationVisible}
                    <QuestionCustomizationTab 
                        {collections} 
                        {collectionsOrder} 
                        {examListWarning} 
                        {questionsAmountWarning} 
                        isCollectionsDataReady={isInitialDataReady} 
                        {focusNextButtonElmnt}
                    />
                {/if}
                {#if isExamThemeCustomizationVisible}
                    <ThemeCustomizationTab/>
                {/if}
            </div>
            <!-- Next Button -->
            <div class="h-16 w-full flex justify-end items-center">
                <button 
                    class="group m-4 mb-10 h-9/10 w-4/10 outer-shadow border-solid border-2 border-primary rounded-lg bg-secondary-default 
                    text-primary hover:text-secondary-default hover:bg-primary hover:*:stroke-secondary-default text-xl 
                    font-bold flex-center pointer button-transition"
                    class:w-full={isNextButtonFullsize}
                    bind:this={nextButtonElement}
                    on:click={handlePageNextButton}
                >
                    {#if isExamQuestionsCustomizationVisible}
                        <TypeWriter speed={2}>التالي</TypeWriter>
                    {:else}
                        <svg 
                            class="absolute left-10 h-10 transition stroke-primary group-hover:stroke-secondary-default opacity-0" 
                            class:opacity-100={isQuizStartThrobberVisible} 
                            style="margin: auto; display: block; shape-rendering: auto;" width="40px" height="40px" 
                            viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx="50" cy="50" r="32" stroke-width="8" stroke-dasharray="50.26548245743669 50.26548245743669" fill="none" stroke-linecap="round">
                                <animateTransform attributeName="transform" type="rotate" dur="0.7s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
                            </circle>
                        </svg>
                        <TypeWriter speed={2}>البدء</TypeWriter>
                    {/if}
    
                </button>
            </div>
            
        </div>
    </div>
</main>

<style lang="postcss">
    :global(html) {
        overscroll-behavior: auto
    }
    .dotted-bg {
        --dot-bg: #363636;
        --dot-color: #ffffff40;
        --dot-size: 1px;
        --dot-space: 35px;
        background: linear-gradient(90deg, var(--dot-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center / var(--dot-space) var(--dot-space), linear-gradient(var(--dot-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center / var(--dot-space) var(--dot-space), var(--dot-color);
        &* {
            user-select: none
        }
    }
    .button-transition {
        transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out, width 0.6s ease;
    }
</style>
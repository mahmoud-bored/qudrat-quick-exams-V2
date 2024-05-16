<script lang="ts">
    import './page.sass'
    import { fade, fly } from 'svelte/transition'
    import TypeWriter from '$lib/assets/TypeWriter.svelte'
    import QuestionCustomizationTab from './QuestionCustomizationTab.svelte'
    import ThemeCustomizationTab from './ThemeCustomizationTab.svelte'
    import { injectDOMErrorMessage } from './injectDOMErrorMessage.ts'
    import { featureFlags, isExamCustomized } from '$lib/stores.ts'
	import { goto } from '$app/navigation'
    import { isExamListValid, isExamQuestionAmountValid } from './checkInfo.ts'
	import { onMount } from 'svelte'
	import { loadDatabase, loadDbDataIntoStores } from './database.ts';
    export let data
    
    let isExamQuestionsCustomizationVisible = true
    let isExamThemeCustomizationVisible = false
    featureFlags.set(data.featureFlags)
    console.log(data)
    onMount(async () => {
        isExamCustomized.set(false)
        const dbData = await loadDatabase(data.redisDB, data.course_id)
        const { collectionsData, collectionsOrder } = loadDbDataIntoStores(dbData)
        console.log(dbData)
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
    function switchToThemeCustomizationTab(e: any) {
        const buttonElement: HTMLButtonElement = e.target

        isExamCustomized.set(true)
        isExamQuestionsCustomizationVisible = !isExamQuestionsCustomizationVisible
        isExamThemeCustomizationVisible = !isExamThemeCustomizationVisible
        buttonElement.classList.toggle('full-size')
    }

    let isQuizStartThrobberVisible = false
    function handlePageNextButton(e: any){
        if(isExamQuestionsCustomizationVisible){
            // Check if still in questions customization tab
            if(isExamListValid() && isExamQuestionAmountValid()) {
                // If fields filled, move to theme customization tab
                switchToThemeCustomizationTab(e)
            }else {
                // Handle errors if fields are not filled
                if(!isExamListValid()) handleExamListError()
                    else if(!isExamQuestionAmountValid()) handleExamQuestionsAmountError()
            }
        } else {
            // Check if in theme customization tab
            isQuizStartThrobberVisible = true
            goto('/quiz/main')
        }
    }
</script>
<main class="container">

    <div class="exam-customization-tab-container" transition:fade>
        <div class="exam-customization-tab">
            {#if isExamThemeCustomizationVisible}
                <button class="exam-customization-back-button" transition:fly={{ y: -30, duration: 600 }} on:click={()=>{
                    isExamQuestionsCustomizationVisible = !isExamQuestionsCustomizationVisible
                    isExamThemeCustomizationVisible = !isExamThemeCustomizationVisible
                    document.querySelector('.exam-customization-next-button-container > button')?.classList.toggle('full-size')
                }}>
                    <svg width="88" height="150" viewBox="0 0 88 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M74.9668 13L12.9993 74.9459" stroke="white" stroke-width="26" stroke-linecap="round"/>
                        <path d="M74.9668 136.946L12.9993 75.0004" stroke="white" stroke-width="26" stroke-linecap="round"/>
                    </svg>
                </button>
            {/if}
            <div class="exam-customization-grid-container">
                {#if isExamQuestionsCustomizationVisible}
                    <QuestionCustomizationTab {examListWarning} {questionsAmountWarning} />
                {/if}
                {#if isExamThemeCustomizationVisible}
                    <ThemeCustomizationTab/>
                {/if}
            </div>
    
            <div class="exam-customization-next-button-container">
                <button on:click={handlePageNextButton}>
                    {#if isExamQuestionsCustomizationVisible}
                        <TypeWriter speed={2}>التالي</TypeWriter>
                    {:else}
                        <svg  class="quiz-start-throbber" class:throbber-active={isQuizStartThrobberVisible} xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; display: block; shape-rendering: auto;" width="40px" height="40px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
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

<script lang="ts">
    import './page.sass'
    import { fade, fly } from 'svelte/transition'
	import DrawBorder from './DrawBorder.svelte'
    import backArrowImgSrc from '$lib/assets/left-arrow.png'
    import TypeWriter from '$lib/assets/TypeWriter.svelte'
    import QuestionCustomizationTab from './QuestionCustomizationTab.svelte'
    import ThemeCustomizationTab from './ThemeCustomizationTab.svelte'
    import Warning from './Warning.svelte'
    import { warningMessage, isExamCustomized } from '$lib/stores'
	import { goto } from '$app/navigation';
    import { checkExamListValidty, checkExamQuestionAmountValidty } from './checkInfo.ts'
	import { onMount } from 'svelte';
    let isExamQuestionsCustomizationVisible = true
    let isExamThemeCustomizationVisible = false

    onMount(() => {
        isExamCustomized.set(false)
    })
    let message: string
    let warningMessageVisible = false
    $: message = $warningMessage
    function showMessage(){
        console.log(message)
        if (!(message.length === 0)){
            warningMessageVisible = true
            setTimeout(() => {
                warningMessageVisible = false
            }, 2000);
        }
    }
    function checkInfo(){
        if(!checkExamListValidty()) { showMessage(); return false }
        else if(!checkExamQuestionAmountValidty()) { showMessage(); return false }
        else{
            isExamCustomized.set(true) 
            return true 
        }
    }
</script>
<main class="container">
    {#if warningMessageVisible}
        <Warning {message} />
    {/if}
    <div class="exam-customization-tab-container" transition:fade>
        <div class="exam-customization-tab">
            {#if isExamThemeCustomizationVisible}
                <button class="exam-customization-back-button" transition:fly={{ y: -30, duration: 600 }} on:click={()=>{
                    isExamQuestionsCustomizationVisible = !isExamQuestionsCustomizationVisible
                    isExamThemeCustomizationVisible = !isExamThemeCustomizationVisible
                    document.querySelector('.exam-customization-next-button-container > button')?.classList.toggle('full-size')
                }}>
                    <img src={backArrowImgSrc} alt="<" width="20px">
                </button>
            {/if}
            <div class="exam-customization-grid-container">
                {#if isExamQuestionsCustomizationVisible}
                    <QuestionCustomizationTab/>
                {/if}
                {#if isExamThemeCustomizationVisible}
                    <ThemeCustomizationTab/>
                {/if}
            </div>
    
            <div class="exam-customization-next-button-container">
                <button on:click={(e) => {
                    if(isExamQuestionsCustomizationVisible){
                        if(checkInfo()) {
                            if(e.target instanceof HTMLButtonElement){
                                isExamQuestionsCustomizationVisible = !isExamQuestionsCustomizationVisible
                                isExamThemeCustomizationVisible = !isExamThemeCustomizationVisible
                                e.target.classList.toggle('full-size')
                            }
                        }
                    }else{
                        goto('/quiz')
                    }
    
                }}>
                    {#if isExamQuestionsCustomizationVisible}
                        <TypeWriter speed={2}>التالي</TypeWriter>
                        
                    {:else}
                        <TypeWriter speed={2}>البدء</TypeWriter>
                    {/if}
    
                </button>
    
            </div>
        </div>
    </div>
</main>



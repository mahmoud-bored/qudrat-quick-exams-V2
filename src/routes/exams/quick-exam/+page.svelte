<script>
    import './page.sass'
    import { fly } from 'svelte/transition';
	import DrawBorder from './DrawBorder.svelte';
    import backArrowImgSrc from '$lib/assets/left-arrow.png';
    import TypeWriter from '$lib/assets/TypeWriter.svelte';
    import QuestionCustomizationTab from './QuestionCustomizationTab.svelte';
    import ThemeCustomizationTab from './ThemeCustomizationTab.svelte';
    let isExamQuestionsCustomizationVisible = true
    let isExamThemeCustomizationVisible = false
</script>
<main>
    <div class="exam-customization-tab-container">
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
                        if(e.target instanceof HTMLButtonElement){
                            isExamQuestionsCustomizationVisible = !isExamQuestionsCustomizationVisible
                            isExamThemeCustomizationVisible = !isExamThemeCustomizationVisible
                            e.target.classList.toggle('full-size')
                        }
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

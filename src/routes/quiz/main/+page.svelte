<script lang="ts">
    import Header from "./Header.svelte"
    import Choices from "./Choices.svelte"
    import Question from "./Question.svelte"
    import Controls from "./Controls.svelte"
    import Paragraph from "./Paragraph.svelte"
    import darkModeImgSrc from '$lib/assets/quizThemeDarkBg.webp'
    import lightModeImgSrc from '$lib/assets/quizThemeLightBg.webp'
    import woodModeImgSrc from '$lib/assets/quizThemeWoodBg.webp'
    import { examTheme } from "$lib/stores"
	import { onMount } from "svelte"
    import { checkQuizReady } from "./checkInfoValidty"
    import { getHTMLElement } from "$lib/app"
	import { fly } from "svelte/transition"
	import { browser } from "$app/environment"
    import { getQuestion } from "./operations.ts"
    import { questionParagraph, question, answers, correctAnswer } from "./quiz-main-stores.ts"
    
    let themeSrc: string
    let questionColor: string
    let paragraphColor: string
    let isWoodMode: boolean = false

    onMount(() => {
        checkQuizReady()
        // Set Theme: Dark, Light or Wood
        if ($examTheme == 'ليلي'){
            themeSrc = darkModeImgSrc
            questionColor = 'rgb(236 236 236)'
            paragraphColor = '#fff'
        } else if ($examTheme == 'عادي'){
            themeSrc = lightModeImgSrc
            questionColor = '#000'
            paragraphColor = '#000'
        } else if ($examTheme == 'Wood(Beta)'){
            themeSrc = woodModeImgSrc
            isWoodMode = true
            questionColor = '#000'
            paragraphColor = '#fff'
        }
    })
    onMount(getQuestion)
    // Set Mode: Desktop or Mobile
    let isLandscape: boolean
    let screenWidth: number
    let screenHeight: number
    $: try{
            if(browser) {
                const main = document.querySelector('main')

                if (screenWidth > screenHeight){
                    isLandscape = true
                    main?.style.setProperty('flex-direction', 'row')
                } else {
                    isLandscape = false
                    main?.style.setProperty('flex-direction', 'column')
                }
            }
        } catch(e) { }
    
    let isAnswerCorrect = false
    let isAnswerIncorrect = false
</script>

<svelte:window bind:innerWidth={screenWidth} bind:innerHeight={screenHeight} />

<main class="container main-quiz-container" style="background-image: url({themeSrc}); color: {questionColor}">
    {#if isLandscape}
        <div class="quiz-paragraph-container" style="color: {paragraphColor}"> <Paragraph  paragraphText={ $questionParagraph ? $questionParagraph : null } /> </div>
        <div class="quiz-container">
            <div class="quiz-header-container"> <Header /> </div>
            <div class="quiz-body-container">
                <div class="quiz-question-container">

                    {#if isAnswerCorrect}
                        <div class="quiz-question-result result-tick" in:fly={{ y:-60, duration: 100 }} out:fly={{ x:-70, duration: 100 }}>
                            <svg width="257" height="199" viewBox="0 0 257 199" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M210.75 6.7959L249.792 45.9089L114.814 180.641C105.042 190.395 89.2124 190.38 79.4582 180.608L58.0782 159.189L210.75 6.7959Z" fill="#A5EB78"/><path d="M237.191 33L250.024 45.8563L110.861 184.766C103.76 191.853 92.259 191.843 85.1716 184.742V184.742L237.191 33Z" fill="#95D46C"/><rect x="7.18359" y="108.787" width="53.2178" height="90" transform="rotate(-45.2399 7.18359 108.787)" fill="#A5EB78"/><path d="M69 94.5L90 116.5C91.1667 117.5 94 119.5 96 119.5C98 119.5 101.167 117.5 102.5 116.5L213.5 5L252 43L221 74" stroke="black" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M210 86L118.5 177.5C115.333 180.667 106.5 187.2 96.5 188C86.5 188.8 77.3333 181.333 74 177.5L5 107.5L43 70L56.5 83.5" stroke="black" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    {/if}
                    {#if isAnswerIncorrect}
                        <div class="quiz-question-result result-cross" in:fly={{ y:-60, duration: 500 }} out:fly={{ x:-70, duration: 700 }}>
                            <svg width="198" height="197" viewBox="0 0 198 197" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M155.758 7L99 63.5636L41.871 7L7 41.7515L64.129 98.3152L7 155.248L41.871 190L99 133.436L155.758 189.63L190.629 154.879L133.5 97.9455L191 41.7515L155.758 7Z" fill="#F74354" stroke="black" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    {/if}

                    <Question 
                        {isWoodMode}
                        questionHead={ $question ? $question : "" }
                        answer1={ $answers[0] ? $answers[0] : "" }
                        answer2={ $answers[1] ? $answers[1] : "" }
                        answer3={ $answers[2] ? $answers[2] : "" }
                        answer4={ $answers[3] ? $answers[3] : "" }
                    /> 
                </div>
                <div class="quiz-choices-container"> <Choices {isWoodMode} {isLandscape} /> </div> 
            </div>
            <div class="quiz-controls-container"> <Controls /> </div>
        </div>
    {:else if !isLandscape}
        <div class="mobile-view-container">
            <div class="mobile-quiz-header-container"> <Header /> </div>
            <div class="mobile-quiz-question-container">

                {#if isAnswerCorrect}
                    <div class="quiz-question-result result-tick" in:fly={{ y:-60, duration: 100 }} out:fly={{ x:-60, duration: 100 }}>
                        <svg width="257" height="199" viewBox="0 0 257 199" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M210.75 6.7959L249.792 45.9089L114.814 180.641C105.042 190.395 89.2124 190.38 79.4582 180.608L58.0782 159.189L210.75 6.7959Z" fill="#A5EB78"/><path d="M237.191 33L250.024 45.8563L110.861 184.766C103.76 191.853 92.259 191.843 85.1716 184.742V184.742L237.191 33Z" fill="#95D46C"/><rect x="7.18359" y="108.787" width="53.2178" height="90" transform="rotate(-45.2399 7.18359 108.787)" fill="#A5EB78"/><path d="M69 94.5L90 116.5C91.1667 117.5 94 119.5 96 119.5C98 119.5 101.167 117.5 102.5 116.5L213.5 5L252 43L221 74" stroke="black" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M210 86L118.5 177.5C115.333 180.667 106.5 187.2 96.5 188C86.5 188.8 77.3333 181.333 74 177.5L5 107.5L43 70L56.5 83.5" stroke="black" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                {/if}
                {#if isAnswerIncorrect}
                    <div class="quiz-question-result result-cross" in:fly={{ y:-60, duration: 500 }} out:fly={{ x:-60, duration: 500 }}>
                        <svg width="198" height="197" viewBox="0 0 198 197" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M155.758 7L99 63.5636L41.871 7L7 41.7515L64.129 98.3152L7 155.248L41.871 190L99 133.436L155.758 189.63L190.629 154.879L133.5 97.9455L191 41.7515L155.758 7Z" fill="#F74354" stroke="black" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                {/if}

                <Question
                    {isWoodMode}
                    questionHead="{$question}"
                    answer1={ $answers[0] ? $answers[0] : "" }
                    answer2={ $answers[1] ? $answers[1] : "" }
                    answer3={ $answers[2] ? $answers[2] : "" }
                    answer4={ $answers[3] ? $answers[3] : "" }
                /> 
            </div>
            <div class="mobile-quiz-body-container" style="color: {paragraphColor}"> <Paragraph paragraphText={ $questionParagraph ? $questionParagraph : null } /> <Choices {isWoodMode} {isLandscape} /> </div>
            <div class="mobile-quiz-controls-container"> <Controls /> </div>
        </div>
    {/if}

</main>

<style lang="sass">
    .container
        width: 100vw
        height: 100vh
        display: flex
        gap: 20px
        display: flex
        justify-content: center
        align-items: center
        background-size: cover
        background-repeat: no-repeat
        // Desktop View
        .quiz-container
            width: 60%
            height: 95%
            display: flex
            flex-direction: column
            justify-content: space-between
            align-items: center
            padding: 0 20px
            .quiz-header-container
                width: 100%
                height: 10%
                display: flex
                justify-content: center
                align-items: center
            .quiz-body-container
                width: 100%
                height: 80%
                display: flex
                justify-content: space-between
                align-items: center
                .quiz-question-container
                    width: 80%
                    height: 100%
                    display: flex
                    justify-content: center
                    align-items: center
                    .quiz-question-result
                        position: absolute
                        top: 0
                        margin-top: 15%
                        z-index: 3
                        svg
                            width: 100%
                .quiz-choices-container
                    width: 20%
                    height: 100%
                    display: flex
                    justify-content: center
                    align-items: center
            .quiz-controls-container
                width: 100%
                height: 10%
                display: flex
                justify-content: center
                align-items: center
        .quiz-paragraph-container
            width: 40%
            height: 100%
            display: flex
            justify-content: center
            align-items: center

        // Mobile View
        .mobile-view-container
            width: 100%
            height: 100%
            display: flex
            flex-direction: column
            justify-content: space-between
            align-items: center
            padding: 10px
            .mobile-quiz-header-container
                width: 100%
                height: 10%
                display: flex   
                justify-content: center
                align-items: center
            .mobile-quiz-question-container
                width: 100%
                height: 40%
                display: flex
                justify-content: center
                align-items: center
                .quiz-question-result
                    position: absolute
                    top: 0
                    margin-top: 15%
                    z-index: 3
                    svg
                        width: 100%
            .mobile-quiz-body-container
                width: 100%
                height: 40%
                display: flex
                justify-content: center
                align-items: center
                gap: 15px
            .mobile-quiz-controls-container
                width: 100%
                height: 10%
                display: flex
                justify-content: center
                align-items: center
</style>
<script lang="ts">

	import { fade } from "svelte/transition"
    import Header from "./Header.svelte"
    import Choices from "./Choices.svelte"
    import Question from "./Question.svelte"
    import Controls from "./Controls.svelte"
    import Paragraph from "./Paragraph.svelte"
    import darkModeImgSrc from '$lib/assets/quizThemeDarkBg.jpeg'
    import lightModeImgSrc from '$lib/assets/quizThemeLightBg.png'
    import woodModeImgSrc from '$lib/assets/quizThemeWoodBg.jpeg'
    import { examTheme } from "$lib/stores"
	import { onMount } from "svelte";
    import { checkQuizReady } from "./checkInfoValidty"
    import { getHTMLElement } from "$lib/app"

    let themeSrc: string
    let questionColor: string
    let paragraphColor: string
    let woodMode: boolean = false
    onMount(() => {
        checkQuizReady()
        // Set Theme: Dark, Light or Wood
        if ($examTheme == 'ليلي'){
            themeSrc = darkModeImgSrc
            questionColor = 'rgb(236 236 236)'
            paragraphColor = '#fff'
        } else if ($examTheme == 'عادي'){
            themeSrc = lightModeImgSrc
            questionColor = 'rgb(236 236 236)'
            paragraphColor = '#000'
        } else if ($examTheme == 'Wood(Beta)'){
            themeSrc = woodModeImgSrc
            woodMode = true
            questionColor = '#000'
            paragraphColor = '#fff'
        }
        themeSrc = woodModeImgSrc
            woodMode = true
            questionColor = '#000'
            paragraphColor = '#fff'
    })
    // Set Mode: Desktop or Mobile
    let isDesktopView: boolean
    let screenWidth: number
    let screenHeight: number
    $: try{
            const main = document?.querySelector('main')

            if (screenWidth > screenHeight){
                isDesktopView = true
                main?.style.setProperty('flex-direction', 'row')
            } else {
                isDesktopView = false
                main?.style.setProperty('flex-direction', 'column')
            }
        } catch(e) { }
    
</script>

<svelte:window bind:innerWidth={screenWidth} bind:innerHeight={screenHeight} />

<main class="container" style="background-image: url({themeSrc}); color: {questionColor}">
    {#if isDesktopView}
        <div class="quiz-paragraph-container" style="color: {paragraphColor}"> <Paragraph  paragraphTxt="test" /> </div>
        <div class="quiz-container">
            <div class="quiz-header-container"> <Header /> </div>
            <div class="quiz-body-container">
                <div class="quiz-question-container"> 
                    <Question 
                        {woodMode}
                        questionHead="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
                        answer1="Lorem Ipsum 1"
                        answer2="Lorem Ipsum 2"
                        answer3="Lorem Ipsum 3"
                        answer4="Lorem Ipsum 4"
                    /> 
                </div>
                <div class="quiz-choices-container"> <Choices {woodMode} /> </div> 
            </div>
            <div class="quiz-controls-container"> <Controls /> </div>
        </div>
    {:else}
        <div class="mobile-view-container">
            <div class="mobile-quiz-header-container"> <Header /> </div>
            <div class="mobile-quiz-question-container">
                <Question
                    {woodMode}
                    questionHead="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
                    answer1="Lorem Ipsum"
                    answer2="Lorem Ipsum"
                    answer3="Lorem Ipsum"
                    answer4="Lorem Ipsum"
                /> 
            </div>
            <div class="mobile-quiz-body-container" style="color: {paragraphColor}"> <Paragraph paragraphTxt="test" /> <Choices {woodMode} /> </div>
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
            .mobile-quiz-body-container
                width: 100%
                height: 40%
                display: flex
                justify-content: center
                align-items: center
            .mobile-quiz-controls-container
                width: 100%
                height: 10%
                display: flex
                justify-content: center
                align-items: center
</style>
<script lang="ts">
    import Header from "./Header.svelte"
    import Choices from "./Choices.svelte"
    import Question from "./Question.svelte"
    import Controls from "./Controls.svelte"
    import Paragraph from "./Paragraph.svelte"
    import ProgressBar from "./ProgressBar.svelte"
    import darkModeImgSrc from '$lib/assets/quizThemeDarkBg.webp'
    import lightModeImgSrc from '$lib/assets/quizThemeLightBg.webp'
    import woodModeImgSrc from '$lib/assets/quizThemeWoodBg.webp'
    import { examTheme } from "$lib/stores"
	import { onMount } from "svelte"
    import { checkQuizReady } from "./checkInfoValidty"
    import { getHTMLElement } from "$lib/app"
	import { fade, fly } from "svelte/transition"
	import { browser } from "$app/environment"
    import { endQuiz, getQuestion } from "./operations.ts"
    import { 
        questionParagraph, 
        question, 
        answers,  
        correctState, 
        incorrectState, 
        questionOutTransitionDuration, 
        skipState, 
        questionInTransitionDuration, 
        endQuizWarningTab, 
		isShowResultsVisible
    } from "./quiz-main-stores.ts"
	import { goto } from "$app/navigation";
    
    let themeSrc: string
    let questionColor: string
    let paragraphColor: string
    let isWoodMode: boolean = false

    onMount(() => {
        if(checkQuizReady()){
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
            getQuestion()
        }
    })
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
    let isShowResultsButtonThrobberVisible = false
</script>

<svelte:window bind:innerWidth={screenWidth} bind:innerHeight={screenHeight} />

<main class="container main-quiz-container" style="background-image: url({themeSrc}); color: {questionColor}">

    {#if $endQuizWarningTab}
        <div class="end-quiz-tab-background" transition:fade={{ duration: 200 }} ></div>
        <div class="end-quiz-tab-container">
            <div class="end-quiz-tab" in:fly={{ y: -40, x: 40, duration: 400 }} out:fly={{ y: 40, duration: 200 }}>
                <button class="end-quiz-tab-close-button" on:click={() => endQuizWarningTab.set(false)}>
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.5439 2L1.99994 19.1568" stroke="white" stroke-width="3" stroke-linecap="round"/><path d="M18.5957 19.2598L2.05121 2.10348" stroke="white" stroke-width="3" stroke-linecap="round"/>
                    </svg>
                </button>
                <p>هل انت متأكد من انهاء الإختبار؟</p>
                <div class="end-quiz-tab-buttons-container">
                    <button class="end-quiz-tab-button end-quiz-tab-button-cancel" on:click={() => endQuizWarningTab.set(false)}>الرجوع</button>
                    <button class="end-quiz-tab-button end-quiz-tab-button-close" on:click={endQuiz}>إنهاء</button>
                </div>
            </div>
        </div>
    {/if}
    {#if $isShowResultsVisible}
        <section class="show-results-tab" in:fly={{ y: -600, duration: 200 }}>
            <div class="results-chart-container"></div>
            <div class="show-results-page-button-container">
                <button class="show-results-page-button" on:click={() => {
                    isShowResultsButtonThrobberVisible = true
                    goto('/quiz/results')
                }}>
                    <svg  class="show-results-throbber" class:throbber-active={isShowResultsButtonThrobberVisible} xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; display: block; shape-rendering: auto;" width="40px" height="40px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                        <circle cx="50" cy="50" r="32" stroke-width="8" stroke-dasharray="50.26548245743669 50.26548245743669" fill="none" stroke-linecap="round">
                        <animateTransform attributeName="transform" type="rotate" dur="0.7s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
                        </circle>
                    </svg>
                    أظهر النتائج
                </button>
            </div>
            <div class="stars-container">
                <div id="stars"></div>
                <div id="stars2"></div>
                <div id="stars3"></div>
            </div>
        </section>
    {/if}
    {#if isLandscape}
        <div class="quiz-landscape-container">
            <ProgressBar />
            <div class="quiz-landscape-content-container">
                <div class="quiz-paragraph-container" style="color: {paragraphColor}"> <Paragraph  paragraphText={ $questionParagraph ? $questionParagraph : null } /> </div>
                <div class="quiz-container">
                    <div class="quiz-header-container"> <Header /> </div>
                    <div class="quiz-body-container">
                        <div class="quiz-question-container">
    
                            {#if $correctState}
                                <div class="quiz-question-result result-tick" in:fly={{ y:-60, duration: $questionInTransitionDuration }} out:fly={{ x:-70, duration: $questionOutTransitionDuration }}>
                                    <svg width="257" height="199" viewBox="0 0 257 199" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M210.75 6.7959L249.792 45.9089L114.814 180.641C105.042 190.395 89.2124 190.38 79.4582 180.608L58.0782 159.189L210.75 6.7959Z" fill="#A5EB78"/><path d="M237.191 33L250.024 45.8563L110.861 184.766C103.76 191.853 92.259 191.843 85.1716 184.742V184.742L237.191 33Z" fill="#95D46C"/><rect x="7.18359" y="108.787" width="53.2178" height="90" transform="rotate(-45.2399 7.18359 108.787)" fill="#A5EB78"/><path d="M69 94.5L90 116.5C91.1667 117.5 94 119.5 96 119.5C98 119.5 101.167 117.5 102.5 116.5L213.5 5L252 43L221 74" stroke="black" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M210 86L118.5 177.5C115.333 180.667 106.5 187.2 96.5 188C86.5 188.8 77.3333 181.333 74 177.5L5 107.5L43 70L56.5 83.5" stroke="black" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </div>
                            {/if}
                            {#if $incorrectState}
                                <div class="quiz-question-result result-cross" in:fly={{ y:-60, duration: $questionInTransitionDuration }} out:fly={{ x:-70, duration: $questionOutTransitionDuration }}>
                                    <svg width="198" height="197" viewBox="0 0 198 197" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M155.758 7L99 63.5636L41.871 7L7 41.7515L64.129 98.3152L7 155.248L41.871 190L99 133.436L155.758 189.63L190.629 154.879L133.5 97.9455L191 41.7515L155.758 7Z" fill="#F74354" stroke="black" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </div>
                            {/if}
                            {#if $skipState}
                                <div class="quiz-question-result result-skip" in:fly={{ y:-60, duration: $questionInTransitionDuration }} out:fly={{ x:-70, duration: $questionOutTransitionDuration }}>
                                    <svg width="234" height="210" viewBox="0 0 234 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M87.091 112.232C91.491 107.032 92.591 101.732 92.591 99.7319C92.9243 95.0651 93.791 85.0314 94.591 82.2314C95.591 78.7314 100.591 69.7314 106.591 64.2314C112.591 58.7314 122.091 53.7314 131.091 52.7314C138.291 51.9314 145.758 53.0648 148.591 53.7314C149.924 53.2314 153.791 52.2314 158.591 52.2314C170.091 52.2314 174.591 54.7314 182.091 58.2314C188.091 61.0314 193.924 67.7314 196.091 70.7314C198.591 74.8981 203.591 86.5314 203.591 99.7314C203.591 112.931 195.591 122.898 191.591 126.231C188.258 129.065 180.391 135.131 175.591 136.731C169.591 138.731 161.591 143.231 157.591 146.231C153.591 149.231 144.091 160.231 138.591 170.231C134.191 178.231 133.424 189.565 133.591 194.231C133.591 197.731 133.193 205.85 133.591 210.231C134.091 215.731 137.283 220.462 139.591 223.231C142.091 226.231 145.758 228.898 148.091 230.231C149.924 229.565 154.391 227.231 157.591 223.231C160.791 219.231 163.091 212.731 163.091 210.231V194.231C163.091 192.231 163.748 190.803 164.091 190.231C165.591 187.731 169.342 186.669 171.091 186.231C173.091 185.731 183.591 180.731 187.591 178.231C191.5 175.788 206.091 167.231 218.591 147.231C231.091 127.231 232.591 112.232 233.091 96.7314C233.736 76.7314 226.091 53.2316 212.591 36.2316C201.791 22.6316 188.091 14.2314 178.091 8.73187C173.091 5.73187 157.591 -1.26837 138.091 1.73187C115.091 6.73187 99.9982 18 81.091 39.7319C65.6719 57.4545 61.5 87 62.4992 100C62.9075 102.768 64.4992 108.5 67.4992 112C70.535 115.542 74.9992 120 77.4992 120.5C78.8326 120.167 82.691 117.432 87.091 112.232Z" fill="#4F92F3"/><path d="M101.986 19.5C115.986 8.7 129.5 3 139 2C148.5 1 149 1 149 1L126.989 0C121.322 0.666667 107.389 3.2 96.9886 8C83.9886 14 71.9886 22 62.4886 34C52.9886 46 45.9885 57.5 41.9885 72.5C37.9885 87.5 38.5 98.5 39.4885 102C40.4494 105.402 41.4885 110.5 47.4885 116.5C52.2885 121.3 58.1552 122.833 60.4885 123C62.4885 123 67.3885 122.9 70.9885 122.5C74.5885 122.1 76.8218 121 77.4885 120.5C74.9885 120 70.9885 116 66.9885 111C63.6267 106.798 62.3216 99.1667 62.4881 95.5C61.9881 86.5 66.9864 69.5 70.4864 59C73.9864 48.5 84.4864 33 101.986 19.5Z" fill="#0D6EFD"/><path d="M175.545 73.8503C169.145 61.8503 154.333 55.334 148.5 53.5007C165 47.5 206.045 58.8517 205.045 91.8503C203.664 137.43 174 132 157.045 147.851C140.09 163.702 137.045 178.35 135.545 187.35C134.109 195.968 134.545 207.85 135.545 212.85C136.545 217.85 137.165 219.251 140.045 222.85C144.045 227.85 146.5 229.5 148.5 230C148.167 230.333 145.759 231.448 143 232C138 233 135.635 233.534 133.5 233C129.5 232 125.145 229.65 121.545 226.85C117.045 223.35 113.045 217.85 112.045 212.85C111.045 207.85 110.545 199.35 111.545 187.35C112.545 175.35 120.545 162.35 124.045 156.85C127.545 151.35 136.045 145.35 141.045 141.85C145.045 139.05 155.378 134.684 160.045 132.85C164.545 130.35 169.045 126.85 172.545 121.85C180.115 111.036 181.545 101.46 181.545 97.3503C181.545 93.8503 181.945 85.8503 175.545 73.8503Z" fill="#0D6EFD"/><path d="M88.5596 0H126.56C121.727 1 109.261 4 98.0605 8C84.0605 13 72.9449 22.4916 62 35C51.5 47 45.0605 62.5 43.0605 70C40.5699 79.34 38.7272 93 39.0605 99C39.3939 102 41.2605 109.4 46.0605 115C50.8605 120.6 58.3939 122.667 61.5605 123H21.0605C17.5605 123 12.0605 119 7.56055 115C3.06055 111 0.559634 102.5 0.0596344 96.5C-0.440366 90.5 2.05963 69.5 13.0596 49C24.0596 28.5 45.5596 14.5 58.5596 8C68.9596 2.8 82.893 0.5 88.5596 0Z" fill="#1365DD"/><path d="M140.5 79.6803C136.9 68.8803 124.833 59.1667 119.5 56C121.667 54.6667 128.1 52.5803 134.5 52.1803C142.5 51.6803 143.5 52.1804 151 54.1803C157.832 56.0023 178.5 66.1806 182 91.1803C186.27 121.681 159 135.181 146.5 139.68C139.581 142.171 132.667 148.847 130 151.68C128 153.847 122.9 159.98 118.5 167.18C114.1 174.38 112.667 184.847 112.5 189.18C112.5 189.18 111.5 208.847 112.5 212.18C113.5 215.514 116.8 223.18 122 227.18C127.2 231.18 132.5 232.847 134.5 233.18C121.667 233.18 95.6 233.08 94 232.68C92 232.18 88.5 231.18 81.5 225.18C75.9 220.38 74.1667 212.847 74 209.68V192.68C74 188.18 75 182.18 77 175.18C80 164.68 86 156.181 95 148.181C104.781 139.486 115.5 137.18 121 134.18C126.5 131.18 135.79 124.548 140 113.181C145 99.6807 145 93.1803 140.5 79.6803Z" fill="#1365DD"/><rect x="74" y="266" width="93" height="54" rx="27" fill="#1365DD"/><circle cx="140" cy="293" r="27" fill="#0D6EFD"/><path d="M167 293C167.693 280.194 157.667 271.5 152.5 269C152.5 269 137.512 275.5 137.012 292.5C136.512 309.5 152 317 152 317C152 317 165.999 311.5 167 293Z" fill="#4F92F3"/>
                                    </svg>
                                </div>
                            {/if}
                                
                            <Question {isWoodMode} questionHead={ $question ? $question : "" } answers={$answers} /> 
                        </div>
                        <div class="quiz-choices-container"> <Choices {isWoodMode} {isLandscape} answers={$answers} /> </div> 
                    </div>
                    <div class="quiz-controls-container"> <Controls /> </div>
                </div>
            </div>
        </div>

    {:else if !isLandscape}
        <div class="mobile-view-container">
            <ProgressBar />
            <div class="mobile-view-content-container">
                <div class="mobile-quiz-header-container"> <Header /> </div>
                <div class="mobile-quiz-question-container">
    
                    {#if $correctState}
                        <div class="quiz-question-result result-tick" in:fly={{ y:-60, duration: $questionInTransitionDuration }} out:fly={{ x:-70, duration: $questionOutTransitionDuration }}>
                            <svg width="257" height="199" viewBox="0 0 257 199" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M210.75 6.7959L249.792 45.9089L114.814 180.641C105.042 190.395 89.2124 190.38 79.4582 180.608L58.0782 159.189L210.75 6.7959Z" fill="#A5EB78"/><path d="M237.191 33L250.024 45.8563L110.861 184.766C103.76 191.853 92.259 191.843 85.1716 184.742V184.742L237.191 33Z" fill="#95D46C"/><rect x="7.18359" y="108.787" width="53.2178" height="90" transform="rotate(-45.2399 7.18359 108.787)" fill="#A5EB78"/><path d="M69 94.5L90 116.5C91.1667 117.5 94 119.5 96 119.5C98 119.5 101.167 117.5 102.5 116.5L213.5 5L252 43L221 74" stroke="black" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M210 86L118.5 177.5C115.333 180.667 106.5 187.2 96.5 188C86.5 188.8 77.3333 181.333 74 177.5L5 107.5L43 70L56.5 83.5" stroke="black" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    {/if}
                    {#if $incorrectState}
                        <div class="quiz-question-result result-cross" in:fly={{ y:-60, duration: $questionInTransitionDuration }} out:fly={{ x:-70, duration: $questionOutTransitionDuration }}>
                            <svg width="198" height="197" viewBox="0 0 198 197" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M155.758 7L99 63.5636L41.871 7L7 41.7515L64.129 98.3152L7 155.248L41.871 190L99 133.436L155.758 189.63L190.629 154.879L133.5 97.9455L191 41.7515L155.758 7Z" fill="#F74354" stroke="black" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    {/if}
                    {#if $skipState}
                        <div class="quiz-question-result result-skip" in:fly={{ y:-60, duration: $questionInTransitionDuration }} out:fly={{ x:-70, duration: $questionOutTransitionDuration }}>
                            <svg width="234" height="210" viewBox="0 0 234 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M87.091 112.232C91.491 107.032 92.591 101.732 92.591 99.7319C92.9243 95.0651 93.791 85.0314 94.591 82.2314C95.591 78.7314 100.591 69.7314 106.591 64.2314C112.591 58.7314 122.091 53.7314 131.091 52.7314C138.291 51.9314 145.758 53.0648 148.591 53.7314C149.924 53.2314 153.791 52.2314 158.591 52.2314C170.091 52.2314 174.591 54.7314 182.091 58.2314C188.091 61.0314 193.924 67.7314 196.091 70.7314C198.591 74.8981 203.591 86.5314 203.591 99.7314C203.591 112.931 195.591 122.898 191.591 126.231C188.258 129.065 180.391 135.131 175.591 136.731C169.591 138.731 161.591 143.231 157.591 146.231C153.591 149.231 144.091 160.231 138.591 170.231C134.191 178.231 133.424 189.565 133.591 194.231C133.591 197.731 133.193 205.85 133.591 210.231C134.091 215.731 137.283 220.462 139.591 223.231C142.091 226.231 145.758 228.898 148.091 230.231C149.924 229.565 154.391 227.231 157.591 223.231C160.791 219.231 163.091 212.731 163.091 210.231V194.231C163.091 192.231 163.748 190.803 164.091 190.231C165.591 187.731 169.342 186.669 171.091 186.231C173.091 185.731 183.591 180.731 187.591 178.231C191.5 175.788 206.091 167.231 218.591 147.231C231.091 127.231 232.591 112.232 233.091 96.7314C233.736 76.7314 226.091 53.2316 212.591 36.2316C201.791 22.6316 188.091 14.2314 178.091 8.73187C173.091 5.73187 157.591 -1.26837 138.091 1.73187C115.091 6.73187 99.9982 18 81.091 39.7319C65.6719 57.4545 61.5 87 62.4992 100C62.9075 102.768 64.4992 108.5 67.4992 112C70.535 115.542 74.9992 120 77.4992 120.5C78.8326 120.167 82.691 117.432 87.091 112.232Z" fill="#4F92F3"/><path d="M101.986 19.5C115.986 8.7 129.5 3 139 2C148.5 1 149 1 149 1L126.989 0C121.322 0.666667 107.389 3.2 96.9886 8C83.9886 14 71.9886 22 62.4886 34C52.9886 46 45.9885 57.5 41.9885 72.5C37.9885 87.5 38.5 98.5 39.4885 102C40.4494 105.402 41.4885 110.5 47.4885 116.5C52.2885 121.3 58.1552 122.833 60.4885 123C62.4885 123 67.3885 122.9 70.9885 122.5C74.5885 122.1 76.8218 121 77.4885 120.5C74.9885 120 70.9885 116 66.9885 111C63.6267 106.798 62.3216 99.1667 62.4881 95.5C61.9881 86.5 66.9864 69.5 70.4864 59C73.9864 48.5 84.4864 33 101.986 19.5Z" fill="#0D6EFD"/><path d="M175.545 73.8503C169.145 61.8503 154.333 55.334 148.5 53.5007C165 47.5 206.045 58.8517 205.045 91.8503C203.664 137.43 174 132 157.045 147.851C140.09 163.702 137.045 178.35 135.545 187.35C134.109 195.968 134.545 207.85 135.545 212.85C136.545 217.85 137.165 219.251 140.045 222.85C144.045 227.85 146.5 229.5 148.5 230C148.167 230.333 145.759 231.448 143 232C138 233 135.635 233.534 133.5 233C129.5 232 125.145 229.65 121.545 226.85C117.045 223.35 113.045 217.85 112.045 212.85C111.045 207.85 110.545 199.35 111.545 187.35C112.545 175.35 120.545 162.35 124.045 156.85C127.545 151.35 136.045 145.35 141.045 141.85C145.045 139.05 155.378 134.684 160.045 132.85C164.545 130.35 169.045 126.85 172.545 121.85C180.115 111.036 181.545 101.46 181.545 97.3503C181.545 93.8503 181.945 85.8503 175.545 73.8503Z" fill="#0D6EFD"/><path d="M88.5596 0H126.56C121.727 1 109.261 4 98.0605 8C84.0605 13 72.9449 22.4916 62 35C51.5 47 45.0605 62.5 43.0605 70C40.5699 79.34 38.7272 93 39.0605 99C39.3939 102 41.2605 109.4 46.0605 115C50.8605 120.6 58.3939 122.667 61.5605 123H21.0605C17.5605 123 12.0605 119 7.56055 115C3.06055 111 0.559634 102.5 0.0596344 96.5C-0.440366 90.5 2.05963 69.5 13.0596 49C24.0596 28.5 45.5596 14.5 58.5596 8C68.9596 2.8 82.893 0.5 88.5596 0Z" fill="#1365DD"/><path d="M140.5 79.6803C136.9 68.8803 124.833 59.1667 119.5 56C121.667 54.6667 128.1 52.5803 134.5 52.1803C142.5 51.6803 143.5 52.1804 151 54.1803C157.832 56.0023 178.5 66.1806 182 91.1803C186.27 121.681 159 135.181 146.5 139.68C139.581 142.171 132.667 148.847 130 151.68C128 153.847 122.9 159.98 118.5 167.18C114.1 174.38 112.667 184.847 112.5 189.18C112.5 189.18 111.5 208.847 112.5 212.18C113.5 215.514 116.8 223.18 122 227.18C127.2 231.18 132.5 232.847 134.5 233.18C121.667 233.18 95.6 233.08 94 232.68C92 232.18 88.5 231.18 81.5 225.18C75.9 220.38 74.1667 212.847 74 209.68V192.68C74 188.18 75 182.18 77 175.18C80 164.68 86 156.181 95 148.181C104.781 139.486 115.5 137.18 121 134.18C126.5 131.18 135.79 124.548 140 113.181C145 99.6807 145 93.1803 140.5 79.6803Z" fill="#1365DD"/><rect x="74" y="266" width="93" height="54" rx="27" fill="#1365DD"/><circle cx="140" cy="293" r="27" fill="#0D6EFD"/><path d="M167 293C167.693 280.194 157.667 271.5 152.5 269C152.5 269 137.512 275.5 137.012 292.5C136.512 309.5 152 317 152 317C152 317 165.999 311.5 167 293Z" fill="#4F92F3"/>
                            </svg>
                        </div>
                    {/if}
                    <Question {isWoodMode} questionHead={ $question ? $question : "" } answers={$answers} />
                </div>
                <div class="mobile-quiz-body-container" style="color: {paragraphColor}">
                    <Paragraph paragraphText={ $questionParagraph ? $questionParagraph : null } /> 
                    <Choices {isWoodMode} {isLandscape} answers={$answers} /> </div>
                <div class="mobile-quiz-controls-container"> <Controls /> </div>
            </div>
        </div>
    {/if}

</main>

<style lang="sass">
    @import 'quiz-results.sass'
    @import '$lib/assets/app.sass'
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
        .show-results-tab
            height: 100%
            width: 100%
            position: absolute
            top: 0
            left: 0
            display: flex
            flex-direction: column
            align-items: center
            justify-content: space-between
            background: radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)
            overflow: hidden
            z-index: 7
            .results-chart-container
                margin-top: min(15%, 100px)
                width: 300px
                height: 300px
                border-radius: 50%
                background-color: $color-primary
            .show-results-page-button-container
                display: flex
                justify-content: center
                align-items: center
                margin-bottom: min(15%, 50px)
                width: 100%
                .show-results-page-button
                    position: relative
                    width: min(90vw, 300px)
                    height: 80px
                    background-color: #333
                    border: 2px solid
                    border-color: $color-primary
                    border-radius: 10px
                    display: flex
                    justify-content: center
                    align-items: center
                    color: #fff
                    font-size: 1.2em
                    transition: all 0.2s ease
                    z-index: 8
                    @media ( hover : hover )
                        &:hover
                            background-color: $color-primary
                            border-color: #333
                            color: #333
                            .show-results-throbber
                                stroke: $color-bg-primary
                    .show-results-throbber
                        position: absolute
                        left: 15px
                        opacity: 0
                        height: 40px
                        transition: 0.2s all ease
                        stroke: $color-primary
                    .throbber-active
                        opacity: 1
            .stars-container
                width: 100%
                height: 100%
                position: absolute
                top: 0
                left: 0
                @include stars()
        .end-quiz-tab-background
            position: absolute
            top: 0
            left: 0
            height: 100%
            width: 100%
            background-color: rgba(255, 255, 255, 0.5)
            z-index: 5
        .end-quiz-tab-container
            position: absolute
            top: 0
            left: 0
            height: 100%
            width: 100%
            display: flex
            justify-content: center
            align-items: center
            z-index: 6
            .end-quiz-tab
                width: min(90vw, 350px)
                background-color: #222
                position: relative
                display: flex
                justify-content: center
                align-items: center
                flex-direction: column
                padding: 30px
                border-radius: 10px
                color: #fff
                gap: 10px
                .end-quiz-tab-close-button
                    position: absolute
                    top: 10px
                    right: 10px
                    width: 30px
                    height: 30px
                    display: flex
                    justify-content: center
                    align-items: center
                    border-radius: 50%
                    background-color: #b02020
                    transition: all 0.2s ease
                    @media ( hover : hover )
                        &:hover
                            background-color: lighten(#b02020, 15%)
                    svg
                        width: 40%
                .end-quiz-tab-buttons-container
                    width: 100%
                    display: flex
                    justify-content: space-evenly
                    .end-quiz-tab-button
                        width: 30%
                        height: 40px
                        display: flex
                        justify-content: center
                        align-items: center
                        border-radius: 5px
                        transition: all 0.2s ease
                    .end-quiz-tab-button-cancel
                        background-color: #444
                        @media ( hover : hover )
                            &:hover
                                background-color: lighten(#444, 10%)
                    .end-quiz-tab-button-close
                        background-color: #b02020
                        @media ( hover : hover )
                            &:hover
                                background-color: lighten(#b02020, 10%)
        // Desktop View
        .quiz-landscape-container
            height: 100%
            width: 100%
            display: flex
            flex-direction: column
            justify-content: space-between
            .quiz-landscape-content-container
                width: 100%
                height: 100%
                display: flex
                justify-content: space-between
                align-items: center
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
                                margin-top: min(15%, 100px)
                                display: flex
                                justify-content: center
                                align-items: center
                                z-index: 3
                                svg
                                    width: 70%
                            .result-skip
                                width: 100%
                                display: flex
                                justify-content: center
                                align-items: center
                                svg
                                    width: 50%
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
            .mobile-view-content-container
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
                        margin-top: min(20%, 100px)
                        display: flex
                        justify-content: center
                        align-items: center
                        z-index: 3
                        svg
                            width: 70%
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
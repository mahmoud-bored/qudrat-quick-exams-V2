<script lang="ts">
    import { isShowResultsVisible, questionAlignment } from './quiz-main-stores.ts';
    import { getHTMLElement } from '$lib/app'
    import columnAlignImgSrc from '$lib/assets/column-align-icon.svg'
    import rowAlignImgSrc from '$lib/assets/row-align-icon.svg'
	import type { QuestionAnswers } from '$lib/databaseInterfaces.ts';
	import { featureFlags } from '$lib/stores.ts';
    import { pickAnswer } from "./operations";
	import { isNextQuestionReady } from "./quiz-main-stores";

    export let isWoodMode: boolean
    export let answers: QuestionAnswers

    let answer1: string 
    let answer2: string 
    let answer3: string 
    let answer4: string
    $: {
        answer1 = answers[0] ?? "" 
        answer2 = answers[1] ?? "" 
        answer3 = answers[2] ?? "" 
        answer4 = answers[3] ?? ""
    }

    let buttonA: HTMLButtonElement, 
        buttonB: HTMLButtonElement, 
        buttonC: HTMLButtonElement, 
        buttonD: HTMLButtonElement
    function changeQuestionAlighnment(align: string){
        questionAlignment.set(align)
        const buttons = document.querySelectorAll('.question-align-container > button')
        buttons.forEach((button) => {
            getHTMLElement(button).style.setProperty('background-color', 'transparent')
        })
        getHTMLElement(document.querySelector(`button[data-value="${align}"]`)).style.setProperty('background-color', '#5272F230')
    }
    function pressKeyboardKey(e: KeyboardEvent) {
        if(e.code == 'KeyA' || e.code == 'Digit1') {
            buttonA.click()
        } else if (e.code == 'KeyS' || e.code == 'Digit2') {
            buttonB.click()
        } else if(e.code == "KeyD" || e.code == "Digit3") {
            buttonC.click()
        } else if(e.code == "KeyF" || e.code == "Digit4") {
            buttonD.click()
        }
    }
</script>
<svelte:window on:keydown={pressKeyboardKey}/>
<div class="container">
    {#if $featureFlags.switchAnswersLayoutButtons}
        <div class="question-align-container">
            <button class="column-align-container" data-value="column" on:click={()=> changeQuestionAlighnment('column')}>
                <img src={columnAlignImgSrc} alt="align column">
            </button>
            <button class="row-align-container" data-value="row" on:click={()=> changeQuestionAlighnment('row')}>
                <img src={rowAlignImgSrc} alt="align row">
            </button>
        </div>
    {/if}

    <div class="choices-container" class:isWoodMode>
        <button 
            id="question-choice_GTAG"
            class="h-full w-full rounded bg-[#5eee2530] border border-[#5eee25] flex-center opacity-100 
                select-none transition hover:text-white hover:bg-[#5eee2590]" 
            class:opacity-30={!$isNextQuestionReady || answer1.length < 1} 
            data-value={answer1} 
            on:click={(e) => { 
                if(!$isShowResultsVisible) {
                    if($isNextQuestionReady && answer1.length > 1) pickAnswer(e)
                }
            }}
            bind:this={buttonA}
        >
            أ
        </button>
        <button 
            id="question-choice_GTAG"
            class="h-full w-full rounded bg-[#5eee2530] border border-[#5eee25] flex-center opacity-100 
                select-none transition hover:text-white hover:bg-[#5eee2590]" 
            class:opacity-30={!$isNextQuestionReady || answer2.length < 1} 
            data-value={answer2} 
            on:click={(e) => { 
                if(!$isShowResultsVisible) {
                    if($isNextQuestionReady && answer2.length > 1) pickAnswer(e)
                }            
            }}
            bind:this={buttonB}
        >
            ب
        </button>
        <button 
            id="question-choice_GTAG"
            class="h-full w-full rounded bg-[#5eee2530] border border-[#5eee25] flex-center opacity-100 
                select-none transition hover:text-white hover:bg-[#5eee2590]" 
            class:opacity-30={!$isNextQuestionReady || answer3.length < 1} 
            data-value={answer3} 
            on:click={(e) => { 
                if(!$isShowResultsVisible) {
                    if($isNextQuestionReady && answer3.length > 1) pickAnswer(e)
                }            
            }}
            bind:this={buttonC}
        >
            ج
        </button>
        <button 
            id="question-choice_GTAG"
            class="h-full w-full rounded bg-[#5eee2530] border border-[#5eee25] flex-center opacity-100 
                select-none transition hover:text-white hover:bg-[#5eee2590]" 
            class:opacity-30={!$isNextQuestionReady || answer4.length < 1} 
            data-value={answer4} 
            on:click={(e) => { 
                if(!$isShowResultsVisible) {
                    if($isNextQuestionReady && answer4.length > 1) pickAnswer(e)
                }            
            }}
            bind:this={buttonD}
        >
            د
        </button>
    </div>
</div>

<style lang="sass">
    @import '$lib/assets/app.sass'

    .container
        position: relative
        height: 95%
        width: max(10%, 150px)
        display: flex
        flex-direction: column
        justify-content: space-between
        align-items: center
        background-color: transparent
        color: inherit
        gap: 10px
        .question-align-container
            width: 100%
            height: 10%
            display: flex
            justify-content: space-evenly
            align-items: center
            button
                aspect-ratio: 10/7
                width: 45%
                border: 1px solid #5272f2
                border-radius: 5px
                transition: all 0.2s ease
                @media (hover: hover)
                    &:hover
                        background-color: #5272F230
                img
                    width: 100%
            
            .row-align-container
                background-color: #5272F230
        .woodMode
            color: #fff
        .choices-container
            height: 100%
            width: 80%
            display: flex
            flex-direction: column
            justify-content: space-evenly
            align-items: center
            color: #fff
            gap: 3%
</style>
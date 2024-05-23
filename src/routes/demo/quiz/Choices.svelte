<script lang="ts">
    import { isNextQuestionReady } from './quiz-main-stores.ts';
    import { pickAnswer } from './operations.ts'
	import type { QuestionAnswers } from '$lib/databaseInterfaces.ts';
    
    export let isWoodMode: boolean
    export let isLandscape: boolean
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

</script>

<div class="container">
    <div class="choices-container" class:isWoodMode>
        <button class="choice" class:choice-landscape={isLandscape} class:choice-disabled={!$isNextQuestionReady} data-value="{answer1}" on:click={(e) => { if($isNextQuestionReady){pickAnswer(e)}} }>أ</button>
        <button class="choice" class:choice-landscape={isLandscape} class:choice-disabled={!$isNextQuestionReady} data-value="{answer2}" on:click={(e) => { if($isNextQuestionReady){pickAnswer(e)}} }>ب</button>
        <button class="choice" class:choice-landscape={isLandscape} class:choice-disabled={!$isNextQuestionReady} data-value="{answer3}" on:click={(e) => { if($isNextQuestionReady){pickAnswer(e)}} }>ج</button>
        <button class="choice" class:choice-landscape={isLandscape} class:choice-disabled={!$isNextQuestionReady} data-value="{answer4}" on:click={(e) => { if($isNextQuestionReady){pickAnswer(e)}} }>د</button>
        <!-- <EndQuizButton /> -->
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
            .choice
                height: 100%
                width: 100%
                border-radius: 5px
                border: 1px solid #5eee25
                background-color: #5eee2530
                display: flex
                justify-content: center
                align-items: center
                opacity: 1
                user-select: none
                transition: all 0.2s ease
                @media (hover: hover)
                    &:hover
                        background-color: #5eee2590
                        color: #fff
            .choice-disabled
                opacity: 0.3
</style>
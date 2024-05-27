<script lang="ts">
	import type { QuestionAnswers } from '$lib/databaseInterfaces.ts';
	import ChoiceButton from './ChoiceButton.svelte';
    
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
        <ChoiceButton {isLandscape} dataValue={answer1} text="أ" />
        <ChoiceButton {isLandscape} dataValue={answer2} text="ب" />
        <ChoiceButton {isLandscape} dataValue={answer3} text="ج" />
        <ChoiceButton {isLandscape} dataValue={answer4} text="د" />
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
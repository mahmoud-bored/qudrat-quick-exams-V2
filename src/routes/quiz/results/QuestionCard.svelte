<script lang="ts">
	import type { ParagraphsContainer, Question } from "$lib/databaseInterfaces"
	import { onMount } from "svelte"
    import { paragraphsObject } from "$lib/stores"
    
    export let cardSettings: { bg: string, color: string }
    export let questionObject: Question | undefined
    
    let localQuestionObject: Question
    if(questionObject){
        localQuestionObject = questionObject
    }

    let [isRedBorderActive, isGreenBorderActive, isYellowBorderActive, isBlueBorderActive] = Array(4).fill(false)
    
    let isQuestionBodyVisible = false
    // set border color for question card
    onMount(() => {
        if(questionObject?.incorrectState === true) { isRedBorderActive = true }
        if(questionObject?.correctState === true) { isGreenBorderActive = true }
        if(questionObject?.isQuestionMarked === true) { isYellowBorderActive = true }
        if(questionObject?.skipState === true) { isBlueBorderActive = true }
    })
    // return the paragraph text if it exists
    function getParagraphText(){
        if(typeof localQuestionObject['questionParagraphID'] === 'number') {
            return $paragraphsObject[localQuestionObject['questionParagraphID']]['paragraphText']
        }else {
            return ""
        }
    }
    // set the background color for choices
    let [isACorrect, isBCorrect, isCCorrect, isDCorrect] = Array(4).fill(false)
    let [isAIncorrect, isBIncorrect, isCIncorrect, isDIncorrect] = Array(4).fill(false)
    const correctAnswer = questionObject?.['correctAnswer']
    const pickedAnswer = questionObject?.['pickedAnswer']
    const answer1 = questionObject?.questionAnswers[0]
    const answer2 = questionObject?.questionAnswers[1]
    const answer3 = questionObject?.questionAnswers[2]
    const answer4 = questionObject?.questionAnswers[3]
    if( answer1 == correctAnswer ) { isACorrect = true }
    else if( answer2 == correctAnswer ) { isBCorrect = true }
    else if( answer3 == correctAnswer ) { isCCorrect = true }
    else if( answer4 == correctAnswer ) { isDCorrect = true }

    if( pickedAnswer == answer1 ) { isAIncorrect = true}
    else if( pickedAnswer == answer2 ) { isBIncorrect = true}
    else if( pickedAnswer == answer3 ) { isCCorrect = true}
    else if( pickedAnswer == answer4 ) { isDCorrect = true}


</script>
<div class="question-container">
    <button 
        class="question-card-container"
        class:question-card-red-border={isRedBorderActive}
        class:question-card-green-border={isGreenBorderActive}
        class:question-card-yellow-border={isYellowBorderActive}
        class:question-card-blue-border={isBlueBorderActive}
        on:click={() => isQuestionBodyVisible = !isQuestionBodyVisible}
        >
        <span class="question-card-circle-holder"></span>
        <div class="question-time-container">

        </div>
        <div class="question-head-container">
            س: {localQuestionObject['questionHead']}
        </div>
    </button>

    <button 
        class="question-body-container" 
        class:question-body-container-active={isQuestionBodyVisible} 
        style="background-image: url('{cardSettings['bg']}'); color: {cardSettings['color']}"
        on:click={() => isQuestionBodyVisible = !isQuestionBodyVisible}
        >

        <p style="max-width: 95%;">{getParagraphText()}</p>
        {#if getParagraphText().length !== 0} <hr> {/if}
        <p style="max-width: 95%;">س: {localQuestionObject['questionHead']}</p>
        <div class="question-body-answers-container">
            {#if localQuestionObject.questionAnswers[0]}
                <p>أ- { localQuestionObject.questionAnswers[0] }</p>
            {/if}
            {#if localQuestionObject.questionAnswers[1]}
                <p>ب- { localQuestionObject.questionAnswers[1] }</p>
            {/if}
            {#if localQuestionObject.questionAnswers[2]}
                <p>ج- { localQuestionObject.questionAnswers[2] }</p>
            {/if}
            {#if localQuestionObject.questionAnswers[3]}
                <p>د- { localQuestionObject.questionAnswers[3] }</p>
            {/if}

        </div>
        <div class="question-body-choices-container">
            <div 
                class="question-body-choice" 
                class:question-body-choice-correct={isACorrect} 
                class:question-body-choice-incorrect={isAIncorrect}
                >أ</div>
            <div 
                class="question-body-choice" 
                class:question-body-choice-correct={isBCorrect} 
                class:question-body-choice-incorrect={isBIncorrect}
                >ب</div>
            <div 
                class="question-body-choice" 
                class:question-body-choice-correct={isCCorrect} 
                class:question-body-choice-incorrect={isCIncorrect}
            >ج</div>
            <div 
                class="question-body-choice" 
                class:question-body-choice-correct={isDCorrect} 
                class:question-body-choice-incorrect={isDIncorrect}
            >د</div>
        </div>
    </button>
</div>

<style lang="sass">
    .question-container
        position: relative
        width: 90%
        .question-card-container
            width: 100%
            display: flex
            justify-content: space-between
            align-items: center
            border: 2px solid
            border-radius: 5px
            padding: 20px 10px 20px 0px
            background: linear-gradient(to right, #59595970, #00000010,  #00000010, #59595970)
            transition: all 0.2s ease-out
            background-size: 200%
            background-position: left
            cursor: pointer
            @media ( hover : hover )
                &:hover
                    background-position: right
                    .question-card-circle-holder
                        background-color: lighten(#97986B, 20%)
            .question-card-circle-holder
                display: block
                width: 15px
                height: 15px
                background-color: #97986B
                border-radius: 50%
                position: absolute
                left: 15px
                transition: all 0.2s ease
            .question-head-container
                direction: rtl
                max-width: 80%
        .question-card-red-border
            border-color: #F74354
        .question-card-green-border
            border-color: #66A43F
        .question-card-yellow-border
            border-color: #fdd849 !important
        .question-card-blue-border
            border-color: #1365DD
        
        
        
        .question-body-container
            width: 100%
            margin-top: -3px
            background-size: cover
            background-repeat: no-repeat
            background-position: center
            position: absolute
            left: 0
            display: flex
            justify-content: center
            align-items: flex-end
            flex-direction: column
            gap: 10px
            border-top-right-radius: 2px
            border-top-left-radius: 2px
            border-bottom-left-radius: 5px
            border-bottom-right-radius: 5px            
            padding: 20px 10px 20px 3px
            transition: clip-path 0.2s ease
            clip-path: inset(0 0 100% 0)
            z-index: 3
            hr
                width: 95%
                margin-inline: auto
                border: 0.5px solid #999
            p
                direction: rtl
            .question-body-answers-container
                display: flex
                flex-direction: column
                gap: 7px
            .question-body-choices-container
                width: 100%
                display: flex
                justify-content: space-evenly
                flex-direction: row-reverse
                .question-body-choice
                    width: min(20%, 100px)
                    aspect-ratio: 1 / 1
                    color: #fff
                    background-color: #444
                    border-radius: 5px
                    display: flex
                    justify-content: center
                    align-items: center
                .question-body-choice-correct
                    background-color: #5eee2560 !important
                .question-body-choice-incorrect
                    background-color: #f74354
        .question-body-container-active
            clip-path: inset(0 0 0 0)
</style>
<script lang="ts">
    import { getHTMLElement } from "$lib/app"
	import { fly } from "svelte/transition";
	import type { QuestionAnswers } from "$lib/databaseInterfaces";
	import { questionOutTransitionDuration, questionFontSize, questionAlignment } from "./quiz-main-stores";
    export let isWoodMode: boolean
    export let questionHead: string
    export let answers: QuestionAnswers
    
    
    let answer1: string 
    let answer2: string 
    let answer3: string 
    let answer4: string
    $: {
        answer1 = answers[0] ? answers[0] : "" 
        answer2 = answers[1] ? answers[1] : "" 
        answer3 = answers[2] ? answers[2] : "" 
        answer4 = answers[3] ? answers[3] : ""
    }
    $: try{ 
            const answersContainer = document.querySelectorAll('.answers-container > div')
            answersContainer?.forEach((answer) => {
                getHTMLElement(answer).style.setProperty('flex-direction', `${$questionAlignment}`)
            })
        } catch(e){ }
    $: try{ getHTMLElement(document.querySelector('.question-container'))?.style.setProperty('font-size', `${$questionFontSize}em`) } catch(e){ }
</script>

<div class="question-container">
    {#if isWoodMode}
        <div class="parchment"></div>
    {/if}
    <div class="question-head-container">
        {#key questionHead}
            <p 
                class="question-head" 
                in:fly={{ x: 40, duration: 300 }} 
                out:fly={{ y: 20, x: -20, duration: $questionOutTransitionDuration - 50 }}
            >
                {questionHead}
            </p>    
        {/key}
    </div>

    <div class="answers-container">
        <div class="answers-top-container">

            <div class="answer-container">
                {#key answer1 } 
                    <p in:fly={{ x: 40, duration: 350 }} out:fly={{ y: 20, x: -20, duration: $questionOutTransitionDuration }} >
                        أ- {answer1}
                    </p> 
                {/key}
            </div>
            <div class="answer-container">
                {#key answer2} 
                    <p in:fly={{ x: 40, duration: 350 }} out:fly={{ y: 20, x: -20, duration: $questionOutTransitionDuration }} >
                        ب- {answer2}
                    </p> 
                {/key}
            </div>

        </div>
        <div class="answers-bottom-container">

            <div class="answer-container">
                {#key answer3}
                    <p in:fly={{ x: 40, duration: 400 }} out:fly={{ y: 20, x: -20, duration: $questionOutTransitionDuration + 50 }} >
                        ج- {answer3}
                    </p> 
                {/key}
            </div>
            <div class="answer-container">
                {#key answer4} 
                    <p in:fly={{ x: 40, duration: 400 }} out:fly={{ y: 20, x: -20, duration: $questionOutTransitionDuration + 50 }} >
                        د- {answer4}
                    </p> 
                {/key}
            </div>
            
        </div>
    </div>
    {#if isWoodMode}
        <filter id="wavy2">
            <feTurbulence x="0" y="0" baseFrequency="0.02" numOctaves="5" seed="1" />
            <feDisplacementMap in="SourceGraphic" scale="20" />
        </filter>
    {/if}
</div>

<style lang="sass">
    @import '$lib/assets/app.sass'
    .question-container
        position: relative
        height: 95%
        width: 100%
        background-color: transparent
        direction: rtl
        padding: 20px
        *
            user-select: text
        .parchment
            position: absolute
            top: 0
            display: flex
            width: 100%
            height: calc(100% - 10px)
            padding: 4em
            box-shadow: 2px 3px 20px black, 0 0 125px #8f5922 inset
            background: #fffef0
            /* v2.1 : borders effect with SVG : try to play with scale to change them
            filter: url(#wavy2)
            /* v2.2 : Noise added for a vellum paper effect
            background-image: url(data:image/png;base64,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)
        .question-head-container
            display: grid
            *
                grid-row: 1 / 1
                grid-column: 1 / 1
            .question-head
                position: relative
                padding: 0 15px
        .answers-container
            padding: 0 15px
            position: relative
            display: flex
            flex-direction: column
            justify-content: center
            margin-top: 10px
            gap: 5px
            z-index: 1
            .answers-top-container,
            .answers-bottom-container
                display: flex
                justify-content: space-between
                padding: 0 10px
                gap: 5px
                .answer-container
                    display: grid
                    width: 50%
                    *
                        grid-row: 1 / 1
                        grid-column: 1 / 1
                    p
                        width: 100%
                        text-align: right


</style>
<script lang="ts">
    import { getHTMLElement, getInnerDimensions } from "$lib/app"
	import { fly } from "svelte/transition";
	import type { QuestionAnswers } from "$lib/databaseInterfaces";
	import { questionOutTransitionDuration, questionFontSize, questionAlignment } from "./quiz-main-stores";
	import { onMount } from "svelte";
	import { browser } from "$app/environment";
    export let isWoodMode: boolean
    export let questionHead: string
    export let answers: QuestionAnswers
    
    
    function createVirtualText(elmnts: HTMLParagraphElement[]) {
        for(const elmnt of elmnts) {
            elmnt.style.visibility = '0'
            elmnt.style.position = 'absolute'
            elmnt.style.top = '-1000px'
            elmnt.style.left = '-1000px'
            elmnt.style.fontFamily = 'El Messiri'
            document.body.appendChild(elmnt)
        }
    }

    let answer1: string, 
        answer2: string, 
        answer3: string, 
        answer4: string

    let answersVirtualElements: HTMLParagraphElement[]
    onMount(() => {
        answersVirtualElements = [
            document.createElement('p'), 
            document.createElement('p'), 
            document.createElement('p'), 
            document.createElement('p')
        ]
        createVirtualText(answersVirtualElements)
        
    })
    const answersElmnts: HTMLParagraphElement[] = []
    let answersContainer: HTMLDivElement
    function checkAnswersAlignment(elmnts: HTMLParagraphElement[], virtualElements: HTMLParagraphElement[]) {
        let alignment = 'row'
        if(answersContainer) {
            for(const elmnt of virtualElements) {
                const vElmntWidth = elmnt.offsetWidth
                const { width } = getInnerDimensions(answersContainer)
                const availableWidth = width / 2 - 20
                if ((vElmntWidth) > availableWidth) {
                    alignment = 'column'
                }
            }
            questionAlignment.set(alignment)
        }
    }
    $: {
        answer1 = answers[0] ? `أ- ${answers[0]}` : 'أ- '
        answer2 = answers[1] ? `ب- ${answers[1]}` : 'ب- '
        answer3 = answers[2] ? `ج- ${answers[2]}` : 'ج- ' 
        answer4 = answers[3] ? `د- ${answers[3]}` : 'د- '

        if(answersVirtualElements) {
            answersVirtualElements[0].textContent = answer1
            answersVirtualElements[1].textContent = answer2
            answersVirtualElements[2].textContent = answer3
            answersVirtualElements[3].textContent = answer4
            checkAnswersAlignment(answersElmnts, answersVirtualElements)
        }
    }
    $: {
        if(answersVirtualElements) {
            $questionFontSize = $questionFontSize
            for(const elmnt of answersVirtualElements) {
                elmnt.style.fontSize = `${$questionFontSize}em`
            }
            checkAnswersAlignment(answersElmnts, answersVirtualElements)
        }
    }
    let screenWidth: number
    $: {
        screenWidth = screenWidth
        checkAnswersAlignment(answersElmnts, answersVirtualElements)
    }
</script>
<svelte:window bind:innerWidth={screenWidth}/>

<div
    style="font-size: {$questionFontSize}em;"
    class="relative h-[95%] w-full bg-transparent p-5 scrollbar-thin scrollbar-beige overflow-y-auto overflow-x-hidden *:select-text"
>
    {#if isWoodMode}
        <div class="parchment"></div>
    {/if}
    <div class="grid *:row-start-1 *:col-start-1" dir="rtl">
        {#key questionHead}
            <p 
                class="relative px-4" 
                in:fly={{ x: 40, duration: 300 }} 
                out:fly={{ y: 20, x: -20, duration: $questionOutTransitionDuration - 50 }}
            >
                {questionHead}
            </p>    
        {/key}
    </div>
    <div class="px-4 relative flex flex-col justify-center mt-2 gap-1 z-[1]" dir="rtl" bind:this={answersContainer}>
        <div 
            class="flex justify-between px-2 gap-1"
            class:flex-col={$questionAlignment === 'column'}
        >

            <div class="w-full grid *:row-start-1 *:col-start-1" bind:this={answersElmnts[0]}>
                {#key answer1} 
                    <p 
                        class="w-full text-right" 
                        in:fly={{ x: 40, duration: 350 }} 
                        out:fly={{ y: 20, x: -20, duration: $questionOutTransitionDuration }}
                    >

                        {answer1}
                    </p> 
                {/key}
            </div>
            <div class="w-full grid *:row-start-1 *:col-start-1" bind:this={answersElmnts[1]}>
                {#key answer2} 
                    <p 
                        class="w-full text-right" 
                        in:fly={{ x: 40, duration: 350 }} 
                        out:fly={{ y: 20, x: -20, duration: $questionOutTransitionDuration }}
                    >
                        {answer2}
                    </p>
                        
                {/key}
            </div>
        </div>
        <div 
            class="flex justify-between px-2 gap-1"
            class:flex-col={$questionAlignment === 'column'}
        >

            <div class="w-full grid *:row-start-1 *:col-start-1" bind:this={answersElmnts[2]}>
                {#key answer3}
                    <p 
                        class="w-full text-right" 
                        in:fly={{ x: 40, duration: 400 }}
                        out:fly={{ y: 20, x: -20, duration: $questionOutTransitionDuration + 50 }}
                    >
                        {answer3}
                    </p> 
                {/key}
            </div>
            <div class="w-full grid *:row-start-1 *:col-start-1" bind:this={answersElmnts[3]}>
                {#key answer4} 
                    <p 
                        class="w-full text-right"
                        in:fly={{ x: 40, duration: 400 }} 
                        out:fly={{ y: 20, x: -20, duration: $questionOutTransitionDuration + 50 }}
                    >
                        {answer4}
                    </p> 
                {/key}
            </div>
            
        </div>
    </div>
    {#if isWoodMode}
        <svg>
            <filter id="wavy2">
                <feTurbulence x="0" y="0" baseFrequency="0.02" numOctaves="5" seed="1" />
                <feDisplacementMap in="SourceGraphic" scale="20" />
            </filter>
        </svg>
    {/if}
</div>

<style lang="sass">
    @import '$lib/assets/chromeScrollbarStyle.sass'
    @include chrome-scrollbar(#ae9c73, #e5d4b9)
    .parchment
        @apply absolute top-0 flex
        width: calc(100% - 20px)
        height: calc(100% - 10px)
        padding: 4em
        box-shadow: 2px 3px 20px black, 0 0 125px #8f5922 inset
        background: #fffef0
        /* v2.1 : borders effect with SVG : try to play with scale to change them
        filter: url(#wavy2)
        /* v2.2 : Noise added for a vellum paper effect
        background-image: url(data:image/png;base64,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)

</style>
<script lang="ts">
	import { fly } from "svelte/transition";
	import { questionOutTransitionDuration } from "./quiz-main-stores";
    export let paragraphText: string | null = "This is a paragraph"

    let inputValue: number = 25
    let paragraphFontSize: number
    $: paragraphFontSize = inputValue / 100 + 0.8

    let formattedParagraphText: string
    let isParagraphEmpty: boolean
    $: if(!paragraphText || paragraphText.length === 0){
        isParagraphEmpty = true
    }else {
        isParagraphEmpty = false
        // Adds a new line to every New Paragraph Section.
        // RegexExpression match Examples: 1- , 2 - , (1) or (2 )... 
        let rgxExp = /\d+\s?-|\(+\s?(\d)+\s?\)/;
        formattedParagraphText = paragraphText.replace(rgxExp, (x, y) => '\n' + x)
    }

</script>

<div class="container">
    <input type="range" bind:value={inputValue}>
    <div class="paragraph-field-container">
        {#key formattedParagraphText}
            <span 
                in:fly={{ y:-20, x: 40, duration: 300 }} 
                out:fly={{ x: -40, duration: $questionOutTransitionDuration }} 
                style="font-size: {paragraphFontSize}em"
            >
                <p class="whitespace-pre-line">{formattedParagraphText ?? ""}</p>
            </span>
        {/key}
        {#if isParagraphEmpty}
            <div class="lock-image-container" in:fly={{ y:-20, x: 40, duration: 300 }} out:fly={{ y: 20, x: -20, duration: $questionOutTransitionDuration }}>
                <svg width="280" height="375" viewBox="0 0 280 375" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="154" width="280" height="221" rx="23" fill="black"/><circle cx="140" cy="249" r="28" fill="#454545"/><path d="M125 269H155L163.5 309H117L125 269Z" fill="#454545"/><path d="M206.5 93.502V155.502H242.5V91.502C238.833 61.1686 213.3 0.40195 140.5 0.00195016C67.7 -0.39805 41.1667 60.8353 37 91.502V155.502H73.5V91.502C76.8333 73.002 94.9 36.0019 140.5 36.0019C186.1 36.0019 203.5 74.3353 206.5 93.502Z" fill="black"/>
                </svg>
            </div>
        {/if}
    </div>
</div>

<style lang="sass">
    @import '$lib/assets/app.sass'
    @import '$lib/assets/chromeScrollbarStyle.sass'
    @include chrome-scrollbar(#ae9c73, #e5d4b9)
    .container
        position: relative
        border: 2px solid #009759
        height: 95%
        width: 95%
        padding: 3% 1% 3% 3%
        display: flex
        flex-direction: column
        align-items: center
        gap: 20px
        border: 3px solid #D4C299
        border-radius: 5px
        background-color: #D4C29960
        color: inherit
        overflow: hidden
        @include font-size-slider()
        input
            width: 100%
        .paragraph-field-container
            display: grid
            width: 100%
            height: calc(100% - 50px)
            *
                grid-row: 1 / 1
                grid-column: 1 / 1
            span
                width: 100%
                height: calc(100% - 10px)
                direction: rtl
                text-align: right
                overflow-y: auto
                overflow-x: hidden
                user-select: text
                scrollbar-width: thin
                scrollbar-color: #ae9c73 #e5d4b9
                p
                    padding-right: 10px
            .lock-image-container
                position: absolute
                top: 0
                left: 0
                width: 100%
                height: 100%
                display: flex
                justify-content: center
                align-items: center
                svg
                    max-height: 50%
                    max-width: 50%

</style>
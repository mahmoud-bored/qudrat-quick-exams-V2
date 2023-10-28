<script lang="ts">
    import { globalQuestionsAmount, currentQuestionCounter, timer, questionFontSize } from "$lib/stores"
    import { getHTMLElement } from "$lib/app"
    let inputValue: number = 25

    questionFontSize.set(inputValue / 100 + 0.8)
    $: questionFontSize.set(inputValue / 100 + 0.8)
    $: try{
            if($timer > 30){
                getHTMLElement(document.querySelector('.timer'))?.style.setProperty('color', '#167E20')
            }else if($timer <= 30 && $timer > 10){
                getHTMLElement(document.querySelector('.timer'))?.style.setProperty('color', '#f0ab08')
            }else if($timer <= 10){
                getHTMLElement(document.querySelector('.timer'))?.style.setProperty('color', '#C01E1E')
            }
        } catch(e){ }
</script>

<div class="container">
    <div><span>{$currentQuestionCounter}</span> / {$globalQuestionsAmount}</div>
    <div class="timer">{$timer}</div>
    <div>
        <input type="range" bind:value={inputValue}>
    </div>
</div>

<style lang="sass">
    @import '$lib/assets/app.sass'
    .container
        height: 95%
        background-color: transparent
        display: flex
        justify-content: space-between
        font-family: hoss-round-xnarrow,sans-serif
        font-size: 1.2em
        font-weight: 800
        color: #000
        div
            height: min(100%, 50px)
            width: 30%
            background-color: #c1ad82
            border-radius: 5px
            display: flex
            justify-content: center
            align-items: center
            input
                width: 90%
        .timer
            width: 20%
            transition: all 0.2s ease
            color: #167E20
</style>
<script lang="ts">
    import { questionAlignment } from '$lib/stores'
    import { getHTMLElement } from '$lib/app'
    import columnAlignImgSrc from '$lib/assets/column-align-icon.svg'
    import rowAlignImgSrc from '$lib/assets/row-align-icon.svg'
    
    export let isWoodMode: boolean
    export let isLandscape: boolean

    function changeQuestionAlighnment(align: string){
        questionAlignment.set(align)
        const buttons = document.querySelectorAll('.question-align-container > button')
        buttons.forEach((button) => {
            getHTMLElement(button).style.setProperty('background-color', 'transparent')
        })
        getHTMLElement(document.querySelector(`button[data-value="${align}"]`)).style.setProperty('background-color', '#5272F230')
    }
</script>

<div class="container">
    <div class="question-align-container">
        <button class="column-align-container" data-value="column" on:click={()=> changeQuestionAlighnment('column')}>
            <img src={columnAlignImgSrc} alt="align column">
        </button>
        <button class="row-align-container" data-value="row" on:click={()=> changeQuestionAlighnment('row')}>
            <img src={rowAlignImgSrc} alt="align row">
        </button>
    </div>
    <div class="choices-container" class:isWoodMode>
        <button class="choice" class:choice-landscape={isLandscape} data-value="أ">أ</button>
        <button class="choice" class:choice-landscape={isLandscape} data-value="ب">ب</button>
        <button class="choice" class:choice-landscape={isLandscape} data-value="ج">ج</button>
        <button class="choice" class:choice-landscape={isLandscape} data-value="د">د</button>
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
            height: 90%
            width: 80%
            display: flex
            flex-direction: column
            justify-content: space-evenly
            align-items: center
            color: #fff
            gap: 5px
            .choice
                height: 100%
                width: 100%
                border-radius: 5px
                border: 1px solid #5eee25
                background-color: #5eee2530
                display: flex
                justify-content: center
                align-items: center
                transition: all 0.2s ease
                @media (hover: hover)
                    &:hover
                        background-color: #5eee2590
                        color: #fff
            .choice-landscape
                height: auto
                aspect-ratio: 1 / 1
</style>
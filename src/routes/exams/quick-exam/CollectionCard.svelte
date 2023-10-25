<script lang="ts">
    import { examsCutomizationTabVisible, examsCollection } from "$lib/stores.ts"
    export let title: string
    export let questionsAmount: string
    export let collectionObj: object
    function showCustomizationTab(){
        examsCutomizationTabVisible.set(true)
    }
    function setExamsCollection(){
        examsCollection.set(collectionObj)
        console.log(collectionObj)
    }
</script>

<div class="collection-container">
    <div class="left-side-container">
        <button class="collection-customize-button" on:click={()=> {showCustomizationTab(); setExamsCollection() }}>تخصيص</button>
        <p>{questionsAmount} سؤال</p>
    </div>
    <hr>
    <div class="right-side-container">
        <p>{title}</p>
        <input type="checkbox">
    </div>
</div>

<style lang="sass">
    @import '$lib/assets/app.sass'
    .collection-container
        padding: 5px 10px
        min-height: 55px
        width: 90%
        border-radius: 5px
        background-color: $color-bg-secondary
        display: flex
        justify-content: space-evenly
        align-items: center
        gap: 7px
        transition: all 0.2s ease
        border: 3px solid transparent
        cursor: pointer
        @include outer-shadow()
        div
            width: 100%
            display: flex
            align-items: center
        .left-side-container
            justify-content: space-between
            .collection-customize-button
                width: 50%
                border-radius: 5px
                border: 2px solid $color-primary
                display: flex
                justify-content: center
                align-items: center
                font-size: min(3.5vw, 0.9em)
                transition: all 0.2s ease
                @media (hover: hover)
                    &:hover
                        background-color: $color-primary
                        color: $color-bg-secondary
            p
                font-size: min(4.5vw, 0.8rem)
                color: #979797
                direction: rtl
        .right-side-container
            justify-content: flex-end
            gap: 10px
            font-size: min(4.5vw, 1.2rem)
            input
                border: 3px solid $color-bg-secondary
                min-width: 20px
                min-height: 20px
        hr
            height: 90%
        @media (hover: hover)
            &:hover
                border: 3px solid $color-primary
                .right-side-container
                    input
                        border: 3px solid $color-primary
</style>
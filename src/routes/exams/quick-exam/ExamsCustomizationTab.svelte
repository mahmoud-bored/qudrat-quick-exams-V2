<script lang="ts">
	import { fade, fly } from "svelte/transition"
    import closeIconSrc from '$lib/assets/close-icon.svg'
    import { examsCutomizationTabVisible } from "$lib/stores.ts"

    interface Collection {
        info: object;
        examsOrder: string[];
        exams: Record<string, string>;
    }
    export let collectionObj: any
    const examsOrder = collectionObj.examsOrder
    const exams = collectionObj['exams']

    function closeTab(){
        examsCutomizationTabVisible.set(false)
    }
</script>
    

<div class="customization-tab-container" transition:fly={{ y: -30, duration: 400 }}>
    <div class="customization-tab" transition:fly={{ x: 40, duration: 600 }}>
        <div class="customization-tab-header-container">
            <button 
                class="close-button-container" 
                on:click={ closeTab }
                transition:fly={{ y: -20, duration: 600 }} 
            >
                <img src={ closeIconSrc } alt="x">
            </button>
            <button class="select-all-button" transition:fly={{ x: 20, duration: 600 }} >
                <p>تحديد الكل</p>
                <input type="checkbox">
            </button>
        </div>
        <div class="customization-tab-body-container">
            {#each examsOrder as examID, i}
                <button class="exam-card" transition:fly={{ y: 60, duration: i * 50 + 600 }}>
                    <div class="button-subtxt">{exams[examID]['numberOfQuestions']} سؤال</div>
                    <hr>
                    <div class="button-title">
                        <input type="checkbox">
                        <p>{exams[examID]['name']}</p>
                    </div>

                </button>
            {/each}
        </div>
        <div class="customization-tab-footer-container" transition:fly={{ x: 50, duration: 600 }}>
            <button on:click={ closeTab } >تم</button>
        </div>
    </div>
</div>




<style lang="sass">
    @import '$lib/assets/app.sass'
    .customization-tab-container
        position: absolute
        top: 0
        left: 0
        background-color: rgba(0, 0, 0, 0.3)
        width: 100%
        height: 100%
        display: flex
        justify-content: center
        align-items: center
        .customization-tab
            position: relative
            height: 90%
            width: 90%
            background-color: $color-bg-primary
            border-radius: 10px
            border: 4px solid $color-bg-secondary
            padding: 15px 0
            display: flex
            flex-direction: column
            justify-content: space-between
            align-items: center
            @include inner-shadow()
            .customization-tab-header-container
                width: 90%
                display: flex
                justify-content: space-between
                .close-button-container
                    height: 30px
                    width: 30px
                    border-radius: 50%
                    background-color: #CE3030
                    display: flex
                    justify-content: center
                    align-items: center
                    transition: all 0.2s ease
                    cursor: pointer
                    box-shadow: 2px 4px 16px -6px rgba(0, 0, 0, 0.75)
                    -webkit-box-shadow: 2px 4px 16px -6px rgba(0, 0, 0, 0.75)
                    -moz-box-shadow: 2px 4px 16px -6px rgba(0, 0, 0, 0.75)
                    img
                        width: 40%
                        margin-right: 1px
                    @media (hover: hover)
                        &:hover
                            background-color: #FF3030
                .select-all-button
                    display: flex
                    justify-content: flex-start
                    align-items: center
                    gap: 10px
                    font-size: 1.2em
                    text-shadow: 3px 5px 5px rgba(0, 0, 0, 0.4)

            .customization-tab-body-container
                height: 100%
                width: 100%
                margin-top: 20px
                display: flex
                flex-direction: column
                justify-content: flex-start
                align-items: center
                gap: 20px
                overflow-y: auto
                scrollbar-width: thin
                .exam-card
                    width: 85%
                    min-height: 50px
                    background-color: $color-bg-secondary
                    border-radius: 10px
                    display: flex
                    justify-content: space-between
                    align-items: center
                    border: 3px solid $color-bg-secondary
                    transition: all 0.2s ease
                    padding: 0 10px
                    gap: 10px
                    @include outer-shadow()
                    @media (hover: hover)
                        &:hover
                            border: 3px solid $color-primary
                            .button-title
                                input
                                    border: 3px solid $color-primary
                    .button-subtxt
                        font-size: 0.8em
                        color: #979797
                        direction: rtl
                        width: 19%
                    hr
                        height: 70%
                    .button-title
                        width: 80%
                        display: flex
                        justify-content: flex-start
                        align-items: center
                        direction: rtl
                        gap: 10px
                        p
                            font-size: 0.9em
                        input
                            border: 3px solid $color-bg-secondary
                            min-width: 20px
                            min-height: 20px
            .customization-tab-footer-container
                width: 100%
                display: flex
                justify-content: center
                align-items: center
                button
                    height: 50px
                    width: 90%
                    border-radius: 7px
                    background-color: $color-bg-secondary
                    border: 2px solid $color-primary
                    color: $color-primary
                    transition: all 0.2s ease-in-out
                    font-size: min(4.5vw, 1.2rem)
                    font-weight: 800
                    display: flex
                    justify-content: center
                    align-items: center
                    cursor: pointer
                    @media (hover: hover)
                        &:hover
                            background-color: $color-primary
                            color: $color-bg-primary



</style>
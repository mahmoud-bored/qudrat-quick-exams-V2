<script lang="ts">
    export let paragraphTxt: string = "This is a paragraph"

    let inputValue: number = 25
    let paragraphFontSize: number
    $: paragraphFontSize = inputValue / 100 + 1.1
</script>

<div class="container">
    <input type="range" bind:value={inputValue}>
    <p style="font-size: {paragraphFontSize}em">{paragraphTxt}</p>
</div>

<style lang="sass">
    @import '$lib/assets/app.sass'
    .container
        border: 2px solid #009759
        height: 95%
        width: 95%
        padding: 20px
        display: flex
        flex-direction: column
        align-items: center
        gap: 20px
        border: 3px solid #D4C299
        border-radius: 5px
        background-color: #D4C29960
        color: inherit
        input
            width: 100%
        p
            width: 100%
            text-align: right
            direction: rtl
            user-select: text
</style>
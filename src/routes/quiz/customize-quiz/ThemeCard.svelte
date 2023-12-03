<script lang="ts">
    import { examTheme } from "$lib/stores"
	import { onMount } from "svelte";

    export let src: string
    export let themeName: string
    
    let active = false

    let activeTheme: string
    examTheme.subscribe((value)=> activeTheme = value)
    onMount(()=>{
        document.querySelector('.active')?.classList.remove('active')
        document.querySelector(`.container[data-id="${activeTheme}"]`)?.classList.add('active')
    })
    
    function setActiveTheme(){
        document.querySelector('.active')?.classList.remove('active')
        document.querySelector(`.container[data-id="${themeName}"]`)?.classList.add('active')
        examTheme.set(themeName)
    }
</script>
<button class="container" class:active data-id="{themeName}" on:click={setActiveTheme}>
    <img {src} alt="">
    <div>
        <h2>{themeName}</h2>
    </div>
</button>

<style lang="sass">
    @import '$lib/assets/app.sass'
    .container
        width: calc(100% - 6px)
        border-radius: 10px
        background-color: $color-bg-secondary
        display: flex
        flex-direction: column
        justify-content: center
        transition: all 0.2s ease
        border: 3px solid transparent
        cursor: pointer
        @include outer-shadow()
        img
            aspect-ratio: 1340/750
            width: 100%
            border-top-right-radius: 10px
            border-top-left-radius: 10px
        div
            height: 100%
            width: 100%
            padding: 5px 0
            display: flex
            justify-content: center
            align-items: center
        @media (hover: hover)
            &:hover
                background-color: $color-primary
                color: $color-bg-secondary
                border: 3px solid $color-primary
    .active
        background-color: $color-primary
        color: $color-bg-secondary
        border: 3px solid $color-primary

</style>
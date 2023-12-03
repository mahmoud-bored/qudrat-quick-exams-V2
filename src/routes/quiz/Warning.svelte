<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import { fly } from "svelte/transition";

    let inTransition = false
    let isMessageVisible = true
    onMount((()=> {
        setTimeout(()=> inTransition = true, 50)
    }))
    setTimeout(()=> isMessageVisible = false, 1500)

    export let message: string
</script>
{#if isMessageVisible}
    <div class:in-transition={inTransition} out:fly={{ x: -50, duration: 200}}>
        <p>
            {message}
        </p>
        
    </div>
{/if}
<style lang="sass">
    div
        width: 100%
        position: absolute
        top: -110px
        display: flex
        justify-content: center
        transition: all ease 0.2s
        p
            width: min(95vw, 400px)
            padding: 10px
            text-align: center
            direction: rtl
            font-size: 1em
            font-weight: 400
            color: #fff
            background-color: #DC354520
            border: 2px solid #DC354560
            border-radius: 3px
    .in-transition
        top: 10px
</style>
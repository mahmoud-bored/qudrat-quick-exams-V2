<script lang="ts">
	import { fly } from "svelte/transition";

    export let message: string
</script>
<div in:fly={{ y: -20, duration: 400}} out:fly={{ y: 20, duration: 400}}>
    <p>
        {message}
    </p>
    
</div>

<style lang="sass">
    div
        width: 100%
        position: absolute
        top: 10px
        display: flex
        justify-content: center
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
</style>
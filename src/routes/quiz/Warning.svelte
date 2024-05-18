<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import { fly } from "svelte/transition";
    export let message: string

    let isMessageVisible = false
    onMount((()=> {
        isMessageVisible = true
        setTimeout(()=> isMessageVisible = false, 1500)
    }))

</script>
{#if isMessageVisible}
    <div class="w-full absolute top-2 flex justify-center transition" in:fly={{ y: -50, duration: 200}} out:fly={{ x: -50, duration: 200}}>
        <p class="w-[min(95vw,400px)] p-2 text-center text-base font-messiri text-white bg-[#DC354520] border-2 border-[#DC354560] rounded" dir="rtl">
            {message}
        </p>
        
    </div>
{/if}

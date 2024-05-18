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
        document.querySelector(`.themeCard[data-id="${activeTheme}"]`)?.classList.add('active')
    })
    
    function setActiveTheme(){
        document.querySelector('.active')?.classList.remove('active')
        document.querySelector(`.themeCard[data-id="${themeName}"]`)?.classList.add('active')
        examTheme.set(themeName)
    }
</script>
<button 
    class="group themeCard w-[calc(100%-6px)] rounded-lg bg-secondary-light flex flex-col justify-center 
        transition border-3 border-transparent cursor-pointer outer-shadow hover:bg-primary hover:border-primary"
    class:active 
    data-id="{themeName}" 
    on:click={setActiveTheme}
>
    <img class="aspect-[1340/750] w-full rounded-t-lg" {src} alt="">
    <div class="h-full w-full py-1 flex-center">
        <p class="group-hover:text-secondary-light text-lg">{themeName}</p>
    </div>
</button>

<style lang="sass">
    .active
        @apply bg-primary border-primary
        p
            @apply text-secondary-light
</style>
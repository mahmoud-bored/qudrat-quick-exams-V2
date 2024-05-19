<script lang="ts">
    import { fade, fly } from 'svelte/transition';

    export let title: string | null = null
    export let text: string | null = null
    export let cancelBtnText: string = 'الرجوع'
    export let confirmBtnText: string = 'إنهاء'
    export let callback: () => void

    let isPopupOpen = false

    function escapeBtnListener(e: KeyboardEvent) {
        if (e.key === 'Escape' || e.key === 'Esc') {
            isPopupOpen = false
        }
    }
    $: if(isPopupOpen) {
        window.addEventListener('keydown', escapeBtnListener)
    } else {
        window.removeEventListener('keydown', escapeBtnListener)
    }
</script>

<button class="w-full h-full flex-center *:pointer-events-auto" on:click={() => isPopupOpen = true}>
    <slot/>
</button>

{#if isPopupOpen}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div 
        class="absolute top-0 left-0 h-full w-full bg-black/40 z-[100]" 
        transition:fade={{ duration: 200 }} 
        on:click={() => isPopupOpen = false }
    />
    <div 
        class="translate-center w-[min(90vw,600px)] flex-center flex-col p-7 rounded-lg text-white gap-2 
            bg-secondary-default border-4 border-secondary-light z-[101]" 
        in:fly={{ y: -40, x: 40, duration: 400 }} 
        out:fly={{ y: 40, duration: 200 }}
    >
        <button 
            class="absolute top-2 right-2 w-7 h-7 flex-center rounded-full bg-red-500 hover:bg-red-400 transition" 
            on:click={() => isPopupOpen = false}
        >
            <svg class="w-4/10" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.5439 2L1.99994 19.1568" stroke="white" stroke-width="3" stroke-linecap="round"/><path d="M18.5957 19.2598L2.05121 2.10348" stroke="white" stroke-width="3" stroke-linecap="round"/>
            </svg>
        </button>

        {#if title}
            <p class="text-lg text-center" dir="rtl">{title}</p>
        {/if}
        {#if text}
            <p class="text-base w-full p-2 mt-1" dir="rtl">{text}</p>
        {/if}
        <div class="w-full flex justify-evenly mt-2">
            <button 
                class="w-3/10 h-10 flex-center rounded-md bg-red-500 hover:bg-red-500/80 transition" 
                on:click={() => {
                    isPopupOpen = false
                    callback()
                }}
            >
                {confirmBtnText}
            </button>
            <button 
                class="w-3/10 h-10 flex-center rounded-md bg-secondary-light hover:bg-secondary-light/60 transition" 
                on:click={() => isPopupOpen = false }
            >
                {cancelBtnText}
            </button>
        </div>
    </div>
{/if}
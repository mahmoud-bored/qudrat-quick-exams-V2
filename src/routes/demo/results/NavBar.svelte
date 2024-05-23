<script lang="ts">
	import { fade, fly } from "svelte/transition";
    import { activeQuestionsSection } from "./quiz-results-stores";
	import type { Writable } from "svelte/store";

    export let isLandscape: boolean
    export let isNavigationIntentional: Writable<boolean>

    let isAllActive:boolean , isCorrectActive: boolean, isIncorrectActive: boolean, isMarkedActive: boolean, isSkippedActive: boolean
    $: {
        [isAllActive, isCorrectActive, isIncorrectActive, isMarkedActive, isSkippedActive] = Array(5).fill(false)
        if($activeQuestionsSection == 'all'){ isAllActive = true }
        else if($activeQuestionsSection == 'correct') { isCorrectActive = true }
        else if($activeQuestionsSection == 'incorrect') { isIncorrectActive = true }
        else if($activeQuestionsSection == 'marked') { isMarkedActive = true }
        else if($activeQuestionsSection == 'skipped') { isSkippedActive = true }
    }
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

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
{#if isPopupOpen}
<div class="fixed top-0 left-0 h-full w-full z-[100]">
    <div 
        class="fixed top-0 left-0 h-dvh w-full bg-black/40 z-[101]" 
        transition:fade={{ duration: 200 }} 
        on:click={() => isPopupOpen = false }
    />
    <div 
        class="fixed translate-center w-[min(90vw,600px)] flex-center flex-col p-7 rounded-lg text-white gap-2 
            bg-secondary-default border-4 border-secondary-light font-messiri z-[102]" 
        in:fly={{ y: -20, x: 40, duration: 400 }} 
        out:fly={{ y: 40, duration: 200 }}
    >
        <button 
            class="fixed top-2 right-2 w-7 h-7 flex-center rounded-full bg-red-500 hover:bg-red-400 transition" 
            on:click={() => isPopupOpen = false}
        >
            <svg class="w-4/10" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.5439 2L1.99994 19.1568" stroke="white" stroke-width="3" stroke-linecap="round"/><path d="M18.5957 19.2598L2.05121 2.10348" stroke="white" stroke-width="3" stroke-linecap="round"/>
            </svg>
        </button>
    
            <p class="text-lg text-center" dir="rtl">هل أنت متأكد من الخروج؟</p>
            <p class="text-base text-center w-full p-2 mt-1" dir="rtl">سيتم فقدان جميع النتائج ولن تتمكن من العودة إلى هذه الصفحة.</p>
        <div class="w-full flex justify-evenly mt-2">
            <button 
                class="w-3/10 h-10 flex-center rounded-md bg-red-500 hover:bg-red-500/80 transition" 
                on:click={() => {
                    isNavigationIntentional.set(true)
                    window.location.href = '/demo'
            }}
            >
                خروج
            </button>
            <button 
                class="w-3/10 h-10 flex-center rounded-md bg-secondary-light hover:bg-secondary-light/60 transition" 
                on:click={() => isPopupOpen = false }
            >
                الغاء
            </button>
        </div>
    </div>

</div>
{/if}
<nav 
    class="fixed top-1/2 right-0 left-auto -translate-x-0 -translate-y-1/2 
    flex-center flex-col gap-3 h-max w-fit p-3 rounded-tr-none rounded-l-md bg-secondary-light"
    class:mobile-view={!isLandscape}
>
    <div class="buttons-container flex flex-col gap-2">
        <button 
            class="w-12 h-12 flex-center rounded border-2 border-secondary-default bg-secondary-light hover:bg-secondary-default transition" 
            class:bg-secondary-default={isAllActive} 
            on:click={()=> activeQuestionsSection.set('all')}
        >
            <p class="text-lg text-cyan-200 font-messiri">الكل</p>
        </button>
        <button 
            class="w-12 h-12 flex-center rounded border-2 border-secondary-default bg-secondary-light hover:bg-secondary-default transition" 
            class:bg-secondary-default={isCorrectActive} 
            on:click={()=> activeQuestionsSection.set('correct')}
        >
            <svg class="w-8/10 h-8/10" width="257" height="199" viewBox="0 0 257 199" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M210.75 6.7959L249.792 45.9089L114.814 180.641C105.042 190.395 89.2124 190.38 79.4582 180.608L58.0782 159.189L210.75 6.7959Z" fill="#A5EB78"/><path d="M237.191 33L250.024 45.8563L110.861 184.766C103.76 191.853 92.259 191.843 85.1716 184.742V184.742L237.191 33Z" fill="#95D46C"/><rect x="7.18359" y="108.787" width="53.2178" height="90" transform="rotate(-45.2399 7.18359 108.787)" fill="#A5EB78"/><path d="M69 94.5L90 116.5C91.1667 117.5 94 119.5 96 119.5C98 119.5 101.167 117.5 102.5 116.5L213.5 5L252 43L221 74" stroke="black" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M210 86L118.5 177.5C115.333 180.667 106.5 187.2 96.5 188C86.5 188.8 77.3333 181.333 74 177.5L5 107.5L43 70L56.5 83.5" stroke="black" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
        <button 
            class="w-12 h-12 flex-center rounded border-2 border-secondary-default bg-secondary-light hover:bg-secondary-default transition" 
            class:bg-secondary-default={isIncorrectActive}
            on:click={()=> activeQuestionsSection.set('incorrect')}
        >
            <svg class="w-8/10 h-8/10" width="198" height="197" viewBox="0 0 198 197" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M155.758 7L99 63.5636L41.871 7L7 41.7515L64.129 98.3152L7 155.248L41.871 190L99 133.436L155.758 189.63L190.629 154.879L133.5 97.9455L191 41.7515L155.758 7Z" fill="#F74354" stroke="black" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
        <button 
            class="w-12 h-12 flex-center rounded border-2 border-secondary-default bg-secondary-light hover:bg-secondary-default transition" 
            class:bg-secondary-default={isMarkedActive} 
            on:click={()=> activeQuestionsSection.set('marked')}
        >
            <svg class="w-8/10 h-8/10" width="110" height="127" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.1895 11C18.1895 4.92487 23.1143 0 29.1895 0H80.1895C86.2646 0 91.1895 4.92487 91.1895 11V78H18.1895V11Z" fill="#FFCD00"/><path d="M28.5056 105.542C24.7704 109.46 18.1654 106.819 18.1626 101.405L18.1458 68.6781C18.144 65.2931 20.9411 62.5768 24.3245 62.6777L54.7996 63.586C60.057 63.7427 62.5827 70.1069 58.8635 73.826L56.1895 76.5L28.5056 105.542Z" fill="#FFCD00"/><path d="M80.9455 105.127C84.7007 108.998 91.2589 106.335 91.2521 100.942L91.2111 68.7028C91.2068 65.3231 88.4133 62.6138 85.0351 62.713L54.6915 63.6037C49.4935 63.7562 46.9376 69.998 50.5356 73.7525L52.6895 76L80.9455 105.127Z" fill="#FFCD00"/><path d="M53.5139 50.5C56.7139 50.5 58.1805 47.5 58.5139 46L61.0137 17.5C61.1804 15.3333 59.9139 11 53.5139 11C47.1139 11 45.8472 15.3333 46.0139 17.5L48.5139 46C48.8472 47.5 50.3139 50.5 53.5139 50.5Z" fill="black"/><path d="M53.5292 46.5C54.4025 46.5 54.5 45 54.5292 44.5C54.5584 44 57.0293 18.5 57.0293 18.5C57.1959 17.3333 56.7292 15 53.5292 15C50.3292 15 49.8626 17.3333 50.0292 18.5C50.0292 18.5 52.5 44 52.5292 44.5C52.5584 45 52.656 46.5 53.5292 46.5Z" fill="white"/><circle cx="53.5" cy="60.5" r="6.5" fill="black"/><circle cx="53.5" cy="60.5" r="2.5" fill="white"/>
            </svg>
        </button>
    </div>
    <hr class="w-full h-0 border-zinc-500 border"/>
    <div>
        <button 
            class="group w-12 h-12 flex-center rounded-full border-2 border-red-500 bg-secondary-default hover:bg-red-500 transition"
            on:click={() => {
                isPopupOpen = true
            }}    
        >
            <svg class="w-6/10 h-6/10 mb-[2px] mr-[6px] rotate-180 *:stroke-red-500 group-hover:*:stroke-white transition" width="129" height="125" viewBox="0 0 129 125" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M83 30V21C83 12.1634 75.8366 5 67 5H21C12.1634 5 5 12.1634 5 21V104C5 112.837 12.1634 120 21 120H67C75.8366 120 83 112.837 83 104V94" stroke="white" stroke-width="10" stroke-linecap="round"/>
                <path d="M56 63H121" stroke="white" stroke-width="10" stroke-linecap="round"/>
                <path d="M108.5 79.5L119.684 69.9526C124.496 65.8447 124.332 58.3566 119.344 54.4638L108.5 46" stroke="white" stroke-width="9" stroke-linecap="round"/>
            </svg>
        </button>
    </div>
</nav>

<style lang="sass">
    .mobile-view
        @apply bottom-0 left-1/2 translate-y-0 -translate-x-1/2 flex-row-reverse w-full rounded-t-md
        top: unset
        .buttons-container
            @apply flex-row-reverse
        hr
            @apply w-0 h-12
</style>

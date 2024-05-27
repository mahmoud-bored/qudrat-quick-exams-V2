<script lang="ts">
    import { featureFlags } from "$lib/stores";
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
            class="fixed top-0 left-0 h-full-vh supports-dvh:h-dvh w-full bg-black/40 z-[101]" 
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
                        window.location.href = '/quiz'
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
        {#if $featureFlags.skipQuestionButton}
            <button 
                class="w-12 h-12 flex-center rounded border-2 border-secondary-default bg-secondary-light hover:bg-secondary-default transition" 
                class:bg-secondary-default={isSkippedActive} 
                on:click={()=> activeQuestionsSection.set('skipped')}
            >
                <svg class="w-8/10 h-8/10" width="234" height="320" viewBox="0 0 234 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M87.091 112.232C91.491 107.032 92.591 101.732 92.591 99.7319C92.9243 95.0651 93.791 85.0314 94.591 82.2314C95.591 78.7314 100.591 69.7314 106.591 64.2314C112.591 58.7314 122.091 53.7314 131.091 52.7314C138.291 51.9314 145.758 53.0648 148.591 53.7314C149.924 53.2314 153.791 52.2314 158.591 52.2314C170.091 52.2314 174.591 54.7314 182.091 58.2314C188.091 61.0314 193.924 67.7314 196.091 70.7314C198.591 74.8981 203.591 86.5314 203.591 99.7314C203.591 112.931 195.591 122.898 191.591 126.231C188.258 129.065 180.391 135.131 175.591 136.731C169.591 138.731 161.591 143.231 157.591 146.231C153.591 149.231 144.091 160.231 138.591 170.231C134.191 178.231 133.424 189.565 133.591 194.231C133.591 197.731 133.193 205.85 133.591 210.231C134.091 215.731 137.283 220.462 139.591 223.231C142.091 226.231 145.758 228.898 148.091 230.231C149.924 229.565 154.391 227.231 157.591 223.231C160.791 219.231 163.091 212.731 163.091 210.231V194.231C163.091 192.231 163.748 190.803 164.091 190.231C165.591 187.731 169.342 186.669 171.091 186.231C173.091 185.731 183.591 180.731 187.591 178.231C191.5 175.788 206.091 167.231 218.591 147.231C231.091 127.231 232.591 112.232 233.091 96.7314C233.736 76.7314 226.091 53.2316 212.591 36.2316C201.791 22.6316 188.091 14.2314 178.091 8.73187C173.091 5.73187 157.591 -1.26837 138.091 1.73187C115.091 6.73187 99.9982 18 81.091 39.7319C65.6719 57.4545 61.5 87 62.4992 100C62.9075 102.768 64.4992 108.5 67.4992 112C70.535 115.542 74.9992 120 77.4992 120.5C78.8326 120.167 82.691 117.432 87.091 112.232Z" fill="#4F92F3"/><path d="M101.986 19.5C115.986 8.7 129.5 3 139 2C148.5 1 149 1 149 1L126.989 0C121.322 0.666667 107.389 3.2 96.9886 8C83.9886 14 71.9886 22 62.4886 34C52.9886 46 45.9885 57.5 41.9885 72.5C37.9885 87.5 38.5 98.5 39.4885 102C40.4494 105.402 41.4885 110.5 47.4885 116.5C52.2885 121.3 58.1552 122.833 60.4885 123C62.4885 123 67.3885 122.9 70.9885 122.5C74.5885 122.1 76.8218 121 77.4885 120.5C74.9885 120 70.9885 116 66.9885 111C63.6267 106.798 62.3216 99.1667 62.4881 95.5C61.9881 86.5 66.9864 69.5 70.4864 59C73.9864 48.5 84.4864 33 101.986 19.5Z" fill="#0D6EFD"/><path d="M175.545 73.8503C169.145 61.8503 154.333 55.334 148.5 53.5007C165 47.5 206.045 58.8517 205.045 91.8503C203.664 137.43 174 132 157.045 147.851C140.09 163.702 137.045 178.35 135.545 187.35C134.109 195.968 134.545 207.85 135.545 212.85C136.545 217.85 137.165 219.251 140.045 222.85C144.045 227.85 146.5 229.5 148.5 230C148.167 230.333 145.759 231.448 143 232C138 233 135.635 233.534 133.5 233C129.5 232 125.145 229.65 121.545 226.85C117.045 223.35 113.045 217.85 112.045 212.85C111.045 207.85 110.545 199.35 111.545 187.35C112.545 175.35 120.545 162.35 124.045 156.85C127.545 151.35 136.045 145.35 141.045 141.85C145.045 139.05 155.378 134.684 160.045 132.85C164.545 130.35 169.045 126.85 172.545 121.85C180.115 111.036 181.545 101.46 181.545 97.3503C181.545 93.8503 181.945 85.8503 175.545 73.8503Z" fill="#0D6EFD"/><path d="M88.5596 0H126.56C121.727 1 109.261 4 98.0605 8C84.0605 13 72.9449 22.4916 62 35C51.5 47 45.0605 62.5 43.0605 70C40.5699 79.34 38.7272 93 39.0605 99C39.3939 102 41.2605 109.4 46.0605 115C50.8605 120.6 58.3939 122.667 61.5605 123H21.0605C17.5605 123 12.0605 119 7.56055 115C3.06055 111 0.559634 102.5 0.0596344 96.5C-0.440366 90.5 2.05963 69.5 13.0596 49C24.0596 28.5 45.5596 14.5 58.5596 8C68.9596 2.8 82.893 0.5 88.5596 0Z" fill="#1365DD"/><path d="M140.5 79.6803C136.9 68.8803 124.833 59.1667 119.5 56C121.667 54.6667 128.1 52.5803 134.5 52.1803C142.5 51.6803 143.5 52.1804 151 54.1803C157.832 56.0023 178.5 66.1806 182 91.1803C186.27 121.681 159 135.181 146.5 139.68C139.581 142.171 132.667 148.847 130 151.68C128 153.847 122.9 159.98 118.5 167.18C114.1 174.38 112.667 184.847 112.5 189.18C112.5 189.18 111.5 208.847 112.5 212.18C113.5 215.514 116.8 223.18 122 227.18C127.2 231.18 132.5 232.847 134.5 233.18C121.667 233.18 95.6 233.08 94 232.68C92 232.18 88.5 231.18 81.5 225.18C75.9 220.38 74.1667 212.847 74 209.68V192.68C74 188.18 75 182.18 77 175.18C80 164.68 86 156.181 95 148.181C104.781 139.486 115.5 137.18 121 134.18C126.5 131.18 135.79 124.548 140 113.181C145 99.6807 145 93.1803 140.5 79.6803Z" fill="#1365DD"/><rect x="74" y="266" width="93" height="54" rx="27" fill="#1365DD"/><circle cx="140" cy="293" r="27" fill="#0D6EFD"/><path d="M167 293C167.693 280.194 157.667 271.5 152.5 269C152.5 269 137.512 275.5 137.012 292.5C136.512 309.5 152 317 152 317C152 317 165.999 311.5 167 293Z" fill="#4F92F3"/>
                </svg>
            </button>
        {/if}
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

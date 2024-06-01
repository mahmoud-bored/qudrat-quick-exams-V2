<script lang="ts">
	import { fade, fly } from "svelte/transition";
    import { 
        totalTimer,
        generalCurrentQuestionsMap, 
        generalAllQuestionsMap,
        generalCorrectQuestionsMap,
        generalIncorrectQuestionsMap,
        generalSkippedQuestionsMap,
        generalMarkedQuestionsMap    
    } from "../quiz-stores";
    import NavBar from "./NavBar.svelte"
    import './page.sass'
	import { activeQuestionsSection } from "./quiz-results-stores";
	import QuestionCard from "./QuestionCard.svelte";
	import { onMount } from "svelte";
	import { beforeNavigate } from "$app/navigation";
	import PopupConfirmation from "$lib/PopupConfirmation.svelte";
	import { writable } from "svelte/store";

    // Get questions amounts
    const questionsAmount = $generalCurrentQuestionsMap?.size
    const correctQuestionsAmount = $generalCorrectQuestionsMap?.size
    const incorrectQuestionsAmount = $generalIncorrectQuestionsMap?.size
    const skippedQuestionsAmount = $generalSkippedQuestionsMap?.size
    const markedQuestionsAmount = $generalMarkedQuestionsMap?.size

    let exitConfirmationOpenBtn: HTMLDivElement
    const isNavigationIntentional = writable(false)
    beforeNavigate(({ cancel, type }) => {
        if(!$isNavigationIntentional) {
            cancel()
            if(type !== 'leave' && type !== "link") {
                exitConfirmationOpenBtn.click()
            }
        }
    })
    let cardSettings = { bg: "/images/quizThemeLightBg.webp", color: "#000" }
    let percentageElmnt: HTMLSpanElement
    onMount(async () => {
        // Set Question Percentage Color
        if(correctQuestionsPercentage < 60) {
            percentageElmnt.style.setProperty('color', '#ff4a4a');
            percentageElmnt.style.setProperty('text-shadow', '0px 0px 8px');
        }else if (correctQuestionsPercentage < 80) {
            percentageElmnt.style.setProperty('color', '#fdd849');
        }else if (correctQuestionsPercentage < 90) {
            percentageElmnt.style.setProperty('color', '#06a664');
        }else if ( correctQuestionsAmount <= 100 ) {
            percentageElmnt.style.setProperty('color', '#06a664');
            percentageElmnt.style.setProperty('text-shadow', '0px 0px 8px');
        }
    })
    
    // get questions amounts percentages
    const correctQuestionsPercentage = Math.round(correctQuestionsAmount * 100 / questionsAmount)
    const incorrectQuestionsPercentage = Math.round(incorrectQuestionsAmount * 100 / questionsAmount)
    const skippedQuestionsPercentage = Math.round(skippedQuestionsAmount * 100 / questionsAmount)
    
    let isLandscape: boolean
    let screenWidth: number
    let screenHeight: number
    $:  if (screenWidth > screenHeight) isLandscape = true 
        else isLandscape = false

    const quizTime = $totalTimer
    const date = new Date(0)
    date.setSeconds(quizTime)
    const quizTimeFormatted = date.toISOString().substring(11, 16)
</script>

<svelte:window bind:innerWidth={screenWidth} bind:innerHeight={screenHeight} />
<PopupConfirmation
    title="هل أنت متأكد من الخروج؟"
    text="سيتم فقدان جميع النتائج ولن تتمكن من العودة إلى هذه الصفحة."
    cancelBtnText="إلغاء"
    confirmBtnText="خروج"
    callback={() => {
        isNavigationIntentional.set(true) 
        window.location.href = '/demo'
    }}
>
    <div id="results-page-back-button_GTAG" class="hidden" bind:this={exitConfirmationOpenBtn}></div>
</PopupConfirmation>
<NavBar {isLandscape} {isNavigationIntentional}/>
<main class="container h-full-vh supports-dvh:h-dvh max-w-inherit font-messiri text-white" class:container-mobile-view={!isLandscape}>    
    <div class="results-container" class:results-container-mobile-view={!isLandscape}>
        <h1 class="text-3xl mt-8">تقرير الإختبار</h1>
        <section class="results-summary-container" class:results-summary-container-mobile={!isLandscape}>
            <div class="results-summary results-summary-details-container">
                <div class="results-summary-details">

                    <div class="results-summary-details-icon-container">
                        <svg viewBox="0 0 257 199" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M210.75 6.7959L249.792 45.9089L114.814 180.641C105.042 190.395 89.2124 190.38 79.4582 180.608L58.0782 159.189L210.75 6.7959Z" fill="#A5EB78"/><path d="M237.191 33L250.024 45.8563L110.861 184.766C103.76 191.853 92.259 191.843 85.1716 184.742V184.742L237.191 33Z" fill="#95D46C"/><rect x="7.18359" y="108.787" width="53.2178" height="90" transform="rotate(-45.2399 7.18359 108.787)" fill="#A5EB78"/><path d="M69 94.5L90 116.5C91.1667 117.5 94 119.5 96 119.5C98 119.5 101.167 117.5 102.5 116.5L213.5 5L252 43L221 74" stroke="black" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M210 86L118.5 177.5C115.333 180.667 106.5 187.2 96.5 188C86.5 188.8 77.3333 181.333 74 177.5L5 107.5L43 70L56.5 83.5" stroke="black" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span>:</span>
                        <p style="color: #95d46c">{correctQuestionsAmount}</p>
                    </div>
                    <div class="results-summary-details-icon-container">
                        <svg viewBox="0 0 198 197" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M155.758 7L99 63.5636L41.871 7L7 41.7515L64.129 98.3152L7 155.248L41.871 190L99 133.436L155.758 189.63L190.629 154.879L133.5 97.9455L191 41.7515L155.758 7Z" fill="#F74354" stroke="black" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span>:</span>
                        <p style="color: #f74354">{incorrectQuestionsAmount}</p>
                    </div>

                </div>
                <div class="results-summary-details">

                    <div class="results-summary-details-icon-container">
                        <svg viewBox="0 0 110 127" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.1895 11C18.1895 4.92487 23.1143 0 29.1895 0H80.1895C86.2646 0 91.1895 4.92487 91.1895 11V78H18.1895V11Z" fill="#FFCD00"/><path d="M28.5056 105.542C24.7704 109.46 18.1654 106.819 18.1626 101.405L18.1458 68.6781C18.144 65.2931 20.9411 62.5768 24.3245 62.6777L54.7996 63.586C60.057 63.7427 62.5827 70.1069 58.8635 73.826L56.1895 76.5L28.5056 105.542Z" fill="#FFCD00"/><path d="M80.9455 105.127C84.7007 108.998 91.2589 106.335 91.2521 100.942L91.2111 68.7028C91.2068 65.3231 88.4133 62.6138 85.0351 62.713L54.6915 63.6037C49.4935 63.7562 46.9376 69.998 50.5356 73.7525L52.6895 76L80.9455 105.127Z" fill="#FFCD00"/><path d="M53.5139 50.5C56.7139 50.5 58.1805 47.5 58.5139 46L61.0137 17.5C61.1804 15.3333 59.9139 11 53.5139 11C47.1139 11 45.8472 15.3333 46.0139 17.5L48.5139 46C48.8472 47.5 50.3139 50.5 53.5139 50.5Z" fill="black"/><path d="M53.5292 46.5C54.4025 46.5 54.5 45 54.5292 44.5C54.5584 44 57.0293 18.5 57.0293 18.5C57.1959 17.3333 56.7292 15 53.5292 15C50.3292 15 49.8626 17.3333 50.0292 18.5C50.0292 18.5 52.5 44 52.5292 44.5C52.5584 45 52.656 46.5 53.5292 46.5Z" fill="white"/><circle cx="53.5" cy="60.5" r="6.5" fill="black"/><circle cx="53.5" cy="60.5" r="2.5" fill="white"/>
                        </svg>
                        <span>:</span>
                        <p style="color: #ffcd00;">{markedQuestionsAmount}</p>
                    </div>

                </div>
            </div>
            <div class="results-summary results-summary-general-container">
                <div class="results-summary-general-time">
                    <h3>الوقت المستغرق</h3>
                    <p>{quizTimeFormatted}</p>
                </div>
                <div class="results-summary-general-percentage">
                    <p>النسبة المئوية:</p> 
                    <span bind:this={percentageElmnt}>{correctQuestionsPercentage}</span>
                    <svg width="35" height="35" viewBox="0 0 134 134" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="67" cy="67" r="67" fill="url(#paint0_linear_212_228)"/><path d="M133 62L97 26L50 108H36L61 133C62.5 133.5 66.3 133.8 73.5 133C79 132.389 83.3885 131.785 87.5 130.5C93.6687 128.572 108 122 120 106.5C132 91 133.833 70.6667 133 62Z" fill="url(#paint1_linear_212_228)"/><path d="M70.5 48L54.5 32L33 36L28 67.5L48 88L70.5 48Z" fill="#0175A0"/><path d="M93 102C97.7214 102 101.367 99.242 103.582 96.0581C105.812 92.8527 107 88.7477 107 84.5C107 80.2523 105.812 76.1473 103.582 72.9419C101.367 69.758 97.7214 67 93 67C88.2786 67 84.6326 69.758 82.4177 72.9419C80.1879 76.1473 79 80.2523 79 84.5C79 88.7477 80.1879 92.8527 82.4177 96.0581C84.6326 99.242 88.2786 102 93 102Z" stroke="white" stroke-width="12"/><path d="M41 67C45.7214 67 49.3674 64.242 51.5823 61.0581C53.8121 57.8527 55 53.7477 55 49.5C55 45.2523 53.8121 41.1473 51.5823 37.9419C49.3674 34.758 45.7214 32 41 32C36.2786 32 32.6326 34.758 30.4177 37.9419C28.1879 41.1473 27 45.2523 27 49.5C27 53.7477 28.1879 57.8527 30.4177 61.0581C32.6326 64.242 36.2786 67 41 67Z" stroke="white" stroke-width="12"/><path d="M82.5 26H97L50.5 108H36L82.5 26Z" fill="white"/><defs><linearGradient id="paint0_linear_212_228" x1="23" y1="15.5" x2="117" y2="119.5" gradientUnits="userSpaceOnUse"><stop stop-color="#1DBDF1"/><stop offset="0.9999" stop-color="#0096DB"/><stop offset="1" stop-color="#D9D9D9" stop-opacity="0"/></linearGradient><linearGradient id="paint1_linear_212_228" x1="72" y1="67.5" x2="120" y2="112" gradientUnits="userSpaceOnUse"><stop stop-color="#0073A2"/><stop offset="1" stop-color="#0099DD"/></linearGradient></defs>
                    </svg>
                </div>
            </div>
        </section>
        <section class="results-questions-container">
            {#if $activeQuestionsSection == "all"}
                <div class="results-questions-type-container results-questions-all-container" in:fly={{ y: -20, x: 20, duration: 200 }} out:fade={{ duration: 200 }}>
                    {#each $generalAllQuestionsMap as key}
                        {#if $generalAllQuestionsMap.get(key[0]) != undefined}
                            <QuestionCard {cardSettings} questionObject={$generalAllQuestionsMap.get(key[0])}/>
                        {/if}
                    {/each}
                </div>
            {:else if $activeQuestionsSection == "correct"}
                <div class="results-questions-type-container results-questions-correct-container" in:fly={{ y: -20, x: 20, duration: 200 }} out:fade={{ duration: 200 }}>
                    {#each $generalCorrectQuestionsMap as key}
                        {#if $generalCorrectQuestionsMap.get(key[0]) != undefined}
                            <QuestionCard {cardSettings} questionObject={$generalCorrectQuestionsMap.get(key[0])}/>
                        {/if}
                    {/each}
                </div>
            {:else if $activeQuestionsSection == "incorrect"}
                <div class="results-questions-type-container results-questions-incorrect-container" in:fly={{ y: -20, x: 20, duration: 200 }} out:fade={{ duration: 200 }}>
                    {#each $generalIncorrectQuestionsMap as key}
                        {#if $generalIncorrectQuestionsMap.get(key[0]) != undefined}
                            <QuestionCard {cardSettings} questionObject={$generalIncorrectQuestionsMap.get(key[0])}/>
                        {/if}
                    {/each}
                </div>
            {:else if $activeQuestionsSection == "marked"}
                <div class="results-questions-type-container results-questions-marked-container" in:fly={{ y: -20, x: 20, duration: 200 }} out:fade={{ duration: 200 }}>
                    {#each $generalMarkedQuestionsMap as key}
                        {#if $generalMarkedQuestionsMap.get(key[0]) != undefined}
                            <QuestionCard {cardSettings} questionObject={$generalMarkedQuestionsMap.get(key[0])}/>
                        {/if}
                    {/each}
                </div>
            {:else if $activeQuestionsSection == "skipped"}
                <div class="results-questions-type-container result-questionss-skipped-container" in:fly={{ y: -20, x: 20, duration: 200 }} out:fade={{ duration: 200 }}>
                    {#each $generalSkippedQuestionsMap as key}
                        {#if $generalSkippedQuestionsMap.get(key[0]) != undefined}
                            <QuestionCard {cardSettings} questionObject={$generalSkippedQuestionsMap.get(key[0])}/>
                        {/if}
                    {/each}
                </div>
            {/if}
        </section>
    </div>
</main>

<style lang="sass">
    :global(html)
        overscroll-behavior: none
</style>
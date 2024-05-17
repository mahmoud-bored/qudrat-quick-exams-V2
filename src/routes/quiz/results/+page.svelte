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
	import NavBarButtons from "./NavBarButtons.svelte";
    import './page.sass'
	import { activeQuestionsSection } from "./quiz-results-stores";
	import QuestionCard from "./QuestionCard.svelte";
	import { onMount } from "svelte";
    import { examTheme, featureFlags } from "$lib/stores"
	import { goto } from "$app/navigation";

    // Get questions amounts
    const questionsAmount = $generalCurrentQuestionsMap?.size
    const correctQuestionsAmount = $generalCorrectQuestionsMap?.size
    const incorrectQuestionsAmount = $generalIncorrectQuestionsMap?.size
    const skippedQuestionsAmount = $generalSkippedQuestionsMap?.size
    const markedQuestionsAmount = $generalMarkedQuestionsMap?.size


    let cardSettings: { bg: string, color: string } = {bg: "", color: ""}
    onMount(async () => {
        // Set Question background Theme: Dark, Light or Wood
        if ($examTheme == 'عادي'){
            cardSettings['bg'] = (await import('$lib/assets/quizThemeLightBg.webp')).default
            cardSettings['color'] = '#000'
        }else {
            cardSettings['bg'] = (await import('$lib/assets/quizThemeDarkBg.webp')).default
            cardSettings['color'] = '#fff'
        }
        // Set Question Percentage Color
        if(correctQuestionsPercentage < 60) {
            (document.querySelector('.results-summary-general-percentage > span') as HTMLSpanElement)?.style.setProperty('color', '#ff4a4a');
            (document.querySelector('.results-summary-general-percentage > span') as HTMLSpanElement)?.style.setProperty('text-shadow', '0px 0px 8px');
        }else if (correctQuestionsPercentage < 80) {
            (document.querySelector('.results-summary-general-percentage > span') as HTMLSpanElement)?.style.setProperty('color', '#fdd849');
        }else if (correctQuestionsPercentage < 95) {
            (document.querySelector('.results-summary-general-percentage > span') as HTMLSpanElement)?.style.setProperty('color', '#06a664');
        }else if ( correctQuestionsAmount <= 100 ) {
            (document.querySelector('.results-summary-general-percentage > span') as HTMLSpanElement)?.style.setProperty('color', '#06a664');
            (document.querySelector('.results-summary-general-percentage > span') as HTMLSpanElement)?.style.setProperty('text-shadow', '0px 0px 8px');
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
{#if isLandscape}
    <nav class="results-nav-container">
        <div class="results-nav-buttons-container">
            <NavBarButtons />
        </div>
    </nav>    
{:else if !isLandscape}
    <nav class="results-nav-container-mobile">
        <div class="results-nav-buttons-container">
            <NavBarButtons />
        </div>
    </nav>
{/if}
<main class="container" class:container-mobile-view={!isLandscape}>

    
    <div class="results-container" class:results-container-mobile-view={!isLandscape}>
        <h1>تقرير الإختبار</h1>
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
                    {#if $featureFlags.skipQuestionButton}
                        <div class="results-summary-details-icon-container">
                            <svg viewBox="0 0 234 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M87.091 112.232C91.491 107.032 92.591 101.732 92.591 99.7319C92.9243 95.0651 93.791 85.0314 94.591 82.2314C95.591 78.7314 100.591 69.7314 106.591 64.2314C112.591 58.7314 122.091 53.7314 131.091 52.7314C138.291 51.9314 145.758 53.0648 148.591 53.7314C149.924 53.2314 153.791 52.2314 158.591 52.2314C170.091 52.2314 174.591 54.7314 182.091 58.2314C188.091 61.0314 193.924 67.7314 196.091 70.7314C198.591 74.8981 203.591 86.5314 203.591 99.7314C203.591 112.931 195.591 122.898 191.591 126.231C188.258 129.065 180.391 135.131 175.591 136.731C169.591 138.731 161.591 143.231 157.591 146.231C153.591 149.231 144.091 160.231 138.591 170.231C134.191 178.231 133.424 189.565 133.591 194.231C133.591 197.731 133.193 205.85 133.591 210.231C134.091 215.731 137.283 220.462 139.591 223.231C142.091 226.231 145.758 228.898 148.091 230.231C149.924 229.565 154.391 227.231 157.591 223.231C160.791 219.231 163.091 212.731 163.091 210.231V194.231C163.091 192.231 163.748 190.803 164.091 190.231C165.591 187.731 169.342 186.669 171.091 186.231C173.091 185.731 183.591 180.731 187.591 178.231C191.5 175.788 206.091 167.231 218.591 147.231C231.091 127.231 232.591 112.232 233.091 96.7314C233.736 76.7314 226.091 53.2316 212.591 36.2316C201.791 22.6316 188.091 14.2314 178.091 8.73187C173.091 5.73187 157.591 -1.26837 138.091 1.73187C115.091 6.73187 99.9982 18 81.091 39.7319C65.6719 57.4545 61.5 87 62.4992 100C62.9075 102.768 64.4992 108.5 67.4992 112C70.535 115.542 74.9992 120 77.4992 120.5C78.8326 120.167 82.691 117.432 87.091 112.232Z" fill="#4F92F3"/><path d="M101.986 19.5C115.986 8.7 129.5 3 139 2C148.5 1 149 1 149 1L126.989 0C121.322 0.666667 107.389 3.2 96.9886 8C83.9886 14 71.9886 22 62.4886 34C52.9886 46 45.9885 57.5 41.9885 72.5C37.9885 87.5 38.5 98.5 39.4885 102C40.4494 105.402 41.4885 110.5 47.4885 116.5C52.2885 121.3 58.1552 122.833 60.4885 123C62.4885 123 67.3885 122.9 70.9885 122.5C74.5885 122.1 76.8218 121 77.4885 120.5C74.9885 120 70.9885 116 66.9885 111C63.6267 106.798 62.3216 99.1667 62.4881 95.5C61.9881 86.5 66.9864 69.5 70.4864 59C73.9864 48.5 84.4864 33 101.986 19.5Z" fill="#0D6EFD"/><path d="M175.545 73.8503C169.145 61.8503 154.333 55.334 148.5 53.5007C165 47.5 206.045 58.8517 205.045 91.8503C203.664 137.43 174 132 157.045 147.851C140.09 163.702 137.045 178.35 135.545 187.35C134.109 195.968 134.545 207.85 135.545 212.85C136.545 217.85 137.165 219.251 140.045 222.85C144.045 227.85 146.5 229.5 148.5 230C148.167 230.333 145.759 231.448 143 232C138 233 135.635 233.534 133.5 233C129.5 232 125.145 229.65 121.545 226.85C117.045 223.35 113.045 217.85 112.045 212.85C111.045 207.85 110.545 199.35 111.545 187.35C112.545 175.35 120.545 162.35 124.045 156.85C127.545 151.35 136.045 145.35 141.045 141.85C145.045 139.05 155.378 134.684 160.045 132.85C164.545 130.35 169.045 126.85 172.545 121.85C180.115 111.036 181.545 101.46 181.545 97.3503C181.545 93.8503 181.945 85.8503 175.545 73.8503Z" fill="#0D6EFD"/><path d="M88.5596 0H126.56C121.727 1 109.261 4 98.0605 8C84.0605 13 72.9449 22.4916 62 35C51.5 47 45.0605 62.5 43.0605 70C40.5699 79.34 38.7272 93 39.0605 99C39.3939 102 41.2605 109.4 46.0605 115C50.8605 120.6 58.3939 122.667 61.5605 123H21.0605C17.5605 123 12.0605 119 7.56055 115C3.06055 111 0.559634 102.5 0.0596344 96.5C-0.440366 90.5 2.05963 69.5 13.0596 49C24.0596 28.5 45.5596 14.5 58.5596 8C68.9596 2.8 82.893 0.5 88.5596 0Z" fill="#1365DD"/><path d="M140.5 79.6803C136.9 68.8803 124.833 59.1667 119.5 56C121.667 54.6667 128.1 52.5803 134.5 52.1803C142.5 51.6803 143.5 52.1804 151 54.1803C157.832 56.0023 178.5 66.1806 182 91.1803C186.27 121.681 159 135.181 146.5 139.68C139.581 142.171 132.667 148.847 130 151.68C128 153.847 122.9 159.98 118.5 167.18C114.1 174.38 112.667 184.847 112.5 189.18C112.5 189.18 111.5 208.847 112.5 212.18C113.5 215.514 116.8 223.18 122 227.18C127.2 231.18 132.5 232.847 134.5 233.18C121.667 233.18 95.6 233.08 94 232.68C92 232.18 88.5 231.18 81.5 225.18C75.9 220.38 74.1667 212.847 74 209.68V192.68C74 188.18 75 182.18 77 175.18C80 164.68 86 156.181 95 148.181C104.781 139.486 115.5 137.18 121 134.18C126.5 131.18 135.79 124.548 140 113.181C145 99.6807 145 93.1803 140.5 79.6803Z" fill="#1365DD"/><rect x="74" y="266" width="93" height="54" rx="27" fill="#1365DD"/><circle cx="140" cy="293" r="27" fill="#0D6EFD"/><path d="M167 293C167.693 280.194 157.667 271.5 152.5 269C152.5 269 137.512 275.5 137.012 292.5C136.512 309.5 152 317 152 317C152 317 165.999 311.5 167 293Z" fill="#4F92F3"/>
                            </svg>
                            <span>:</span>
                            <p style="color: #0d6efd;">{skippedQuestionsAmount}</p>
                        </div>
                    {/if}

                </div>
            </div>
            <div class="results-summary results-summary-general-container">
                <div class="results-summary-general-time">
                    <h3>الوقت المستغرق</h3>
                    <p>{quizTimeFormatted}</p>
                </div>
                <div class="results-summary-general-percentage">
                    <p>النسبة المئوية:</p> 
                    <span>{correctQuestionsPercentage}</span>
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

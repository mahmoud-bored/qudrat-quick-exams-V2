<script lang="ts">
	import { endQuiz, pickAnswer } from "./operations"
    import { isQuestionMarked, isNextQuestionReady } from "./quiz-main-stores"
    import TypeWriter from "$lib/assets/TypeWriter.svelte"
	import { featureFlags } from "$lib/stores";
	import PopupConfirmation from "$lib/PopupConfirmation.svelte";
</script>

<div class="controls-container h-[95%] w-full bg-transparent flex justify-center items-end text-white">
    {#if $featureFlags.skipQuestionButton}
        <button class="skip-question-button" data-value="skip" on:click={(e) => { if($isNextQuestionReady){ pickAnswer(e) } }}>تخطي</button>
    {/if}
    <div class="w-[95%] max-w-[660px] h-full flex items-center ">
        <button 
        class="group mark-question-button h-9/10 w-[98%] flex-center rounded border-2 border-yellow-400 transition bg-yellow-400/50 
        gap-2 text-center flex justify-between items-center hover:bg-yellow-400 hover:text-white" 
        class:mark-question-button-active={$isQuestionMarked} 
        on:click={() => isQuestionMarked.update(state => !state)}
        >
        <svg class=" h-8/10 *:transition" width="70" height="127" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path class="group-hover:fill-[#FFE784]" d="M18.1895 11C18.1895 4.92487 23.1143 0 29.1895 0H80.1895C86.2646 0 91.1895 4.92487 91.1895 11V78H18.1895V11Z" fill="#FFCD00"/>
                <path class="group-hover:fill-[#FFE784]" d="M28.5056 105.542C24.7704 109.46 18.1654 106.819 18.1626 101.405L18.1458 68.6781C18.144 65.2931 20.9411 62.5768 24.3245 62.6777L54.7996 63.586C60.057 63.7427 62.5827 70.1069 58.8635 73.826L56.1895 76.5L28.5056 105.542Z" fill="#FFCD00"/>
                <path class="group-hover:fill-[#FFE784]" d="M80.9455 105.127C84.7007 108.998 91.2589 106.335 91.2521 100.942L91.2111 68.7028C91.2068 65.3231 88.4133 62.6138 85.0351 62.713L54.6915 63.6037C49.4935 63.7562 46.9376 69.998 50.5356 73.7525L52.6895 76L80.9455 105.127Z" fill="#FFCD00"/>
                <path class="group-hover:fill-[#3c3c3c]" d="M53.5139 50.5C56.7139 50.5 58.1805 47.5 58.5139 46L61.0137 17.5C61.1804 15.3333 59.9139 11 53.5139 11C47.1139 11 45.8472 15.3333 46.0139 17.5L48.5139 46C48.8472 47.5 50.3139 50.5 53.5139 50.5Z" fill="#3c3c3c"/>
                <path class="group-hover:fill-white" d="M53.5292 46.5C54.4025 46.5 54.5 45 54.5292 44.5C54.5584 44 57.0293 18.5 57.0293 18.5C57.1959 17.3333 56.7292 15 53.5292 15C50.3292 15 49.8626 17.3333 50.0292 18.5C50.0292 18.5 52.5 44 52.5292 44.5C52.5584 45 52.656 46.5 53.5292 46.5Z" fill="white"/>
                <circle cx="53.5" cy="60.5" r="6.5" fill="#3c3c3c"/><circle cx="53.5" cy="60.5" r="2.5" fill="white"/>
            </svg>
            <div class="mark-question-button-text-container w-full text-base md:text-lg flex-center mr-2">
                {#key $isQuestionMarked} 
                    <TypeWriter speed={5} >{$isQuestionMarked ? "أزل السؤال من المراجعة" : "أضف السؤال للمراجعة"}</TypeWriter>        
                {/key}
            </div>
        </button>
    </div>
    <div class="h-full w-[max(10%,150px)] flex-center">
        <PopupConfirmation 
            title="هل انت متأكد من انهاء الإختبار؟" 
            callback={endQuiz}
        >
            <div 
                class="end-quiz-button p-1 h-9/10 w-8/10 flex-center rounded border-2 border-red-400 bg-red-400/70 
                text-center text-white text-sm md:text-base transition hover:bg-red-400 " 
            >
                إنهاء الإختبار
            </div>
        </PopupConfirmation>
    </div>
</div>

<style lang="sass">
.mark-question-button-active
    background-color: #FDCD22
    color: #fff
    path
        fill: #FFE784
    path[fill="#3c3c3c"]
        fill: #3c3c3c
    path[fill="white"]
        fill: white
</style>
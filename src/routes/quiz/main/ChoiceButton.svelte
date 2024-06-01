<script lang="ts">
	import { pickAnswer } from "./operations";
	import { isNextQuestionReady } from "./quiz-main-stores";

    export let isLandscape: boolean
    export let dataValue: string
    export let text: string
</script>
<button 
    id="question-choice_GTAG"
    class="choice h-full w-full rounded bg-[#5eee2530] border border-[#5eee25] flex-center opacity-100 
        select-none transition hover:text-white hover:bg-[#5eee2590]" 
    class:choice-landscape={isLandscape} 
    class:opacity-30={!$isNextQuestionReady} 
    data-value={dataValue} 
    on:click={(e) => { 
        if($isNextQuestionReady) pickAnswer(e)
    }}
>
    {text}
</button>
<script lang="ts">
	import { onMount } from "svelte";
    import { questionCounter } from "./quiz-main-stores"
    
    export let width: string
    export let answerResult: string
    export let fragmentID: string

    let fragmentColor: string = "black"
    let isBorderActive: boolean
    let bgColorStyle: string

    // set the border-radius for the last element in the progress bar only
    $: if(($questionCounter - 1).toString() == fragmentID){
        isBorderActive = true
    } else {
        isBorderActive = false
    }
    // set the color of the progress bar fragment based on the answer picked
    if(answerResult == "correct") {
        fragmentColor = 'rgb(28, 174, 114)'
    }else if(answerResult == "incorrect") {
        fragmentColor = 'rgb(230, 0, 0)'
    }else if(answerResult == "skip") {
        fragmentColor = "#0d6efd"
    }
    // animate the fragment being added to the progress bar
    let fragment: HTMLSpanElement
    onMount(()=> {
        setTimeout(() => fragment.style.setProperty('width', width))
    })
    // mix colors between the current fragment and the last one
    const lastFragment = document.querySelector('.progress-bar-container')?.lastElementChild as (HTMLSpanElement | null)
    const lastColor = lastFragment?.getAttribute('data-bg-color')
    if(lastColor) {
        bgColorStyle = `linear-gradient(to right, ${lastColor}, ${fragmentColor}, ${fragmentColor})`
    } else {
        bgColorStyle = fragmentColor
    }
</script>

<span 
    bind:this={fragment}
    class:rounded-r-md={isBorderActive} 
    class="h-full w-0 transition-all" 
    data-bg-color="{fragmentColor}" 
    id="{fragmentID}" 
    style="background: {bgColorStyle}"
></span>

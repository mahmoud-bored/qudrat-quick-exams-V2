<script lang="ts">
    import { questionStreak, questionFontSize } from "./quiz-main-stores"
    import { timer } from "../quiz-stores"
	import { browser } from "$app/environment";
    

    let isStreakActive = false
    let isYellowStreakActive = false
    let isRedStreakActive = false
    $: {
        isStreakActive = false
        isYellowStreakActive = false
        isRedStreakActive = false

        if($questionStreak > 0){ isStreakActive = true }
        if($questionStreak >= 3){
            isStreakActive = true
            isYellowStreakActive = true
        }
        if($questionStreak >= 7){
            isStreakActive = true
            isRedStreakActive = true
        }
    }

    let initialQuestionStreak: number
    let streakJump = false
    questionStreak.subscribe((value) => initialQuestionStreak = value)()
    $: if($questionStreak > initialQuestionStreak){
        streakJump = true
        setTimeout(() => streakJump = false, 400)
    } 
    let inputValue = 25
    questionFontSize.set(inputValue / 100 + 0.8)
    $: questionFontSize.set(inputValue / 100 + 0.8)
    let timerElmnt: HTMLParagraphElement
    $: if(browser && timerElmnt){
        if($timer > 30){
            timerElmnt.style.setProperty('color', '#186f1e')
        }else if($timer <= 30 && $timer > 10){
            timerElmnt.style.setProperty('color', '#bf932b')
        }else if($timer <= 10){
            timerElmnt.style.setProperty('color', 'rgb(196, 35, 35)')
        }

    }
</script>

<div class="header-container">

    <div class="question-streak-container">
        {#if $questionStreak < 7}
            <svg 
                class:streak-active={isStreakActive} 
                class:streak-active-2={isYellowStreakActive} 
                class:streak-active-3={isRedStreakActive}
                class:streak-jump={streakJump}
                width="40" 
                height="50" 
                viewBox="0 0 224 294" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M210 29.5C202.4 15.9 192.167 11.1667 188 10.5C189.333 18.1667 190.5 29 193.5 36.5C194.746 39.6142 199.5 49.5 205 55C209.4 59.4 215.5 60.5 218 60.5C218 56 217.6 43.1 210 29.5Z" fill="#FF7F17"/><path d="M9 80C16.6 66.4 26.8333 61.6667 31 61C29.6667 68.6667 28.5 79.5 25.5 87C24.2543 90.1142 19.5 100 14 105.5C9.6 109.9 3.5 111 1 111C1 106.5 1.4 93.6 9 80Z" fill="#FF7F17"/><path d="M149.501 288C138.301 291.6 122.168 292.833 115.501 293C112.334 293.333 96.9 292.6 88.5 291C78 289 67.5 287 51.5009 277.5C35.5017 268 24 254.5 17 244C10 233.5 4.00087 215 1.00087 194.5C-1.99913 174 5.00087 156.5 11.0009 142.5C15.8009 131.3 26.3342 120.5 31.0009 116.5C31.3342 123.167 33.1009 139.5 37.5009 151.5C41.9009 163.5 48.6675 170.5 51.5009 172.5V160.5C51.5009 153.5 52.0009 135 61.5009 103C71.0009 71 87.5009 52.5 107.001 32.5C122.601 16.5 146.834 4.5 157.001 0.5C154.834 6.66667 149.801 22.8 147.001 38C143.501 57 142.501 80.5 143.501 95C144.501 109.5 151.001 129.5 157.501 138C162.701 144.8 169.668 149.833 172.501 151.5C174.168 142.167 177.901 121.1 179.501 111.5C181.101 101.9 182.501 80.5 183.001 71C185.501 72 191.801 75.4 197.001 81C203.501 88 208.001 97 214.501 113C221.001 129 223.501 162 223.001 188C222.501 214 213.501 233 209.501 241C205.501 249 194.501 263 183.501 271.5C172.501 280 163.501 283.5 149.501 288Z" fill="#FF7F17"/><path d="M133.916 290.5C124.716 293.3 114.75 293.667 110.916 293.5C108.75 293.333 103.216 292.8 98.416 292C92.416 291 85.916 289 79.416 285.5C72.916 282 60.9165 274 54.4165 255.5C47.9165 237 52.4165 226.5 53.9165 217C55.1165 209.4 62.4164 201.167 65.9163 198C65.7496 200.167 65.8163 206.4 67.4163 214C69.0163 221.6 73.7496 226.5 75.9163 228C76.5829 224.5 78.0163 216.7 78.4163 213.5C78.9163 209.5 81.4163 202 85.9163 190.5C90.4163 179 93.4163 176 100.916 164C106.916 154.4 120.416 145.333 126.416 142C125.916 147.667 124.816 160.4 124.416 166C123.916 173 126.916 189 132.416 198C136.816 205.2 143.583 211.333 146.416 213.5C147.416 209 149.616 198.7 150.416 193.5C151.216 188.3 151.75 177.333 151.916 172.5C152.916 172.833 155.816 174.5 159.416 178.5C163.916 183.5 167.416 190.5 169.416 201.5C171.416 212.5 172.916 222 171.916 238.5C170.916 255 165.416 266.5 159.916 273.5C154.416 280.5 145.416 287 133.916 290.5Z" fill="#FFD33A"/>
            </svg>
        {:else}
            <svg 
                class:streak-active={isStreakActive} 
                class:streak-active-2={isYellowStreakActive} 
                class:streak-active-3={isRedStreakActive}
                class:streak-jump={streakJump}
                width="224" 
                height="294" 
                viewBox="0 0 224 294" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M210 29.5C202.4 15.9 192.167 11.1667 188 10.5C189.333 18.1667 190.5 29 193.5 36.5C194.746 39.6142 199.5 49.5 205 55C209.4 59.4 215.5 60.5 218 60.5C218 56 217.6 43.1 210 29.5Z" fill="#EB423F"/><path d="M9 80C16.6 66.4 26.8333 61.6667 31 61C29.6667 68.6667 28.5 79.5 25.5 87C24.2543 90.1142 19.5 100 14 105.5C9.6 109.9 3.5 111 1 111C1 106.5 1.4 93.6 9 80Z" fill="#EB423F"/><path d="M149.501 288C138.301 291.6 122.168 292.833 115.501 293C112.334 293.333 96.9 292.6 88.5 291C78 289 67.5 287 51.5009 277.5C35.5017 268 24 254.5 17 244C10 233.5 4.00087 215 1.00087 194.5C-1.99913 174 5.00087 156.5 11.0009 142.5C15.8009 131.3 26.3342 120.5 31.0009 116.5C31.3342 123.167 33.1009 139.5 37.5009 151.5C41.9009 163.5 48.6675 170.5 51.5009 172.5V160.5C51.5009 153.5 52.0009 135 61.5009 103C71.0009 71 87.5009 52.5 107.001 32.5C122.601 16.5 146.834 4.5 157.001 0.5C154.834 6.66667 149.801 22.8 147.001 38C143.501 57 142.501 80.5 143.501 95C144.501 109.5 151.001 129.5 157.501 138C162.701 144.8 169.668 149.833 172.501 151.5C174.168 142.167 177.901 121.1 179.501 111.5C181.101 101.9 182.501 80.5 183.001 71C185.501 72 191.801 75.4 197.001 81C203.501 88 208.001 97 214.501 113C221.001 129 223.501 162 223.001 188C222.501 214 213.501 233 209.501 241C205.501 249 194.501 263 183.501 271.5C172.501 280 163.501 283.5 149.501 288Z" fill="#EB423F"/><path d="M133.916 290.5C124.716 293.3 114.75 293.667 110.916 293.5C108.75 293.333 103.216 292.8 98.416 292C92.416 291 85.916 289 79.416 285.5C72.916 282 60.9165 274 54.4165 255.5C47.9165 237 52.4165 226.5 53.9165 217C55.1165 209.4 62.4164 201.167 65.9163 198C65.7496 200.167 65.8163 206.4 67.4163 214C69.0163 221.6 73.7496 226.5 75.9163 228C76.5829 224.5 78.0163 216.7 78.4163 213.5C78.9163 209.5 81.4163 202 85.9163 190.5C90.4163 179 93.4163 176 100.916 164C106.916 154.4 120.416 145.333 126.416 142C125.916 147.667 124.816 160.4 124.416 166C123.916 173 126.916 189 132.416 198C136.816 205.2 143.583 211.333 146.416 213.5C147.416 209 149.616 198.7 150.416 193.5C151.216 188.3 151.75 177.333 151.916 172.5C152.916 172.833 155.816 174.5 159.416 178.5C163.916 183.5 167.416 190.5 169.416 201.5C171.416 212.5 172.916 222 171.916 238.5C170.916 255 165.416 266.5 159.916 273.5C154.416 280.5 145.416 287 133.916 290.5Z" fill="#FFD33A"/>
            </svg>
        {/if}
        <span>{$questionStreak}</span>
    </div>
    <div class="timer-container">
        <p class="timer" bind:this={timerElmnt}>{$timer}s</p>
    </div>
    <div class="question-text-size-container">
        <input type="range" bind:value={inputValue}>
    </div>
</div>

<style lang="sass">
    @import '$lib/assets/app.sass'
    .header-container
        height: 95%
        width: 100%
        background-color: transparent
        display: flex
        justify-content: space-between
        align-items: center
        font-family: hoss-round-xnarrow,sans-serif
        font-size: 1.2em
        font-weight: 800
        color: #000
        user-select: none
        .question-streak-container
            padding: 5px
            span
                margin-right: 5px
            svg
                max-height: 80%
                opacity: 0.5
                transition: all 0.2s ease 
            .streak-active
                opacity: 1
            .streak-active-2
                filter: drop-shadow(0 0 0.7rem #FE9C0A)
            .streak-active-3
                filter: drop-shadow(0 0 0.7rem #F00)
            .streak-jump
                scale: 1.5
        .question-streak-container,
        .timer-container,
        .question-text-size-container
            height: min(100%, 50px)
            width: 30%
            background-color: #c1ad8290
            border: 2px solid #c1ad82
            border-radius: 5px
            display: flex
            justify-content: center
            align-items: center
        .timer-container
            width: 20%
            transition: all 0.2s ease
            position: relative
            p
                font-size: 0.9em
                color: #186f1e
        .question-text-size-container
            @include font-size-slider()
            input
                width: 90%

</style>
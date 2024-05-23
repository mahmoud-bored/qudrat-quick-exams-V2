<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import type { RouteParams } from "../routes/$types";

    export let redirectToUrl: string | null = null
    let isBackThrobberVisible = false
</script>

<section class="w-full h-dvh flex-center bg-[#c1d5e8]">
    <div class="loader absolute top-0 left-0 w-full h-5 bg-[#ffbb05] overflow-hidden"></div>
    <div class="loader absolute bottom-0 left-0 w-full h-5 bg-[#ffbb05] overflow-hidden"></div>

    <div class="w-full h-full p-5 flex items-center justify-around flex-col">
        <!-- Img Source: https://iconscout.com/lottie-animation/website-maintenance-8126932 -->
        <img src="/images/under-maintenance.png" alt="Under Maintenance">
        <div class="w-full max-w-md flex-center">
            <button 
                class="group relative w-full h-14 flex-center text-white font-messiri rounded-md bg-[#20243b] border-2 
                    border-amber-400 hover:bg-amber-400 transition"
                on:click={() => {
                    isBackThrobberVisible = true
                    goto(redirectToUrl ?? '/demo')
                }}
            >
                <svg 
                    class="absolute left-4 h-10 opacity-0 transition stroke-amber-400 group-hover:stroke-[#20243b]" 
                    class:opacity-100={isBackThrobberVisible} 
                    width="40px" height="40px" viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="50" cy="50" r="32" stroke-width="8" stroke-dasharray="50.26548245743669 50.26548245743669" fill="none" stroke-linecap="round">
                        <animateTransform attributeName="transform" type="rotate" dur="0.7s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
                    </circle>
                </svg>
                العودة
            </button>
        </div>
    </div>
</section>

<style lang="sass">
    .loader 
        &:after
            content: ' '
            position: absolute
            top: 0
            left: 0
            height: inherit
            width: inherit
            background-image: linear-gradient(90deg, #20243b 25px, transparent 20px)
            background-size: 60px
            animation: go 2s infinite linear
            transform: skewX(-45deg)
            z-index: 1
@keyframes go 
    100% 
        background-position: 60px

</style>

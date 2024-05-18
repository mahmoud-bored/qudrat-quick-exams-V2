<script lang="ts">
    import { fly } from 'svelte/transition';
    import ThemeCard from './ThemeCard.svelte'
    import examThemeDarkImgSrc from '$lib/assets/quiz-theme-dark.webp?enhanced'
    import examThemeLightImgSrc from '$lib/assets/quiz-theme-light.webp?enhanced'
    import examThemeWoodImgSrc from '$lib/assets/quiz-theme-wood.webp?enhanced'
</script>

<div class="exam-theme-container h-[calc(100%-20px)] p-5 w-full flex-center flex-col gap-2" transition:fly={{ x: 200, duration: 600 }}>
    <hr class="w-1/3 border-2 border-secondary-default rounded-lg">
    <p class="text-2xl text-center">اختر شكل الإختبار</p>
    <div 
        class="exam-themes h-[calc(100%-20px)] w-full rounded-lg p-5 bg-secondary-default 
            overflow-y-auto scrollbar-thin scrollbar-primary flex flex-col gap-2 inner-shadow" 
        transition:fly={{ x: 200, duration: 600 }}
    >
        <ThemeCard themeName="عادي" src='{examThemeLightImgSrc}'/>
        <ThemeCard themeName="ليلي" src={examThemeDarkImgSrc}/>
        <ThemeCard themeName="Wood(Beta)" src={examThemeWoodImgSrc}/>
    </div>
</div>

<style lang="sass">
    @import '$lib/assets/chromeScrollbarStyle.sass'
    @include chrome-scrollbar(#057b4a, #333)
</style>
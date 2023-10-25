<script lang="ts">
    import { fly } from 'svelte/transition';
    import ExamThemeCard from './ExamThemeCard.svelte'
    import examThemeDarkImgSrc from '$lib/assets/examThemeDark.png'
    import examThemeLightImgSrc from '$lib/assets/examThemeLight.png'
    import examThemeWoodImgSrc from '$lib/assets/examThemeWood.png'
</script>

<div class="exam-theme-container"  transition:fly={{ x: 200, duration: 600 }}>
    <hr>
    <h2>اختر شكل الإختبار</h2>
    <div class="exam-themes"transition:fly={{ x: 200, duration: 600 }}>
        <ExamThemeCard themeName="عادي" src={examThemeLightImgSrc}/>
        <ExamThemeCard themeName="ليلي" src={examThemeDarkImgSrc}/>
        <ExamThemeCard themeName="Wood(Beta)" src={examThemeWoodImgSrc}/>
    </div>
</div>

<style lang="sass">
@import '$lib/assets/app.sass'
.exam-theme-container
    height: calc(100% - 20px)
    width: 100%
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    text-align: center
    gap: 10px
    grid-row: 1
    grid-column: 1
    hr
        width: 30%
        border: 2px solid $color-bg-primary
        border-radius: 10px
        margin: 0
    .exam-themes
        height: calc(100% - 20px)
        width: 100%
        border-radius: 10px
        padding: 20px
        background-color: $color-bg-primary
        overflow-y: auto
        scrollbar-width: thin
        display: flex
        flex-direction: column
        gap: 20px
        @include inner-shadow()
</style>
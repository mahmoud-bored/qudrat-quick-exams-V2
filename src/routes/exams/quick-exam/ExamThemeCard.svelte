<script lang="ts">
    export let src: string
    export let themeName: string
</script>
<div class="container">
    <img {src} alt="">
    <div>
        <h2>{themeName}</h2>
    </div>
</div>

<style lang="sass">
    @import '$lib/assets/app.sass'
    .container
        width: 100%
        border-radius: 10px
        background-color: $color-bg-secondary
        display: flex
        flex-direction: column
        justify-content: center
        transition: all 0.2s ease
        border: 3px solid transparent
        cursor: pointer
        @include outer-shadow()
        img
            aspect-ratio: 1340/750
            width: 100%
            border-top-right-radius: 10px
            border-top-left-radius: 10px
        div
            height: 100%
            width: 100%
            padding: 5px 0
            display: flex
            justify-content: center
            align-items: center
        @media (hover: hover)
            &:hover
                background-color: $color-primary
                color: $color-bg-secondary
                border: 3px solid $color-primary
            
</style>
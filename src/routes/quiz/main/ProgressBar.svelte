<script lang="ts">
</script>

<div class="progress-bar-container">
</div>

<style lang="sass">
    .progress-bar-container
        display: flex
        height: 10px
        width: calc(100% - 3px)
        background-color: #333
        background: linear-gradient(-45deg, #e66465, #9198e5)
        background-size: 400% 400%
        border-top-right-radius: 5px
        border-bottom-right-radius: 5px
        animation: gradient 15s ease infinite
        
    @keyframes gradient 
        0% 
            background-position: 0% 50%
        
        50% 
            background-position: 100% 50%
        
        100% 
            background-position: 0% 50%

</style>
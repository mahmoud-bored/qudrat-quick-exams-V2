<script lang="ts">
</script>

<div class="progress-bar-container">
    <div class="progress-bar-overlay">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
</div>

<style lang="sass">
    .progress-bar-container
        display: flex
        position: absolute
        top: 0
        height: 10px
        width: calc(100% - 3px)
        background-color: #333
        background: linear-gradient(-45deg, #e66465, #9198e5)
        background-size: 400% 400%
        border-top-right-radius: 5px
        border-bottom-right-radius: 5px
        animation: gradient 15s ease infinite
        .progress-bar-overlay
            position: absolute
            top: 0
            width: 100%
            height: 100%
            display: flex
            justify-content: space-evenly
            align-items: center
            span
                width: 1px
                height: 100%
                background-color: #fff    
    @keyframes gradient 
        0% 
            background-position: 0% 50%
        
        50% 
            background-position: 100% 50%
        
        100% 
            background-position: 0% 50%

</style>
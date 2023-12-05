<script lang="ts">
    
</script>

<div class="container">
    <button class="end-quiz-button">إنهاء الإختبار</button>
    <button class="mark-last-question-button">أضف السؤال للمراجعة</button>
    <button class="skip-question-button">تخطي</button>
</div>

<style lang="sass">
    @import '$lib/assets/app.sass'
    .container
        height: 95%
        width: 100%
        background-color: transparent
        display: flex
        justify-content: space-between
        align-items: flex-end
        *
            height: 90%
            display: flex
            justify-content: center
            align-items: center
            border-radius: 5px
            border: 2px solid
            transition: all 0.2s ease
        .end-quiz-button
            width: 20%
            border-color: #DC354580
            background-color: #DC354550
            text-align: center
            @media (hover: hover)
                &:hover
                    background-color: #DC3545
                    color: #fff
        .mark-last-question-button
            width: 40%
            border-color: #FFCC1880
            background-color: #FDCD2250
            gap: 10px
            text-align: center
            @media (hover: hover)
                &:hover
                    background-color: #FDCD22
                    color: #fff
        .skip-question-button
            width: 20%
            border-color: #0D6EFD80
            background-color: #0D6EFD50
            text-align: center
            @media (hover: hover)
                &:hover
                    background-color: #0D6EFD
                    color: #fff
</style>
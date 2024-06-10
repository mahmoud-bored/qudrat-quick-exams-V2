<script lang="ts">
	import { goto } from "$app/navigation";
	import { fly } from "svelte/transition";

    let isQuizThrobberVisible = false
    let isLoginThrobberVisible = false
</script>

<section 
    class="radial-gradient absolute top-0 left-0 py-[3%] h-full-vh supports-dvh:h-dvh w-full flex flex-col justify-between items-center overflow-hidden z-[7] font-messiri" 
    in:fly={{ y: -600, duration: 200 }}
>
    <div class="w-full flex flex-center flex-col pt-[min(7%,50px)]">
        <div class="flex-center flex-row-reverse gap-4">
            <svg class="mb-2" width="30" height="70" viewBox="0 0 38 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M36.3724 0.728127L0.761603 16.6593C0.320546 16.8566 0.0836543 17.3411 0.198759 17.8103L12.8131 69.2382C12.9229 69.6855 13.3238 70 13.7844 70H28.1203C28.6233 70 29.048 69.6264 29.1122 69.1275L37.7726 1.76847C37.8722 0.993919 37.0853 0.409225 36.3724 0.728127Z" fill="#D6FAFF"/><path d="M37.07 6.97473L37.7631 1.77712C37.8665 1.00097 37.0782 0.41238 36.3635 0.732139L0.76505 16.6577C0.322462 16.8557 0.085678 17.3427 0.203274 17.8131L1.69765 23.7906C1.85281 24.4113 2.5428 24.7286 3.11501 24.4425L36.526 7.73699C36.8225 7.58876 37.0262 7.30327 37.07 6.97473Z" fill="#C2DDE0"/><path d="M18.7086 5.86046L25.0518 12.7556C25.2763 12.9997 25.2053 13.3908 24.9093 13.5404L10.4821 20.832C10.0399 21.0555 9.57686 20.5687 9.82218 20.1382L17.9062 5.95143C18.0738 5.65721 18.4793 5.61124 18.7086 5.86046Z" fill="white"/><g filter="url(#filter0_d_467_324)"><path d="M26.4799 1.9853L32.8475 8.90702C33.073 9.15207 33.0004 9.54488 32.7023 9.6932L16.6409 17.6838C16.1851 17.9106 15.7215 17.3905 15.999 16.9636L25.6927 2.05131C25.8707 1.7776 26.2589 1.74504 26.4799 1.9853Z" fill="white"/></g><path d="M24.4181 43.9948L21.6362 26.8399C21.5577 26.3558 21.1396 26 20.6491 26H18.3977C17.887 26 17.4584 26.3848 17.4035 26.8925L15.5515 44.024C15.5189 44.325 15.6245 44.6245 15.8386 44.8386L19.2929 48.2929C19.6834 48.6834 20.3166 48.6834 20.7071 48.2929L24.1381 44.8619C24.3653 44.6347 24.4695 44.312 24.4181 43.9948Z" fill="#15B0C6" stroke="#18636D" stroke-width="0.5"/><g filter="url(#filter1_d_467_324)"><path d="M17.8396 14.4725C18.6321 13.2925 20.3679 13.2925 21.1604 14.4725L25.2369 20.5429C25.6969 21.2279 25.689 22.1251 25.2171 22.802L21.1405 28.6476C20.3446 29.7889 18.6554 29.7889 17.8595 28.6476L13.7829 22.802C13.311 22.1251 13.3031 21.2279 13.7631 20.5429L17.8396 14.4725Z" fill="#FFC01D"/><path d="M20.9528 14.6118L25.0294 20.6823C25.4319 21.2817 25.425 22.0667 25.012 22.659L20.9354 28.5046C20.239 29.5032 18.761 29.5032 18.0646 28.5046L13.988 22.659C13.575 22.0667 13.5681 21.2817 13.9706 20.6823L18.0472 14.6118C18.7406 13.5793 20.2594 13.5793 20.9528 14.6118Z" stroke="#AE851C" stroke-width="0.5"/></g><defs><filter id="filter0_d_467_324" x="14.416" y="0.824219" width="19.0645" height="17.915" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dx="-0.5"/><feGaussianBlur stdDeviation="0.5"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_467_324"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_467_324" result="shape"/></filter><filter id="filter1_d_467_324" x="12.4238" y="12.5879" width="14.1523" height="17.916" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset/><feGaussianBlur stdDeviation="0.5"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_467_324"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_467_324" result="shape"/></filter></defs>
            </svg>
                
            <h1 class="text-white text-2xl md:text-3xl text-wrap text-center">
                منصة قرطاس 
                <span class="text-nowrap">( <span class="text-amber-400">تجريبي</span> )</span>
            </h1>
        </div>
        <svg class="ml-2 mt-2 w-full mx-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="277.043pt" height="31.384pt" version="1.1" viewBox="-8628.430 8074.153 277.043 31.384">
            <path id="STROKE_0749d6c4-5e92-4850-a338-91abf54296e5" opacity="1.000" fill="none" stroke="#ffffff" stroke-width="1.213" stroke-opacity="1.000" stroke-linecap="round" stroke-linejoin="round" d="M -8355.342 8085.760 Q -8356.036 8085.790 -8357.537 8085.568 Q -8359.039 8085.347 -8360.689 8085.169 Q -8362.339 8084.992 -8364.171 8084.746 Q -8366.003 8084.499 -8373.438 8083.683 Q -8380.872 8082.866 -8384.893 8082.448 Q -8388.913 8082.029 -8392.359 8081.696 Q -8395.807 8081.364 -8397.858 8081.199 Q -8399.910 8081.035 -8401.561 8080.839 Q -8403.211 8080.644 -8411.608 8079.962 Q -8420.006 8079.281 -8424.654 8079.004 Q -8429.304 8078.728 -8431.387 8078.615 Q -8433.469 8078.502 -8435.727 8078.408 Q -8437.983 8078.314 -8439.192 8078.272 Q -8440.401 8078.231 -8442.773 8078.121 Q -8445.145 8078.010 -8451.502 8077.843 Q -8457.859 8077.675 -8462.093 8077.658 Q -8466.326 8077.641 -8469.826 8077.633 Q -8473.327 8077.624 -8477.430 8077.627 Q -8481.532 8077.629 -8488.160 8077.802 Q -8494.787 8077.975 -8498.309 8078.102 Q -8501.830 8078.228 -8503.703 8078.320 Q -8505.576 8078.412 -8509.375 8078.554 Q -8513.173 8078.696 -8522.175 8079.280 Q -8531.177 8079.863 -8535.918 8080.238 Q -8540.659 8080.614 -8542.889 8080.800 Q -8545.119 8080.987 -8552.170 8081.600 Q -8559.222 8082.213 -8569.824 8083.396 Q -8580.428 8084.581 -8585.999 8085.295 Q -8591.570 8086.009 -8594.006 8086.330 Q -8596.442 8086.650 -8601.775 8087.294 Q -8607.109 8087.937 -8609.715 8088.245 Q -8612.320 8088.553 -8615.279 8088.932 Q -8618.237 8089.311 -8624.481 8089.865 Q -8624.583 8089.932 -8623.924 8090.088 Q -8623.266 8090.245 -8622.793 8090.351 Q -8622.319 8090.458 -8622.168 8090.695 "></path>
            <path id="STROKE_2adebbb4-1207-4458-9cdf-8b1222e30891" opacity="1.000" fill="none" stroke="#ffffff" stroke-width="1.213" stroke-opacity="1.000" stroke-linecap="round" stroke-linejoin="round" d="M -8369.371 8092.223 Q -8369.382 8092.154 -8368.799 8092.355 Q -8368.878 8092.354 -8369.620 8092.167 Q -8370.362 8091.979 -8371.744 8091.613 Q -8373.125 8091.247 -8377.375 8090.580 Q -8381.624 8089.914 -8384.090 8089.645 Q -8386.555 8089.375 -8389.279 8089.091 Q -8392.004 8088.806 -8397.609 8088.386 Q -8403.215 8087.965 -8409.874 8087.623 Q -8416.533 8087.282 -8421.835 8087.099 Q -8427.137 8086.916 -8430.075 8086.844 Q -8433.014 8086.771 -8434.393 8086.725 Q -8435.772 8086.678 -8441.871 8086.608 Q -8447.969 8086.540 -8452.730 8086.535 Q -8457.491 8086.530 -8460.064 8086.518 Q -8462.639 8086.506 -8467.434 8086.599 Q -8472.229 8086.691 -8474.762 8086.762 Q -8477.294 8086.833 -8478.509 8086.865 Q -8479.724 8086.897 -8484.787 8087.072 Q -8489.851 8087.248 -8495.862 8087.558 Q -8501.874 8087.869 -8504.779 8088.045 Q -8507.685 8088.222 -8512.068 8088.547 Q -8516.451 8088.873 -8519.865 8089.111 Q -8523.280 8089.350 -8531.468 8090.157 Q -8539.655 8090.965 -8545.403 8091.688 Q -8551.151 8092.412 -8553.883 8092.782 Q -8556.614 8093.153 -8558.243 8093.394 Q -8559.872 8093.634 -8562.422 8093.969 Q -8564.971 8094.303 -8575.787 8096.042 Q -8586.603 8097.781 -8592.340 8098.729 Q -8598.076 8099.677 -8600.621 8100.111 Q -8603.165 8100.545 -8604.654 8100.831 Q -8606.145 8101.117 -8609.330 8101.577 Q -8609.292 8101.577 -8608.857 8101.577 "></path>
        </svg>
    </div>
    <div class="w-full h-full flex-center flex-col gap-10 p-3 md:mb-7">
        <div class="w-full flex-center">
            <div class="w-full flex flex-col flex-center gap-2 relative">
                <p class="text-white text-center text-3xl">أول مرة تزورنا ؟</p>     
            </div>
        </div>
        <div class="w-full flex-center flex-wrap-reverse gap-[max(20px,5%)]">
            <div class="w-9/10 max-w-72">
                <button 
                    id="demo_login_GTAG"
                    class="group relative w-full h-16 flex-center bg-secondary-default rounded-lg border-2 border-amber-400
                        text-white text-lg hover:bg-amber-400 hover:text-secondary-default transition z-[8]" 
                    in:fly={{ y: -20, x: 20, duration: 1000 }}
                    on:click={() => {
                        isLoginThrobberVisible = true
                        const params = new URLSearchParams({ redirectTo: '/demo' })
                        goto(`/auth/login?${params.toString()}`)
                    }}
                >
                    <svg 
                        class="absolute left-4 h-10 opacity-0 transition stroke-amber-400 group-hover:stroke-secondary-default" 
                        class:opacity-100={isLoginThrobberVisible} 
                        width="40px" height="40px" viewBox="0 0 100 100"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="50" cy="50" r="32" stroke-width="8" stroke-dasharray="50.26548245743669 50.26548245743669" fill="none" stroke-linecap="round">
                            <animateTransform attributeName="transform" type="rotate" dur="0.7s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
                        </circle>
                    </svg>
                    تسجيل دخول
                </button>
            </div>
            <div class="w-9/10 max-w-72">
                <button 
                    id="demo-start__GTAG"
                    class="group relative w-full h-16 flex-center bg-secondary-default rounded-lg border-2 border-primary 
                        text-white text-lg hover:bg-primary hover:text-secondary-default transition z-[8]" 
                    in:fly={{ y: -20, x: 20, duration: 1000 }} 
                    on:click={() => {
                        isQuizThrobberVisible = true
                        goto('/demo/quiz')
                    }}
                >
                    <svg 
                        class="absolute left-4 h-10 opacity-0 transition stroke-primary group-hover:stroke-secondary-default" 
                        class:opacity-100={isQuizThrobberVisible} 
                        width="40px" height="40px" viewBox="0 0 100 100"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="50" cy="50" r="32" stroke-width="8" stroke-dasharray="50.26548245743669 50.26548245743669" fill="none" stroke-linecap="round">
                            <animateTransform attributeName="transform" type="rotate" dur="0.7s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
                        </circle>
                    </svg>
                    نظرة سريعة
                </button>

            </div>
        </div>
    </div>
    <div class="stars-container absolute top-0 left-0 h-full w-full">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
    </div>
</section>

<style lang="sass">
    @import '$lib/assets/stars.sass'
    .radial-gradient
        background: radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)
    .stars-container
        @include stars()
</style>
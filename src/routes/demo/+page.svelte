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
        <h1 class="text-white text-2xl md:text-3xl text-wrap text-center">
            برنامج إختبارات للفظي <span class="text-nowrap">( <span class="text-amber-400">تجريبي</span> )</span>
        </h1>
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
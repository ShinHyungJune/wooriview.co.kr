<template>
    <div class="footer">
        <div class="container">
            <div class="ft-le">
                <nuxt-link to="/" class="ft-logo"><img src="/images/ft-logo.svg" alt=""></nuxt-link>
                <div class="ft-ri">
                    <p class="customer">고객센터</p>
                    <p class="Number">0000-0000</p>
                    <p class="Holiday">
                        상담시간 : 10:00 ~ 18:00  <br>
                        주말,공휴일은 휴무입니다.
                    </p>
                </div>
                <div class="ft-nav">
                    <nuxt-link to="/contents/privacyPolicy">개인정보 처리방침</nuxt-link>
                    <nuxt-link to="/contents/servicePolicy">이용방침</nuxt-link>
                    <a href="">입점문의</a>
                    <nuxt-link to="/qnas">고객센터</nuxt-link>
                </div>
                <p class="Address">주소 : 00시 00구 00동 000-00 3층 | 사업자등록번호 : 111-11-11111  ㅣ 대표자 : 홍길동</p>
                <p class="COPYRIGHT">COPYRIGHT 2022 우리뷰 ALL RIGHT RESERVED.</p>
            </div>
        </div>
        <button id="up-btn">
            <i class="xi-arrow-up"></i>
        </button>
    </div>
</template>
<script>
import NuxtLogo from "./NuxtLogo";
export default {
    components: {NuxtLogo},
    methods: {
        top() {
            window.scrollTo({top:0});
        },

        ready(){
            alert("준비중입니다.");
        }
    },

    mounted() {
        $("#up-btn").click(function () {
            $("html, body").animate(
                {
                    scrollTop: 0,
                },
                400
            );
            return false;
        });
    }
}
</script>

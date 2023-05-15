<template>
    <div class="footer">
        <div class="container">
            <div class="ft-le">
                <nuxt-link to="/" class="ft-logo"><img src="/images/ft-logo.svg" alt=""></nuxt-link>
                <div class="ft-ri">
                    <p class="customer">고객센터</p>
                    <p class="Number">1644-2515</p>
                    <p class="Holiday">
                        상담시간 : 10:00 ~ 17:00  <br>
                        주말,공휴일은 휴무입니다.
                    </p>
                </div>
                <div class="ft-nav">
                    <nuxt-link to="/contents/privacyPolicy">개인정보 처리방침</nuxt-link>
                    <nuxt-link to="/contents/servicePolicy">이용방침</nuxt-link>
                    <nuxt-link to="/qnas/create?category=광고 및 입점 문의">입점문의</nuxt-link>
                    <nuxt-link to="/qnas">고객센터</nuxt-link>
                </div>
                <p class="Address">주소 : 상계동169-210 4층 | 사업자등록번호 : 706-88-02900  ㅣ 대표자 : 정원철</p>
                <p>통판신 번호 : 제 2023-의정부흥선-0370호</p>
                <p class="COPYRIGHT">COPYRIGHT 2022 우리뷰 ALL RIGHT RESERVED.</p>
            </div>
        </div>
        <button id="up-btn">
            <i class="xi-arrow-up"></i>
        </button>

        <div class="m-quicks type01">
            <nuxt-link to="/campaigns/create" class="m-quick" v-if="$auth.user && $auth.user.data.can_create_campaign">
                <i class="xi-pen"></i>
            </nuxt-link>
        </div>
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

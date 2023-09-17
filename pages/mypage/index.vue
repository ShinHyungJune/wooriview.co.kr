<template>
    <main id="main" class="MyPage MyPage-advertiser">
        <div class="MyPage-top">
            <div class="user-wrap">
                <div class="user-img">
                    <img :src="user.img.url" alt="" v-if="user.img">
                </div>
                <div class="user-name-wrap">
                    <p class="user-name">{{ name }}</p>
                    <p class="user-Address">{{ user.email }}</p>
                </div>
            </div>
            <img src="/images/w.png" alt="" class="MyPage-top-bg">
            <nuxt-link to="/mypage/editCompany" class="Change_Information-btn" v-if="user.type === 'COMPANY'"><img src="/images/setting.svg" alt=""></nuxt-link>
            <nuxt-link to="/mypage/editCustomer" class="Change_Information-btn" v-else><img src="/images/setting.svg" alt=""></nuxt-link>
        </div>

        <div class="container3" v-if="user.type === 'COMPANY'">
            <div class="Achievement-Banner">
                <div class="Achievement-Banner-txt">
                    <h3>빠르고 간편한 캠페인 등록</h3>
                    <p>우리뷰에서 체험단을 진행할 인플루언서를 모집해보세요!</p>
                </div>
                <a href="/campaigns/create">캠페인 등록하기</a>
            </div>

            <ul class="MyPage-btn-wrap">
                <li>
                    <nuxt-link to="/mypage/company/campaigns">
                        <div class="icon-wrap campaign"></div>
                        <div class="txt-wrap">
                            <p class="labal-p">나의 캠페인</p>
                            <p class="txt-p">등록한 캠페인을 열람하고 상세일정을 확인해 보세요</p>
                        </div>
                    </nuxt-link>
                </li>
                <li v-if="!webview">
                    <nuxt-link to="/orders">
                        <div class="icon-wrap Payment"></div>
                        <div class="txt-wrap">
                            <p class="labal-p">결제 및 내역</p>
                            <p class="txt-p">우리뷰 결제정보와 내역을 확인할 수 있어요</p>
                        </div>
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/penalties">
                        <div class="icon-wrap penalty"></div>
                        <div class="txt-wrap">
                            <p class="labal-p">패널티</p>
                            <p class="txt-p">인플루언서를  신고한 내역이나 받은 패널티를 열람 할 수 있어요</p>
                        </div>
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/qnas">
                        <div class="icon-wrap CustomerService"></div>
                        <div class="txt-wrap">
                            <p class="labal-p">고객센터</p>
                            <p class="txt-p">문의사항을 전달하고 열람할 수 있어요</p>
                        </div>
                    </nuxt-link>
                </li>
            </ul>

            <div class="logout-btn-wrap">
                <a href="#" class="logout-btn" @click.prevent="() => {$auth.logout()}">계정 로그아웃이 필요하신가요?</a>
            </div>
        </div>

        <div class="container3" v-else>
            <div class="Achievement-Banner">
                <div class="Achievement-Banner-txt">
                    <h3>나의 업적</h3>
                    <p>우리뷰에 숨겨진 업적을
                        찾아 모아보세요!</p>
                </div>
                <nuxt-link to="/medals">나의 업적 확인하기</nuxt-link>
            </div>

            <ul class="MyPage-btn-wrap">
                <li>
                    <nuxt-link to="/mypage/customer/campaigns">
                        <div class="icon-wrap campaign"></div>
                        <div class="txt-wrap">
                            <p class="labal-p">나의 캠페인</p>
                            <p class="txt-p">지원한 캠페인을 열람하고 선정되었는지 확인해보세요.</p>
                        </div>
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/mypage/customer/applications">
                        <div class="icon-wrap Shipping"></div>
                        <div class="txt-wrap">
                            <p class="labal-p">배송&방문 현황</p>
                            <p class="txt-p">진행중인 캠페인의 배송 및 방문현황을 확인하세요!</p>
                        </div>
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/penalties">
                        <div class="icon-wrap penalty"></div>
                        <div class="txt-wrap">
                            <p class="labal-p">패널티</p>
                            <p class="txt-p">광고주를 신고한 내역이나 받은 패널티를 열람할 수 있어요.</p>
                        </div>
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/qnas">
                        <div class="icon-wrap CustomerService"></div>
                        <div class="txt-wrap">
                            <p class="labal-p">고객센터</p>
                            <p class="txt-p">문의사항을 전달하고 열람할 수 있어요.</p>
                        </div>
                    </nuxt-link>
                </li>
            </ul>

<!--            <a href="/images/advertising_banner.jpg" download class="Banner-Download">
                <img src="/images/advertising_banner.jpg" alt="">
                <p>문의사항을 전달하고 열람할 수 있어요</p>
                <div class="icon">
                    <i class="xi-download"></i>
                </div>
            </a>-->

            <div class="logout-btn-wrap">
                <a href="#" class="logout-btn" @click.prevent="() => {$auth.logout();}">계정 로그아웃이 필요하신가요?</a>
            </div>
        </div>
    </main>

</template>

<script>
import Form from "../../utils/Form";
export default {
    middleware: ["auth"],

    components: {},
    data(){
        return {
            webview: false,
        }
    },
    methods: {
        ready(){
            return alert("준비중입니다.");
        }
    },

    computed: {
        user(){
            return this.$auth.user.data;
        },

        name(){
            if(this.$auth.user.data.type === 'CUSTOMER')
                return this.$auth.user.data.nickname;

            return this.$auth.user.data.company_name;
        }
    },

    mounted() {
        this.webview = /WEBVIEW/.test(navigator.userAgent);
    },

    watch: {

    },
}
</script>

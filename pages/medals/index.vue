<template>
    <main id="main" class="MyPage influencer-achievement">
        <div class="route-wrap">
            <div class="container3">
                <div class="route-box">
                    <ul class="route">
                        <li>마이페이지</li>
                        <li><i class="xi-angle-right"></i></li>
                        <li>업적</li>
                    </ul>
                    <h2>업적</h2>
                    <div class="route-bg">
                        <img src="/images/route-bg-5.png" alt="">
                    </div>
                </div>
            </div>
        </div>
        <div class="section1">
            <div class="container">
                <div class="achievement-banner">
                    <div class="img-wrap">
                        <img src="/images/achievement-main.png" alt="우리뷰">
                    </div>
                    <div class="contents-wrap">
                        <p class="banner-title">우리뷰에 숨겨진 업적을  <br class="br-mb"> 찾아 모아보세요!</p>
                        <p class="banner-sub">
                            꼭꼭 숨겨둔 업적을 찾아보세요.<br />
                            매일매일 열심히 산 당신에게 하늘에서 보물이 떨어질지도<br />
                            주변을 잘 살피는 당신에게 보물이 굴러올지도 모르거든요.<br />
                            업적은 매 새해 초기화됩니다.<br />
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="section2">
            <div class="container">
                <div class="achievement-collect">
                    <p class="title">내가 찾은 업적</p>
                    <ul class="achievement-collect-wrap">
                        <li class="default">
                            <div class="text-wrap">
                                <p class="achievement-title">
                                    아직 꼭꼭 숨어있어요.
                                </p>
                                <p class="achievement-sub">
                                    당신을 기다리는 업적이 있어요 <br />
                                    저희가 너무 꼭꼭 숨겨둔건 아니겠죠..?
                                </p>
                            </div>
                            <div class="icon-wrap">
                                <img src="/images/collect-1.png" alt="우리뷰">
                            </div>
                        </li>

                        <!--
                        <li>
                            <div class="icon-wrap">
                                <img src="/images/collect-2.png" alt="우리뷰">
                            </div>
                            <div class="text-wrap">
                                <p class="achievement-title">
                                    개근상
                                </p>
                                <p class="achievement-sub">
                                    한해 30일 연속으로 방문한<br />
                                    당신에게 개근상을 드려요.
                                </p>
                            </div>
                        </li>

                        <li>
                            <div class="icon-wrap">
                                <img src="/images/collect-3.png" alt="우리뷰">
                            </div>
                            <div class="text-wrap">
                                <p class="achievement-title">
                                    인기상
                                </p>
                                <p class="achievement-sub">
                                    한해 캠페인 100회<br />
                                    선정된 당신에게 인기상을 드려요.
                                </p>
                            </div>
                        </li>

                        <li>
                            <div class="icon-wrap">
                                <img src="/images/collect-4.png" alt="우리뷰">
                            </div>
                            <div class="text-wrap">
                                <p class="achievement-title">
                                    베스트커플상
                                </p>
                                <p class="achievement-sub">
                                    한해 한 광고주에게 7회 선정된<br />
                                    당신에게 베스트 커플상을 드려요
                                </p>
                            </div>
                        </li>

                        <li>
                            <div class="icon-wrap">
                                <img src="/images/collect-5.png" alt="우리뷰">
                            </div>
                            <div class="text-wrap">
                                <p class="achievement-title">
                                    우리동네 활동상
                                </p>
                                <p class="achievement-sub">
                                    한해 실시간 방문형<br />
                                    50회 이상 진행한 당신에게<br />
                                    우리동네 활동상을 드려요.
                                </p>
                            </div>
                        </li>

                        <li>
                            <div class="icon-wrap">
                                <img src="/images/collect-6.png" alt="우리뷰">
                            </div>
                            <div class="text-wrap">
                                <p class="achievement-title">
                                    모범상
                                </p>
                                <p class="achievement-sub">
                                    한해 캠페인 최소 30회<br />
                                    진행했는데 패널티 부여는<br />
                                    0회인 당신에게 모범상을 드려요.
                                </p>
                            </div>
                        </li>
                        -->
                    </ul>
                </div>
            </div>
        </div>

    </main>
</template>

<script>
import Form from "../../utils/Form";
import NuxtLogo from "../../components/NuxtLogo";
export default {
    components: {NuxtLogo},
    data(){
        return {
            items: {
                data: [],
                links : {},
                meta: {},
            },
        }
    },
    methods: {
        filter(loadMore = false){
            if(loadMore)
                this.form.page += 1;

            this.$axios.get("/api/qnas", {
                params: this.form
            }).then(response => {
                if(loadMore)
                    return this.items = {
                        ...response.data,
                        data: [...this.items.data, ...response.data.data]
                    };


                return this.items = response.data;
            })
        },
    },

    computed: {

    },

    mounted() {
        this.filter();
    },

    watch: {

    },
}
</script>

<template>
    <main id="main" class="MyPage MyCampaign advertiser">
        <div class="route-wrap">
            <div class="container3">
                <div class="route-box">
                    <ul class="route">
                        <li>마이페이지</li>
                        <li><i class="xi-angle-right"></i></li>
                        <li>나의 캠페인</li>
                    </ul>
                    <h2>나의 캠페인</h2>
                    <div class="route-bg">
                        <img src="/images/route-bg-2.png" alt="">
                    </div>
                </div>
            </div>
        </div>

        <div class="table-section">
            <div class="container3">
                <div class="table-tab-wrap influencer-table_1 advertiser-table_1">
                    <div class="scroll-wrap">
                        <ul class="table-tab-list">
                            <li :class="`tab-link ${state === 'beforeAccept' ? 'Active' : ''}`" data-tab="tab-1" @click="changeState('beforeAccept')">캠페인 등록 심사<span>{{ counts.unaccept }}</span></li>
                            <li :class="`tab-link ${state === 'ongoingHire' ? 'Active' : ''}`" data-tab="tab-2" @click="changeState('ongoingHire')">인플루언서 모집 <span>{{ counts.ongoingHire }}</span></li>
                            <li :class="`tab-link ${state === 'ongoingSelect' ? 'Active' : ''}`" data-tab="tab-3" @click="changeState('ongoingSelect')">인플루언서 선정 <span>{{ counts.ongoingSelect }}</span></li>
                            <!--
                            <li :class="`tab-link ${form.ongoingReview form.type_campaigns == ['DELIVERY', 'VISIT'] ? 'Active' : ''}`" data-tab="tab-4">배송관리&방문관리 <span>12</span></li>
                            -->
                            <li :class="`tab-link ${state === 'ongoingReview' ? 'Active' : ''}`" data-tab="tab-5" @click="changeState('ongoingReview')">인플루언서 작성 <span>{{ counts.ongoingReview }}</span></li>
                            <li :class="`tab-link ${state === 'finishReview' ? 'Active' : ''}`" data-tab="tab-6" @click="changeState('finishReview')">마감 및 보고서 확인 <span>{{ counts.finishReview }}</span></li>
                        </ul>
                    </div>

                    <!-- 캠페인 등록 심사 -->
                    <div class="table-wrap tab-content Active" v-if="state === 'beforeAccept'">
                        <ul class="thead">
                            <li class="th">
                                캠페인 등록일
                            </li>
                            <li class="th">
                                캠페인 정보
                            </li>
                            <li class="th">
                                모집
                            </li>
                        </ul>

                        <!-- 리스트 그룹 -->
                        <empty v-if="campaigns.data.length == 0" />

                        <ul class="tbody" v-for="campaign in campaigns.data" :key="campaign.id">
                            <li class="date">
                                <span class="unit mb">캠페인 등록일</span>
                                {{ campaign.format_created_at }}
                            </li>

                            <!-- 캠페인 정보 -->
                            <campaign :campaign="campaign" />

                            <!-- //캠페인 정보 -->
                            <li class="recruit-num num-re-po">
                                <span class="unit mb">모집</span>
                                <div class="default-wrap">
                                    <span class="num">{{ campaign.max_participant.toLocaleString() }}</span>
                                    <span class="unit">명</span>
                                </div>
                            </li>
                        </ul>
                        <!-- //그룹 -->
                    </div>
                    <!-- //캠페인 등록심사 -->

                    <!-- 인플루언서 모집 -->
                    <div class="table-wrap tab-content Active" v-if="state === 'ongoingHire'">
                        <ul class="thead">
                            <li class="th">
                                인플루언서 모집 기간
                            </li>
                            <li class="th">
                                캠페인 정보
                            </li>
                            <li class="th">
                                신청
                            </li>
                            <li class="th">
                                모집
                            </li>
                        </ul>

                        <empty v-if="campaigns.data.length == 0" />

                        <!-- 리스트 그룹 -->
                        <ul class="tbody" v-for="campaign in campaigns.data" :key="campaign.id">
                            <li class="period">
                                <span class="unit mb">인플루언서 모집 기간</span>
                                {{ campaign.format_hire_started_at }} <br class="br-pc"/> ~ {{ campaign.format_hire_finished_at }}
                            </li>

                            <!-- 캠페인 정보 -->
                            <campaign :campaign="campaign" />

                            <!-- //캠페인 정보 -->
                            <li class="application-num num-re-po">
                                <span class="unit mb">신청</span>
                                <div class="default-wrap">
                                    <span class="num">{{ campaign.applications_count.toLocaleString() }}</span>
                                    <span class="unit">명</span>
                                </div>
                            </li>
                            <li class="recruit-num num-re-po">
                                <span class="unit mb">모집</span>
                                <div class="default-wrap">
                                    <span class="num">{{ campaign.max_participant.toLocaleString() }}</span>
                                    <span class="unit">명</span>
                                </div>
                            </li>
                        </ul>
                        <!-- //그룹 -->

                    </div>

                    <!-- 인플루언서 선정 -->
                    <div class="table-wrap tab-content Active"  id="tab-3">
                        <ul class="thead">
                            <li class="th">
                                인플루언서 선정 기간
                            </li>
                            <li class="th">
                                캠페인 정보
                            </li>
                            <li class="th">
                                신청
                            </li>
                            <li class="th">
                                인플루언서
                            </li>
                        </ul>
                        <!-- 리스트 그룹 -->
                        <ul class="tbody">
                            <li class="period">
                                <span class="unit mb">인플루언서 선정 기간</span>
                                2023.00.00 <br class="br-pc"/> ~ 2023.00.00
                            </li>
                            <!-- 캠페인 정보 -->
                            <li class="campaign-info-wrap">
                                <div class="campaign-img">
                                    <img src="" alt="">
                                </div>
                                <div class="info-box">
                                    <div class="sticker-wrap">
                                        <div class="sticker">
                                            <img src="/images/time-icon.svg" alt="우리뷰">
                                        </div>
                                        <div class="sticker">
                                            <img src="/images/Blog-icon.svg" alt="우리뷰">
                                        </div>
                                    </div>
                                    <p class="info-title">제로웨이스트 제품 인플 모집</p>
                                    <P class="info-sub">수세미 & 빗 & 브러쉬 등</P>
                                </div>
                            </li>
                            <!-- //캠페인 정보 -->
                            <li class="recruit-num num-re-po">
                                <span class="unit mb">신청</span>
                                <div class="default-wrap">
                                    <span class="num">20</span>
                                    <span class="unit">명</span>
                                </div>
                            </li>
                            <li class="btn-wrap list">
                                <a class="btn-list" href="./Advertiser_influenser-list-delivery.html">리스트보기</a>
                            </li>
                        </ul>
                        <!-- //그룹 -->
                        <!-- 리스트 그룹 -->
                        <ul class="tbody">
                            <li class="period">
                                <span class="unit mb">인플루언서 선정 기간</span>
                                2023.00.00 <br class="br-pc"/> ~ 2023.00.00
                            </li>
                            <!-- 캠페인 정보 -->
                            <li class="campaign-info-wrap">
                                <div class="campaign-img">
                                    <img src="" alt="">
                                </div>
                                <div class="info-box">
                                    <div class="sticker-wrap">
                                        <div class="sticker">
                                            <img src="/images/time-icon.svg" alt="우리뷰">
                                        </div>
                                        <div class="sticker">
                                            <img src="/images/Blog-icon.svg" alt="우리뷰">
                                        </div>
                                    </div>
                                    <p class="info-title">제로웨이스트 제품 인플 모집</p>
                                    <P class="info-sub">수세미 & 빗 & 브러쉬 등</P>
                                </div>
                            </li>
                            <!-- //캠페인 정보 -->
                            <li class="recruit-num num-re-po">
                                <span class="unit mb">신청</span>
                                <div class="default-wrap">
                                    <span class="num">20</span>
                                    <span class="unit">명</span>
                                </div>
                            </li>
                            <li class="btn-wrap list">
                                <a class="btn-list" href="./Advertiser_influenser-list-delivery.html">리스트보기</a>
                            </li>
                        </ul>
                        <!-- //그룹 -->
                    </div>
                    <!-- 배송관리&방문관리 -->
                    <div class="table-wrap tab-content Active"  id="tab-4">
                        <ul class="thead">
                            <li class="th">
                                인플루언서 작성기간
                            </li>
                            <li class="th">
                                캠페인 정보
                            </li>
                            <li class="th">
                                선정
                            </li>
                            <li class="th">
                                배송/방문
                            </li>
                            <li class="th">
                                인플루언서
                            </li>
                        </ul>
                        <!-- 리스트 그룹 -->
                        <ul class="tbody">
                            <li class="period">
                                <span class="unit mb">인플루언서 작성 기간</span>
                                2023.00.00 <br class="br-pc"/> ~ 2023.00.00
                            </li>
                            <!-- 캠페인 정보 -->
                            <li class="campaign-info-wrap">
                                <div class="campaign-img">
                                    <img src="" alt="">
                                </div>
                                <div class="info-box">
                                    <div class="sticker-wrap">
                                        <div class="sticker">
                                            <img src="/images/time-icon.svg" alt="우리뷰">
                                        </div>
                                        <div class="sticker">
                                            <img src="/images/Blog-icon.svg" alt="우리뷰">
                                        </div>
                                    </div>
                                    <p class="info-title">제로웨이스트 제품 인플 모집</p>
                                    <P class="info-sub">수세미 & 빗 & 브러쉬 등</P>
                                </div>
                            </li>
                            <!-- //캠페인 정보 -->
                            <li class="recruit-num num-re-po">
                                <span class="unit mb">모집</span>
                                <div class="default-wrap">
                                    <span class="num">20</span>
                                    <span class="unit">명</span>
                                </div>
                            </li>
                            <li class="application-num num-re-po">
                                <span class="unit mb">배송/방문</span>
                                <div class="default-wrap">
                                    <span class="num">20</span>
                                    <span class="unit">명</span>
                                </div>
                            </li>
                            <li class="btn-wrap list">
                                <a class="btn-list" href="./Advertiser_influenser-list-delivery.html">리스트보기</a>
                            </li>
                        </ul>
                        <!-- //그룹 -->
                    </div>
                    <!-- //배송관리&방문관리  -->
                    <!-- 인플루언서 작성  -->
                    <div class="table-wrap tab-content Active"  id="tab-5">
                        <ul class="thead">
                            <li class="th">
                                인플루언서 작성기간
                            </li>
                            <li class="th">
                                캠페인 정보
                            </li>
                            <li class="th">
                                선정
                            </li>
                            <li class="th">
                                배송/방문
                            </li>
                            <li class="th">
                                인플루언서
                            </li>
                        </ul>
                        <!-- 리스트 그룹 -->
                        <ul class="tbody">
                            <li class="period">
                                <span class="unit mb">인플루언서 작성 기간</span>
                                2023.00.00 <br class="br-pc"/> ~ 2023.00.00
                            </li>
                            <!-- 캠페인 정보 -->
                            <li class="campaign-info-wrap">
                                <div class="campaign-img">
                                    <img src="" alt="">
                                </div>
                                <div class="info-box">
                                    <div class="sticker-wrap">
                                        <div class="sticker">
                                            <img src="/images/time-icon.svg" alt="우리뷰">
                                        </div>
                                        <div class="sticker">
                                            <img src="/images/Blog-icon.svg" alt="우리뷰">
                                        </div>
                                    </div>
                                    <p class="info-title">제로웨이스트 제품 인플 모집</p>
                                    <P class="info-sub">수세미 & 빗 & 브러쉬 등</P>
                                </div>
                            </li>
                            <!-- //캠페인 정보 -->
                            <li class="recruit-num num-re-po">
                                <span class="unit mb">선정</span>
                                <div class="default-wrap">
                                    <span class="num">20</span>
                                    <span class="unit">명</span>
                                </div>
                            </li>
                            <li class="application-num num-re-po">
                                <span class="unit mb">배송/방문</span>
                                <div class="default-wrap">
                                    <!-- <span class="num">20</span> -->
                                    <span class="unit">완료</span>
                                </div>
                            </li>
                            <li class="btn-wrap list">
                                <a class="btn-list" href="./Advertiser_influenser-list-delivery.html">리스트보기</a>
                            </li>
                        </ul>
                        <!-- //그룹 -->
                    </div>
                    <!-- //인플루언서 작성 -->
                    <!-- 마감및보고서확인  -->
                    <div class="table-wrap tab-content Active"  id="tab-6">
                        <ul class="thead">
                            <li class="th">
                                인플루언서 작성기간
                            </li>
                            <li class="th">
                                캠페인 정보
                            </li>
                            <li class="th">
                                선정
                            </li>
                            <li class="th">
                                인플루언서
                            </li>
                            <li class="th">
                                통계
                            </li>
                        </ul>
                        <!-- 리스트 그룹 -->
                        <!-- <ul class="tbody">
                            <li class="period">
                                <p class="br-mb">인플루언서 모집 기간</p>
                                2023.00.00 <br /> ~ 2023.00.00
                            </li>
                            <li class="campaign-info-wrap">
                                <div class="campaign-img">
                                    <img src="" alt="">
                                </div>
                                <div class="info-box">
                                    <div class="sticker-wrap">
                                        <div class="sticker">
                                            <img src="/images/time-icon.svg" alt="우리뷰">
                                        </div>
                                        <div class="sticker">
                                            <img src="/images/Blog-icon.svg" alt="우리뷰">
                                        </div>
                                    </div>
                                    <p class="info-title">제로웨이스트 제품 인플 모집</p>
                                    <P class="info-sub">수세미 & 빗 & 브러쉬 등</P>
                                </div>
                            </li>
                            <li class="application-num">
                                <span>20</span>명
                            </li>
                            <li class="btn-wrap list">
                                <a class="btn-list" href="./chat.html">리스트보기</a>
                            </li>
                            <li class="btn-wrap statistics">
                                <a class="btn-statistics" href="./chat.html">통계 보기</a>
                            </li>
                        </ul> -->
                        <!-- //그룹 -->
                        <!-- 리스트 그룹 -->
                        <ul class="tbody">
                            <li class="period">
                                <span class="unit mb">인플루언서 작성 기간</span>
                                2023.00.00 <br class="br-pc"/> ~ 2023.00.00
                            </li>
                            <!-- 캠페인 정보 -->
                            <li class="campaign-info-wrap">
                                <div class="campaign-img">
                                    <img src="" alt="">
                                </div>
                                <div class="info-box">
                                    <div class="sticker-wrap">
                                        <div class="sticker">
                                            <img src="/images/time-icon.svg" alt="우리뷰">
                                        </div>
                                        <div class="sticker">
                                            <img src="/images/Blog-icon.svg" alt="우리뷰">
                                        </div>
                                    </div>
                                    <p class="info-title">제로웨이스트 제품 인플 모집</p>
                                    <P class="info-sub">수세미 & 빗 & 브러쉬 등</P>
                                </div>
                            </li>
                            <!-- //캠페인 정보 -->
                            <li class="recruit-num num-re-po">
                                <span class="unit mb">선정</span>
                                <div class="default-wrap">
                                    <span class="num">20</span>
                                    <span class="unit">명</span>
                                </div>
                            </li>
                            <li class="btn-wrap list">
                                <a class="btn-list" href="./Advertiser_influenser-list-delivery.html">리스트보기</a>
                            </li>
                            <li class="btn-wrap statistics">
                                <a class="btn-statistics" href="./Advertiser_statistics.html">통계 보기</a>
                            </li>
                        </ul>
                        <!-- //그룹 -->
                    </div>
                    <!-- //마감및보고서확인 -->
                </div>

                <pagination :meta="campaigns.meta" @paginate="(page) => {form.page = page; getCampaigns()}" />

            </div>
        </div>
    </main>
</template>

<script>
import Campaign from "../../components/mypage/Campaign";
import Form from "../../utils/Form";
export default {
    middleware: ["auth"],

    components: {Campaign},
    data(){
        return {
            form: new Form(this.$axios, {
                user_id: this.$auth.user.data.id,
                accept: 0,
                ongoingHire: 0,
                ongoingSelect: 0,
                ongoingReview: 0,
                ongoingFinishReview: 0,
                type_campaigns: ["VISIT", "REALTIME", "DELIVERY", "REPORTER"],
            }),

            campaigns: {
                data: [],
                links: {},
                meta: {},
            },

            counts: {
                unaccept: 0,
                ongoingHire: 0,
                ongoingSelect: 0,
                ongoingReview: 0,
                finishReview: 0,
            },

            state: "beforeAccept",
        }
    },
    methods: {
        ready(){
            return alert("준비중입니다.");
        },

        changeState(state){
            console.log(state);
            this.state = state;

            this.reset();

            if(state === "beforeAccept"){
                this.form.accept = 0;
            }

            if(state === "ongoingHire"){
                this.form.accept = 1;
                this.form.ongoingHire = 1;
            }

            if(state === "ongoingSelect"){
                this.form.accept = 1;
                this.form.ongoingSelect = 1;
            }

            if(state === "ongoingReview"){
                this.form.accept = 1;
                this.form.ongoingReview = 1;
            }

            if(state === "finishReview"){
                this.form.accept = 1;
                this.form.finishReview = 1;
            }

            this.getCampaigns();
        },

        getCampaigns(){
            this.$axios.get("/api/campaigns", {
                params: this.form
            }).then(response => {
                this.campaigns = response.data;
            });
        },

        getCounts(){
            this.$axios.get("/api/campaigns/counts")
                .then(response => {
                    this.counts = response.data.data;
                });
        },

        reset(){
            this.form.set({
                user_id: this.$auth.user.data.id,
                accept: 0,
                ongoingHire: 0,
                ongoingSelect: 0,
                ongoingReview: 0,
                ongoingFinishReview: 0,
                type_campaigns: ["VISIT", "REALTIME", "DELIVERY", "REPORTER"],
            });
        }
    },

    computed: {
        user(){
            return this.$auth.user.data;
        },
    },

    mounted() {
        this.getCounts();

        this.getCampaigns();
    },

    watch: {

    },
}
</script>

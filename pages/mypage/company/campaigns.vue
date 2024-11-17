<template>
    <main id="main" class="MyPage MyCampaign">
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
                        <img src="/static/images/route-bg-2.png" alt="">
                    </div>
                </div>
            </div>
        </div>

        <div class="table-section">
            <div class="container3">
                <div class="table-tab-wrap influencer-table_1 advertiser-table_1">

                    <div class="m-states type01">
                        <div class="m-state-wrap">
                            <div class="m-state">
                                <h3 class="title">총 캠페인</h3>

                                <div class="box-count" @click="changeState('all')">
                                    <h3 class="count">{{counts.all}}</h3> <span class="unit">건</span>
                                </div>
                            </div>
                        </div>

                        <div class="m-state-wrap">
                            <div class="m-state">
                                <h3 class="title">심사 대기 중</h3>

                                <div class="box-count" @click="changeState('beforeAccept')">
                                    <h3 class="count">{{counts.wait}}</h3> <span class="unit">건</span>
                                </div>
                            </div>
                        </div>

                        <div class="m-state-wrap">
                            <div class="m-state">
                                <h3 class="title">모집 중</h3>

                                <div class="box-count" @click="changeState('ongoingHire')">
                                    <h3 class="count">{{counts.ongoingHire}}</h3> <span class="unit">건</span>
                                </div>
                            </div>
                        </div>

                        <div class="m-state-wrap">
                            <div class="m-state">
                                <h3 class="title">선정 중</h3>

                                <div class="box-count" @click="changeState('ongoingSelect')">
                                    <h3 class="count">{{counts.ongoingSelect}}</h3> <span class="unit">건</span>
                                </div>
                            </div>
                        </div>

                        <div class="m-state-wrap">
                            <div class="m-state">
                                <h3 class="title">체험 중</h3>

                                <div class="box-count" @click="changeState('ongoingReview')">
                                    <h3 class="count">{{counts.ongoingReview}}</h3> <span class="unit">건</span>
                                </div>
                            </div>
                        </div>

                        <div class="m-state-wrap">
                            <div class="m-state">
                                <h3 class="title">마감 및 보고서</h3>

                                <div class="box-count" @click="changeState('finishReview')">
                                    <h3 class="count">{{counts.finishReview}}</h3> <span class="unit">건</span>
                                </div>
                            </div>
                        </div>

                        <div class="m-state-wrap">
                            <div class="m-state">
                                <h3 class="title">반려</h3>

                                <div class="box-count" @click="changeState('deny')">
                                    <h3 class="count">{{counts.deny}}</h3> <span class="unit">건</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-20"></div>

                    <div class="m-tabs type03">
                        <button type="button" :class="`m-tabs-tab ${this.form.type_sns === '' ? 'active' : ''}`" @click="() => {form.page = 1; form.type_sns = ''; getCampaigns();}">전체</button>
                        <button type="button" :class="`m-tabs-tab ${this.form.type_sns === 'INSTAGRAM' ? 'active' : ''}`" @click="() => {form.page = 1; form.type_sns = 'INSTAGRAM'; getCampaigns();}">인스타그램</button>
                        <button type="button" :class="`m-tabs-tab ${this.form.type_sns === 'NAVER' ? 'active' : ''}`" @click="() => {form.page = 1; form.type_sns = 'NAVER'; getCampaigns();}">블로그</button>
                        <button type="button" :class="`m-tabs-tab ${this.form.type_sns === 'YOUTUBE_SHORTS' ? 'active' : ''}`" @click="() => {form.page = 1; form.type_sns = 'YOUTUBE_SHORTS'; getCampaigns();}">유튜브</button>
                        <button type="button" :class="`m-tabs-tab ${this.form.type_sns === 'TIKTOK' ? 'active' : ''}`" @click="() => {form.page = 1; form.type_sns = 'TIKTOK'; getCampaigns();}">틱톡</button>
                        <button type="button" :class="`m-tabs-tab ${this.form.type_sns === 'SHOP_SMART' ? 'active' : ''}`" @click="() => {form.page = 1; form.type_sns = 'SHOP_SMART'; getCampaigns();}">스마트 스토어</button>
                        <button type="button" :class="`m-tabs-tab ${this.form.type_sns === 'SHOP_COUPANG' ? 'active' : ''}`" @click="() => {form.page = 1; form.type_sns = 'SHOP_COUPANG'; getCampaigns();}">쿠팡</button>
                        <button type="button" :class="`m-tabs-tab ${this.form.type_sns === 'SHOP_OTHER' ? 'active' : ''}`" @click="() => {form.page = 1; form.type_sns = 'SHOP_OTHER'; getCampaigns();}">기타 쇼핑몰</button>
                    </div>

                    <div class="mt-20"></div>

                    <div class="search-wrap">
                        <div class="m-tabs type02">
                            <button type="button" :class="`m-tabs-tab ${this.form.state === 'all' ? 'active' : ''}`" @click="changeState('all')">전체</button>
                            <button type="button" :class="`m-tabs-tab ${this.form.state === 'beforeAccept' ? 'active' : ''}`" @click="changeState('beforeAccept')">심사 대기</button>
                            <button type="button" :class="`m-tabs-tab ${this.form.state === 'ongoingHire' ? 'active' : ''}`" @click="changeState('ongoingHire')">모집 중</button>
                            <button type="button" :class="`m-tabs-tab ${this.form.state === 'ongoingSelect' ? 'active' : ''}`" @click="changeState('ongoingSelect')">선정 중</button>
                            <button type="button" :class="`m-tabs-tab ${this.form.state === 'ongoingReview' ? 'active' : ''}`" @click="changeState('ongoingReview')">체험 중</button>
                            <button type="button" :class="`m-tabs-tab ${this.form.state === 'finishReview' ? 'active' : ''}`" @click="changeState('finishReview')">마감 및 보고서</button>
                            <button type="button" :class="`m-tabs-tab ${this.form.state === 'deny' ? 'active' : ''}`" @click="changeState('deny')">반려</button>
                        </div>

                        <form @submit.prevent="() => {form.page = 1; getCampaigns()}" class="search-wrap">
                            <div class="m-input-text type01 with-deco">
                                <input type="text" placeholder="검색어" v-model="form.word">

                                <button type="submit" class="deco">
                                    <i class="xi-search"></i>
                                </button>
                            </div>
                        </form>
                    </div>

                    <div class="mt-20"></div>

                    <!-- 심사중인 캠페인 -->
                    <div id="tab-1" class="table-wrap tab-content Active" v-if="this.form.state === 'beforeAccept'">
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
                                <span class="num">{{ campaign.max_participant.toLocaleString() }}</span>
                                <span class="unit">명</span>
                            </li>
                        </ul>
                        <!-- //그룹 -->
                    </div>
                    <!-- //심사중인 캠페인 -->

                    <!-- 인플루언서 모집 -->
                    <div id="tab-2" class="table-wrap tab-content Active" v-if="this.form.state === 'ongoingHire'">
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
                                <span class="num">{{ campaign.applications_count.toLocaleString() }}</span>
                                <span class="unit pc">명</span>
                            </li>
                            <li class="recruit-num num-re-po">
                                <span class="unit mb">모집</span>
                                <span class="num">{{ campaign.max_participant.toLocaleString() }}</span>
                                <span class="unit pc">명</span>
                            </li>
                        </ul>
                        <!-- //그룹 -->

                    </div>

                    <!-- 인플루언서 선정 -->
                    <div id="tab-3" class="table-wrap tab-content Active" v-if="this.form.state === 'ongoingSelect'">
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
                                모집
                            </li>
                            <li class="th">
                                인플루언서
                            </li>
                        </ul>

                        <empty v-if="campaigns.data.length == 0" />

                        <!-- 리스트 그룹 -->
                        <ul class="tbody" v-for="campaign in campaigns.data" :key="campaign.id">
                            <li class="period">
                                <span class="unit mb">인플루언서 선정 기간</span>
                                {{ campaign.format_select_started_at }} <br class="br-pc"/> ~ {{campaign.format_select_finished_at}}
                            </li>

                            <!-- 캠페인 정보 -->
                            <campaign :campaign="campaign" />

                            <!-- //캠페인 정보 -->
                            <li class="recruit-num num-re-po">
                                <span class="unit mb">신청</span>
                                <span class="num">{{ campaign.applications_count.toLocaleString() }}</span>
                                <span class="unit">명</span>
                            </li>
                            <li class="recruit-num num-re-po">
                                <span class="unit mb">모집</span>
                                <span class="num">{{ campaign.max_participant.toLocaleString() }}</span>
                                <span class="unit">명</span>
                            </li>
                            <li class="btn-wrap list">
                                <nuxt-link :to="`/mypage/company/applications?campaign_id=${campaign.id}`" class="btn-list">리스트보기</nuxt-link>
                            </li>
                        </ul>
                    </div>

                    <!-- 체험중인 캠페인 -->
                    <div id="tab-4" class="table-wrap tab-content Active" v-if="this.form.state === 'ongoingReview'">
                        <ul class="thead">
                            <li class="th">
                                리뷰어 컨텐츠 등록기간
                            </li>
                            <li class="th">
                                캠페인 정보
                            </li>
                            <li class="th">
                                참여
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

                        <empty v-if="campaigns.data.length == 0" />

                        <!-- 리스트 그룹 -->
                        <ul class="tbody" v-for="campaign in campaigns.data" :key="campaign.id">
                            <li class="period">
                                <span class="unit mb">인플루언서 작성 기간</span>
                                {{ campaign.format_review_started_at }} <br class="br-pc"/> ~ {{campaign.format_review_finished_at}}
                            </li>

                            <!-- 캠페인 정보 -->
                            <campaign :campaign="campaign" />

                            <!-- //캠페인 정보 -->
                            <li class="recruit-num num-re-po">
                                <span class="unit mb">참여</span>
                                <span class="num">{{ campaign.applications_count.toLocaleString() }}</span>
                                <span class="unit">명</span>
                            </li>

                            <li class="recruit-num num-re-po">
                                <span class="unit mb">선정</span>
                                <span class="num">{{ campaign.count_select.toLocaleString() }}</span>
                                <span class="unit">명</span>
                            </li>

                            <li class="btn-wrap list">
                                <nuxt-link :to="`/mypage/company/applications?campaign_id=${campaign.id}&selected=1`" class="btn-list">리스트보기</nuxt-link>
                            </li>
                            <li class="btn-wrap statistics">
                                <nuxt-link class="btn-list" :to="`/campaigns/chart?campaign_id=${campaign.id}`">통계 보기</nuxt-link>
                            </li>
                        </ul>
                    </div>

                    <!-- 마감및보고서확인 -->
                    <div  id="tab-5" class="table-finishReview table-wrap tab-content Active" v-if="this.form.state === 'finishReview'">
                        <ul class="thead">
                            <li class="th">
                                캠페인 정보
                            </li>
                            <li class="th" style="width:auto;">
                                선정
                            </li>
                            <li class="th">
                                컨텐츠
                            </li>
                            <li class="th">
                                인플루언서
                            </li>
                            <li class="th">
                                통계
                            </li>
                        </ul>

                        <empty v-if="campaigns.data.length == 0" />

                        <!-- 리스트 그룹 -->
                        <ul class="tbody" v-for="campaign in campaigns.data" :key="campaign.id">

                            <!-- 캠페인 정보 -->
                            <campaign :campaign="campaign" />

                            <li class="recruit-num num-re-po" style="width:auto;">
                                <span class="unit mb">컨텐츠</span>
                                <span class="num">{{ campaign.applications_count.toLocaleString() }}</span>
                                <span class="unit">개</span>
                            </li>

                            <li class="recruit-num num-re-po">
                                <span class="unit mb">선정</span>
                                <span class="num">{{ campaign.count_select.toLocaleString() }}</span>
                                <span class="unit">명</span>
                            </li>
                            <li class="btn-wrap list">
                                <nuxt-link :to="`/mypage/company/applications?campaign_id=${campaign.id}`" class="btn-list">리스트보기</nuxt-link>
                            </li>
                            <li class="btn-wrap statistics">
                                <nuxt-link class="btn-statistics" :to="`/campaigns/chart?campaign_id=${campaign.id}`">통계 보기</nuxt-link>
                            </li>
                        </ul>
                    </div>

                    <!-- 모든 캠페인 -->
                    <div id="tab-6" class="table-wrap tab-content Active" v-if="this.form.state === 'all'">
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
                                <span class="num">{{ campaign.max_participant.toLocaleString() }}</span>
                                <span class="unit">명</span>
                            </li>
                        </ul>
                        <!-- //그룹 -->
                    </div>
                    <!-- // 모든 캠페인  -->

                    <!-- 반려 캠페인 -->
                    <div id="tab-7" class="table-wrap tab-content Active" v-if="this.form.state === 'deny'">
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
                                <span class="num">{{ campaign.max_participant.toLocaleString() }}</span>
                                <span class="unit">명</span>
                            </li>
                        </ul>
                        <!-- //그룹 -->
                    </div>
                    <!-- //반려 캠페인 -->
                </div>

                <pagination :meta="campaigns.meta" @paginate="(page) => {form.page = page; getCampaigns()}" />

            </div>
        </div>
    </main>
</template>
<style>

</style>
<script>
import Campaign from "../../../components/mypage/Campaign";
import Form from "../../../utils/Form";
export default {
    middleware: ["auth"],

    components: {Campaign},
    data(){
        return {
            form: new Form(this.$axios, {
                user_id: this.$auth.user.data.id,
                state: "all",
                type_campaign: "",
                type_sns: "",
            }),

            campaigns: {
                data: [],
                links: {},
                meta: {},
            },

            counts: {
                all: 0,
                wait: 0,
                ongoingHire: 0,
                ongoingSelect: 0,
                ongoingReview: 0,
                finishReview: 0,
                deny: 0,
            },
        }
    },
    methods: {
        ready(){
            return alert("준비중입니다.");
        },

        changeState(state){
            this.form.state = state;

            this.reset();

            this.getCampaigns();
        },

        getCampaigns(){
            this.campaigns.data = [];

            this.$axios.get("/api/campaigns/mine", {
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
                page:1,
                user_id: this.$auth.user.data.id,
                accept: 0,
                ongoingHire: 0,
                ongoingSelect: 0,
                ongoingReview: 0,
                ongoingFinishReview: 0,
                finishReview: 0,
            });
        },

        openPop(type){
            let pop = {};

            if(type === 'beforeAccept')
                pop = {
                    title: '심사중인 캠페인',
                    description: '등록 요청한 캠페인에 허위광고, 과대광고 등 문제가 없는지 운영팀에서 확인하는 단계에요!'
                }

            if(type === 'all')
                pop = {
                    title: '모든 캠페인',
                    description: '광고주님께서 지금까지 진행하는 모든 캠페인이에요!'
                }

            if(type === 'ongoingHire')
                pop = {
                    title: '모집중인 캠페인',
                    description: '캠페인의 심사를 거쳐, 캠페인이 오픈되고 체험단을 희망하는 인플루언서를 모집하는 단계에요!'
                }

            if(type === 'ongoingSelect')
                pop = {
                    title: '인플루언서 선정',
                    description: '모집기간 마감 후 2일동안, 해당 캠페인을 진행할 인플루언서를 광고주가 직접 선정하는 단계에요!'
                }

            if(type === 'ongoingReview')
                pop = {
                    title: '체험중인 캠페인',
                    description: '선정된 인플루언서들에게 약속한 제공내역을 제공 및 체험하도록 하고 리뷰를 작성하는 단계이자 실시간으로 광고주가 ‘작성된 리뷰를 확인’할 수 있는 단계에요!\n'
                }

            if(type === 'finishReview')
                pop = {
                    title: '마감 및 보고서 확인',
                    description: '캠페인 마감 후 등록된 리뷰에 대한 결과보고서를 확인하는 단계에요!'
                }

            this.$store.commit("setPop", pop);
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

        $(".filter-hd").click(function () {
            $(".filter-bd").toggleClass("open");
            $(this).toggleClass("open");
        });
    },

    watch: {

    },
}
</script>

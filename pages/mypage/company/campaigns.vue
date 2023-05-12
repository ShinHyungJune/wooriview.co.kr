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
                    <div class="filter-wrap">
                        <div class="filter-hd">
                            <p>FILTER</p>
                            <i class="xi-angle-down"></i>
                        </div>
                        <div class="filter-bd">
                            <div class="filter-li">
                                <p class="filter-title">캠페인</p>
                                <ul class="filter-ck-wrap">
                                    <li class="filter-ck">
                                        <input type="checkbox" name="" id="VISIT" value="VISIT" v-model="form.type_campaigns" @change="() => getCampaigns()">
                                        <label for="VISIT">
                                            <i class="xi-check-square"></i>
                                            <i class="xi-checkbox-blank"></i>
                                            방문 캠페인
                                        </label>
                                    </li>
                                    <li class="filter-ck">
                                        <input type="checkbox" name="" id="DELIVERY" value="DELIVERY" v-model="form.type_campaigns" @change="() => getCampaigns()">
                                        <label for="DELIVERY">
                                            <i class="xi-check-square"></i>
                                            <i class="xi-checkbox-blank"></i>
                                            배송 캠페인
                                        </label>
                                    </li>
                                    <li class="filter-ck">
                                        <input type="checkbox" name="" id="REPORTER" value="REPORTER" v-model="form.type_campaigns" @change="() => getCampaigns()">
                                        <label for="REPORTER">
                                            <i class="xi-check-square"></i>
                                            <i class="xi-checkbox-blank"></i>
                                            기자단 캠페인
                                        </label>
                                    </li>
                                    <li class="filter-ck">
                                        <input type="checkbox" name="" id="REALTIME" value="REALTIME" v-model="form.type_campaigns" @change="() => getCampaigns()">
                                        <label for="REALTIME">
                                            <i class="xi-check-square"></i>
                                            <i class="xi-checkbox-blank"></i>
                                            실시간 캠페인
                                        </label>
                                    </li>
                                </ul>
                            </div>
                            <div class="bar"></div>
                            <div class="filter-li">
                                <p class="filter-title">인플루언서</p>
                                <ul class="filter-ck-wrap">
                                    <li class="filter-ck">
                                        <input type="checkbox" name="" id="INSTAGRAM" value="INSTAGRAM" v-model="form.type_snses" @change="() => getCampaigns()">
                                        <label for="INSTAGRAM">
                                            <i class="xi-check-square"></i>
                                            <i class="xi-checkbox-blank"></i>
                                            인스타그램
                                        </label>
                                    </li>
                                    <li class="filter-ck">
                                        <input type="checkbox" name="" id="NAVER" value="NAVER" v-model="form.type_snses" @change="() => getCampaigns()">
                                        <label for="NAVER">
                                            <i class="xi-check-square"></i>
                                            <i class="xi-checkbox-blank"></i>
                                            네이버 블로그
                                        </label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div style="margin-top:40px;"></div>

                    <div class="scroll-wrap">
                        <ul class="table-tab-list">
                            <li :class="`tab-link ${state === 'beforeAccept' ? 'Active' : ''}`" data-tab="tab-1" @click="changeState('beforeAccept')">
                                심사중인 캠페인
                                <i class="xi-help-o" @click="openPop('beforeAccept')"></i>
                                <span>{{ counts.unaccept }}</span>
                            </li>
                            <li :class="`tab-link ${state === 'ongoingHire' ? 'Active' : ''}`" data-tab="tab-2" @click="changeState('ongoingHire')">
                                모집중인 캠페인
                                <i class="xi-help-o" @click="openPop('ongoingHire')"></i>
                                <span>{{ counts.ongoingHire }}</span>
                            </li>
                            <li :class="`tab-link ${state === 'ongoingSelect' ? 'Active' : ''}`" data-tab="tab-3" @click="changeState('ongoingSelect')">
                                인플루언서 선정
                                <i class="xi-help-o" @click="openPop('ongoingSelect')"></i>
                                <span>{{ counts.ongoingSelect }}</span>
                            </li>
                            <!--
                            <li :class="`tab-link ${form.ongoingReview form.type_campaigns == ['DELIVERY', 'VISIT'] ? 'Active' : ''}`" data-tab="tab-4">배송관리&방문관리 <span>12</span></li>
                            -->
                            <li :class="`tab-link ${state === 'ongoingReview' ? 'Active' : ''}`" data-tab="tab-5" @click="changeState('ongoingReview')">
                                체험중인 캠페인
                                <i class="xi-help-o" @click="openPop('ongoingReview')"></i>
                                <span>{{ counts.ongoingReview }}</span>
                            </li>
                            <li :class="`tab-link ${state === 'finishReview' ? 'Active' : ''}`" data-tab="tab-6" @click="changeState('finishReview')">
                                마감 및 보고서 확인
                                <i class="xi-help-o" @click="openPop('finishReview')"></i>
                                <span>{{ counts.finishReview }}</span>
                            </li>
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
                    <div class="table-wrap tab-content Active"  id="tab-3"  v-if="state === 'ongoingSelect'">
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
                            <li class="btn-wrap list">
                                <nuxt-link :to="`/mypage/company/applications?campaign_id=${campaign.id}`" class="btn-list">리스트보기</nuxt-link>
                            </li>
                        </ul>
                    </div>

                    <!-- 인플루언서 작성 -->
                    <div class="table-wrap tab-content Active"  id="tab-4" v-if="state === 'ongoingReview'">
                        <ul class="thead">
                            <li class="th">
                                컨텐츠 등록기간
                            </li>
                            <li class="th">
                                캠페인 정보
                            </li>
                            <li class="th">
                                모집
                            </li>
                            <li class="th">
                                선정
                            </li>
                            <li class="th">
                                인플루언서
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
                                <div class="default-wrap">
                                    <span class="num">{{ campaign.applications_count.toLocaleString() }}</span>
                                    <span class="unit">명</span>
                                </div>
                            </li>

                            <li class="recruit-num num-re-po">
                                <span class="unit mb">선정</span>
                                <div class="default-wrap">
                                    <span class="num">{{ campaign.count_select.toLocaleString() }}</span>
                                    <span class="unit">명</span>
                                </div>
                            </li>

                            <li class="btn-wrap list">
                                <nuxt-link :to="`/mypage/company/applications?campaign_id=${campaign.id}`" class="btn-list">리스트보기</nuxt-link>
                            </li>
                        </ul>
                    </div>

                    <!-- 마감및보고서확인 -->
                    <div class="table-wrap tab-content Active"  id="tab-6" v-if="state === 'finishReview'">
                        <ul class="thead">
                            <li class="th">
                                컨텐츠 등록기간
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

                        <empty v-if="campaigns.data.length == 0" />

                        <!-- 리스트 그룹 -->
                        <ul class="tbody" v-for="campaign in campaigns.data" :key="campaign.id">
                            <li class="period">
                                <span class="unit mb">인플루언서 작성 기간</span>
                                {{ campaign.format_review_started_at }} <br class="br-pc"/> ~ {{campaign.format_review_finished_at}}
                            </li>

                            <!-- 캠페인 정보 -->
                            <campaign :campaign="campaign" />

                            <li class="recruit-num num-re-po">
                                <span class="unit mb">선정</span>
                                <div class="default-wrap">
                                    <span class="num">{{ campaign.count_select.toLocaleString() }}</span>
                                    <span class="unit">명</span>
                                </div>
                            </li>
                            <li class="btn-wrap list">
                                <nuxt-link :to="`/mypage/company/applications?campaign_id=${campaign.id}`" class="btn-list">리스트보기</nuxt-link>
                            </li>
                            <li class="btn-wrap statistics">
                                <nuxt-link class="btn-statistics" :to="`/campaigns/chart?campaign_id=${campaign.id}`">통계 보기</nuxt-link>
                            </li>
                        </ul>
                    </div>
                </div>

                <pagination :meta="campaigns.meta" @paginate="(page) => {form.page = page; getCampaigns()}" />

            </div>
        </div>
    </main>
</template>

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
                accept: 0,
                ongoingHire: 0,
                ongoingSelect: 0,
                ongoingReview: 0,
                ongoingFinishReview: 0,
                type_campaigns: ["VISIT", "REALTIME", "DELIVERY", "REPORTER"],
                type_snses: ["NAVER", "INSTAGRAM"],
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

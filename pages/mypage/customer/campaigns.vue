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
                    <div class="scroll-wrap">
                        <ul class="table-tab-list">
                            <li :class="`tab-link ${state === 'application' ? 'Active' : ''}`" data-tab="tab-1" @click="changeState('application')">신청한 캠페인<span>{{ counts.application }}</span></li>
                            <li :class="`tab-link ${state === 'select' ? 'Active' : ''}`" data-tab="tab-2" @click="changeState('select')">선정된 캠페인 <span>{{ counts.select }}</span></li>
                            <li :class="`tab-link ${state === 'finish' ? 'Active' : ''}`" data-tab="tab-3" @click="changeState('finish')">체험중인 캠페인 <span>{{ counts.finish }}</span></li>
                            <li :class="`tab-link ${state === 'like' ? 'Active' : ''}`" data-tab="tab-3" @click="changeState('like')">찜한 캠페인 <span>{{ counts.like }}</span></li>
                            <li :class="`tab-link ${state === 'all' ? 'Active' : ''}`" data-tab="tab-1" @click="changeState('all')">
                                모든 캠페인
                                <span>{{ counts.all }}</span>
                            </li>
                        </ul>
                    </div>

                    <!--신청한 캠페인-->
                    <div class="table-wrap tab-content Active" id="tab-1" v-if="state === 'application'">
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

                        <ul class="tbody" v-for="campaign in campaigns.data" :key="campaign.id">
                            <li class="period">
                                {{ campaign.format_hire_started_at }} ~ {{ campaign.format_hire_finished_at }}
                            </li>

                            <!-- 캠페인 정보 -->
                            <campaign :campaign="campaign" />

                            <li class="recruit-num num-re-po">
                                <div class="default-wrap">
                                    <span class="num">{{ campaign.applications_count.toLocaleString() }}</span>
                                    <span class="unit">명</span>
                                </div>
                            </li>
                            <li class="recruit-num num-re-po">
                                <div class="default-wrap">
                                    <span class="num">{{ campaign.max_participant.toLocaleString() }}</span>
                                    <span class="unit">명</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <!-- 선정된 캠페인 -->
                    <div class="table-wrap tab-content Active" id="tab-2" v-if="state === 'select'">
                        <ul class="thead">
                            <li class="th">
                                인플루언서 선정 기간
                            </li>
                            <li class="th">
                                캠페인 정보
                            </li>
                            <li class="th">
                                채팅
                            </li>
                        </ul>

                        <empty v-if="campaigns.data.length == 0" />

                        <!-- 리스트 그룹 -->
                        <ul class="tbody" v-for="campaign in campaigns.data" :key="campaign.id">
                            <li class="period">
                                {{ campaign.format_review_started_at }} ~ {{ campaign.format_review_finished_at }}
                            </li>

                            <!-- 캠페인 정보 -->
                            <campaign :campaign="campaign" />

                            <li class="btn-wrap chat">
                                <nuxt-link class="btn-chat" :to="`/chats?campaign_id=${campaign.id}`">채팅하기</nuxt-link>
                            </li>
                        </ul>
                        <!-- //그룹 -->

                    </div>

                    <!-- 체험중인 캠페인 -->
                    <div class="table-wrap tab-content Active"  id="tab-3"  v-if="state === 'finish'">
                        <ul class="thead">
                            <li class="th">
                                컨텐츠 등록 기간
                            </li>
                            <li class="th">
                                캠페인 정보
                            </li>
                            <li class="th">
                                리뷰
                            </li>
                            <li class="th">
                                채팅
                            </li>
                        </ul>

                        <empty v-if="campaigns.data.length == 0" />

                        <!-- 리스트 그룹 -->
                        <ul class="tbody" v-for="campaign in campaigns.data" :key="campaign.id">
                            <li class="period">
                                <span class="unit mb">컨텐츠 등록 기간</span>
                                {{ campaign.format_review_started_at }} <br class="br-pc"/> ~ {{campaign.format_review_finished_at}}
                            </li>

                            <!-- 캠페인 정보 -->
                            <campaign :campaign="campaign" />

                            <!-- //캠페인 정보 -->
                            <li class="btn-wrap review" v-if="!campaign.url_review">
                                <nuxt-link class="btn-review" :to="`/applications/review?campaign_id=${campaign.id}`">리뷰등록</nuxt-link>
                                <p>미등록</p>
                            </li>
                            <li class="btn-wrap review" v-else>
                                <a :href="campaign.url_review" target="_blank">{{campaign.url_review}}</a>
                            </li>

                            <li class="btn-wrap chat">
                                <nuxt-link class="btn-chat" :to="`/chats?campaign_id=${campaign.id}`">채팅하기</nuxt-link>
                            </li>
                        </ul>
                    </div>

                    <!-- 찜한 캠페인 -->
                    <div class="table-wrap tab-content Active" id="tab-4" v-if="state === 'like'">
                        <ul class="thead">
                            <li class="th">
                                리뷰어 컨텐츠 등록기간
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

                        <ul class="tbody" v-for="campaign in campaigns.data" :key="campaign.id">
                            <li class="period">
                                {{ campaign.format_review_started_at }} ~ {{ campaign.format_review_finished_at }}
                            </li>

                            <!-- 캠페인 정보 -->
                            <campaign :campaign="campaign" />

                            <li class="recruit-num num-re-po">
                                <div class="default-wrap">
                                    <span class="num">{{ campaign.applications_count.toLocaleString() }}</span>
                                    <span class="unit">명</span>
                                </div>
                            </li>
                            <li class="recruit-num num-re-po">
                                <div class="default-wrap">
                                    <span class="num">{{ campaign.max_participant.toLocaleString() }}</span>
                                    <span class="unit">명</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <!-- 모든 캠페인 -->
                    <div class="table-wrap tab-content Active" id="tab-5" v-if="state === 'all'">
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
                    <!-- // 심사완료 캠페인  -->
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
                application: 1,
                select: 0,
                finish: 0,
                like: 0,
                all: 0,
                type_campaigns: ["VISIT", "REALTIME", "DELIVERY", "REPORTER"],
                type_snses: ["NAVER", "INSTAGRAM"],
            }),

            campaigns: {
                data: [],
                links: {},
                meta: {},
            },

            counts: {
                application: 0,
                select: 0,
                finish: 0,
                like: 0,
                all: 0,
            },

            state: this.$route.query.state ? this.$route.query.state : "application",
        }
    },
    methods: {
        ready(){
            return alert("준비중입니다.");
        },

        changeState(state){
            this.state = state;

            this.reset();

            if(state === "application"){
                this.form.application = 1;
            }

            if(state === "select"){
                this.form.select = 1;
            }

            if(state === "finish"){
                this.form.finish = 1;
            }

            if(state === "like"){
                this.form.like = 1;
            }

            if(state === "all"){
                this.form.all = 1;
            }

            this.getCampaigns();
        },

        getCampaigns(){
            this.campaigns.data = [];

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
                application: 0,
                select: 0,
                finish: 0,
                like: 0,
                all: 0,
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

        $(".filter-hd").click(function () {
            $(".filter-bd").toggleClass("open");
            $(this).toggleClass("open");
        });
    },

    watch: {

    },
}
</script>

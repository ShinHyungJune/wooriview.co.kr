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
                <div class="table-tab-wrap influencer-table_1 influ">
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
                                <h3 class="title">신청한 캠페인</h3>

                                <div class="box-count" @click="changeState('application')">
                                    <h3 class="count">{{counts.application}}</h3> <span class="unit">건</span>
                                </div>
                            </div>
                        </div>

                        <div class="m-state-wrap">
                            <div class="m-state">
                                <h3 class="title">선정된 캠페인</h3>

                                <div class="box-count" @click="changeState('select')">
                                    <h3 class="count">{{counts.select}}</h3> <span class="unit">건</span>
                                </div>
                            </div>
                        </div>

                        <div class="m-state-wrap">
                            <div class="m-state">
                                <h3 class="title">체험 중</h3>

                                <div class="box-count" @click="changeState('finish')">
                                    <h3 class="count">{{counts.finish}}</h3> <span class="unit">건</span>
                                </div>
                            </div>
                        </div>

                        <div class="m-state-wrap">
                            <div class="m-state">
                                <h3 class="title">찜한 캠페인</h3>

                                <div class="box-count" @click="changeState('like')">
                                    <h3 class="count">{{counts.like}}</h3> <span class="unit">건</span>
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
                            <button type="button" :class="`m-tabs-tab ${this.form.state === 'application' ? 'active' : ''}`" @click="changeState('application')">신청한 캠페인</button>
                            <button type="button" :class="`m-tabs-tab ${this.form.state === 'select' ? 'active' : ''}`" @click="changeState('select')">선정된 캠페인</button>
                            <button type="button" :class="`m-tabs-tab ${this.form.state === 'finish' ? 'active' : ''}`" @click="changeState('finish')">체험 중</button>
                            <button type="button" :class="`m-tabs-tab ${this.form.state === 'like' ? 'active' : ''}`" @click="changeState('like')">찜한 캠페인</button>
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

                    <!--신청한 캠페인-->
                    <div class="table-wrap tab-content Active" id="tab-1" v-if="form.state === 'application'">
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
                    </div>

                    <!-- 선정된 캠페인 -->
                    <div class="table-wrap tab-content Active" id="tab-2" v-if="form.state === 'select'">
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
                    <div class="table-wrap tab-content Active"  id="tab-3"  v-if="form.state === 'finish'">
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
                    <div class="table-wrap tab-content Active" id="tab-4" v-if="form.state === 'like'">
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
                                <p class="br-mb">리뷰어 컨텐츠 등록기간</p>
                                {{ campaign.format_review_started_at }} <br/> ~ {{ campaign.format_review_finished_at }}
                            </li>

                            <!-- 캠페인 정보 -->
                            <campaign :campaign="campaign" />

                            <li class="recruit-num num-re-po">
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
                    </div>

                    <!-- 모든 캠페인 -->
                    <div class="table-wrap tab-content Active" id="tab-5" v-if="form.state === 'all'">
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
                                <span class="unit pc">명</span>
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
                state: "all",
                type_campaign: "",
                type_sns: "",
                word: "",
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

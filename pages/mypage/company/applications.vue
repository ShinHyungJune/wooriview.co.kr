<template>
    <main id="main" class="MyPage infulenser-list delivery-edit">
        <div class="route-wrap" v-if="campaign">
            <div class="container3">
                <div class="white-box">
                    <div class="left-box">
                        <div class="img-box">
                            <img :src="campaign.img.url" alt="" v-if="campaign.img">
                        </div>
                        <div class="info-box-wrap">
                            <div class="info-box-top">
                                <div class="info-box-top_top">
                                    <div class="sticker-wrap">
                                        <div class="sticker">
                                            <img src="/static/images/Live-icon.png" alt="" v-if="campaign.type_campaign === 'REALTIME'">
                                            <img src="/static/images/Visit-icon.png" alt="" v-if="campaign.type_campaign === 'VISIT'">
                                            <img src="/static/images/Reporter-icon.png" alt="" v-if="campaign.type_campaign === 'REPORTER'">
                                            <img src="/static/images/Shipping-icon.png" alt="" v-if="campaign.type_campaign === 'DELIVERY'">
                                        </div>
                                        <div class="sticker">
                                            <img src="/static/images/Instagram-icon.svg" alt="" v-if="campaign.type_sns === 'INSTAGRAM'">
                                            <img src="/static/images/Blog-icon.svg" alt="" v-if="campaign.type_sns === 'NAVER'">
                                        </div>
                                    </div>
                                    <!--
                                    <p class="time-line">당일 14:00</p>
                                    -->
                                </div>
                                <p class="info-title">[{{ campaign.title_company }}] {{campaign.title_product }}</p>
                                <P class="info-sub">{{campaign.title_product}}</P>
                            </div>

                            <div class="info-box-btm">
                                <ul>
                                    <li>
                                        신청 <span class="application-unit">{{ campaign.applications_count }}</span>
                                    </li>
                                    <li>
                                        모집 <span>{{ campaign.max_participant }}</span>
                                    </li>
                                    <li>
                                        선정된 인플루언서 <span class="inful-unit">{{ campaign.count_select }}</span>
                                    </li>
                                </ul>
                            </div>
                            <!-- // -->
                        </div>
                    </div>
                    <div class="right-box">
                        <ul>
                            <li>
                                <p class="period-title">인플루언서 모집기간</p>
                                <p class="period" v-if="campaign.type_campaign === 'REALTIME'">{{ campaign.time_hire_started_at }} ~ {{campaign.time_hire_finished_at}}</p>
                                <p class="period" v-else>{{ campaign.format_hire_started_at }} ~ {{campaign.format_hire_finished_at}}</p>
                            </li>
                            <li>
                                <p class="period-title">인플루언서 선정기간</p>
                                <p class="period">{{ campaign.format_select_started_at }} ~ {{campaign.format_select_finished_at}}</p>
                            </li>
                            <li>
                                <p class="period-title">리뷰어 컨텐츠 등록기간</p>
                                <p class="period">{{ campaign.format_review_started_at }} ~ {{campaign.format_review_finished_at}}</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="list-box">
                    <div class="scroll-wrap">
                        <ul>
                            <application @updated="updated" @selected="selected" :campaign="campaign" :application="application" v-for="application in applications.data" :key="application.id" />
                        </ul>
                    </div>
                </div>

                <pagination :meta="applications.meta" @paginate="(page) => {form.page = page; getApplications()}" />

            </div>
        </div>
    </main>
</template>

<script>
import Application from "../../../components/mypage/Application";
import Form from "../../../utils/Form";
export default {
    components: {Application},

    data(){
        return {
            applications: {
                data: [],
                links : {},
                meta: {},
            },

            campaign: null,

            form : new Form(this.$axios, {
                page:1,
                campaign_id: this.$route.query.campaign_id,
                type_campaign: "",
                selected: ""
            }),
        }
    },
    methods: {
        getApplications(){
            this.$axios.get("/api/applications", {
                params: this.form
            }).then(response => {
                return this.applications = response.data;
            })
        },

        getCampaign(){
            this.$axios.get("/api/campaigns/" + this.$route.query.campaign_id, {
                params: this.form
            }).then(response => {
                return this.campaign = response.data.data;
            })
        },


        updated(application){
            this.applications.data = this.applications.data.map((applicationData) => {
                if(applicationData.id == application.id)
                    return application;

                return applicationData;
            })
        },

        selected(application){
            this.applications.data = this.applications.data.map((applicationData) => {
                if(applicationData.id == application.id)
                    return application;

                return applicationData;
            })

            this.campaign.count_select += 1;
        },
    },

    computed: {

    },

    mounted() {
        if(this.$route.query.selected)
            this.form.selected = this.$route.query.selected;

        this.getApplications();

        this.getCampaign();
    },

    watch: {
        "$route.query.type_campaign": {
            handler : function(val, oldVal){
                if(val)
                    this.form.type_campaigns = [val];

                this.getCampaigns();
            },

            deep: true,
        },
    },
}
</script>

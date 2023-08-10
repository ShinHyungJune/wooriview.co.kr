<template>
    <main id="main" class="MyPage chat review-add">
        <div class="route-wrap" v-if="chat">
            <div class="container3">
                <div class="toggle-box">
                    <p class="title">[{{chat.campaign.title_company}}] {{chat.campaign.title_product}}</p>
                    <i class="xi-angle-down"></i>
                </div>
                <div class="white-box">
                    <div class="left-box">
                        <div class="img-box">
                            <img :src="chat.campaign.img.url" alt="" v-if="chat.campaign.img">
                        </div>
                        <div class="info-box-wrap">
                            <div class="info-box-top">
                                <div class="info-box-top_top">
                                    <div class="sticker-wrap">
                                        <div class="sticker">
                                            <img src="/images/Live-icon.png" alt="" v-if="chat.campaign.type_campaign === 'REALTIME'">
                                            <img src="/images/Visit-icon.png" alt="" v-if="chat.campaign.type_campaign === 'VISIT'">
                                            <img src="/images/Reporter-icon.png" alt="" v-if="chat.campaign.type_campaign === 'REPORTER'">
                                            <img src="/images/Shipping-icon.png" alt="" v-if="chat.campaign.type_campaign === 'DELIVERY'">
                                        </div>
                                        <div class="sticker">
                                            <img src="/images/Instagram-icon.svg" alt="" v-if="chat.campaign.type_sns === 'INSTAGRAM'">
                                            <img src="/images/Blog-icon.svg" alt="" v-if="chat.campaign.type_sns === 'NAVER'">
                                        </div>
                                    </div>
                                    <!--                                    <p class="time-line">당일 14:00</p>-->
                                </div>
                                <p class="info-title">[{{chat.campaign.title_company}}] {{chat.campaign.title_product}}</p>
                                <P class="info-sub">{{chat.campaign.title_product}}</P>
                            </div>

                            <div class="info-box-btm">
                                <ul>
                                    <li>
                                        신청 <span class="application-unit">{{chat.campaign.applications_count }}</span>
                                    </li>
                                    <li>
                                        모집 <span>{{chat.campaign.max_participant }}</span>
                                    </li>
                                    <li>
                                        선정된 인플루언서 <span class="inful-unit">{{chat.campaign.count_select }}</span>
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
                                <p class="period" v-if="chat.campaign.type_campaign === 'REALTIME'">{{chat.campaign.time_hire_started_at }} ~ {{chat.campaign.time_hire_finished_at}}</p>
                                <p class="period" v-else>{{chat.campaign.format_hire_started_at }} ~ {{chat.campaign.format_hire_finished_at}}</p>
                            </li>
                            <li>
                                <p class="period-title">인플루언서 선정기간</p>
                                <p class="period">{{chat.campaign.format_select_started_at }} ~ {{chat.campaign.format_select_finished_at}}</p>
                            </li>
                            <li>
                                <p class="period-title">리뷰어 컨텐츠 등록기간</p>
                                <p class="period">{{chat.campaign.format_review_started_at }} ~ {{chat.campaign.format_review_finished_at}}</p>
                            </li>
                        </ul>
                    </div>
                </div>


                <div class="link-add-box">
                    <div class="left-wrap">
                        <p class="title">지원한 캠페인에 <br class="br-mb"> 리뷰를 등록해주세요!</p>
                        <p class="sub">리뷰 작성 후 등록해주셔야 캠페인이 완료됩니다!</p>
                        <div class="link-input-wrap">
                            <input type="text" placeholder="리뷰를 작성한 링크를 적어주세요." v-model="reviewForm.url_review">
                            <div class="send-btn" @click="storeReview">
                                <i class="xi-send"></i>
                            </div>
                        </div>
                        <p class="link-input-sub">
                            리뷰에 광고성 베너를 첨부하셨나요? 꼭 첨부 후 등록해주세요. <br>
                            광고성 베너는 선정 시 발송된 우리뷰 알림톡 메시지 하단에 링크가 첨부되어 있습니다.
                        </p>
                    </div>
                    <div class="right-img-wrap">
                        <img src="/images/reviewAdd-icon.png" alt="우리뷰">
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<script>
import Pusher from 'pusher-js';
import Form from "@/utils/Form";

export default {
    middleware: ["auth"],

    data(){
        return {
            form: new Form(this.$axios, {
                page: 1,
                chat_id: "",
                body: "",
            }),

            reviewForm: new Form(this.$axios, {
                campaign_id: this.$route.query.campaign_id,
                url_review: ""
            }),

            chat: null,

        }
    },

    methods: {
        getChat(){
            this.$axios.get("/api/chats", {
                params: {
                    campaign_id: this.$route.query.campaign_id
                }
            }).then(response => {
                this.chat = response.data.data;

                setTimeout(function(){
                    $(".toggle-box").click(function (){
                        $(".white-box").toggle();
                        if($(".toggle-box i").hasClass("active") === true){
                            $(".toggle-box i").removeClass("active");
                        }else{
                            $(".toggle-box i").addClass("active");
                        }
                    });
                }, 300);
            });
        },

        storeReview(){
            if(!this.reviewForm.url_review.includes("http") && !this.reviewForm.url_review.includes("https"))
                return alert("http://나 https://가 포함된 전체 url을 입력해주세요.");

            this.reviewForm.post("/api/applications/review")
                .then(response => {
                    this.$store.commit("setPop", {
                        title: "리뷰등록완료",
                        description: "성공적으로 처리되었습니다."
                    })
                });
        },

    },

    computed: {

    },

    mounted() {
        this.getChat();
    }
}
</script>

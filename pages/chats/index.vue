<template>
    <main id="main" class="MyPage chat review-add">
        <div class="route-wrap">
            <div class="container3" v-if="application">
                <div class="toggle-box">
                    <p class="title">[{{application.campaign.title_company}}] {{application.campaign.title_product}}</p>
                    <i class="xi-angle-down"></i>
                </div>
                <div class="white-box">
                    <div class="left-box">
                        <div class="img-box">
                            <img :src="application.campaign.img.url" alt="" v-if="application.campaign.img">
                        </div>
                        <div class="info-box-wrap">
                            <div class="info-box-top">
                                <div class="info-box-top_top">
                                    <div class="sticker-wrap">
                                        <div class="sticker">
                                            <img src="/images/Live-icon.png" alt="" v-if="application.campaign.type_campaign === 'REALTIME'">
                                            <img src="/images/Visit-icon.png" alt="" v-if="application.campaign.type_campaign === 'VISIT'">
                                            <img src="/images/Reporter-icon.png" alt="" v-if="application.campaign.type_campaign === 'REPORTER'">
                                            <img src="/images/Shipping-icon.png" alt="" v-if="application.campaign.type_campaign === 'DELIVERY'">
                                        </div>
                                        <div class="sticker">
                                            <img src="/images/Instagram-icon.svg" alt="" v-if="application.campaign.type_sns === 'INSTAGRAM'">
                                            <img src="/images/Blog-icon.svg" alt="" v-if="application.campaign.type_sns === 'NAVER'">
                                        </div>
                                    </div>
<!--                                    <p class="time-line">당일 14:00</p>-->
                                </div>
                                <p class="info-title">[{{application.campaign.title_company}}] {{application.campaign.title_product}}</p>
                                <P class="info-sub">{{application.campaign.title_product}}</P>
                            </div>

                            <div class="info-box-btm">
                                <ul>
                                    <li>
                                        신청 <span class="application-unit">{{application.campaign.applications_count }}</span>
                                    </li>
                                    <li>
                                        모집 <span>{{application.campaign.max_participant }}</span>
                                    </li>
                                    <li>
                                        선정된 인플루언서 <span class="inful-unit">{{application.campaign.count_select }}</span>
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
                                <p class="period">{{application.campaign.format_hire_started_at }} ~ {{application.campaign.format_hire_finished_at}}</p>
                            </li>
                            <li>
                                <p class="period-title">인플루언서 선정기간</p>
                                <p class="period">{{application.campaign.format_select_started_at }} ~ {{application.campaign.format_select_finished_at}}</p>
                            </li>
                            <li>
                                <p class="period-title">인플루언서 작성기간</p>
                                <p class="period">{{application.campaign.format_review_started_at }} ~ {{application.campaign.format_review_finished_at}}</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="chat-wrap" ref="chatWrap">
                    <ul>
                        <message :message="message" v-for="message in messages.data" :key="message.id" @click="openProfilePop" />
                    </ul>

                </div>

                <form @submit.prevent="storeMessage" class="btm-wrap">
                    <div class="input-wrap">
                        <input type="text" v-model="form.body" placeholder="메세지를 입력하세요">
                    </div>
                    <button class="send-btn">
                        <i class="xi-send"></i>
                    </button>
                    <div class="add-box upload">
                        <input type="file" id="as_file" @change="changeFile">

                        <div class="file-upload">
                            <label class="file-btn" for="as_file">
                                <i class="xi-attachment"></i>
                            </label>
                        </div>
                    </div>
                </form>
                <!--
                <div class="add-box list-box">
                    <input type="file" id="as_file" />
                    <ul class="asfile_ul">
                        <li>
                            <div class="file_name">
                                <div class="file-wrap">
                                    <div class="img-wrap">
                                        <img src="/images/icon-clip.png" alt="">
                                    </div>
                                    <span>xxxxxx .jpg</span>
                                </div>
                                <i class="xi-close-thin"></i>
                            </div>
                        </li>
                    </ul>
                </div>
                -->
            </div>

            <!-- 광고주가 인플루언서를 누른 팝업 -->
            <div class="pop-box profile-popup open">
                <div class="btn-wrap">
                    <button class="back-btn">
                        <i class="xi-arrow-left mb"></i>
                        <i class="xi-close pc"></i>
                    </button>
                    <button class="penalty-btn">
                        <i class="xi-error"></i>
                        <span>패널티</span>
                    </button>
                </div>
                <div class="profile-wrap">
                    <div class="subscriber-img">
                        <img src="/images/user-sample.jpg" alt="">
                    </div>
                    <div class="Recommended_mark">
                        <!-- 골드 -->
                        <!-- <img src="/images/Recommended_mark_Gold.svg" alt=""> -->
                        <!-- 실버 -->
                        <!-- <img src="/images/Recommended_mark_Silver.svg" alt=""> -->
                        <!-- 브론즈 -->
                        <img src="/images/Recommended_mark_Bronze.svg" alt="">
                    </div>
                    <div class="subscriver-name">
                        <p class="name">다블리</p>
                        <p class="Address">서울시 동대문구 약령서길 123-12</p>
                    </div>
                    <div class="follower">
                        팔로워
                        <span>16842</span>
                        <span>명</span>
                    </div>
                </div>

            </div>
            <!-- //광고주가 -->

            <!-- 패널치 요청 팝업 -->
            <div class="pop-box penalty-popup">
                <button class="back-btn mb">
                    <i class="xi-arrow-left"></i>
                </button>
                <div class="pop-scroll-wrap">
                    <div class="pop-txt">
                        <p class="top-txt">정말로 패널티를 <br class="br-mb" /> 요청하시겠습니까?</p>
                        <p class="bt-txt">우리뷰에서 확인 해볼게요!</p>
                    </div>
                    <div class="write-bundle">
                        <div class="left-box">
                            <div class="subscriber-name-wrap">
                                <div class="subscriber-img">
                                    <!-- <img src="/images/Blog-icon.svg" alt=""> -->
                                </div>
                                <div class="subscriber-name">
                                    <p class="name">다블리</p>
                                    <p class="Address">서울시 동대문구</p>
                                </div>
                                <div class="Recommended_mark">
                                    <!-- 골드 -->
                                    <img src="/images/Recommended_mark_Gold.svg" alt="">
                                    <!-- 실버 -->
                                    <!-- <img src="/images/Recommended_mark_Silver.svg" alt=""> -->
                                    <!-- 브론즈 -->
                                    <!-- <img src="/images/Recommended_mark_Bronze.svg" alt=""> -->
                                </div>
                            </div>
                        </div>
                    </div>
                    <p class="mid-title">패널티 대상 인플루언서</p>
                    <div class="btn-wrap">
                        <a class="call-btn" href="./Advertiser_penalty-add.html">패널티 요청</a>
                        <button class="cancle-btn">취소하기</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- //패널치 요청 팝업 -->
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

            fileForm: new Form(this.$axios, {
                file: ""
            }),

            messages: {
                data: [],
                links: {},
                meta: {}
            },

            chat: null,

            application: null,

            targetUser: null,
            activeProfilePop: false,
            activePenaltyPop: false,
        }
    },

    methods: {
        setChannel(chat){
            let self = this;

            Pusher.logToConsole = true;

            let key = process.env.NODE_ENV === "production" ? "19fc69039eb8ec6796e0" : "6f46ba6faad7030dd0a9";

            var pusher = new Pusher(key, {
                cluster: 'ap3'
            });

            var channel = pusher.subscribe('chats.' + chat.id);

            channel.bind('App\\Events\\MessageCreated', function(data) {
                self.messages.data.push(data.message);

                self.$refs.chatWrap.scrollTop = self.$refs.chatWrap.scrollHeight + 400;
            });
        },

        getChat(){
            this.$axios.get("/api/chats", {
                params: {
                    application_id: this.$route.query.application_id
                }
            }).then(response => {
                this.chat = response.data.data;

                this.getMessages(false, this.chat);

                this.setChannel(this.chat);

            });
        },

        getApplication(){
            this.$axios.get("/api/applications/" + this.$route.query.application_id)
                .then(response => {
                    this.application = response.data.data;

                    setTimeout(function(){
                        $(function (){
                            $(".toggle-box").click(function (){
                                $(".white-box").toggle();
                                if($(".toggle-box i").hasClass("active") === true){
                                    $(".toggle-box i").removeClass("active");
                                }else{
                                    $(".toggle-box i").addClass("active");
                                }
                            });
                        });

                    }, 300);
                });
        },

        getMessages(loadMore = false, chat){
            this.form.chat_id = chat.id;

            this.$axios.get("/api/messages", {
                params: this.form
            }).then(response => {
                let self = this;

                if(loadMore)
                    return this.messages = {
                        ...response.data,
                        data: [...this.messages.data, ...response.data.data]
                    };

                this.messages = response.data;

                setTimeout(function(){
                    self.$refs.chatWrap.scrollTop = self.$refs.chatWrap.scrollHeight + 400;
                }, 300);

            });
        },

        storeMessage(){
            this.form.post("/api/messages")
                .then(response => {

                });

            this.form.body = "";

            this.fileForm.file = "";
        },

        changeFile(e){
            this.fileForm.file = e.target.files[0];

            this.fileForm.post("/api/files")
                .then(response => {
                    let body = `<div class="file-wrap">
                        <a href="${response.data.url}">${response.data.name}</a>
                        </div>`;

                    this.form.body = body;

                    this.storeMessage();
                });
        },

        openPenaltyPop(message){
            if(this.application.campaign.user.id == this.$auth.user.data.id && message.user.id != this.$auth.user.data.id)
                this.activePenaltyPop = true;
        },
        openProfilePop(message){
            this.targetUser = message.user;

            this.activeProfilePop = true;
        }
    },

    mounted() {
        this.getChat();
        this.getApplication();
    }
}
</script>

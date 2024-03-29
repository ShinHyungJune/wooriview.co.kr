<template>
    <main id="main" class="MyPage chat review-add">
        <div class="route-wrap" v-if="chat" >
            <div class="container3">
                <div class="toggle-box">
                    <p class="title">[{{chat.campaign.title_company}}] {{chat.campaign.title_product}} <br>{{ $auth.user.data.type === 'COMPANY' ? displayUser.nickname +' 인플루언서' : '' }}</p>
                    <i class="xi-angle-down active"></i>
                    <i class="xi-close m-mobile" @click.prevent="()=>$router.back()"></i>
                </div>
                <div class="white-box hide" style="display: none;">
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
                                <P class="info-sub">{{chat.campaign.product_and_price}}</P>
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
                                <p class="period">{{chat.campaign.format_hire_started_at }} ~ {{chat.campaign.format_hire_finished_at}}</p>
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

                <div class="chat-wrap" ref="chatWrap">
                    <ul>
                        <message :message="message" v-for="message in messages.data" :key="message.id" @click="openProfilePop" />
                    </ul>
                </div>

                <form @submit.prevent="storeMessage" class="btm-wrap">
                    <div class="input-wrap">
                        <textarea name="" v-model="form.body" placeholder="메세지를 입력하세요"></textarea>
                    </div>
                    <div class="btns">
                        <button class="send-btn">
                            <i class="xi-send"></i>
                        </button>
                        <button type="button" class="penalty-btn" @click="() => {targetUser = $auth.user.data.type === 'COMPANY' ? chat.application.user : chat.campaign.user; openPenaltyPop()}">
                            <i class="xi-warning"></i>
                        </button>
                    </div>

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
            <div class="pop-box profile-popup open" v-if="activeProfilePop && targetUser">
                <div class="btn-wrap">
                    <button type="button" class="back-btn" @click="closeProfilePop">
                        <i class="xi-arrow-left mb"></i>
                        <i class="xi-close pc"></i>
                    </button>
                    <button type="button" class="penalty-btn" @click="openPenaltyPop" v-if="$auth.user.data.id != targetUser.id">
                        <i class="xi-error"></i>
                        <span>패널티</span>
                    </button>
                </div>
                <div class="profile-wrap">
                    <div class="subscriber-img">
                        <img :src="targetUser.img.url" alt="" v-if="targetUser.img">
                    </div>
                    <div class="Recommended_mark" v-if="targetUser.type === 'CUSTOMER'">
                        <img src="/images/Recommended_mark_Gold.svg" alt="" v-if="targetUser.grade === 'GOLD'">
                        <img src="/images/Recommended_mark_Silver.svg" alt="" v-if="targetUser.grade === 'SILVER'">
                        <img src="/images/Recommended_mark_Bronze.svg" alt="" v-if="targetUser.grade === 'BRONZE'">
                    </div>
                    <div class="subscriver-name">
                        <p class="name">{{ targetUser.type === 'CUSTOMER' ? targetUser.nickname : targetUser.company_name }}</p>
<!--                        <p class="Address">{{targetUser.address}} {{targetUser.address_detail}}</p>-->
                        <p class="Address">{{ targetUser.type === 'CUSTOMER' ? targetUser.contact : targetUser.company_contact }}</p>

                    </div>
                    <!-- <div class="follower" v-if="targetUser.type === 'CUSTOMER' && chat.campaign.type_sns === 'INSTAGRAM'">
                        팔로워
                        <span>{{ targetUser.count_follower_instagram }}</span>
                        <span>명</span>
                    </div>
                    <div class="follower" v-if="targetUser.type === 'CUSTOMER' && chat.campaign.type_sns === 'NAVER'">
                        팔로워
                        <span>{{ targetUser.count_follower_naver }}</span>
                        <span>명</span>
                    </div> -->
                </div>

            </div>
            <!-- //광고주가 -->

            <!-- 패널치 요청 팝업 -->
            <div class="pop-box penalty-popup open" v-if="activePenaltyPop && targetUser">
                <button class="back-btn mb" style="text-align: left" @click="activePenaltyPop = false">
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
                                    <img :src="targetUser.img.url" alt="" v-if="targetUser.img.url">
                                    <!-- <img src="/images/Blog-icon.svg" alt=""> -->
                                </div>
                                <div class="subscriber-name">
                                    <p class="name">{{ targetUser.type === 'CUSTOMER' ? targetUser.nickname : targetUser.company_name }}</p>
                                    <p class="Address">{{ targetUser.address }} {{targetUser.address_detail}}</p>
                                </div>
                                <div class="Recommended_mark" v-if="targetUser.type === 'CUSTOMER'">
                                    <!-- 골드 -->
                                    <img src="/images/Recommended_mark_Gold.svg" alt="" v-if="targetUser.grade === 'GOLD'">
                                    <img src="/images/Recommended_mark_Silver.svg" alt="" v-if="targetUser.grade === 'SILVER'">
                                    <img src="/images/Recommended_mark_Bronze.svg" alt="" v-if="targetUser.grade === 'BRONZE'">
                                </div>
                            </div>
                        </div>
                    </div>
                    <p class="mid-title">패널티 대상</p>
                    <div class="btn-wrap">
                        <nuxt-link class="call-btn" :to="`/penalties/create?campaign_id=${chat.campaign.id}&target_user_id=${targetUser.id}`">패널티 요청</nuxt-link>
                        <button type="button" class="cancle-btn" @click="closePenaltyPop">취소하기</button>
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

            targetUser: null,
            activeProfilePop: false,
            activePenaltyPop: false,
        }
    },

    methods: {
        setChannel(chat){
            let self = this;

            Pusher.logToConsole = true;

            let key = process.env.NODE_ENV === "production" ? "19fc69039eb8ec6796e0" : "cda150ea07df1f5b0278";

            var pusher = new Pusher(key, {
                cluster: 'ap3'
            });

            var channel = pusher.subscribe('chats.' + chat.id);

            channel.bind('App\\Events\\MessageCreated', function(data) {
                self.messages.data.push(data.message);

                self.$refs.chatWrap.scrollTop = self.$refs.chatWrap.scrollHeight + 400;
            });

            channel.bind('pusher:subscription_count', (data) => {
                if(data.subscription_count > 2)
                    self.need_alarm = 1;
            });
        },

        getChat(){
            this.$axios.get("/api/chats", {
                params: {
                    application_id: this.$route.query.application_id,
                    campaign_id: this.$route.query.campaign_id,
                }
            }).then(response => {
                this.chat = response.data.data;
                this.displayUser = this.chat.application.user
                console.log(this.chat)
                this.getMessages(false, this.chat);

                this.setChannel(this.chat);


                setTimeout(function(){
                    $(".toggle-box").click(function (){
                        $(".white-box").toggle();
                        $(".white-box").toggleClass("hide");

                        if($(".toggle-box i").hasClass("active") === true){
                            $(".toggle-box i").removeClass("active");
                        }else{
                            $(".toggle-box i").addClass("active");
                        }
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
            if(this.form.body){
                this.form.post("/api/messages")
                    .then(response => {

                    });

                this.form.body = "";

                this.fileForm.file = "";
            }
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

        openPenaltyPop(){
            this.activePenaltyPop = true;
        },

        closePenaltyPop(){
            this.activePenaltyPop = false;
        },

        openProfilePop(targetUser){
            this.targetUser = targetUser;

            this.activeProfilePop = true;
        },

        closeProfilePop(){
            this.targetUser = null;

            this.activeProfilePop = false;
        }
    },

    computed: {
        canSee(){
            if(this.$auth.user.data.type === 'COMPANY')
                return true;

            if(this.chat.campaign.on_review || this.chat.campaign.on_finish)
                return this.chat.campaign.url_review;

            if(this.chat.campaign.on_hire)
                return true;

            if(this.chat.campaign.on_select)
                return true;

            return true;
        }
    },

    mounted() {
        this.getChat();

    }
}
</script>

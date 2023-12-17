<template>
    <header>
        <div :class="`header ${active ? 'Active' : ''}`">
            <div class="container">
                <div class="header-left">
                    <button class="back-btn" onclick="history.back()"><i class="xi-arrow-left"></i></button>

                    <nuxt-link to="/" class="logo-m">
                        <img src="/images/logo-black.png" alt="" style="width:30px;">
                    </nuxt-link>
                </div>
                <form class="header-center" action="" @submit.prevent="search">
                    <div class="Search-input-wrap">
                        <input type="text" v-model="word">
                        <button class="Search-btn">
                            <i class="xi-search"></i>
                        </button>
                    </div>
                </form>

                <div class="header-le">
                    <nuxt-link to="/" class="logo">
                        <img src="/images/logo.png" alt="">
                    </nuxt-link>
                    <ul class="header-nav">
                        <li :class="typeCampaign === 'REALTIME' ? 'active' : ''">
                            <a href="/campaigns?type_campaign=REALTIME&showMap=1">
                                <img class="live-icon-img" src="/images/Live-icon.png" alt="">
                                실시간
                            </a>
                        </li>
                        <li :class="typeCampaign === 'VISIT' ? 'active' : ''">
                            <a href="/campaigns?type_campaign=VISIT&showMap=1">
                                <img src="/images/Visit-icon.png" alt="">
                                방문형
                            </a>
                        </li>
                        <li :class="typeCampaign === 'DELIVERY' ? 'active' : ''">
                            <a href="/campaigns?type_campaign=DELIVERY">
                                <img src="/images/Shipping-icon.png" alt="">
                                배송형
                            </a>
                        </li>
                        <li :class="typeCampaign === 'REPORTER' ? 'active' : ''">
                            <a href="/campaigns?type_campaign=REPORTER">
                                <img src="/images/Reporter-icon.png" alt="">
                                기자단
                            </a>
                        </li>
                        <li :class="$route.path.includes('/qnas') || $route.path.includes('/notices') ? 'active' : ''">
                            <a href="/qnas">
                                <img class="client-icon-img" src="/images/client-icon.png" alt="">
                                고객센터
                            </a>
                        </li>
                        <li class="" v-if="!$auth.user || $auth.user.data.type === 'COMPANY'">
                            <a style="color:#ff5757;" href="https://docs.google.com/forms/d/e/1FAIpQLSejYcDdXucpmhh6fGIlX1r2GSQZr97UZiS8vh294vsAb8TKRQ/viewform">
                                <img class="client-icon-img" src="/images/enter-icon.png" alt="">
                                무료체험
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="header-ri">

                    <div class="Mobile_Menu_wrap">
                        <div class="Mobile_Menu_top">
                            <div class="Mobile_Menu_top_bg">
                                <img src="/images/w.png" alt="">
                            </div>

                            <div class="login_State_wrap" v-if="$auth.user">
                                <div class="img_wrap">
                                    <img :src="$auth.user.data.img.url" alt="" v-if="$auth.user.data.img">
                                </div>
                                <div class="user_name_wrap">
                                    <p class="user_name">우리뷰</p>
                                    <p class="email">{{ $auth.user.data.email }}</p>
                                </div>
                            </div>

                            <div class="No_login_State_wrap" v-else>
                                <nuxt-link to="/login">로그인 <i class="xi-angle-right"></i></nuxt-link>
                                <p>다양한 서비스를 이용하시려면 로그인해주세요.</p>
                            </div>

                        </div>

                        <ul class="Mobile_Menu_Nav">
                            <li>
                                <a href="/campaigns?type_campaign=REALTIME&showMap=1">실시간 방문형 <i class="xi-angle-right-min"></i></a>
                            </li>
                            <li>
                                <a href="/campaigns?type_campaign=DELIVERY&showMap=1">배송형 캠페인 <i class="xi-angle-right-min"></i></a>
                            </li>
                            <li>
                                <a href="/campaigns?type_campaign=VISIT">방문형 캠페인 <i class="xi-angle-right-min"></i></a>
                            </li>
                            <li>
                                <a href="/campaigns?type_campaign=REPORTER">기자단 캠페인 <i class="xi-angle-right-min"></i></a>
                            </li>
                            <li>
                                <a href="/qnas">고객센터 <i class="xi-angle-right-min"></i></a>
                            </li>
                        </ul>
                    </div>
                    <ul>
                        <li>
                            <button class="Mobile_Menu_open_btn">
                                <img src="/images/Menu.svg" alt="" class="inactive">
                                <i class="xi-close active"></i>
                            </button>
                        </li>
                        <li v-if="$auth.user" class="btn-alarm">
                            <button class="Notification-Open-btn" @click="toggleAlarm">
                                <span class="count" v-if="alarms.data.length > 0">{{alarms.data.length}}</span>

                                <img src="/images/Notification.svg" alt="">
                                <i class="xi-bell-o"></i>
                            </button>
                            <div class="Notification-box Active" v-if="activeAlarm">
                                <div class="Notification-top">
                                    <div class="Notification-Arrow"></div>
                                </div>
                                <div class="Notification-wrap">
                                    <div class="m-tabs type01">
                                        <button :class="`m-tab ${alarmForm.type === 'MESSAGE_CREATED' ? 'active' : ''}`" @click="() => {alarmForm.type = 'MESSAGE_CREATED'; }">채팅</button>
                                        <button :class="`m-tab ${alarmForm.type === '' ? 'active' : ''}`" @click="() => {alarmForm.type = '';}">캠페인</button>
                                    </div>

                                    <div class="Notification-list-wrap" v-if="alarmForm.type === 'MESSAGE_CREATED' ? alarms.data.filter(alarm => alarmForm.type === alarm.type).length === 0 : alarms.data.filter(alarm => alarmForm.type !== 'MESSAGE_CREATED').length === 0">
                                        <empty />
                                    </div>

                                    <ul class="Notification-list-wrap" v-else>
                                        <li v-for="alarm in alarms.data" :key="alarm.id" v-if="alarmForm.type ? alarm.type === alarmForm.type : alarm.type !== 'MESSAGE_CREATED'">
                                            <div class="Notification-img" :style="`background-image:url(${alarm.campaign ? alarm.campaign.img.url : '/images/crown.png'})`"></div>
                                            <a href="#" class="Notification-data" @click.prevent="alarmMove(alarm)">
                                                <p class="Notification-title">{{alarm.info.title || "우리:뷰"}}</p>
                                                <p class="Notification-content">
                                                    {{alarm.info.message}}
                                                </p>
                                            </a>
                                            <div class="data-wrap">
                                                <span class="date">{{ alarm.format_created_at }}</span>
                                                <button class="Notification-delete" @click="removeAlarm(alarm)">{{alarmForm.type === 'MESSAGE_CREATED' ? '나가기' : '삭제'}}</button>
                                            </div>
                                        </li>

                                        <!--
                                        <button class="see_more" @click="() => {getAlarms(true);}" v-if="alarms.links && alarms.links.next">더보기</button>
                                        -->
                                    </ul>

                                    <button class="btn"  @click="activeAlarm = false">
                                        닫기
                                    </button>
                                </div>


                            </div>
                            <div class="Notification-close" @click="activeAlarm = false"></div>
                        </li>
                        <li class="pc">
                            <nuxt-link to="/mypage">
                                <img src="/images/My.svg" alt="">
                            </nuxt-link>
                        </li>
                    </ul>

                </div>
            </div>
            <a class="follow-chat">
                <i></i>
            </a>
            <div class="mb-bottom-Bar">
                <!--
<button class="Mobile_Menu_open_btn">
    <img src="/images/Menu.svg" alt="" class="inactive">
    <i class="xi-close active"></i>
</button>
<div class="Mobile_Menu_wrap">
    <div class="Mobile_Menu_top">
        <div class="Mobile_Menu_top_bg">
            <img src="/images/w.png" alt="">
        </div>

        <div class="login_State_wrap" v-if="$auth.user">
            <div class="img_wrap">
                <img :src="$auth.user.data.img.url" alt="" v-if="$auth.user.data.img">
            </div>
            <div class="user_name_wrap">
                <p class="user_name">우리뷰</p>
                <p class="email">{{ $auth.user.data.email }}</p>
            </div>
        </div>

        <div class="No_login_State_wrap" v-else>
            <nuxt-link to="/login">로그인 <i class="xi-angle-right"></i></nuxt-link>
            <p>다양한 서비스를 이용하시려면 로그인해주세요.</p>
        </div>

    </div>

    <ul class="Mobile_Menu_Nav">
        <li>
            <a href="/campaigns?type_campaign=REALTIME&showMap=1">실시간 방문형 캠페인 <i class="xi-angle-right-min"></i></a>
        </li>
        <li>
            <a href="/campaigns?type_campaign=DELIVERY&showMap=1">배송형 캠페인 <i class="xi-angle-right-min"></i></a>
        </li>
        <li>
            <a href="/campaigns?type_campaign=VISIT">방문형 캠페인 <i class="xi-angle-right-min"></i></a>
        </li>
        <li>
            <a href="/campaigns?type_campaign=REPORTER">기자단 캠페인 <i class="xi-angle-right-min"></i></a>
        </li>
        <li>
            <a href="/qnas">고객센터 <i class="xi-angle-right-min"></i></a>
        </li>
    </ul>
</div>
-->
                <a href="/">
                    <img src="/images/home.png" alt="">

                    <!-- <img src="/images/book.svg" alt=""> -->
                    <span class="text">홈</span>
                </a>

                <!-- 인플루언서용 -->
                <a href="/mypage/customer/campaigns" v-if="$auth.user && $auth.user.data.type === 'CUSTOMER'">
                    <img src="/images/heart.png" alt="">

                    <span class="text">찜</span>
                    <!-- <img src="/images/hd_logo.svg" alt=""> -->
                </a>

                <a href="/campaigns?type_campaign=VISIT&showMap=1" v-if="$auth.user && $auth.user.data.type === 'CUSTOMER'">
                    <img src="/images/marker.png" alt="">

                    <span class="text">내 주변</span>
                    <!-- <img src="/images/hd_logo.svg" alt=""> -->
                </a>

                <a href="#" v-if="$auth.user && $auth.user.data.type === 'CUSTOMER'" @click.prevent="activeAlarm = !activeAlarm">
                    <div class="img-wrap">
                        <img src="/images/comment.png" alt="">
                        <span class="count" v-if="alarms.data.length > 0">{{alarms.data.length}}</span>
                    </div>

                    <span class="text">채팅</span>
                    <!-- <img src="/images/hd_logo.svg" alt=""> -->
                </a>

                <!-- 광고주용 -->
                <a href="/campaigns/create" v-if="$auth.user && $auth.user.data.can_create_campaign">
                    <img src="/images/write.png" alt="">

                    <span class="text">캠페인 등록</span>
                    <!-- <img src="/images/hd_logo.svg" alt=""> -->
                </a>
                <a href="/qnas/create?category=광고%20및%20입점%20문의" v-if="$auth.user && $auth.user.data.type === 'COMPANY' && !$auth.user.data.can_create_campaign">
                    <img src="/images/ad.png" alt="">

                    <span class="text">광고문의</span>
                    <!-- <img src="/images/hd_logo.svg" alt=""> -->
                </a>
                <a href="/campaigns?type_campaign=VISIT&showMap=1" v-if="$auth.user && $auth.user.data.type === 'COMPANY'">
                    <img src="/images/marker.png" alt="">

                    <span class="text">내 주변</span>
                    <!-- <img src="/images/hd_logo.svg" alt=""> -->
                </a>
                <a href="#" v-if="$auth.user && $auth.user.data.type === 'COMPANY'" @click.prevent="activeAlarm = !activeAlarm">
                    <div class="img-wrap">
                        <img src="/images/comment.png" alt="">
                        <span class="count" v-if="alarms.data.length > 0">{{alarms.data.length}}</span>
                    </div>

                    <span class="text">채팅</span>
                    <!-- <img src="/images/hd_logo.svg" alt=""> -->
                </a>

                <!-- 비로그인 -->
                <a href="/login" v-if="!$auth.user">
                    <img src="/images/user.png" alt="">

                    <span class="text">로그인</span>
                    <!-- <img src="/images/hd_logo.svg" alt=""> -->
                </a>
                <a href="/qnas/create?category=광고%20및%20입점%20문의" v-if="!$auth.user">
                    <img src="/images/ad.png" alt="">

                    <span class="text">광고문의</span>
                    <!-- <img src="/images/hd_logo.svg" alt=""> -->
                </a>
                <a href="/notices" v-if="!$auth.user">
                    <img src="/images/comment.png" alt="">

                    <span class="text">공지사항</span>
                    <!-- <img src="/images/hd_logo.svg" alt=""> -->
                </a>

                <a href="/mypage" v-if="$auth.user">
                    <img src="/images/user.png" alt="">

                    <span class="text">내 정보</span>
                    <!-- <img src="/images/hd_logo.svg" alt=""> -->
                </a>
                <!--
                <nuxt-link to="/mypage/customer/campaigns?state=like" v-if="$auth.user && $auth.user.data.type === 'CUSTOMER'">
                    <img src="/images/heart.svg" alt="">
                </nuxt-link>
                <nuxt-link to="/mypage">
                    <img src="/images/my2.svg" alt="">
                </nuxt-link>
                -->
            </div>
        </div>
    </header>
</template>
<script>
import Form from "../utils/Form";
export default {
    data(){
        return {
            word: "",

            alarms: {
                data: [],
                meta: {
                    total: 0,
                },
                links: {}
            },

            alarmForm: new Form(this.$axios, {
                page: 1,
                type: "MESSAGE_CREATED"
            }),

            active: false,
            activeAlarm: false,
            timer : null,
            interval: null,
            alarmLoading: false,
        }
    },

    methods: {

        ready(e){
            e.preventDefault();
            e.stopPropagation();

            return alert("준비중입니다.");
        },

        search(){
            this.$router.push(`/campaigns?word=${this.word}`);
        },

        getAlarms(loadMore = false){
            this.alarmLoading = true;

            let self = this;

            if(this.$auth.user){
                if(loadMore)
                    this.alarmForm.page += 1;

                this.$axios.get("/api/alarms", {
                    params: this.alarmForm
                }).then(response => {
                    this.alarmLoading = false;

                    if(loadMore)
                        return this.alarms = {
                            ...response.data,
                            data: [...this.alarms.data, ...response.data]
                        };

                    this.alarms = response.data;

                    this.$auth.fetchUser();
                })
            }

            if(this.timer)
                clearTimeout(this.timer);

            this.timer = setTimeout(function(){
                self.getAlarms(false);
            }, 60000);

        },

        removeAlarm(alarm){
            this.alarmLoading = true;

            this.alarms.data = this.alarms.data.filter(alarmData => alarmData.id != alarm.id);

            this.alarmForm.delete("/api/alarms/" + alarm.id)
                .then(response => {
                    this.alarmLoading = false;
                });
        },

        removeAllAlarm(){
            this.alarmLoading = true;

            this.alarms.data = this.alarmForm.type === 'MESSAGE_CREATED'
                ? this.alarms.data.filter(alarm => alarm.type !== 'MESSAGE_CREATED')
                : this.alarms.data.filter(alarm => alarm.type === 'MESSAGE_CREATED');

            this.alarmForm.delete("/api/alarms")
                .then(response => {
                    this.alarmLoading = false;
                });
        },

        toggleAlarm(){
            this.alarmForm.page = 1;

            if(!this.activeAlarm) {
                this.getAlarms();

                return this.activeAlarm = true;
            }

            this.activeAlarm = false;
        },

        alarmMove(alarm){
            this.removeAlarm(alarm);

            if(alarm.info.url.includes("http") || alarm.info.url.includes("https"))
                return location.href = alarm.info.url;

            this.$router.push(alarm.info.url);
        }
    },

    computed: {
        typeCampaign() {
            if(this.$route.query.type_campaign)
                return this.$route.query.type_campaign;

            return "";
        },

        hasUnreadAlarm(){
            return this.alarms.data.some(alarm => alarm.read == 0);
        }
    },

    watch: {
        '$route'(to, from) {
            // 라우트가 변경될 때 호출되는 watch
            this.activeAlarm = false;
        }
    },

    mounted() {
        let self = this;

        if(this.interval)
            clearInterval(this.interval);

        this.interval = setInterval(() => {
            if(!self.alarmLoading)
                self.getAlarms();
        }, 5000);

        $(".Mobile_Menu_open_btn").click(function () {
            $(this).toggleClass("open");
            $(".Mobile_Menu_wrap").toggleClass("open");
            $(".header").toggleClass("Mobile_Menu_open");
        });

        $(".Mobile_Menu_Nav a").click(function(){
            $(".Mobile_Menu_wrap").removeClass("open");
            $(".header").removeClass("Mobile_Menu_open");
        });

        /*
        // 검색창 열고 닫기
        $(".Search-Open-btn").click(function () {
            $(".header").addClass("Active");
            $(".Search-box").addClass("Active");
            $(".Search-close").addClass("Active");
        });

        $(".Search-close").click(function () {
            $(".header").removeClass("Active");
            $(".Search-box").removeClass("Active");
            $(".Search-close").removeClass("Active");
        });

        // 알림창 열고 닫기
        $(".Notification-Open-btn").click(function () {
            $(".Notification-box").addClass("Active");
            $(".Notification-close").addClass("Active");

            $(".Notification-close").click(function () {
                $(".Notification-box").removeClass("Active");
                $(".Notification-close").removeClass("Active");
            })
        });
        */
    }
}
</script>

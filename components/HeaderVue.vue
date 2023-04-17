<template>
    <header>
        <div :class="`header ${active ? 'Active' : ''}`">
            <div class="container">
                <button class="back-btn" onclick="history.back()"><i class="xi-arrow-left"></i></button>
                <div class="header-le">
                    <nuxt-link to="/" class="logo">
                        <img src="/images/logo.svg" alt="">
                    </nuxt-link>
                    <ul class="header-nav">
                        <li>
                            <nuxt-link to="/campaigns?type_campaign=REALTIME">실시간</nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/campaigns?type_campaign=VISIT">방문형</nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/campaigns?type_campaign=DELIVERY">배송형</nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/campaigns?type_campaign=REPORTER">기자단</nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/qnas">고객센터</nuxt-link>
                        </li>
                    </ul>
                </div>
                <div class="header-ri">
                    <ul>
                        <li>
                            <button class="Search-Open-btn" @click.prevent="active = true">
                                <img src="/images/Search.svg" alt="">
                                <i class="xi-search"></i>
                            </button>
                            <div :class="`Search-box ${active ? 'Active' : ''}`">
                                <form action="" @submit.prevent="search">
                                    <div class="Search-wrap">
                                        <p>찾으시는 캠페인이 있나요?</p>
                                        <div class="Search-input-wrap">
                                            <input type="text" v-model="word">
                                            <button class="Search-btn"><i class="xi-search"></i></button>
                                        </div>
                                        <a href="" class="map-Search" @click.prevent="search"><img src="/images/Map_Search.png" alt=""></a>
                                    </div>
                                </form>

                            </div>
                            <div :class="`Search-close ${active ? 'Active' : ''}`" @click="active = false"></div>
                        </li>
                        <li>
                            <button class="Notification-Open-btn" @click.prevent="ready">
                                <img src="/images/Notification.svg" alt="">
                                <i class="xi-bell-o"></i>
                            </button>
                            <div class="Notification-box">
                                <div class="Notification-top">
                                    <div class="Notification-Arrow"></div>
                                </div>
                                <div class="Notification-wrap">
                                    <p class="Notification-p">알림</p>
                                    <ul class="Notification-list-wrap">
                                        <li>
                                            <div class="Notification-img">
                                                <img src="" alt="">
                                            </div>
                                            <div class="Notification-data">
                                                <p class="Notification-title">우리:뷰</p>
                                                <p class="Notification-content">
                                                    신청하신 '[브랜드명] 제로웨이스트 제품'
                                                    캠페인에 선정되었습니다.
                                                </p>
                                            </div>
                                            <div class="data-wrap">
                                                <span class="date">05.24</span>
                                                <button class="Notification-delete">삭제</button>
                                            </div>
                                        </li>

                                        <button class="see_more">더보기</button>
                                    </ul>
                                </div>
                            </div>
                            <div class="Notification-close"></div>
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
                <button class="Mobile_Menu_open_btn"><img src="/images/Menu.svg" alt=""></button>
                <div class="Mobile_Menu_wrap">
                    <div class="Mobile_Menu_top">
                        <div class="Mobile_Menu_top_bg">
                            <img src="/images/w.png" alt="">
                        </div>

                        <!-- 로그인 했을때 -->
                        <!-- <div class="login_State_wrap">
                            <div class="img_wrap">
                                <img src="" alt="">
                            </div>
                            <div class="user_name_wrap">
                                <p class="user_name">우리뷰</p>
                                <p class="email">weView@gmail.com</p>
                            </div>
                        </div> -->

                        <!-- 비로그인 일때 -->
                        <div class="No_login_State_wrap">
                            <a href="../pages/login.html">로그인 <i class="xi-angle-right"></i></a>
                            <p>다양한 서비스를 이용하시려면 로그인해주세요.</p>
                        </div>

                    </div>
                    <ul class="Mobile_Menu_Nav">
                        <li>
                            <a href="../pages/campaign.html">실시간 방문형 캠페인 <i class="xi-angle-right-min"></i></a>
                        </li>
                        <li>
                            <a href="../pages/campaign.html">배송형 캠페인 <i class="xi-angle-right-min"></i></a>
                        </li>
                        <li>
                            <a href="../pages/campaign.html">방문형 캠페인 <i class="xi-angle-right-min"></i></a>
                        </li>
                        <li>
                            <a href="../pages/campaign.html">기자단 캠페인 <i class="xi-angle-right-min"></i></a>
                        </li>
                        <li>
                            <a href="../pages/support.html">고객센터 <i class="xi-angle-right-min"></i></a>
                        </li>
                    </ul>
                </div>
                <a href="../pages/MyCampaign-influencer.html"><img src="/images/book.svg" alt=""></a>
                <a href="../pages/index.html"><img src="/images/hd_logo.svg" alt=""></a>
                <a href="../pages/MyCampaign-influencer.html"><img src="/images/heart.svg" alt=""></a>
                <a href="../pages/MyPage-advertiser.html"><img src="/images/My2.svg" alt=""></a>
            </div>
        </div>
    </header>
</template>
<script>
export default {
    data(){
        return {
            word: "",

            recommendUsers: {
                data: []
            },

            active: false,
        }
    },

    methods: {
        getRecommendUsers(){
            this.$axios.get("/api/recommendUsers")
                .then(response => {
                    this.recommendUsers = response.data
                });
        },

        ready(e){
            e.preventDefault();
            e.stopPropagation();

            return alert("준비중입니다.");
        },

        search(){
            this.$router.push(`/campaigns?word=${this.word}`);
        }
    },

    mounted() {
        /*
        $(".Mobile_Menu_open_btn").click(function () {
            $(".Mobile_Menu_wrap").toggleClass("open");
            $(".header").toggleClass("Mobile_Menu_open");
        });
         */

        // 검색창 열고 닫기
        /*$(".Search-Open-btn").click(function () {
            $(".header").addClass("Active");
            $(".Search-box").addClass("Active");
            $(".Search-close").addClass("Active");
        });*/

        /*
        $(".Search-close").click(function () {
            $(".header").removeClass("Active");
            $(".Search-box").removeClass("Active");
            $(".Search-close").removeClass("Active");
        });
        */

        /*
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

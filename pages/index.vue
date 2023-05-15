<template>
    <main id="main" class="main">
        <pops />

        <section class="section1">
            <div class="swiper mySwiper1">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="banner in banners.data" :key="banner.id">
                        <img :src="banner.pc.url" class="pc" alt="" v-if="banner.pc">
                        <img :src="banner.mobile.url" class="mb" alt="" v-if="banner.mobile">
                        <nuxt-link :to="banner.url"></nuxt-link>
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </section>
        <section class="section2">
            <div class="container">
                <div class="campaign-item-wrap">
                    <div class="h2-wrap">
                        <h2>실시간 <span>인기폭발 캠페인</span></h2>
                        <p class="see-more">캠페인 <nuxt-link to="/campaigns">더보기<i class="xi-plus-min"></i></nuxt-link></p>
                    </div>

                    <empty v-if="favorCampaigns.data.length === 0" />
                    <ul class="campaign-item-list">

                        <campaign :campaign="favorCampaign" v-for="favorCampaign in favorCampaigns.data" :key="favorCampaign.id" />
                    </ul>
                </div>
            </div>
        </section>
        <section class="section3">
            <div class="container">
                <div class="campaign-item-wrap">
                    <div class="h2-wrap">
                        <h2>마감 <span>임박 캠페인</span></h2>
                        <p class="see-more">캠페인 <nuxt-link to="/campaigns">더보기<i class="xi-plus-min"></i></nuxt-link></p>
                    </div>

                    <empty v-if="lastCampaigns.data.length === 0" />

                    <ul class="campaign-item-list">
                        <campaign :campaign="lastCampaign" v-for="lastCampaign in lastCampaigns.data" :key="lastCampaign.id" />
                    </ul>
                </div>
            </div>
        </section>
        <section class="section4">
            <div class="container">
                <div class="campaign-item-wrap">
                    <div class="h2-wrap">
                        <h2>MD <span> 추천 캠페인</span></h2>
                        <p class="see-more">캠페인 <nuxt-link to="/campaigns">더보기<i class="xi-plus-min"></i></nuxt-link></p>
                    </div>

                    <empty v-if="recommendCampaigns.data.length === 0" />

                    <ul class="campaign-item-list">
                        <campaign :campaign="recommendCampaign.campaign" v-for="recommendCampaign in recommendCampaigns.data" :key="recommendCampaign.id" />
                    </ul>
                </div>
            </div>
        </section>
        <section class="section5">
            <div class="container">
                <img src="/images/campaign-banner2.png" alt="" class="pc">
                <img src="/images/campaign-banner2-m.png" alt="" class="mb">
            </div>
        </section>

        <section class="section6">
            <div class="container">
                <div class="h2-wrap">
                    <h2>베스트 <span>캠페인 리뷰</span></h2>
                    <p class="see-more">다양한 캠페인 리뷰들을 확인해 보세요.</p>
                </div>
            </div>
            <div class="swiper mySwiper2">
                <div class="swiper-wrapper">
                    <a :href="application.url_review" target="_blank" class="swiper-slide" v-for="application in applications.data" :key="application.id">
                        <div class="img-wrap">
                            <img :src="application.campaign.img.url" alt="" v-if="application.campaign.img">
                            <div class="sns_wrap">
                                <img src="/images/Blog-icon.svg" alt="" v-if="application.campaign.type_sns === 'NAVER'">
                                <img src="/images/Instagram-icon.svg" alt="" v-if="application.campaign.type_sns === 'INSTAGRAM'">
                            </div>
                        </div>
                        <p class="title_p">[{{ application.campaign.title_company }}] {{ application.campaign.title_product }}</p>
                        <div class="user_name_wrap">
                            <img src="/images/basic-user.png" alt="">
                            <p>{{ application.user ? application.user.nickname : '탈퇴회원' }}</p>
                        </div>
                    </a>
                </div>
                <div class="swiper_btn_wrap">
                    <div class="swiper-button-prev"><i class="xi-caret-down"></i></div>
                    <div class="swiper-button-next"><i class="xi-caret-down"></i></div>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import Form from "@/utils/Form";

export default {
    // middleware : ["auth"],

    name: 'IndexPage',

    // get방식은 form 쓰지말고 this.$axios 사용주의

    data(){
        return {
            form: new Form(this.$axios, {

            }),
            banners: {
                data: [],
                links: {},
                meta: {}
            },
            favorCampaigns: {
                data: [],
                links: {},
                meta: {}
            },
            lastCampaigns: {
                data: [],
                links: {},
                meta: {}
            },
            recommendCampaigns: {
                data: [],
                links: {},
                meta: {}
            },
            applications: {
                data: [],
                links: {},
                meta: {}
            },
        }
    },

    methods: {
        getBanners(){
            this.$axios.get("/api/banners", {
                params: {

                }
            }).then(response => {
                this.banners = response.data;

                setTimeout(function(){
                    var swiper = new Swiper(".mySwiper1", {
                        slidesPerView: "auto",
                        centeredSlides: true,
                        loop: true,
                        pagination: {
                            el: ".swiper-pagination",
                            clickable: true,
                        },
                        autoplay: {
                            delay: 3000,
                        },
                    });

                }, 10);
            });
        },

        getFavorCampaigns(){
            this.$axios.get("/api/campaigns", {
                params: {
                    ongoingHire: 1,
                    order_by: "applications_count",
                    take:6,
                }
            }).then(response => {
                this.favorCampaigns = response.data;
            });
        },
        getLastCampaigns(){
            this.$axios.get("/api/campaigns", {
                params: {
                    ongoingHire: 1,
                    order_by: "hire_finished_at",
                    take:6,
                }
            }).then(response => {
                this.lastCampaigns = response.data;
            });
        },
        getRecommendCampaigns(){
            this.$axios.get("/api/recommendCampaigns", {
                params: {
                    ongoingHire: 1,
                    take:6,
                }
            }).then(response => {
                this.recommendCampaigns = response.data;
            });
        },
        getApplications(){
            this.$axios.get("/api/applications", {
                params: {
                    best: 1
                }
            }).then(response => {
                this.applications = response.data;

                setTimeout(function(){
                    var swiper = new Swiper(".mySwiper2", {
                        slidesPerView: "auto",
                        spaceBetween: 24,
                        navigation: {
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev",
                        },
                        breakpoints: {
                            768: {
                                spaceBetween: 16,
                            },
                        }
                    });
                }, 10);
            });
        },
    },

    mounted() {
        this.getBanners();
        this.getFavorCampaigns();
        this.getLastCampaigns();
        this.getRecommendCampaigns();
        this.getApplications();


    }

}
</script>

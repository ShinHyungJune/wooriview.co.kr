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
                        <h2><span>인기폭발 캠페인</span></h2>
                        <p class="see-more"><nuxt-link to="/campaigns?order_by=applications_count&type_campaign=REALTIME&showMap=1&ongoingHire=1">더보기<i class="xi-plus-min"></i></nuxt-link></p>
                    </div>

                    <empty v-if="favorCampaigns.data.length === 0" />
                    <div class="swiper1-1 swiper">
                        <div class="swiper-container">
                            <ul class="swiper-wrapper campaign-item-list">
                                <campaign add-class="swiper-slide"
                                          v-if="index < 8"
                                          :campaign="campaign" v-for="(campaign, index) in favorCampaigns.data" :key="campaign.id"
                                />
                            </ul>
                        </div>
                    </div>
                    <div class="swiper1-2 swiper" v-if="favorCampaigns.data.length > 8">
                        <div class="swiper-container">
                            <ul class="swiper-wrapper campaign-item-list">
                                <campaign add-class="swiper-slide"
                                          v-if="index >= 8"
                                          :campaign="campaign" v-for="(campaign, index) in favorCampaigns.data" :key="campaign.id"
                                />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="section3">
            <div class="container">
                <div class="campaign-item-wrap">
                    <div class="h2-wrap">
                        <h2>선정확률 <span>높은 캠페인</span></h2>
                        <p class="see-more"><nuxt-link to="/campaigns?order_by=applications_count&align=asc&ongoingHire=1">더보기<i class="xi-plus-min"></i></nuxt-link></p>
                    </div>

                    <empty v-if="recommendCampaigns.data.length === 0" />

                    <div class="swiper2-1 swiper">
                        <div class="swiper-container">
                            <ul class="swiper-wrapper campaign-item-list">
                                <campaign add-class="swiper-slide"
                                          v-if="index < 8"
                                          :campaign="campaign" v-for="(campaign, index) in recommendCampaigns.data" :key="campaign.id"
                                />
                            </ul>
                        </div>
                    </div>
                    <div class="swiper2-2 swiper" v-if="recommendCampaigns.data.length > 8">
                        <div class="swiper-container">
                            <ul class="swiper-wrapper campaign-item-list">
                                <campaign add-class="swiper-slide"
                                          v-if="index >= 8"
                                          :campaign="campaign" v-for="(campaign, index) in recommendCampaigns.data" :key="campaign.id"
                                />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="section4">
            <div class="container">
                <div class="campaign-item-wrap">
                    <div class="h2-wrap">
                        <h2>마감 <span>임박 캠페인</span></h2>
                        <p class="see-more"><nuxt-link to="/campaigns?order_by=hire_finished_at&align=asc&ongoingHire=1">더보기<i class="xi-plus-min"></i></nuxt-link></p>
                    </div>

                    <empty v-if="lastCampaigns.data.length === 0" />

                    <div class="swiper3-1 swiper">
                        <div class="swiper-container">
                            <ul class="swiper-wrapper campaign-item-list">
                                <campaign add-class="swiper-slide"
                                          v-if="index < 8"
                                          :campaign="campaign" v-for="(campaign, index) in lastCampaigns.data" :key="campaign.id"
                                />
                            </ul>
                        </div>
                    </div>
                    <div class="swiper3-2 swiper" v-if="lastCampaigns.data.length > 8">
                        <div class="swiper-container">
                            <ul class="swiper-wrapper campaign-item-list">
                                <campaign add-class="swiper-slide"
                                          v-if="index >= 8"
                                          :campaign="campaign" v-for="(campaign, index) in lastCampaigns.data" :key="campaign.id"
                                />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="section4">
            <div class="container">
                <div class="campaign-item-wrap">
                    <div class="h2-wrap">
                        <h2>실시간 <span>방문 캠페인</span></h2>
                        <p class="see-more"><nuxt-link to="/campaigns?type_campaign=REALTIME&align=asc&ongoingHire=1">더보기<i class="xi-plus-min"></i></nuxt-link></p>
                    </div>

                    <empty v-if="realtimeCampaigns.data.length === 0" />

                    <div class="swiper4-1 swiper">
                        <div class="swiper-container">
                            <ul class="swiper-wrapper campaign-item-list">
                                <campaign add-class="swiper-slide"
                                          v-if="index < 8"
                                          :campaign="campaign" v-for="(campaign, index) in realtimeCampaigns.data" :key="campaign.id"
                                />
                            </ul>
                        </div>
                    </div>
                    <div class="swiper4-2 swiper" v-if="realtimeCampaigns.data.length > 8">
                        <div class="swiper-container">
                            <ul class="swiper-wrapper campaign-item-list">
                                <campaign add-class="swiper-slide"
                                          v-if="index >= 8"
                                          :campaign="campaign" v-for="(campaign, index) in realtimeCampaigns.data" :key="campaign.id"
                                />
                            </ul>
                        </div>
                    </div>
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
            realtimeCampaigns: {
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

                }, 1);
            });
        },

        initCampaignSwiper(className){
            new Swiper(className + " .swiper-container", {
                slidesPerView: 6.5,
                loop: true,
                spaceBetween: 10,
                autoplay: {
                    delay: 3000,
                },
                breakpoints: {
                    768: {
                        slidesPerView: 2.5,
                    }
                }
            });
        },

        getFavorCampaigns(){
            let self = this;

            this.$axios.get("/api/campaigns", {
                params: {
                    ongoingHire: 1,
                    order_by: "applications_count",
                    take:16,
                }
            }).then(response => {
                this.favorCampaigns = response.data;

                setTimeout(function(){
                    self.initCampaignSwiper(".swiper1-1")
                    self.initCampaignSwiper(".swiper1-2")
                }, 1);
            });
        },
        getLastCampaigns(){
            let self = this;

            this.$axios.get("/api/campaigns", {
                params: {
                    ongoingHire: 1,
                    order_by: "hire_finished_at",
                    align: "asc",
                    take:16,
                }
            }).then(response => {
                this.lastCampaigns = response.data;

                setTimeout(function(){
                    self.initCampaignSwiper(".swiper3-1")
                    self.initCampaignSwiper(".swiper3-2")
                }, 100);
            });
        },
        getRecommendCampaigns(){
            let self = this;

            this.$axios.get("/api/campaigns", {
                params: {
                    ongoingHire: 1,
                    order_by: "applications_count",
                    align: "asc",
                    take:16,
                }
            }).then(response => {
                this.recommendCampaigns = response.data;

                setTimeout(function(){
                    self.initCampaignSwiper(".swiper2-1")
                    self.initCampaignSwiper(".swiper2-2")
                }, 100);
            });
        },
        getRealtimeCampaigns(){
            let self = this;

            this.$axios.get("/api/campaigns", {
                params: {
                    ongoingHire: 1,
                    type_campaigns: ["REALTIME"],
                    take:16,
                }
            }).then(response => {
                this.realtimeCampaigns = response.data;

                setTimeout(function(){
                    self.initCampaignSwiper(".swiper4-1")
                    self.initCampaignSwiper(".swiper4-2")
                }, 100);
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
                }, 1);
            });
        },
    },

    mounted() {
        this.getBanners();
        this.getFavorCampaigns();
        this.getLastCampaigns();
        this.getRecommendCampaigns();
        this.getRealtimeCampaigns();
        this.getApplications();


    }

}
</script>

<template>
    <input-images :multiple="true" />
</template>

<script>
import Form from "@/utils/Form";

export default {
    // middleware : ["auth"],

    name: 'IndexPage',

    // get방식은 form 쓰지말고 this.$axios 사용주의

    data(){
        return {
            webview: false,

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
                            disableOnInteraction: false,
                        },
                    });

                }, 1);
            });
        },

        initCampaignSwiper(className){
            new Swiper(className + " .swiper-container", {
                slidesPerView: 6,
                loop: true,
                spaceBetween: 10,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
                breakpoints: {
                    768: {
                        slidesPerView: 2,
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

        this.webview = /WEBVIEW/.test(navigator.userAgent);
    }

}
</script>

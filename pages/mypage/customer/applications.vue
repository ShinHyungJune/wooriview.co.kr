<template>
    <main id="main" class="MyPage influencer-delivery">
        <div class="route-wrap">
            <div class="container3">
                <div class="route-box">
                    <ul class="route">
                        <li>마이페이지</li>
                        <li><i class="xi-angle-right"></i></li>
                        <li>배송현황</li>
                    </ul>
                    <h2>배송&방문 현황</h2>
                    <div class="route-bg">
                        <img src="/images/route-bg-4.png" alt="">
                    </div>
                </div>
            </div>
        </div>
        <div class="table-section">
            <div class="container3">
                <div class="table-top-wrap">
                    <p class="table-title">배송&방문 현황</p>
                </div>
                <div class="table-tab-wrap influencer-table_1">
                    <div class="table-wrap">
                        <ul class="thead">
                            <li class="th">
                                썸네일
                            </li>
                            <li class="th">
                                캠페인 정보
                            </li>
                            <li class="th">
                                배송&방문 정보
                            </li>
                            <li class="th">
                                채팅
                            </li>
                        </ul>

                        <empty v-if="applications.data.length === 0" />

                        <!-- 배송 일 경우 -->
                        <ul class="tbody" v-for="application in applications.data" :key="application.id">
                            <li class="img-wrap" @click="$router.push(`/campaigns/${application.campaign.id}`)" style="cursor:pointer;">
                                <img :src="application.campaign ? application.campaign.img.url : ''" alt="">
                            </li>

                            <li class="campaign-title">
                                <p class="title">{{ application.campaign.title_company }}</p>
                                <p class="sub-title">{{ application.campaign.title_product }}</p>
                            </li>
                            <li class="campaign-info" v-if="application.campaign.type_campaign === 'DELIVERY'">
                                <p class="title">배송번호</p>
                                <p class="num-title">{{ application.delivery_number ? application.delivery_number : "-" }}</p>
                            </li>
                            <li class="campaign-info" v-if="application.campaign.type_campaign === 'VISIT'">
                                <p class="title">방문시간</p>
                                <p class="num-title">{{ application.format_visited_at ? application.format_visited_at : "-" }}</p>
                            </li>
                            <li class="chat">
                                <nuxt-link :to="`/chats?application_id=${application.id}`" v-if="application.selected == 1">1:1 채팅</nuxt-link>
                            </li>
                        </ul>
                    </div>
                </div>

                <pagination :meta="applications.meta" @paginate="(page) => {form.page = page; getApplications()}" />

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
                user_id: this.$auth.user.data.id,
                type_campaigns: ["VISIT", "DELIVERY"],
                selected: 1,
            }),

            applications: {
                data: [],
                links: {},
                meta: {},
            },
        }
    },
    methods: {
        getApplications(){
            this.$axios.get("/api/applications", {
                params: this.form
            }).then(response => {
                this.applications = response.data;
            });
        },
    },

    computed: {
        user(){
            return this.$auth.user.data;
        },
    },

    mounted() {
        this.getApplications();
    },

    watch: {

    },
}
</script>

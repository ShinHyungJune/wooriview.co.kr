<template>
    <main id="main" class="MyPage penalty Advertiser">
        <div class="route-wrap">
            <div class="container3">
                <div class="route-box">
                    <ul class="route">
                        <li>마이페이지</li>
                        <li><i class="xi-angle-right"></i></li>
                        <li>패널티</li>
                    </ul>
                    <h2>패널티</h2>
                    <div class="route-bg">
                        <img src="/images/route-bg-4.png" alt="">
                    </div>
                </div>
            </div>
            <div class="container3 re-po">
                <div class="white-box">
                    <div class="left-box">
                        <div class="penalty-icon-box">
                            <i class="xi-error state4"></i>
                        </div>
                        <div class="info-box-wrap">
                            <div class="info-box-top">
                                <p class="info-title">나의 상태</p>
                            </div>
                            <div class="info-box-btm">
                                <p :class="`penalty-state state${user.penalty_level}`">{{user.penalty.title}}</p>
                                <p class="state-date" v-if="user.penalty_level > 0">
                                    경고 상태 종료일 : <span>{{ user.penalty_at }}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="right-box" v-if="user.type === 'COMPANY'">
                        <ul>
                            <li>
                                <p class="info-title re-po">패널티 단계</p>
                                <div class="penalty-state-img">
                                    <img class="pc" src="/images/penalty-state-ad.svg" alt="우리뷰">
                                    <img class="mb" src="/images/penalty-state-ad-m.svg" alt="우리뷰">
                                </div>
                            </li>
                            <li>
                                <p class="info-title re-po">패널티 초기화</p>
                                <p class="info-sub">
                                    <span class="txt-b">패널티 리셋기간은 패널티 기간 만료후 2주</span>
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div class="right-box" v-else>
                        <ul>
                            <li>
                                <p class="info-title">패널티 단계</p>
                                <div class="penalty-state-img">
                                    <img src="/images/penalty-state.png" alt="우리뷰">
                                </div>
                            </li>
                            <li>
                                <p class="info-title">패널티 초기화</p>
                                <p class="info-sub">
                                    패널티 리셋기간은 패널티 기간 만료 후 30일
                                    <!--
                                    <span class="txt-b">1회(주의)</span>: 패널티 발급 후 30일
                                    <span class="br-pc"> / </span>
                                    <br class="br-mb">
                                    <span class="txt-b">2회(경고), 3회(위험)</span>: 이용제한일 만료 후 30일
                                    -->
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="table-section">
                <div class="container3">
                    <div class="table-tab-wrap advertiser-table_2">
                        <ul class="table-tab-list">
                            <li :class="`tab-link ${form.type === 'GIVE' ? 'Active' : ''}`" data-tab="tab-1" @click="()=>{form.type = 'GIVE'; getPenalties()}">내가 준 패널티 <span>{{counts.count_give}}</span></li>
                            <li :class="`tab-link ${form.type === 'TAKE' ? 'Active' : ''}`" data-tab="tab-2" @click="()=>{form.type = 'TAKE'; getPenalties()}">내가 받은 패널티 <span>{{counts.count_take}}</span></li>
                        </ul>

                        <!-- 내가 준 패널티 -->
                        <div class="table-wrap tab-content  Active" id="tab-1">
                            <ul class="thead">
                                <li class="th">
                                    일자
                                </li>
                                <li class="th">
                                    {{user.type === 'COMPANY' ? '인플루언서' : '캠페인'}}
                                </li>
                                <li class="th">
                                    경고내용
                                </li>
                                <li class="th" v-if="form.type === 'TAKE'">
                                    누적 경고
                                </li>
                            </ul>
                            <!-- 리스트 그룹 -->
                            <empty v-if="penalties.data.length === 0" />
                            <ul class="tbody" v-for="penalty in penalties.data" :key="penalty.id">
                                <li class="date">
                                    {{ penalty.format_created_at }}
                                </li>
                                <li class="influencer-name" v-if="user.type === 'COMPANY'">
                                    {{form.type === 'GIVE'
                                        ? user.nickname
                                        : penalty.user.nickname
                                    }}
                                </li>
                                <li class="influencer-name" v-else>
                                    {{`[${penalty.campaign.title_company}] ${penalty.campaign.title_product}]`}}
                                </li>
                                <li class="content">
                                    <p class="body" v-for="(reason, index) in penalty.reasons" :key="index">{{reason}}</p>
                                    <p class="body" v-if="penalty.description">{{penalty.description}}</p>
                                </li>
                                <li class="state-sum" v-if="form.type === 'TAKE'">
                                    경고 <span>{{user.count_penalty}}</span>회
                                </li>
                            </ul>
                        </div>
                    </div>

                    <pagination :meta="penalties.meta" @paginate="(page) => {form.page = page; getPenalties()}" />

                </div>
            </div>
        </div>




    </main>
</template>
<script>
import Campaign from "../../components/mypage/Campaign";
import Form from "../../utils/Form";
export default {
    middleware: ["auth"],

    components: {Campaign},
    data(){
        return {
            user: this.$auth.user.data,

            form: new Form(this.$axios, {
                type: "GIVE"
            }),

            penalties: {
                data: [],
                links: {},
                meta: {},
            },

            counts: {
                count_take: 0,
                count_give: 0,
            }
        }
    },
    methods: {
        getPenalties(){
            this.$axios.get("/api/penalties", {
                params: this.form
            }).then(response => {
                this.penalties = response.data;
            });
        },

        getCounts(){
            this.$axios.get("/api/penalties/counts", {

            }).then(response => {
                this.counts = response.data.data;
            });
        }
    },

    computed: {

    },

    mounted() {
        this.getPenalties();

        this.getCounts();
    },

    watch: {

    },
}
</script>

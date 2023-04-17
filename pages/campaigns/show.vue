<template>
    <main id="main" class="campaign_Details">
        <div class="container2" v-if="campaign">
            <section class="section1">
                <div class="img-wrap">
                    <div class="big-img-wrap">
                        <img :src="campaign.img.url" alt="" v-if="campaign.img">
                    </div>
                    <div class="sm-img-wrap">
                        <ul class="sm-img-list">
                            <li v-for="(img, index) in campaign.imgs" :key="index">
                                <img :src="img.url" alt="">
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            <section class="section2">
                <div>
                    <h2 class="product-title">[{{ campaign.title_company }}] {{ campaign.title_product }}</h2>
                    <p class="product-kind">{{ campaign.title_product }}</p>

                    <!-- 방문형 캠페인 -->
                    <!-- <div class="product-type">
                        <img src="/images/Visit-icon.png" alt="">
                        <p>방문형 캠페인</p>
                    </div> -->
                    <!-- 배송형 캠페인 -->
                    <!-- <div class="product-type">
                        <img src="/images/Shipping-icon.png" alt="">
                        <p>방문형 캠페인</p>
                    </div> -->
                    <!-- 실시간 방문 캠페인 -->
                    <!-- <div class="product-type">
                        <img src="/images/Live-icon.png" alt="">
                        <p>실시간 방문형 캠페인</p>
                    </div> -->
                    <!-- 기자단 캠페인 -->
                    <!-- <div class="product-type">
                        <p>기자단 캠페인</p>
                    </div> -->

                    <div class="Period-wrap">
                        <div class="Period">
                            <p class="Period-labal">
                                컨텐츠 등록 기간
                            </p>
                            <p class="Period-date">
                                {{ campaign.format_hire_started_at }} ~ {{ campaign.format_hire_finished_at }}
                            </p>
                        </div>
                        <div class="Period">
                            <p class="Period-labal">
                                인플루언서 선정기간
                            </p>
                            <p class="Period-date">
                                {{ campaign.format_select_started_at }} ~ {{ campaign.format_select_finished_at }}
                            </p>
                        </div>
                        <div class="Period">
                            <p class="Period-labal">
                                인플루언서 작성기간
                            </p>
                            <p class="Period-date">
                                {{ campaign.format_review_started_at }} ~ {{ campaign.format_review_finished_at }}
                            </p>
                        </div>
                    </div>
                    <p class="advertiser-talk" v-text="campaign.introduce"></p>
                </div>
                <div>
                    <p class="recruiting-influencer-labal">모집 인플루언서</p>

                    <div class="sns-wrap">
                        <img src="/images/Instagram-icon.svg" alt="" v-if="campaign.type_sns === 'INSTAGRAM'">
                        <img src="/images/Blog-icon.svg" alt="" v-if="campaign.type_sns === 'NAVER'">
                        <p>{{ form.type_sns === 'INSTAGRAM' ? "팔로워" : "방문자수" }} {{ campaign.min_follower.toLocaleString() }} 이상</p>
                    </div>
                    <!-- 블러그 -->
                    <!-- <div class="sns-wrap">
                        <img src="/images/Blog-icon.svg" alt="">
                        <p>방문자 일일 120명 이상</p>
                    </div> -->

                    <div class="Participation-btn-wrap">
                        <div class="like-ck">
                            <input type="checkbox" name="" id="" v-if="campaign.is_like" checked>
                            <input type="checkbox" name="" id="" v-else>
                            <label for="" @click="like"><i class="xi-heart"></i></label>
                        </div>
                        <nuxt-link :to="`/applications/create?campaign_id=${campaign.id}`" class="Participation-btn">캠페인 참여하기</nuxt-link>
                    </div>
                </div>
            </section>

            <section class="section3">
                <div class="h3-wrap">
                    <h3>캠페인 정보</h3>
                </div>
                <div class="Information-wrap">
                    <div class="Information-box">
                        <p class="Information-labal">제공 내역</p>
                        <p class="Information-content" v-text="campaign.description_provide"></p>
                    </div>
                    <div class="Information-box">
                        <p class="Information-labal">검색 키워드</p>
                        <p class="Information-content" v-text="campaign.search_keyword"></p>

                    </div>
                    <div class="Information-box">
                        <p class="Information-labal">캠페인미션</p>
                        <p class="Information-content" v-text="campaign.mission"></p>

                    </div>
<!--                    <div class="Information-box">
                        <p class="Information-labal">추가정보</p>
                        <p class="Information-content">
                            -
                        </p>
                    </div>-->
                </div>

            </section>

            <section class="section4">
                <div class="h3-wrap">
                    <h3>신청인</h3>
                    <div class="State-wrap">
                        <p class="Application">신청
                            <span>{{ campaign.applications_count }}</span>
                        </p>
                        <p class="Recruitment">모집
                            <span>{{ campaign.max_participant }}</span>
                        </p>
                    </div>
                </div>

                <ul class="subscriber-list">
                    <!--  -->
                    <li v-for="application in applications.data" :key="application.id">
                        <div class="subscriber-le">
                            <div class="subscriber-name-wrap">
                                <div class="subscriber-img">
                                    <!-- <img src="/images/Blog-icon.svg" alt=""> -->
                                </div>
                                <div class="subscriber-name">
                                    <p class="name">{{application.user.nickname}}</p>
                                    <p class="Address">{{ application.user.address }}</p>
                                </div>
                                <div class="Recommended_mark">
                                    <img src="/images/Recommended_mark_Gold.svg" alt="" v-if="application.user.grade === 'GOLD'">
                                    <img src="/images/Recommended_mark_Silver.svg" alt="" v-if="application.user.grade === 'SILVER'">
                                    <img src="/images/Recommended_mark_Bronze.svg" alt="" v-if="application.user.grade === 'BRONZE'">
                                </div>
                            </div>
                            <p class="Follow">팔로워 <span>{{ campaign.type_sns === 'INSTAGRAM' ? application.user.count_follower_instagram.toLocaleString() : application.user.count_follower_naver.toLocaleString() }} 명</span></p>
                        </div>
                        <div class="subscriber-ri">
                            <div class="subscriber-ri-top">
                                <ul class="subscriber-tab">
                                    <li class="Active">소개글</li>
                                    <li>추가 정보</li>
                                </ul>
                            </div>
                            <div v-if="$auth.user && $auth.user.data.id == campaign.user.id">
                                <a href="#" class="Application-btn toggle" @click.prevent="" v-if="application.selected">선정됨</a>
                                <a href="#" class="Application-btn" @click.prevent="select(application)" v-else>선정하기</a>
                            </div>
                            <div class="Introduction-wrap content-box open">
                                <p class="Comments">{{ application.description }}</p>
                                <ul class="category-list">
                                    <li v-for="(category, index) in application.user.categories" :key="index">
                                        <img :src="category.active.url" alt="">
                                        <p class="labal">{{ category.title }}</p>
                                    </li>
                                </ul>
                                <div class="Activity_History-wrap">
                                    <h4>지난 활동 내역</h4>
                                    <p style="white-space: pre-line" v-text="application.user.history"></p>
                                </div>
                            </div>
                            <div class="Additional-wrap content-box">
                                <ul class="Whether-list">
                                    <li v-if="application.user.open_face">얼굴노출</li>
                                    <li v-if="application.user.camera">카메라</li>
                                </ul>
                                <ul class="Size-list">
                                    <li>
                                        <p class="Size-labal">상의 사이즈:</p>
                                        <p class="Size">{{application.user.size_top}}</p>
                                    </li>
                                    <li>
                                        <p class="Size-labal">하의 사이즈:</p>
                                        <p class="Size">{{application.user.size_bottom}}</p>
                                    </li>
                                    <li>
                                        <p class="Size-labal">신발 사이즈:</p>
                                        <p class="Size">{{application.user.size_shoes}}</p>
                                    </li>
                                    <li>
                                        <p class="Size-labal">키:</p>
                                        <p class="Size">{{application.user.tall}}</p>
                                    </li>
                                    <li>
                                        <p class="Size-labal">피부타입:</p>
                                        <p class="Size">{{application.user.skin_type}}</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                </ul>
            </section>
        </div>
    </main>

</template>

<script>
import Form from "../../utils/Form";
export default {
    data(){
        return {
            campaign: "",

            applications: {
                data: [],
                links : {},
                meta: {}
            },

            form : new Form(this.$axios, {
                campaign_id: this.$route.query.id,
                order_by: "created_at",
                page:1,
            }),
        }
    },
    methods: {
        getCampaign(){
            this.$axios.get("/api/campaigns/" + this.$route.query.id, {

            }).then(response => {
                this.campaign = response.data.data;

                setTimeout(function(){
                    $(".big-img-wrap img").attr("src" , $(".sm-img-list li:first-child img").attr("src"))

                    $(".sm-img-list li img").click(function () {
                        $(".big-img-wrap img").attr("src" , $(this).attr("src"))
                    })
                }, 10);
            })
        },
        getApplications(loadMore = false){
            if(loadMore)
                this.form.page += 1;

            this.$axios.get("/api/applications", {
                params: this.form
            }).then(response => {
                if(loadMore)
                    this.applications = {
                        ...response.data,
                        data: [...this.posts.data, ...response.data.data]
                    };
                else {
                    this.applications = response.data;
                }

                setTimeout(function(){
                    $(".subscriber-tab li").click(function () {
                        $(this).addClass("Active");
                        $(this).siblings().removeClass("Active");
                        let show = $(this).parent("ul").parent(".subscriber-ri-top");

                        if ($(this).parent("ul").find("li:first-child").hasClass("Active")) {
                            show.siblings(".Introduction-wrap").addClass("open").siblings().removeClass("open");
                            console.log("asd")
                        }else{
                            show.siblings(".Additional-wrap").addClass("open").siblings().removeClass("open");
                        }
                    });
                }, 10);
            })
        },

        like(e){
            e.stopPropagation();
            e.preventDefault();

            if(!this.$auth.user)
                return alert("좋아요는 로그인 후 이용 가능합니다.");

            this.campaign.is_like = !this.campaign.is_like;

            this.form.post("/api/likes");
        },

        select(application){
            this.$axios.patch("/api/applications/" + application.id + "/select")
                .then(response => {
                    application.selected = 1;

                    this.applications.data = this.applications.data.map(applicationData => {
                        if(applicationData.id == application.id)
                            return application;

                        return applicationData;
                    })
                });
        }
    },

    computed: {

    },

    mounted() {
        this.getCampaign();
        this.getApplications();
    }
}
</script>

<template>
    <main class="manage manage_detail mainpage_detail">
        <div class="manage-wrap">
            <div class="title-wrap col-group">
                <a href="#" class="back-btn" @click.prevent="() => {$router.back()}">
                    <i class="xi-arrow-left"></i>
                </a>
                <p class="title scd5">
                    메인페이지
                </p>
            </div>
            <div class="form-wrap" v-if="!loading && item">
                <form action="" @submit.prevent="store">
                    <ul class="form-box">
                        <li class="col-group">
                            <div class="default">
                                <p>광고주</p>
                            </div>
                            <div class="user">
                                {{ item.user.company_name }}
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                <p>광고주 연락처</p>
                            </div>
                            <div class="user">
                                {{ item.user.company_contact }}
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                <p>캠페인 이미지</p>
                            </div>
                            <div class="user">
                                <div class="imgs">
                                    <img :src="img.url" alt="" v-for="(img,index) in item.imgs" :key="index">
                                </div>
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                <p>캠페인 유형</p>
                            </div>
                            <div class="user">
                                {{ item.format_type_campaign }}
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                <p>SNS 유형</p>
                            </div>
                            <div class="user">
                                {{ item.format_type_sns }}
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                <p>브랜드명</p>
                            </div>
                            <div class="user">
                                {{ item.title_company }}
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                <p>제품명</p>
                            </div>
                            <div class="user">
                                {{ item.title_product }}
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                <p>{{item.type_campaign === 'REPORTER' ? '대표 URL' : '제공내역'}}</p>
                            </div>
                            <div class="user">
                                {{ item.description_provide }}
                            </div>
                        </li>
                        <li class="col-group" v-if="item.type_campaign === 'REPORTER'">
                            <div class="default">
                                <p>원고료</p>
                            </div>
                            <div class="user">
                                {{ item.price_write }}
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                <p>모집수</p>
                            </div>
                            <div class="user">
                                {{ item.max_participant }}
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                <p>모집시작일</p>
                            </div>
                            <div class="user">
                                <input type="datetime-local" name="" v-model="form.hire_started_at" />

                                <error :form="form" name="hire_started_at" />
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                <p>모집마감일</p>
                            </div>
                            <div class="user">
                                <input type="datetime-local" name="" v-model="form.hire_finished_at" />

                                <error :form="form" name="hire_finished_at" />
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                <p>선정시작일</p>
                            </div>
                            <div class="user">
                                <input type="datetime-local" name="" v-model="form.select_started_at" />

                                <error :form="form" name="select_started_at" />
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                <p>선정마감일</p>
                            </div>
                            <div class="user">
                                <input type="datetime-local" name="" v-model="form.select_finished_at" />

                                <error :form="form" name="select_finished_at" />
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                <p>작성시작일</p>
                            </div>
                            <div class="user">
                                <input type="datetime-local" name="" v-model="form.review_started_at" />

                                <error :form="form" name="review_started_at" />
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                <p>작성마감일</p>
                            </div>
                            <div class="user">
                                <input type="datetime-local" name="" v-model="form.review_finished_at" />

                                <error :form="form" name="review_finished_at" />
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                <p>주소</p>
                            </div>
                            <div class="user">
                                {{ item.address }} {{item.address_detail }}
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                <p>소개</p>
                            </div>
                            <div class="user">
                                {{ item.introduce }}
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                <p>검색키워드</p>
                            </div>
                            <div class="user">
                                {{ item.search_keyword }}
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                <p>미션</p>
                            </div>
                            <div class="user">
                                <p v-for="(mission, index) in item.missions" :key="index">
                                    - {{ mission }}
                                </p>
                                <p>
                                    - {{ item.mission }}
                                </p>
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                <p>지원자수</p>
                            </div>
                            <div class="user">
                                {{ item.applications_count }}
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                <p>선정수</p>
                            </div>
                            <div class="user">
                                {{ item.count_select }}
                            </div>
                        </li>
                    </ul>

                    <button type="submit" class="submit-btn">저장하기</button>

                </form>
            </div>
        </div>
    </main>

</template>
<script>

import Form from "@/utils/Form";
export default {
    layout: "admin",

    components: {},
    props: {

    },

    data(){
        return {
            loading: true,
            keep: false,
            item: null,
            form: new Form(this.$axios, {
                selected_ids: "",
                hire_started_at: "",
                hire_finished_at: "",
                select_started_at: "",
                select_finished_at: "",
                review_started_at: "",
                review_finished_at: "",
            })
        }
    },

    methods: {
        store(){
            return this.form.post("/api/admin/campaigns/update/" + this.item.id)
                .then(response => {
                    this.$router.back();
                });
        },

        change(data){

        }
    },

    mounted() {
        if(this.$route.query.id){
            return this.$axios.get("/api/admin/campaigns/" + this.$route.query.id)
                .then(response => {
                    this.item = response.data.data;

                    console.log(this.item);
                    this.item.hire_started_at = this.item.origin_hire_started_at;
                    this.item.hire_finished_at = this.item.origin_hire_finished_at;
                    this.item.select_started_at = this.item.origin_select_started_at;
                    this.item.select_finished_at = this.item.origin_select_finished_at;
                    this.item.review_started_at = this.item.origin_review_started_at;
                    this.item.review_finished_at = this.item.origin_review_finished_at;

                    this.form.set({...this.form, ...this.item});

                    this.loading = false;
                })
        }


        this.loading = false;
    }

}
</script>

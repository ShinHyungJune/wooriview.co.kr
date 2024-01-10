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
                                <input-images :default="item.imgs"
                                              @change="data => form.imgs = data"
                                              @removed="data => form.remove_imgs_ids = data"
                                              :multiple="true"
                                />
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                <p>캠페인 상세이미지</p>
                            </div>
                            <div class="user">
                                <input-images id="detail" :default="item.img_detail" @change="data => form.img_detail = data"
                                              @removed="data => form.remove_img_detail_ids = data"
                                              :multiple="true"
                                />
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
                                <input type="text" v-model="form.title_company">
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                <p>제품명</p>
                            </div>
                            <div class="user">
                                <input type="text" v-model="form.title_product">
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                <p>{{item.type_campaign === 'REPORTER' ? '대표 URL' : '제공내역'}}</p>
                            </div>
                            <div class="user">
                                <textarea name="" id="" v-model="form.description_provide"></textarea>
                            </div>
                        </li>
                        <li class="col-group" v-if="item.type_campaign === 'REPORTER'">
                            <div class="default">
                                <p>원고료</p>
                            </div>
                            <div class="user">
                                <input type="number" v-model="form.price_write">
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                <p>모집수</p>
                            </div>
                            <div class="user">
                                <input type="number" v-model="form.max_participant">
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
                                <input type="text" v-model="form.address">
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                <p>상세주소</p>
                            </div>
                            <div class="user">
                                <input type="text" v-model="form.address_detail">
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                <p>소개</p>
                            </div>
                            <div class="user">
                                <textarea name="" id="" v-model="form.introduce"></textarea>
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                <p>검색키워드</p>
                            </div>
                            <div class="user">
                                <textarea name="" id="" v-model="form.search_keyword"></textarea>
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                <p>미션</p>
                            </div>
                            <div class="user">
                                <textarea name="" id="" v-model="form.mission" placeholder="기타 요청사항" style="margin-bottom:10px;"></textarea>

                                <p v-for="(mission, index) in item.missions" :key="index">
                                    - {{ mission }}
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
                        <li class="col-group">
                            <div class="default">
                                <p>승인상태</p>
                            </div>
                            <div class="user">
                                <select name="" id="" v-model="form.accept">
                                    <option value="" disabled selected>선택</option>
                                    <option :value="1">승인</option>
                                    <option :value="0">반려</option>
                                </select>

                                <error :form="form" name="category" />
                            </div>
                        </li>

                        <li class="col-group" v-if="item && item.accept != 1">
                            <div class="default">
                                <p>반려사유</p>
                            </div>
                            <div class="user">
                                {{ item.reason_deny }}
                            </div>
                        </li>


                    </ul>

                    <div class="btns">
                        <!-- <button type="button" class="submit-btn" @click="deny" style="background-color:red; color:#fff;">반려</button> -->
                        <button type="submit" class="submit-btn">저장하기</button>
                    </div>
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
                imgs: [],
                accept: "",
                remove_imgs_ids: [],
                img_detail: [],
                remove_img_detail_ids: [],
                selected_ids: "",
                hire_started_at: "",
                hire_finished_at: "",
                select_started_at: "",
                select_finished_at: "",
                review_started_at: "",
                review_finished_at: "",
                title_company: "",
                title_product: "",
                description_provide: "",
                price_write: "",
                max_participant: "",
                address: "",
                address_detail: "",
                introduce: "",
                search_keyword: "",
                mission: "",
                reason_deny: ""
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

        deny(){
            this.form.reason_deny = prompt("반려사유를 입력해주세요.");

            this.form.patch("/api/admin/campaigns/deny/" + this.item.id)
                .then(response => {
                    this.item.accept = 0;

                    this.item.reason_deny = this.form.reason_deny;
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

                    this.item.hire_started_at = this.item.origin_hire_started_at;
                    this.item.hire_finished_at = this.item.origin_hire_finished_at;
                    this.item.select_started_at = this.item.origin_select_started_at;
                    this.item.select_finished_at = this.item.origin_select_finished_at;
                    this.item.review_started_at = this.item.origin_review_started_at;
                    this.item.review_finished_at = this.item.origin_review_finished_at;

                    this.form.set({...this.form, ...this.item});

                    console.log(this.item.img_detail);

                    this.loading = false;
                })
        }


        this.loading = false;
    }

}
</script>

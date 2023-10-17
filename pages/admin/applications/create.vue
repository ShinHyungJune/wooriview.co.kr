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
                <form action="" @submit.prevent="accept">
                    <ul class="form-box">
                        <li class="col-group">
                            <div class="default">
                                <p>인플루언서</p>
                            </div>
                            <div class="user">
                                {{ item.user.nickname }}
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                <p>인플루언서 연락처</p>
                            </div>
                            <div class="user">
                                {{ item.user.contact }}
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                <p>캠페인 이미지</p>
                            </div>
                            <div class="user">
                                <div class="imgs">
                                    <img :src="item.campaign.img ? item.campaign.img.url : ''" alt="">
                                </div>
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                <p>브랜드명</p>
                            </div>
                            <div class="user">
                                {{ item.campaign.title_company }}
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                <p>상품명</p>
                            </div>
                            <div class="user">
                                {{ item.campaign.title_product }}
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                <p>리뷰 URL</p>
                            </div>
                            <div class="user">
                                {{ item.url_review }}
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                <p>지원내용</p>
                            </div>
                            <div class="user">
                                {{ item.description }}
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                <p>베스트여부</p>
                            </div>
                            <div class="user">
                                {{ item.best ? "O" : "X" }}
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                <p>선정여부</p>
                            </div>
                            <div class="user">
                                {{ item.select == 1 ? "O" : "X" }}
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                <p>운송장번호</p>
                            </div>
                            <div class="user">
                                {{ item.delivery_number }}
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                <p>방문일자</p>
                            </div>
                            <div class="user">
                                {{ item.visited_at }}
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                <p>등록일자</p>
                            </div>
                            <div class="user">
                                {{ item.created_at }}
                            </div>
                        </li>
                    </ul>

                    <div class="btns">
                        <button type="button" class="submit-btn" @click="select" v-if="!item.selected">선정하기</button>
                        <button type="button" class="submit-btn" @click="unselect" v-else>선정취소</button>
                        <button type="button" class="submit-btn" @click="best" v-if="!item.best">베스트</button>
                        <button type="button" class="submit-btn" @click="unbest" v-else>베스트 취소</button>
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
                selected_ids: "",
            })
        }
    },

    methods: {
        select(){
            this.form.selected_ids = [this.item.id];

            return this.form.patch("/api/admin/applications/select")
                .then(response => {
                    this.$router.back();
                });
        },

        unselect(){
            this.form.selected_ids = [this.item.id];

            return this.form.patch("/api/admin/applications/unselect")
                .then(response => {
                    this.$router.back();
                });
        },

        best(){
            this.form.selected_ids = [this.item.id];

            return this.form.patch("/api/admin/applications/best")
                .then(response => {
                    this.$router.back();
                });
        },

        unbest(){
            this.form.selected_ids = [this.item.id];

            return this.form.patch("/api/admin/applications/unbest")
                .then(response => {
                    this.$router.back();
                });
        },

        change(data){

        }
    },

    mounted() {
        if(this.$route.query.id){
            return this.$axios.get("/api/admin/applications/" + this.$route.query.id)
                .then(response => {
                    this.item = response.data.data;

                    this.form.set({...this.item, ...this.form});

                    this.loading = false;
                })
        }


        this.loading = false;
    }

}
</script>

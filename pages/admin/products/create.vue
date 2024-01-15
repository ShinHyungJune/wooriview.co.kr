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
            <div class="form-wrap" v-if="!loading">
                <form action="" @submit.prevent="store">
                    <ul class="form-box">
                        <li class="col-group">
                            <div class="default">
                                <p>등급</p>
                            </div>
                            <div class="user">
                                <select name="" id="" v-model="form.grade">
                                    <option value="" disabled selected>선택</option>
                                    <option value="BASIC">BASIC</option>
                                    <option value="PREMIUM">PREMIUM</option>
                                </select>
                                <error :form="form" name="grade" />
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                <p>제목</p>
                            </div>
                            <div class="user">
                                <input type="text" v-model="form.title">
                                <error :form="form" name="title" />
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                <p>연장일수</p>
                            </div>
                            <div class="user">
                                <input type="text" v-model="form.duration">

                                <error :form="form" name="duration" />
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                <p>추가연장일수</p>
                            </div>
                            <div class="user">
                                <input type="text" v-model="form.duration_extra">

                                <error :form="form" name="duration_extra" />
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                <p>금액</p>
                            </div>
                            <div class="user">
                                <input type="text" v-model="form.price">

                                <error :form="form" name="price" />
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                <p>첫구매 할인 제목</p>
                            </div>
                            <div class="user">
                                <input type="text" v-model="form.first_discount_title">

                                <error :form="form" name="first_discount_title" />
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                <p>첫구매 할인 금액<br/>(실적용)</p>
                            </div>
                            <div class="user">
                                <input type="text" v-model="form.first_discount_price">

                                <error :form="form" name="first_discount_price" />
                            </div>
                        </li>
<!--                        <li class="col-group">
                            <div class="default">
                                <p>첫구매 할인 비율<br/>(단순표시용)</p>
                            </div>
                            <div class="user">
                                <input type="text" v-model="form.first_discount_percent">

                                <error :form="form" name="first_discount_percent" />
                            </div>
                        </li>-->
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
                title: "",
                duration: "",
                duration_extra: "",
                first_discount_title: "",
                first_discount_price: "",
                price: "",
                first_discount_percent: "",
                files: [],
                grade: "",
            })
        }
    },

    methods: {
        store(){
            if(this.item)
                return this.form.post("/api/admin/products/update/" + this.item.id)
                    .then(response => {
                        this.$router.back();
                    });

            this.form.post("/api/admin/products")
                .then(response => {
                    this.$router.back();
                });
        },

        change(data){

        }
    },

    mounted() {
        if(this.$route.query.id){
            return this.$axios.get("/api/admin/products/" + this.$route.query.id)
                .then(response => {
                    this.item = response.data.data;

                    this.form.set({ ...this.form, ...this.item});

                    this.loading = false;

                    console.log(this.form);
                })
        }

        this.loading = false;
    }

}
</script>

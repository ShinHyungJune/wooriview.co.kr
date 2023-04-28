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
                                <p>카테고리</p>
                            </div>
                            <div class="user">
                                {{ item.category }}
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                <p>제목</p>
                            </div>
                            <div class="user">
                                {{ item.title }}
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                <p>문의 내용</p>
                            </div>
                            <div class="user">
                                {{ item.description }}
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                <p>문의답변</p>
                            </div>
                            <div class="user">
                                <textarea name="" id="" cols="30" rows="10" v-model="form.answer"></textarea>

                                <error :form="form" name="answer" />
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
                answer: "",
            })
        }
    },

    methods: {
        store(){
            if(this.item)
                return this.form.post("/api/admin/qnas/update/" + this.item.id)
                    .then(response => {
                        this.$router.back();
                    });

            this.form.post("/api/admin/qnas")
                .then(response => {
                    this.$router.back();
                });
        },

        change(data){

        }
    },

    mounted() {



        if(this.$route.query.id){
            return this.$axios.get("/api/admin/qnas/" + this.$route.query.id)
                .then(response => {
                    this.item = response.data.data;

                    this.form.set(this.item);

                    if(!this.form.admin_name){
                        this.form.admin_name = this.$auth.user.data.name;
                        this.form.admin_id = this.$auth.user.data.id;
                    }

                    this.loading = false;
                })
        }

        this.loading = false;
    }

}
</script>

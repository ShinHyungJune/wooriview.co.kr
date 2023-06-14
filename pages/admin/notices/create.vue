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
                                <p>제목</p>
                            </div>
                            <div class="user">
                                <input type="text" v-model="form.title" />

                                <error :form="form" name="title" />
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                <p>내용</p>
                            </div>
                            <div class="user">
                                <input-editor :default="form.description" @change="(data) => {form.description = data}"/>

                                <error :form="form" name="description" />
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
                title: "",
                description: "",
            })
        }
    },

    methods: {
        store(){
            if(this.item)
                return this.form.post("/api/admin/notices/update/" + this.item.id)
                    .then(response => {
                        this.$router.back();
                    });

            this.form.post("/api/admin/notices")
                .then(response => {
                    this.$router.back();
                });
        },

        change(data){

        }
    },

    mounted() {



        if(this.$route.query.id){
            return this.$axios.get("/api/admin/notices/" + this.$route.query.id)
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

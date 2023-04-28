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
                        <li class="col-group file img">
                            <div class="default row-group">
                                <p>PC 이미지</p>
                            </div>
                            <div class="user">
                                <input-images id="pc" :multiple="false" @change="(data) => form.files = data" :default="[item ? item.pc : '']" />
                                <error :form="form" name="files" />
                            </div>
                        </li>
                        <!--
                        <li class="col-group file img">
                            <div class="default row-group">
                                <p>모바일 이미지</p>


                                <input-images id="mobile" :multiple="false" @change="(data) => form.files_mobile = data" />
                            </div>
                            <div class="user">
                                <div class="img-box mb" id="thumbnail_mb"></div>
                            </div>
                        </li>
                        -->
                        <li class="col-group">
                            <div class="default">
                                <p>분류</p>
                            </div>
                            <div class="user">
                                <select name="" id="" v-model="form.category">
                                    <option value="" disabled selected>선택</option>
                                    <option value="왓픽">왓픽</option>
                                </select>

                                <error :form="form" name="category" />
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                <p>제목</p>
                            </div>
                            <div class="user">
                                <textarea name="" id="" cols="30" rows="10" v-model="form.title"></textarea>

                                <error :form="form" name="title" />
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                <p>부제목</p>
                            </div>
                            <div class="user">
                                <textarea name="" id="" cols="30" rows="10" v-model="form.subtitle"></textarea>

                                <error :form="form" name="subtitle" />
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
                category: "",
                title: "",
                subtitle: "",
                files: [],
            })
        }
    },

    methods: {
        store(){
            if(this.item)
                return this.form.post("/api/admin/banners/update/" + this.item.id)
                    .then(response => {
                        this.$router.back();
                    });

            this.form.post("/api/admin/banners")
                .then(response => {
                    this.$router.back();
                });
        },

        change(data){

        }
    },

    mounted() {
        if(this.$route.query.id){
            return this.$axios.get("/api/admin/banners/" + this.$route.query.id)
                .then(response => {
                    this.item = response.data.data;

                    this.form.set(this.item);

                    this.loading = false;
                })
        }

        this.loading = false;
    }

}
</script>

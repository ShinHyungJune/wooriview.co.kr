<template>
    <main id="main" class="MyPage inquiry-request">
        <div class="route-wrap">
            <div class="container3">
                <div class="route-box">
                    <ul class="route">
                        <li>마이페이지</li>
                        <li><i class="xi-angle-right"></i></li>
                        <li>고객센터</li>
                    </ul>
                    <h2>고객센터</h2>
                    <div class="route-bg">
                        <img src="/images/route-bg-3.png" alt="">
                    </div>
                </div>
            </div>
        </div>
        <div class="section1">
            <div class="container">
                <div class="top-wrap">
                    <div class="category-wrap">
                        <p class="title">문의 분류</p>

                        <select name="" id="" v-model="form.category" class="select">
                            <option value="" disabled>문의 분류 선택</option>
                            <option value="캠페인">캠페인</option>
                            <option value="서비스 이용">서비스 이용</option>
                            <option value="광고 및 입점 문의">광고 및 입점 문의</option>
                        </select>

                        <error :form="form" name="category" />
                    </div>
                    <div class="user-title-wrap">
                        <p class="title">문의 제목</p>
                        <div class="input-wrap">
                            <input type="text" v-model="form.title">
                            <error :form="form" name="title" />
                        </div>
                    </div>
                </div>
                <div class="user-content-wrap">
                    <p class="title">문의 내용</p>
                    <div class="write-wrap">
                        <textarea name="" id="" v-model="form.description"></textarea>
                        <error :form="form" name="description" />
                    </div>
                </div>
                <div class="btn-wrap request">
                    <a href="#" @click.prevent="store">완료</a>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import Form from "../../utils/Form";
export default {
    middleware: ["auth"],

    data(){
        return {
            campaign: "",

            form : new Form(this.$axios, {
                category: this.$route.query.category ? this.$route.query.category : "",
                title: "",
                description: "",
            }),
        }
    },
    methods: {
        store(){
            this.form.post("/api/qnas")
                .then(response => {
                    this.$store.commit("setPop", {
                        title : "문의완료",
                        description: "성공적으로 처리되었습니다."
                    });

                    this.$router.back();
                });
        }
    },

    computed: {

    },

    mounted() {

    }
}
</script>

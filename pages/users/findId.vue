<template>
    <main id="main" class="result-page find-id">
        <div class="yellow-box"></div>
        <section class="section1">
            <div class="logo-wrap">
                <img src="/images/logo.svg" alt="">
            </div>
            <p class="title">아이디 찾기</p>
            <p class="sub" style="margin-bottom:40px;">회원가입 시 등록했던 휴대폰번호로 아이디를 찾을 수 있습니다.</p>
            <div class="write-section">
                <div class="container3">
                    <div class="write-wrap">
                        <div class="write-box">
                            <div class="write-bundle">
                                <input-verify-number @verified="(data) => {form.contact = data; this.store()}" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </main>
</template>

<script>
import Form from "../../utils/Form";
export default {
    layout: "empty",
    data(){
        return {
            form : new Form(this.$axios, {
                contact: ""
            }),
        }
    },
    methods: {
        store(){
            this.form.post("/api/findIds")
                .then(response => {
                    this.$router.push(`/users/successFindId?email=${response.data.email}`);
                });
        },
    },

    computed: {

    },

    mounted() {

    }
}
</script>

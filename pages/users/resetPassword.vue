<template>
    <main id="main" class="result-page find-pwd_phone">
        <div class="yellow-box"></div>
        <section class="section1">
            <div class="logo-wrap">
                <img src="/images/logo.png" alt="">
            </div>
            <p class="title">비밀번호 초기화</p>
        </section>
        <div class="write-section">
            <div class="container3">
                <div class="write-wrap">
                    <div class="write-box">
                        <div class="write-bundle">
                            <div class="input-wrap Add_Features">
                                <input class="id-input" type="password" placeholder="비밀번호" v-model="form.password">
                                <error :form="form" name="password" />
                            </div>

                            <div class="gap"></div>

                            <div class="input-wrap Add_Features">
                                <input class="id-input" type="password" placeholder="비밀번호 확인" v-model="form.password_confirmation">
                                <error :form="form" name="password_confirmation" />
                            </div>

                            <!-- 인증번호 발송 후 활성화 -->
                            <!-- <div class="input-wrap Add_Features">
                                <input type="text" placeholder="인증번호">
                                <div class="Add_Features-box">
                                    <button>인증확인</button>
                                </div>
                            </div> -->
                            <!-- // -->
                        </div>
                    </div>
                    <div class="btn-wrap next">
                        <button type="button" @click.prevent="store" style="width:100%; height:100%;">비밀번호 초기화</button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import Form from "../../utils/Form";
export default {
    layout: "empty",

    data(){
        return {
            form : new Form(this.$axios, {
                password: "",
                password_confirmation: "",
                token: this.$route.query.token,
                contact: this.$route.query.contact,
            }),
        }
    },
    methods: {
        store(){
            this.form.patch("/api/passwordResets")
                .then(response => {
                    this.$store.commit("setPop", {
                        title: "초기화 성공",
                        description: "비밀번호가 초기화되었습니다."
                    });

                    this.$router.push(`/login`);
                });
        },
    },

    computed: {

    },

    mounted() {

    }
}
</script>

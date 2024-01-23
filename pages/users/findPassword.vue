<template>
    <main id="main" class="result-page find-pwd_phone">
        <div class="yellow-box"></div>
        <section class="section1">
            <div class="logo-wrap">
                <img src="/images/logo.png" alt="">
            </div>
            <p class="title">비밀번호를 잊어버리셨나요?</p>
            <p class="sub" style="text-align: center;">
                비밀번호를 찾으려는 아이디를 입력해주세요.
                <br/>인증 후 비밀번호를 변경할 수 있습니다.
            </p>
        </section>
        <div class="write-section">
            <div class="container3">
                <div class="write-wrap">
                    <div class="write-box">
                        <div class="write-bundle">
                            <div class="input-wrap Add_Features">
                                <input class="id-input" type="text" placeholder="아이디" v-model="form.email">
                                <error :form="form" name="email" />
                            </div>
                            <p class="input-sub">이메일 형식으로 입력해주세요</p>
                            <!-- 일치정보 없을떄 -->
                            <!-- <p class="input-sub result">일치하는 정보가 없습니다.</p> -->
                            <!-- //일치정보 없을때 -->
                            <div class="gap"></div>

                            <input-verify-number @verified="store" />

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
                    <!--
                    <div class="btn-wrap next" v-if="verified">
                        <nuxt-link to="/login">로그인하기</nuxt-link>
                    </div>
                    -->
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
                email: "",
                contact: ""
            }),
            verified: false,
        }
    },
    methods: {
        store(data){
            this.form.contact = data;

            this.form.post("/api/passwordResets")
                .then(response => {
                    /*this.$store.commit("setPop", {
                        title: "임시비밀번호가 발송되었습니다!"
                    });*/

                    this.verified = true;

                    this.$router.push("/users/resetPassword?contact=" + response.data.ids + "&token=" + response.data.token);
                });
        },
    },

    computed: {

    },

    mounted() {

    }
}
</script>

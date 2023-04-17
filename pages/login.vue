<template>
    <main id="main" class="login">
        <form action="" @submit.prevent="login">
            <div class="yellow-box"></div>
            <section class="section1">
                <div class="container">
                    <div class="left-wrap">
                        <div class="logo-wrap">
                            <img src="/images/logo.svg" alt="">
                        </div>
                        <p class="sub">우리:뷰를 가입하고 캠페인을 공모해보세요.</p>
                    </div>
                    <div class="right-wrap">
                        <div class="right-wrap-top">
                            <ul class="login-tab">
                                <li :class="`tab-link ${form.type === 'CUSTOMER' ? 'current' : ''}`" @click="() => form.type = 'CUSTOMER'">인플루언서</li>
                                <li :class="`tab-link ${form.type === 'COMPANY' ? 'current' : ''}`" @click="() => form.type = 'COMPANY'">기업 · 광고주</li>
                            </ul>
                        </div>
                        <div class="right-wrap-contents">
                            <div class="input-contents tab-content current" id="tab-1">
                                <div class="input-wrap tab-1">
                                    <input class="" type="text" placeholder="EMAIL ID" autofocus v-model="form.email">
                                    <error :form="form" name="email" />
                                </div>
                                <div class="input-wrap style2 btm">
                                    <input class="" type="password" placeholder="PASSWORD" v-model="form.password">
                                    <error :form="form" name="password" />
                                </div>
                                <!-- 정보가 일치 하지 않을경우 -->
                                <!-- <p class="warning-txt">
                                  <i class="xi-warning"></i>ID 또는 PW가 일치하지 않습니다.
                              </p> -->
                                <!-- // -->
                                <button class="login-btn">
                                    로그인
                                </button>
                                <div class="right-wrap-btm">
                                    <ul>
                                        <li>
                                            <nuxt-link to="/users/findId">아이디 찾기</nuxt-link>
                                        </li>
                                        <li>
                                            <nuxt-link to="/users/findPassword">비밀번호 찾기</nuxt-link>
                                        </li>
                                    </ul>
                                    <nuxt-link to="/users/createCustomer" class="join-btn" v-if="form.type === 'CUSTOMER'">인플루언서 회원가입</nuxt-link>
                                    <nuxt-link to="/users/createCompany" class="join-btn" v-else>기업 · 광고주 회원가입</nuxt-link>
                                </div>
                            </div>
                            <!--
                            <div class="sns-btn-wrap" v-if="form.type === 'CUSTOMER'">
                                <p>SNS 계정 로그인</p>
                                <div class="btn-wrap">
                                    <a :href="`${$store.state.domain}/openLoginPop/naverCustom?type=${form.type}`"  class="sns-btn naver">
                                        <img src="/images/sns-naver.png" alt="우리뷰">
                                    </a>
                                    <a :href="`${$store.state.domain}/openLoginPop/kakaoCustom?type=${form.type}`" class="sns-btn kakao">
                                        <img src="/images/sns-kakao.png" alt="우리뷰">
                                    </a>
                                    <a :href="`${$store.state.domain}/openLoginPop/google?type=${form.type}`" class="sns-btn google">
                                        <img src="/images/sns-google.png" alt="우리뷰">
                                    </a>
                                    <a :href="`${$store.state.domain}/openLoginPop/apple?type=${form.type}`" class="sns-btn apple">
                                        <img src="/images/sns-apple.png" alt="우리뷰">
                                    </a>
                                </div>
                            </div>
                            -->
                        </div>

                    </div>
                </div>
            </section>
            <section class="section2">
                <div class="container">
                    <p>아직 회원이 아니신가요?</p>
                    <nuxt-link to="/users/createCompany" v-if="form.type === 'COMPANY'">기업 · 광고주 회원가입</nuxt-link>
                    <nuxt-link to="/users/createCustomer" v-else>인플루언서 회원가입</nuxt-link>
                </div>
            </section>
        </form>


    </main>

</template>
<style>
.space-box {min-height:100vh;}
</style>
<script>
import Form from "../utils/Form";
export default {
    name: 'Login',
    layout: "empty",
    auth: "guest",
    data(){
        return {
            form : new Form(this.$axios, {
                email:"",
                password:"",
                type: "CUSTOMER"
            })
        }
    },
    methods: {
        login(){
            this.$auth.loginWith('laravelSanctum', {
                data: this.form.data()
            }).then(response => {
                // this.$router.push("/");
            }).catch(error => {
                this.form.onFail(error.response.data);
            });

            /*this.$axios.get('/sanctum/csrf-cookie').then(response => {
                this.form.post("/api/login")
                    .then(response => {
                        this.$axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;

                        this.$store.commit("setToken", response.data.token);
                        this.$store.commit("setUser", response.data.user);

                        console.log(this.$store.state.user);
                    })
                    .catch(error => {

                    })
            });*/
        }
    },

    mounted() {

    }
}
</script>

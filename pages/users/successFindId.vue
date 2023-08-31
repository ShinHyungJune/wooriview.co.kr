<template>

    <main id="main" class="result-page result-id">
        <div class="yellow-box"></div>
        <section class="section1">
            <div class="logo-wrap">
                <img src="/images/logo.png" alt="">
            </div>
            <p class="title">찾으신 아이디는 <br class="br-mb"> <span class="user-info-y">{{$route.query.email}}</span> 입니다.</p>
            <p class="sub">비밀번호가 기억나지 않으신가요?</p>
            <nuxt-link to="/users/findPassword" class="re-set">비밀번호 재설정하기</nuxt-link>
            <div class="btn-wrap">
                <nuxt-link to="/login">로그인하기</nuxt-link>
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

            }),
        }
    },
    methods: {


    },

    computed: {

    },

    mounted() {

    }
}
</script>

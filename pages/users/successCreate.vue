<template>
    <main id="main" class="result-page result-join">
        <div class="yellow-box"></div>
        <section class="section1">
            <div class="logo-wrap">
                <img src="/images/logo.svg" alt="">
            </div>
            <p class="title">회원가입이 완료되었습니다.</p>
            <p class="sub">로그인 후 우리뷰를 이용해보세요!</p>
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

            })
        }
    },
    methods: {

    },

    computed: {

    }
}
</script>

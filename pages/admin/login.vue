<template>
    <main class="login" style="width:100%;">
        <div class="login-wrap col-group" style="margin:0 auto;">
            <h1 class="logo">
                <img src="/images/hd_logo.svg" alt="">
            </h1>
            <form @submit.prevent="login">
                <ul class="login-form">
                    <li class="col-group">
                        <p>
                            아이디
                        </p>
                        <input type="text" v-model="form.email">
                    </li>
                    <li class="col-group">
                        <p>
                            비밀번호
                        </p>
                        <input type="password" v-model="form.password">
                    </li>
                    <li class="remember col-group">
                        <label for="remember">
                            <input type="checkbox" id="remember">
                            <span class="check-icon"></span>
                            로그인 상태 유지
                        </label>
                    </li>
                    <li class="login">
                        <button type="submit">Log in</button>
                    </li>
                </ul>
            </form>

        </div>
    </main>
</template>

<script>
import Form from "@/utils/Form";
export default {
    layout: "admin",
    name: 'Login',
    auth: "guest",
    data(){
        return {
            form : new Form(this.$axios, {
                email:"",
                password:"",
                type: "ADMIN"
            })
        }
    },
    methods: {
        login(){
            this.$auth.loginWith('laravelSanctum', {
                data: this.form.data(),
            }).then(response => {
                this.$router.push("/admin/banners");
            }).catch(error => {
                this.form.onFail(error.response.data);
            });

        }
    }
}
</script>

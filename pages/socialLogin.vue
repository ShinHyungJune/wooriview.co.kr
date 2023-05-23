<template>

</template>
<script>
export default {
    auth: "guest",

    data(){
        return {
            token: this.$route.query.token ?  this.$route.query.token : null,
        }
    },

    mounted() {
        let pushToken = localStorage.getItem("push_token");

        this.$axios.get("/api/pushTokens")
            .then(response => {
                this.$store.commit("setPushToken", pushToken);

                this.$auth.loginWith('laravelSanctum', {
                    data: {
                        token: this.token,
                        push_token : pushToken
                    }
                }).then(response => {

                }).catch((e) => {
                    alert("소셜로그인에 실패하였습니다.");

                    return this.$router.push("/");
                })
            })
    }
}
</script>

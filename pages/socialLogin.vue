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
        // this.$store.commit("init");
        window.receiveFcmToken = (token) => {
            console.log('Received FCM token:', token);
            this.$store.commit("setPushToken", token);

            this.$auth.loginWith('laravelSanctum', {
                data: {
                    token:this.token,
                    push_token : this.$store.state.push_token
                }
            }).then(response => {

            }).catch((e) => {
                alert("소셜로그인에 실패하였습니다.");

                return this.$router.push("/");
            })

        };

        if(window.AndroidBridge) {
            window.AndroidBridge.getFcmToken("fcm");
        }

        if(window.webkit) {
            window.webkit.messageHandlers.getFcmToken.postMessage("fcm");
        }


    }
}
</script>

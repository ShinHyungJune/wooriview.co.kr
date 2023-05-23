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
        let self = this;
        alert("test");

        // this.$store.commit("init");
        window.receiveFcmToken = (token) => {
            alert(token);
            console.log('Received FCM token:', token);
            self.$store.commit("setPushToken", token);

            self.$auth.loginWith('laravelSanctum', {
                data: {
                    token:self.token,
                    push_token : self.$store.state.push_token
                }
            }).then(response => {

            }).catch((e) => {
                alert("소셜로그인에 실패하였습니다.");

                return self.$router.push("/");
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

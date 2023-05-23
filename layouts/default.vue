<template>
    <div id="app">
        <header-vue />

        <pop />

        <section class="flex">
            <aside class="left-side"></aside>

            <transition name="page" mode="out-in">
                <Nuxt />
            </transition>
        </section>

        <footer-vue />
    </div>

</template>
<style>
.page-enter-active, .page-leave-active {
    transition: opacity .7s;
}
.page-enter, .page-leave-active {
    opacity: 0;
}
</style>
<script>
import HeaderVue from "../components/HeaderVue";
import FooterVue from "../components/FooterVue";
export default {
    head() {
        return {
            link: [
                {rel: 'stylesheet', type: 'text/css', href: '/css/common.css'},
                {rel: 'stylesheet', type: 'text/css', href: '/css/style.css'},
                {rel: 'stylesheet', type: 'text/css', href: '/css/developer.css'},
            ],
        }
    },

    components: {
        FooterVue,
        HeaderVue
    },

    methods:{
        getCategories() {
            this.$axios.get("/api/categories")
                .then(response => {
                    this.$store.commit("setCategories", response.data);
                })
        },

        getAbuses(){
            this.$axios.get("/api/abuses")
                .then(response => {
                    this.$store.commit("setAbuses", response.data.data);
                });
        },
    },

    mounted() {
        // this.$store.commit("init");
        window.receiveFcmToken = (token) => {
            // console.log('Received FCM token:', token);

            this.$axios.post("/api/pushTokens", {
                push_token: token
            });

            localStorage.setItem("push_token", token);

            this.$store.commit("setPushToken", token);

        };

        if(window.AndroidBridge) {
            window.AndroidBridge.getFcmToken("fcm");
        }

        if(window.webkit) {
            window.webkit.messageHandlers.getFcmToken.postMessage("fcm");
        }

        this.getAbuses();

        this.getCategories();

        // 기본정보를 입력 안했다면
        if(this.$auth.user && this.$auth.user.data.type === 'CUSTOMER' && !this.$auth.user.data.intro)
            return this.$router.push("/users/createCustomerMore");

        (function() {
            var w = window;
            if (w.ChannelIO) {
                return (window.console.error || window.console.log || function(){})('ChannelIO script included twice.');
            }
            var ch = function() {
                ch.c(arguments);
            };
            ch.q = [];
            ch.c = function(args) {
                ch.q.push(args);
            };
            w.ChannelIO = ch;
            function l() {
                if (w.ChannelIOInitialized) {
                    return;
                }
                w.ChannelIOInitialized = true;
                var s = document.createElement('script');
                s.type = 'text/javascript';
                s.async = true;
                s.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
                s.charset = 'UTF-8';
                var x = document.getElementsByTagName('script')[0];
                x.parentNode.insertBefore(s, x);
            }
            if (document.readyState === 'complete') {
                l();
            } else if (window.attachEvent) {
                window.attachEvent('onload', l);
            } else {
                window.addEventListener('DOMContentLoaded', l, false);
                window.addEventListener('load', l, false);
            }
        })();
        ChannelIO('boot', {
            "pluginKey": "335e647a-7adb-4378-b28b-1399325f9e99"
        });
    }
}
</script>

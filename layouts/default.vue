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
                {rel: 'stylesheet', type: 'text/css', href: '//cdn.quilljs.com/1.3.4/quill.snow.css'},
                {rel: 'stylesheet', type: 'text/css', href: '/css/common.css'},
                {rel: 'stylesheet', type: 'text/css', href: '/css/style.css'},
                {rel: 'stylesheet', type: 'text/css', href: '/css/developer.css'},
            ],

            script: [
                {
                    src: '//cdn.quilljs.com/1.3.6/quill.min.js',
                    defer: true
                },
                {
                    hid: 'facebook-pixel',
                    innerHTML: `
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '1324305921499724');
  fbq('track', 'PageView');
        `,
                    defer: true
                }
            ],
            __dangerouslyDisableSanitizers: ['script']
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
        // 사이트 들어오자마자 허용여부 물어보기
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {

                },
                (error) => {

                }
            );
        }

        this.getAbuses();

        this.getCategories();

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

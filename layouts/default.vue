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
        let meta = [
            {
                hid: 'og:url',
                property: 'og:url',
                content: 'https://wooriview.co.kr'
            },
            {
                hid: 'og:title',
                property: 'og:title',
                content: '우리뷰-구독형 체험단 마케팅 플랫폼'
            },
            {
                hid: 'og:description',
                property: 'og:description',
                content: '우리뷰, 구독형 체험단, 인플루언서 마케팅, SNS마케팅, 체험단, 블로그 체험단, 인스타그램 체험단, 블로그 마케팅, 인스타그램 마케팅, SNS 체험단'
            },
            {
                hid: 'og:image',
                property: 'og:image',
                content: 'https://wooriview.co.kr/images/wooriview-m.png'
            },
        ];

        return {
            meta: this.$route.params.id && this.$route.path.includes("/campaigns") ? [] : meta,
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
                    console.log("categories");
                    console.log(response.data);
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
        this.getCategories();
        this.getAbuses();

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
    }
}
</script>

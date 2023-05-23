let baseUrl = process.env.NODE_ENV === "production" ? "https://api.wooriview.co.kr" : "http://localhost";

export default {
    target: "server",
    server: {
        port: 3001
    },
    ssr: true,
    head: {
        title: '우리뷰',
        htmlAttrs: {
            lang: 'ko'
        },
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: ''},
            {name: 'format-detection', content: 'telephone=no'},

            {name: 'naver-site-verification', content: 'b863a845c5511cf9868573630a136bfd3e8abedc=no'},
            {name: 'google-site-verification', content: 'Fecaj1jpMSkf8_JXonbE3KeUnDLPJP3ZIngmnScSb5w=no'},
            {name: 'og:site_name', content: '우리뷰 | 우리가 만드는 모든 리뷰 우리뷰'},
            {name: 'description', content: '우리가 만드는 모든 리뷰 우리뷰'},
            {name: 'og:type', content: 'wooriview'},
            {name: 'og:title', content: 'wooriview'},
            {name: 'og:description', content: 'https://korket.co.kr/client/images/wooriview-m.png'},
            {name: 'og:url', content: 'https://wooriview.co.kr'},
            {name: 'keywords', content: 'wooriview, 우리뷰, 리뷰, 캠페인'},
        ],
        script: [
            {src: "//code.jquery.com/jquery-1.12.4.min.js"},
            {src: "//cdn.iamport.kr/js/iamport.payment-1.1.5.js"},
            {src: "//cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.js"},
            {src: "//unpkg.com/aos@2.3.1/dist/aos.js"},
            {src: "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"},
            {src: "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=b93c6e67af109eb2377106556643ab7d&libraries=services"},
            {src: "//cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.4/jspdf.min.js"},
            {src: "/js/swiper.min.js"},
            {src: "//www.gstatic.com/charts/loader.js"},
            // {src: "/js/common.js"},
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/images/wooriview_favicon.ico'},
            {rel: 'stylesheet', type: 'text/css', href: 'cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/codemirror.min.css'},
            {rel: 'stylesheet', type: 'text/css', href: '//uicdn.toast.com/editor/latest/toastui-editor.min.css'},
            {rel: 'stylesheet', type: 'text/css', href: '//cdn.jsdelivr.net/npm/xeicon@2.3.3/xeicon.min.css'},
            {rel: 'stylesheet', type: 'text/css', href: '/css/swiper.min.css'},
            {rel: 'stylesheet', type: 'text/css', href: '//unpkg.com/aos@2.3.1/dist/aos.css'},
            {
                rel: 'stylesheet',
                type: 'text/css',
                href: '//cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css'
            },
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        {
            src: "~plugins/toast-editor.js",
            ssr: false,
        },
        {
            src: "~plugins/axios.js"
        },
    ],

    middlewares: [""],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        "@nuxtjs/axios",
        "@nuxtjs/auth-next",
    ],

    axios: {
        baseUrl: baseUrl,
        credentials: true,
        /* proxy: true, */
    },
    /* proxy: {
        '/laravel': {
            target: baseUrl,
            pathRewrite: { '^/laravel': '/' }
        }
    }, */
    auth: {
        redirect: {
            login: "/login",
            logout: '/login'
        },
        /*redirect: {
            login: '/login',
            logout: '/logout',
            callback: '/login',
            home: '/'
        },*/
        strategies: {
            laravelSanctum: {
                provider: 'laravel/sanctum',
                url: baseUrl,
                endpoints: {
                    login: {
                        url: '/api/login',
                        method: 'post'
                    },
                    logout: {
                        url: "/api/logout",
                        method: "post"
                    },
                }
            },
        },

        axios:true,
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        transpile: [
            'defu',
        ]
    },

    router: {
        scrollBehavior(to, from, savedPosition) {
            if (savedPosition) {
                return savedPosition;
            } else {
                return { x: 0, y: 0 };
            }
        }
    },
}

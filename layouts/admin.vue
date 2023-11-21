<template>
    <div id="wrap" class="col-group">
        <pop />

        <nav id="gnb" class="gnb" v-if="$route.path !== '/admin/login'">
            <div class="btn-wrap col-group">
                <nuxt-link to="/admin/banners" class="home-btn">
                    <i class="xi-home"></i>
                </nuxt-link>
                <a href="" class="logout-btn" @click.prevent="() => {$auth.logout();}">
                    <i class="xi-log-out"></i>
                </a>
            </div>
            <ul class="main-menu row-group">
                <li>
                    <p class="scd5">
                        배너관리
                    </p>
                    <ul class="sub-menu">
                        <li>
                            <nuxt-link to="/admin/banners" class="scd5">
                                메인배너
                                <i class="xi-angle-right"></i>
                            </nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/admin/pops" class="scd5">
                                팝업배너
                                <i class="xi-angle-right"></i>
                            </nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/admin/campaignBanners" class="scd5">
                                캠페인배너
                                <i class="xi-angle-right"></i>
                            </nuxt-link>
                        </li>
                    </ul>
                </li>
                <li>
                    <p class="scd5">
                        회원관리
                    </p>
                    <ul class="sub-menu">
                        <li>
                            <nuxt-link to="/admin/companies" class="scd5">
                                광고주
                                <i class="xi-angle-right"></i>
                            </nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/admin/customers" class="scd5">
                                인플루언서
                                <i class="xi-angle-right"></i>
                            </nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/admin/qnas" class="scd5">
                                1대1문의
                                <i class="xi-angle-right"></i>
                            </nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/admin/notices" class="scd5">
                                공지사항
                                <i class="xi-angle-right"></i>
                            </nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/admin/guides" class="scd5">
                                이용가이드
                                <i class="xi-angle-right"></i>
                            </nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/admin/penalties" class="scd5">
                                패널티
                                <i class="xi-angle-right"></i>
                            </nuxt-link>
                        </li>
                    </ul>
                </li>
                <li>
                    <p class="scd5">
                        캠페인관리
                    </p>
                    <ul class="sub-menu">
                        <li>
                            <nuxt-link to="/admin/campaigns" class="scd5">
                                캠페인
                                <i class="xi-angle-right"></i>
                            </nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/admin/applications" class="scd5">
                                지원내역
                                <i class="xi-angle-right"></i>
                            </nuxt-link>
                        </li>
                    </ul>
                </li>
                <li>
                    <p class="scd5">
                        결제관리
                    </p>
                    <ul class="sub-menu">
                        <li>
                            <nuxt-link to="/admin/products" class="scd5">
                                상품
                                <i class="xi-angle-right"></i>
                            </nuxt-link>
                        </li>

                        <li>
                            <nuxt-link to="/admin/orders" class="scd5">
                                주문내역
                                <i class="xi-angle-right"></i>
                            </nuxt-link>
                        </li>
                    </ul>
                </li>
                <li>
                    <p class="scd5">
                        사이트관리
                    </p>
                    <ul class="sub-menu">
                        <li>
                            <nuxt-link to="/admin/abuses" class="scd5">
                                욕설
                                <i class="xi-angle-right"></i>
                            </nuxt-link>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>

        <Nuxt/>
    </div>

</template>
<script>
export default {
    head() {
        return {
            link: [
                {rel: 'stylesheet', type: 'text/css', href: '//cdn.quilljs.com/1.3.4/quill.snow.css'},
                {rel: 'stylesheet', href: '/admin/css/common.css'},
                {rel: 'stylesheet', href: '/admin/css/style.css'},
                {rel: 'stylesheet', href: '/admin/css/developer.css'},
            ],

            script: [
                {
                    src: '//cdn.quilljs.com/1.3.6/quill.min.js',
                    defer: true
                },
            ],
        }
    },

    components: {},
    mounted() {
        if(this.$route.path !== "/admin/login" && (!this.$auth.user || !this.$auth.user.data.admin))
            return this.$router.push("/admin/login");
    }
}
</script>

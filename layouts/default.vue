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
    transition: opacity 1s;
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


    },

    mounted() {
        // this.$store.commit("init");

        this.getCategories();

        // 기본정보를 입력 안했다면
        if(this.$auth.user && this.$auth.user.data.type === 'CUSTOMER' && !this.$auth.user.data.intro)
            return this.$router.push("/users/createCustomerMore");
    }
}
</script>

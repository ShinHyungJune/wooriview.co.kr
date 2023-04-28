<template>
    <div>
        <pop />
        <Nuxt />
    </div>
</template>
<script>

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

    },

    methods:{
        getCategories() {
            this.$axios.get("/api/categories")
                .then(response => {
                    this.$store.commit("setCategories", response.data);
                })
        }
    },

    mounted() {
        // this.$store.commit("init");

        this.getCategories();
    }
}
</script>

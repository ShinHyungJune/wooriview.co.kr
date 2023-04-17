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

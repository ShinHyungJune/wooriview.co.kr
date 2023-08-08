<template>
    <div style="display: flex; align-content: center; justify-content: center; height:100vh; background-color:#ffc800;">
        <h3 class="title" style="display:flex; align-items:center; justify-content:center; font-size:40px; font-weight:bold; color:#000;">체험인증완료</h3>
    </div>
</template>

<script>
export default {
    layout: "empty",
    data(){
        return {

        }
    },
    methods: {

        store(){

        }
    },

    computed: {

    },

    mounted() {
        this.$axios.get("/api/applications/finish/" + this.$route.params.id);
    }
}
</script>

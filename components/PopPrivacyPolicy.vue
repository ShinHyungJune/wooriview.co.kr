<template>
    <div class="modal-box fixed modal-policy">
        <div class="box">
            <h2>개인정보처리방침</h2>
            <div class="description">
                <privacy-policy />
            </div>
            <div class="button-box">
                <a href="#" @click.prevent="close" class="btn">닫기</a>
            </div>
        </div>
    </div>
</template>
<script>
import privacyPolicy from "@/pages/contents/privacyPolicy.vue";
export default {
    components: {privacyPolicy},
    data(){
        return {

        }
    },

    methods: {
        close(){
            this.$emit("close");
        }
    },

    mounted() {
    }

}
</script>

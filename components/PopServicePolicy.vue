<template>
    <div class="modal-box fixed modal-policy">
        <div class="box">
            <h2>서비스이용약관</h2>
            <div class="description">
                <service-policy />
            </div>
            <div class="button-box">
                <a href="#" @click.prevent="close" class="btn">닫기</a>
            </div>
        </div>
    </div>
</template>
<script>
import servicePolicy from "@/pages/contents/servicePolicy.vue";
export default {
    components: {servicePolicy},
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

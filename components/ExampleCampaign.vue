<template>
    <li class="campaign-item">
        <div class="img-wrap">
            <img :src="campaign.img.url" alt="" v-if="campaign.img">
        </div>
        <div class="Information-wrap">
            <div class="Period-wrap">
                <ul class="sns-wrap">
                    <li class="type">
                        <img src="/images/Live-icon.png" alt="" v-if="campaign.type_campaign === 'REALTIME'">
                        <img src="/images/Visit-icon.png" alt="" v-if="campaign.type_campaign === 'VISIT'">
                        <img src="/images/Reporter-icon.png" alt="" v-if="campaign.type_campaign === 'REPORTER'">
                        <img src="/images/Shipping-icon.png" alt="" v-if="campaign.type_campaign === 'DELIVERY'">
                    </li>
                    <li class="sns">
                        <img src="/images/Instagram-icon.svg" alt="" v-if="campaign.type_sns === 'INSTAGRAM'">
                        <img src="/images/Blog-icon.svg" alt="" v-if="campaign.type_sns === 'NAVER'">
                    </li>
                </ul>
            </div>
            <nuxt-link :to="`/campaigns/${campaign.id}?type_campaign=${campaign.type_campaign}`" class="campaign-Title">
                [{{ campaign.title_company ? campaign.title_company : '상호명' }}]
                {{ campaign.title_product ? campaign.title_product : '홍보제품명' }}
            </nuxt-link>
            <p class="product" v-if="campaign.type_campaign === 'REPORTER'">원고료 {{ campaign.price_write.toLocaleString() }}원 제공</p>
            <p class="product" v-else>{{ campaign.description_provide }}</p>
        </div>
    </li>

</template>
<script>
import Form from "../utils/Form";
export default {
    props: {
        "campaign": {
            required: true
        },
        "onlyShow": {
            required: false,
        }
    },

    data(){
        return {
            form: new Form(this.$axios, {
                campaign_id: ""
            })
        }
    },


    methods: {
        like(e){
            e.stopPropagation();
            e.preventDefault();

            if(!this.$auth.user)
                return alert("좋아요는 로그인 후 이용 가능합니다.");

            this.form.campaign_id = this.campaign.id;

            this.campaign.is_like = !this.campaign.is_like;

            this.form.post("/api/likes");
        }
    }
}
</script>

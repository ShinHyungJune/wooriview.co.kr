<template>
    <li class="campaign-item">
        <div class="img-wrap" :style="`background-image:url(${campaign.img.url}); background-size:cover; background-position:center center;`" v-if="campaign.img"></div>
        <div class="Information-wrap">
            <div class="Period-wrap">
                <ul class="sns-wrap">
                    <li class="type">
                        <img src="/images/Live-icon.png" alt="" v-if="campaign.type_campaign === 'REALTIME'">
                        <img src="/images/Visit-icon.png" alt="" v-if="campaign.type_campaign === 'VISIT'">
                        <img src="/images/Reporter-icon.png" alt="" v-if="campaign.type_campaign === 'REPORTER'">
                        <img src="/images/Shipping-icon.png" alt="" v-if="campaign.type_campaign === 'DELIVERY'">
                        <img src="/images/구매평.svg" style="width:25px;" alt="" v-if="campaign.type_campaign === 'REVIEW'">
                    </li>
                    <li class="sns">
                        <img src="/images/릴스.svg" alt="" v-if="campaign.type_sns === 'INSTAGRAM'">
                        <img src="/images/Blog-icon.svg" alt="" v-if="campaign.type_sns === 'NAVER'">

                        <img src="/images/숏츠.svg" alt="" v-if="campaign.type_sns === 'YOUTUBE_SHORTS'">
                        <img src="/images/틱톡.svg" alt="" v-if="campaign.type_sns === 'TIKTOK'">
                        <img src="/images/스마트스토어.svg" alt="" v-if="campaign.type_sns === 'SHOP_SMART'">
                        <img src="/images/쿠팡.svg" alt="" v-if="campaign.type_sns === 'SHOP_COUPANG'">
                        <img src="/images/기타몰.svg" alt="" v-if="campaign.type_sns === 'SHOP_OTHER'">
                    </li>
                </ul>
            </div>
            <div class="campaign-Title">
                [{{ campaign.title_company ? campaign.title_company : '상호명' }}]
                {{ campaign.title_product ? campaign.title_product : '홍보제품명' }}
            </div>
            <p class="product" v-if="campaign.type_campaign === 'REPORTER'">원고료 {{ campaign.price_write.toLocaleString() }}원 제공</p>
            <p class="product" v-else>{{ campaign.product_and_price }}</p>
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

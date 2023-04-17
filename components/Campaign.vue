<template>
    <li class="campaign-item">
        <nuxt-link class="img-wrap" :to="`/campaigns/${campaign.id}`">
            <img :src="campaign.img.url" alt="" v-if="campaign.img">
        </nuxt-link>
        <div class="like-wrap">
            <input type="checkbox" name="" v-if="campaign.is_like" checked>
            <input type="checkbox" name="" v-else>
            <label for="" @click="like"><i class="xi-heart"></i></label>
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
                <p class="Period">D - {{ campaign.d_day }}일</p>
            </div>
            <nuxt-link :to="`/campaigns/${campaign.id}`" class="campaign-Title">
                [{{ campaign.title_company }}]
                {{campaign.title_product }}
            </nuxt-link>
            <p class="product">{{ campaign.title_product }}</p>
            <div class="State-wrap">
                <p class="Application">신청
                    <span>{{ campaign.applications_count }}</span>
                </p>
                <p class="Recruitment">모집
                    <span>{{ campaign.max_participant }}</span>
                </p>
            </div>
        </div>
    </li>

</template>
<script>
import Form from "../utils/Form";
export default {
    data(){
        return {
            form: new Form(this.$axios, {
                campaign_id: ""
            })
        }
    },

    props: {
        "campaign": {
            required: true
        },
    },

    methods: {
        like(e){
            e.stopPropagation();
            e.preventDefault();

            if(!this.$auth.user)
                return alert("좋아요는 로그인 후 이용 가능합니다.");

            this.form.campaign_id = this.campaign.id;

            this.campaign.is_like = !this.campaign.is_like;

            console.log(this.campaign.is_like);

            this.form.post("/api/likes");
        }
    }
}
</script>

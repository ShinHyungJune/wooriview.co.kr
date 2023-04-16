<template>
    <li class="campaign-item">
        <nuxt-link class="img-wrap" :to="`/campaigns/show?id=${campaign.id}`">
            <img :src="campaign.img.url" alt="" v-if="campaign.img">
        </nuxt-link>
        <div class="like-wrap">
            <input type="checkbox" name="" id="asd" v-model="campaign.is_like" @click="like">
            <label for="asd"><i class="xi-heart"></i></label>
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
            <nuxt-link :to="`/campaigns/show?id=${campaign.id}`" class="campaign-Title">
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
export default {
    props: {
        "campaign": {
            required: true
        },
    },

    methods: {
        like(){
            if(!this.$auth.user)
                return alert("좋아요는 로그인 후 이용 가능합니다.");

            this.campaign.is_like = !this.campaign.is_like;

            this.form.post("/api/likes", {
                campaign_id: this.campaign.id
            });
        }
    }
}
</script>

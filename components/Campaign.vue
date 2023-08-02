<template>
    <li :class="`campaign-item ${addClass}`">
        <nuxt-link
            class="img-wrap" :to="`/campaigns/${campaign.id}?type_campaign=${campaign.type_campaign}`"
            :style="`background-image:url(${campaign.img.url}); background-size:cover; background-position:center center;`"
        >
            <!--
            <img :src="campaign.img.url" alt="" v-if="campaign.img">
            -->
            <div class="campaign-type-wrap">
                <div class="campaign-type-img">
                    <img src="/images/Live-icon.png" alt="" v-if="campaign.type_campaign === 'REALTIME'">
                    <img src="/images/Visit-icon.png" alt="" v-if="campaign.type_campaign === 'VISIT'">
                    <img src="/images/Reporter-icon.png" alt="" v-if="campaign.type_campaign === 'REPORTER'">
                    <img src="/images/Shipping-icon.png" alt="" v-if="campaign.type_campaign === 'DELIVERY'">
                </div>
                <p class="campaign-type-title" v-if="campaign.type_campaign === 'REALTIME'">실시간 방문형</p>
                <p class="campaign-type-title" v-if="campaign.type_campaign === 'VISIT'">방문형 캠페인</p>
                <p class="campaign-type-title" v-if="campaign.type_campaign === 'REPORTER'">기자단 캠페인</p>
                <p class="campaign-type-title" v-if="campaign.type_campaign === 'DELIVERY'">배송형 캠페인</p>
            </div>
        </nuxt-link>
        <div class="like-wrap" v-if="!onlyShow">
            <input type="checkbox" name="" v-if="campaign.is_like" checked>
            <input type="checkbox" name="" v-else>
            <label for="" @click="like"><i class="xi-heart"></i></label>
        </div>

        <!--
        <span class="price" v-if="campaign.type_campaign === 'REPORTER' && campaign.price_write">{{campaign.price_write.toLocaleString()}} ￦</span>
        -->

        <div class="Information-wrap">
            <div class="Period-wrap">
                <ul class="sns-wrap">
                    <li class="sns">
                        <img src="/images/Instagram-icon.svg" alt="" v-if="campaign.type_sns === 'INSTAGRAM'">
                        <img src="/images/Blog-icon.svg" alt="" v-if="campaign.type_sns === 'NAVER'">
                    </li>
                </ul>
                <p class="Period" v-if="campaign.d_day === '종료'">종료</p>
                <p class="Period" v-else>D - {{ campaign.d_day }}일</p>
            </div>
            <nuxt-link :to="`/campaigns/${campaign.id}?type_campaign=${campaign.type_campaign}`" class="campaign-Title">
                [{{ campaign.title_company }}]
                {{ campaign.title_product }}
            </nuxt-link>
            <p class="product" v-if="campaign.type_campaign === 'REPORTER'">원고료 {{ campaign.price_write.toLocaleString() }}원 제공</p>
            <p class="product" v-else>{{ campaign.description_provide }}</p>
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
    props: {
        "campaign": {
            required: true
        },
        "onlyShow": {
            required: false,
        },
        addClass: {
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

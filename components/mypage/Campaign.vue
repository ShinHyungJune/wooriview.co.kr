<template>
    <li class="campaign-info-wrap">
        <div class="campaign-img">
            <img :src="campaign.img.url" alt="" v-if="campaign.img">
        </div>
        <div class="info-box">
            <div class="sticker-wrap">
                <div class="sticker">
                    <img src="/images/Live-icon.png" alt="" v-if="campaign.type_campaign === 'REALTIME'">
                    <img src="/images/Visit-icon.png" alt="" v-if="campaign.type_campaign === 'VISIT'">
                    <img src="/images/Reporter-icon.png" alt="" v-if="campaign.type_campaign === 'REPORTER'">
                    <img src="/images/Shipping-icon.png" alt="" v-if="campaign.type_campaign === 'DELIVERY'">
                </div>
                <div class="sticker">
                    <img src="/images/Instagram-icon.svg" alt="" v-if="campaign.type_sns === 'INSTAGRAM'">
                    <img src="/images/Blog-icon.svg" alt="" v-if="campaign.type_sns === 'NAVER'">
                </div>
            </div>
            <p class="info-title">
                [{{ campaign.title_company }}] {{campaign.title_product }}
            </p>
            <P class="info-sub">{{campaign.title_product }}</P>
        </div>
    </li>
</template>
<script>

export default {
    data(){
        return {

        }
    },

    props: {
        "campaign": {
            required: true
        },
    },

    methods: {

    }
}
</script>

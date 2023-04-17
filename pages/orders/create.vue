<template>
    <main id="main" class="Influencer_Application">
        <section>
            <div class="container3">
                <div class="campaign-item-wrap">
                    <h3>신청 캠페인</h3>
                    <ul>
                        <campaign v-if="campaign" :campaign="campaign" />
                    </ul>
                </div>

                <div class="Influencer_Application-ri">
                    <div class="principle-wrap">
                        <h3>캠페인 참여 시 주의사항</h3>
                        <p>
                            - 제공받은 제품은 타인에게 양도 및 판매, 교환을 절대 허용하지 않으며, 적발 시 제품 가격 환불 및 캠페인 참여 제한됩니다. <br>
                            - 콘텐츠 등록 기간 내 콘텐츠 미등록 시 서비스 이용료 및 제품 가격에 대하여 비용 청구됩니다.<br>
                            - 선정 후 단순 변심에 의한 제공내역 옵션 및 배송지 변경은 어렵습니다.<br>
                            - 안내된 제공 내역과 다르거나, 별도 공지 없이 7일 이상 배송되지 않는 등 진행이 어려운 경우 1:1문의로 연락해주세요.<br>
                            - 업체 측 요청에 따라 선정 인플루언서 수가 변경될 수 있습니다.<br>
                            - 콘텐츠 작성 시 선정 된 본 캠페인의 제품만으로 단독 촬영하여 진행되어야 합니다.<br>
                            - 작성하신 콘텐츠는 6개월 유지해야 하며, 유지하지 않을 경우 페널티가 부과됩니다.<br>
                            - 콘텐츠 작성 시 태그 달기 부분에 제공 드린 키워드를 추가 작성 부탁드립니다.
                        </p>
                    </div>

                    <div class="Introduction-wrap">
                        <h3>소개글 <span>광고주에게 어필 할 수 있는 부분을 입력해 주세요.</span></h3>
                        <textarea name="" id="" placeholder="광고주에게  지난 광고 내역 등이나 본인을 어필할 수 있는 부분을 입력해 주세요." v-model="form.description"></textarea>
                        <error :form="form" name="description" />
                        <a href="#" class="Application-btn" @click.prevent="store">캠페인 신청하기</a>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import Form from "../../utils/Form";
export default {
    middleware: ["auth"],
    data(){
        return {
            campaign: "",

            form : new Form(this.$axios, {
                campaign_id: this.$route.query.campaign_id,
                description: "",
            }),
        }
    },
    methods: {
        getCampaign(){
            this.$axios.get("/api/campaigns/" + this.$route.query.campaign_id)
                .then(response => {
                    this.campaign = response.data.data;
                });
        },


        store(){
            this.form.post("/api/applications")
                .then(response => {
                    this.$store.commit("setPop", {
                        title : "신청완료",
                        description: "성공적으로 처리되었습니다."
                    });

                    this.$router.back();
                });
        }
    },

    computed: {

    },

    mounted() {
        this.getCampaign();
    }
}
</script>

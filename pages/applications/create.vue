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
                            - 안내된 리뷰 등록기간을 준수하여 리뷰를 등록해주세요.
                            <br/>- 제공내역 수령 및 체험 후에 리뷰 미작성 등 리뷰어의 의무를 이행하지 않을시 우리뷰 자체 패널티 적용과 내용증명 발송 및 지급명령 등의 법적인 조치를 취할 수 있습니다.
                            <br/>- 제공받은 제품을 타인에게 양도 및 판매, 교환을 절대 허용하지 않으며 적발시 비용청구 및 참여제한이 됩니다.
                            <br/>- 작성된 리뷰는 캠페인 종료일로부터 최소 6개월동안 전체 공개로 유지되어야 하며, 미유지시 비용청구 및 패널티가 적용될 수 있습니다.
                            <br/>- 본 캠페인의 리뷰 및 이미지는 업체 홍보 목적으로 사용될 수 있습니다.
                            <br/>- 성의 없는 리뷰의 경우 수정 요청이 있을 수 있습니다.
                            <br/>- 캠페인 미션이 준수되지 않을 시 수정 요청이 있을 수 있습니다.
                            <br/>- 제공받은 제품을 타인에게 양도 및 판매, 교환을 절대 허용하지 않으며 적발시 비용청구 및 참여제한이 됩니다.
                            <br/>- 업체 측 요청에 따라 선정 인플루언서 수가 변경될 수 있습니다.
                            <br/>- 안내된 제공 내역과 다르거나, 별도 공지 없이 7일 이상 배송되지 않는 등 진행이 어려운 경우 1:1문의 게시판 혹은 고객센터(1644-2515)로 문의바랍니다.
                            <br/>- 선정 후 단순 변심에 의한 제공내역 옵션 및 배송지 변경은 어렵습니다.
                            <br/>- (강조) 공정거래위원회 대가성 문구(이미지)를 반드시 포스팅 하단에 첨부하여 주세요! 첨부하지 않았을 경우, 컨텐츠 등록이 정상적으로 처리되지 않을 수 있습니다. 대가성 문구(이미지)는 마이페이지 하단에서 다운받으실 수 있습니다.
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

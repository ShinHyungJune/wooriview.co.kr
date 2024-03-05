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
                            - 리뷰어 선정시, 우리뷰 APP을 다운로드하여 광고주와 1대1채팅으로 캠페인 일정을 조율해주세요!
                            <br/>- 안내된 리뷰 등록기간을 준수하여 리뷰를 등록해주세요.
                            <br/>- 캠페인 미션이 준수되지 않을 시 수정 요청이 있을 수 있습니다.
                            <br/>- 체험 후에 리뷰 미작성 등 리뷰어의 의무를 이행하지 않을시 패널티 적용과 내용증명 및 지급명령 등의 법적 조치를 취할 수 있습니다.
                            <br/>- 공정거래위원회 대가성 문구(이미지)를 반드시 포스팅 하단에 첨부하여 주세요!
                            <br/>  (리뷰어 선정시, 카카오톡으로 공정위 이미지 전달)
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
        if(this.$auth.user.data.type === 'COMPANY') {
            this.$store.commit("setPop", {
                title: "참여불가",
                description: "광고주는 캠페인 참여가 불가합니다."
            });

            return this.$router.back();
        }

        this.getCampaign();
    }
}
</script>

<template>
    <main id="main" class="Influencer_Application penalty-add Advertiser">
        <section v-if="application">
            <div class="container3">
                <div class="left-wrap">
                    <div class="penalty-user-wrap">
                        <h3>패널티 대상</h3>
                        <div class="subscriber-name-wrap">
                            <div class="subscriber-img">
                                <!-- <img src="../images/Blog-icon.svg" alt=""> -->
                            </div>
                            <div class="subscriber-name">
                                <p class="name">{{ application.user.nickname }}</p>
                                <p class="Address">{{ application.user.address }} {{application.user.address_detail}}</p>
                            </div>
                            <div class="Recommended_mark">
                                <img src="/images/Recommended_mark_Gold.svg" alt="" v-if="application.user.grade === 'GOLD'">
                                <img src="/images/Recommended_mark_Silver.svg" alt="" v-if="application.user.grade === 'SILVER'">
                                <img src="/images/Recommended_mark_Bronze.svg" alt="" v-if="application.user.grade === 'BRONZE'">
                            </div>
                        </div>
                    </div>
                    <div class="campaign-item-wrap">
                        <h3>발생 캠페인</h3>
                        <ul>
                            <campaign :only-show="true" :campaign="application.campaign" />
                        </ul>
                    </div>
                </div>

                <div class="Advertiser_Application-ri">
                    <h3>패널티 사유</h3>
                    <p class="sub">패널티 사유는 다중선택 가능합니다.</p>
                    <div class="principle-wrap">
                        <div class="filter-li">
                            <ul class="filter-ck-wrap">
                                <li class="filter-ck">
                                    <input type="checkbox" name="" id="reason1" value="리뷰를 정해진 날짜보다 늦게 작성했어요!" v-model="form.reasons">
                                    <label for="reason1">
                                        <i class="xi-check-square"></i>
                                        <i class="xi-checkbox-blank"></i>
                                        리뷰를 정해진 날짜보다 늦게 작성했어요!
                                    </label>
                                </li>
                                <li class="filter-ck">
                                    <input type="checkbox" name="" id="reason2" value="시간 약속을 지키지 않아서 당황스러웠어요!" v-model="form.reasons">
                                    <label for="reason2">
                                        <i class="xi-check-square"></i>
                                        <i class="xi-checkbox-blank"></i>
                                        시간 약속을 지키지 않아서 당황스러웠어요!
                                    </label>
                                </li>
                                <li class="filter-ck">
                                    <input type="checkbox" name="" id="reason3" value="리뷰 작성을 안 했어요!" v-model="form.reasons">
                                    <label for="reason3">
                                        <i class="xi-check-square"></i>
                                        <i class="xi-checkbox-blank"></i>
                                        리뷰 작성을 안 했어요!
                                    </label>
                                </li>
                                <li class="filter-ck">
                                    <input type="checkbox" name="" id="reason4" value="너무 불친절해요!" v-model="form.reasons">
                                    <label for="reason4">
                                        <i class="xi-check-square"></i>
                                        <i class="xi-checkbox-blank"></i>
                                        너무 불친절해요!
                                    </label>
                                </li>
                                <li class="filter-ck">
                                    <input type="checkbox" name="" id="asd5" value="기타" v-model="form.reasons">
                                    <label for="asd5">
                                        <i class="xi-check-square"></i>
                                        <i class="xi-checkbox-blank"></i>
                                        기타
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="Introduction-wrap">
                        <h3>추가 내용</h3>
                        <textarea name="" id="" v-model="form.description"></textarea>
                        <button class="call-btn" @click="store">패널티 요청</button>
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
            application: "",

            form : new Form(this.$axios, {
                application_id: this.$route.query.application_id,
                reasons: [],
                description: "",
            }),
        }
    },
    methods: {
        getApplication(){
            this.$axios.get("/api/applications/" + this.$route.query.application_id)
                .then(response => {
                    this.application = response.data.data;
                });
        },


        store(){
            this.form.post("/api/penalties")
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
        this.getApplication();
    }
}
</script>

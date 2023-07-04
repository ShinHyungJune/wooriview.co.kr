<template>
    <main id="main" class="join join-company">
        <div class="yellow-box"></div>
        <section class="section1">
            <div class="logo-wrap">
                <img src="/images/logo.svg" alt="">
            </div>
        </section>
        <div class="write-section">
            <div class="container3">
                <div class="write-wrap">
                    <div class="write-wrap-le">

                        <div class="write-box">
                            <p class="write-labal">회원정보</p>
                            <div class="write-bundle">
                                <input-avatar @change="data => form.img = data" />

                                <div class="input-wrap Add_Features">
                                    <input type="text" placeholder="이메일 아이디" v-model="form.email">
<!--                                    <div class="Add_Features-box">
                                        <button>인증번호</button>
                                    </div>-->
                                    <error :form="form" name="email" />
                                </div>
                                <p class="input-sub">이메일 형식으로 입력해주세요</p>

                                <div class="gap"></div>

                                <div class="input-wrap Add_Features">
                                    <input type="password" placeholder="비밀번호" v-model="form.password">
                                    <error :form="form" name="password" />
<!--                                    <div class="Add_Features-box text-red">
                                        사용불가
                                        <i class="xi-security text-red"></i>
                                    </div>-->
                                </div>
                                <div class="input-wrap">
                                    <input type="password" placeholder="비밀번호 확인" v-model="form.password_confirmation">
                                </div>
                                <p class="input-sub">
                                    영문 대문자와 소문자, 숫자, 특수문자 중 2가지 이상을 조합하여 8자이상으로<br class="br-pc" />입력해주세요</p>

                                <div class="gap"></div>
                            </div>
                        </div>

                        <div class="write-box">
                            <p class="write-labal">사업자정보</p>
                            <div class="write-bundle">

                                <div class="input-wrap Add_Features">
                                    <input type="text" placeholder="사업자명" v-model="form.company_name">
                                    <error :form="form" name="company_name" />
                                </div>

                                <input-files title="사업자등록증 첨부" :multiple="false" comment="사업자등록증을 첨부해주세요." @change="(data) => {form.file_company = data[0]}" />
                                <error :form="form" name="file_company" />

                                <div class="input-wrap Add_Features">
                                    <input type="text" placeholder="사업자번호" v-model="form.company_number">

                                    <error :form="form" name="company_number" />

                                </div>
                                <div class="input-wrap">
                                    <input type="text" placeholder="업체 전화번호" v-model="form.company_contact">
                                    <error :form="form" name="company_contact" />

                                </div>
                                <div class="input-wrap">
                                    <input type="text" placeholder="실사용 중인 이메일" v-model="form.company_email">
                                    <error :form="form" name="company_email" />

                                </div>
                            </div>
                        </div>

                        <div class="write-box">
                            <p class="write-labal">사업장 운영지역</p>
                            <div class="write-bundle">
                                <input-address @change="(data) => form[data.name] = data.value" :form="form" />
                                <error :form="form" name="address" />
                                <error :form="form" name="address_detail" />
                            </div>
                        </div>
                    </div>

                    <div class="write-wrap-ri">
                        <div class="write-box">
                            <p class="write-labal">담당자 휴대폰 번호</p>
                            <div class="write-bundle">
                                <input-verify-number @verified="(data) => {form.contact = data}" />

                                <error :form="form" name="contact" />
                            </div>
                        </div>

                        <div class="write-box">
                            <p class="write-labal">카테고리 <span>사업에 해당하는 카테고리를 클릭해주세요.</span></p>
                            <div class="Field-ck-wrap">
                                <div class="category-ck" v-for="category in categories.data" :key="category.id">
                                    <input type="checkbox" name="" :id="category.id" :value="category.id" v-model="form.categories">
                                    <label :for="category.id">
                                        <div class="img-wrap">
                                            <img :src="category.active.url" alt="" class="active">
                                            <img :src="category.inactive.url" alt="" class="inactive">
                                        </div>
                                        <p class="label-title">{{ category.title }}</p>
                                    </label>
                                </div>

                            </div>

                            <error :form="form" name="categories" />

                        </div>


                    </div>


                </div>
            </div>
        </div>
        <section class="section2">
            <div class="container3">
                <div class="agree-box">
                    <div class="Consent-form all-chk">
                        <div class="Consent-ck">
                            <input type="checkbox" name="1" id="" checked v-if="isCheckAll" disabled>
                            <input type="checkbox" name="1" id="" v-else >
                            <label for="" @click="() => isCheckAll ? unCheckAll() : checkAll()">
                                <span class="ck-from"><i class="xi-check-min"></i></span>
                                <span class="bold">전체동의</span>
                            </label>
                        </div>
                    </div>
                    <div class="Consent-form">
                        <div class="Consent-ck">
                            <input type="checkbox" name="1" id="check1" v-model="form.agree_privacy">
                            <label for="check1">
                                <span class="ck-from"><i class="xi-check-min"></i></span>
                                <span class="bold">(필수)</span>
                                서비스 이용약관에 동의합니다.
                            </label>
                        </div>
                        <a target="_blank" href="/contents/servicePolicy"  @click.prevent="activeServicePolicy = true"><i class="xi-angle-right-thin"></i></a>
                    </div>
                    <div class="Consent-form">
                        <div class="Consent-ck">
                            <input type="checkbox" name="1" id="check2" v-model="form.agree_usage">
                            <label for="check2">
                                <span class="ck-from"><i class="xi-check-min"></i></span>
                                <span class="bold">(필수)</span>
                                개인정보 수집 및 이용에 동의합니다.
                            </label>
                        </div>
                        <a target="_blank" href="/contents/privacyPolicy" @click.prevent="activePrivacyPolicy = true"><i class="xi-angle-right-thin"></i></a>
                    </div>
                    <div class="Consent-form">
                        <div class="Consent-ck">
                            <input type="checkbox" name="1" id="check3" v-model="form.agree_marketing">
                            <label for="check3">
                                <span class="ck-from"><i class="xi-check-min"></i></span>
                                <span class="bold">(선택)</span>
                                마케팅 정보수집 및 이벤트 수신에 동의합니다.
                            </label>
                        </div>
                        <!--
                        <a href="#"><i class="xi-angle-right-thin"></i></a>
                        -->
                    </div>
                </div>
            </div>
            <div class="write-btn-wrap" style="margin-bottom:100px;">
                <a href="#" class="Change_Information-btn" @click.prevent="store">회원가입</a>
            </div>
        </section>

        <pop-privacy-policy v-if="activePrivacyPolicy" @close="activePrivacyPolicy = false" />
        <pop-service-policy v-if="activeServicePolicy" @close="activeServicePolicy = false" />
    </main>
</template>

<script>
import Form from "../../utils/Form";
export default {
    name: 'Register',
    layout: "empty",
    data(){
        return {
            activePrivacyPolicy: false,
            activeServicePolicy: false,
            socialUser: null,
            form : new Form(this.$axios, {
                img: "",
                social_id: "", // 소셜토큰
                social_platform: "", // 소셜플랫폼



                email: this.$route.query.email ? this.$route.query.email : "",
                contact: "",

                file_company: "",
                company_name: "",
                company_number: "",
                company_contact: "",
                company_email: "",

                address: "",
                address_detail: "",
                address_zipcode: "",

                categories: [],

                type: "COMPANY",

                password:"",
                password_confirmation:"",

                // name: this.$route.query.name ? this.$route.query.name : "",
                // sex: this.$route.query.sex ? this.$route.query.sex : "공개안함",
                // birth : this.$route.query.birth ? this.$route.query.birth : "",
                // contact: this.$route.query.contact ? this.$route.query.contact : "",

                agree_privacy: 0,
                agree_usage: 0,
                agree_marketing: 0,
            }),
        }
    },
    methods: {
        store(){
            if(!this.form.agree_privacy || !this.form.agree_usage)
                return this.$store.commit("setPop", {
                    title: "약관동의",
                    description: "필수약관에 동의해주세요."
                });

            this.form.post("/api/users")
                .then(response => {
                    this.$router.push("/users/successCreate");
                });
        },

        checkAll(){
            this.form.agree_privacy = 1;
            this.form.agree_usage = 1;
            this.form.agree_marketing = 1;
        },

        unCheckAll(){
            this.form.agree_privacy = 0;
            this.form.agree_usage = 0;
            this.form.agree_marketing = 0;
        }
    },

    computed: {
        categories() {
            return this.$store.state.categories;
        },

        isCheckAll(){
            return this.form.agree_marketing && this.form.agree_privacy && this.form.agree_usage;
        }
    },

    mounted() {
        if(this.$route.query.socialUser)
            this.socialUser = JSON.parse(this.$route.query.socialUser);

        if(this.socialUser){
            if(this.socialUser.social_id)
                this.form.social_id = this.socialUser.social_id;

            if(this.socialUser.social_platform)
                this.form.social_platform = this.socialUser.social_platform;

            if(this.socialUser.name)
                this.form.name = this.socialUser.name;

            if(this.socialUser.email)
                this.form.email = this.socialUser.email;

            if(this.socialUser.sex)
                this.form.sex = this.socialUser.sex;

            if(this.socialUser.birth)
                this.form.birth = this.socialUser.birth;

            if(this.socialUser.contact)
                this.form.contact = this.socialUser.contact;
        }
    }
}
</script>

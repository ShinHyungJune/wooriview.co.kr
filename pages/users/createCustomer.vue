<template>
    <main id="main" class="join join-company influencer">
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
                            <div class="write-bundle">

                                <div class="input-wrap Add_Features">
                                    <input type="text" placeholder="이메일 아이디" v-model="form.email">
                                    <error :form="form" name="email" />
                                </div>
                                <p class="input-sub">이메일 형식으로 입력해주세요</p>

                                <div class="gap"></div>

                                <div class="input-wrap Add_Features" v-if="!$route.query.socialUser">
                                    <input type="password" placeholder="비밀번호" v-model="form.password">
                                    <error :form="form" name="password" />

                                </div>
                                <div class="input-wrap Add_Features" v-if="!$route.query.socialUser">
                                    <input type="password" placeholder="비밀번호 확인" v-model="form.password_confirmation">
                                    <error :form="form" name="password_confirmation" />
                                </div>
                                <p class="input-sub">
                                    영문 대문자와 소문자, 숫자, 특수문자 중 2가지 이상을 조합하여 8자이상으로<br class="br-pc" />입력해주세요</p>
                            </div>
                        </div>

                        <div class="write-box">
                            <div class="write-bundle">
                                <div class="input-wrap Add_Features">
                                    <input type="text" placeholder="닉네임" v-model="form.nickname">
                                    <error :form="form" name="nickname" />

                                </div>
                                <p class="input-sub">회원가입시 '닉네임 한번 결정시 수정이 불가합니다</p>

                            </div>
                        </div>

                        <div class="write-box">
                            <input-verify-number @verified="(data) => {form.contact = data}" />

                            <error :form="form" name="contact" />
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
                        <a target="_blank" href="/contents/servicePolicy"><i class="xi-angle-right-thin"></i></a>
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
                        <a target="_blank" href="/contents/privacyPolicy"><i class="xi-angle-right-thin"></i></a>
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
    </main>
</template>

<script>
import Form from "../../utils/Form";
export default {
    name: 'Register',
    layout: "empty",
    data(){
        return {
            socialUser: null,
            form : new Form(this.$axios, {
                social_id: "", // 소셜토큰
                social_platform: "", // 소셜플랫폼

                email: this.$route.query.email ? this.$route.query.email : "",
                contact: "",

                company_name: "",
                company_number: "",
                company_contact: "",
                company_email: "",
                nickname: "",

                address: "",
                address_detail: "",
                address_zipcode: "",

                categories: [],

                type: "CUSTOMER",

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

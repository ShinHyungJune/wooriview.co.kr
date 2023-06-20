<template>
    <main id="main" class="MyPage Change_Information">
        <div class="route-wrap">
            <div class="container3">
                <div class="route-box">
                    <ul class="route">
                        <li>마이페이지</li>
                        <li><i class="xi-angle-right"></i></li>
                        <li>회원정보 변경</li>
                    </ul>
                    <h2>회원정보 변경</h2>
                    <div class="route-bg">
                        <img src="/images/route-bg-1.png" alt="">
                    </div>
                </div>
            </div>
        </div>

        <div class="write-section">
            <div class="container3">
                <div class="write-section">
                    <div class="container3">
                        <div class="write-wrap">
                            <div class="write-wrap-le">

                                <div class="write-box">
                                    <p class="write-labal">회원정보</p>
                                    <div class="write-bundle">

                                        <div class="input-wrap Add_Features">
                                            <input type="text" placeholder="이메일 아이디" v-model="form.email" disabled class="Deactivation">
                                            <!--                                    <div class="Add_Features-box">
                                                                                    <button>인증번호</button>
                                                                                </div>-->
                                            <error :form="form" name="email" />
                                        </div>

                                        <p class="input-sub">이메일 형식으로 입력해주세요</p>

                                        <div class="gap"></div>

                                        <div class="input-wrap Add_Features">
                                            <button class="Password-Change-btn" type="button" @click="activePassword = true">비밀번호 변경 <i class="xi-angle-right"></i></button>
                                        </div>
                                        <div class="write-bundle" v-if="activePassword">
                                            <div class="input-wrap">
                                                <input type="password" placeholder="기존 비밀번호" v-model="form.password">
                                            </div>
                                            <div class="input-wrap">
                                                <input type="password" placeholder="비밀번호" v-model="form.password_new">
                                            </div>
                                            <div class="input-wrap">
                                                <input type="password" placeholder="비밀번호 확인" v-model="form.password_new_confirmation">
                                            </div>
                                            <p class="input-sub">
                                                영문 대문자와 소문자, 숫자, 특수문자 중 2가지 이상을 조합하여 8자이상으로 입력해주세요
                                            </p>
                                            <error :form="form" name="password" />
                                            <error :form="form" name="password_new" />
                                        </div>

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

                                        <input-files title="사업자등록증 첨부" :multiple="false" comment="사업자등록증을 첨부해주세요." :default="$auth.user.data.file_company ? [$auth.user.data.file_company] : ''" @change="(data) => {form.file_company = data[0]}" />
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
                                    </div>
                                </div>
                            </div>

                            <div class="write-wrap-ri">
                                <div class="write-box">
                                    <p class="write-labal">담당자 휴대폰 번호</p>
                                    <div class="write-bundle">
                                        <input-verify-number @verified="(data) => {form.contact = data}"  v-if="activeContact" />

                                        <div class="input-wrap m-input-wrap m-input-withBtn" v-else>
                                            <div class="m-input-text">
                                                <input type="text" placeholder="연락처" v-model="$auth.user.data.contact" disabled class="Deactivation">
                                            </div>

                                            <button type="button" class="m-input-btn" @click="activeContact = true">연락처 변경</button>
                                        </div>

                                        <error :form="form" name="contact" />
                                    </div>
                                </div>

                                <div class="write-box">
                                    <p class="write-labal">카테고리 <span>사업에 해당하는 카테고리를 클릭해주세요.</span></p>
                                    <div class="Field-ck-wrap">
                                        <div class="category-ck" v-for="category in this.$store.state.categories.data" :key="category.id">
                                            <input type="checkbox" name="categories" :id="category.id" :value="category.id" v-model="form.categories">
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
                <div class="write-btn-wrap">
                    <a href="#" class="Change_Information-btn" @click.prevent="update">회원정보 변경</a>
                </div>
            </div>
        </div>

        <div class="Withdrawal-section">
            <div class="container3">
                <p>서비스가 만족스럽지 못하신가요?</p>
                <ul>
                    <li class="inquiry"><nuxt-link to="/qnas">문의하기</nuxt-link></li>
                    <li class="Withdrawal"><nuxt-link to="/users/remove">회원탈퇴</nuxt-link></li>
                </ul>
            </div>
        </div>
    </main>


</template>

<script>
import Form from "../../utils/Form";
export default {
    middleware: ["auth"],


    components: {},
    data(){
        return {
            activePassword: false,
            activeContact: false,
            form: new Form(this.$axios, {
                contact: "",
                password: "",
                password_new: "",
                password_new_confirmation: "",

                email: this.$auth.user.data.email,
                file_company: "",
                company_name: this.$auth.user.data.company_name,
                company_number: this.$auth.user.data.company_number,
                company_contact: this.$auth.user.data.company_contact,
                company_email: this.$auth.user.data.company_email,
                categories: this.$auth.user.data.categories.map(category => category.id),
                address: this.$auth.user.data.address,
                address_detail: this.$auth.user.data.address_detail,
                address_zipcode: this.$auth.user.data.address_zipcode,
            })
        }
    },
    methods: {
        update(){
            console.log(this.form.categories);
            this.form.patch("/api/users")
                .then(response => {
                    this.$store.commit("setPop", {
                        title: "변경완료",
                    });

                    this.$auth.fetchUser();

                    // this.$router.back();
                })
        },

        test(){
        }
    },

    computed: {

    },

    mounted() {

    },

    watch: {

    },
}
</script>

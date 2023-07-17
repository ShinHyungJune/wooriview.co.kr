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
                                        <input-avatar @change="data => form.img = data" :default="$auth.user.data.img"/>

                                        <div class="input-wrap Add_Features">
                                            <input type="text" placeholder="이메일 아이디" v-model="form.email">

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

                                        <div class="input-wrap Add_Features">
                                            <input type="text" placeholder="닉네임" v-model="form.nickname" disabled class="Deactivation">

                                            <error :form="form" name="nickname" />
                                        </div>

                                        <div class="input-wrap Add_Features">
                                            <input type="date" placeholder="생년월일" v-model="form.birth">

                                            <error :form="form" name="birth" />
                                        </div>
                                    </div>
                                </div>

                                <div class="write-box">
                                    <p class="write-labal">SNS 계정 연동</p>

                                    <div class="write-bundle">
                                        <div class="sns-radio-box">
                                            <input type="radio" name="" id="a" checked>
                                            <label for="">인스타그램 URL</label>
                                        </div>
                                        <div class="input-wrap">
                                            <input class="" type="text" placeholder="http:// 또는 https://를 포함한 정확한 미디어 주소를 입력해주세요." v-model="form.instagram">
                                        </div>

                                        <div class="sns-radio-box">
                                            <input type="radio" name="" id="b" checked>
                                            <label for="">네이버블로그 URL</label>
                                        </div>
                                        <div class="input-wrap">
                                            <input class="" type="text" placeholder="http:// 또는 https://를 포함한 정확한 미디어 주소를 입력해주세요." v-model="form.naver">
                                        </div>
                                    </div>
                                </div>

                                <div class="write-box">
                                    <p class="write-labal">개인정보</p>
                                    <div class="write-bundle">
                                        <input-verify-number @verified="(data) => {form.contact = data}"  v-if="activeContact" />

                                        <div class="input-wrap m-input-wrap m-input-withBtn" v-else>
                                            <div class="m-input-text">
                                                <input type="text" placeholder="연락처" v-model="$auth.user.data.contact" disabled class="Deactivation">
                                            </div>

                                            <button type="button" class="m-input-btn" @click="activeContact = true">연락처 변경</button>
                                        </div>

                                        <error :form="form" name="contact" />

                                        <div class="gap"></div>

                                        <div class="radio-wrap1">
                                            <div class="radio-box">
                                                <input type="radio" name="Gender" id="Man" value="남자" v-model="form.sex">
                                                <label for="Man">남자</label>
                                            </div>
                                            <div class="radio-box">
                                                <input type="radio" name="Gender" id="Woman" value="여자" v-model="form.sex">
                                                <label for="Woman">여자</label>
                                            </div>
                                        </div>

                                        <error :form="form" name="sex" />

                                        <div class="gap"></div>

                                        <input-address @change="(data) => form[data.name] = data.value" :form="form" />
                                    </div>
                                </div>

                                <div class="write-box">
                                    <p class="write-labal">SNS 활동 분야 <span>SNS에서 주로 활동하는 분야를 클릭해주세요.</span></p>
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

                            <div class="write-wrap-ri">
                                <div class="write-box">
                                    <p class="write-labal">카메라</p>
                                    <div class="write-bundle">
                                        <div class="radio-wrap1">
                                            <div class="radio-box">
                                                <input type="radio" name="camera" id="camera0" :value="0" v-model="form.camera">
                                                <label for="camera0">없음</label>
                                            </div>
                                            <div class="radio-box">
                                                <input type="radio" name="camera" id="camera1" :value="1" v-model="form.camera">
                                                <label for="camera1">있음</label>
                                            </div>
                                        </div>
                                        <error :form="form" name="camera" />

                                    </div>
                                </div>

                                <div class="write-box">
                                    <p class="write-labal">얼굴 노출</p>
                                    <div class="write-bundle">
                                        <div class="radio-wrap1">
                                            <div class="radio-box">
                                                <input type="radio" name="open_face" id="face0" :value="0" v-model="form.open_face">
                                                <label for="face0">불가능</label>
                                            </div>
                                            <div class="radio-box">
                                                <input type="radio" name="open_face" id="face1" :value="1" v-model="form.open_face">
                                                <label for="face1">가능</label>
                                            </div>
                                        </div>
                                        <error :form="form" name="open_face" />

                                    </div>
                                </div>

                                <div class="write-box">
                                    <p class="write-labal">사이즈 정보 <span>비공개로 유지하고 싶으실 경우 빈칸으로 남겨주세요.</span></p>
                                    <div class="write-bundle">
                                        <div class="input-wrap">
                                            <input type="text" placeholder="상의 사이즈를 작성해주세요." v-model="form.size_top">
                                            <error :form="form" name="size_top" />

                                        </div>
                                        <div class="input-wrap">
                                            <input type="text" placeholder="하의 사이즈를 작성해주세요." v-model="form.size_bottom">
                                            <error :form="form" name="size_bottom" />

                                        </div>
                                        <div class="input-wrap">
                                            <input type="text" placeholder="신발 사이즈를 작성해주세요." v-model="form.size_shoes">
                                            <error :form="form" name="size_shoes" />

                                        </div>
                                        <div class="gap"></div>
                                        <div class="input-wrap">
                                            <input type="text" placeholder="키를 작성해주세요." v-model="form.tall">
                                            <error :form="form" name="tall" />

                                        </div>
                                        <div class="input-wrap">
                                            <input type="text" placeholder="피부타입을 작성해주세요. ex) 건성, 밝은 편" v-model="form.skin_type">
                                            <error :form="form" name="skin_type" />

                                        </div>
                                    </div>
                                </div>

                                <div class="write-box">
                                    <p class="write-labal">결혼 여부</p>
                                    <div class="write-bundle">
                                        <div class="radio-wrap1">
                                            <div class="radio-box">
                                                <input type="radio" name="marriage" id="marriage0" :value="0" v-model="form.marriage">
                                                <label for="marriage0">미혼</label>
                                            </div>
                                            <div class="radio-box">
                                                <input type="radio" name="marriage" id="marriage1" :value="1" v-model="form.marriage">
                                                <label for="marriage1">기혼</label>
                                            </div>
                                        </div>
                                        <error :form="form" name="marriage" />

                                    </div>
                                </div>

                                <div class="write-box">
                                    <p class="write-labal">자녀 여부</p>
                                    <div class="write-bundle">
                                        <div class="radio-wrap1">
                                            <div class="radio-box">
                                                <input type="radio" name="child" id="child0" :value="0" v-model="form.child">
                                                <label for="child0">없음</label>
                                            </div>
                                            <div class="radio-box">
                                                <input type="radio" name="child" id="child1" :value="1" v-model="form.child">
                                                <label for="child1">있음</label>
                                            </div>
                                        </div>
                                        <error :form="form" name="child" />

                                    </div>
                                </div>

                                <div class="write-box">
                                    <p class="write-labal">반려동물</p>
                                    <div class="write-bundle">
                                        <div class="radio-wrap1">
                                            <div class="radio-box">
                                                <input type="radio" name="animal" id="animal0" :value="0" v-model="form.animal">
                                                <label for="animal0">없음</label>
                                            </div>
                                            <div class="radio-box">
                                                <input type="radio" name="animal" id="animal1" :value="1" v-model="form.animal">
                                                <label for="animal1">있음</label>
                                            </div>
                                        </div>
                                        <error :form="form" name="animal" />

                                    </div>
                                </div>

                                <div class="write-box">
                                    <p class="write-labal">소개글</p>
                                    <!--
                                    <div class="input-wrap re-size">

                                        <input type="text" placeholder="광고주에게 소개할 수 있는 인사말을 적어주세요.">
                                    </div>
                                     -->
                                    <div class="write-bundle">
                                        <textarea class="" id="" placeholder="광고주에게 소개할 수 있는 인사말을 적어주세요." v-model="form.intro"></textarea>

                                        <error :form="form" name="intro" />
                                    </div>
                                </div>

                                <div class="write-box">
                                    <p class="write-labal">지난 활동 내역</p>
                                    <div class="write-bundle">
                                        <textarea class="re-size" id="" placeholder="횔동 했던 경력을 적어주세요." v-model="form.history"></textarea>

                                        <error :form="form" name="history" />
                                    </div>
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
                img: "",
                contact: "",
                password: "",
                password_new: "",
                password_new_confirmation: "",

                instagram: this.$auth.user.data.instagram,
                naver: this.$auth.user.data.naver,
                email: this.$auth.user.data.email,
                categories: this.$auth.user.data.categories.map(category => category.id),
                address: this.$auth.user.data.address,
                address_detail: this.$auth.user.data.address_detail,
                address_zipcode: this.$auth.user.data.address_zipcode,

                nickname: this.$auth.user.data.nickname,
                sex: this.$auth.user.data.sex,
                camera: this.$auth.user.data.camera,
                open_face: this.$auth.user.data.open_face,
                size_top: this.$auth.user.data.size_top,
                size_bottom: this.$auth.user.data.size_bottom,
                size_shoes: this.$auth.user.data.size_shoes,
                tall: this.$auth.user.data.tall,
                skin_type: this.$auth.user.data.skin_type,
                marriage: this.$auth.user.data.marriage,
                child: this.$auth.user.data.child,
                animal: this.$auth.user.data.animal,
                intro: this.$auth.user.data.intro,
                history: this.$auth.user.data.history,
                birth: this.$auth.user.data.birth,
            })
        }
    },
    methods: {
        update(){
            if(this.form.instagram && (!this.form.instagram.includes("http://")) && !this.form.instagram.includes("https://"))
                return this.$store.commit("setPop", {
                    title: "URL 확인필요",
                    description: "반드시 인스타 URL에 http://나 https://을 포함하여 작성해주세요."
                });

            if(this.form.naver && (!this.form.naver.includes("http://")) && !this.form.naver.includes("https://"))
                return this.$store.commit("setPop", {
                    title: "URL 확인필요",
                    description: "반드시 네이버 URL에 http://나 https://을 포함하여 작성해주세요."
                });

            this.form.errors.clear();

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

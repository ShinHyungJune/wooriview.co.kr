<template>
    <main id="main" class="add-info add-sns add-personal">
        <div class="yellow-box"></div>
        <section class="section1">
            <div class="logo-wrap">
                <img src="/images/logo.svg" alt="">
            </div>
            <p class="title" v-if="step != 3">
                캠페인에 참여하려면 필수로 입력해야 하는 정보로 <br />
                회원정보에서 수정가능합니다.
            </p>
            <p class="title" v-else>
                회원가입/추가정보 등록이 <br class="br-mb" /> 완료되었습니다.
            </p>
            <div class="step-contents">
                <ul class="step-list">
                    <li :class="`step-content ${step == 1 ? 'now' : ''}`">

                    </li>
                    <li :class="`step-content ${step == 2 ? 'now' : ''}`">

                    </li>
                    <li :class="`step-content ${step == 3 ? 'now' : ''}`">

                    </li>
                </ul>
                <ul class="step-text-list">
                    <li :class="`step-text ${step == 1 ? 'now' : ''}`">
                        SNS
                    </li>
                    <li :class="`step-text ${step == 2 ? 'now' : ''}`">
                        개인정보
                    </li>
                    <li :class="`step-text ${step == 3 ? 'now' : ''}`">
                        완료
                    </li>
                </ul>
            </div>
        </section>
        <div class="write-section">
            <div class="container3">
                <div class="write-wrap" v-if="step == 1">
                    <div class="write-wrap-le">

                        <div class="write-box">
                            <p class="write-labal">SNS 계정 연동</p>

                            <div class="write-bundle">
                                <div class="sns-radio-box">
                                    <input type="radio" name="1" id="a" checked>
                                    <label for="a"><span><i class="xi-check-min"></i></span>인스타그램 URL</label>
                                </div>
                                <div class="input-wrap">
                                    <input class="" type="text" placeholder="http:// 또는 https://를 포함한 정확한 미디어 주소를 입력해주세요.">
                                </div>

                                <div class="sns-radio-box">
                                    <input type="radio" name="1" id="b">
                                    <label for="b"><span><i class="xi-check-min"></i></span>네이버블로그 URL</label>
                                </div>
                                <div class="input-wrap">
                                    <input type="text" placeholder="http:// 또는 https://를 포함한 정확한 미디어 주소를 입력해주세요.">
                                </div>
                            </div>
                        </div>

                        <div class="write-box">
                            <p class="write-labal">SNS 활동 분야 <span>SNS에서 주로 활동하는 분야를 클릭해주세요</span></p>
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
                            <error :form="form" name="categories"/>
                        </div>
                    </div>

                    <div class="write-wrap-ri">
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

                <div class="write-wrap" v-if="step == 2">
                    <div class="write-wrap-le">

                        <div class="write-box">
                            <p class="write-labal">개인정보</p>
                            <div class="write-bundle">
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
                    </div>

                    <div class="write-wrap-ri">

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

                    </div>
                </div>
            </div>
            <div class="next-btn-wrap">
                <a href="#" class="next-btn" @click.prevent="next" v-if="step != 3">다음</a>
                <nuxt-link to="/" class="next-btn" v-else>우리뷰 시작하기</nuxt-link>
            </div>
        </div>
    </main>
</template>

<script>
import Form from "../../utils/Form";
export default {
    layout: "empty",
    data(){
        return {
            step:1,

            form : new Form(this.$axios, {
                categories: [],
                intro: "",
                history: "",

                instagram: "",
                naver: "",

                sex: "",
                address: "",
                address_detail: "",
                address_zipcode: "",
                camera: "",
                open_face: "",
                size_top: "",
                size_bottom: "",
                size_shoes: "",
                tall: "",
                skin_type: "",
                marriage: "",
                child: "",
                animal: "",
                more: 1,
            }),
        }
    },
    methods: {
        store(){
            this.form.post("/api/users")
                .then(response => {
                    this.$router.push("/users/successCreate");
                });
        },
        next(){
            if(this.step == 1){
                if(this.form.categories.length === 0)
                    return this.$store.commit("setPop", {
                        title: "입력확인",
                        description: "카테고리를 선택해주세요."
                    });

                if(this.form.intro === "")
                    return this.$store.commit("setPop", {
                        title: "입력확인",
                        description: "소개글을 입력해주세요."
                    });

                if(this.form.history === "")
                    return this.$store.commit("setPop", {
                        title: "입력확인",
                        description: "지난 활동내역을 입력해주세요."
                    });

                return this.step += 1;
            }

            if(this.step == 2){
                this.form.patch("/api/users")
                    .then(response => {
                        this.$auth.fetchUser();

                        this.step = 3;
                    })
            }
        },
        connectInstargram(){
            // console.log(location.href);
            location.href = `https://api.instagram.com/oauth/authorize?client_id=${this.$store.state.instagram_client_id}&redirect_uri=${location.href}&scope={user_profile}&response_type=code`;
        },

    },

    computed: {
        categories() {
            return this.$store.state.categories;
        },


    },

    mounted() {

    }
}
</script>

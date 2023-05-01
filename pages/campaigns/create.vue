<template>
    <main id="main" class="MyPage Campaign_Registration">
        <div class="Campaign_Registration_top_wrap">
            <div class="container3">
                <div class="Campaign_Registration_top">
                    <p class="le_p">캠페인 등록 시 주의사항</p>
                    <p class="ri_p">
                        캠페인 기간은 인플루언서 모집기간을 시작으로 모집기간 끝나면 다음날 인플루언서 선정기간을 가집니다. <br>
                        설정한 선정 마감일 다음날 컨텐츠 등록을 받으며 마감일 이후에도 컨텐츠 등록을 하지 않은 인플루언서는 우리뷰 내 패널티 기능으로 신고해주세요.<br>
                        원활한 광고를 위해 최선을 다 하는 우리뷰가 되도록 하겠습니다.
                    </p>
                </div>
            </div>
        </div>

        <div class="write-section">
            <div class="container3">

                <div class="temporary_storage_wrap">
                    <h2 class="temporary_storage_h2">캠페인 정보</h2>

                    <div class="temporary_storage_top">
                        <div class="temporary_storage_title">
                            <h3>임시저장</h3>
                            <p>불러올 캠페인을 클릭하고 불러오기를 눌러주세요.</p>
                        </div>
                        <button class="temporary_storage_open_btn"><i class="xi-angle-down"></i></button>
                    </div>
                    <div class="temporary_storage_list">
                        <ul>
                            <li v-for="tempCampaign in tempCampaigns.data" :key="tempCampaign.id">
                                <input type="radio" name="temp_campaign_id" :id="'temp' + tempCampaign.id" :value="tempCampaign.id" v-model="temp_campaign_id">
                                <label :for="'temp' + tempCampaign.id">
                                    <p class="title">[{{tempCampaign.title_company}}] {{ tempCampaign.title_product }}</p>
                                    <p class="date">{{ tempCampaign.format_created_at }}</p>
                                </label>
                            </li>
                        </ul>
                        <button class="bring_btn" @click="setTempCampaign">불러오기</button>
                    </div>
                </div>

                <div class="write-wrap">
                    <div class="write-wrap-le">
                        <div class="write-box">
                            <div class="write-labal_wrap">
                                <p class="write-labal">캠페인 분류 <span class="Essential">*</span></p>
                            </div>

                            <ul class="Campaign_Classification_list">
                                <li :class="form.type_campaign === 'DELIVERY' ? 'now' : ''">
                                    <a href="#" @click.prevent="form.type_campaign = 'DELIVERY'">배송형</a>
                                </li>
                                <li :class="form.type_campaign === 'VISIT' ? 'now' : ''">
                                    <a href="#" @click.prevent="form.type_campaign = 'VISIT'">방문형</a>
                                </li>
                                <li :class="form.type_campaign === 'REALTIME' ? 'now' : ''">
                                    <a href="#" @click.prevent="form.type_campaign = 'REALTIME'">실시간</a>
                                </li>
                                <li :class="form.type_campaign === 'REPORTER' ? 'now' : ''">
                                    <a href="#" @click.prevent="form.type_campaign = 'REPORTER'">기자단</a>
                                </li>
                            </ul>
                        </div>

                        <div class="write-box">
                            <div class="write-labal_wrap">
                                <p class="write-labal">상호명 <span class="Essential">*</span></p>
                            </div>

                            <div class="input-wrap">
                                <input class="" type="text" placeholder="배송형 캠페인의 경우 브랜드명, 홍보 제품명을 작성해주세요." v-model="form.title_company">

                                <error :form="form" name="title_company" />
                            </div>
                        </div>

                        <div class="write-box">
                            <div class="write-labal_wrap">
                                <p class="write-labal">홍보제품명 <span class="Essential">*</span></p>
                            </div>

                            <div class="input-wrap">
                                <input class="" type="text" placeholder="14자 이내로 적어주세요." v-model="form.title_product">

                                <error :form="form" name="title_product" />
                            </div>
                        </div>

                        <div class="write-box" v-if="form.type_campaign === 'REPORTER'">
                            <div class="write-labal_wrap">
                                <p class="write-labal">원고료 <span class="Essential">*</span></p>
                            </div>

                            <div class="select_st1">
                                <i class="xi-angle-down"></i>
                                <select name="ttt" id="ttt" v-model="form.price_write" required>
                                    <option value="" style="color:gray" disabled selected>원고료 선택</option>
                                    <option value="5000">5000원</option>
                                    <option value="10000">10000원</option>
                                    <option value="15000">15000원</option>
                                    <option value="20000">20000원</option>
                                    <option value="25000">25000원</option>
                                    <option value="30000">30000원</option>
                                </select>
                            </div>
                        </div>

                        <div class="write-box">
                            <div class="write-labal_wrap">
                                <p class="write-labal">제공내역 <span class="Essential">*</span></p>
                            </div>

                            <div class="write-bundle">
                                <textarea name="" id="" placeholder="협찬항목이나 제공하는 내용을 작성해주세요." v-model="form.description_provide"></textarea>
                                <error :form="form" name="description_provide" />
                            </div>
                        </div>

                        <div class="write-box">
                            <div class="write-labal_wrap">
                                <p class="write-labal">캠페인 썸네일 <span class="Essential">*</span></p>
                                <p class="Explanation_p">대표 썸네일부터 순서대로 업로드해주세요.</p>
                            </div>

                            <div class="write-bundle">
                                <input-files title="사진 등록" :multiple="true" max="8" accept="image/*" comment="최대 8장 업로드 가능합니다." @change="data => form.imgs = data" />

                                <error :form="form" name="imgs" />
                            </div>
                        </div>

                        <div class="write-box">
                            <div class="write-labal_wrap">
                                <p class="write-labal">인플루언서 모집 인원 <span class="Essential">*</span></p>
                            </div>
                            <div class="write-bundle">
                                <div class="select_st1">
                                    <i class="xi-angle-down"></i>
                                    <select name="ttt" id="ttt" v-model="form.max_participant">
                                        <option value="" style="color:gray" disabled selected>1 ~ {{max}}명까지 선택 가능합니다</option>
                                        <option :value="count" v-for="count in counts" :key="count">{{count}}</option>
                                    </select>
                                </div>

                                <error :form="form" name="max_participant" />
                                <div class="Gray_p_box">
                                    <p>실시간캠페인 인플루언서 모집 가능시간은 검수요청후 최소 2시간뒤에
                                        모집 가능합니다
                                        인플루언서 모집기간은 모집시작시간 뒤로 최대 24시간까지 설정 가능합니다.</p>
                                </div>
                            </div>
                        </div>

                        <div class="write-box">
                            <div class="write-labal_wrap">
                                <p class="write-labal">인플루언서 모집기간 <span class="Essential">*</span></p>
                            </div>

                            <div class="m-input-dates type01">
                                <div class="input-wrap">
                                    <input class="" type="datetime-local" placeholder="" v-model="form.hire_started_at" ref="hire_started_at" :min="convertDatetime(today)" :max="convertDatetime(today)" v-if="form.type_campaign === 'REALTIME'">
                                    <input class="" type="date" placeholder="" v-model="form.hire_started_at" ref="hire_started_at" :min="convertDate(today)" :max="convertDate(today)" v-else>

                                    <error :form="form" name="hire_started_at" />
                                </div>

                                <span class="deco">~</span>

                                <div class="input-wrap">
                                    <input class="" type="datetime-local" placeholder="" v-model="form.hire_finished_at" ref="hire_finished_at" :min="convertDatetime(today)" :max="convertDatetime(tomorrow)" v-if="form.type_campaign === 'REALTIME'">
                                    <input class="" type="date" placeholder="" v-model="form.hire_finished_at" ref="hire_finished_at" :min="convertDate(today)" v-else>

                                    <error :form="form" name="hire_finished_at" />
                                </div>
                            </div>
                        </div>

                        <div class="write-box">
                            <div class="write-labal_wrap">
                                <p class="write-labal">인플루언서 선정기간 <span class="Essential">*</span></p>
                            </div>
                            <div class="m-input-dates type01">
                                <div class="input-wrap">
                                    <input type="date" placeholder="" v-model="form.select_started_at" ref="select_started_at" disabled class="Deactivation">

                                    <error :form="form" name="select_started_at" />
                                </div>

                                <span class="deco">~</span>

                                <div class="input-wrap">
                                    <input class="" type="date" placeholder="" v-model="form.select_finished_at" ref="select_finished_at" :min="form.select_started_at">

                                    <error :form="form" name="select_finished_at" />
                                </div>
                            </div>
                        </div>

                        <div class="write-box">
                            <div class="write-labal_wrap">
                                <p class="write-labal">컨텐츠 등록기간 <span class="Essential">*</span></p>
                            </div>
                            <div class="m-input-dates type01">
                                <div class="input-wrap">
                                    <input type="date" placeholder="" v-model="form.review_started_at" ref="review_started_at" disabled class="Deactivation">

                                    <error :form="form" name="review_started_at" />
                                </div>

                                <span class="deco">~</span>

                                <div class="input-wrap">
                                    <input class="" type="date" placeholder="" v-model="form.review_finished_at" ref="review_finished_at" :min="form.review_started_at">

                                    <error :form="form" name="review_finished_at" />
                                </div>
                            </div>
                        </div>

                        <div class="write-box">
                            <div class="write-labal_wrap">
                                <p class="write-labal">사업장 운영지역 <span class="Essential">*</span></p>
                            </div>

                            <div class="write-bundle">
                                <input-address @change="(data) => form[data.name] = data.value" :form="form" />
                            </div>
                        </div>

                        <div class="write-box">
                            <div class="write-labal_wrap">
                                <p class="write-labal">제품 유형 <span class="Essential">*</span></p>
                            </div>
                            <div class="Field-ck-wrap">
                                <div class="category-ck" v-for="category in this.$store.state.categories.data" :key="category.id">
                                    <input type="radio" name="categories" :id="category.id" :value="category.id" v-model="form.category_id">
                                    <label :for="category.id">
                                        <div class="img-wrap">
                                            <img :src="category.active.url" alt="" class="active">
                                            <img :src="category.inactive.url" alt="" class="inactive">
                                        </div>
                                        <p class="label-title">{{ category.title }}</p>
                                    </label>
                                </div>
                            </div>

                            <error :form="form" name="category_id" />
                        </div>

                    </div>

                    <div class="write-wrap-ri">

                        <div class="write-box">
                            <div class="write-labal_wrap">
                                <p class="write-labal">모집 인플루언서 유형 <span class="Essential">*</span></p>
                                <p class="Explanation_p">인스타그램 혹은 네이버 블로그 중 하나만 선택가능합니다.</p>
                            </div>
                            <div class="write-bundle">
                                <div class="sns-radio-box">
                                    <input type="radio" name="1" id="a" value="INSTAGRAM" v-model="form.type_sns">
                                    <label for="a"><span><i class="xi-check-min"></i></span>인스타그램</label>
                                </div>
                                <div class="input-wrap" v-if="form.type_sns === 'INSTAGRAM'">
                                    <input class="" type="number" placeholder="최소 팔로워수를 입력해주세요." v-model="form.min_follower">
                                </div>

                                <div class="sns-radio-box">
                                    <input type="radio" name="1" id="b" value="NAVER" v-model="form.type_sns">
                                    <label for="b"><span><i class="xi-check-min"></i></span>네이버</label>
                                </div>

                                <div class="input-wrap" v-if="form.type_sns === 'NAVER'">
                                    <input class="" type="number" placeholder="최소 방문자수를 입력해주세요." v-model="form.min_follower">
                                </div>
                            </div>
                        </div>

                        <div class="write-box">
                            <div class="write-labal_wrap">
                                <p class="write-labal">캠페인 소개글 <span class="Essential">*</span></p>
                            </div>

                            <div class="write-bundle">
                                <textarea name="" id="" placeholder="협찬항목이나 제공하는 내용을 작성해주세요." v-model="form.introduce"></textarea>

                                <error :form="form" name="introduce" />
                            </div>
                        </div>

                        <div class="write-box">
                            <div class="write-labal_wrap">
                                <p class="write-labal">검색 키워드 <span class="Essential">*</span></p>
                            </div>

                            <div class="write-bundle">
									<textarea style="height: 360px;" name="" id="" v-model="form.search_keyword"
                                              placeholder="키워드 관련 안내사항을 입력해주세요.

ex)

- 키워드 중 1개를 선택해 제목 맨 앞에 꼭 넣어 주세요.

- 안내해 드린 키워드를 2개 이상 선택하여 본문, #태그에 2~3회 반복해 작성해 주세요.

- 단어 및 띄어쓰기를 정확하게 사용해야 하며, 지켜지지 않으면 수정 요청이 있을 수 있습니다
"
                                    ></textarea>
                                <error :form="form" name="search_keyword" />
                            </div>
                        </div>

                        <div class="write-box">
                            <div class="write-labal_wrap">
                                <p class="write-labal">캠페인미션 <span class="Essential">*</span></p>
                            </div>

                            <div class="write-bundle">
									<textarea style="height: 800px;" name="" id="" v-model="form.mission" placeholder="캠패인 충북 미션을 입력해주세요.

ex)

* 구매평 미션

- 선정 당일에 해당 상품 상세페이지에서 선구매 후 바로 결제내역을 마이페이지에 1차 등록해주셔야 합니다.

- 결제 시 쿠폰이나 포인트 결제 불가입니다.

- 제공 받으신 제품 사진 첨부하여 포토리뷰 필수입니다.

* 블로그 리뷰 미션

- 천연수세미로 설거지한 사진 첨부해주세요.

- 소프넛으로 거품 낸 사진 첨부해주세요.

- 대나무칫솔로 양치해보기 or 스텐빨대로 음료 마셔보기

- 지인에게 친환경제품 소개하기

- 리뷰 제목에 정확한 업체명으로 꼭 넣어 주세요.

- 리뷰 하단에 스토어 링크 필수 첨부해주세요.

- 자사몰 링크를 함께 삽입해주세요. (링크는 선정톡 내 안내사항 확인 필수)

- 가능하신 분들은 스토어찜이나 상품찜을 같이 해주세요.

- 제품으로 양치나 설거지를 하는 등 활용하는 사진을 함께 첨부해주세요.
									"></textarea>
                                <error :form="form" name="mission" />
                            </div>
                        </div>


                        <div class="write-box">
                            <div class="write-labal_wrap">
                                <p class="write-labal">신청인원이 미달되어도 해당 캠페인을 진행 하시겠습니까? <span class="Essential">*</span></p>
                            </div>
                            <div class="write-bundle">
                                <div class="radio-wrap1">
                                    <div class="radio-box">
                                        <input type="radio" name="Gender" id="Man" :value="0" v-model="form.have_to_satisfied">
                                        <label for="Man">진행</label>
                                    </div>
                                    <div class="radio-box">
                                        <input type="radio" name="Gender" id="Woman" :value="1" v-model="form.have_to_satisfied">
                                        <label for="Woman">미 진행</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="write-btn-wrap">
                    <button type="button" class="temporary_storage_btn" @click.prevent="storeTemp">임시저장</button>
                    <button type="button" class="Registration_btn" @click="activeAsk = true">캠페인 등록</button>
                </div>



                <!-- 팝업============================================================================ -->

                <!-- 미달되어도 진행캠페인 -->
                <div class="pop-box Warning-pop open" v-if="activeAsk">
                    <button class="close-btn" @click="activeAsk = false"><i class="xi-close"></i></button>
                    <div class="pop-scroll-wrap">
                        <div class="pop-txt" v-if="form.have_to_satisfied">
                            <p class="top-txt">해당 캠페인은 <br>
                                <span>해당 캠페인은 신청인원이 미달되면 <br>
										진행하지 않는 캠페인입니다</span></p>
                            <p class="bt-txt">그대로 진행하시겠습니까? <br>
                                진행 후에는 변경이 불가합니다.</p>
                        </div>
                        <div class="pop-txt" v-else>
                            <p class="top-txt">해당 캠페인은 <br>
                                <span>신청인원이 미달되어도 진행하는 캠페인</span> 입니다</p>
                            <p class="bt-txt">그대로 진행하시겠습니까? <br>
                                진행 후에는 변경이 불가합니다.</p>
                        </div>
                        <div class="pop_btn_wrap">
                            <button class="pop_close_btn" @click="activeAsk = false">취소</button>
                            <a href="" class="save_btn" @click.prevent="store">저장</a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </main>
</template>

<script>
import Form from "../../utils/Form";
export default {
    middleware: ["auth"],

    data(){
        return {
            activeAsk : false,

            tempCampaigns: {
                data: [],
                links : {},
                meta: {}
            },

            temp_campaign_id: "",

            form : new Form(this.$axios, {
                temp: 0,
                type_campaign: "DELIVERY",
                title_company: "",
                title_product: "",
                description_provide: "",
                imgs: [],
                max_participant: "",

                hire_started_at: "",
                hire_finished_at: "",
                select_started_at: "",
                select_finished_at: "",
                review_started_at: "",
                review_finished_at: "",

                address: "",
                address_detail: "",
                address_zipcode: "",
                category_id: "",

                type_sns: "",
                introduce: "",
                search_keyword: "",
                mission : "",
                have_to_satisfied: 0,
                price_write: "",
                min_follower: "",
            }),

            max: 20,
        }
    },
    methods: {
        getTempCampaigns(){
            this.$axios.get("/api/campaigns", {
                params: {
                    user_id: this.$auth.user.data.id,
                    temp: 1,
                    open: 1,
                    accept: 0,
                    take: 3,
                }
            }).then(response => {
                this.tempCampaigns = response.data;
            });
        },

        setTempCampaign(){
            let campaign = this.tempCampaigns.data.find(tempCampaign => tempCampaign.id == this.temp_campaign_id);

            if(campaign)
                this.form.set(campaign);
        },

        storeTemp(){
            this.form.temp = 1;

            this.form.post("/api/campaigns")
                .then(response => {
                    this.$store.commit("setPop", {
                        title : "저장완료"
                    });

                    this.tempCampaigns.data.push(response.data);
                })
        },

        store(){
            this.activeAsk = false;

            this.form.temp = 0;

            this.form.post("/api/campaigns")
                .then(response => {
                    this.$store.commit("setPop", {
                        title : "등록완료",
                    });

                    this.$router.back();
                });
        },



        setMinHireFinishedAt(){

        },

        convertDatetime(date){
            return date.toISOString().slice(0,-8);
        },
        convertDate(date){
            return date.toISOString().slice(0,10);
        },

        addDay(date){
            date.setDate(date.getDate() + 1);

            return date;
        },
    },

    computed: {
        counts(){
            let items = [];

            for(let i = 1;  i <= this.max; i++){
                items.push(i);
            }

            return items;
        },

        today(){
            return new Date();
        },

        tomorrow(){
            let date = new Date();

            date.setDate(date.getDate() + 1);

            return date;
        },
    },

    mounted() {
        this.getTempCampaigns();

        $(".temporary_storage_open_btn").click(function () {
            $(".temporary_storage_wrap").toggleClass("open");
        })

        $(".close-btn").click(function () {
            $(this).parent(".pop-box").removeClass("open")
        })

        $(".pop_close_btn").click(function () {
            $(this).parent(".pop_btn_wrap").parent(".pop-scroll-wrap").parent(".pop-box").removeClass("open")
        })

        $(".Registration_btn").click(function () {
            $(".Warning-pop").addClass("open");
        })
    },

    watch: {
        'form.hire_finished_at': function(newVal, oldVal) {
            if(!newVal)
                return "";

            let date = new Date(newVal);

            this.form.select_started_at = this.convertDate(this.addDay(date));
        },

        'form.select_finished_at': function(newVal, oldVal) {
            if(!newVal)
                return "";

            let date = new Date(newVal);

            this.form.review_started_at = this.convertDate(this.addDay(date));
        },

        'form.type_campaign': function(newVal, oldVal) {
            if(newVal === "REALTIME"){
                this.form.hire_started_at = "";
                this.form.hire_finished_at = "";
            }
        }
    }
}
</script>

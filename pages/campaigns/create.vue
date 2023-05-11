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
                                <p class="write-labal" style="justify-content: center;">캠페인 노출 미리보기</p>
                            </div>

                            <ul>
                                <example-campaign :campaign="form" />
                            </ul>
                        </div>

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
                                <p class="write-labal">{{titleCompany}} <span class="Essential">*</span></p>
                            </div>

                            <div class="input-wrap">
                                <input class="" type="text" placeholder="소개하고자 하는 제품의 브랜드명을 입력해주세요." v-model="form.title_company">

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
                                    <option value="10000">10,000원</option>
                                    <option value="15000">15,000원</option>
                                    <option value="20000">20,000원</option>
                                    <option value="25000">25,000원</option>
                                    <option value="30000">30,000원</option>
                                </select>
                            </div>
                        </div>

                        <div class="write-box">
                            <div class="write-labal_wrap">
                                <p class="write-labal">{{ form.type_campaign === 'REPORTER' ? '참고할 대표 URL' : '제공내역' }} <span class="Essential">*</span></p>
                            </div>

                            <div class="write-bundle">
                                <textarea name="" id="" :placeholder="form.type_campaign === 'REPORTER' ? '홈페이지 주소 및 구매처 URL 등을 입력해주세요.' : '인플루언서들에게 제공할 제품이나 서비스를 구체적으로 작성해주세요.'" v-model="form.description_provide"></textarea>
                                <error :form="form" name="description_provide" />
                            </div>
                        </div>

                        <div class="write-box">
                            <div class="write-labal_wrap">
                                <p class="write-labal">캠페인 썸네일 <span class="Essential">*</span></p>
                                <p class="Explanation_p">대표 썸네일부터 순서대로 업로드해주세요.</p>
                            </div>

                            <div class="write-bundle">
                                <input-files title="사진 등록" :multiple="true" max="8" accept="image/*" comment="최대 8장 업로드 가능합니다." @change="changeFiles" />

                                <error :form="form" name="imgs" />
                            </div>
                        </div>

                        <div class="write-box">
                            <div class="write-labal_wrap">
                                <p class="write-labal">캠페인 상세이미지 <span class="Essential">*</span></p>
                            </div>

                            <div class="write-bundle">
                                <input-files id="img_detail" title="사진 등록" :multiple="false" max="1" accept="image/*" @change="(data) => {form.img_detail = data[0]}" />

                                <error :form="form" name="img_detail" />
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
                                    <p v-if="form.type_campaign === 'REPORTER'">
                                        기자단 캠페인은 실물의 제품 및 서비스를 제공하는 것이 아닌, 사장님이 선정하신 인플루언서들에게 소정의 원고료, 소개하고자 하는 제품 및 서비스의 사진, 캠페인 미션 등을 제공하고 해당 요소들을 활용하여 포스팅을 작성하는 캠페인입니다. 리뷰 등록까지 확인 되면, 설정하신 원고료를 리뷰어에게 지급해주시면 됩니다.
                                    </p>
                                    <p v-else>캠페인 등록신청은 순차적으로 검수 후 승인됩니다.<br/>영업시간(평일 오전 10시~오후5시) 기준 평균 3~5시간이내 오픈 예상</p>
                                </div>
                            </div>
                        </div>

                        <div class="write-box">
                            <div class="write-labal_wrap">
                                <p class="write-labal" v-if="form.type_campaign === 'REALTIME'">인플루언서 모집시간 <span class="Essential">*</span></p>
                                <p class="write-labal" v-else>인플루언서 모집기간 <span class="Essential">*</span></p>
                            </div>

                            <div class="write-bundle">
                                <div class="m-input-dates type01">
                                    <div class="input-wrap">
                                        <input class="" type="datetime-local" placeholder="" v-model="form.hire_started_at" ref="hire_started_at" :min="convertDatetime(today)" :max="convertDatetime(today)" v-if="form.type_campaign === 'REALTIME'">
                                        <input class="" type="date" placeholder="" v-model="form.hire_started_at" ref="hire_started_at" :min="convertDate(today)" :max="convertDate(createDate(null, 3))"  v-else>

                                        <error :form="form" name="hire_started_at" />
                                    </div>

                                    <span class="deco">~</span>

                                    <div class="input-wrap">
                                        <input class="" type="datetime-local" placeholder="" v-model="form.hire_finished_at" ref="hire_finished_at"  :min="convertDatetime(today)" :max="convertDatetime(today)" v-if="form.type_campaign === 'REALTIME'">
                                        <input class="" type="date" placeholder="" v-model="form.hire_finished_at" ref="hire_finished_at" :min="convertDate(today)" :max="convertDate(createDate(form.hire_started_at, 14))" v-else>

                                        <error :form="form" name="hire_finished_at" />
                                    </div>
                                </div>

                                <div class="Gray_p_box" v-if="form.type_campaign === 'REALTIME'">
                                    <p>
                                        실시간 캠페인은 ‘당일 방문형 캠페인’으로, 당일 매장 방문시간을 설정하여 정해진 방문시간에 선정된 인플루언서가 방문하여 약속된 제공내역을 체험 후, 광고주가 지정한 컨텐츠 등록기간 내 리뷰를 작성 및 등록합니다.

                                        <br/><br/>‘실시간 방문형 캠페인’은 모집기간 및 선정기간이 설정하신 ‘당일 방문가능 시간’ 시작 전까지 고정됩니다. 설정하신 ‘당일 방문가능 시간’에는 캠페인 모집이 자동으로 마감됩니다.
                                    </p>
                                </div>
                                <div class="Gray_p_box" v-else>
                                    <p>해당 캠페인에 참여하고자 하는 인플루언서들을 모집하는 기간입니다. <br/>최대한 많은 인원을 모집하여 하고 싶으시다면, 일정을 넉넉하게 설정해주세요!</p>

                                    <p class="alert" style="margin-top:8px;">※ 기간 내 미선정시 우리뷰 추천순으로 자동 선정</p>
                                </div>
                            </div>

                        </div>

                        <div class="write-box">
                            <div class="write-labal_wrap">
                                <p class="write-labal">인플루언서 선정기간 <span class="Essential">*</span></p>
                            </div>
                            <div class="write-bundle">
                                <div class="m-input-dates type01">
                                    <div class="input-wrap">
                                        <input type="date" placeholder="" v-model="form.select_started_at" ref="select_started_at" disabled class="Deactivation">

                                        <error :form="form" name="select_started_at" />
                                    </div>

                                    <span class="deco">~</span>

                                    <div class="input-wrap">
                                        <input class="" type="date" placeholder="" v-model="form.select_finished_at" ref="select_finished_at" :min="form.select_started_at" :max="convertDate(createDate(form.select_started_at, 2))">

                                        <error :form="form" name="select_finished_at" />
                                    </div>
                                </div>

                                <div class="Gray_p_box">
                                    <p>
                                        캠페인에 참여신청을 한 인플루언서들 중, 제품 및 서비스와 가장 잘 어울리는 인플루언서를 사장님께서 직접 선정해주세요! (별도의 선정 없이 기간이 지나면 우리뷰 추천순위에 따라 자동선정 될 수 있습니다!)
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="write-box">
                            <div class="write-labal_wrap">
                                <p class="write-labal">리뷰어 컨텐츠 등록기간 <span class="Essential">*</span></p>
                            </div>
                            <div class="write-bundle">
                                <div class="m-input-dates type01">
                                    <div class="input-wrap">
                                        <input type="date" placeholder="" v-model="form.review_started_at" ref="review_started_at" disabled class="Deactivation">

                                        <error :form="form" name="review_started_at" />
                                    </div>

                                    <span class="deco">~</span>

                                    <div class="input-wrap">
                                        <input class="" type="date" placeholder="" v-model="form.review_finished_at" ref="review_finished_at" :min="form.review_started_at" :max="convertDate(createDate(form.review_started_at, 21))">

                                        <error :form="form" name="review_finished_at" />
                                    </div>
                                </div>

                                <div class="Gray_p_box">
                                    <p v-if="form.type_campaign === 'REALTIME'">
                                        선정 된 인플루언서들에게 제공내역을 제공하고, 해당 제품과 서비스를 체험한 리뷰어가 각자의 미디어 계정에 후기성 글을 작성하는 기간입니다. <br/>매장 방문기간이 포함된 일정이니 참고 부탁드립니다.
                                    </p>
                                    <p v-else>
                                        선정 된 인플루언서들에게 제공내역을 제공하고, 해당 제품과 서비스를 체험한 리뷰어가 각자의 미디어 계정에 후기성 글을 작성하는 기간입니다. <br/>배송기간과 방문기간이 포함된 기간인 만큼, 조금 넉넉하게 설정해주세요!
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="write-box">
                            <div class="write-labal_wrap">
                                <p class="write-labal">실 사업장 주소 <span class="Essential">*</span></p>
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

                                <div class="sns-radio-box">
                                    <input type="radio" name="1" id="b" value="NAVER" v-model="form.type_sns">
                                    <label for="b"><span><i class="xi-check-min"></i></span>네이버</label>
                                </div>
                            </div>
                        </div>

                        <div class="write-box">
                            <div class="write-labal_wrap">
                                <p class="write-labal">캠페인 안내 <span class="Essential">*</span></p>
                            </div>

                            <div class="write-bundle">
                                <textarea name="" id="" placeholder="중요한 안내사항 및 참여하고자 하는 인플루언서들에게 제품이나 캠페인의 간단한 소개 등을 작성해주세요" v-model="form.introduce"></textarea>

                                <error :form="form" name="introduce" />

                                <div class="Gray_p_box">
                                    <p>캠페인 안내는 캠페인 상세페이지에서 노출될 내용입니다.</p>
                                </div>
                            </div>
                        </div>

                        <div class="write-box">
                            <div class="write-labal_wrap">
                                <p class="write-labal">검색 키워드 <span class="Essential">*</span></p>
                            </div>

                            <div class="write-bundle">
									<textarea style="height: 360px;" name="" id="" v-model="form.search_keyword" :placeholder="searchKeywordPlaceholder"></textarea>
                                <error :form="form" name="search_keyword" />
                            </div>
                        </div>

                        <div class="write-box">
                            <div class="write-labal_wrap">
                                <p class="write-labal">캠페인미션 <span class="Essential">*</span></p>
                            </div>

                            <div class="write-bundle">
									<textarea style="height: 800px;" name="" id="" v-model="form.mission" :placeholder="missionPlaceholder"></textarea>
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
                img_detail:"",
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
                min_follower: 0,

                img: null,
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

        changeFiles(data){
            this.form.imgs = data;

            this.form.img = {
                url: URL.createObjectURL(this.form.imgs[0])
            };
        },

        createDate(date, addDays){
            let createdDate = date ? new Date(date) : new Date();

            createdDate.setDate(createdDate.getDate() + addDays);

            return createdDate;
        }
    },

    computed: {
        counts(){
            let items = [1];

            for(let i = 1;  i <= this.max; i++){
                if(i % 5 === 0)
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


        searchKeywordPlaceholder(){
            if(this.form.type_campaign === 'DELIVERY')
                return "예시)\n" +
                    "메인 키워드 : 약과\n" +
                    "서브 키워드 : 약과선물세트, 가정의달 선물, 부모님 선물, 선물추천, 통밀약과\n" +
                    "\n" +
                    "# 노출할 메인키워드를 제목 가장 앞에 기재해주세요.\n" +
                    "# 포스팅 제목에 작성한 키워드를 본문에도 6번 이상 사용해주세요.\n" +
                    "# 제목은 모바일에서 보기 좋게 간결할수록 좋습니다. (굵고짧게)\n"

            if(this.form.type_campaign === 'VISIT')
                return "예시)\n" +
                    "메인 키워드 : 상호명, 지역명, 지역+상호명, 지역명+술집, 지역명+맛집\n" +
                    "서브 키워드 : 술집, 하이볼, 조용한 술집, 데이트하기 좋은 식당, 맥주, 호프집, 선술집\n" +
                    "\n" +
                    "# 키워드 중 1개를 선택하여 제목과 본문에 4번이상 넣어주세요\n"

            if(this.form.type_campaign === 'REALTIME')
                return "예시)\n" +
                    "메인 키워드 : 상호명, 지역명, 지역+상호명, 지역명+술집, 지역명+맛집\n" +
                    "서브 키워드 : 술집, 하이볼, 조용한 술집, 데이트하기 좋은 식당, 맥주, 호프집, 선술집\n" +
                    "\n" +
                    "# 키워드 중 1개를 선택하여 제목과 본문에 4번이상 넣어주세요\n"

            if(this.form.type_campaign === 'REPORTER')
                return "예시)\n" +
                    "메인 키워드 : 상호명, 지역명, 지역+상호명, 지역명+술집, 지역명+맛집\n" +
                    "서브 키워드 : 술집, 하이볼, 조용한 술집, 데이트하기 좋은 식당, 맥주, 호프집, 선술집\n" +
                    "\n" +
                    "# 키워드 중 1개를 선택하여 제목과 본문에 4번이상 넣어주세요\n"
        },
        missionPlaceholder(){
            if(this.form.type_campaign === 'DELIVERY')
                return "캠페인의 중요한 안내사항 및 캠페인에 참여하고자 하는 인플루언서들에게 제품이나 캠페인의 간단한 소개 등을 작성해주세요!’"

            if(this.form.type_campaign === 'VISIT')
                return "캠페인의 중요한 안내사항 및 캠페인에 참여하고자 하는 인플루언서들에게 매장이나 캠페인의 간단한 소개 등을 작성해주세요!’"

            if(this.form.type_campaign === 'REALTIME')
                return "캠페인의 중요한 안내사항 및 캠페인에 참여하고자 하는 인플루언서들에게 매장이나 캠페인의 간단한 소개 등을 작성해주세요!’"

            if(this.form.type_campaign === 'REPORTER')
                return "캠페인의 중요한 안내사항 및 캠페인에 참여하고자 하는 인플루언서들에게 매장이나 캠페인의 간단한 소개 등을 작성해주세요!’"
        },
        titleCompany(){
            if(this.form.type_campaign === 'DELIVERY')
                return "지역/상호명(매장명)";

            return "상호명(브랜드명)"
        }
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

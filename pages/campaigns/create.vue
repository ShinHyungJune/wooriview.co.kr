<template>
    <main id="main" class="MyPage Campaign_Registration">
        <div class="Campaign_Registration_top_wrap">
            <div class="container3">
                <div class="Campaign_Registration_top">
                    <div class="le_p">
                        캠페인 등록 시 주의사항

                        <nuxt-link to="/qnas/create" class="link">문의사항이 있다면?</nuxt-link>
                    </div>
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
                                <button class="btn-remove" @click="removeCampaign(tempCampaign)">
                                    <i class="xi-close"></i>
                                </button>
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
                                <li :class="form.type_campaign === 'REVIEW' ? 'now' : ''">
                                    <a href="#" @click.prevent="form.type_campaign = 'REVIEW'">구매평</a>
                                </li>
                            </ul>
                        </div>

                        <div class="write-box">
                            <div class="write-labal_wrap">
                                <p class="write-labal">{{titleCompany}} <span class="Essential">*</span></p>
                            </div>

                            <div class="input-wrap">
                                <input class="" type="text" :placeholder="titlePlaceholder" v-model="form.title_company">

                                <error :form="form" name="title_company" />
                            </div>
                        </div>

                        <div class="write-box">
                            <div class="write-labal_wrap">
                                <p class="write-labal">제공내역 <span class="Essential">*</span></p>
                            </div>

                            <div class="input-wrap">
                                <input class="" type="text" placeholder="14자 이내로 적어주세요." v-model="form.title_product" @input="checkTitleProduct">

                                <error :form="form" name="title_product" />
                            </div>
                        </div>

                        <div class="write-box help-mark" v-if="form.type_campaign === 'REPORTER'">
                            <div class="write-labal_wrap">
                                <p class="write-labal" style="min-width:auto; margin-right:10px;">원고료 <span class="Essential">*</span></p>
                                <i class="xi-help-o help-btn" data-target="pop-up_price_write"></i>
                            </div>

                            <div class="write-bundle">
                                <div class="guide-popUp pop-up_price_write">
                                    <button class="close-btn"><i class="xi-close"></i></button>
                                    <div class="guide-content">
                                        <p>인플루언서의 컨텐츠(리뷰) 등록 후 약속된 원고료를 지급해주세요!</p>
                                    </div>
                                </div>

                                <div class="select_st1">
                                    <i class="xi-angle-down"></i>
                                    <select name="ttt" id="ttt" v-model="form.price_write" required>
                                        <option value="" style="color:gray" disabled selected>원고료 선택</option>
                                        <option value="5000">5,000원</option>
                                        <option value="10000">10,000원</option>
                                        <option value="15000">15,000원</option>
                                        <option value="20000">20,000원</option>
                                        <option value="25000">25,000원</option>
                                        <option value="30000">30,000원</option>
                                    </select>
                                </div>
                            </div>

                            <div class="write-bundle">
                                <div class="Consent-form" style="padding-left:0; margin-top:12px;">
                                    <div class="Consent-ck">
                                        <input type="checkbox" name="agree_write" id="agree_write" v-model="agree_write">
                                        <label for="agree_write" style="word-break: keep-all">
                                            <span class="ck-from"><i class="xi-check-min"></i></span>
                                            컨텐츠 등록기간 마감일 이후 3일 이내 원고료를 지급하는 것에 동의합니다.
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!--
                        <div class="write-box">
                            <div class="write-labal_wrap">
                                <p class="write-labal">{{ form.type_campaign === 'REPORTER' ? '참고할 대표 URL' : '제공내역' }} <span class="Essential">*</span></p>
                            </div>

                            <div class="write-bundle">
                                <div class="input-wrap">
                                    <input name="" id="" :placeholder="form.type_campaign === 'REPORTER' ? '홈페이지 주소 및 구매처 URL 등을 입력해주세요.' : '14자 이내로 적어주세요.'" v-model="form.description_provide"></input>
                                </div>
                                <error :form="form" name="description_provide" />
                            </div>
                        </div>
                        -->

                        <div class="write-box" v-if="form.type_campaign !== 'REVIEW' && form.type_campaign !== 'REPORTER'">
                            <div class="write-labal_wrap">
                                <p class="write-labal">제공할 제품 및 서비스의 가격을 입력해주세요. <span class="Essential">*</span></p>
                            </div>

                            <div class="write-bundle">
                                <textarea name="" id="" v-model="form.product_and_price" placeholder="인플루언서들에게 제공할 제품이나 서비스의 가격을 입력해주세요.
ex) 50,000원 상당 제공"></textarea>
                                <error :form="form" name="product_and_price" />
                            </div>
                        </div>

                        <div class="write-box" v-if="form.type_campaign === 'REVIEW'">
                            <div class="write-labal_wrap">
                                <p class="write-labal">환급 예정 금액(총 결제 금액) <span class="Essential">*</span></p>
                            </div>

                            <div class="write-bundle">
                                <textarea name="" id="" v-model="form.review_refund_price" placeholder="인플루언서들에게 환급 예정인 금액을 입력해주세요.
(제품가격 + 배송비 포함)"></textarea>
                                <error :form="form" name="review_refund_price"/>
                            </div>

                            <div class="write-bundle" style="margin-top:12px;">
                                <div class="sns-radio-box">
                                    <input type="checkbox" name="" id="agree_review_refund_price" v-model="agree_review_refund_price">
                                    <label for="agree_review_refund_price" style="font-size:12px; color:black;"><span><i class="xi-check-min"></i></span>컨텐츠 등록기간 마감일 이후 3일 이내 환급 금액을 지급하는 것에 동의합니다.</label>
                                </div>
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
                                <p class="write-labal">캠페인 상세이미지</p>
                            </div>

                            <div class="write-bundle">
                                <input-files id="img_detail" title="사진 등록" :multiple="true" accept="image/*" @change="(data) => {form.img_detail = data}" />

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
                                    <p v-else>캠페인 등록신청은 운영팀에서 순차적으로 검수 후 승인됩니다.<br/>(평균 영업시간 기준 3~5시간 이내 승인)</p>
                                </div>
                            </div>
                        </div>

                        <div v-if="form.type_campaign === 'REALTIME'">
<!--                            <div class="write-box help-mark">
                                <div class="write-labal_wrap">
                                    <p class="write-labal">인플루언서 방문 시작 시간 <span class="Essential">*</span></p>
                                    <i class="xi-help-o help-btn" data-target="pop-up_realtime_start"></i>
                                </div>
                                <div class="write-bundle">
                                    <div class="m-input-dates type01">
                                        <div class="input-wrap input-date">
                                            <input type="datetime-local" id="visit_started_at" placeholder="" v-model="for_setting_visit_started_at" ref="for_setting_visit_started_at" :min="convertDatetime(today)" :max="convertDatetime(today)">

                                            <error :form="form" name="visit_started_at" />
                                        </div>
                                    </div>

                                    <div class="guide-popUp pop-up_realtime_start">
                                        <button class="close-btn"><i class="xi-close"></i></button>
                                        <div class="guide-content">
                                            <p>
                                                캠페인에 참여할 인플루언서가 오늘 방문하여 체험할 시간을 설정해주세요!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>-->

                            <!--
                            <div class="write-box">
                                <div class="write-labal_wrap">
                                    <p class="write-labal">리뷰어 컨텐츠 등록기간 <span class="Essential">*</span></p>
                                </div>
                                <div class="write-bundle">
                                    <div class="m-input-dates type01">
                                        <div class="input-wrap">
                                            <input type="date" placeholder="" v-model="form.review_finished_at" ref="review_finished_at" :min="convertDate(today)" :max="convertDate(createDate(form.select_started_at, 2))">

                                            <error :form="form" name="review_finished_at" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            -->

                            <div class="write-box help-mark">
                                <div class="write-labal_wrap">
                                    <p class="write-labal">인플루언서 모집시간 <span class="Essential">*</span></p>
                                    <i class="xi-help-o help-btn pop-up_recruitment"></i>
                                </div>

                                <div class="write-bundle">
                                    <div class="m-input-dates type01">
                                        <div class="input-wrap">
                                            <input disabled class="Deactivation" type="datetime-local" placeholder="" v-model="form.hire_started_at" ref="hire_started_at">

                                            <error :form="form" name="hire_started_at" />
                                        </div>

                                        <span class="deco">~</span>

                                        <div class="input-wrap">
                                            <input disabled class="Deactivation" type="datetime-local" placeholder="" v-model="form.hire_finished_at" ref="hire_finished_at" >

                                            <error :form="form" name="hire_finished_at" />
                                        </div>
                                    </div>

                                    <div class="guide-popUp pop-up_recruitment-box">
                                        <button class="close-btn">
                                            <i class="xi-close"></i>
                                        </button>
                                        <div class="guide-content">
                                            <p>
                                                실시간 캠페인은 ‘당일 방문형 캠페인’으로, 당일 매장 방문시간을 설정하여 정해진 방문시간에 선정된 인플루언서가 방문하여 약속된 제공내역을 체험 후, 광고주가 지정한 컨텐츠 등록기간 내 리뷰를 작성 및 등록합니다.
                                                <br/>‘실시간 방문형 캠페인’은 모집기간 및 선정기간이 설정하신 ‘당일 방문가능 시간’ 시작 전까지 고정됩니다. 설정하신 ‘당일 방문가능 시간’에는 캠페인 모집이 자동으로 마감됩니다.
                                            </p>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="write-box help-mark">
                                <div class="write-labal_wrap">
                                    <p class="write-labal">인플루언서 방문시간 <span class="Essential">*</span></p>
                                    <i class="xi-help-o help-btn pop-up_selection"></i>
                                    <p class="Explanation_p">시간 내 미선정시 우리뷰 추천순으로 자동 선정</p>
                                </div>
                                <div class="write-bundle">
                                    <div class="m-input-dates type01">
                                        <div class="input-wrap">
                                            <input type="datetime-local" placeholder="" v-model="form.select_started_at" ref="select_started_at" :min="convertDatetime(today)" :max="convertDatetime(addDays(new Date(), 1))">

                                            <error :form="form" name="select_started_at" />
                                        </div>

                                        <span class="deco">~</span>

                                        <div class="input-wrap">
                                            <input disabled class="Deactivation" type="datetime-local" placeholder="" v-model="form.select_finished_at" ref="select_finished_at">

                                            <error :form="form" name="select_finished_at" />
                                        </div>
                                    </div>

                                    <div class="guide-popUp pop-up_selection-box">
                                        <button class="close-btn">
                                            <i class="xi-close"></i>
                                        </button>
                                        <div class="guide-content">
                                            <p>
                                                캠페인에 참여신청을 한 인플루언서들 중, 제품 및 서비스와 가장 잘 어울리는 인플루언서를 사장님께서 직접 선정해주세요! <br />
                                                (별도의 선정 없이 기간이 지나면 우리뷰 추천순위에 따라 자동선정 될 수 있습니다!)
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="write-box help-mark">
                                <div class="write-labal_wrap">
                                    <p class="write-labal">리뷰어 컨텐츠 등록기간 <span class="Essential">*</span></p>
                                    <i class="xi-help-o help-btn pop-up_contents"></i>
                                    <p class="Explanation_p" v-if="form.type_campaign === 'VISIT' || form.type_campaign === 'REALTIME'">매장 방문기간 포함 일정</p>
                                    <p class="Explanation_p" v-if="form.type_campaign === 'DELIVERY'">택배 배송기간 포함 일정</p>
                                </div>
                                <div class="write-bundle">
                                    <div class="m-input-dates type01">
                                        <div class="input-wrap">
                                            <input type="date" id="review_started_at" placeholder="" v-model="form.review_started_at" ref="review_started_at" disabled class="Deactivation">


                                            <error :form="form" name="review_started_at" />
                                        </div>

                                        <span class="deco">~</span>

                                        <div class="input-wrap">
                                            <input class="" type="date" placeholder="" v-model="form.review_finished_at" ref="review_finished_at" :min="convertDate(createDate(form.review_started_at, 7))" :max="convertDate(createDate(form.review_started_at, 14))">

                                            <error :form="form" name="review_finished_at" />
                                        </div>
                                    </div>

                                    <div class="guide-popUp pop-up_contents-box">
                                        <button class="close-btn">
                                            <i class="xi-close"></i>
                                        </button>
                                        <div class="guide-content">
                                            <p v-if="form.type_campaign === 'REALTIME'">
                                                선정 된 인플루언서들에게 제공내역을 제공하고, 해당 제품과 서비스를 체험한 리뷰어가 각자의 미디어 계정에 후기성 글을 작성하는 기간입니다. <br/>매장 방문기간이 포함된 일정이니 참고 부탁드립니다.
                                            </p>
                                            <p v-else>
                                                선정 된 인플루언서들에게 제공내역을 제공하고, 해당 제품과 서비스를 체험한 리뷰어가 각자의 미디어 계정에 후기성 글을 작성하는 기간입니다. <br/>배송기간과 방문기간이 포함된 기간인 만큼, 조금 넉넉하게 설정해주세요!
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div v-else>
                            <div class="write-box help-mark">
                                <div class="write-labal_wrap">
                                    <p class="write-labal">인플루언서 모집기간 <span class="Essential">*</span></p>
                                    <i class="xi-help-o help-btn pop-up_recruitment"></i>
                                </div>

                                <div class="write-bundle">
                                    <div class="m-input-dates type01">
                                        <div class="input-wrap">
                                            <input class="" type="date" placeholder="" v-model="form.hire_started_at" ref="hire_started_at" :min="convertDate(today)" :max="convertDate(createDate(null, 3))">

                                            <error :form="form" name="hire_started_at" />
                                        </div>

                                        <span class="deco">~</span>

                                        <div class="input-wrap">
                                            <input class="" type="date" placeholder="" v-model="form.hire_finished_at" ref="hire_finished_at" :min="convertDate(today)" :max="convertDate(createDate(form.hire_started_at, 14))">

                                            <error :form="form" name="hire_finished_at" />
                                        </div>
                                    </div>

                                    <div class="guide-popUp pop-up_recruitment-box">
                                        <button class="close-btn">
                                            <i class="xi-close"></i>
                                        </button>
                                        <div class="guide-content">
                                            <p>
                                                해당 캠페인에 참여하고자 하는 인플루언서들을 모집하는 기간입니다.
                                                <br/>최대한 많은 인원을 모집하여 하고 싶으시다면, 일정을 넉넉하게 설정해주세요!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="write-box help-mark">
                                <div class="write-labal_wrap">
                                    <p class="write-labal">인플루언서 선정기간 <span class="Essential">*</span></p>
                                    <i class="xi-help-o help-btn pop-up_selection"></i>
                                    <p class="Explanation_p">시간 내 미선정시 우리뷰 추천순으로 자동 선정</p>
                                </div>
                                <div class="write-bundle">
                                    <div class="m-input-dates type01">
                                        <div class="input-wrap">
                                            <input type="date" placeholder="" v-model="form.select_started_at" ref="select_started_at" disabled class="Deactivation">

                                            <error :form="form" name="select_started_at" />
                                        </div>

                                        <span class="deco">~</span>

                                        <div class="input-wrap">
                                            <input class="" type="date" placeholder="" v-model="form.select_finished_at" ref="select_finished_at" :min="form.select_started_at" :max="convertDate(createDate(form.select_started_at, 1))">

                                            <error :form="form" name="select_finished_at" />
                                        </div>
                                    </div>

                                    <div class="guide-popUp pop-up_selection-box">
                                        <button class="close-btn">
                                            <i class="xi-close"></i>
                                        </button>
                                        <div class="guide-content">
                                            <p>
                                                캠페인에 참여신청을 한 인플루언서들 중, 제품 및 서비스와
                                                <br/>가장 잘 어울리는 인플루언서를 사장님께서 직접 선정해주세요!
                                                <br/>(별도의 선정 없이 기간이 지나면 우리뷰 추천순위에 따라 자동선정 될 수 있습니다!)
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="write-box help-mark">
                                <div class="write-labal_wrap">
                                    <p class="write-labal">리뷰어 컨텐츠 등록기간 <span class="Essential">*</span></p>
                                    <i class="xi-help-o help-btn pop-up_contents"></i>
                                    <p class="Explanation_p" v-if="form.type_campaign === 'VISIT' || form.type_campaign === 'REALTIME'">매장 방문기간 포함 일정</p>
                                    <p class="Explanation_p" v-if="form.type_campaign === 'DELIVERY'">택배 배송기간 포함 일정</p>
                                </div>
                                <div class="write-bundle">
                                    <div class="m-input-dates type01">
                                        <div class="input-wrap">
                                            <input type="date" placeholder="" v-model="form.review_started_at" ref="review_started_at" disabled class="Deactivation">

                                            <error :form="form" name="review_started_at" />
                                        </div>

                                        <span class="deco">~</span>

                                        <div class="input-wrap">
                                            <input class="" type="date" placeholder="" v-model="form.review_finished_at" ref="review_finished_at" :min="convertDate(createDate(form.review_started_at, 7))" :max="convertDate(createDate(form.review_started_at, 21))">

                                            <error :form="form" name="review_finished_at" />
                                        </div>
                                    </div>

                                    <div class="guide-popUp pop-up_contents-box">
                                        <button class="close-btn">
                                            <i class="xi-close"></i>
                                        </button>
                                        <div class="guide-content">
                                            <p v-if="form.type_campaign === 'REALTIME'">
                                                선정 된 인플루언서들에게 제공내역을 제공하고, 해당 제품과 서비스를 체험한 리뷰어가
                                                <br/>각자의 미디어 계정에 후기성 글을 작성하는 기간입니다.
                                                <br/>매장 방문기간이 포함된 일정이니 참고 부탁드립니다.
                                            </p>
                                            <p v-else>
                                                선정 된 인플루언서들에게 제공내역을 제공하고, 해당 제품과 서비스를
                                                <br/>체험한 리뷰어가 각자의 미디어 계정에 후기성 글을 작성하는 기간입니다.
                                                <br/>배송기간과 방문기간이 포함된 기간인 만큼, 조금 넉넉하게 설정해주세요!
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>


                        <div class="write-box">
                            <div class="write-labal_wrap">
                                <p class="write-labal">실 사업장 주소 <span class="Essential">*</span></p>
                            </div>

                            <div class="write-bundle">
                                <input-address @change="(data) => form[data.name] = data.value" :form="form" />

                                <error :form="form" name="address" />
                                <error :form="form" name="address_detail" />
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

                        <div class="write-box ">
                            <div class="write-labal_wrap">
                                <p class="write-labal" v-if="form.type_campaign === 'REVIEW'">구매평 작성할 스토어 유형 <span class="Essential">*</span></p>
                                <p class="write-labal" v-else>모집 인플루언서 유형 <span class="Essential">*</span></p>
                            </div>
                            <div class="write-bundle">
                                <template v-if="form.type_campaign === 'REVIEW'">
                                    <div class="sns-radio-box">
                                        <input type="radio" name="1" id="SHOP_SMART" value="SHOP_SMART" v-model="form.type_sns">
                                        <label for="SHOP_SMART"><span><i class="xi-check-min"></i></span>스마트 스토어</label>
                                    </div>

                                    <div class="sns-radio-box">
                                        <input type="radio" name="1" id="SHOP_COUPANG" value="SHOP_COUPANG" v-model="form.type_sns">
                                        <label for="SHOP_COUPANG"><span><i class="xi-check-min"></i></span>쿠팡</label>
                                    </div>

                                    <div class="sns-radio-box">
                                        <input type="radio" name="1" id="SHOP_OTHER" value="SHOP_OTHER" v-model="form.type_sns">
                                        <label for="SHOP_OTHER"><span><i class="xi-check-min"></i></span>기타몰</label>
                                    </div>
                                </template>

                                <template v-else>
                                    <div class="sns-radio-box">
                                        <input type="radio" name="1" id="b" value="NAVER" v-model="form.type_sns">
                                        <label for="b"><span><i class="xi-check-min"></i></span>네이버 블로그</label>
                                    </div>

                                    <div class="sns-radio-box">
                                        <input type="radio" name="1" id="a" value="INSTAGRAM" v-model="form.type_sns">
                                        <label for="a"><span><i class="xi-check-min"></i></span>인스타그램 릴스</label>
                                    </div>

                                    <div class="sns-radio-box">
                                        <input type="radio" name="1" id="YOUTUBE_SHORTS" value="YOUTUBE_SHORTS" v-model="form.type_sns">
                                        <label for="YOUTUBE_SHORTS"><span><i class="xi-check-min"></i></span>유튜브 쇼츠</label>
                                    </div>

                                    <div class="sns-radio-box">
                                        <input type="radio" name="1" id="TIKTOK" value="TIKTOK" v-model="form.type_sns">
                                        <label for="TIKTOK"><span><i class="xi-check-min"></i></span>틱톡</label>
                                    </div>
                                </template>


                                <error :form="form" name="type_sns" />
                            </div>
                        </div>

                        <div class="write-box">
                            <div class="write-labal_wrap">
                                <p class="write-labal">제공할 제품 및 서비스 상세 내역 <span class="Essential">*</span></p>
                            </div>

                            <div class="write-bundle">
                                <!--
                                <textarea v-if="form.type_campaign === 'REVIEW'" name="" id="" placeholder="중요한 안내사항 및 참여하고자 하는 인플루언서들에게 제품이나 캠페인의 간단한 소개 등을 작성해주세요" v-model="form.introduce"></textarea>
                                -->
                                <!-- 구매평 -->
                                <textarea v-if="form.type_campaign === 'REVIEW'" name="" id="" style="height:250px;" placeholder="인플루언서들에게 제공할 제품 및 서비스를 상세히 작성해주세요.

[예시] 결제금액 : 제품가 22,000원 + 배송비 무료 = 총 22,000원
[옵션(색상) : 자율선택]
[옵션(수량) : 1개입]
[수량 : 1개]

캠페인 참여 시 주의사항 및 미션 내에 공정위문구(대가성 표기) 안내를 반드시 확인해주세요.
" v-model="form.introduce"></textarea>


                                <!-- 나머지 -->
                                <textarea  v-else style="height:250px;" name="" id="" placeholder="인플루언서들에게 제공할 제품 및 서비스를 상세히 작성해주세요. 인플루언서가 확인 후 체험하고자 하는 제품 및 서비스를 작성하여 광고주에게 전달합니다.

ex)
- 고기 2인분 + 막국수, 볶음밥 택 1
- 고기 종류 : 목살/삼겹살/갈매기살/항정살을 제공하고 있습니다. 체험 원하시는 고기 2종류(중복가능) 남겨주세요.
- 막국수 또는 볶음밥 중 한가지를 남겨주세요." v-model="form.introduce"></textarea>



                                <error :form="form" name="introduce" />

                                <div class="Gray_p_box">
                                    <p>캠페인 안내는 캠페인 상세페이지에서 노출될 내용입니다.</p>
                                </div>
                            </div>
                        </div>

                        <div class="write-box">
                            <div class="write-labal_wrap">
                                <p class="write-labal">메인 검색 키워드 <span class="Essential">*</span></p>
                            </div>

                            <div class="write-bundle">
                                <div class="input-wrap">
                                    <input type="text" v-model="form.search_keyword" placeholder="" />
                                    <error :form="form" name="search_keyword" />
                                </div>
                                <!--
								<textarea style="height: 360px;" name="" id="" v-model="form.search_keyword" :placeholder="searchKeywordPlaceholder"></textarea>
                                <error :form="form" name="search_keyword" />
                                -->
                            </div>
                        </div>

                        <div class="write-box">
                            <div class="write-labal_wrap">
                                <p class="write-labal">서브 검색 키워드 <span class="Essential">*</span></p>
                            </div>

                            <div class="write-bundle">
                                <div class="input-wrap">
                                    <input type="text" v-model="form.search_keyword_sub" placeholder="" />
                                    <error :form="form" name="search_keyword_sub" />
                                </div>
                                <!--
								<textarea style="height: 360px;" name="" id="" v-model="form.search_keyword" :placeholder="searchKeywordPlaceholder"></textarea>
                                <error :form="form" name="search_keyword" />
                                -->
                            </div>
                        </div>

                        <div class="write-box mission-box">
                            <div class="write-labal_wrap mission-title-wrap">
                                <p class="write-labal">캠페인미션 <span class="Essential">*</span></p>
                                <p class="Explanation_p">※ 캠페인 미션 공통질문 (예시, 체크박스형식) 최대 5개 다중선택 가능</p>
                            </div>

                            <div class="Field-ck-wrap" v-if="form.type_campaign === 'DELIVERY'">
                                <div class="category-ck mission1">
                                    <input type="checkbox" name="" id="mission1" value="구매할 수 있는 링크 URL을 넣어주세요." class="misssion-chkbox" v-model="form.missions" @change="checkOverMissions">
                                    <label for="mission1">
                                        <p class="label-title">구매할 수 있는 링크 URL을 넣어주세요. (하단 추가사항에 기재)</p>
                                    </label>
                                </div>

                                <div class="category-ck mission2">
                                    <input type="checkbox" name="" id="mission2" class="misssion-chkbox" value="사진은 최소 10장이상 등록해주세요." v-model="form.missions" @change="checkOverMissions">
                                    <label for="mission2">
                                        <p class="label-title">사진은 최소 10장이상 등록해주세요.</p>
                                    </label>
                                </div>

                                <div class="category-ck mission3">
                                    <input type="checkbox" name="" id="mission3" class="misssion-chkbox" value="체험하신 동영상 혹은 움짤 1개 이상 첨부해주세요." v-model="form.missions" @change="checkOverMissions">
                                    <label for="mission3">
                                        <p class="label-title">체험하신 동영상 혹은 움짤 1개 이상 첨부해주세요.</p>
                                    </label>
                                </div>

                                <div class="category-ck mission4">
                                    <input type="checkbox" name="" id="mission4" class="misssion-chkbox" value="제품 사용 비포/에프터 샷을 첨부해주세요." v-model="form.missions" @change="checkOverMissions">
                                    <label for="mission4">
                                        <p class="label-title">제품 사용 비포/에프터 샷을 첨부해주세요.</p>
                                    </label>
                                </div>

                                <div class="category-ck mission5">
                                    <input type="checkbox" name="" id="mission5" class="misssion-chkbox" value="제품 상세이미지를 참고하여 제품의 특징을 살려 작성해주세요." v-model="form.missions" @change="checkOverMissions">
                                    <label for="mission5">
                                        <p class="label-title">제품 상세이미지를 참고하여 제품의 특징을 살려 작성해주세요.</p>
                                    </label>
                                </div>

                                <div class="category-ck mission6">
                                    <input type="checkbox" name="" id="mission6" class="misssion-chkbox" value="해당 제품을 기존에 필요로 했던 것처럼 작성해주세요." v-model="form.missions" @change="checkOverMissions">
                                    <label for="mission6">
                                        <p class="label-title">해당 제품을 기존에 필요로 했던 것처럼 작성해주세요.</p>
                                    </label>
                                </div>

                                <div class="category-ck mission7">
                                    <input type="checkbox" name="" id="mission7" class="misssion-chkbox" value="본인이 착용 및 사용한 이미지를 올려주세요." v-model="form.missions" @change="checkOverMissions">
                                    <label for="mission7">
                                        <p class="label-title">본인이 착용 및 사용한 이미지를 올려주세요.</p>
                                    </label>
                                </div>

                                <div class="category-ck mission8">
                                    <input type="checkbox" name="" id="mission8" class="misssion-chkbox" value="안내된 키워드 모두 해시태그로 기재해주세요." v-model="form.missions" @change="checkOverMissions">
                                    <label for="mission8">
                                        <p class="label-title">안내된 키워드 모두 해시태그로 기재해주세요.</p>
                                    </label>
                                </div>
                            </div>

                            <div class="Field-ck-wrap" v-if="form.type_campaign === 'VISIT'">
                                <div class="category-ck mission1">
                                    <input type="checkbox" name="" id="mission1" value="찾아오는 길을 사진이나 자세한 설명으로 포스팅에 넣어주세요." class="misssion-chkbox" v-model="form.missions" @change="checkOverMissions">
                                    <label for="mission1">
                                        <p class="label-title">찾아오는 길을 사진이나 자세한 설명으로 포스팅에 넣어주세요.</p>
                                    </label>
                                </div>

                                <div class="category-ck mission2">
                                    <input type="checkbox" name="" id="mission2" class="misssion-chkbox" value="포스팅 하단에 지도와 홈페이지(링크) 주소를 넣어주세요." v-model="form.missions" @change="checkOverMissions">
                                    <label for="mission2">
                                        <p class="label-title">포스팅 하단에 지도와 홈페이지(링크) 주소를 넣어주세요.</p>
                                    </label>
                                </div>

                                <div class="category-ck mission3">
                                    <input type="checkbox" name="" id="mission3" class="misssion-chkbox" value="매장 전면사진을 첨부해주세요." v-model="form.missions" @change="checkOverMissions">
                                    <label for="mission3">
                                        <p class="label-title">매장 전면사진을 첨부해주세요.</p>
                                    </label>
                                </div>

                                <div class="category-ck mission4">
                                    <input type="checkbox" name="" id="mission4" class="misssion-chkbox" value="메뉴판과 음식(제공내역) 사진을 첨부해주세요." v-model="form.missions" @change="checkOverMissions">
                                    <label for="mission4">
                                        <p class="label-title">메뉴판과 음식(제공내역) 사진을 첨부해주세요.</p>
                                    </label>
                                </div>

                                <div class="category-ck mission5">
                                    <input type="checkbox" name="" id="mission5" class="misssion-chkbox" value="매장의 실제 내부 사진이나 시설에 대해 포스팅에 넣어주세요." v-model="form.missions" @change="checkOverMissions">
                                    <label for="mission5">
                                        <p class="label-title">매장의 실제 내부 사진이나 시설에 대해 포스팅에 넣어주세요.</p>
                                    </label>
                                </div>

                                <div class="category-ck mission6">
                                    <input type="checkbox" name="" id="mission6" class="misssion-chkbox" value="사진은 최소 10장이상 등록해주세요." v-model="form.missions" @change="checkOverMissions">
                                    <label for="mission6">
                                        <p class="label-title">사진은 최소 10장이상 등록해주세요.</p>
                                    </label>
                                </div>

                                <div class="category-ck mission7">
                                    <input type="checkbox" name="" id="mission7" class="misssion-chkbox" value="체험하신 동영상 혹은 움짤 1개 이상 첨부해주세요." v-model="form.missions" @change="checkOverMissions">
                                    <label for="mission7">
                                        <p class="label-title">체험하신 동영상 혹은 움짤 1개 이상 첨부해주세요.</p>
                                    </label>
                                </div>

                                <div class="category-ck mission8">
                                    <input type="checkbox" name="" id="mission8" class="misssion-chkbox" value="안내된 키워드 모두 해시태그로 기재해주세요." v-model="form.missions" @change="checkOverMissions">
                                    <label for="mission8">
                                        <p class="label-title">안내된 키워드 모두 해시태그로 기재해주세요.</p>
                                    </label>
                                </div>
                            </div>

                            <div class="Field-ck-wrap" v-if="form.type_campaign === 'REALTIME'">
                                <div class="category-ck mission1">
                                    <input type="checkbox" name="" id="mission1" value="찾아오는 길을 사진이나 자세한 설명으로 포스팅에 넣어주세요." class="misssion-chkbox" v-model="form.missions" @change="checkOverMissions">
                                    <label for="mission1">
                                        <p class="label-title">찾아오는 길을 사진이나 자세한 설명으로 포스팅에 넣어주세요.</p>
                                    </label>
                                </div>

                                <div class="category-ck mission2">
                                    <input type="checkbox" name="" id="mission2" class="misssion-chkbox" value="포스팅 하단에 지도와 홈페이지(링크) 주소를 넣어주세요." v-model="form.missions" @change="checkOverMissions">
                                    <label for="mission2">
                                        <p class="label-title">포스팅 하단에 지도와 홈페이지(링크) 주소를 넣어주세요.</p>
                                    </label>
                                </div>

                                <div class="category-ck mission3">
                                    <input type="checkbox" name="" id="mission3" class="misssion-chkbox" value="매장 전면사진을 첨부해주세요." v-model="form.missions" @change="checkOverMissions">
                                    <label for="mission3">
                                        <p class="label-title">매장 전면사진을 첨부해주세요.</p>
                                    </label>
                                </div>

                                <div class="category-ck mission4">
                                    <input type="checkbox" name="" id="mission4" class="misssion-chkbox" value="메뉴판과 음식(제공내역) 사진을 첨부해주세요." v-model="form.missions" @change="checkOverMissions">
                                    <label for="mission4">
                                        <p class="label-title">메뉴판과 음식(제공내역) 사진을 첨부해주세요.</p>
                                    </label>
                                </div>

                                <div class="category-ck mission5">
                                    <input type="checkbox" name="" id="mission5" class="misssion-chkbox" value="매장의 실제 내부 사진이나 시설에 대해 포스팅에 넣어주세요." v-model="form.missions" @change="checkOverMissions">
                                    <label for="mission5">
                                        <p class="label-title">매장의 실제 내부 사진이나 시설에 대해 포스팅에 넣어주세요.</p>
                                    </label>
                                </div>

                                <div class="category-ck mission6">
                                    <input type="checkbox" name="" id="mission6" class="misssion-chkbox" value="사진은 최소 10장이상 등록해주세요." v-model="form.missions" @change="checkOverMissions">
                                    <label for="mission6">
                                        <p class="label-title">사진은 최소 10장이상 등록해주세요.</p>
                                    </label>
                                </div>

                                <div class="category-ck mission7">
                                    <input type="checkbox" name="" id="mission7" class="misssion-chkbox" value="체험하신 동영상 혹은 움짤 1개 이상 첨부해주세요." v-model="form.missions" @change="checkOverMissions">
                                    <label for="mission7">
                                        <p class="label-title">체험하신 동영상 혹은 움짤 1개 이상 첨부해주세요.</p>
                                    </label>
                                </div>

                                <div class="category-ck mission8">
                                    <input type="checkbox" name="" id="mission8" class="misssion-chkbox" value="안내된 키워드 모두 해시태그로 기재해주세요." v-model="form.missions" @change="checkOverMissions">
                                    <label for="mission8">
                                        <p class="label-title">안내된 키워드 모두 해시태그로 기재해주세요.</p>
                                    </label>
                                </div>
                            </div>

                            <div class="Field-ck-wrap" v-if="form.type_campaign === 'REPORTER'">
                                <div class="category-ck mission1">
                                    <input type="checkbox" name="" id="mission1" value="제공하는 사진은 최소 10장 이상 등록해주세요." class="misssion-chkbox" v-model="form.missions" @change="checkOverMissions">
                                    <label for="mission1">
                                        <p class="label-title">제공하는 사진은 최소 10장 이상 등록해주세요.</p>
                                    </label>
                                </div>

                                <div class="category-ck mission2">
                                    <input type="checkbox" name="" id="mission2" class="misssion-chkbox" value="제공해드리는 사진과 가이드라인을 활용해 정성스러운 포스팅을 작성해주세요." v-model="form.missions" @change="checkOverMissions">
                                    <label for="mission2">
                                        <p class="label-title">제공해드리는 사진과 가이드라인을 활용해 정성스러운 포스팅을 작성해주세요.</p>
                                    </label>
                                </div>

                                <div class="category-ck mission3">
                                    <input type="checkbox" name="" id="mission3" class="misssion-chkbox" value="형식적인 포스팅이 아닌 직접 체험한 듯한 후기를 작성해주세요." v-model="form.missions" @change="checkOverMissions">
                                    <label for="mission3">
                                        <p class="label-title">형식적인 포스팅이 아닌 직접 체험한 듯한 후기를 작성해주세요.</p>
                                    </label>
                                </div>

                                <div class="category-ck mission4">
                                    <input type="checkbox" name="" id="mission4" class="misssion-chkbox" value="제품이나 서비스를 추천하고자 하는 특정 대상과 사연을 작성해주세요." v-model="form.missions" @change="checkOverMissions">
                                    <label for="mission4">
                                        <p class="label-title">제품이나 서비스를 추천하고자 하는 특정 대상과 사연을 작성해주세요.</p>
                                    </label>
                                </div>

                                <div class="category-ck mission5">
                                    <input type="checkbox" name="" id="mission5" class="misssion-chkbox" value="제공된 키워드 중 1개를 선택하여 본문에 5번 이상 넣어주세요." v-model="form.missions" @change="checkOverMissions">
                                    <label for="mission5">
                                        <p class="label-title">제공된 키워드 중 1개를 선택하여 본문에 5번 이상 넣어주세요.</p>
                                    </label>
                                </div>

                                <div class="category-ck mission6">
                                    <input type="checkbox" name="" id="mission6" class="misssion-chkbox" value="포스팅에 제품과 더불어 브랜드도 같이 언급해주세요." v-model="form.missions" @change="checkOverMissions">
                                    <label for="mission6">
                                        <p class="label-title">포스팅에 제품과 더불어 브랜드도 같이 언급해주세요.</p>
                                    </label>
                                </div>

                                <div class="category-ck mission7">
                                    <input type="checkbox" name="" id="mission7" class="misssion-chkbox" value="제공된 제품의 상세페이지를 참고하여 제품의 특징을 상세하게 기재해주세요." v-model="form.missions" @change="checkOverMissions">
                                    <label for="mission7">
                                        <p class="label-title">제공된 제품의 상세페이지를 참고하여 제품의 특징을 상세하게 기재해주세요.</p>
                                    </label>
                                </div>

                                <div class="category-ck mission8">
                                    <input type="checkbox" name="" id="mission8" class="misssion-chkbox" value="제공된 구매처 URL을 첨부해주세요." v-model="form.missions" @change="checkOverMissions">
                                    <label for="mission8">
                                        <p class="label-title">제공된 구매처 URL을 첨부해주세요.</p>
                                    </label>
                                </div>

                                <div class="category-ck mission9">
                                    <input type="checkbox" name="" id="mission9" class="misssion-chkbox" value="재방문 및 재구매 의사가 있다고 강조해주세요." v-model="form.missions" @change="checkOverMissions">
                                    <label for="mission9">
                                        <p class="label-title">재방문 및 재구매 의사가 있다고 강조해주세요.</p>
                                    </label>
                                </div>

                                <div class="category-ck mission10">
                                    <input type="checkbox" name="" id="mission10" class="misssion-chkbox" value="제공하는 동영상 혹은 움짤 1개이상 첨부해주세요." v-model="form.missions" @change="checkOverMissions">
                                    <label for="mission10">
                                        <p class="label-title">제공하는 동영상 혹은 움짤 1개이상 첨부해주세요.</p>
                                    </label>
                                </div>

                                <div class="category-ck mission11">
                                    <input type="checkbox" name="" id="mission11" class="misssion-chkbox" value="매장의 실제 내부 사진이나 시설에 대해 강조해주세요." v-model="form.missions" @change="checkOverMissions">
                                    <label for="mission11">
                                        <p class="label-title">매장의 실제 내부 사진이나 시설에 대해 강조해주세요.</p>
                                    </label>
                                </div>

                                <div class="category-ck mission8">
                                    <input type="checkbox" name="" id="mission12" class="misssion-chkbox" value="하단에 해시태그를 넣어주세요." v-model="form.missions" @change="checkOverMissions">
                                    <label for="mission12">
                                        <p class="label-title">하단에 해시태그를 넣어주세요.</p>
                                    </label>
                                </div>
                            </div>

                            <div class="Field-ck-wrap" v-if="form.type_campaign === 'REVIEW'">
                                <div class="category-ck mission2">
                                    <input type="checkbox" name="" id="mission2" class="misssion-chkbox" value="상품찜, 알림받기 꼭 해주세요." v-model="form.missions" @change="checkOverMissions">
                                    <label for="mission2">
                                        <p class="label-title">상품찜, 알림받기 꼭 해주세요.</p>
                                    </label>
                                </div>

                                <div class="category-ck mission3">
                                    <input type="checkbox" name="" id="mission3" class="misssion-chkbox" value="내용을 참고하시어 사진 3장, 리뷰 3줄 이상 작성해주세요. (상세페이지 캡처 불가)" v-model="form.missions" @change="checkOverMissions">
                                    <label for="mission3">
                                        <p class="label-title">내용을 참고하시어 사진 3장, 리뷰 3줄 이상 작성해주세요. (상세페이지 캡처 불가)</p>
                                    </label>
                                </div>

                                <div class="category-ck mission4">
                                    <input type="checkbox" name="" id="mission4" class="misssion-chkbox" value="별점 5점과 단순 소개 형식이 아닌 직접 경험을 반영한 자연스러운 리뷰 부탁드립니다." v-model="form.missions" @change="checkOverMissions">
                                    <label for="mission4">
                                        <p class="label-title">별점 5점과 단순 소개 형식이 아닌 직접 경험을 반영한 자연스러운 리뷰 부탁드립니다.</p>
                                    </label>
                                </div>
                            </div>

                            <error :form="form" name="missions" />

                        </div>

                        <div class="write-box mission-box_add">
                            <div class="write-labal_wrap">
                                <p class="Explanation_p">기타 요청사항은 아래 칸에 작성해주세요.</p>
                            </div>

                            <div class="write-bundle">
                                <textarea style="height: 303px;" id="" v-model="form.mission"></textarea>
                            </div>

                            <error :form="form" name="mission" />
                        </div>


                        <div class="write-box">
                            <div class="write-labal_wrap">
                                <p class="write-labal">선정기간 내 인플루언서 미선정시 <span class="Essential">*</span></p>
                            </div>
                            <div class="write-bundle">
                                <div class="radio-wrap1">
                                    <div class="radio-box">
                                        <input type="radio" name="Gender" id="Man" :value="0" v-model="form.have_to_satisfied">
                                        <label for="Man">모집인원만큼 자동선정</label>
                                    </div>
                                    <div class="radio-box">
                                        <input type="radio" name="Gender" id="Woman" :value="1" v-model="form.have_to_satisfied">
                                        <label for="Woman">캠페인취소</label>
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

            agree_write: false,

            temp_campaign_id: "",

            agree_review_refund_price: false,

            form : new Form(this.$axios, {
                temp: 0,
                type_campaign: "DELIVERY",
                title_company: "",
                title_product: "",

                description_provide: "",
                product_and_price: "",
                review_refund_price: "",

                imgs: [],
                img_detail:[],
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
                search_keyword_sub: "",
                missions: [

                ],
                mission : "",
                have_to_satisfied: 0,
                price_write: "",
                min_follower: 0,

                img: null,
            }),

            for_setting_visit_started_at: "",

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
                    take: 10,
                }
            }).then(response => {
                this.tempCampaigns = response.data;
            });
        },

        removeCampaign(campaign){
            this.tempCampaigns.data = this.tempCampaigns.data.filter(tempCapaign => tempCapaign.id != campaign.id);

            this.$axios.delete("/api/campaigns/" + campaign.id);
        },

        checkOverMissions(e){
            if (this.form.missions.length > 5) {
                this.$store.commit("setPop", {
                    title: "입력값 확인필요",
                    description: "최대 5개까지 선택할 수 있습니다."
                });

                e.target.checked = false;

                this.form.missions = [...this.form.missions.slice(0, 5)];

                e.preventDefault();
            }
        },

        checkTitleProduct(e){
            if (this.form.title_product.length > 14) {
                this.form.title_product = this.form.title_product.slice(0, 14);
            }
        },


        setTempCampaign(){
            let campaign = this.tempCampaigns.data.find(tempCampaign => tempCampaign.id == this.temp_campaign_id);

            if(campaign) {
                this.form.set({...campaign,
                    imgs: [],
                    img: "",
                    img_detail:[],
                    hire_started_at: "",
                    hire_finished_at: "",
                    select_started_at: "",
                    select_finished_at: "",
                    review_started_at: "",
                    review_finished_at: "",
                });
            }

            $(".temporary_storage_wrap").removeClass("open");
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
            if(this.form.type_campaign === "REPORTER" && !this.agree_write)
                return this.$store.commit("setPop", {
                    title : "입력값 확인필요",
                    description: "원고료 제공일정에 동의헤주세요."
                });

            if(this.form.type_campaign === "REVIEW" && !this.agree_review_refund_price)
                return this.$store.commit("setPop", {
                    title : "입력값 확인필요",
                    description: "환급금액 지급동의에 동의해주세요."
                });

            this.activeAsk = false;

            this.form.temp = 0;

            if(this.form.missions.length > 5)
                return alert("캠페인 미션 공통질문은 최대 5개까지만 선택 가능합니다.");

            this.form.post("/api/campaigns")
                .then(response => {
                    this.$store.commit("setPop", {
                        title : "등록완료",
                    });

                    this.$router.push("/");
                });
        },



        setMinHireFinishedAt(){

        },

        convertDatetime(date){
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let hours = date.getHours();
            let minutes = date.getMinutes();

            if(month < 10)
                month = "0" + month;

            if(day < 10)
                day = "0" + day;

            if(hours < 10)
                hours = "0" + hours;

            if(minutes < 10)
                minutes = "0" + minutes;

            return `${year}-${month}-${day}T${hours}:${minutes}`;
        },
        convertDate(date){
            return date.toISOString().slice(0,10);
        },

        addDay(date){
            date.setDate(date.getDate() + 1);

            return date;
        },

        addDays(date, days){
            date.setDate(date.getDate() + days);

            return date;
        },

        addHours(date, hours){
            date = new Date(date.getTime() + (hours * 60 * 60 * 1000));

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
        },

        addEvent(){

            $("input[type='datetime-local']").on('focus', function() {
                this.click(); // 클릭 이벤트를 발생시켜 팝업을 엽니다.
            });

            $(".temporary_storage_open_btn").unbind("click").bind("click",function () {
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
            });

            $(".pop-up_recruitment").click(function () {
                $(".pop-up_recruitment-box").addClass("open");
            })

            $(".pop-up_selection").click(function () {
                $(".pop-up_selection-box").addClass("open");
            })

            $(".pop-up_contents").click(function () {
                $(".pop-up_contents-box").addClass("open");
            })


            $(".close-btn").click(function () {
                $(this).parent(".pop-box").removeClass("open")
                $(this).parent(".guide-popUp").removeClass("open")
            });

            $(".help-btn").click(function(){
                $("." + $(this).attr("data-target")).addClass("open");
            })
        }
    },

    computed: {
        counts(){
            let items = [];

            for(let i = 1;  i <= this.max; i++){
                if(i < 10 || i % 5 === 0) {
                    items.push(i);
                }
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
                return "상호명(브랜드명)";

            if(this.form.type_campaign === 'VISIT')
                return "지역/상호명(매장명)";

            if(this.form.type_campaign === 'REALTIME')
                return "지역/상호명(매장명)";

            if(this.form.type_campaign === 'REPORTER')
                return "상호명(브랜드명)";

            return "상호명(브랜드명)"
        },

        titlePlaceholder(){
            if(this.form.type_campaign === 'DELIVERY')
                return "소개하고자 하는 제품의 브랜드명을 입력해주세요.";

            if(this.form.type_campaign === 'VISIT')
                return "지역과 상호명을 입력해주세요. 예) 잠실/우리뷰";

            if(this.form.type_campaign === 'REALTIME')
                return "지역과 상호명을 입력해주세요. 예) 잠실/우리뷰";

            if(this.form.type_campaign === 'REPORTER')
                return "소개하고자 하는 제품의 브랜드명을 입력해주세요.";

            return "소개하고자 하는 제품의 브랜드명을 입력해주세요."
        },


    },

    mounted() {
        if(this.$auth.user.data.can_create_campaign != 1)
            return this.$router.push("/orders");

        this.getTempCampaigns();

        this.addEvent();


    },

    watch: {
        /*'form.missions': function(newVal, oldVal) {
            if(newVal.length > 5){
                this.$store.commit("setPop", {
                    title: "캠페인 미션 안내",
                    description: "최대 5개까지만 선택 가능합니다."
                });

                this.form.missions = newVal.slice(0, 5);

                console.log(this.form.missions);
            }
        },*/

        'for_setting_visit_started_at': function(newVal, oldVal) {
            if(!newVal)
                return "";

            let visitedAt = new Date(newVal);

            let hireStartedAt = new Date(visitedAt.setHours(visitedAt.getHours() + 2));

            this.form.hire_started_at = this.convertDatetime(hireStartedAt);


            let hireFinishedAt = new Date(hireStartedAt.setHours(hireStartedAt.getHours() + 2));

            this.form.hire_finished_at = this.convertDatetime(hireFinishedAt);

            this.form.select_started_at = this.form.hire_finished_at;

            let selectedFinishedAt = new Date(hireFinishedAt.setHours(hireFinishedAt.getHours() + 4));

            this.form.select_finished_at = this.convertDatetime(selectedFinishedAt);

            this.form.review_started_at = this.form.select_finished_at;
        },

        'form.hire_started_at': function(newVal, oldVal) {
            if(this.form.type_campaign !== "REALTIME"){
                if(!newVal)
                    return "";

                let date = new Date(newVal);

                this.$refs.hire_finished_at.min = this.convertDate(this.addDays(date, 1));
            }

        },

        'form.hire_finished_at': function(newVal, oldVal) {
            if(this.form.type_campaign !== "REALTIME"){
                if(!newVal)
                    return "";

                let date = new Date(newVal);

                this.form.select_started_at = this.convertDate(this.addDay(date));
            }

        },

        'form.select_started_at': function(newVal, oldVal) {
            if(this.form.type_campaign === "REALTIME"){
                if(!newVal)
                    return "";

                let date = new Date(newVal);

                this.form.select_finished_at = this.convertDatetime(new Date(date.setHours(date.getHours() + 4)));

                this.form.review_started_at = this.form.select_finished_at.slice(0, 10);
            }

        },

        'form.select_finished_at': function(newVal, oldVal) {
            if(this.form.type_campaign !== "REALTIME"){
                if(!newVal)
                    return "";

                let date = new Date(newVal);

                this.form.review_started_at = this.convertDate(this.addDay(date));
            }

        },

        'form.type_campaign': function(newVal, oldVal) {
            let self = this;

            setTimeout(function(){
                self.addEvent();
            },300)

            if(newVal === 'REALTIME' || newVal === 'VISIT'){
                this.max = 5;
            }

            if(newVal === 'REPORTER' || newVal === 'DELIVERY'){
                this.max = 20;
            }

            if(newVal === "REALTIME"){
                this.form.hire_started_at = this.convertDatetime(this.addHours(new Date(), 2));
                this.form.hire_finished_at = this.convertDatetime(this.addHours(new Date(), 4));
                this.form.select_started_at =  this.form.hire_finished_at;
            }
        }
    }
}
</script>

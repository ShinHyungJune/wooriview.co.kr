<template>
    <main id="main" class="MyPage payment-detail">
        <div class="yellow-box"></div>

        <section class="payment-detail-wrap">
            <div class="logo-wrap">
                <img src="/images/logo.png" alt="">
            </div>

            <div class="container">
                <div class="payment-detail-contents">
                    <!--
                    <div class="payment-type-item type1"  v-if="product">
                        <p class="small-period">{{ product.title }}</p>
                        <p class="title-period">{{ product.duration }}일</p>
                        <p class="default">
                            기본요금 {{ product.price.toLocaleString() }}원</p>
                        <p class="discount" v-if="product.first_discount_title">
                            {{ product.first_discount_title }}
                        </p>
                        <p class="default re-po" v-if="product.price_discount > 0">-{{ product.price_discount.toLocaleString() }} 원</p>
                        <p class="default price">결제금액</p>
                        <p class="payment-price" v-if="$auth.user.data.first_order">
                            {{(product.price - product.price_discount).toLocaleString()}}원
                        </p>
                        <p class="payment-price" v-else>
                            {{(product.price).toLocaleString()}}원
                        </p>
                    </div>
                    -->

                    <!-- //1년-->
                    <div class="payment-agree-box">
                        <div class="payment-agree-top">
                            <p class="payment-agree_title">우리뷰 결제 동의</p>
                            <!--
                            <button id="pdf-btn" @click="createPdf">PDF <i class="xi-download"></i></button>
                            -->
                        </div>


                        <div class="payment-agree_contents ">
                            <!-- 1페이지 -->
                            <div class="content-layout">
                                <div class="pdf_page page1">
                                    <p class="page-title">우리뷰 - 캠페인(기간제 유료서비스) 계약서</p>

                                    <div class="fragment">
                                        <p class="page-index">1. 서비스 정보</p>
                                        <div class="page-detail m-repo">
                                            <p class="page-detail_title">서비스 유형</p>
                                            <div class="page-detail_list">
                                                <p class="page-detail_list-title">매칭되는 인플루언서 회원의 수</p>
                                                <p class="page-detail_list-sub">
                                                    5명 (최소 단위 기준, 우리뷰는 계약기간내 등록 가능한 캠페인의 수, <br />
                                                    매칭되는 인플루언서의 수 제한 없이 이용가능)
                                                </p>
                                                <p class="page-detail_list-title">인플루언서가 필수적으로 작성하여야 하는 리뷰의 수</p>
                                                <p class="page-detail_list-sub">
                                                    인플루언서의 경우, 1개의 캠페인 선정(1개의 제공내역 체험)당 1개의 리뷰 작성 필수
                                                </p>
                                                <p class="page-detail_list-title">리뷰 작성 매체</p>
                                                <p class="page-detail_list-sub">
                                                    네이버 블로그, 인스타그램
                                                </p>
                                                <p class="page-detail_list-title">서비스 기간</p>
                                                <p class="page-detail_list-sub">
                                                    {{ product ? product.title : '' }}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="page-detail m-repo">
                                            <p class="page-detail_title">유형별 금액</p>
                                            <div class="page-detail_list line-repo">
                                                <p class="page-detail_list-title">전체 금액 부가세 포함</p>
                                            </div>
                                        </div>
                                        <div class="page-detail m-repo">
                                            <p class="page-detail_title">특약사항</p>
                                            <div class="page-detail_list line-repo">
                                                <!--                                            <p class="page-detail_list-title">첫 결제시, 1개월 이용권한 추가제공 <span class="list-title-sub">프로모션</span></p>-->
                                                <p class="page-detail_list-title">
                                                    계약기간내 별도의 추가결제 없이 우리뷰에서 중개하는 모든 광고채널 <br />
                                                    (블로그, 인스타그램, 유튜브) 이용 가능
                                                </p>
                                                <p class="page-detail_list-title">실시간 방문형 캠페인 무료 제공<span class="list-title-sub">우리뷰 런칭 프로모션, 추후 유료서비스 전환 예정</span></p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="fragment">
                                        <p class="page-index index-2">2. 광고주(가입자) 정보</p>
                                        <table class="page-detail_table">
                                            <tr>
                                                <td class="table-title">사업자등록증상 상호<br />
                                                    법인의 경우 법인명</td>
                                                <td class="table-content">{{user.company_name}}</td>
                                            </tr>
                                            <tr>
                                                <td class="table-title">사업자등록번호</td>
                                                <td class="table-content">{{user.company_number}}</td>
                                            </tr>
                                            <tr>
                                                <td class="table-title">사업장 소재지</td>
                                                <td class="table-content">{{user.address}} {{user.address_detail}}</td>
                                            </tr>
                                            <tr>
                                                <td class="table-title">연락처</td>
                                                <td class="table-content">{{user.company_contact}}</td>
                                            </tr>
                                            <tr>
                                                <td class="table-title">이메일</td>
                                                <td class="table-content">{{user.email}}</td>
                                            </tr>
                                        </table>
                                    </div>

                                    <div class="fragment">
                                        <p class="page-index">3. 결제방법</p>
                                        <div class="page-detail">
                                            <p class="page-detail_title">카드 (앱카드 포함)</p>
                                        </div>
                                    </div>
                                    <div class="fragment">
                                        <p class="page-index">4. 결제상세</p>
                                        <div class="page-detail m-repo">
                                            <p class="page-detail_title">
                                                총 결제 금액 <br />
                                                (부가세 10% 포함)
                                            </p>
                                            <div class="page-detail_list">
                                                <p class="page-detail_list-title" v-if="product">
                                                    구독형 {{product.title}} / {{(product.price - product.price_discount).toLocaleString()}}원
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div class="write-wrap">
                                <div class="Consent-form">
                                    <div class="Consent-ck">
                                        <input type="checkbox" name="1" id="Consent" v-model="agree1">
                                        <label for="Consent">
                                            <span class="ck-from"><i class="xi-check-min"></i></span>
                                            이용약관 상세 내용을 확인하였습니다.
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <!-- 2페이지 -->
                            <div class="content-layout">
                                <div class="pdf_page page2">
                                    <p class="page-title">우리뷰 규정</p>

                                    <div class="fragment">
                                        <p class="page-index">제 24 조 (광고주 탈퇴 및 환불)</p>
                                        <div class="page-detail page-detail_num-list">
                                            <p class="page-detail_title">①</p>
                                            <div class="page-detail_list">
                                                <p class="page-detail_list-title">“광고주”는 언제든 “서비스” 내의 고객센터 기능을 이용하여 이용계약 해지 또는 취소 신청을 할 수 있습니다.</p>
                                            </div>
                                        </div>
                                        <div class="page-detail page-detail_num-list">
                                            <p class="page-detail_title">②</p>
                                            <div class="page-detail_list">
                                                <p class="page-detail_list-title">“광고주”의 제1항에 대한 신청이 휴일에 접수된 경우, 해당 신청건은 접수일 이후 도래하는 첫 영업일에 접수된 것으로 봅니다.</p>
                                            </div>
                                        </div>
                                        <div class="page-detail page-detail_num-list">
                                            <p class="page-detail_title">③</p>
                                            <div class="page-detail_list">
                                                <p class="page-detail_list-title">
                                                    “광고주” 탈퇴가 이뤄질 경우, “광고주”에게 환불되는 금액은 아래와 같은 기준에 의하여 계산됩니다. <br />
                                                    (탈퇴 신청 접수시 기준 남은 구독일수 / 30) × 월간 구독료</p>
                                            </div>
                                        </div>
                                        <div class="page-detail page-detail_num-list">
                                            <p class="page-detail_title">④</p>
                                            <div class="page-detail_list">
                                                <p class="page-detail_list-title">
                                                    “광고주”가 “회사”의 귀책사유가 아닌 단순 변심으로 “회사”와의 계약을 중도해지할 경우, <br />
                                                    “광고주”는 “회사”에 약정한 전체 이용요금의 10%를 위약금으로 납부하여야 하며, <br />
                                                    해당 위약금은 제3항의 환불 금액에서 공제됩니다.</p>
                                            </div>
                                        </div>
                                        <div class="page-detail page-detail_num-list">
                                            <p class="page-detail_title">⑤</p>
                                            <div class="page-detail_list">
                                                <p class="page-detail_list-title">
                                                    “광고주”가 “회사”에 납부하여야 하는 위약금이 “회사”가 “광고주”에게 환불하여야 하는 금액보다 <br />
                                                    클 경우, “광고주”는 지체없이 “회사”에 차액을 지급하여야 합니다.</p>
                                            </div>
                                        </div>
                                        <div class="page-detail page-detail_num-list">
                                            <p class="page-detail_title">⑥</p>
                                            <div class="page-detail_list">
                                                <p class="page-detail_list-title">
                                                    “회사”는 아래와 같은 경우 “광고주”에게 계약해지를 통보할 수 있습니다.
                                                    “회원”이 “회사”에 “광고주”의 약속불이행, “광고주”의 “리뷰” 작성 “인플루언서”에 대한 비하발언 등
                                                    동일하거나 유사한 유형의 불만을 3회 이상 표명한 경우
                                                    “광고주”의 성희롱, 성추행, 폭력 등의 범죄로 인하여 “광고주”가 제공하는 서비스에 대한 심각한 수준의
                                                    평판 저하가 발생하여 “회사”가 더 이상 “서비스”를 제공할 수 없다고 판단한 경우
                                                </p>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="fragment">
                                        <p class="page-index">제 28 조 (책임 제한)</p>
                                        <div class="page-detail page-detail_num-list">
                                            <p class="page-detail_title">①</p>
                                            <div class="page-detail_list">
                                                <p class="page-detail_list-title">
                                                    “회사”는 천재지변 또는 이에 준하는 불가항력으로 인하여 “서비스”를 제공할 수 없는 경우에는
                                                    “서비스” 제공에 관한 책임이 면제됩니다.</p>
                                            </div>
                                        </div>
                                        <div class="page-detail page-detail_num-list">
                                            <p class="page-detail_title">②</p>
                                            <div class="page-detail_list">
                                                <p class="page-detail_list-title">“회사”는 "인플루언서"의 귀책사유로 인한 “서비스” 이용의 장애 또는 손해에 대하여 책임을 지지 않습니다.</p>
                                            </div>
                                        </div>
                                        <div class="page-detail page-detail_num-list">
                                            <p class="page-detail_title">③</p>
                                            <div class="page-detail_list">
                                                <p class="page-detail_list-title">“회사”는 무료로 제공되는 “서비스” 이용과 관련하여 관련법에 특별한 규정이 없는 한 책임을 지지 않습니다.</p>
                                            </div>
                                        </div>
                                        <div class="page-detail page-detail_num-list">
                                            <p class="page-detail_title">④</p>
                                            <div class="page-detail_list">
                                                <p class="page-detail_list-title">
                                                    “회사”는 "인플루언서" 간 또는 "인플루언서"과 제3자 상호 간에 서비스를 매개로 한 커뮤니티 활동, 정보 게재, 자료 전송, 거래 등
                                                    일체의 활동에 대하여 책임을 지지 않습니다.
                                                </p>
                                            </div>
                                        </div>
                                        <div class="page-detail page-detail_num-list">
                                            <p class="page-detail_title">⑤</p>
                                            <div class="page-detail_list">
                                                <p class="page-detail_list-title">
                                                    “회사”는 “광고주”와의 “캠페인” 진행 중 “광고주”의 귀책사유로 인하여 "인플루언서"에게 발생한 불만족
                                                    또는 손해에 대하여 책임을 지지 않습니다.</p>
                                            </div>
                                        </div>
                                        <div class="page-detail page-detail_num-list">
                                            <p class="page-detail_title">⑥</p>
                                            <div class="page-detail_list">
                                                <p class="page-detail_list-title">
                                                    “회사”는 “캠페인” 진행 중, “광고주”의 제품 배송 미처리 및 배송 오류 등에 관한 제반사항에 대하여 책임을 지지 않습니다.
                                                </p>
                                            </div>
                                        </div>
                                        <div class="page-detail page-detail_num-list marginA">
                                            <p class="page-detail_title">⑦</p>
                                            <div class="page-detail_list">
                                                <p class="page-detail_list-title">“인플루언서”가 작성한 리뷰가 “광고주”의 “리뷰어 선정기간” 내 미선정으로 인하여 선정되지 않을시,
                                                    해당 리뷰는 “회사”의 내부 정책에 의하여 자동선정 되며, “회사”는 이로 인한 불만사항에 대하여 책임을 지지 않습니다.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="write-wrap">
                                <div class="Consent-form">
                                    <div class="Consent-ck">
                                        <input type="checkbox" name="2" id="refund" v-model="agree2">
                                        <label for="refund">
                                            <span class="ck-from"><i class="xi-check-min"></i></span>
                                            환불 규정 상세 내용을 확인하였습니다.
                                        </label>
                                    </div>
                                    <div class="Consent-ck">
                                        <input type="checkbox" name="3" id="Limitation" v-model="agree3">
                                        <label for="Limitation">
                                            <span class="ck-from"><i class="xi-check-min"></i></span>
                                            책임 제한 규정 상세 내용을 확인하였습니다.
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <!-- 3페이지 -->
                            <div class="content-layout">

                                <div class="pdf_page">
                                    <p class="page-title">우리뷰 제3자 제공</p>
                                    <p class="page-index"></p>
                                    <P class="page-sub">
                                        매칭되는 인플루언서 회원에게 광고주 회원의 개인 정보가 제공되는 경우, <br />
                                        제3자에게 개인정보를 제공하기 위한 동의를 받는 것이 필요합니다. <br />
                                        연결화면을 통하여 아래와 같은 개인정보 제3자 제공 내역 항목, 제공받는 자, 제공목적, 수집목적, 보유 및 이용기간, 동의를  <br />
                                        거부할 권리 등을 확인할 수 있도록 기재하시기 바랍니다.
                                        <br />
                                        <br />
                                        만일 개인 정보가 인플루언서 회원에게 제공되지 않는 경우 이 부분은 삭제하셔도 무방합니다.
                                    </P>
                                    <p class="page-index index-2">개인정보 제3자 제공 내역</p>
                                    <table class="page-detail_table">
                                        <tr>
                                            <td class="table-title">항목</td>
                                            <td class="table-content">사업자등록증상 상호, 법인명, 대표자명, 담당자명, 사업장소재지, 휴대전화, 이메일</td>
                                        </tr>
                                        <tr>
                                            <td class="table-title">제공받는 자</td>
                                            <td class="table-content">매칭되는 인플루언서 회원</td>
                                        </tr>
                                        <tr>
                                            <td class="table-title">제공 목적</td>
                                            <td class="table-content">캠페인 진행</td>
                                        </tr>
                                        <tr>
                                            <td class="table-title">수집 목적</td>
                                            <td class="table-content">캠페인 진행</td>
                                        </tr>
                                        <tr>
                                            <td class="table-title">보유 및 이용기간</td>
                                            <td class="table-content">캠페인 시작일부터 마감일까지</td>
                                        </tr>
                                    </table>
                                    <p class="table-guide">
                                        ※ 위 개인정보를 제3자에게 제공함에 대하여 <span>동의를 거부할 권리</span> 가 있습니다.
                                        다만 동의하지 않는 경우 <span>서비스 가입이 불가능</span>합니다.
                                    </p>

                                </div>
                            </div>

                            <div class="write-wrap">
                                <div class="Consent-form">
                                    <div class="Consent-ck">
                                        <input type="checkbox" name="4" id="INFO" v-model="agree4">
                                        <label for="INFO">
                                            <span class="ck-from"><i class="xi-check-min"></i></span>
                                            매칭되는 인플루언서 회원에게 광고주 회원의 개인 정보를 제공하는 데에 동의합니다.
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div class="content-layout " v-if="signImg">
                                <div class="pdf_page">
                                    <div>
                                        <p class="page-title">서명</p>
                                        <p class="page-index"></p>
                                        <p class="page-sub"></p>
                                    </div>

                                    <img :src="signImg" style="display:block; width:240px; padding:0; margin:0 auto;" v-if="signImg">
                                </div>
                            </div>

                            <div class="payment-sign-wrap" v-else>
                                <p class="payment-sign_title" ref="test">
                                    서비스 결제를 동의하시면 서명을 완료해주세요.
                                </p>

                                <div class="payment-sign_box-wrap">
                                    <div class="payment-sign_box"></div>

                                    <button class="m-btn type01 bg-revert-primary" @click="activeSign = true">서명하기</button>
                                </div>
                            </div>


                            <button class="payment-sign" @click="readyForOrder">결제하기</button>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <sign @sign="sign" v-if="activeSign" />
    </main>
</template>
<style>
.payment-sign_box-wrap .m-btn {width:100%; margin-top:10px;}
</style>
<script>
import Form from "../../utils/Form";
export default {
    middleware: ["auth"],
    data(){
        return {
            product: "",

            form : new Form(this.$axios, {
                product_id: "",
                pay_method_id: "",
                imp_uid: "",
                merchant_uid: "",
                sign: "",
                document: "",
                file: "",
            }),

            activeSign: false,
            signImg: "",
            renderedImg: new Array(),
            contWidth : 200,
            padding: 5,
        }
    },
    methods: {
        test(e){
            this.form.file = e.target.files[0];
        },

        getProduct(){
            this.$axios.get("/api/products/" + this.$route.query.product_id)
                .then(response => {
                    this.product = response.data.data;
                });
        },

        getPayMethods(){
            this.form.get("/api/payMethods")
                .then(response => {
                    this.payMethods = response;

                    if(response.data.length > 0)
                        this.form.pay_method_id = response.data[0].id;
                });
        },

        readyForOrder(){
            if(!this.signImg)
                return alert("서명 후 결제해주세요.");

            this.form.product_id = this.product.id;

            window.scrollTo({top: 0});

            this.createPdf(false, this.order);
        },

        order(){
            if(!this.agree1 || !this.agree2 || !this.agree3 || !this.agree4 || !this.signImg)
                return this.$store.commit("setPop", {
                    title: "확인필요",
                    description: "모든 약관에 동의 및 서명해야만 결제 가능합니다."
                });

            this.form.post("/api/orders")
                .then(response => {
                    if(response.data.order.price == 0) {
                        return this.$auth.fetchUser();
                    }

                    this.pay(response.data.imp_code, response.data.m_redirect_url, response.data.order);
                });
        },

        pay(impCode, redirectUrl, order){
            if(!order)
                return alert("주문에 실패하였습니다. 잠시 후 재시도해주세요");


            let self = this;
            let IMP = window.IMP; // 생략가능

            IMP.init(impCode); // 'iamport' 대신 부여받은 "가맹점 식별코드"를 사용

            IMP.request_pay({
                pg : order.pay_method_pg, // version 1.1.0부터 지원.
                pay_method : order.pay_method_method,
                merchant_uid : order.merchant_uid,
                name : order.product_title,
                amount : order.price,
                buyer_name : this.$auth.user.data.company_name,
                buyer_tel : this.$auth.user.data.company_contact,
                buyer_email : this.$auth.user.data.company_email,
                buyer_addr : '',
                buyer_postcode : '',
                m_redirect_url: redirectUrl
            }, function(rsp) {
                if ( rsp.success ) {
                    self.form.imp_uid = rsp.imp_uid;
                    self.form.merchant_uid = rsp.merchant_uid;

                    self.form.post("/api/orders/complete")
                        .then(response => {
                            self.$store.commit("setPop", {
                                title: "결제성공",
                                description: "결제에 성공하였습니다.",
                            });

                            self.$router.push("/orders");
                        }).catch(error => {
                            alert("결제에 실패하였습니다. 잠시 후 재시도해주세요.");
                    });
                } else {
                    let msg = '에러내용 : ' + rsp.error_msg;

                    alert(msg);
                }
            });
        },

        sign(url){
            this.signImg = url;

            this.activeSign = false;

            this.form.sign = new File([this.dataURLtoBlob(url)], '사인.png', {
                type: "image/png"
            });

            console.log(this.form.sign);
        },

        dataURLtoBlob(dataURI){
            const bytes =
                dataURI.split(',')[0].indexOf('base64') >= 0
                    ? atob(dataURI.split(',')[1])
                    : unescape(dataURI.split(',')[1]);
            const mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
            const max = bytes.length;
            const ia = new Uint8Array(max);
            for (let i = 0; i < max; i++) ia[i] = bytes.charCodeAt(i);

            return new Blob([ia], { type: mime });
        },

        getToday(){
            var today = new Date();
            var year = today.getFullYear();
            var month = (today.getMonth() + 1);
            var day = today.getDate();

            return year + '-' + month + '-' + day;
        },

        createPdf(save = true, onSuccess = () => {}) { //이미지를 pdf로 만들기
            let self = this;

            var lists = document.querySelectorAll(".pdf_page"),
                deferreds = [],
                doc = new jsPDF("p", "mm", "a4"),
                listsLeng = lists.length;

            for (var i = 0; i < listsLeng; i++) { // pdf_page 적용된 태그 개수만큼 이미지 생성
                var deferred = $.Deferred();
                deferreds.push(deferred.promise());
                this.generateCanvas(i, doc, deferred, lists[i]);

                this.form.document += $(lists[i]).wrap("<div/>").parent().html();
            }

            $.when.apply($, deferreds).then(function () { // 이미지 렌더링이 끝난 후
                var sorted = self.renderedImg.sort(function(a,b){return a.num < b.num ? -1 : 1;}), // 순서대로 정렬
                    curHeight = self.padding, //위 여백 (이미지가 들어가기 시작할 y축)
                    sortedLeng = sorted.length;

                for (var i = 0; i < sortedLeng; i++) {
                    var sortedHeight = sorted[i].height, //이미지 높이
                        sortedImage = sorted[i].image; //이미지

                    if( curHeight + sortedHeight > 297 - self.padding * 2 ){ // a4 높이에 맞게 남은 공간이 이미지높이보다 작을 경우 페이지 추가
                        doc.addPage(); // 페이지를 추가함
                        curHeight = self.padding; // 이미지가 들어갈 y축을 초기 여백값으로 초기화
                        doc.addImage(sortedImage, 'jpeg', self.padding , curHeight, self.contWidth, sortedHeight); //이미지 넣기
                        curHeight += sortedHeight; // y축 = 여백 + 새로 들어간 이미지 높이
                    } else { // 페이지에 남은 공간보다 이미지가 작으면 페이지 추가하지 않음
                        doc.addImage(sortedImage, 'jpeg', self.padding , curHeight, self.contWidth, sortedHeight); //이미지 넣기
                        curHeight += sortedHeight; // y축 = 기존y축 + 새로들어간 이미지 높이
                    }
                }

                if(save)
                    doc.save(`우리뷰_계약서(${self.getToday()}).pdf`); //pdf 저장

                self.form.file = new File([doc.output('blob')], `우리뷰_계약서(${self.getToday()}).pdf`, {
                    type: "application/pdf"
                });

                onSuccess();

                curHeight = self.padding; //y축 초기화
                self.renderedImg = new Array; //이미지 배열 초기화

            });
        },

        generateCanvas(i, doc, deferred, curList){ //페이지를 이미지로 만들기
            let self = this;
            var pdfWidth = $(curList).outerWidth() * 0.2645, //px -> mm로 변환
                pdfHeight = $(curList).outerHeight() * 0.2645,
                heightCalc = this.contWidth * pdfHeight / pdfWidth; //비율에 맞게 높이 조절
            html2canvas( curList ).then(
                function (canvas) {
                    var img = canvas.toDataURL('image/jpeg', 1.0); //이미지 형식 지정
                    self.renderedImg.push({num:i, image:img, height:heightCalc}); //renderedImg 배열에 이미지 데이터 저장(뒤죽박죽 방지)
                    deferred.resolve(); //결과 보내기
                }
            );
        }
    },

    computed: {
        user(){
            return this.$auth.user.data;
        }
    },

    mounted() {
        if(this.$auth.user.data.type !== 'COMPANY'){
            this.$store.commit("setPop", {
                title: "구매불가",
                description: "광고주 계정으로만 구매 가능합니다."
            });

            this.$router.back();
        }

        this.getProduct();

        this.getPayMethods();
    }
}
</script>

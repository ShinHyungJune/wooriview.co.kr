<template>

    <main id="main" class="MyPage payment">
        <div class="route-wrap">
            <div class="container3">
                <div class="route-box">
                    <ul class="route">
                        <li>마이페이지</li>
                        <li><i class="xi-angle-right"></i></li>
                        <li>결제 및 내역</li>
                    </ul>
                    <h2>결제 및 내역</h2>
                    <div class="route-bg">
                        <img src="/images/route-bg-4.png" alt="">
                    </div>
                </div>
            </div>
        </div>
        <div class="caution-wrap">
            <div class="container3">
                <div class="caution-box">
                    <!-- 회원권 구매전 -->
                    <div class="caution-left before" v-if="$auth.user.data.first_order">
                        <p class="caution-title">
                            우리뷰에서 광고를 지원할 <br />
                            인플루언서를 구해보세요
                        </p>
                        <p class="caution-sub">
                            결제 전 구매 시 주의사항을 확인해주세요.
                        </p>
                    </div>
                    <!-- //회원권 구매전 -->
                    <!-- 회원권 구매후 -->
                    <div class="caution-left after" v-else>
                        <p class="title">회원권 만료일</p>
                        <p class="caution-date">
                            {{ $auth.user.data.format_expired_at }}
                        </p>
                        <p class="guide-sub">
                            회원권이 <span>{{ $auth.user.data.d_day >= 0 ? $auth.user.data.d_day : 0 }}</span>일 남았어요!
                        </p>
                    </div>
                    <!-- //회원권 구매후 -->
                    <div class="caution-right pc">
                        <p class="title">회원권 구매 시 주의사항</p>
                        <p class="sub">
                            첫구매 할인은 가입 후 첫 구매 시에만 적용되며 첫구매 후에는 일반 구매가격이 적용됩니다. <br />
                            회원권 구매 후 미 사용 시에도 지난 시간에 대한 환불은 어렵습니다. <br />
                            회원권 구매 시 귀사의 광고가 필요한 시점을 고려하여 구매해 주세요.
                        </p>
                    </div>
                </div>
            </div>
            <div class="caution-right mb">
                <p class="title">회원권 구매 시 주의사항</p>
                <p class="sub">
                    첫구매 할인은 가입 후 첫 구매 시에만 적용되며 첫구매 후에는 <br />일반 구매가격이 적용됩니다.<br />
                    회원권 구매 후 미 사용 시에도 지난 시간에 대한 환불은 어렵습니다. <br />
                    회원권 구매 시 귀사의 광고가 필요한 시점을 고려하여 구매해 주세요.
                </p>
            </div>
        </div>
        <div class="payment-type-wrap">
            <div class="container3">
                <div class="list-box">
                    <!--
                    <ul class="payment-type-list">
                        <li v-for="product in products.data" :key="product.id">
                            <p class="small-period">{{ product.title }}</p>
                            <p class="title-period">{{ product.duration }}일</p>
                            <p class="default">
                                기본요금 {{ product.price.toLocaleString() }}원</p>

                            <p class="discount" v-if="product.first_discount_title">{{ product.first_discount_title }}</p>
                            <p class="discount" v-else></p>

                            <p class="default re-po" v-if="product.price_discount > 0">-{{ product.price_discount.toLocaleString() }} 원</p>
                            <p class="default re-po" v-else></p>

                            <p class="default price">결제금액</p>
                            <p class="payment-price" v-if="$auth.user.data.first_order">
                                {{(product.price - product.price_discount).toLocaleString()}}원
                            </p>
                            <p class="payment-price" v-else>
                                {{(product.price).toLocaleString()}}원
                            </p>
                            <button class="buy-btn" @click="$router.push(`/orders/create?product_id=${product.id}`)">구매하기</button>
                        </li>
                    </ul>
                    -->

                    <div class="m-tabs type04">
                        <button :class="`m-tabs-tab ${form.grade === 'BASIC' ? 'active' : ''}`" @click="() => {form.grade = 'BASIC'; getProducts();}">BASIC</button>
                        <button :class="`m-tabs-tab ${form.grade === 'PREMIUM' ? 'active' : ''}`" @click="() => {form.grade = 'PREMIUM'; getProducts();}">PREMIUM</button>
                    </div>

                    <div class="mt-40"></div>

                    <empty v-if="products.data.length === 0" />

                    <div class="payments">
                        <div class="payment-wrap"  v-for="product in products.data" :key="product.id">
                            <div class="payment">
                                <h3 class="title">{{ product.title }} ({{product.duration}}일)</h3>

                                <div class="bodies" v-if="product.grade === 'BASIC'">
                                    <div class="body">
                                        <span class="label-wrap">
                                            <img src="/images/label-check.svg" alt="">
                                        </span>
                                        <span class="icon-wrap">
                                            <img src="/images/Blog-icon.svg" alt="">
                                        </span>
                                        <h3 class="title">블로그 체험단 무제한 진행</h3>
                                    </div>

                                    <div class="body">
                                        <span class="label-wrap">
                                                              <img src="/images/label-check.svg" alt="">
                                        </span>
                                        <span class="icon-wrap">
                                            <img src="/images/구매평.svg" alt="">
                                        </span>
                                        <h3 class="title">구매평 체험단 무제한 진행</h3>
                                    </div>

                                    <div class="body">
                                        <span class="label-wrap">
                                                              <img src="/images/label-check.svg" alt="">
                                        </span>
                                        <span class="icon-wrap">
                                            <img src="/images/Instagram-icon.svg" alt="">
                                        </span>
                                        <h3 class="title">릴스 체험단 무제한 진행</h3>
                                    </div>

                                    <div class="body">
                                        <span class="label-wrap">
                                                              <img src="/images/label-check.svg" alt="">
                                        </span>
                                        <span class="icon-wrap">
                                            <img src="/images/숏츠.svg" alt="">
                                        </span>
                                        <h3 class="title">쇼츠 체험단 무제한 진행</h3>
                                    </div>

                                    <div class="body">
                                        <span class="label-wrap">
                                                              <img src="/images/label-check.svg" alt="">
                                        </span>
                                        <span class="icon-wrap">
                                            <img src="/images/틱톡.svg" alt="">
                                        </span>
                                        <h3 class="title">틱톡 체험단 무제한 진행</h3>
                                    </div>

                                    <div class="body">
                                        <span class="label-wrap">
                                                              <img src="/images/label-check.svg" alt="">
                                        </span>
                                        <h3 class="title">상품 무제한 등록</h3>
                                    </div>

                                    <div class="body">
                                        <span class="label-wrap">
                                            <img src="/images/label-check.svg" alt="">
                                        </span>
                                        <h3 class="title">인원 무제한 선정</h3>
                                    </div>
                                </div>

                                <div class="bodies" v-if="product.grade === 'PREMIUM'">
                                    <div class="body">
                                        <span class="label-wrap">
                                            <img src="/images/label-check.svg" alt="">
                                        </span>
                                        <span class="icon-wrap">
                                            <img src="/images/Blog-icon.svg" alt="">
                                        </span>
                                        <h3 class="title">블로그 체험단 무제한 진행</h3>
                                    </div>

                                    <div class="body">
                                        <span class="label-wrap">
                                                              <img src="/images/label-check.svg" alt="">
                                        </span>
                                        <span class="icon-wrap">
                                            <img src="/images/구매평.svg" alt="">
                                        </span>
                                        <h3 class="title">구매평 체험단 무제한 진행</h3>
                                    </div>

                                    <div class="body">
                                        <span class="label-wrap">
                                                              <img src="/images/label-check.svg" alt="">
                                        </span>
                                        <span class="icon-wrap">
                                            <img src="/images/Instagram-icon.svg" alt="">
                                        </span>
                                        <h3 class="title">릴스 체험단 무제한 진행</h3>
                                    </div>

                                    <div class="body">
                                        <span class="label-wrap">
                                                              <img src="/images/label-check.svg" alt="">
                                        </span>
                                        <span class="icon-wrap">
                                            <img src="/images/숏츠.svg" alt="">
                                        </span>
                                        <h3 class="title">쇼츠 체험단 무제한 진행</h3>
                                    </div>

                                    <div class="body">
                                        <span class="label-wrap">
                                                              <img src="/images/label-check.svg" alt="">
                                        </span>
                                        <span class="icon-wrap">
                                            <img src="/images/틱톡.svg" alt="">
                                        </span>
                                        <h3 class="title">틱톡 체험단 무제한 진행</h3>
                                    </div>

                                    <div class="body">
                                        <span class="label-wrap">
                                            <img src="/images/label-star.svg" alt="">
                                        </span>
                                        <h3 class="title">스마트 블록 타겟 마케팅</h3>
                                    </div>

                                    <div class="body">
                                        <span class="label-wrap">
                                            <img src="/images/label-star.svg" alt="">
                                        </span>
                                        <h3 class="title">캠페인 진행 AI 배정(담당자)</h3>
                                    </div>
                                </div>

                                <div class="box-price">
<!--                                    <p class="discount" v-if="product.first_discount_title">{{ product.first_discount_title }}</p>
                                    <p class="discount" v-else></p>

                                    <p class="default re-po" v-if="product.price_discount > 0">-{{ product.price_discount.toLocaleString() }} 원</p>
                                    <p class="default re-po" v-else></p>

                                    <p class="default price">결제금액</p>
                                    <p class="payment-price" v-if="$auth.user.data.first_order">
                                        {{(product.price - product.price_discount).toLocaleString()}}원
                                    </p>
                                    <p class="payment-price" v-else>
                                        {{(product.price).toLocaleString()}}원
                                    </p>-->
                                    <h3 class="title">결제금액</h3>

                                    <p class="point" v-if="product.first_discount_title">{{ product.first_discount_title }}</p>
                                    <p class="point" v-else></p>

                                    <p class="price-discount">{{ product.price.toLocaleString() }} 원</p>

                                    <p class="price-final" v-if="$auth.user.data.first_order">
                                        {{(product.price - product.price_discount).toLocaleString()}}원
                                    </p>
                                    <p class="price-final" v-else>
                                        {{(product.price).toLocaleString()}}원
                                    </p>
                                </div>

                                <button class="btn" @click="$router.push(`/orders/create?product_id=${product.id}`)">구매하기</button>
                            </div>
                        </div>
                    </div>

                    <div class="mt-40"></div>

                    <div class="table-section">
                        <div class="table-tab-wrap">
                            <div class="table-wrap">
                                <ul class="thead">
                                    <li class="th">
                                        <span class="pc">이벤트</span>대상
                                    </li>
                                    <li class="th" v-for="product in products.data" :key="product.id">
                                        {{ product.title }} ({{product.grade}})
                                    </li>
                                </ul>
                                <ul class="tbody">
                                    <li>
                                        <span class="pc">신규</span>고객 (BASIC)

                                    </li>
                                    <li v-for="product in products.data" :key="product.id">
                                        {{ product.first_discount_title ? product.first_discount_title : "-" }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="table-section list-table">
            <div class="container3">
                <!-- <div class="table-top-wrap">
                    <p class="table-title">이용권 구매 내역</p>
                </div> -->
                <div class="toggle-box table-top-wrap">
                    <p class="table-title">이용권 구매 내역</p>
<!--                    <i class="xi-angle-down"></i>-->
                </div>

                <div class="table-tab-wrap">
                    <div class="table-count" style=" margin-bottom:10px;font-weight:bold;">총 {{orders.data.length}}건</div>
                    <div class="table-wrap">
                        <ul class="thead">
                            <li class="th">
                                일자
                            </li>
                            <li class="th">
                                상품
                            </li>
                            <li class="th">
                                금액
                            </li>
                            <li class="th">
                                상태
                            </li>
                            <li class="sign-th"></li>
                        </ul>

                        <empty v-if="orders.data.length === 0"/>

                        <ul :class="`tbody ${order.state === 'REFUND' ? 'refund' : ''}`" v-for="order in orders.data" :key="order.id">
                            <li>
                                {{ order.format_created_at }}
                            </li>
                            <li >
                                {{order.product_price == order.price ? order.product_title : order.product_first_discount_title + " " + order.product_title }}
                            </li>
                            <li>
                                {{order.price.toLocaleString()}}
                            </li>
                            <li>
                                {{ order.state === 'REFUND' ? '환불' : '구매' }}
                            </li>
                            <li class="sign-th">
                                <a target="_blank" :href="order.file.url" class="m-btn type01 bg-revert-primary" v-if="order.file">계약서 보기</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <pagination :meta="orders.meta" @paginate="(page) => {form.page = page; getOrders()}" />

            </div>
        </div>
    </main>
</template>
<style>

</style>
<script>
import Form from "../../utils/Form";
export default {
    middleware: ["auth"],

    components: {},

    data(){
        return {
            orders: {
                data: [],
                meta: {},
                links: {}
            },

            products: {
                data: [],
                meta: {},
                links: {},
            },

            form: new Form(this.$axios, {
                page: 1,
                product_id: "",
                pay_method_id: "",
                imp_uid: "",
                merchant_uid: "",
                grade: "BASIC",
            })
        }
    },
    methods: {
        ready(){
            return alert("준비중입니다.");
        },

        getProducts(){
            this.$axios.get("/api/products",{
                params: this.form.data(),
            })
                .then(response => {
                    this.products = response.data;
                });
        },

        getOrders(){
            this.$axios.get("/api/orders")
                .then(response => {
                    this.orders = response.data;
                });
        },
    },

    computed: {

    },

    mounted() {
        this.getProducts();

        this.getOrders();
    },

    watch: {

    },
}
</script>

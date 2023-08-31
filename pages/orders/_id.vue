<template>
    <main id="main" class="MyPage payment-detail orders-detail">
        <div class="yellow-box"></div>

        <section class="payment-detail-wrap">
            <div class="logo-wrap">
                <img src="/images/logo.png" alt="">
            </div>

            <div class="payment-top">
                <button class="payment-sign" @click="createPdf">PDF <i class="xi-download"></i></button>
            </div>

            <div class="container" v-html="order.document">
            </div>
        </section>

    </main>
</template>
<style>
.orders-detail .payment-top {
    display: flex; align-items: center; justify-content: flex-end; padding:0 40px;
}
.payment-sign_box-wrap .m-btn {width:100%; margin-top:10px;}
.orders-detail .payment-sign {
    margin:0; margin-left:auto;
}
</style>
<script>
import Form from "../../utils/Form";
export default {
    middleware: ["auth"],
    data(){
        return {
            order: "",

            form : new Form(this.$axios, {
                product_id: "",
                pay_method_id: "",
                imp_uid: "",
                merchant_uid: "",
                sign: "",
            }),

            activeSign: false,
            renderedImg: new Array(),
            contWidth : 200,
            padding: 5,
        }
    },
    methods: {
        getOrder(){
            this.$axios.get("/api/orders/" + this.$route.params.id)
                .then(response => {
                    this.order = response.data.data;
                });
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
                    doc.save('계약서.pdf'); //pdf 저장

                onSuccess();

                /*self.form.file = new File([doc.output('datauristring')], '계약서.pdf', {
                    type: "application/pdf"
                });*/

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

        this.getOrder();
    }
}
</script>

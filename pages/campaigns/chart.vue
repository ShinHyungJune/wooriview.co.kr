<template>
    <main id="main" class="MyPage statistics" v-if="campaign">
        <div class="container3">
            <div class="title-wrap" v-if="campaign.type_sns === 'INSTAGRAM'">
                <div class="img-wrap">
                    <img src="/images/Instagram-icon.svg" alt="">
                </div>
                <p>INSTAGRAM 통계</p>
            </div>

            <div class="title-wrap" v-if="campaign.type_sns === 'NAVER'">
                <div class="img-wrap">
                    <img src="/images/Blog-icon.svg" alt="">
                </div>
                <p>블로그 통계</p>
            </div>
        </div>
        <div class="route-wrap">
            <div class="container3">
                <div class="white-box">
                    <div class="left-box">
                        <div class="img-box">
                            <img :src="campaign.img.url" alt="" v-if="campaign.img">
                        </div>
                        <div class="info-box-wrap">
                            <div class="info-box-top">
                                <div class="info-box-top_top">
                                    <div class="sticker-wrap">
                                        <div class="sticker">
                                            <img src="/images/Live-icon.png" alt="" v-if="campaign.type_campaign === 'REALTIME'">
                                            <img src="/images/Visit-icon.png" alt="" v-if="campaign.type_campaign === 'VISIT'">
                                            <img src="/images/Reporter-icon.png" alt="" v-if="campaign.type_campaign === 'REPORTER'">
                                            <img src="/images/Shipping-icon.png" alt="" v-if="campaign.type_campaign === 'DELIVERY'">
                                        </div>
                                        <div class="sticker">
                                            <img src="/images/Instagram-icon.svg" alt="" v-if="campaign.type_sns === 'INSTAGRAM'">
                                            <img src="/images/Blog-icon.svg" alt="" v-if="campaign.type_sns === 'NAVER'">
                                        </div>
                                    </div>
                                </div>
                                <p class="info-title">[{{ campaign.title_company }}] {{campaign.title_product }}</p>
                                <P class="info-sub">{{ campaign.title_product }}</P>
                            </div>

                            <div class="info-box-btm">
                                <ul>
                                    <li>
                                        신청 <span class="application-unit">{{ campaign.applications_count }}</span>
                                    </li>
                                    <li>
                                        모집 <span>{{ campaign.max_participant }}</span>
                                    </li>
                                    <li>
                                        선정된 인플루언서 <span class="inful-unit">{{ campaign.count_select }}</span>
                                    </li>
                                </ul>
                            </div>
                            <!-- // -->
                        </div>
                    </div>
                    <div class="right-box">
                        <ul>
                            <li>
                                <p class="period-title">인플루언서 모집기간</p>
                                <P class="period" v-if="campaign.type_campaign === 'REALTIME'">{{ campaign.time_hire_started_at }} ~ {{ campaign.time_hire_finished_at }}</P>
                                <P class="period" v-else>{{ campaign.format_hire_started_at }} ~ {{ campaign.format_hire_finished_at }}</P>
                            </li>
                            <li>
                                <p class="period-title">인플루언서 선정기간</p>
                                <P class="period">{{ campaign.format_select_started_at }} ~ {{ campaign.format_select_finished_at }}</P>
                            </li>
                            <li>
                                <p class="period-title">리뷰어 컨텐츠 등록기간</p>
                                <P class="period">{{ campaign.format_review_started_at }} ~ {{ campaign.format_review_finished_at }}</P>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
        <div class="mid-wrap">
            <a class="btn-list" href="#" @click.prevent="downloadApplications">선정자 명단 다운로드</a>
            <a class="btn-report" href="#" @click.prevent="downloadCampaign">보고서 다운로드</a>
            <a href="#" id="download" style="opacity:0; position:absolute; left:0; bottom:0; z-index:-10"></a>
<!--            <a class="btn-chat" href="완료/chat-advertiser.html">1:1 채팅</a>-->
        </div>
        <div class="grap-box">
            <div class="grap-info-wrap">
                <div class="left-wrap">
                    <p class="title">누적 성과</p>
<!--                    <p class="title">리뷰 작성 기간</p>-->
                    <p class="period">{{ campaign.format_report_started_at }} ~ {{ campaign.format_report_finished_at }}</p>
                </div>
                <div class="right-wrap">
                    <div class="data">
                        <div class="cir yellow"></div>
                        <p class="name">좋아요</p>
                    </div>
                    <div class="data">
                        <div class="cir black"></div>
                        <p class="name">댓글</p>
                    </div>
                </div>
            </div>
            <div class="chart-wrap">
                <div id="curve_chart"></div>
            </div>
            <div class="grap-statistics-wrap">
                <ul>
                    <li>
                        <p class="title">등록된 리뷰</p>
                        <p class="count">{{ parseInt(applications.meta.total).toLocaleString() }}</p>
                    </li>
                    <li>
                        <p class="title">총 인게이지먼트(누적|평균)</p>
                        <div class="count-wrap">
                            <p class="count">{{ parseInt(metrics.count_engagement).toLocaleString() }}</p>
                            |
                            <p class="average">{{ parseInt(metrics.average_engagement).toLocaleString() }}</p>
                        </div>
                    </li>
                    <li v-if="campaign.type_sns === 'INSTAGRAM'">
                        <p class="title">좋아요 수(누적|평균)</p>
                        <div class="count-wrap">
                            <p class="count">{{ parseInt(metrics.count_like).toLocaleString() }}</p>
                            |
                            <p class="average">{{ parseInt(metrics.average_like).toLocaleString() }}</p>
                        </div>
                    </li>
                    <li v-if="campaign.type_sns === 'INSTAGRAM'">
                        <p class="title">댓글 수(누적|평균)</p>
                        <div class="count-wrap">
                            <p class="count">{{ parseInt(metrics.count_comment).toLocaleString() }}</p>
                            |
                            <p class="average">{{ parseInt(metrics.average_comment).toLocaleString() }}</p>
                        </div>
                    </li>
                    <li v-if="campaign.type_sns === 'NAVER'">
                        <p class="title">조회 수(누적|평균)</p>
                        <div class="count-wrap">
                            <p class="count">{{ parseInt(metrics.count_view).toLocaleString() }}</p>
                            |
                            <p class="average">{{ parseInt(metrics.average_view).toLocaleString() }}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="table-section statistic-table">
            <div class="container3">
                <div class="table-tab-wrap">
                    <div class="table-wrap">
                        <ul class="thead">
                            <li class="th">
                                식별번호
                            </li>
                            <li class="th">
                                리뷰
                            </li>
                            <li class="th">
                                인게이지먼트
                            </li>
                            <li class="th" v-if="campaign.type_sns === 'INSTAGRAM'">
                                댓글
                            </li>

                            <li class="th" v-if="campaign.type_sns === 'INSTAGRAM'">
                                좋아요
                            </li>
                            <li class="th" v-if="campaign.type_sns === 'NAVER'">
                                조회수
                            </li>
<!--                            <li class="th">
                                팔로우
                            </li>-->
                        </ul>
                        <empty v-if="applications.data.length === 0" />
                        <ul class="tbody" v-for="application in applications.data" :key="application.id">
                            <li class="add-unit">
                                <span class="unit mb">고유번호</span>
                                <span class="num">{{application.id}}</span>
                            </li>
                            <li class="review-li" >
<!--                                <div class="img-wrap left">
                                    <img src="" alt="우리뷰">
                                </div>-->
                                <div class="review-info-wrap">
                                    <div class="info-top">
                                        <div class="user-wrap">
                                            <div class="img-wrap">
                                                <img :src="application.user.img.url" alt="우리뷰" v-if="application.user.img">
                                                <img src="/images/basic-user.png" alt="우리뷰" v-else>
                                            </div>
                                            <p class="user-name">{{ application.user.nickname }}</p>
                                        </div>
<!--                                        <button class="btn-url" href="">URL복사</button>-->
                                        <a :href="application.url_review" class="btn-url" v-if="application.url_review">바로가기</a>
                                    </div>
                                    <div class="info-btm">
                                        <p v-if="application.url_review">{{application.sns_description ? application.sns_description.slice(0, 50) : ''}}</p>
                                        <!--
                                        <a :href="application.url_review" target="_blank" v-if="application.url_review">{{application.url_review}}</a>
                                        -->
                                        <p v-else>리뷰 미등록</p>
<!--                                        <p>
                                            #협찬 #가벼운선글라스하나장만했네 #라피스센시블레 #캠핑선글라스쓰기좋고 이만한게 없는 듯 디자인도 예쁘고 김서림 방지가
                                            있어서 괜찮은듯 하넹 어두운곳이나 밝은곳에서 시야확보가 가능한 자외선 차단렌즈에요 :)
                                            협찬으로 받은 햇빛으로부터 눈보호가 필요한 더운 여름 날씨 필수템으로 유니크한 매력의 등산 선글라스입니다.
                                        </p>-->
                                    </div>
                                </div>
                            </li>
                            <li class="add-unit">
                                <span class="unit mb">인게이지먼트: </span>
                                <span>{{ (application.count_like + application.count_comment + application.count_view).toLocaleString() }}</span>
                            </li>
                            <li class="add-unit" v-if="campaign.type_sns === 'INSTAGRAM'">
                                <span class="unit mb">댓글: </span>
                                <span>{{ application.count_comment.toLocaleString() }}</span>
                            </li>
                            <li class="add-unit" v-if="campaign.type_sns === 'INSTAGRAM'">
                                <span class="unit mb">좋아요: </span>
                                <span>{{ application.count_like.toLocaleString() }}</span>
                            </li>
                            <li class="add-unit" v-if="campaign.type_sns === 'NAVER'">
                                <span class="unit mb">조회수: </span>
                                <span>{{ application.count_view.toLocaleString() }}</span>
                            </li>
<!--                            <li class="add-unit">
                                <span class="unit mb">팔로워: </span>
                                <span>{{ application.count_engagement.toLocaleString() }}</span>
                            </li>-->
                        </ul>
                    </div>
                </div>

                <pagination :meta="applications.meta" @paginate="(page) => {form.page = page; getApplications()}" />

            </div>
        </div>

    </main>
</template>

<script>
import Form from "../../utils/Form";
export default {
    // middleware: ["auth"],

    data(){
        return {
            form : new Form(this.$axios, {
            }),
            campaign: "",
            applications: {
                data: [],
                meta: {
                    total :0
                },
                links: {}
            },
            metrics: {
                count_engagement: 0,
                average_engagement: 0,
                count_comment: 0,
                average_comment: 0,
                count_like: 0,
                average_like: 0,
                count_view: 0,
                average_view: 0,
            },
            reports: []
        }
    },
    methods: {
        getCampaign(){
            this.$axios.get("/api/campaigns/" + this.$route.query.campaign_id)
                .then(response => {
                    this.campaign = response.data.data;
                });
        },

        getApplications(){
            this.$axios.get("/api/applications", {
                params: {
                    campaign_id: this.$route.query.campaign_id,
                    selected: 1,
                }
            }).then(response => {
                this.applications = response.data;
            });
        },

        getChart(){
            let self = this;
            this.$axios.get("/api/campaigns/chart", {
                params: {
                    campaign_id: this.$route.query.campaign_id
                }
            }).then(response => {
                this.reports = response.data.data.reports;
                this.metrics = response.data.data.metrics;

                setTimeout(function(){
                    self.drawChart();
                }, 300);
            })
        },

        drawChart(){
            let self = this;

            if(this.reports.length !== 0){
                google.charts.load('current', {'packages':['corechart']});
                google.charts.setOnLoadCallback(drawChart);

                function drawChart() {
                    if(self.campaign.type_sns === 'INSTAGRAM'){
                        var data = google.visualization.arrayToDataTable([
                            ['Year', '좋아요', '댓글'],
                            ...self.reports.map(report => {
                                return [
                                    report.date.substring(5),
                                    parseInt(report.total_like),
                                    parseInt(report.total_comment)
                                ];
                            })]
                        );
                    }

                    if(self.campaign.type_sns === 'NAVER'){
                        var data = google.visualization.arrayToDataTable([
                            ['Year', '조회수'],
                            ...self.reports.map(report => {
                                return [
                                    report.date.substring(5),
                                    parseInt(report.total_view),
                                ];
                            })]
                        );
                    }

                    var options = {
                        curveType: 'function',
                        legend: { position: 'none' }, // 종류 안보이게
                        width: '100%', // 반응형을 위한 width
                        backgroundColor: '#f5f5f5',
                        fontSize: 12,
                        series:
                            {
                                0: { lineWidth: 3 },
                                1: { lineWidth: 3 }, //라인 굵기
                            },
                        colors: ['#ffc800', '#202020' ], // 좋아요 라인 , 댓글 라인 색상
                        chartArea: {'width': '86%', 'height': '70%'}, // 차트가 차지하는 범위
                        scales: {
                            yAxes: [{
                                ticks: {
                                    min: 0, //Y축 최소단위
                                    stepSize : 1000, // Y축 간격
                                }
                            }],
                        },
                    }

                    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
                    chart.draw(data, options);
                }

                $.fn.hasScrollBar = function() {
                    return (this.prop("scrollWidth") == 0 && this.prop("clientWidth") == 0)
                        || (this.prop("scrollWidth") > this.prop("clientWidth"));
                }; // 좌우 스크롤이 있는지 없는지 여부 검사
                function wheel(name){
                    $(name).on('mousewheel',function(e){
                        var hasScroll = $(this).hasScrollBar();
                        if(!hasScroll){ //스크롤이 없으면 그냥 일반 스크롤
                        }else{ //있으면 아래 스크롤 받는값을 없애고 좌우스크롤
                            e.preventDefault();
                            var wheelDelta = e.originalEvent.wheelDelta;
                            if(wheelDelta > 0){
                                $(this).scrollLeft(-wheelDelta + $(this).scrollLeft());
                            }else{
                                $(this).scrollLeft(-wheelDelta + $(this).scrollLeft());
                            }
                        }
                    });
                }
                $(function(){
                    wheel('.chart-wrap #curve_chart');
                });
            }

        },

        downloadApplications(){
            this.$axios.get("/api/applications/download", {
                params: {
                    campaign_id: this.$route.query.campaign_id
                }
            }).then(response => {
                let a = document.getElementById("download");

                a.href = response.data.data;

                a.click();
            })
        },

        downloadCampaign(){
            this.$axios.get("/api/campaigns/download", {
                params: {
                    campaign_id: this.$route.query.campaign_id
                }
            }).then(response => {
                let a = document.getElementById("download");

                console.log(response);
                a.href = response.data.data;

                a.click();
            })
        }
    },

    computed: {

    },

    mounted() {
        this.getCampaign();
        this.getApplications();
        this.getChart();
    },

    watch: {

    }
}
</script>

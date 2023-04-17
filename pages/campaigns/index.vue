<template>
    <main id="main" class="campaign-page">
        <section class="section1">
            <div class="container">
                <div class="Map-Search-wrap" id="map" ref="map" v-if="showMap">

                </div>
                <a class="img-wrap" href="#" @click.prevent="() => showMap = true" v-else>
                    <img src="/images/Map_Search2.jpg" alt="" class="pc">
                    <img src="/images/Map_Search2-mb.jpg" alt="" class="mb">
                </a>
            </div>
        </section>

        <section class="section2" v-if="categories.data.length > 0">
            <div class="container">
                <div class="category-ck-wrap">
                    <div class="category-ck" v-for="category in categories.data" :key="category.id">
                        <input type="checkbox" name="" :id="category.id" :value="category.id" v-model="form.category_ids" @change="() => getCampaigns()">
                        <label :for="category.id">
                            <div class="img-wrap">
                                <img :src="category.active.url" alt="" class="active">
                                <img :src="category.inactive.url" alt="" class="inactive">
                            </div>
                            <p class="label-title">{{ category.title }}</p>
                        </label>
                    </div>
                </div>
            </div>
        </section>

        <section class="section3">
            <div class="container">
                <div class="filter-wrap">
                    <div class="filter-hd">
                        <p>FILTER</p>
                        <i class="xi-angle-down"></i>
                    </div>
                    <div class="filter-bd">
                        <div class="filter-li">
                            <p class="filter-title">캠페인</p>
                            <ul class="filter-ck-wrap">
                                <li class="filter-ck">
                                    <input type="checkbox" name="" id="VISIT" value="VISIT" v-model="form.type_campaigns" @change="() => getCampaigns()">
                                    <label for="VISIT">
                                        <i class="xi-check-square"></i>
                                        <i class="xi-checkbox-blank"></i>
                                        방문 캠페인
                                    </label>
                                </li>
                                <li class="filter-ck">
                                    <input type="checkbox" name="" id="DELIVERY" value="DELIVERY" v-model="form.type_campaigns" @change="() => getCampaigns()">
                                    <label for="DELIVERY">
                                        <i class="xi-check-square"></i>
                                        <i class="xi-checkbox-blank"></i>
                                        배송 캠페인
                                    </label>
                                </li>
                                <li class="filter-ck">
                                    <input type="checkbox" name="" id="REPORTER" value="REPORTER" v-model="form.type_campaigns" @change="() => getCampaigns()">
                                    <label for="REPORTER">
                                        <i class="xi-check-square"></i>
                                        <i class="xi-checkbox-blank"></i>
                                        기자단 캠페인
                                    </label>
                                </li>
                                <li class="filter-ck">
                                    <input type="checkbox" name="" id="REALTIME" value="REALTIME" v-model="form.type_campaigns" @change="() => getCampaigns()">
                                    <label for="REALTIME">
                                        <i class="xi-check-square"></i>
                                        <i class="xi-checkbox-blank"></i>
                                        실시간 캠페인
                                    </label>
                                </li>
                            </ul>
                        </div>
                        <div class="bar"></div>
                        <div class="filter-li">
                            <p class="filter-title">인플루언서</p>
                            <ul class="filter-ck-wrap">
                                <li class="filter-ck">
                                    <input type="checkbox" name="" id="INSTAGRAM" value="INSTAGRAM" v-model="form.type_snses" @change="() => getCampaigns()">
                                    <label for="INSTAGRAM">
                                        <i class="xi-check-square"></i>
                                        <i class="xi-checkbox-blank"></i>
                                        인스타그램
                                    </label>
                                </li>
                                <li class="filter-ck">
                                    <input type="checkbox" name="" id="NAVER" value="NAVER" v-model="form.type_snses" @change="() => getCampaigns()">
                                    <label for="NAVER">
                                        <i class="xi-check-square"></i>
                                        <i class="xi-checkbox-blank"></i>
                                        네이버 블로그
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="section4">
            <div class="container">
                <div class="campaign-item-wrap">
                    <empty v-if="campaigns.data.length === 0" />

                    <ul class="campaign-item-list">
                        <campaign :campaign="campaign" v-for="campaign in campaigns.data" :key="campaign.id" />
                    </ul>

                    <!--
                    <pagination :meta="campaigns.meta" @paginate="(page) => {form.page = page; getCampaigns()}" />
                    -->

                    <loadMore :links="campaigns.links" @loadMore="() => {getCampaigns(true)}" />

                    <!--
                    <div class="Pagination-wrap">
                        <a href="" class="Prev"><i class="xi-angle-left-min"></i></a>
                        <ul class="Pagination-num">
                            <li><a href="" class="now">1</a></li>
                            <li><a href="">2</a></li>
                            <li><a href="">3</a></li>
                            <li><a href="">4</a></li>
                        </ul>
                        <a href="" class="next"><i class="xi-angle-right-min"></i></a>
                    </div>
                    -->
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import Form from "../../utils/Form";
export default {
    data(){
        return {
            showMap: false,

            campaigns: {
                data: [],
                links : {},
                meta: {},
            },

            allCampaigns: {
                data: [],
                links : {},
                meta: {},
            },

            categories: {
                data: [],
                links : {},
                meta: {}
            },

            infoWindows: [],

            x: "127.7362176",
            y: "37.8535936",

            form : new Form(this.$axios, {
                word: this.$route.query.word ? this.$route.query.word : "",
                category_ids: [],
                type_snses: this.$route.query.type_sns ? [this.$route.query.type_sns] : ["INSTAGRAM", "NAVER"],
                type_campaigns: this.$route.query.type_campaign ? [this.$route.query.type_campaign] : ["REPORTER", "DELIVERY", "VISIT", "REALTIME"],
                page:1,
            }),
        }
    },
    methods: {
        getCampaigns(loadMore = false){
            if(loadMore)
                this.form.page += 1;

            this.$axios.get("/api/campaigns", {
                params: this.form
            }).then(response => {
                if(loadMore)
                    return this.campaigns = {
                        ...response.data,
                        data: [...this.campaigns.data, ...response.data.data]
                    };

                return this.campaigns = response.data;
            })
        },

        getCategories(){
            this.$axios.get("/api/categories")
                .then(response => {
                    this.categories = response.data;

                    this.form.category_ids = this.categories.data.map(category => category.id);
                });
        },

        getAllCampaigns(loadMore = false){
            this.$axios.get("/api/campaigns", {
                type_campaigns: ["REALTIME", "VISIT", "DELIVERY"],
                take: 1000,
                onHire: 1
            }).then(response => {
                this.allCampaigns = response.data;
            })
        },

        initMap() {
            const container = this.$refs.map; //지도를 담을 영역의 DOM 레퍼런스

            const options = {
                //지도를 생성할 때 필요한 기본 옵션
                center: new kakao.maps.LatLng(this.y, this.x), //지도의 중심좌표.
                level: 10, //지도의 레벨(확대, 축소 정도)
            };

            var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

            this.map = map;

            // 주소-좌표 변환 객체를 생성합니다
            var geocoder = new kakao.maps.services.Geocoder();

            let self = this;

            this.allCampaigns.data.map(campaign => {
                // 주소로 좌표를 검색합니다
                geocoder.addressSearch(
                    campaign.address,
                    function (result, status) {
                        // 정상적으로 검색이 완료됐으면
                        if (status === kakao.maps.services.Status.OK) {
                            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                            // 결과값으로 받은 위치를 마커로 표시합니다
                            var marker = new kakao.maps.Marker({
                                map: map,
                                position: coords,
                            });

                            // 인포윈도우로 장소에 대한 설명을 표시합니다
                            var infowindow = new kakao.maps.CustomOverlay({
                                map: map,
                                position: coords,
                                content:
                                    `<div class="infoWindow" style="">
<h3 class="title">${campaign.title_product}</h3>
<a href="/campaigns/${campaign.id}" class="btn">바로가기</a>
</div>`,
                                yAnchor: 1,
                            });

                            self.infoWindows.push(infowindow);

                            infowindow.setVisible(false);

                            kakao.maps.event.addListener(marker, "click", function () {
                                self.infoWindows.map(infowindow => infowindow.setVisible(false));

                                // InfoWindow를 마커 위에 표시합니다
                                infowindow.setVisible(!infowindow.getVisible());
                            });

                            // infowindow.open(map, marker);

                            // 내 위치를 기준으로 계속 고정시키기
                            map.setCenter(new kakao.maps.LatLng(self.y, self.x));
                        }
                    }
                );
            });

        },
    },

    computed: {

    },

    mounted() {
        if (navigator.geolocation) {
            // 위치 정보를 가져올 수 있는 경우
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.y = position.coords.latitude;
                    this.x = position.coords.longitude;
                    console.log(this.y, this.x);
                },
                (error) => {
                    console.error(error.message);
                }
            );
        }

        $(".filter-hd").click(function () {
            $(".filter-bd").toggleClass("open");
            $(this).toggleClass("open");
        })

        this.getCampaigns();

        this.getCategories();

        this.getAllCampaigns();
    },

    watch: {
        showMap(newValue, oldValue){
            if(newValue == true){
                let self = this;

                setTimeout(function(){
                    kakao.maps.load(self.initMap);
                }, 500);
            }
        },

        "$route.query.type_campaign": {
            handler : function(val, oldVal){
                if(val)
                    this.form.type_campaigns = [val];

                this.getCampaigns();
            },

            deep: true,
        },

        "$route.query.word": {
            handler : function(val, oldVal){
                this.form.word = val;

                this.getCampaigns();
            },

            deep: true,
        }
    },
}
</script>

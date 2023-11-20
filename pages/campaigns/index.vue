<template>
    <main id="main" class="campaign-page">
        <section class="section1">
            <div class="container">
                <div v-for="campaignBanner in campaignBanners.data" :key="campaignBanner.id"
                    :class="`campaign-tab img-wrap ${$route.query.type_campaign === 'REPORTER' || $route.query.type_campaign === 'DELIVERY' || !$route.query.type_campaign ? 'active' : ''}`">
                    <img :src="campaignBanner.pc.url" alt="" class="pc" v-if="campaignBanner.pc">
                    <img :src="campaignBanner.mobile.url" alt="" class="mb" v-if="campaignBanner.mobile">
                </div>

                <div :class="`campaign-tab ${$route.query.type_campaign === 'VISIT' || $route.query.type_campaign === 'REALTIME' ? 'active' : ''}`">
                    <div v-if="showMap">
                        <div class="Map-Search-wrap" id="map" ref="map">
                            <a href="#" class="btn-center" @click.prevent="center">
                                <i class="xi-maker"></i>
                            </a>
                        </div>

                        <div class="map-select-wrap">
                            <input-region @change="changeAddress" />
                        </div>

                        <div class="marker-tips">
                            <div class="tooltip-content" @click="() => form.type_campaigns = ['REALTIME']">
                                <div class="tooltip-img-wrap">
                                    <img src="/images/marker-p.png" alt="">
                                </div>
                                <p class="tooltip-title">실시간</p>
                            </div>
                            <div class="tooltip-content" @click="() => form.type_campaigns = ['VISIT']">
                                <div class="tooltip-img-wrap">
                                    <img src="/images/marker-b.png" alt="">
                                </div>
                                <p class="tooltip-title">방문형</p>
                            </div>
                        </div>
                    </div>

                    <a class="img-wrap" href="#" @click.prevent="() => showMap = true" v-else>
                        <img src="/images/Map_Search2.jpg" alt="" class="pc">
                        <img src="/images/Map_Search2-mb.jpg" alt="" class="mb">
                    </a>
                </div>
            </div>
        </section>

        <section class="section2" v-if="categories.data.length > 0">
            <div class="container">
                <div class="cate-scroll-wrap">
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
                        <div class="bar"></div>
                        <div class="filter-li">
                            <p class="filter-title">정렬</p>
                            <ul class="filter-ck-wrap">
                                <li class="filter-ck">
                                    <input type="radio" name="" id="created_at" value="created_at" v-model="form.order_by" @change="() => getCampaigns()">
                                    <label for="created_at">
                                        <i class="xi-check-square"></i>
                                        <i class="xi-checkbox-blank"></i>
                                        최신순
                                    </label>
                                </li>
                                <li class="filter-ck">
                                    <input type="radio" name="" id="applications_count" value="applications_count" v-model="form.order_by" @change="() => getCampaigns()">
                                    <label for="applications_count">
                                        <i class="xi-check-square"></i>
                                        <i class="xi-checkbox-blank"></i>
                                        인기순
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
            showMap: this.$route.query.showMap,

            alreadyInitMap: false,

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

            campaignBanners: {
                data: [],
                links : {},
                meta: {}
            },

            infoWindows: [],

            x: "127.047059839521",
            y: "37.5179681611717",

            defaultX: "127.047059839521",
            defaultY: "37.5179681611717",

            form : new Form(this.$axios, {
                address: "",
                word: this.$route.query.word ? this.$route.query.word : "",
                category_ids: [],
                type_snses: this.$route.query.type_sns ? [this.$route.query.type_sns] : ["INSTAGRAM", "NAVER"],
                type_campaigns: this.$route.query.type_campaign ? [this.$route.query.type_campaign] : ["REPORTER", "DELIVERY", "VISIT", "REALTIME"],
                page:1,
                order_by : this.$route.query.order_by || "hire_finished_at",
                align : this.$route.query.align || "desc",
                // ongoingHire : this.$route.ongoingHire || 1,
            }),

            activeMyPosition: false,

        }
    },
    methods: {
        center(){
            this.map.setCenter(new kakao.maps.LatLng(this.defaultY, this.defaultX));
        },

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

        searchAddress(address){
            let self = this;
            let geocoder = new kakao.maps.services.Geocoder();

            geocoder.addressSearch(
                    address,
                    function (result, status) {
                        // 정상적으로 검색이 완료됐으면
                        if (status === kakao.maps.services.Status.OK) {
                            self.y = result[0].y;
                            self.x = result[0].x;
                        }
                    }
                );
        },

        changeAddress(data){
            this.form.address = data.city + " " + data.area;

            this.getAllCampaigns(false);

            this.searchAddress(this.form.address);
        },

        getCategories(){
            this.$axios.get("/api/categories")
                .then(response => {
                    this.categories = response.data;

                    // this.form.category_ids = this.categories.data.map(category => category.id);
                });
        },

        getAllCampaigns(defaultCenter = true){
            let self = this;

            this.$axios.get("/api/campaigns", {
                params: {
                    type_campaigns: ["REALTIME", "VISIT"],
                    take: 1000,
                    ongoingHire: 1,
                    address: this.form.address,
                }
            }).then(response => {
                this.allCampaigns = response.data;

                if(this.showMap)
                    setTimeout(function(){
                        kakao.maps.load(() => {self.initMap(defaultCenter)});
                    }, 300);
            })
        },

        getCampaignBanners(){
            this.$axios.get("/api/campaignBanners")
                .then(response => {
                    this.campaignBanners = response.data;
            })
        },

        initMap(defaultCenter) {
            const container = this.$refs.map; //지도를 담을 영역의 DOM 레퍼런스

            const options = {
                //지도를 생성할 때 필요한 기본 옵션
                center: new kakao.maps.LatLng(this.y, this.x), //지도의 중심좌표.
                level: 8, //지도의 레벨(확대, 축소 정도)
            };

            var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

            this.map = map;

            // 주소-좌표 변환 객체를 생성합니다
            var geocoder = new kakao.maps.services.Geocoder();

            let self = this;

            if(this.activeMyPosition){
                var coords = new kakao.maps.LatLng(this.defaultY, this.defaultX);

                // 결과값으로 받은 위치를 마커로 표시합니다
                var marker = new kakao.maps.Marker({
                    map: map,
                    position: coords,
                });
            }

            this.allCampaigns.data.map((campaign, index) => {
                // 주소로 좌표를 검색합니다
                geocoder.addressSearch(
                    campaign.address,
                    function (result, status) {
                        // 정상적으로 검색이 완료됐으면
                        if (status === kakao.maps.services.Status.OK) {
                            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                            // 마커이미지
                            var markerImage = new kakao.maps.MarkerImage(
                                campaign.type_campaign === 'REALTIME' ? '/images/marker-p.png' : 'images/marker-b.png',
                                new kakao.maps.Size(50, 50), // 마커 이미지 크기
                                {
                                    offset: new kakao.maps.Point(25, 50), // 마커 이미지 기준점
                                    alt: '마커 이미지',
                                }
                            );

                            // 결과값으로 받은 위치를 마커로 표시합니다
                            var marker = new kakao.maps.Marker({
                                map: map,
                                position: coords,
                                image: markerImage,
                            });

                            // 인포윈도우로 장소에 대한 설명을 표시합니다
                            var infowindow = new kakao.maps.CustomOverlay({
                                map: map,
                                position: coords,
                                content:
                                    `<div class="infoWindow" style="">
<a href="/campaigns/${campaign.id}" class="campaign">
    <div class="img-wrap" style="background-image:url(${campaign.img.url})"></div>
    <div class="content">
        <div class="types">
           ${campaign.type_campaign === 'REALTIME' ? '<img src="/images/Live-icon.png" alt="">' : ''}
           ${campaign.type_sns === 'INSTAGRAM' ? '<img src="/images/Instagram-icon.png" alt="">' : ''}
           ${campaign.type_sns === 'NAVER' ? '<img src="/images/Blog-icon.png" alt="">' : ''}
        </div>
        <h3 class="title">${campaign.title_product}</h3>
        <p class="body">${ campaign.description_provide }</p>
    </div>
</a>
<button type="button" class="btn">닫기</button>
</div>`,
                                yAnchor: 1,
                            });

                            self.infoWindows.push(infowindow);

                            infowindow.setVisible(false);

                            kakao.maps.event.addListener(marker, "click", function () {
                                self.infoWindows.map(infowindow => infowindow.setVisible(false));

                                // InfoWindow를 마커 위에 표시합니다
                                infowindow.setVisible(!infowindow.getVisible());

                                $(".infoWindow .btn").unbind("click").bind("click",function(){
                                    self.closeOverlay();
                                });
                            });

                            // 내 위치를 기준으로 계속 고정시키기
                            if(defaultCenter)
                                map.setCenter(new kakao.maps.LatLng(self.y, self.x));


                        }


                    }
                );
            });

        },

        closeOverlay(){
            this.infoWindows.map(infoWindow => infoWindow.setVisible(false));
        }
    },

    computed: {

    },

    mounted() {
        let self = this;

        if (navigator.geolocation) {
            // 위치 정보를 가져올 수 있는 경우
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.y = position.coords.latitude;
                    this.defaultY = position.coords.latitude;
                    this.x = position.coords.longitude;
                    this.defaultX = position.coords.longitude;
                    this.activeMyPosition = true;
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

        this.getCampaignBanners();
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

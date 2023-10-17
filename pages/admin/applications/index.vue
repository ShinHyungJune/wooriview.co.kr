<template>
    <main class="manage inquiry2">
        <div class="manage-wrap">
            <div class="title-wrap row-group">
                <div class="col-group">
                    <div class="menu-wrap col-group">
                        <p class="title scd5">
                            지원내역
                        </p>
                        <ul class="tab-link col-group">
                            <li :class="`${form.selected === '' ? 'active' : ''}`" @click="() => {form.page = 1; form.selected = ''; filter()}" data-tab="tab_1">전체</li>
                            <li :class="`${form.selected === 1 ? 'active' : ''}`" @click="() => {form.page = 1; form.selected = 1; filter()}" data-tab="tab_2">선정</li>
                            <li :class="`${form.selected === 0 ? 'active' : ''}`" @click="() => {form.page = 1; form.selected = 0; filter()}" data-tab="tab_3">미선정</li>
                        </ul>
                    </div>

                    <div class="search-wrap">
                        <form action="" @submit.prevent="filter">
                            <input type="text" placeholder="검색어를 입력해주세요" v-model="form.word">
                            <button type="submit" class="search-btn">
                                <i class="xi-search"></i>
                            </button>
                        </form>
                    </div>
                </div>
                <div class="btn-wrap col-group">
                    <a href="#" type="button" class="add-btn" @click.prevent="penalty" style="background-color:red; color:#fff;">패널티 부여</a>
                    <a href="#" class="del-btn" @click.prevent="remove">선택 삭제</a>
                </div>
            </div>
            <div class="table-wrap">
                <table>
                    <thead>
                    <tr>
                        <th>
                            <label for="" @click="toggle">
                                <input type="checkbox" id="" name="chk" checked v-if="form.selected_ids.length === items.data.length">
                                <input type="checkbox" id="" name="chk" v-else>
                                <span class="check-icon"></span>
                            </label>
                        </th>
                        <th>이미지</th>
                        <th>인플루언서</th>
                        <th>인플루언서 연락처</th>
                        <th>브랜드명</th>
                        <th>상품명</th>
                        <th>선정여부</th>
                        <th>베스트여부</th>
                        <th>리뷰</th>
                        <th>참여배너 URL</th>

                        <!--
                        <th>좋아요</th>
                        <th>댓글</th>
                        -->

                        <th>등록일자</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in items.data" :key="item.id" @click="$router.push(`/admin/applications/create?id=${item.id}`)">
                        <td>
                            <label :for="item.id" @click="(e) => {e.stopPropagation()}">
                                <input type="checkbox" :id="item.id" :value="item.id" name="chk" v-model="form.selected_ids">
                                <span class="check-icon"></span>
                            </label>
                        </td>
                        <td>
                            <div class="m-ratioBox-wrap">
                                <div class="m-ratioBox" :style="`background-image:url(${item.campaign.img ? item.campaign.img.url : ''});`"></div>
                            </div>
                        </td>
                        <td>
                            {{item.user.nickname}}
                        </td>
                        <td>
                            {{item.user.contact}}
                        </td>
                        <td>
                            {{item.campaign.title_company}}
                        </td>
                        <td>
                            {{item.campaign.title_product}}
                        </td>
                        <td>
                            {{item.selected == 1 ? 'O' : 'X'}}
                        </td>
                        <td>
                            {{item.best ? 'O' : 'X'}}
                        </td>

                        <!--
                        <td>
                            {{item.count_like}}
                        </td>
                        <td>
                            {{item.count_comment}}
                        </td>
                        -->
                        <td>
                            <a :href="item.url_review" target="_blank" v-if="item.url_review" style="white-space: nowrap">리뷰보기</a>
                        </td>
                        <td>
                            {{item.url_banner}}
                        </td>
                        <td>
                            {{ item.created_at}}
                        </td>

                    </tr>
                    </tbody>
                </table>

                <empty v-if="items.data.length === 0" />

                <pagination :meta="items.meta" @paginate="(page) => {form.page = page; filter()}" />
            </div>
        </div>
    </main>
</template>
<script>
import Form from "@/utils/Form";
export default {
    layout: "admin",

    components: {},

    data() {
        return {
            items: {
                data: [],
                meta: {
                    current_page:1,
                    last_page:1
                }
            },

            form: new Form(this.$axios, {
                page: this.$route.query.page || 1,
                selected_ids: [],
                word: "",
                selected: "",
                penalty_by : "applications"
            }),
        }
    },

    methods: {
        filter(){

            this.$axios.get("/api/admin/applications", {
                params: this.form
            }).then(response => {
                this.items = response.data;
            });
        },

        remove(){
            this.form.delete("/api/admin/applications/1")
                .then(response => {
                    this.items.data = this.items.data.filter(itemData => !this.form.selected_ids.includes(itemData.id));
                    this.form.selected_ids = [];
                });
        },

        toggle(){
            if(this.form.selected_ids.length === this.items.data.length)
                return this.form.selected_ids = [];

            return this.form.selected_ids = this.items.data.map(item => item.id);
        },

        accept(){
            this.form.patch("/api/admin/applications/accept")
                .then(response => {
                    this.filter();

                    this.form.selected_ids = [];
                });
        },

        penalty(){
            this.form.post("/api/admin/penalties")
                .then(response => {
                    this.$store.commit("setPop", {
                        title: "처리완료",
                        description: "성공적으로 처리되었습니다."
                    });

                    this.form.selected_ids = [];
                });
        },
    },

    mounted() {
        this.filter();
    }
}
</script>

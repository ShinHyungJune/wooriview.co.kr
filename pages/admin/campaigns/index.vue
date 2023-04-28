<template>
    <main class="manage inquiry2">
        <div class="manage-wrap">
            <div class="title-wrap row-group">
                <div class="col-group">
                    <div class="menu-wrap col-group">
                        <p class="title scd5">
                            캠페인
                        </p>
                        <ul class="tab-link col-group">
                            <li :class="`${form.accept === '' ? 'active' : ''}`" @click="() => {form.page = 1; form.accept = ''; filter()}" data-tab="tab_1">전체</li>
                            <li :class="`${form.accept === 1 ? 'active' : ''}`" @click="() => {form.page = 1; form.accept = 1; filter()}" data-tab="tab_2">승인</li>
                            <li :class="`${form.accept === 0 ? 'active' : ''}`" @click="() => {form.page = 1; form.accept = 0; filter()}" data-tab="tab_3">미승인</li>
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
                    <a href="#" type="button" class="add-btn" @click.prevent="accept">승인하기</a>
                    <!--
                    <a href="#" class="del-btn" @click.prevent="remove">선택 삭제</a>
                    -->
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
                        <th>광고주</th>
                        <th>광고주 연락처</th>
                        <th>브랜드</th>
                        <th>상품명</th>
                        <th>캠페인 유형</th>
                        <th>SNS 유형</th>
                        <th>모집수</th>
                        <th>참여수</th>
                        <th>진행단계</th>
                        <th>등록일자</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in items.data" :key="item.id" @click="$router.push(`/admin/campaigns/create?id=${item.id}`)">
                        <td>
                            <label :for="item.id" @click="(e) => {e.stopPropagation()}">
                                <input type="checkbox" :id="item.id" :value="item.id" name="chk" v-model="form.selected_ids">
                                <span class="check-icon"></span>
                            </label>
                        </td>
                        <td>
                            <div class="m-ratioBox-wrap">
                                <div class="m-ratioBox" :style="`background-image:url(${item.img.url});`"></div>
                            </div>
                        </td>
                        <td>
                            {{item.user.company_name}}
                        </td>
                        <td>
                            {{item.user.company_contact}}
                        </td>
                        <td>
                            {{item.title_company}}
                        </td>
                        <td>
                            {{item.title_product}}
                        </td>
                        <td>
                            {{item.format_type_campaign}}
                        </td>
                        <td>
                            {{item.format_type_sns}}
                        </td>
                        <td>
                            {{item.max_participant}}
                        </td>
                        <td>
                            {{item.applications_count}}
                        </td>
                        <td>
                            {{item.state}}
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
                page: 1,
                selected_ids: [],
                word: "",
                accept: "",
            }),
        }
    },

    methods: {
        filter(){

            this.$axios.get("/api/admin/campaigns", {
                params: this.form
            }).then(response => {
                this.items = response.data;
            });
        },

        remove(){
            this.form.delete("/api/admin/campaigns/1")
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
            this.form.patch("/api/admin/campaigns/accept")
                .then(response => {
                    this.filter();

                    this.form.selected_ids = [];
                });
        }
    },

    mounted() {
        this.filter();
    }
}
</script>

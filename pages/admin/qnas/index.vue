<template>
    <main class="manage inquiry2">
        <div class="manage-wrap">
            <div class="title-wrap row-group">
                <div class="col-group">
                    <div class="menu-wrap col-group">
                        <p class="title scd5">
                            1:1문의
                        </p>
                        <ul class="tab-link col-group">
                            <li :class="`${form.type === '' ? 'active' : ''}`" @click="() => {form.page = 1; form.type = ''; filter()}" data-tab="tab_1">전체</li>
                            <li :class="`${form.type === '미답변' ? 'active' : ''}`" @click="() => {form.page = 1; form.type = '미답변'; filter()}" data-tab="tab_2">미답변</li>
                            <li :class="`${form.type === '답변' ? 'active' : ''}`" @click="() => {form.page = 1; form.type = '답변'; filter()}" data-tab="tab_3">답변</li>
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
<!--                <div class="btn-wrap col-group">
                    <nuxt-link to="/admin/qnas/create" class="add-btn">신규 추가</nuxt-link>
                    <a href="#" class="del-btn" @click.prevent="remove">선택 삭제</a>
                </div>-->
            </div>
            <div class="table-wrap">
                <table>
                    <thead>
                    <tr>
                        <th>번호</th>
                        <th>닉네임</th>
                        <th>연락처</th>
                        <th>카테고리</th>
                        <th>제목</th>
                        <th>문의일자</th>
                        <th>답변일자</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in items.data" :key="item.id" @click="$router.push(`/admin/qnas/create?id=${item.id}`)">
                        <td>
                            {{item.id}}
                        </td>
                        <td>
                            {{item.user.nickname || item.user.company_name}}
                        </td>
                        <td>
                            {{item.user.contact}}
                        </td>
                        <td>
                            {{item.category}}
                        </td>
                        <td>
                            {{item.title}}
                        </td>
                        <td>
                            {{item.created_at}}
                        </td>
                        <td>
                            {{ item.answer ? item.updated_at : ''}}
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
                type: "",
            }),
        }
    },

    methods: {
        filter(){
            this.$axios.get("/api/admin/qnas", {
                params: this.form
            }).then(response => {
                console.log(response.data);
                this.items = response.data;
            });
        },

        remove(){
            this.form.delete("/api/admin/qnas/1")
                .then(response => {
                    this.items.data = this.items.data.filter(itemData => !this.form.selected_ids.includes(itemData.id));
                    this.form.selected_ids = [];
                });
        },

        toggle(){
            if(this.form.selected_ids.length === this.items.data.length)
                return this.form.selected_ids = [];

            return this.form.selected_ids = this.items.data.map(item => item.id);
        }
    },

    mounted() {
        this.filter();
    }
}
</script>

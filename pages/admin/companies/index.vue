<template>
    <main class="manage mainpage">
        <div class="manage-wrap">
            <div class="title-wrap row-group">
                <div class="col-group">
                    <div class="menu-wrap col-group">
                        <p class="title scd5">
                            광고주
                        </p>
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
                <!--
                <div class="btn-wrap col-group">
                    <nuxt-link to="/admin/users/create" class="add-btn">신규 추가</nuxt-link>
                    <a href="#" class="del-btn" @click.prevent="remove">선택 삭제</a>
                </div>
                -->
            </div>
            <div class="table-wrap">
                <table>
                    <thead>
                    <tr>
                        <th>번호</th>
                        <th>이메일</th>
                        <th>담당자 연락처</th>
                        <th>회사명</th>
                        <th>회사연락처</th>
                        <th>사업자등록증</th>
                        <th>패널티</th>
                        <th>이용권 만료일자</th>
                        <th>가입날짜</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in items.data" :key="item.id" style="cursor:default;">
                        <td>
                            {{item.id}}
                        </td>
                        <td>
                            {{item.email}}
                        </td>
                        <td>
                            {{item.contact}}
                        </td>
                        <td>
                            {{item.company_name}}
                        </td>
                        <td>
                            {{item.company_contact}}
                        </td>
                        <td>
                            <a :href="item.file_company.url" v-if="item.file_company">{{item.file_company.name}}</a>
                        </td>
                        <td>
                            {{item.penalty['title']}}
                        </td>
                        <td>
                            {{item.expired_at === "" ? '구매이력 없음' : ''}}
                        </td>
                        <td>
                            {{item.created_at}}
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
                type: "COMPANY"
            }),
        }
    },

    methods: {
        filter(){

            this.$axios.get("/api/admin/users", {
                params: this.form
            }).then(response => {
                this.items = response.data;
            });
        },

        remove(){
            this.form.delete("/api/admin/users/1")
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

        up(e, item, index){
            e.stopPropagation();
            e.preventDefault();

            if(index > 0){
                let temp = null;

                temp = this.items.data.splice(index, 1)[0];

                this.items.data.splice(index - 1,0, temp);

                this.form.patch("/api/admin/users/" + item.id + "/up")
                    .then(response => {

                    });
            }
        },

        down(e, item, index){
            e.stopPropagation();
            e.preventDefault();

            if(index < this.items.data.length){
                let temp = null;

                temp = this.items.data.splice(index, 1)[0];

                this.items.data.splice(index + 1,0, temp);

                this.form.patch("/api/admin/users/" + item.id + "/down")
                    .then(response => {

                    });
            }
        },
    },

    mounted() {
        this.filter();
    }
}
</script>

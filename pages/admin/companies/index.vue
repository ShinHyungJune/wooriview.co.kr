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
                <div class="btn-wrap col-group">
                    <a href="#" class="add-btn" @click.prevent="activeExpiredPop = true">이용권 만료일자 수정</a>
                    <!--                    <nuxt-link to="/admin/users/create" class="add-btn">신규 추가</nuxt-link>-->
                    <a href="#" class="del-btn" @click.prevent="remove">계정 정지</a>
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
                        <th>이메일</th>
                        <th>담당자 연락처</th>
                        <th>회사명</th>
                        <th>회사연락처</th>
                        <th>사업자등록증</th>
                        <th>패널티</th>
                        <th>이용권 만료일자</th>
                        <th>가입날짜</th>
                        <th>정지일자</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in items.data" :key="item.id" style="cursor:default;">
                        <td>
                            <label :for="item.id" @click="(e) => {e.stopPropagation()}">
                                <input type="checkbox" :id="item.id" :value="item.id" name="chk" v-model="form.selected_ids">
                                <span class="check-icon"></span>
                            </label>
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
                            {{item.penalty ? item.penalty['title'] : ""}}
                        </td>
                        <td>
                            {{item.expired_at === "" ? '구매이력 없음' : item.expired_at}}
                        </td>
                        <td>
                            {{item.created_at}}
                        </td>
                        <td>
                            {{item.deleted_at}}
                        </td>
                    </tr>
                    </tbody>
                </table>

                <empty v-if="items.data.length === 0" />

                <pagination :meta="items.meta" @paginate="(page) => {form.page = page; filter()}" />
            </div>

            <div class="modal-box fixed" v-if="activeExpiredPop">
                <div class="box">
                    <h2>만료일자 수정</h2>
                    <div class="m-input-text type01">
                        <input type="date" v-model="form.expired_at">
                    </div>
                    <div class="button-box">
                        <a href="#" @click.prevent="update" class="btn">확인</a>
                    </div>
                </div>
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
                type: "COMPANY",
                expired_at: "",
            }),

            activeExpiredPop: false,
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
                    this.filter();

                    // this.items.data = this.items.data.filter(itemData => !this.form.selected_ids.includes(itemData.id));
                    this.form.selected_ids = [];
                });
        },

        toggle(){
            if(this.form.selected_ids.length === this.items.data.length)
                return this.form.selected_ids = [];

            return this.form.selected_ids = this.items.data.map(item => item.id);
        },

        update(){
            this.form.patch("/api/admin/users/updateAll")
                .then(response => {
                    this.filter();

                    this.activeExpiredPop = false;
                })
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

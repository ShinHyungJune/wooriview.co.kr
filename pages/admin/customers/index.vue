<template>
    <main class="manage mainpage">
        <div class="manage-wrap">
            <div class="title-wrap row-group">
                <div class="col-group">
                    <div class="menu-wrap col-group">
                        <p class="title scd5">
                            인플루언서
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
                        <th>연락처</th>
                        <th>닉네임</th>
                        <th>성별</th>
                        <th>패널티</th>
                        <th>등급</th>
                        <th>마케팅 수신여부</th>
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
                            <span style="font-weight:bold">[{{item.social_platform}}]</span> {{item.email}}
                        </td>
                        <td>
                            {{item.contact}}
                        </td>
                        <td>
                            {{item.nickname}}
                        </td>
                        <td>
                            {{item.sex}}
                        </td>
                        <td>
                            {{item.penalty ? item.penalty['title'] : ''}}
                        </td>
                        <td>
                            {{item.grade ? item.grade : "-"}}
                        </td>
                        <td>
                            {{item.agree_marketing == 1 ? '동의' : '거부'}}
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
                type: "CUSTOMER"
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

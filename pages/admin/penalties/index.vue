<template>
    <main class="manage mainpage">
        <div class="manage-wrap">
            <div class="title-wrap row-group">
                <div class="col-group">
                    <p class="title scd5">
                        패널티
                    </p>
                    <div class="search-wrap">
                        <form action="" @submit.prevent="filter">
                            <input type="text" placeholder="검색어를 입력해주세요" v-model="form.word">
                            <button type="submit" class="search-btn">
                                <i class="xi-search"></i>
                            </button>
                        </form>
                    </div>
                </div>

                <div class="btn-wrap col-group" style="margin-left:auto;">
                    <a href="#" type="button" class="add-btn" @click.prevent="agree">승인</a>
                    <a href="#" type="button" class="add-btn" @click.prevent="deny" style="background-color:red; color:#fff;">반려</a>
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
                        <th>캠페인명</th>
                        <th>패널티 대상</th>
                        <th>패널티 사유</th>
                        <th>패널티 상태</th>
                        <th>등록일자</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in items.data" :key="item.id">
                        <td>
                            <label :for="item.id" @click="(e) => {e.stopPropagation()}">
                                <input type="checkbox" :id="item.id" :value="item.id" name="chk" v-model="form.selected_ids">
                                <span class="check-icon"></span>
                            </label>
                        </td>
                        <td>[{{item.campaign.title_company}}] {{item.campaign.title_product}}</td>
                        <td>
                            {{item.targetUser.type === 'CUSTOMER' ? `[일반사용자] ${item.targetUser.nickname}` : `[광고주] ${item.targetUser.company_name}`}}
                        </td>
                        <td>
                            <p v-for="(reason, index) in item.reasons" :key="index">{{item.reason}}</p>
                            <p>{{item.description}}</p>
                        </td>
                        <td>{{item.state}}</td>
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
            }),
        }
    },

    methods: {
        filter(){

            this.$axios.get("/api/admin/penalties", {
                params: this.form
            }).then(response => {
                this.items = response.data;
            });
        },

        remove(){
            this.form.delete("/api/admin/penalties/1")
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

        deny(){
            this.form.post("/api/admin/penalties/deny")
                .then(response => {
                    this.form.selected_ids = [];

                    this.filter();
                });
        },
        agree(){
            this.form.post("/api/admin/penalties/agree")
                .then(response => {
                    this.form.selected_ids = [];

                    this.filter();
                });
        }
    },

    mounted() {
        this.filter();
    }
}
</script>

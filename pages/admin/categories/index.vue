<template>
    <main class="manage mainpage">
        <div class="manage-wrap">
            <div class="title-wrap row-group">
                <div class="col-group">
                    <p class="title scd5">
                        카테고리
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
                <div class="btn-wrap col-group">
                    <nuxt-link to="/admin/categories/create" class="add-btn">신규 추가</nuxt-link>
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
                        <th>제목</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in items.data" :key="item.id" @click="$router.push(`/admin/categories/create?id=${item.id}`)">
                        <td>
                            <label :for="item.id" @click="(e) => {e.stopPropagation()}">
                                <input type="checkbox" :id="item.id" :value="item.id" name="chk" v-model="form.selected_ids">
                                <span class="check-icon"></span>
                            </label>
                        </td>
                        <td>
                            <img :src="item.active ? item.active.url : ''" alt="">
                        </td>
                        <td>
                            {{item.title}}
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

            this.$axios.get("/api/admin/categories", {
                params: this.form
            }).then(response => {
                this.items = response.data;
            });
        },

        remove(){
            this.form.delete("/api/admin/categories/1")
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

                this.form.patch("/api/admin/categories/" + item.id + "/up")
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

                this.form.patch("/api/admin/categories/" + item.id + "/down")
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

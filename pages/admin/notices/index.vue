<template>
    <main class="manage inquiry2">
        <div class="manage-wrap">
            <div class="title-wrap row-group">
                <div class="col-group">
                    <div class="menu-wrap col-group">
                        <p class="title scd5">
                            공지사항
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
                    <nuxt-link to="/admin/notices/create" class="add-btn">신규 추가</nuxt-link>
                    <a href="#" class="del-btn" @click.prevent="remove">선택 삭제</a>
                </div>
            </div>
            <div class="table-wrap">
                <table>
                    <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>등록일자</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in items.data" :key="item.id" @click="$router.push(`/admin/notices/create?id=${item.id}`)">
                        <td>
                            {{item.id}}
                        </td>
                        <td>
                            {{item.title}}
                        </td>
                        <td>
                            {{item.format_created_at}}
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
            this.$axios.get("/api/admin/notices", {
                params: this.form
            }).then(response => {
                console.log(response.data);
                this.items = response.data;
            });
        },

        remove(){
            this.form.delete("/api/admin/notices/1")
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

<template>
    <main class="manage mainpage">
        <div class="manage-wrap">
            <div class="title-wrap row-group">
                <div class="col-group">
                    <div class="menu-wrap col-group">
                        <p class="title scd5">
                            주문내역
                        </p>
                    </div>
                </div>
            </div>
            <div class="table-wrap">
                <table>
                    <thead>
                    <tr>
                        <th>번호</th>
                        <th>회사명</th>
                        <th>연락처</th>
                        <th>결제상품</th>
                        <th>결제금액</th>
                        <th>주문상태</th>
                        <th>주문일자</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in items.data" :key="item.id" style="cursor:default;">
                        <td>
                            {{item.id}}
                        </td>
                        <td>
                            {{item.user_name}}
                        </td>
                        <td>
                            {{item.user_contact}}
                        </td>
                        <td>
                            {{item.product_title}}
                        </td>
                        <td>
                            {{item.price.toLocaleString()}}
                        </td>
                        <td>
                            {{item.state}}
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
            }),
        }
    },

    methods: {
        filter(){

            this.$axios.get("/api/admin/orders", {
                params: this.form
            }).then(response => {
                this.items = response.data;
            });
        },

        remove(){
            this.form.delete("/api/admin/orders/1")
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

                this.form.patch("/api/admin/orders/" + item.id + "/up")
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

                this.form.patch("/api/admin/orders/" + item.id + "/down")
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

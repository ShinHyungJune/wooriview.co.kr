<template>
    <main id="main" class="MyPage support">
        <div class="route-wrap">
            <div class="container3">
                <div class="route-box">
                    <ul class="route">
                        <li>마이페이지</li>
                        <li><i class="xi-angle-right"></i></li>
                        <li>고객센터</li>
                    </ul>
                    <h2>고객센터</h2>
                    <div class="route-bg">
                        <img src="/images/route-bg-3.png" alt="">
                    </div>
                </div>
            </div>
        </div>
        <div class="table-section">
            <div class="container3">
                <div class="table-top-wrap">
                    <p class="table-title">1:1문의 내역</p>
                    <div class="btn-wrap ">
                        <nuxt-link to="/qnas/create">1:1문의 신청</nuxt-link>
                    </div>
                </div>
                <div class="table-tab-wrap influencer-table_1">
                    <div class="table-wrap">
                        <ul class="thead">
                            <li class="th">
                                문의 일자
                            </li>
                            <li class="th">
                                문의 내용
                            </li>
                            <li class="th">
                                답변
                            </li>
                        </ul>
                        <empty v-if="items.data.length === 0" />

                        <ul class="tbody" v-for="item in items.data" :key="item.id">
                            <li class="date">
                                {{ item.format_created_at }}
                            </li>
                            <li class="content">
                                <nuxt-link :to="`/qnas/show?id=${item.id}`">
                                    [{{item.category}}] {{ item.title }}
                                </nuxt-link>
                            </li>
                            <li class="answer">
                                <p class="answer-state com-state" v-if="item.answer">답변</p>
                                <p class="answer-state" v-else>미답변</p>
                                <P class="answer-date">{{ item.format_updated_at }}</P>
                            </li>
                        </ul>

                    </div>
                </div>

                <pagination :meta="items.meta" @paginate="(page) => {form.page = page; filter()}" />
            </div>
        </div>
    </main>
</template>

<script>
import Form from "../../utils/Form";
import NuxtLogo from "../../components/NuxtLogo";
export default {
    components: {NuxtLogo},
    data(){
        return {
            items: {
                data: [],
                links : {},
                meta: {},
            },
        }
    },
    methods: {
        filter(loadMore = false){
            if(loadMore)
                this.form.page += 1;

            this.$axios.get("/api/qnas", {
                params: this.form
            }).then(response => {
                if(loadMore)
                    return this.items = {
                        ...response.data,
                        data: [...this.items.data, ...response.data.data]
                    };


                return this.items = response.data;
            })
        },
    },

    computed: {

    },

    mounted() {
        this.filter();
    },

    watch: {

    },
}
</script>

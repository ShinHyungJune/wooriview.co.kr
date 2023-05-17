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
                    <ul class="table-tab-list">
                        <li class="tab-link table-title" data-tab="tab-1" @click="() => {$router.push('/notices')}">문의사항</li>
                        <li class="tab-link Active table-title " data-tab="tab-2" @click="() => {$router.push('/notices')}">공지사항</li>
                    </ul>
                </div>
                <div class="table-tab-wrap influencer-table_1">
                    <div class="table-wrap">
                        <ul class="thead">
                            <li class="th">고유번호</li>
                            <li class="th">
                                제목
                            </li>
                            <li class="th">
                                등록일자
                            </li>
                        </ul>

                        <empty v-if="items.data.length === 0" />

                        <ul class="tbody" v-for="item in items.data" :key="item.id">
                            <li class="date">
                                {{ item.id }}
                            </li>
                            <li class="content">
                                <nuxt-link :to="`/notices/show?id=${item.id}`">
                                    {{ item.title }}
                                </nuxt-link>
                            </li>
                            <li class="date">
                                {{ item.format_created_at }}
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

            this.$axios.get("/api/notices", {
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

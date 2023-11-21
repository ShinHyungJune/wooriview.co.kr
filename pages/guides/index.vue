<template>
    <main id="main" class="MyPage area-guides">
        <div class="route-wrap">
            <div class="container3">
                <div class="route-box">
                    <ul class="route">
                        <li>홈</li>
                        <li><i class="xi-angle-right"></i></li>
                        <li>이용가이드</li>
                    </ul>
                    <h2>이용가이드</h2>
                    <div class="route-bg">
                        <img src="/images/route-bg-3.png" alt="">
                    </div>
                </div>
            </div>
        </div>

        <div class="table-section">
            <div class="container3">
                <div class="m-boxes type01">
                    <div class="box-wrap" v-for="item in items.data" :key="item.id">
                        <a href="#" class="box" @click.prevent="targetItem = item">
                            <h3 class="title">{{ item.title }}</h3>
                            <img :src="item.img ? item.img.url : ''" alt="">
                        </a>
                    </div>
                </div>

                <div class="grey-box content-wrap" v-if="targetItem">
                    <div class="content" style="width:100%;">
                        <div class="ql-snow">
                            <div class="ql-editor">
                                <div class="editor-wrap" v-html="targetItem.description"></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </main>
</template>

<script>
import Form from "../../utils/Form";
import NuxtLogo from "../../components/NuxtLogo";

export default {
    components: {NuxtLogo},
    data() {
        return {
            items: {
                data: [],
                links: {},
                meta: {},
            },

            targetItem: null,
        }
    },
    methods: {
        filter(loadMore = false) {
            if (loadMore)
                this.form.page += 1;

            this.$axios.get("/api/guides", {
                params: this.form
            }).then(response => {
                if (loadMore)
                    return this.items = {
                        ...response.data,
                        data: [...this.items.data, ...response.data.data]
                    };


                return this.items = response.data;
            })
        },
    },

    computed: {},

    mounted() {
        this.filter();
    },

    watch: {},
}
</script>

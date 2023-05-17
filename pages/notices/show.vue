<template>
    <main id="main" class="MyPage inquiry-detail">
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
        <div class="section1" v-if="item">
            <div class="container">
                <div class="contents">
                    <p class="title">제목</p>
                    <div class="grey-box title-wrap">
                        <p class="content-title">{{item.title}}</p>
                        <p class="date">{{ item.format_created_at }}</p>
                    </div>
                </div>
                <div class="contents">
                    <p class="title">내용</p>
                    <div class="grey-box content-wrap">
                        <p class="content" v-text="item.description"></p>
                    </div>
                </div>

                <div class="btn-wrap">
                    <a href="#" @click.prevent="() => {$router.back()}">뒤로가기</a>
                </div>
            </div>
        </div>
    </main>

</template>

<script>
import Form from "../../utils/Form";
export default {
    data(){
        return {
            item: "",
        }
    },
    methods: {

    },

    computed: {

    },

    mounted() {
        this.$axios.get("/api/notices/" + this.$route.query.id)
            .then(response => {
                this.item = response.data.data;
            })
    }
}
</script>

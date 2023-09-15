<template>
    <main class="find_account mypage_leave done">
        <div class="title-wrap">
                <span class="icon">
                    <i class="xi-warning"></i>
                </span>
            <h2 class="title scd5">
                회원 탈퇴
            </h2>
            <ul class="txt">
                <li>회원탈퇴시 정보 수집기간 : 3년</li>
                <li>안내사항 : 탈퇴 후 회원정보 및 이용기록은 모두 삭제되며 다시 복구하실 수 없습니다.</li>
            </ul>
        </div>
        <div class="find-method container row-group">
            <form action="" @submit.prevent="">
                <div class="method-box form">
<!--                    <input type="password" placeholder="비밀번호를 입력해주세요" v-model="form.password"> &lt;!&ndash; 일치하는 정보가 없을 때 wrong 클래스 추가 &ndash;&gt;
                    <error :form="form" name="password" />-->
                    <label for="leave_agree">
                        <input type="checkbox" id="leave_agree" v-model="agree">
                        <span class="check-icon"></span>
                        위 내용을 동의하고 탈퇴합니다.
                    </label>
                </div>
            </form>
            <div class="btn-wrap col-group" style="margin-top:20px;">
                <a href="#" class="prev-btn" @click.prevent="remove">
                    탈퇴하기
                </a>
                <a href="#" class="next-btn" @click.prevent="$router.back()">
                    취소
                </a>
            </div>
        </div>
    </main>
</template>

<script>
import Form from "../../utils/Form";
export default {
    middleware:"auth",
    data(){
        return {
            form : new Form(this.$axios, {
                password: "",
                reason_leave_out: "",
            }),
        }
    },
    methods: {
        remove(){
            this.form.delete("/api/users")
                .then(response => {
                    this.$store.commit("setPop", {
                        title: "탈퇴완료",
                        description: "성공적으로 처리되었습니다!"
                    });

                    this.$router.push("/login");
                })
        },
    },

    computed: {

    },

    mounted() {

    }
}
</script>

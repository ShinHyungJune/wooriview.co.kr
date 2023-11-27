<template>
    <div @keyup="() => {form.errors.clear()}">
        <div v-if="mode === 'beforeSend'">
            <div class="m-input-wrap m-input-withBtn">
                <div class="m-input-text">
                    <input type="text" placeholder="휴대폰 번호 (- 없이)" v-model="form.contact" @input="clearLetter">
                </div>
                <button type="button" class="m-input-btn" @click.prevent="sendVerify">인증번호발송</button>
            </div>

            <error :form="form" name="contact" />
        </div>


        <div v-if="mode === 'afterSend'">
            <div class="m-input-wrap m-input-withBtn">
                <div class="m-input-text">
                    <input type="text" placeholder="인증번호" v-model="form.number">
                </div>
                <button type="button" class="m-input-btn" @click.prevent="verify">인증하기</button>
            </div>

            <error :form="form" name="number" />
        </div>


        <div v-if="mode === 'verified'">
            <div class="m-input-wrap m-input-withBtn">
                <div class="m-input-text">
                    <input type="text" placeholder="휴대폰 번호" v-model="form.contact" disabled>
                </div>
            </div>

            <error :form="form" name="contact" />
        </div>

    </div>

</template>
<style>
.m-input-address {
    flex:auto;
}
.m-input-text {

}
.m-input-text input {
    height: 48px; width: 100%;
    padding: 0 24px;
    font-size: 16px;
    border: 1px solid #e4e4e4;
    border-radius:30px;
}
.m-input-withBtn {
    display:flex;
}
.m-input-withBtn .m-input-text {
    flex:auto;
}
.m-input-withBtn .m-input-btn {
    flex:0 0 auto;
    margin-left:10px;
    padding: 0 20px;
    font-size: 14px; font-weight: bold;     text-align: center;
    border: 1px solid #e4e4e4;
    border-radius:30px;
    transition: .3s;

}
</style>
<script>
import Form from '../utils/Form';
export default {
    props: {
        url: {
            default: "/api/verifyNumbers"
        },
        isRegister: {
            default: 0,
        }
    },

    data(){
        return {
            form: new Form(this.$axios, {
                number: "",
                contact: "",
                isRegister: this.isRegister
            }),

            mode: "beforeSend",
        }
    },

    methods: {
        sendVerify(){
            this.form.post("/api/verifyNumbers")
                .then(response => {
                    this.mode = "afterSend";

                    this.$store.commit("setPop", {
                        title: "발송완료",
                        description: "인증번호가 성공적으로 발송되었습니다!"
                    });
                });
        },

        verify(){
            this.form.patch("/api/verifyNumbers")
                .then(response => {
                    this.mode = "verified";

                    this.$emit("verified", this.form.contact);

                    this.$store.commit("setPop", {
                        title: "인증번호",
                        description: "인증이 완료되었습니다!"
                    });
                });
        },

        clearLetter(){
            // const filter = /[^0-9]+/g;

            // this.form.contact = this.form.contact.replace(filter, "");
        }
    }
}
</script>

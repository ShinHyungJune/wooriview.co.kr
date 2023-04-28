<template>
    <div class="modal-box fixed" v-if="pop">
        <div class="box">
            <h2 v-if="pop.title">{{ pop.title }}</h2>
            <p>{{ pop.description ? pop.description : "성공적으로 처리되었습니다."}}</p>
            <div class="button-box">
                <a href="#" @click.prevent="close" class="btn">확인</a>
            </div>
        </div>
    </div>
</template>
<style>
.modal-box {transition:all ease 0.5s; opacity:0; display:none; position:fixed; left:0; top:0; width:100%; height:100%; background:rgba(23,5,46,0.7); z-index:100000;}
.modal-box > .box {box-shadow:0 0 10px rgba(0,0,0,0.5); padding:67px 25px 48px; border:1px solid #E4E4E4; border-radius:24px; background:#fff; max-width:640px; width:100%; position:absolute; left:50%; top:45%; transform:translate(-50%,-50%);}
.modal-box > .box h2 {word-break:keep-all; font-size:32px; line-height:1.3; font-weight:bold; color:#202020; text-align:center; margin:0 0 20px;}
.modal-box > .box p {word-break:keep-all; font-size:16px; line-height:1.4; color:#303030; text-align:center;}
.modal-box > .box .button-box {max-width:400px; margin:55px auto 0;}
.modal-box.fixed {display:block; opacity:1;}
.modal-box > .box.fixed {animation-name:modalOpen; animation-duration:0.5s; animation-fill-mode:forwards;}
.modal-box > .box.nofixed {animation-name:modalClose; animation-duration:0.5s; animation-fill-mode:forwards;}
.modal-box .btn {
    display:flex; align-items: center; justify-content: center;
    min-width: 120px;
    height: 48px;
    padding: 0 20px;
    font-weight:bold;
    border-radius: 20px;
    background-color: #ffc800;
}
@media (max-width:991px){
    .modal-box > .box {width:calc(100% - 30px); padding:50px 15px;}
    .modal-box > .box h2 {font-size:25px; margin:0 0 10px;}
    .modal-box > .box p {font-size:15px;}
    .modal-box > .box .button-box {margin:40px auto 0;}
}
</style>
<script>
export default {
    computed: {
        pop(){
            return this.$store.state.pop;
        },
    },

    methods: {
        close(){
            this.$store.commit("setPop", null);
        }
    },

}
</script>

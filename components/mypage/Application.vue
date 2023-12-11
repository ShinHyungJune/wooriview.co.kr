<template>
    <li>
        <div class="subscriber-name-wrap">
            <nuxt-link :to="`/chats?application_id=${application.id}`" class="subscriber-img" :style="`background-image:url('${application.user.img.url}')`" v-if="application.user.img"></nuxt-link>
            <nuxt-link :to="`/chats?application_id=${application.id}`" class="subscriber-img" v-else></nuxt-link>
            <div class="Recommended_mark">
                <!-- 골드 -->
                <img src="/static/images/Recommended_mark_Gold.svg" alt="" v-if="application.user.grade === 'GOLD'">
                <img src="/static/images/Recommended_mark_Silver.svg" alt="" v-if="application.user.grade === 'SILVER'">
                <img src="/static/images/Recommended_mark_Bronze.svg" alt="" v-if="application.user.grade === 'BRONZE'">
                <!-- 실버 -->
                <!-- <img src="/images/Recommended_mark_Silver.svg" alt=""> -->
                <!-- 브론즈 -->
                <!-- <img src="/images/Recommended_mark_Bronze.svg" alt=""> -->
            </div>

            <a :href="application.url_review" :target="webview ? '_self' : '_blank'" class="bottom" v-if="application.url_review && showReview">
                <img src="/images/external-primary.png" alt="">
                리뷰 바로가기
            </a>
        </div>

        <div class="info-box">
            <nuxt-link :to="`/chats?application_id=${application.id}`" class="subscriber-name">
                <p class="name">{{ application.user.nickname }}</p>

                <p class="Address">{{ application.format_created_at }}</p>
            </nuxt-link>
            <div class="contents">
                <div class="content">
                    <h3 class="title">고유번호</h3>
                    <p class="body">
                        {{ application.id }}
                    </p>
                </div>

                <div class="content">
                    <h3 class="title">지원글</h3>
                    <p class="body">
                        {{ application.description }}
                    </p>
                </div>

                <div class="content">
                    <h3 class="title">닉네임</h3>
                    <p class="body">
                        {{ application.user.nickname }}
                    </p>
                </div>
<!--                <div class="content">
                    <h3 class="title">이름</h3>
                    <p class="body">
                        {{ application.campaign.can_see_name == 1 ? application.user.name : '***' }}
                    </p>
                </div>-->

                <div class="content" v-if="application.selected && application.campaign.type_campaign === 'DELIVERY'">
                    <h3 class="title">주소</h3>
                    <p class="body">
                        {{application.user.address }} {{application.user.address_detail}}
                    </p>
                </div>

                <div class="content" v-if="application.selected">
                    <h3 class="title">연락처</h3>
                    <p class="body">
                        {{application.user.contact }}
                    </p>
                </div>

                <div class="content" v-if="application.selected && application.campaign.type_campaign === 'DELIVERY'">
                    <h3 class="title">운송장번호</h3>

                    <div class="body tracking-wrap" v-if="!editMode && application.delivery_number">
                        <div class="input-wrap-view">
                            <p class="tracking-num">{{application.delivery_company}} {{ application.delivery_number }}</p>
                            <i class="xi-pen edit-btn" @click="edit"></i>
                        </div>
                    </div>

                    <div class="body tracking-wrap" v-else>
                        <div class="input-wrap">
                            <input type="text" placeholder="택배사를 입력해주세요." v-model="form.delivery_company">
                        </div>
                        <div class="input-wrap">
                            <input type="text" placeholder="송장번호를 작성해주세요." v-model="form.delivery_number">
                        </div>
                        <button class="tracking-add-btn" @click="update">등록</button>
                    </div>
                </div>

                <div class="content" v-if="application.selected && application.campaign.type_campaign === 'VISIT'">
                    <h3 class="title">방문시간</h3>

                    <div class="body tracking-wrap" v-if="!editMode && application.format_visited_at">
                        <div class="input-wrap-view">
                            <p class="tracking-num">{{ application.format_visited_at }}</p>
                            <i class="xi-pen edit-btn" @click="edit"></i>
                        </div>
                    </div>

                    <div class="body tracking-wrap" v-else>
                        <div class="input-wrap">
                            <input type="datetime-local" placeholder="방문시간을 입력해주세요." v-model="form.visited_at">
                        </div>
                        <button class="tracking-add-btn" @click="update">등록</button>
                    </div>
                </div>

                <div class="content" v-if="application.selected && (application.campaign.type_campaign === 'REALTIME' || application.campaign.type_campaign === 'VISIT')">
                    <h3 class="title">체험인증</h3>

                    <div class="body tracking-wrap">
                        <div class="input-wrap-view">
                            <p class="tracking-num">{{application.finished == 1 ? '인증완료' : '미인증'}}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="btns" v-if="campaign">
                <div class="m-btn-wrap" style="display:flex; gap:10px">
                    <a href="#" class="m-btn type01 bg-revert-primary" v-if="application.selected == 1 && application.finished == 1" style="background-color:red !important; color:#fff !important; border-color:red !important;" @click.prevent="unfinish">체험인증취소</a>
                    <nuxt-link :to="`/chats?application_id=${application.id}`" class="m-btn type01 bg-revert-primary" v-if="application.selected == 1">1대1 채팅</nuxt-link>
                </div>
                <div class="m-btn-wrap" v-if="campaign.on_select">
                    <button type="button" class="m-btn type01 bg-revert-primary" v-if="application.selected">선정됨</button>
                    <button type="button" class="m-btn type01"  @click="select" v-else>선정하기</button>
                </div>
            </div>

            <!--
            <div class="tracking-wrap">
                <p class="tracking-title">
                    송장번호
                </p>
                <div class="input-wrap">
                    <input type="text" placeholder="송장번호를 작성해주세요.">
                </div>
                <button class="tracking-add-btn">등록</button>
            </div>
            -->
        </div>
    </li>
</template>
<script>

import Form from "../../utils/Form";

export default {
    data(){
        return {
            webview: false,

            editMode: false,

            form : new Form(this.$axios, {
                delivery_number: "",
                delivery_company: "",
                visited_at: "",
            }),
        }
    },

    props: {
        "application": {
            required: true
        },
        "campaign": {
            required: false,
        },
        "showReview" : {
            default : false,
        }
    },

    methods: {
        update(){
            this.form.patch("/api/applications/" + this.application.id)
                .then(response => {
                    this.editMode = false;

                    this.$emit("updated", response.data);
                });
        },

        select(){
            this.form.patch("/api/applications/" + this.application.id + "/select")
                .then(response => {
                    this.$emit("selected", response.data);
                });
        },

        unfinish(){
            this.form.patch("/api/applications/" + this.application.id + "/unfinish")
                .then(response => {
                    this.$emit("unfinished", response.data);
                });
        },

        edit() {
            this.editMode = true;

            this.form.delivery_company = this.application.delivery_company;

            this.form.delivery_number = this.application.delivery_number;

            this.form.visited_at = this.application.visited_at;
        },


    },

    mounted() {
        this.webview = /WEBVIEW/.test(navigator.userAgent);
    }
}
</script>

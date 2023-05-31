<template>
    <div class="footer-wrap">
        <div class="container row-group">
            <div class="top-wrap col-group">
                <nuxt-link to="/" class="footer-logo">
                    <img src="/images/W_WhatPick_logo_Footer.svg" alt="">
                </nuxt-link>
                <ul class="site-map col-group">
                    <li>
                        <nuxt-link to="/contents/about">WHAT?</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/cars">차량조회</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/serviceChecks/intro">이차어때</nuxt-link>
                        <ul class="sub-menu">
                            <li>
                                <nuxt-link to="/serviceChecks/intro">이차어때?</nuxt-link>
                            </li>
                            <li>
                                <nuxt-link to="/serviceChecks/create">서비스 신청</nuxt-link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="service.html">동행서비스</a>
                        <ul class="sub-menu">
                            <li>
                                <a href="service.html">동행서비스</a>
                            </li>
                            <li>
                                <a href="service_apply.html">동행서비스 신청</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <nuxt-link to="/qnas/create">고객문의</nuxt-link>
                        <ul class="sub-menu">
                            <li>
                                <nuxt-link to="/faqs">자주묻는질문</nuxt-link>
                            </li>
                            <li>
                                <nuxt-link to="/qnas/create">1:1문의</nuxt-link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="btm-wrap col-group">
                <div class="copy-wrap">
                    <p class="copy">고객센터 전화번호 : 031-510-5144</p>
                    <p class="copy">대표자 : 이형근 | 주소 : 경기도 의정부시 의정로198번길 128, 가동 201호(가능동, 무림연립) | 사업자등록번호 : 343-03-02380</p>
                    <!--
                    <p class="copy">대표자 : 이형근 | 주소 : 경기도 구리시 갈매순환로166번길 45, 7층 s741호 | 사업자등록번호 : 343-03-02380</p>
                    -->
                    <p class="copy">
                        Copyright WHAT PICK. All rights reserved.
                    </p>
                </div>

                <div class="right-menu col-group">
                    <nuxt-link to="/contents/privacyPolicy">개인정보처리방침</nuxt-link>
                    <nuxt-link to="/contents/servicePolicy">이용약관</nuxt-link>
                </div>
            </div>
        </div>
    </div>


</template>
<script>
export default {

}
</script>

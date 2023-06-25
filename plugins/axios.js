import $ from 'jquery';

export default function ({ $axios, redirect, store }) {
    $axios.onResponse(response => {
        setTimeout(function(){
            if (typeof window !== 'undefined') {
                // 브라우저에서 실행되는 코드
                $(document).ready(function() {
                    let abuses = store.state.abuses;

                    // 페이지 내 욕설 삭제
                    if(!location.href.includes("admin")){
                        $('body').find('*').contents().each(function() {
                            if (this.nodeType === 3) {
                                abuses.map(abuse => {
                                    if (this.nodeType === 3 && this.nodeValue.includes(abuse)) {
                                        const regex = new RegExp(abuse, 'gi'); // 정규식 객체 생성

                                        $(this).replaceWith(this.nodeValue.replace(regex, '**')); // 변수를 사용하여 정규식 적용
                                    }
                                })
                            }
                        });
                    }
                });
            }

        });
    });

    $axios.onError(error => {

        // store.commit("setFlash", error.message);

        if(error.response.status == 401)
            return null;

        if(error.response.status == 422)
            return store.commit("setPop", {
                title: "확인필요",
                description: "입력값을 확인해주세요."
            });


        if(error.response.status == 403 && error.response.data && error.response.data.message)
            return store.commit("setPop", {
                title: "확인필요",
                description: error.response.data.message
            });
        /*
               if(error.response.data && error.response.data.message)
                   return store.commit("setPop", {
                       title: "확인필요",
                       description: error.response.data.message
                   });
                */
    })
}
